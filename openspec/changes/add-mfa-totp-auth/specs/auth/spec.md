# Spec Delta

## Purpose

Permite que los usuarios de EcoLogística Huancayo se autentiquen con contraseña y segundo factor TOTP, y gestiona sesiones seguras con tokens de acceso y refresco revocables que protegen toda la API.

## ADDED Requirements

### Requirement: Registro de contraseña segura
El sistema SHALL almacenar la contraseña de cada usuario únicamente como un hash criptográfico con sal (Argon2); está prohibido persistir o exponer la contraseña en texto plano a través de cualquier endpoint o log. El campo `password_hash` de la tabla `usuarios` es la única representación persistida de la contraseña y cumple con el modelo definido en `database/schema.sql`.

#### Scenario: Contraseña nunca almacenada en texto plano
- **WHEN** un usuario es creado con una contraseña
- **THEN** el sistema persiste solo el hash con sal y ninguna respuesta de la API devuelve la contraseña o su hash

### Requirement: Inicio de sesión por contraseña
El sistema SHALL permitir que un usuario de estado `ACTIVO` inicie sesión enviando su email y contraseña. Con credenciales válidas, el sistema SHALL emitir un token de acceso de corta duración y un token de refresco, y SHALL indicar si el usuario tiene MFA habilitado. Si el usuario tiene MFA habilitado, el token de acceso NO se emite hasta superar la verificación del segundo factor.

#### Scenario: Credenciales válidas sin MFA
- **WHEN** un usuario con MFA deshabilitado envía email y contraseña correctos
- **THEN** el sistema devuelve un token de acceso válido, un token de refresco e indica que MFA no está pendiente

#### Scenario: Credenciales válidas con MFA pendiente
- **WHEN** un usuario con MFA habilitado envía email y contraseña correctos
- **THEN** el sistema devuelve una respuesta de "MFA pendiente" con un identificador del desafío y NO emite un token de acceso

#### Scenario: Credenciales inválidas
- **WHEN** un usuario envía un email o contraseña incorrectos, o un usuario con estado distinto de `ACTIVO`
- **THEN** el sistema responde `401 Unauthorized` sin revelar cuál de los dos datos fue incorrecto

### Requirement: Verificación de segundo factor TOTP
El sistema SHALL verificar códigos TOTP (RFC 6238) generados con el secreto del usuario. Un código válido dentro de su ventana de tiempo SHALL completar el inicio de sesión y emitir el token de acceso y el token de refresco. Un código inválido, vencido o reutilizado SHALL ser rechazado, y el sistema SHALL limitar los intentos fallidos consecutivos bloqueando temporalmente el desafío para prevenir fuerza bruta.

#### Scenario: Código TOTP válido
- **WHEN** un usuario con un desafío pendiente envía un código TOTP válido y vigente
- **THEN** el sistema emite un token de acceso y un token de refresco, y el otro factor se marca como verificado

#### Scenario: Código TOTP inválido
- **WHEN** un usuario con un desafío pendiente envía un código TOTP incorrecto u obsoleto
- **THEN** el sistema responde `401 Unauthorized`, incrementa el contador de intentos y el desafío continúa pendiente

#### Scenario: Bloqueo por intentos fallidos
- **WHEN** un usuario supera el límite de intentos TOTP fallidos consecutivos
- **THEN** el sistema bloquea el desafío por un período de tiempo y exige reiniciar el paso de contraseña

### Requirement: Habilitación de MFA TOTP por usuario
El sistema SHALL permitir que un usuario autenticado genere un secreto TOTP y un URI de aprovisionamiento (otpauth) para registrarlo en una aplicación autenticadora, y SHALL activar MFA solo al confirmar con un código TOTP válido. El secreto se hace efectivo únicamente cuando el código de confirmación es correcto.

#### Scenario: Generación del secreto de enrolamiento
- **WHEN** un usuario autenticado solicita habilitar MFA
- **THEN** el sistema genera un secreto TOTP, devuelve el URI `otpauth://` y el secreto en base32, y el MFA permanece deshabilitado hasta la confirmación

#### Scenario: Activación confirmada
- **WHEN** el usuario envía un código TOTP válido generado con el secreto recién generado
- **THEN** el sistema activa MFA para ese usuario y futuros inicios de sesión requieren el segundo factor

#### Scenario: Activación fallida
- **WHEN** el usuario envía un código TOTP incorrecto durante la confirmación
- **THEN** el sistema rechaza la activación, mantiene MFA deshabilitado y permite reintentar

### Requirement: Gestión de sesiones con tokens de acceso y refresco
El sistema SHALL emitir tokens de acceso con expiración de corta duración que autentican cada solicitud, y tokens de refresco de mayor duración persistidos como sesiones revocables. Un token de refresco SHALL poder intercambiarse por un par nuevo (rotación), invalidando el anterior. El cierre de sesión SHALL revocar la sesión y dejar de aceptar su token de refresco.

#### Scenario: Acceso con token válido
- **WHEN** una solicitud incluye un token de acceso vigente y no revocado
- **THEN** el sistema identifica al usuario y permite ejecutar la operación

#### Scenario: Rotación del token de refresco
- **WHEN** un cliente intercambia un token de refresco vigente por un par nuevo
- **THEN** el sistema emite un nuevo token de acceso y un nuevo token de refresco, y revoca el token de refresco anterior

#### Scenario: Cierre de sesión
- **WHEN** un usuario autenticado cierra sesión
- **THEN** el sistema revoca su token de refresco y las solicitudes posteriores con ese token reciben `401 Unauthorized`

### Requirement: Protección de endpoints autenticados
El sistema SHALL exigir un token de acceso válido en todos los endpoints de la API, excepto los endpoints explícitamente públicos de autenticación (inicio de sesión, verificación TOTP, estado de salud). Una solicitud sin token, con token inválido o con token expirado SHALL recibir `401 Unauthorized`.

#### Scenario: Solicitud sin autenticación
- **WHEN** una solicitud sin token de acceso invoca cualquier endpoint protegido
- **THEN** el sistema responde `401 Unauthorized` y no ejecuta la operación

#### Scenario: Token expirado
- **WHEN** una solicitud incluye un token de acceso cuya vigencia expiró
- **THEN** el sistema responde `401 Unauthorized` e indica que el token expiró

### Requirement: Detección de reutilización de tokens de refresco
El sistema SHALL invalidar la sesión completa al detectar que un token de refresco ya rotado es reutilizado, obligando al usuario a iniciar sesión nuevamente.

#### Scenario: Reutilización de un token de refresco revocado
- **WHEN** un cliente envía un token de refresco que ya fue rotado o revocado
- **THEN** el sistema revoca la sesión asociada y responde `401 Unauthorized`