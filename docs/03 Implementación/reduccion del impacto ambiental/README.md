# Inspección 04 — Green IT | EcoLogistics

[← Implementación](../README.md) · [README principal](../../../README.md) · [Release `v1.0.0`](https://github.com/LeeoGold/EcoLogistics/releases/tag/v1.0.0) · [PR #13 integrado](https://github.com/LeeoGold/EcoLogistics/pull/13)

| Dato | Valor |
|---|---|
| Entrega inicial | EcoLogistics `v1.0.0 — Green IT Release` |
| Rama actual revisada | `main` |
| Commit de la Release | [`6041fe83`](https://github.com/LeeoGold/EcoLogistics/commit/6041fe83d54367afd7a00139c1366d9f4c90c2fa) |
| Corrección posterior | PR [#13](https://github.com/LeeoGold/EcoLogistics/pull/13), integrado en `main` |
| Commit actual revisado | [`1e802404`](https://github.com/LeeoGold/EcoLogistics/commit/1e802404c1171ecaf279807b686911728a3cb468) |
| Estado | CI y Green IT Audit aprobados en la ejecución del merge de PR #13. |

## 1. Propósito

Esta carpeta concentra los documentos de la Inspección 04. Su objetivo es explicar qué optimizaciones Green IT están implementadas en el código real, qué mediciones las respaldan, cómo se relacionan con los estándares y qué limitaciones deben comunicarse durante la presentación.

El stack evaluado es React 19 + Vite 8 en frontend, FastAPI/Python en API, SQLAlchemy como ORM y PostgreSQL como base de datos. Los ejemplos MERN de la rúbrica se adaptan por equivalencia funcional; no se afirma que el proyecto use MongoDB o Express.

## 2. Resultados técnicos resumidos

| Validación | Resultado documentado | Alcance |
|---|---:|---|
| Backend | 81 pruebas aprobadas | CI del merge de PR #13; Python 3.13.18 y pytest 8.4.2. |
| Frontend | 14 pruebas aprobadas en 4 archivos | CI del merge de PR #13. |
| Build frontend | Aprobado | Job de compilación del workflow CI. |
| SonarQube Cloud | Quality Gate aprobado; 0 issues nuevas | Análisis asociado a PR #13. |
| Lighthouse CI histórico | 100/100 en tres ejecuciones | Solo `/login`, Desktop, compilación local de producción (03/11/2026). |
| Lighthouse Chrome — seis vistas | Performance 94–100/100 | Inicio, Flota, Clientes, Conductores, Pedidos y Rutas (10/11/2026). |
| FCP / LCP — seis vistas | 325–379 ms / 478–539 ms | Una medición por vista; informes originales HTML/JSON. |
| TBT / CLS — seis vistas | 0 ms / 0–0.15651 | El CLS supera 0.02 en Flota, Conductores y Pedidos. |
| Transferencia — seis vistas | 78.7–84.5 KiB | Métrica `total-byte-weight` por vista. |
| GitHub Actions | CI y Green IT Audit aprobados | Ejecución posterior al merge de PR #13. |

Los reportes históricos de `/login` y la auditoría Chrome de seis vistas son mediciones distintas y se conservan por separado. Los HTML y JSON nuevos, junto con su resumen, están en [`evidencias/lighthouse-chrome-20261110/`](./evidencias/lighthouse-chrome-20261110/RESULTADOS.md).

### Workflows de GitHub Actions

El repositorio separa la validación general del proyecto de la auditoría de rendimiento:

| Workflow | Archivo | Función | Resultado verificado |
|---|---|---|---|
| CI general | [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml) | Ejecuta pytest, Vitest, build del frontend y análisis SonarQube Cloud. | [Ejecución del merge de PR #13](https://github.com/LeeoGold/EcoLogistics/actions/runs/42551297248): jobs aprobados; SonarQube Quality Gate aprobado. |
| Green IT Audit | [`.github/workflows/green-audit.yml`](../../../.github/workflows/green-audit.yml) | Genera el build de producción y ejecuta Lighthouse CI sobre las URL configuradas. | [Ejecución posterior al merge](https://github.com/LeeoGold/EcoLogistics/actions/runs/42551297294): job completado correctamente; auditoría CI sobre `/login`. |

Los resultados corresponden a ejecuciones concretas de GitHub Actions. La nueva auditoría manual Chrome de seis vistas se aporta como evidencia adicional; no forma parte de las URL configuradas en `frontend/lighthouserc.json`.

## 3. Estado de las ocho áreas de optimización

| # | Área de la rúbrica | Estado | Evidencia principal / precisión |
|---:|---|---|---|
| 1 | Consultas eficientes e índices | **Aplicada** | `route_service.py` agrupa lecturas de relaciones por conjunto de rutas; dashboard utiliza `COUNT()` en SQL. El esquema ya contenía índices: no se atribuye su creación a esta inspección. |
| 2 | Paginación backend/frontend (12) | **Aplicada** | Endpoints paginados de clientes, conductores, pedidos, vehículos y rutas; límite `page_size <= 12`; `PaginationControls.jsx`. |
| 3 | WebP/AVIF y `<picture>` | **No aplicable al frontend auditado** | No hay activos rasterizados de la aplicación en `frontend/src` o `frontend/public`. Las imágenes de documentación no se contabilizan como recursos del producto. |
| 4 | `React.lazy()` / `Suspense` | **Aplicada** | Seis páginas secundarias se cargan mediante división de código en `AppRoutes.jsx`. |
| 5 | APIs nativas frente a dependencias | **Parcial / conforme** | Los servicios usan `fetch` y `URLSearchParams`; no se añadió biblioteca HTTP o de serialización. No se eliminó una dependencia ya instalada, porque no había una equivalente que sustituir. |
| 6 | Inlining de SVG | **Sin oportunidad demostrada** | No se encontraron activos SVG externos ni referencias `.svg` o `<svg>` en el frontend auditado. |
| 7 | Caché HTTP / ETag | **Aplicada** | `ETag`, `Cache-Control: private, no-cache`, `Vary: Authorization` y respuesta `304` en listados paginados y resumen. No se usa React Query. |
| 8 | Compresión Brotli/GZip | **Aplicada parcialmente** | `GZipMiddleware` configurado con umbral de 500 bytes y nivel 5. Brotli no está configurado. |

El informe presenta seis áreas aplicadas o conformes con alcance explícito y dos sin oportunidad identificada. La quinta área es la más discutible para el criterio de “sustitución”: la evidencia prueba el uso deliberado de APIs nativas y la ausencia de una dependencia adicional, pero no una migración desde una biblioteca instalada. No debe describirse como una sustitución que no ocurrió.

## 4. Archivos de código relevantes

| Cambio Green IT | Archivo fuente |
|---|---|
| Paginación compartida y metadatos | [`backend/app/pagination.py`](../../../backend/app/pagination.py) |
| Paginación por recurso y límites de 12 | [`backend/app/routes/`](../../../backend/app/routes/) |
| Consulta y mapeo por bloques de rutas | [`backend/app/services/route_service.py`](../../../backend/app/services/route_service.py) |
| Resumen agregado del dashboard | [`backend/app/routes/dashboard.py`](../../../backend/app/routes/dashboard.py) |
| ETag, revalidación y cabeceras privadas | [`backend/app/http_cache.py`](../../../backend/app/http_cache.py) |
| Middleware GZip | [`backend/app/main.py`](../../../backend/app/main.py) |
| Code splitting de páginas secundarias | [`frontend/src/routes/AppRoutes.jsx`](../../../frontend/src/routes/AppRoutes.jsx) |
| Control de paginación reutilizable | [`frontend/src/components/common/PaginationControls.jsx`](../../../frontend/src/components/common/PaginationControls.jsx) |
| Cliente HTTP nativo y token de acceso | [`frontend/src/services/apiClient.js`](../../../frontend/src/services/apiClient.js) |
| Servicios paginados con URLSearchParams | [`frontend/src/services/`](../../../frontend/src/services/) |
| Umbrales y colecta Lighthouse | [`frontend/lighthouserc.json`](../../../frontend/lighthouserc.json) |
| Workflow de auditoría Green IT | [`.github/workflows/green-audit.yml`](../../../.github/workflows/green-audit.yml) |

## 5. Estimación ambiental

La comparación histórica de `/login` registró una reducción de 83,811 B a 77,706 B (6,105 B; 7.28 %) después del code splitting. El modelo SWDM v4 utiliza 0.300 kWh/GB y 494 gCO₂e/kWh y escala el ahorro a un escenario hipotético de 500,000 cargas al año: **0.45238 kgCO₂e/año modelados**.

Esto no es consumo eléctrico medido, tráfico real ni huella completa de EcoLogistics. La unidad funcional es una carga de `/login` y el tráfico anual se utiliza únicamente como supuesto ilustrativo.

## 6. Verificación correctiva posterior a `v1.0.0`

La corrección de compatibilidad de `RouteRepository` con Python 3.13 y la prueba automatizada de GZip se integraron en `main` mediante el [PR #13](https://github.com/LeeoGold/EcoLogistics/pull/13), con merge commit [`1e802404`](https://github.com/LeeoGold/EcoLogistics/commit/1e802404c1171ecaf279807b686911728a3cb468).

En la ejecución CI de ese merge se confirmaron **81 pruebas backend aprobadas**, **14 pruebas frontend aprobadas en cuatro archivos**, compilación frontend correcta y Quality Gate de SonarQube aprobado. El workflow `Green IT Audit` también finalizó correctamente. La Release `v1.0.0` conserva el historial de su publicación original; la rama `main` contiene la corrección posterior.

Consultar [04 Anexo de validación posterior a v1.0.0](./04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md) y los [resultados de Lighthouse Chrome de seis vistas](./evidencias/lighthouse-chrome-20261110/RESULTADOS.md).

## 7. Documentos de esta entrega

| Documento | Finalidad |
|---|---|
| [01 Informe de reducción del impacto ambiental](./01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) | Código antes/después, optimizaciones, Lighthouse y SWDM v4. |
| [02 Estándares de ingeniería de software](./02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md) | ISO/IEC 25010, GSF, W3C WSG, Clean Code, SOLID, DRY y YAGNI. |
| [03 Matriz de trazabilidad de la rúbrica](./03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_2.md) | Relación criterio → evidencia → límite → presentación sugerida. |
| [04 Anexo de validación posterior a v1.0.0](./04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md) | Corrección Python 3.13 y prueba GZip integradas por PR #13; CI y Green IT Audit aprobados. |
| [Evidencias](./evidencias/README.md) | Capturas, pruebas, build, Lighthouse CI y auditoría Chrome de seis vistas. |

## 8. Guion breve de presentación

1. Explicar el stack real y por qué las optimizaciones MERN se adaptaron a FastAPI/SQLAlchemy/PostgreSQL.
2. Mostrar la paginación de 12 elementos, las consultas agregadas, la lectura por bloques y el ETag/GZip en el código.
3. Presentar el code splitting y describir la comparación de transferencia sin afirmar que FCP/LCP mejoraron en esa serie histórica.
4. Abrir los tres reportes Lighthouse CI de `/login` y, por separado, el [RESULTADOS.md de las seis vistas](./evidencias/lighthouse-chrome-20261110/RESULTADOS.md); explicar el CLS de Flota, Conductores y Pedidos y el 404 común de `favicon.ico`.
5. Explicar los supuestos del cálculo SWDM v4 y reconocer las dos áreas sin oportunidad identificada.
6. Mostrar los resultados de pruebas, el workflow verde y la Release `v1.0.0`.

## 9. Historial del índice

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_0_0 | 03/11/2026 | Índice de la entrega técnica inicial. |
| V_1_0_1 | 08/11/2026 | Actualización de estado publicado, enlaces, resultados y límites de las áreas de optimización. |\n| V_1_0_2 | 10/11/2026 | Integración de la auditoría Chrome de seis vistas y actualización del estado de CI en `main`. |
