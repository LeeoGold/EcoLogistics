# EcoLogistics — Green IT baseline
- Fecha local de captura: 2026-10-29 08:08:55 -05:00
- Naturaleza: observaciones locales previas a optimizaciones; no equivale por sí sola a una auditoría ambiental completa.

## Repositorio

- Rama: `main`
- Commit: `0025fae`
- Estado de Git:
```text
## main...origin/main
?? EcoLogistics_Green_IT_Paquete_Inicial.zip
?? GREEN_IT_LEEME.md
?? "docs/03 Implementaci\303\263n/reduccion del impacto ambiental/"
?? scripts/
```

## Build de producción y tamaño de activos

- Comando: `npm run build`; código de salida: 0
```text
> ecologistica-huancayo-frontend@0.1.0 build
> vite build

[36mvite v8.3.5 [32mbuilding client environment for production...[36m[39m
transforming...
Ô£ô 47 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.40 kB Ôöé gzip:  0.28 kB
dist/assets/index-gkJMJ-1U.css   11.95 kB Ôöé gzip:  3.15 kB
dist/assets/index-D_yQUNb5.js   272.07 kB Ôöé gzip: 80.02 kB

[32mÔ£ô built in 220ms[39m
```
- Archivos en `frontend/dist/assets`: 2
- Tamaño sin comprimir de esos archivos: 284027 bytes (277.37 KiB).
- Este tamaño es el total de archivos bajo dist/assets, no el total exacto de transferencia de la página; no incluye la variación por caché, peticiones ni respuestas del backend.
| Tipo | Archivos | Bytes | KiB |
|---|---:|---:|---:|
| `.css` | 1 | 11951 | 11.67 |
| `.js` | 1 | 272076 | 265.7 |

## Inventario de imágenes

- Imágenes/recursos de imagen encontrados en frontend/public y frontend/src: 0.
- Tamaño total de esos archivos: 0 bytes (0 KiB).
- Archivos mayores a 200 KiB: 0.
- No se encontraron imágenes mayores a 200 KiB en las carpetas examinadas. Esto no garantiza que no existan recursos remotos ni imágenes incluidas de otra forma.

## Importaciones estáticas de páginas React

- Importaciones estáticas de páginas detectadas por patrón: 7.
- Candidatas a estudiar para división de código (no se modificó ningún archivo en este paso):
  - `import ClientsPage from '../pages/ClientsPage'`
  - `import DashboardPage from '../pages/DashboardPage'`
  - `import DriversPage from '../pages/DriversPage'`
  - `import LoginPage from '../pages/LoginPage'`
  - `import OrdersPage from '../pages/OrdersPage'`
  - `import RoutesPage from '../pages/RoutesPage'`
  - `import VehiclesPage from '../pages/VehiclesPage'`

## Comprobación de endpoint de salud de API

- Intento 1: no disponible (No es posible conectar con el servidor remoto).
- API no disponible en `http://127.0.0.1:8000/health` o no se completaron muestras. Ejecutar el backend en otro terminal y volver a correr este script si se desea medir /health.

## Lighthouse y transferencia real

- Lighthouse Performance/FCP/LCP/TBT/CLS: NO MEDIDO por este script.
- Solicitudes y transferencia real de página: NO MEDIDAS por este script.
- Abrir la vista de producción en Chrome, iniciar sesión si se desea medir una pantalla autenticada, ejecutar DevTools → Lighthouse y guardar el reporte HTML/JSON. En DevTools → Network, guardar una captura o HAR para el mismo flujo y anotar caché fría o caliente.
- No usar métricas del HTML de referencia (38/96 Lighthouse, 8.4/1.1 MB, 480/65 ms o 2.15/0.28 gCO2e) como datos de EcoLogistics sin evidencia propia.

## Decisión de línea base

- Este archivo conserva datos de estado antes de las optimizaciones Green IT en el commit local indicado al comienzo.
- No representa medición directa de consumo eléctrico ni de CO2e.
- Mantener el archivo original después de implementar cambios y generar un segundo registro identificado como `despues`, con el mismo protocolo y entorno.
