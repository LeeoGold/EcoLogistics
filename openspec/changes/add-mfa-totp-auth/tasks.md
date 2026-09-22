# Tasks

## 1. Dependencias y configuración

- [ ] 1.1 Agregar `argon2-cffi`, `pyotp` y `PyJWT` a `backend/requirements.txt` y verificar que `pip install -r requirements.txt` instala sin errores
- [ ] 1.2 Agregar a `backend/app/core.py` los ajustes `access_token_secret`, `access_token_expire_min` (15), `refresh_token_expire_days` (30), `mfa_challenge_ttl_min` (5), `mfa_max_attempts` (5) y `mfa_challenge_block_min` (30), y verificar que `python -c "from app.core import settings"` funciona con `.env` actualizado
- [ ] 1.3 Actualizar `backend/.env.example` con las nuevas variables y sus valores de ejemplo

## 2. Modelos de datos y esquema

- [ ] 2.1 Agregar a `database/schema.sql` las columnas `mfa_totp_secret VARCHAR` y `mfa_habilitado BOOLEAN NOT NULL DEFAULT FALSE` en `usuarios`, y verificar que el archivo mantiene la sintaxis de PostgreSQL (validación manual o `psql` si está disponible)
- [ ] 2.2 Agregar a `database/schema.sql` la tabla `sesiones` (id, usuario_id FK, token_hash UNIQUE, token_anterior_hash, creado_en, expira_en, revocada_en, ip, user_agent) con sus índices, y verificar coherencia con `usuarios`
- [ ] 2.3 Agregar a `database/schema.sql` la tabla `desafios_mfa` (desafio_id, usuario_id FK, creado_en, expira_en, intentos_fallidos, bloqueado_hasta, resuelto_en) y verificar que las FK apuntan a tablas existentes
- [ ] 2.4 Crear en `backend/app/models.py` los modelos `Usuario`, `Rol`, `Sesion` y `DesafioMfa` alineados con `schema.sql` y verificar que `Base.metadata.create_all(engine)` crea/actualiza las tablas sin errores
- [ ] 2.5 Extender `backend/seed.py` para crear o actualizar un usuario administrador inicial (email, contraseña con hash Argon2, rol ADMINISTRADOR, estado ACTIVO) y verificar que la ejecución registra al usuario en `usuarios`

## 3. Seguridad y dependencias de autenticación

- [ ] 3.1 Crear `backend/app/security.py` con hash/verify Argon2 (`hash_password`, `verify_password`) y verificar con una prueba que el hash verifica correctamente y rechaza contraseñas distintas
- [ ] 3.2 Implementar en `backend/app/security.py` la generación y validación de tokens de acceso JWT (`create_access_token`, `decode_access_token`) y verificar que un token firmado se decodifica y uno alterado o vencido se rechaza
- [ ] 3.3 Implementar en `backend/app/security.py` la generación de tokens de refresco opacos (256 bits) con `hash_refresh_token` (SHA-256) y verificar que el hash no coincide con el original en texto claro
- [ ] 3.4 Crear la dependencia `get_usuario_actual` que valida el token Bearer, carga el usuario y rechaza a los inactivos, y verificar que devuelve `401` ante token ausente, inválido o expirado y con usuario no `ACTIVO`

## 4. Endpoints de autenticación

- [ ] 4.1 Crear `backend/app/routers/auth.py` con `POST /api/auth/login` que verifica credenciales, devuelve `401` genérico ante error, y responde `pending_mfa: true` con `desafio_id` (ver D6) cuando el usuario tiene MFA habilitado sin emitir token de acceso; verificar con pruebas contra la API
- [ ] 4.2 Crear `POST /api/auth/mfa/verificar` que valida el TOTP contra el desafío, emite token de acceso y entrega el token de refresco en cookie HttpOnly/Secure/SameSite=Strict al ser válido, e incrementa `intentos_fallidos` y bloquea el desafío al superar el límite; verificar con pruebas (válido, inválido, vencido, bloqueado)
- [ ] 4.3 Crear `POST /api/auth/refresh` que rota el token de refresco de la cookie, revoca el anterior y emite par nuevo, y detecta reutilización revocando la sesión completa (`401`); verificar que una rotación deja inutilizable el token anterior y que su reenvío revoca la sesión
- [ ] 4.4 Crear `POST /api/auth/logout` que revoca la sesión activa y limpia la cookie, y verificar que el token de refresco posterior recibe `401`
- [ ] 4.5 Registrar el router de auth en `app/main.py` con el conjunto público explícito (`/health`, login, mfa/verificar) y verificar que solo esos endpoints responden sin token

## 5. Registro de MFA TOTP por usuario

- [ ] 5.1 Crear `POST /api/auth/mfa/enroll` (autenticado) que genera secreto base32 y URI `otpauth://` y lo devuelve sin activar MFA (tuvo en cuenta D6), y verificar que el MFA sigue deshabilitado en la base hasta confirmar
- [ ] 5.2 Crear `POST /api/auth/mfa/activate` (autenticado) que activa MFA solo con un código TOTP válido del secreto generado, y verificar que un código incorrecto no activa y permite reintento
- [ ] 5.3 Verificar integración: tras activar MFA, un nuevo inicio de sesión responde `pending_mfa: true` y solo completa con el código TOTP correcto

## 6. Protección de endpoints existentes

- [ ] 6.1 Aplicar `get_usuario_actual` a los endpoints del router `vehicles.py` y verificar que las llamadas sin token o con token inválido reciben `401` (spec: Protección de endpoints autenticados)
- [ ] 6.2 Verificar extremo a extremo que una sesión completa (login → llamadas a `/api/vehiculos` con Bearer → logout) funciona y que, tras logout, las llamadas reciben `401`

## 7. Frontend (React/Vite)

- [ ] 7.1 Crear `AuthContext` que guarda el token de acceso en memoria, expone `login`/`logout` y adjunta `Authorization: Bearer` vía un wrapper de `fetch`; verificar que los componentes consumen el contexto sin errores de compilación (`npm run build`)
- [ ] 7.2 Crear las pantallas `LoginPage` (email + contraseña) y `MfaPage` (código TOTP) que respetan `pending_mfa` y el flujo de error genérico, y montar la compuerta de autenticación en `App.jsx` antes de la vista de flota; verificar `npm run build` y el flujo manual en `npm run dev`
- [ ] 7.3 Manejar `401` en el wrapper (intento único de `/refresh`, luego redirigir a login) y verificar manualmente que un token expirado renueva sesión sin perder la vista y que una sesión revocada vuelve a login

## 8. Pruebas y validación

- [ ] 8.1 Escribir pruebas automatizadas del flujo de autenticación (login válido/ inválido, MFA pendiente, verificación TOTP válida/inválida/bloqueo) y verificar que pasan
- [ ] 8.2 Escribir pruebas de sesiones (rotación, reutilización → revocación, logout, protección de endpoints) y verificar que pasan
- [ ] 8.3 Ejecutar la suite completa y validar contra los requisitos de `specs/auth/spec.md` y las decisiones de `design.md`, anotando el resultado en el resumen del cambio