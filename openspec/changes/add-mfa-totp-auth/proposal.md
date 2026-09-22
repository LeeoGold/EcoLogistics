# Proposal

## Why

EcoLogística Huancayo gestiona información sensible (usuarios, clientes, conductores, rutas) y su RNF-003 exige que el 100 % de los endpoints estén protegidos mediante autenticación y autorización, pero hoy el backend no tiene ningún mecanismo de autenticación: las tablas `roles` y `usuarios` están definidas en `database/schema.sql` sin código que las use y todos los endpoints (p. ej. `/api/vehiculos`) son de acceso abierto. Se necesita autenticación por contraseña reforzada con un segundo factor TOTP y una gestión de sesiones segura y revocable como base de seguridad de toda la plataforma.

## What Changes

- Nuevo módulo de autenticación en el backend (FastAPI) con login por email y contraseña, usando hash seguro (Argon2) para `password_hash`.
- Registro y verificación de MFA con códigos TOTP (RFC 6238), habilitable de forma opcional por usuario; el inicio de sesión de usuarios con MFA activo exige el segundo factor.
- Gestión segura de sesiones: tokens de acceso de corta duración (JWT), tokens de refresco persistentes con rotación y revocación, y cierre de sesión.
- **BREAKING**: protección obligatoria de todos los endpoints existentes y futuros mediante una dependencia de autenticación; las llamadas actuales a la API y la pantalla de gestión de flota dejarán de funcionar sin sesión activa.
- Modelos SQLAlchemy y ajustes a `database/schema.sql` para sesiones y TOTP (`usuarios.mfa_totp_secret`, tabla `sesiones`).
- Pantallas en el frontend (React/Vite): inicio de sesión, verificación del código TOTP y manejo del token de acceso.
- Pruebas automatizadas del flujo de autenticación, MFA y revocación de sesiones.

## Capabilities

### New Capabilities
- `auth`: autenticación de usuarios por contraseña, segundo factor MFA TOTP y gestión segura de sesiones con tokens de acceso y refresco.

### Modified Capabilities
Ninguna: no existen specs previas en el proyecto.

## Impact

- **backend/app**: nuevos modelos y tablas (usuario, rol, sesión), schemas Pydantic, router de autenticación (`/api/auth`), dependencias de seguridad, y ajustes en `main.py`, `core.py` y `requirements.txt`.
- **database/schema.sql**: nuevas columnas en `usuarios` y nueva tabla `sesiones`; se mantiene la coherencia con `Base.metadata.create_all`.
- **frontend**: nuevas pantallas de login y verificación MFA, y manejo del token de acceso para las llamadas a la API.
- **Dependencias**: `pyotp`, `argon2-cffi` (o equivalente) y `PyJWT`.
- **Seguridad**: todos los endpoints protegidos por defecto; los datos de sesión permiten revocación y detección de reutilización de tokens de refresco.