# Evidencias Green IT — EcoLogistics `v1.0.0`

[← Índice Green IT](../README.md) · [Informe ambiental](../01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) · [Matriz de rúbrica](../03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md)

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
| Suite backend | Ejecución local comunicada al cierre | 80 pruebas aprobadas. |
| Suite frontend | Ejecución local Vitest comunicada al cierre | 14 pruebas aprobadas en 4 archivos. |
| Build frontend | Ejecución local `npm run build` | Vite 8.3.5; 50 módulos transformados. |

Los resultados de pruebas y build son salidas de consola comunicadas para el cierre. Este archivo no contiene los logs completos de esas ejecuciones; si el docente solicita evidencia primaria, conservar y adjuntar las capturas de terminal o los artefactos correspondientes.

El repositorio también contiene `.github/workflows/ci.yml`, que automatiza pytest, Vitest con cobertura, compilación y análisis SonarQube Cloud. Su configuración se puede inspeccionar en el repositorio; antes de presentar una ejecución como aprobada, abre el historial de GitHub Actions y comprueba el estado individual de `backend-tests` y `frontend-build`, así como el resultado del análisis SonarQube. El estado verde ya confirmado para `Green IT Audit` corresponde al workflow `.github/workflows/green-audit.yml`, que es independiente.

## 3. Verificación correctiva posterior a `v1.0.0`

La Release original conserva las 80 pruebas de su ejecución de cierre. En una revisión posterior se corrigió la evaluación de anotaciones de `RouteRepository` para Python 3.13 y se añadió una prueba automatizada de GZip. La nueva ejecución de la suite backend en Python 3.13.5 y pytest 9.0.2 terminó con **81 pruebas aprobadas**. El workflow instala pytest `>=8,<9`, de modo que la confirmación definitiva queda pendiente de CI. El registro y sus límites están en el [anexo de validación posterior](../04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md).

Esta ejecución de revisión no es una ejecución remota de GitHub Actions. Antes de presentar el parche como publicado, deben quedar verdes por separado `CI` y `Green IT Audit`.

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

## 5. Línea base y comparación histórica

- `green-it-baseline-20261029-080855.md` y `green-it-baseline-chrome-20261029.md`: estado inicial de `/login` antes del code splitting.
- `green-it-resultados-post-code-splitting-20261029.md`: resultados posteriores de la serie histórica.
- `green-it-lighthouse-comparativa.csv`: tabla de comparación.
- `green-it-code-splitting.patch`: diff de referencia de code splitting.
- `lighthouse-antes-desktop-*.html` / `lighthouse-despues-desktop-*.html`: reportes históricos de comparación.

La serie histórica registró −6,105 bytes (−7.28 %) de transferencia en `/login`. En esa misma serie, las medianas de FCP/LCP fueron ligeramente mayores después; la conclusión se limita a la reducción de transferencia y no afirma una mejora universal de velocidad.

## 6. Estimación SWDM v4

El cálculo toma la diferencia de transferencia de `/login`, 0.300 kWh/GB y 494 gCO₂e/kWh. La proyección de 500,000 cargas anuales es hipotética. El resultado modelado de 0.45238 kgCO₂e/año no es una lectura de consumo ni tráfico real.

## 7. Criterios de integridad

- Conservar los informes Lighthouse HTML/JSON originales y el manifiesto.
- No modificar reportes generados para alterar puntuaciones o tiempos.
- Registrar fecha, ruta evaluada, entorno, preset, herramienta y número de ejecuciones.
- Mantener separados los informes históricos de code splitting y la auditoría LHCI final.
- No subir credenciales, tokens, archivos `.env`, bases de datos locales ni información personal.
- No presentar capturas de `docs/` como activos rasterizados usados por la aplicación.
