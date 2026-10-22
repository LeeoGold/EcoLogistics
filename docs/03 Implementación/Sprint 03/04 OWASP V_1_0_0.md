# Reporte de Seguridad — OWASP Top 10:2025

**Nombre del proyecto:** EcoLogística Huancayo\
**Herramienta de análisis automatizado disponible:** SonarQube Cloud\
**Pull Request de referencia:** [#6 — Sprint 3](https://github.com/LeeoGold/EcoLogistics/pull/6)\
**Versión del documento:** V_1_0_0\
**Fecha de preparación:** 2026-10-20

[← Índice del Sprint 3](README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## 1. Alcance y limitaciones

El análisis de SonarQube Cloud del PR #6 obtuvo **Quality Gate passed**, registró **0 nuevas incidencias** y **0 Security Hotspots** en el análisis del pull request. Esto es evidencia favorable sobre los cambios del PR, pero **no constituye por sí solo una auditoría completa OWASP Top 10:2025 ni demuestra que toda la aplicación esté libre de riesgos**.

La matriz siguiente conserva la estructura oficial de OWASP Top 10:2025. Todas las categorías permanecen como **Bajo revisión** hasta que se inspeccionen los componentes pertinentes, se identifiquen pruebas/evidencias y se revise el resultado actual de SonarQube. No se marca una categoría como “Limpio” basándose únicamente en que el PR no tuvo incidencias nuevas.

## 2. Matriz de revisión OWASP Top 10:2025

| Categoría OWASP Top 10:2025 | Estado actual | Evidencia disponible | Verificación específica requerida |
|---|---|---|---|
| **A01:2025 — Pérdida de Control de Acceso** | Bajo revisión | El resumen del PR no reportó nuevas incidencias; no hay auditoría de autorización por recurso adjunta. | Verificar autenticación, autorización por rol/recurso, acceso a registros ajenos y rutas/API protegidas. SSRF forma parte de esta categoría en OWASP 2025. |
| **A02:2025 — Configuración de Seguridad Incorrecta** | Bajo revisión | El repositorio utiliza configuración por entorno; el análisis del PR no representa una revisión completa de configuración desplegada. | Revisar CORS, modo debug, variables requeridas, cabeceras, permisos, mensajes de error y configuración de producción. |
| **A03:2025 — Fallas en la Cadena de Suministro de Software** | Bajo revisión | CI usa `npm ci`, `package-lock.json` y versiones declaradas de acciones; no se dispone de evidencia de un análisis completo de dependencias. | Revisar dependencias directas/transitivas, advisories, lockfiles, versiones y referencias de GitHub Actions; registrar actualizaciones necesarias. |
| **A04:2025 — Fallas Criptográficas** | Bajo revisión | El backend declara dependencias de criptografía/hash/autenticación, pero el PR #6 no evalúa sus configuraciones funcionales. | Inspeccionar almacenamiento de contraseñas, secretos, configuración de tokens, algoritmos, transporte y datos sensibles. |
| **A05:2025 — Inyección** | Bajo revisión | El análisis del PR no reportó nuevas incidencias; no hay pruebas de seguridad de entradas adjuntas. | Revisar consultas SQL/ORM, validación Pydantic, serialización y cualquier construcción dinámica de consultas o comandos. |
| **A06:2025 — Diseño Inseguro** | Bajo revisión | No se adjuntó modelado de amenazas ni evaluación de abuso de reglas de negocio. | Identificar activos y límites de confianza; probar autorización en flujos de pedidos, clientes, conductores y rutas, límites y escenarios de abuso. |
| **A07:2025 — Fallas de Autenticación** | Bajo revisión | Hay dependencias relacionadas con autenticación declaradas; no se dispone de resultado de pruebas de autenticación para esta entrega. | Revisar expiración y validación de tokens, gestión de sesiones, protección ante fuerza bruta, recuperación de acceso y MFA si aplica. |
| **A08:2025 — Fallas en la Integridad del Software o de los Datos** | Bajo revisión | CI se ejecuta con acciones declaradas y un lockfile del frontend; no hay revisión formal de integridad/procedencia. | Revisar validación de datos, confianza en artefactos, permisos de workflow y protección de ramas/PR. |
| **A09:2025 — Fallas en el Registro, Alerta y Monitoreo de Seguridad** | Bajo revisión | Las capturas de SonarQube del PR no evalúan registros ni alertas en ejecución. | Verificar eventos de autenticación y acciones críticas, protección de datos sensibles en logs, retención, alertado y respuesta. |
| **A10:2025 — Manejo Inadecuado de Condiciones Excepcionales** | Bajo revisión | Las pruebas funcionales pasaron; no se presentó un análisis dirigido a fallos, fail-open o errores de lógica. | Revisar validación de fallos, transacciones, respuestas de error, estados parciales, timeouts, reintentos y cierre seguro ante excepciones. |

## 3. Security Hotspots y vulnerabilidades

### Hallazgos observados en el análisis de seguridad

- **Security Hotspots en el análisis del PR #6:** 0 según el check `SonarCloud Code Analysis`.
- **Nuevas incidencias en el PR #6:** 0.
- **Incidencia de seguridad observada en `main` (captura del 2026-10-22):** regla `pythonenterprise:S8434`, “Time-dependent expressions should not be used in class attributes”, en `backend/app/schemas/vehicle.py`, línea 20. SonarQube la clasifica como Security — High y Reliability — High. El problema descrito consiste en calcular `date.today().year + 1` al importar el módulo, con posibilidad de que el límite de validación quede desactualizado. Se documenta como hallazgo de seguridad del analizador, pero no se asigna automáticamente a una categoría OWASP específica sin una evaluación adicional de su contexto e impacto.

No se completa una descripción inventada para “Hotspot #1” o “Hotspot #2”. Cuando se revise la pantalla de incidencias, añadir para cada resultado real: clave/regla, archivo y línea, riesgo, recomendación, responsable y estado de corrección.

## 4. Plan de verificación y remediación

1. Abrir el resumen actual de SonarQube en la rama principal después del merge y revisar Issues/Security; registrar los resultados con fecha.
2. Inspeccionar el código y las pruebas pertinentes para cada una de las diez categorías; clasificar cada fila como limpio, vulnerable o bajo revisión únicamente con evidencia suficiente.
3. Revisar dependencias y avisos de seguridad de Python, Node/npm y acciones de GitHub.
4. Registrar cada hallazgo con archivo/línea, prioridad, acción correctiva y evidencia de retest. Si no hay hallazgos, documentar qué pruebas se ejecutaron en lugar de inferir que no existe riesgo.

## 5. Referencias

- [OWASP Top 10:2025 — versión oficial en español](https://top10.owasp.org/2025/es/)
- [Introducción oficial a OWASP Top 10:2025](https://top10.owasp.org/2025/es/0x00_2025-Introduction/)
- [Análisis de SonarQube Cloud del proyecto](https://sonarcloud.io/project/overview?id=LeeooGold_EcoLogistics)
- [Pull Request #6](https://github.com/LeeoGold/EcoLogistics/pull/6)

## Navegación

- [Índice del Sprint 3](README.md)
- [Índice de implementación](../README.md)
- [README principal](../../../README.md)
