# Design

## Context

See proposal.md - Why. The backend (FastAPI + SQLAlchemy 2 + PostgreSQL/psycopg3) has no auth today: `database/schema.sql` defines `roles` and `usuarios` (con `password_hash`) but only the vehicles CRUD is implemented, and every endpoint is public. The frontend (React/Vite) calls the API directly without credentials. Requirements come from `specs/auth/spec.md`: password login, optional MFA TOTP, short-lived access tokens, rotating/revocable refresh tokens, protection of all endpoints, and reuse detection.

Important constraints already present in the codebase: `db.py` provides a `get_db` dependency and a SQLAlchemy `Base`; `main.py` registers routers and CORS (credentials already enabled); settings live in pydantic-settings (`core.py`); `Base.metadata.create_all` runs on startup with `database/schema.sql` as the canonical schema.

## Goals / Non-Goals

**Goals:**
- Secure password storage and login flow that meets RNF-003 (all endpoints protected) and RNF-004 (OWASP-oriented controls).
- Optional per-user TOTP MFA (enrollment + verification) without disrupting users who keep it disabled.
- Stateless access tokens for cheap per-request auth, backed by a server-side revocable session store for refresh.
- Rotation + reuse detection for refresh tokens, logout revocation, and MFA brute-force limiting.

**Non-Goals:**
- Role-based authorization (RBAC) and permission matrices: this change authenticates; role checks are a follow-up capability.
- User/role management frontend: creating users is covered by a seed/CLI helper so flows can be tested; a management UI is out of scope.
- Password recovery / email verification and third-party SSO.

## Decisions

**D1. Password hashing with Argon2 (`argon2-cffi`)**
OWASP first-choice KDF, resistant to GPU attacks, per-password salt. Used directly, not through the unmaintained `passlib`. Verify with `PasswordHasher().verify()` (limits to 2 s/verify to throttle online guessing). Alternative rejected: bcrypt (older, 72-byte limit, no memory-hardness parameter exposed at this level of the dependency).

**D2. TOTP with `pyotp` (RFC 6238)**
Well-tested, small, no storage of its own. Secrets generated with `pyotp.random_base32()`, enrollment returns `pyotp.TOTP(secret).provisioning_uri(...)` for the QR, verification uses `verify()` with a `window=1` to tolerate clock drift. Replay protection for NTP/timestamp collisions handled at the challenge level (below).

**D3. Short-lived JWT access tokens (`PyJWT`, HS256)**
Signed with a server secret from settings (`access_token_secret`), TTL 15 min, claims `sub` (usuario id) and `exp`. Stateless → no DB hit per request. Alternative rejected: server-stored session tokens for access too — stronger revocation but a DB query on every request; 15-min TTL keeps the window small.

**D4. Server-side session store for refresh tokens (table `sesiones`)**
Refresh tokens are opaque 256-bit random values; only their SHA-256 hash is stored (DB leak does not expose usable tokens). Each session row tracks `usuario_id`, current `token_hash` (unique), `token_anterior_hash`, `expira_en` (~30 days), `revocada_en`, IP/User-Agent for audit. Refresh rotates: the presented token becomes `token_anterior_hash`, a new one is issued. Presenting a hash that matches `token_anterior_hash` of an active session ⇒ reuse detected ⇒ revoke the whole session.

**D5. Refresh token delivered via HttpOnly, Secure, SameSite=Strict cookie**
Keeps the long-lived credential out of JS reach (XSS can't steal it) and races CSRF via SameSite=Strict + locked-down CORS origins. Login and `/refresh` set the cookie; logout clears it. The access token is returned in the JSON body and kept in app memory only.
Alternative rejected: refresh token in `localStorage` — simpler, but stealable by any XSS; at odds with "gestión segura de sesiones".

**D6. MFA verification step keeps state server-side (table `desafios_mfa`)**
After a successful password check for an MFA-enabled user, the API returns a short-lived `desafio_id` (opaque token) instead of issuing tokens; a server row holds `usuario_id`, TTL (5 min), `intentos_fallidos`, `resuelto_en`. `POST /api/auth/mfa/verificar` binds the TOTP code to that challenge. Invalid/expired/reused codes increment `intentos_fallidos`; at 5 failures the challenge is blocked and login must restart from the password step.
Alternative rejected: embedding a `mfa_pending` claim in a JWT — no central attempt-limit bookkeeping, harder to make replay-safe.

**D7. Endpoint protection via a reusable FastAPI dependency**
`get_usuario_actual` parses `Authorization: Bearer`, validates signature/`exp`, loads the user, and rejects non-`ACTIVO` users. Applied by default to every router (vehicles router gets it; new routers use it). Public set, explicitly whitelisted: `GET /health`, `POST /api/auth/login`, `POST /api/auth/mfa/verificar`.

**D8. Schema alignment as the single source of truth**
`database/schema.sql` gains the new columns/table, and the SQLAlchemy models mirror them. `create_all` remains the dev-time table creator; the SQL file stays canonical (per the existing comment in `main.py`).

**D9. Frontend auth gate (React)**
A minimal `AuthContext` + `LoginPage`/`MfaPage` render before the existing fleet view; a fetch wrapper attaches `Authorization`, answers 401 by calling `/refresh` once, else redirects to login. No router library or state manager added.

## Risks / Trade-offs

- **Correlation / theft of refresh cookie** → HttpOnly + Secure + SameSite=Strict; short TTL on access tokens limits the blast radius of a stolen access token; logout and reuse detection revoke instantly.
- **Clock skew breaks TOTP or JWT** → `window=1` on TOTP; JWT `leeway` of a few seconds; server relies on NTP.
- **Token revocation latency for access tokens** → accepted: 15-min window; refresh stays strictly server-gated. A server-side denylist is a possible later enhancement, not needed for the MVP.
- **First deploy requires a user to exist** → seed/CLI helper creates an initial `ADMINISTRADOR` user with a reset-on-first-login password policy; documented in Migration Plan.
- **Secret management** → new settings keys are required and fail fast in dev; production must inject them via env instead of defaults.

## Migration Plan

1. Add `argon2-cffi`, `pyotp`, `PyJWT` to `requirements.txt`.
2. Update `database/schema.sql` (additive: new columns + `sesiones`/`desafios_mfa` tables) and add matching SQLAlchemy models; existing `usuarios` rows keep working (new columns nullable/defaulted).
3. Release backend auth endpoints + protect `/api/vehiculos` (BREAKING for the current frontend) — deploy backend first.
4. Deploy frontend auth gate together with/right after the backend so the fleet screen always has a session path.
5. Rollback: revert frontend; on backend, temporarily remove the auth dependency from routers (revert step 3). New tables/columns are additive and can remain.

## Open Questions

None: the artifacts fully constrain behavior; remaining unknowns (QR library vs. manual base32 input, exact TTL values) are tunable constants that do not change specs, approach, or task breakdown.