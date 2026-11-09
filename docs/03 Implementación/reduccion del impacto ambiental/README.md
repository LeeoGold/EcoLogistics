# Inspección 04 — Green IT | EcoLogistics

[← Implementación](../README.md) · [README principal](../../../README.md) · [Release `v1.0.0`](https://github.com/LeeoGold/EcoLogistics/releases/tag/v1.0.0)

| Dato | Valor |
|---|---|
| Entrega | EcoLogistics `v1.0.0 — Green IT Release` |
| Rama publicada | `main` |
| Commit | [`6041fe83d54367afd7a00139c1366d9f4c90c2fa`](https://github.com/LeeoGold/EcoLogistics/commit/6041fe83d54367afd7a00139c1366d9f4c90c2fa) |
| Estado | Release publicada; Green IT Audit reportado en verde en GitHub. |

## 1. Propósito

Esta carpeta concentra los documentos de la Inspección 04. Su objetivo es explicar qué optimizaciones Green IT están implementadas en el código real, qué mediciones las respaldan, cómo se relacionan con los estándares y qué limitaciones deben comunicarse durante la presentación.

El stack evaluado es React 19 + Vite 8 en frontend, FastAPI/Python en API, SQLAlchemy como ORM y PostgreSQL como base de datos. Los ejemplos MERN de la rúbrica se adaptan por equivalencia funcional; no se afirma que el proyecto use MongoDB o Express.

## 2. Resultados técnicos resumidos

| Validación | Resultado documentado | Alcance |
|---|---:|---|
| Backend | 80 pruebas aprobadas | Ejecución local comunicada para el cierre Green IT. |
| Frontend | 14 pruebas aprobadas en 4 archivos | Ejecución local comunicada para el cierre Green IT. |
| Build | Vite 8.3.5; 50 módulos transformados | Build de producción local. |
| Lighthouse Performance | 100/100 en tres ejecuciones | Solo `/login`, Desktop, compilación de producción local. |
| FCP / LCP medianos | 213 ms / 350 ms | Solo `/login`. |
| TBT / CLS medianos | 0 ms / 0.000 | Solo `/login`. |
| `total-byte-weight` | 76.99 KiB | Solo `/login`; no representa la descarga completa de toda la aplicación. |
| GitHub Actions | Green IT Audit en verde | Estado confirmado durante el cierre de la Release. |

Los números de pruebas y build son resultados de ejecuciones locales registradas, no una ejecución reproducida por este README. Los reportes originales de Lighthouse están dentro de `evidencias/lighthouse-ci-20261103/`.

### Workflows de GitHub Actions

El repositorio separa la validación general del proyecto de la auditoría de rendimiento:

| Workflow | Archivo | Función | Alcance que debe verificarse |
|---|---|---|---|
| CI general | [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml) | Ejecuta pytest con cobertura XML, Vitest con cobertura LCOV, build del frontend y análisis SonarQube Cloud. | El estado de cada job y el Quality Gate deben consultarse en la ejecución concreta; la existencia del YAML no demuestra que una ejecución haya finalizado correctamente. |
| Green IT Audit | [`.github/workflows/green-audit.yml`](../../../.github/workflows/green-audit.yml) | Instala dependencias bloqueadas, genera el build de producción, ejecuta Lighthouse CI y carga sus reportes como artefacto. | El estado verde de esta auditoría se confirmó durante el cierre de `v1.0.0`; el job mide únicamente las URL configuradas en `frontend/lighthouserc.json`. |

Por tanto, no se debe presentar el estado verde de `Green IT Audit` como prueba automática de que el workflow general, SonarQube o todas las pruebas estén verdes en la misma ejecución.

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

En una revisión complementaria se corrigió la compatibilidad de `RouteRepository` con Python 3.13 y se añadió una prueba automatizada para la compresión GZip. La suite backend pasó con **81 pruebas** en una ejecución de revisión sobre Python 3.13.5 y pytest 9.0.2. Como `requirements-tests.txt` limita pytest a `>=8,<9`, el resultado final debe confirmarse con el workflow remoto, que instalará la versión admitida por el proyecto. La Release `v1.0.0` conserva sus resultados originales (80 pruebas); estos cambios todavía requieren validación de ambos workflows antes de publicarse como parche.

Consultar [04 Anexo de validación posterior a v1.0.0](./04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md).

## 7. Documentos de esta entrega

| Documento | Finalidad |
|---|---|
| [01 Informe de reducción del impacto ambiental](./01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) | Código antes/después, optimizaciones, Lighthouse y SWDM v4. |
| [02 Estándares de ingeniería de software](./02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md) | ISO/IEC 25010, GSF, W3C WSG, Clean Code, SOLID, DRY y YAGNI. |
| [03 Matriz de trazabilidad de la rúbrica](./03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md) | Relación criterio → evidencia → límite → presentación sugerida. |
| [04 Anexo de validación posterior a v1.0.0](./04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md) | Corrección de compatibilidad Python 3.13 y prueba automatizada GZip; pendiente de integración remota. |
| [Evidencias](./evidencias/README.md) | Capturas, pruebas, build y reportes Lighthouse. |

## 8. Guion breve de presentación

1. Explicar el stack real y por qué las optimizaciones MERN se adaptaron a FastAPI/SQLAlchemy/PostgreSQL.
2. Mostrar la paginación de 12 elementos, las consultas agregadas, la lectura por bloques y el ETag/GZip en el código.
3. Presentar el code splitting y describir la comparación de transferencia sin afirmar que FCP/LCP mejoraron en esa serie histórica.
4. Abrir los tres reportes Lighthouse de `/login` y aclarar que no se auditó cada página autenticada.
5. Explicar los supuestos del cálculo SWDM v4 y reconocer las dos áreas sin oportunidad identificada.
6. Mostrar los resultados de pruebas, el workflow verde y la Release `v1.0.0`.

## 8. Historial del índice

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_0_0 | 03/11/2026 | Índice de la entrega técnica inicial. |
| V_1_0_1 | 08/11/2026 | Actualización de estado publicado, enlaces, resultados y límites de las áreas de optimización. |
