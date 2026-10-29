# Evidencia de línea base Green IT — Lighthouse y Network

**Proyecto:** EcoLogistics Huancayo
**Fecha:** 2026-10-29 (hora local Perú, UTC−05:00)
**Rama/commit de referencia:** `main` / `0025fae`
**Ruta auditada:** `http://127.0.0.1:4173/login`
**Entorno:** build de producción local servido con Vite Preview; no es un despliegue público.
**Herramienta:** Lighthouse 13.5.0; categoría seleccionada: Performance.

## Resultados de Lighthouse

| Ejecución | Hora local | Performance | FCP | LCP | TBT | CLS | Transferencia | Solicitudes |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | `2026-10-29 08:23:11 -0500` | 100/100 | 342.95 ms | 342.95 ms | 0 ms | 0.00 | 83,811 B | 3 |
| 2 | `2026-10-29 08:27:19 -0500` | 100/100 | 342.28 ms | 342.28 ms | 0 ms | 0.00 | 83,811 B | 3 |
| 3 | `2026-10-29 08:30:07 -0500` | 100/100 | 344.77 ms | 344.77 ms | 0 ms | 0.00 | 83,811 B | 3 |

**Resumen de las tres ejecuciones:** Performance mediana 100/100; FCP mediana 342.95 ms; LCP mediana 342.95 ms; TBT 0 ms; CLS 0; 83,811 bytes transferidos y 3 solicitudes por ejecución. No se reportaron advertencias de ejecución.

Lighthouse estaba configurado en modo Desktop con `throttlingMethod=simulate`, RTT 40 ms, throughput 10,240 kbps y multiplicador de CPU 1. Solo se auditó la categoría Performance; no se midieron Accesibilidad, SEO ni Buenas prácticas.

## Detalle de recursos informado por Lighthouse

| Tipo | Recurso | Estado HTTP | Tamaño de recurso (decodificado) | Tamaño transferido |
|---|---|---:|---:|---:|
| Document | `login` | 200 | 407 B | 657 B |
| Script | `index-D_yQUNb5.js` | 200 | 272,076 B | 79,661 B |
| Stylesheet | `index-gkJMJ-1U.css` | 200 | 11,951 B | 3,493 B |

Totales de Lighthouse: **83,811 bytes transferidos** (aprox. 83.8 kB decimales / 81.85 KiB) y **284,434 bytes de recursos** (aprox. 284.4 kB decimales / 277.8 KiB). Es normal que el total transferido difiera del tamaño del recurso; ambas métricas deben informarse por separado.

## Evidencia Network de Chrome

La captura `network-antes.png` corresponde a la misma ruta de login y muestra:
- `Disable cache` activado.
- `No throttling`.
- 3 solicitudes (documento, JavaScript, CSS), todas con estado HTTP 200.
- 83.8 kB transferidos; 284 kB de recursos.
- `Finish`: 27 ms; `DOMContentLoaded`: 45 ms; `Load`: 45 ms.

Los tiempos de esta captura no se comparan directamente con los tiempos Lighthouse porque Chrome Network se capturó con `No throttling`, mientras que Lighthouse simuló las condiciones de red indicadas arriba.

## Hallazgo prioritario para optimización

Lighthouse reportó un ahorro potencial estimado de alrededor de **50 KiB de JavaScript no utilizado**. Es una recomendación del auditor, no una reducción ya lograda. El bundle JavaScript listado por Vite medía 272,076 bytes sin comprimir (salida de build: 272.07 kB; gzip indicado por Vite: 80.02 kB). `AppRoutes.jsx` importa páginas funcionales de forma estática; se evaluará `React.lazy()` y `Suspense` para descargar páginas secundarias bajo demanda, manteniendo `LoginPage` disponible en la carga inicial.

## Alcance y limitaciones

Esta línea base mide únicamente una carga de `/login` sin iniciar sesión. No mide el dashboard, los listados, llamadas autenticadas a la API, escenarios de datos de negocio ni consumo eléctrico directo. No permite afirmar una reducción de carbono. No se utilizarán las cifras de ejemplo del HTML de referencia (38/96 puntos, 8.4/1.1 MB o emisiones por visita) como resultados de EcoLogistics.

## Artefactos

- `lighthouse-antes-desktop-1.html`
- `lighthouse-antes-desktop-2.html`
- `lighthouse-antes-desktop-3.html`
- `network-antes.png`

Conservar los reportes originales y no sobrescribirlos con los resultados posteriores. Ejecutar la medición posterior sobre la misma ruta y con la misma configuración Lighthouse; repetir Network por separado con `No throttling` y caché desactivada.
