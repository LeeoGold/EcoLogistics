# Índice de implementación y validación

[← Volver al README principal](../../README.md)

| Dato | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo (EcoLogistics) |
| Actualización del índice | 08/11/2026 |

Esta carpeta reúne la documentación de los incrementos por Sprint y la entrega transversal de Green IT. Los informes de cada Sprint son registros históricos: sus pruebas, métricas y pendientes pertenecen a la fecha en que se elaboraron. La última referencia técnica para la Inspección 04 es el índice Green IT enlazado en esta página.

## 1. Navegación por entregable

| Entregable | Índice | Alcance |
|---|---|---|
| Sprint 1 | [README del Sprint 1](./Sprint%201/README.md) | Primer incremento funcional y cierre de la primera iteración. |
| Sprint 2 | [README del Sprint 2](./Sprint%202/README.md) | Gestión operativa y flota; registro histórico del segundo Sprint. |
| Sprint 3 | [README del Sprint 3](./Sprint%2003/README.md) | Calidad de código, evaluación de seguridad OWASP y accesibilidad WCAG. |
| Inspección 04 — Green IT | [README Green IT](./reduccion%20del%20impacto%20ambiental/README.md) | Paginación, consultas SQL, code splitting, APIs nativas, caché HTTP, GZip, Lighthouse CI y estimación SWDM v4. |

## 2. Documentos Green IT para la entrega

| Documento | Uso |
|---|---|
| [01 Informe de reducción del impacto ambiental](./reduccion%20del%20impacto%20ambiental/01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) | Explica las optimizaciones, los fragmentos antes/después, las métricas Lighthouse y el escenario SWDM v4. |
| [02 Estándares de ingeniería de software](./reduccion%20del%20impacto%20ambiental/02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md) | Relaciona el trabajo con ISO/IEC 25010, GSF, W3C WSG y prácticas de ingeniería. |
| [03 Matriz de trazabilidad de la rúbrica](./reduccion%20del%20impacto%20ambiental/03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md) | Ubica cada criterio, su evidencia y sus límites para preparar la defensa. |
| [Evidencias Green IT](./reduccion%20del%20impacto%20ambiental/evidencias/README.md) | Enumera capturas funcionales, pruebas, builds y reportes Lighthouse originales. |

## 3. Documentos de Sprint 1, Sprint 2 y Sprint 3

Los informes y retrospectivas se conservan dentro de la carpeta de cada Sprint. Consulta los índices individuales para encontrar la versión documental vigente de cada periodo:

- [Sprint 1](./Sprint%201/README.md)
- [Sprint 2](./Sprint%202/README.md)
- [Sprint 3](./Sprint%2003/README.md)

El Sprint 3 contiene análisis históricos de seguridad y accesibilidad de octubre de 2026. La existencia posterior de autenticación JWT en el código no significa que la matriz OWASP histórica se haya cerrado automáticamente; los controles deben volver a verificarse contra el estado actual.

## 4. Versionado y criterio de lectura

- Los entregables de Sprint conservan el estado registrado al cierre de cada iteración.
- Las mejoras transversales Green IT se documentan en su propia carpeta y enlazan al código y a las evidencias.
- El tag Git y la Release de GitHub `v1.0.0` identifican la entrega Green IT sobre `main`.
- La publicación planificada del MVP en Jira es un registro independiente; la captura archivada muestra el estado `UNRELEASED`.
- No se deben combinar métricas de ejecuciones distintas como si fueran una misma medición.

## 5. Historial del índice

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_2_0 | 09/10/2026 | Separación documental por Sprint y navegación inicial. |
| V_1_3_0 | 20/10/2026 | Incorporación del índice y entregables del Sprint 3. |
| V_1_4_0 | 08/11/2026 | Incorporación de la Inspección 04, la Release Green IT y la distinción entre resultados históricos y vigentes. |
