# Evidencias Green IT — EcoLogistics `v1.0.0`

[← Índice Green IT](../README.md) · [Informe ambiental](../01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) · [Matriz de rúbrica](../03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_2.md)

Esta carpeta reúne evidencia de implementación, funcionamiento y medición para la Inspección 04. Las evidencias no tienen todas el mismo alcance: se indica si son capturas funcionales, pruebas automatizadas, mediciones locales o comparaciones históricas.

## 1. Capturas funcionales disponibles

| Evidencia | Archivo | Qué permite observar |
|---|---|---|
| Dashboard | [01-dashboard-20261103.png](./funcional/01-dashboard-20261103.png) | Resumen operativo mostrado por la aplicación. |
| Flota | [02-flota-20261103.png](./funcional/02-flota-20261103.png) | Listado de vehículos, filtro y búsqueda por placa. |

Las capturas muestran vistas concretas; no equivalen por sí solas a pruebas exhaustivas de todos los flujos.

## 2. Evidencia de código y pruebas

| Área | Evidencia del repositorio | Resultado / precisión |
|---|---|---|
| Paginación | [`backend/app/pagination.py`](../../../../backend/app/pagination.py), endpoints `/pagina`, [`PaginationControls.jsx`](../../../../frontend/src/components/common/PaginationControls.jsx) | Cinco módulos con máximo 12 registros por página y metadatos de paginación. |
| Lectura de rutas por bloques | [`backend/app/services/route_service.py`](../../../../backend/app/services/route_service.py) | Agrupa lecturas relacionadas para evitar consultas repetidas por cada ruta. |
| Dashboard agregado | [`backend/app/routes/dashboard.py`](../../../../backend/app/routes/dashboard.py) | Usa `COUNT()` en SQL para construir el resumen. |
| Caché HTTP | [`backend/app/http_cache.py`](../../../../backend/app/http_cache.py) y rutas paginadas | `ETag`, `Cache-Control: private, no-cache`, `Vary: Authorization` y validación 304. |
| Compresión | [`backend/app/main.py`](../../../../backend/app/main.py) | FastAPI `GZipMiddleware`, umbral 500 bytes y nivel 5. Prueba de regresión añadida en `backend/tests/test_vehicle_api.py`. |
| Code splitting | [`frontend/src/routes/AppRoutes.jsx`](../../../../frontend/src/routes/AppRoutes.jsx) | `React.lazy()` y `Suspense` en páginas secundarias. |
| Suite backend | CI del merge de PR #13 | 81 pruebas aprobadas con Python 3.13.18 y pytest 8.4.2. |
| Suite frontend | Ejecución local Vitest comunicada al cierre | 14 pruebas aprobadas en 4 archivos. |
| Build frontend | Ejecución local `npm run build` | Vite 8.3.5; 50 módulos transformados. |

Los resultados de pruebas y build son salidas de consola comunicadas para el cierre. Este archivo no contiene los logs completos de esas ejecuciones; si el docente solicita evidencia primaria, conservar y adjuntar las capturas de terminal o los artefactos correspondientes.

El workflow CI general y `Green IT Audit` son independientes. Sus ejecuciones concretas posteriores al merge de PR #13 están enlazadas en la sección siguiente para poder abrir la evidencia directamente desde GitHub.

## 3. Verificación correctiva posterior a `v1.0.0`

El [PR #13](https://github.com/LeeoGold/EcoLogistics/pull/13) integró en `main` la corrección de compatibilidad Python 3.13 y la prueba de GZip. La ejecución remota de [CI](https://github.com/LeeoGold/EcoLogistics/actions/runs/42551297248) aprobó **81 pruebas backend**, **14 pruebas frontend en cuatro archivos**, el build y el Quality Gate de SonarQube. La ejecución de [Green IT Audit](https://github.com/LeeoGold/EcoLogistics/actions/runs/42551297294) también finalizó correctamente.

La Release `v1.0.0` conserva el número de pruebas de su publicación; la validación de 81 pruebas corresponde al `main` corregido, no al tag original. El detalle de la corrección está en el [anexo de validación posterior](../04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md).

## 4. Lighthouse CI del 03/11/2026

Los tres informes HTML, tres JSON y el manifiesto están en [`lighthouse-ci-20261103/`](./lighthouse-ci-20261103/).

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Mediana |
|---|---:|---:|---:|---:|
| Performance | 100 | 100 | 100 | 100 |
| FCP | 244 ms | 213 ms | 213 ms | 213 ms |
| LCP | 375 ms | 348 ms | 350 ms | 350 ms |
| TBT | 0 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| Transferencia | 76.99 KiB | 76.99 KiB | 76.99 KiB | 76.99 KiB |

**Alcance:** únicamente `/login` en una compilación local de producción, preset Desktop. No es una auditoría de todas las rutas autenticadas ni una medición de un despliegue público.


## 5. Auditoría Lighthouse Chrome de seis vistas — 10/11/2026

La medición adicional cubre Inicio, Flota, Clientes, Conductores, Pedidos y Rutas. Cada pantalla tiene una ejecución individual, no tres repeticiones.

| Evidencia | Archivo |
|---|---|
| Resultados consolidados | [RESULTADOS.md](./lighthouse-chrome-20261110/RESULTADOS.md) |
| Informes HTML y JSON originales | [`lighthouse-chrome-20261110/`](./lighthouse-chrome-20261110/) |

**Resumen:** Performance 94–100/100; FCP 325–379 ms; LCP 478–539 ms; TBT 0 ms; transferencia 78.7–84.5 KiB. Accesibilidad 100/100 y Buenas prácticas 96/100 en todas las vistas.

**Observaciones:** CLS supera 0.02 en Flota (0.02417), Conductores (0.03522) y Pedidos (0.15651). Todas las páginas registran un 404 de `favicon.ico`, asociado al 96/100 en Buenas prácticas.

**Alcance:** auditoría Desktop en `http://127.0.0.1:4173`, Lighthouse 13.5.0 y Chrome 157.0.0.0. Es una medición local, con una ejecución por vista; no debe confundirse con el Lighthouse CI histórico de `/login` ni presentarse como resultado de un despliegue público.

## 6. Línea base y comparación histórica

- `green-it-baseline-20261029-080855.md` y `green-it-baseline-chrome-20261029.md`: estado inicial de `/login` antes del code splitting.
- `green-it-resultados-post-code-splitting-20261029.md`: resultados posteriores de la serie histórica.
- `green-it-lighthouse-comparativa.csv`: tabla de comparación.
- `green-it-code-splitting.patch`: diff de referencia de code splitting.
- `lighthouse-antes-desktop-*.html` / `lighthouse-despues-desktop-*.html`: reportes históricos de comparación.

La serie histórica registró −6,105 bytes (−7.28 %) de transferencia en `/login`. En esa misma serie, las medianas de FCP/LCP fueron ligeramente mayores después; la conclusión se limita a la reducción de transferencia y no afirma una mejora universal de velocidad.

## 7. Estimación SWDM v4

El cálculo toma la diferencia de transferencia de `/login`, 0.300 kWh/GB y 494 gCO₂e/kWh. La proyección de 500,000 cargas anuales es hipotética. El resultado modelado de 0.45238 kgCO₂e/año no es una lectura de consumo ni tráfico real.

## 8. Criterios de integridad

- Conservar los informes Lighthouse HTML/JSON originales y el manifiesto.
- No modificar reportes generados para alterar puntuaciones o tiempos.
- Registrar fecha, ruta evaluada, entorno, preset, herramienta y número de ejecuciones.
- Mantener separados los informes históricos de code splitting y la auditoría LHCI final.
- No subir credenciales, tokens, archivos `.env`, bases de datos locales ni información personal.
- No presentar capturas de `docs/` como activos rasterizados usados por la aplicación.
