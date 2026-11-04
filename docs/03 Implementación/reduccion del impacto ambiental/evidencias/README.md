# Evidencias Green IT — EcoLogistics

Esta carpeta contiene o referencia las evidencias para los dos informes de Green IT.

## Evidencias de implementación y pruebas

| Evidencia | Ubicación esperada en el repositorio | Resultado documentado |
|---|---|---|
| Dashboard de operaciones | `evidencias/funcional/01-dashboard-20261103.png` | Captura de dashboard: 10 vehículos disponibles, 1 cliente, 1 pedido pendiente y 6 conductores activos |
| Módulo de flota | `evidencias/funcional/02-flota-20261103.png` | Captura de listado con filtro y búsqueda por placa visibles |
| Paginación | Código `backend/app/pagination.py`, endpoints `*/pagina`, `frontend/src/components/common/PaginationControls.jsx` | Máximo 12 registros por solicitud y respuesta con metadatos |
| Caché HTTP | `backend/app/http_cache.py` y rutas paginadas | `ETag`, `Cache-Control: private, no-cache`, `Vary: Authorization`, validación condicional 304 |
| Suite backend | Consola pytest (03/11/2026) | `80 passed in 18.17s` |
| Suite frontend | Consola Vitest | `14 passed` en 4 archivos |
| Build frontend | Consola `npm run build` | Vite 8.3.5; compilación correcta; 50 módulos transformados |
| Lighthouse CI | `evidencias/lighthouse-ci-20261103/` | Tres reportes HTML, tres JSON y `manifest.json`; `/login`, Desktop |
| Línea base histórica | `green-it-baseline-chrome-20261029.md`, `lighthouse-antes-desktop-*.html` y resultados posteriores | Comparación histórica antes/después de code splitting |

## Lighthouse CI del 03/11/2026

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Mediana |
|---|---:|---:|---:|---:|
| Performance | 100 | 100 | 100 | 100 |
| FCP | 244 ms | 213 ms | 213 ms | 213 ms |
| LCP | 375 ms | 348 ms | 350 ms | 350 ms |
| TBT | 0 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| Transferencia | 76.99 KiB | 76.99 KiB | 76.99 KiB | 76.99 KiB |

**Alcance:** exclusivamente la página `/login` en una compilación local de producción. No presentar esta tabla como auditoría completa de todas las páginas ni del servidor desplegado.

## Capturas funcionales

Las dos capturas de dashboard y flota compartidas durante la validación pueden guardarse con los nombres indicados arriba. No se requieren capturas individuales de Clientes, Conductores, Pedidos y Rutas; basta con una revisión manual de carga y funcionamiento antes de la demostración.

## Criterios de integridad

- Conservar los informes Lighthouse HTML y JSON originales, no solo capturas de puntuación.
- No modificar los informes generados para alterar puntuaciones o tiempos.
- Registrar entorno, ruta, fecha, modo Desktop y número de ejecuciones.
- No incluir credenciales, tokens ni datos de usuarios.
- Mantener separados los informes históricos de code splitting y la serie LHCI final del 03/11/2026.
