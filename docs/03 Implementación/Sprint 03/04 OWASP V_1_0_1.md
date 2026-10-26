# Reporte de Seguridad — OWASP Top 10:2025

**Nombre del proyecto:** EcoLogística Huancayo
**Herramienta de análisis automatizado disponible:** SonarQube Cloud
**Pull Request de referencia:** [#6 — Sprint 3](https://github.com/LeeoGold/EcoLogistics/pull/6)
**Versión del documento:** V_1_0_1
**Fecha de actualización:** 2026-10-23

[← Índice del Sprint 3](README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## 1. Alcance y limitaciones

El análisis histórico de SonarQube Cloud del PR #6 obtuvo **Quality Gate passed**, registró **0 nuevas incidencias** y **0 Security Hotspots** en el análisis de ese pull request. Es una evidencia favorable sobre los cambios analizados en ese PR, pero **no equivale a una auditoría completa de OWASP Top 10:2025 ni demuestra que toda la aplicación esté libre de riesgos**. Esos resultados corresponden al análisis histórico del PR y no deben presentarse como el estado actual de la rama de trabajo.

Durante la revisión local de la rama de auditoría se obtuvieron estos resultados técnicos:

- **Backend:** 47 pruebas aprobadas de 47; cobertura local de `pytest-cov` del **97 %** (820 instrucciones, 23 sin cubrir).
- **Frontend:** `npm audit` informó **0 vulnerabilidades** en la ejecución realizada.
- **Dependencias Python:** `pip-audit` informó **No known vulnerabilities found** en la ejecución realizada.
- **Compilación frontend:** Vite **8.3.5** compiló correctamente y transformó **44 módulos**.
- **Advertencia de pruebas:** Starlette emitió una advertencia de obsolescencia relacionada con el uso de `httpx` en `starlette.testclient`.

Estos resultados son verificaciones locales acotadas. No acreditan por sí solos la cobertura global actual de SonarQube, la seguridad del entorno desplegado, la conformidad completa con OWASP ni la revisión integral de GitHub Actions.

La matriz conserva las diez categorías de OWASP Top 10:2025. Las categorías se mantienen **Bajo revisión** salvo donde la inspección del código permitió documentar un hallazgo concreto. No se marca ninguna categoría como “Limpio” basándose únicamente en que un análisis no haya registrado nuevas incidencias.

## 2. Matriz de revisión OWASP Top 10:2025

| Categoría OWASP Top 10:2025 | Estado de revisión | Evidencia disponible | Verificación específica pendiente o acción requerida |
|---|---|---|---|
| **A01:2025 — Pérdida de Control de Acceso** | **Hallazgo en revisión estática del backend; protección externa no verificada** | Los routers de clientes, conductores, pedidos, rutas y vehículos no declaran dependencias de autenticación o autorización. Los endpoints examinados declaran `Depends(get_db)`, que proporciona una sesión de base de datos y no constituye por sí mismo un control de acceso. `main.py` incluye los routers sin declarar un middleware de autenticación. | Verificar si existe protección en un proxy, gateway u otra capa externa. Incorporar y probar autenticación, autorización por rol y recurso, denegación por defecto y restricciones de acceso a registros ajenos. Probar cada operación protegida con solicitudes anónimas y con permisos insuficientes. |
| **A02:2025 — Configuración de Seguridad Incorrecta** | Bajo revisión | `core.py` obtiene configuración mediante `BaseSettings`; `main.py` configura CORS con orígenes derivados de `cors_origins`, `allow_credentials=True` y métodos/cabeceras permitidos con `"*"`. La configuración por defecto muestra `http://localhost:5173`, pero no se ha verificado la configuración efectiva del despliegue. | Revisar CORS en el entorno real, modo debug, variables obligatorias, secretos, cabeceras de seguridad, permisos, mensajes de error y configuración de producción. Confirmar que no se reutilicen valores de desarrollo en producción. |
| **A03:2025 — Fallas en la Cadena de Suministro de Software** | Revisión parcial; quedan controles pendientes | En las comprobaciones locales, `npm audit` informó 0 vulnerabilidades y `pip-audit` no encontró vulnerabilidades conocidas. El frontend se compiló con Vite 8.3.5 y dispone de `package-lock.json`. | Registrar fecha, versión y salida de cada auditoría; revisar dependencias transitivas, lockfiles, versiones de GitHub Actions, permisos de workflows y procedencia de artefactos. Repetir los análisis en CI o en la rama que se vaya a integrar. Los resultados locales no sustituyen estas comprobaciones. |
| **A04:2025 — Fallas Criptográficas** | Bajo revisión | `requirements.txt` declara dependencias como `argon2-cffi` y `PyJWT`, y `core.py` contiene variables de configuración relacionadas con tokens y MFA. No se encontró un flujo funcional de autenticación o uso de tokens en el código inspeccionado. La declaración de una dependencia no demuestra su uso correcto. | Si se implementa autenticación, verificar almacenamiento seguro de credenciales, algoritmos y expiración de tokens, manejo de secretos, transporte seguro y protección de datos sensibles. Confirmar que ningún secreto real esté versionado. |
| **A05:2025 — Inyección** | Bajo revisión | Los modelos de entrada utilizan esquemas Pydantic y el proyecto utiliza SQLAlchemy. Las pruebas funcionales pasan, pero no se presentó una prueba de seguridad específica de inyección para todas las entradas y consultas. | Revisar las consultas y operaciones de persistencia, validación de entradas, serialización y cualquier consulta dinámica. Añadir pruebas específicas para entradas malformadas y casos de inyección cuando corresponda. |
| **A06:2025 — Diseño Inseguro** | Bajo revisión | No se adjuntó un modelado de amenazas ni una evaluación completa de escenarios de abuso de las reglas de negocio. | Identificar activos, límites de confianza y operaciones críticas. Analizar abuso de flujos de pedidos, clientes, conductores y rutas, límites de capacidad, estados y permisos cuando se diseñe el control de acceso. |
| **A07:2025 — Fallas de Autenticación** | **Hallazgo en revisión estática del backend; flujo funcional no identificado** | En los archivos inspeccionados no se encontraron dependencias como `OAuth2PasswordBearer` o `HTTPBearer`, generación/validación de JWT ni rutas de inicio/cierre de sesión. Los parámetros `access_token_secret`, expiración de tokens y MFA en `core.py` no demuestran por sí solos que exista un flujo funcional. Los routers examinados no muestran una dependencia de autenticación. | Confirmar si la autenticación se aplica en una capa externa. Definir e implementar el flujo de identidades y credenciales o integrar un proveedor existente; probar solicitudes anónimas, credenciales inválidas, expiración/revocación de tokens, limitación de intentos y permisos. No considerar MFA implementado hasta que exista y se pruebe el flujo correspondiente. |
| **A08:2025 — Fallas en la Integridad del Software o de los Datos** | Bajo revisión | El repositorio incluye lockfile del frontend y workflows de CI. No se ha realizado una revisión completa de integridad, procedencia, permisos de workflows ni protección de ramas. | Revisar validación e integridad de datos, permisos mínimos de GitHub Actions, protección de ramas/PR, dependencias y confianza en artefactos. Registrar evidencias de las protecciones realmente habilitadas. |
| **A09:2025 — Fallas en el Registro, Alerta y Monitoreo de Seguridad** | Bajo revisión | El resultado de SonarQube del PR no evalúa la capacidad de registro y alerta durante la ejecución de la aplicación. No se ha documentado una verificación de alertas operativas. | Verificar registro de eventos de seguridad y acciones críticas, protección de datos sensibles en logs, retención, alertado y procedimiento de respuesta. Evitar registrar credenciales, tokens o secretos. |
| **A10:2025 — Manejo Inadecuado de Condiciones Excepcionales** | Bajo revisión | La suite local pasa 47 pruebas y los esquemas incluyen validación de entradas. No se ha presentado una auditoría dirigida de fallos parciales, timeouts, reintentos o condiciones fail-open. | Revisar transacciones, errores, estados parciales, timeouts, reintentos y cierre seguro ante excepciones. Añadir pruebas dirigidas para los flujos críticos y comprobar que un fallo no deje operaciones en un estado inconsistente. |

**Nota de alcance:** los hallazgos de A01 y A07 describen la protección que se observa en el backend revisado. No se ha comprobado si la API está restringida por un proxy, gateway, firewall u otro control del entorno de despliegue. Hasta confirmar esa cuestión, no debe afirmarse que la aplicación desplegada sea accesible públicamente sin autenticación; sí debe tratarse la ausencia de controles visibles en el backend como un riesgo importante que requiere resolución.

## 3. Hallazgos y Security Hotspots

### 3.1 Resultados históricos de SonarQube

- **Security Hotspots en el análisis del PR #6:** 0, según el resultado histórico de `SonarCloud Code Analysis` registrado para ese PR.
- **Nuevas incidencias en el PR #6:** 0, según el mismo análisis histórico.
- **Resultado de Quality Gate del PR #6:** `passed`.

Estas cifras no sustituyen la revisión del estado actual de SonarQube en la rama de trabajo ni la comprobación posterior a los cambios locales descritos en este documento.

### 3.2 Hallazgos registrados

| ID | Categoría | Prioridad preliminar | Estado | Evidencia y riesgo | Acción requerida |
|---|---|---|---|---|---|
| **SEC-001** | A01:2025 — Pérdida de Control de Acceso | Alta, pendiente de verificar la exposición del despliegue | Abierto | Los routers de clientes, conductores, pedidos, rutas y vehículos no muestran dependencias de autenticación/autorización; los endpoints examinados usan `Depends(get_db)`. Si no hay una capa protectora externa, podrían aceptarse operaciones sin los permisos previstos. | Confirmar los controles externos; proteger operaciones y recursos en el servidor; probar solicitudes anónimas, permisos insuficientes y acceso a registros ajenos. |
| **SEC-002** | A07:2025 — Fallas de Autenticación | Alta, pendiente de verificar la exposición del despliegue | Abierto | No se identificó un flujo funcional de autenticación en los archivos inspeccionados. Las variables de tokens y MFA definidas en `core.py` no acreditan una implementación operativa. | Confirmar si existe un proveedor o control externo; implementar o integrar autenticación y ejecutar pruebas positivas y negativas. |
| **SEC-003** | Hallazgo histórico del analizador; clasificación OWASP pendiente | Según la clasificación histórica de SonarQube: Security — High y Reliability — High | Corrección local candidata; retest de SonarQube pendiente | En una captura de `main` fechada el 2026-10-22 se observó la regla `pythonenterprise:S8434`, “Time-dependent expressions should not be used in class attributes”, en `backend/app/schemas/vehicle.py`, línea 20. La implementación local se cambió para validar el año mediante `field_validator` en lugar de calcular el límite dinámico en un atributo de clase. La suite actual pasa 47/47 pruebas y el esquema `vehicle.py` aparece con 100 % de cobertura local. | Ejecutar un nuevo análisis de SonarQube tras integrar o analizar esta revisión y confirmar si la incidencia desapareció. No marcarla como resuelta únicamente por las pruebas locales. |

No se inventan identificadores de “Hotspot #1” o “Hotspot #2”. Para cada nuevo resultado real de SonarQube se deberá registrar la clave/regla, archivo y línea, riesgo, recomendación, responsable, estado y evidencia del retest.

## 4. Plan de verificación y remediación

1. **Resolver SEC-001 y SEC-002:** confirmar si existe una capa externa de protección de la API. Si no existe, definir el modelo de identidades y permisos e implementar controles de autenticación y autorización en el servidor antes de exponer el sistema a usuarios o redes no confiables.
2. **Añadir pruebas de seguridad:** probar solicitudes anónimas, credenciales inválidas, permisos insuficientes, acceso cruzado entre recursos y rutas protegidas. Registrar el comportamiento y los códigos HTTP observados. No dar por resuelto un hallazgo sin pruebas de retest.
3. **Repetir SonarQube:** analizar el código actualizado y revisar Issues/Security para confirmar el estado de `pythonenterprise:S8434` y registrar las métricas actuales. Separar la cobertura local de `pytest-cov` de la cobertura global de SonarQube.
4. **Revisar configuración y dependencias:** verificar CORS y configuración de producción; repetir `npm audit` y `pip-audit`; revisar GitHub Actions, permisos, versiones y procedencia de artefactos.
5. **Completar las categorías restantes:** ejecutar revisiones específicas para A02, A03, A04, A05, A06, A08, A09 y A10. Clasificar cada categoría como hallazgo, sin hallazgos observados en las comprobaciones realizadas o pendiente; no declarar seguridad absoluta.
6. **Actualizar evidencias:** anotar para cada comprobación fecha, rama/commit, herramienta y versión, resultado, archivo o pantalla de evidencia, responsable y estado de corrección.

## 5. Referencias

- [OWASP Top 10:2025 — versión oficial en español](https://top10.owasp.org/2025/es/)
- [OWASP Top 10:2025 — A01 Pérdida de Control de Acceso](https://top10.owasp.org/2025/es/A01_2025-Broken_Access_Control/)
- [OWASP Top 10:2025 — A07 Fallas de Autenticación](https://top10.owasp.org/2025/es/A07_2025-Authentication_Failures/)
- [Introducción oficial a OWASP Top 10:2025](https://top10.owasp.org/2025/es/0x00_2025-Introduction/)
- [Análisis de SonarQube Cloud del proyecto](https://sonarcloud.io/project/overview?id=LeeooGold_EcoLogistics)
- [Pull Request #6 — Sprint 3](https://github.com/LeeoGold/EcoLogistics/pull/6)

## Navegación

- [Índice del Sprint 3](README.md)
- [Índice de implementación](../README.md)
- [README principal](../../../README.md)
