# Análisis de Playwright — Sprint 4

[← Volver al README principal](../../../README.md)

## 1. Objetivo

Implementar y ejecutar una suite de pruebas End-to-End (E2E) con Playwright para verificar desde el navegador los recorridos principales de EcoLogística Huancayo: navegación pública, control de acceso, autenticación y presentación de acciones según el rol del usuario.

## 2. Entorno y configuración

| Elemento | Configuración verificada |
|---|---|
| Aplicación | EcoLogística Huancayo — frontend React 19 y Vite 8 |
| Automatización | `@playwright/test` |
| Archivo de configuración | `frontend/playwright.config.js` |
| Carpeta de pruebas | `frontend/e2e/` |
| Servidor frontend | Vite en `http://127.0.0.1:5173` |
| Navegadores | Chromium, Firefox y WebKit |
| Ejecución local | Windows, PowerShell, Node.js 24 / npm 11 |
| Workers locales observados | 4 |
| Reporte | Listado en consola y reporte HTML (`playwright-report/`) |

La configuración define tres proyectos de navegador: `chromium`, `firefox` y `webkit`. En ejecución local se utiliza el servidor Vite iniciado por Playwright, con `reuseExistingServer` habilitado fuera de CI. Los tiempos de espera configurados son 10 segundos para acciones y 20 segundos para navegación. Las capturas, videos y trazas se conservan cuando una prueba falla.

En CI se activa el modo `CI`, se limita la concurrencia a dos workers y se permite un reintento para reducir el efecto de fallos transitorios. El reporte HTML se genera en `frontend/playwright-report/`.

## 3. Arquitectura de pruebas

```text
frontend/
├── playwright.config.js
└── e2e/
    ├── helpers.js
    ├── public.spec.js
    ├── auth.spec.js
    └── roles.spec.js
```

`helpers.js` concentra las respuestas simuladas de API y la rutina de inicio de sesión de prueba. Los archivos `*.spec.js` contienen los escenarios independientes.

### 3.1 Alcance de las simulaciones

Las pruebas navegan por el frontend real servido por Vite y utilizan interceptación de red de Playwright para simular respuestas de autenticación, resumen del dashboard y listado de vehículos. Los datos de prueba y el token son ficticios y solo sirven dentro de la ejecución E2E.

Por esa razón, esta suite verifica la experiencia de navegador y la visibilidad de las acciones por rol; **no** constituye una prueba contra PostgreSQL ni demuestra por sí sola que la API autorice o rechace solicitudes. La autorización del backend se valida por separado mediante las pruebas automatizadas de FastAPI, incluyendo las pruebas que comprueban que el operador recibe `403` al intentar actualizar o eliminar vehículos.

## 4. Casos E2E ejecutados

| Archivo | Escenario | Resultado por navegador |
|---|---|---:|
| `public.spec.js` | La página pública muestra sus módulos principales | 3/3 |
| `public.spec.js` | El acceso directo a Flota sin sesión vuelve a la vista pública | 3/3 |
| `auth.spec.js` | Inicio de sesión correcto y presentación del panel según perfil | 3/3 |
| `auth.spec.js` | Mensaje ante credenciales incorrectas | 3/3 |
| `auth.spec.js` | Cierre de sesión y retorno a la página pública | 3/3 |
| `roles.spec.js` | El administrador ve las acciones de edición y eliminación de vehículos | 3/3 |
| `roles.spec.js` | El operador consulta y registra, sin ver acciones administrativas | 3/3 |

## 5. Resultados de ejecución

**Ejecución local reportada por Playwright:**

| Indicador | Resultado |
|---|---:|
| Total de ejecuciones | 21 |
| Aprobadas | 21 |
| Fallidas | 0 |
| Omitidas | 0 |
| Chromium | 7/7 aprobadas |
| Firefox | 7/7 aprobadas |
| WebKit | 7/7 aprobadas |
| Duración total informada | 1,2 minutos |

**Tasa de éxito:**

\[
\text{Éxito} = \frac{21}{21} \times 100 = 100\%
\]

La salida de consola local muestra las 21 pruebas aprobadas y finaliza con `21 passed (1.2m)`. Por separado, el workflow remoto [E2E Tests — ejecución del 16/11/2026](https://github.com/LeeoGold/EcoLogistics/actions/runs/43893234055) terminó con conclusión `success`. GitHub Actions publicó el artifact `playwright-e2e-report-2`, que incluye el reporte HTML y diagnósticos durante el periodo de retención de 14 días. La conclusión remota acredita la ejecución del workflow; no convierte los mocks de API en pruebas contra PostgreSQL.

### 5.1 Comando de reproducción

Desde la carpeta `frontend/`:

```powershell
npm run test:e2e
```

Para abrir el informe HTML generado localmente:

```powershell
npm run test:e2e:report
```

## 6. Rendimiento, disponibilidad y resiliencia

### 6.1 Medición puntual en el entorno publicado

El 17/11/2026 se realizó una medición desde Chrome DevTools sobre una navegación a la página pública de [EcoLogística Huancayo](https://ecologistics-frontend.onrender.com). Se utilizaron Navigation Timing, Paint Timing, Largest Contentful Paint y una solicitud `fetch` al endpoint público `/health` del backend.

| Indicador | Resultado observado | Fuente / alcance |
|---|---:|---|
| TTFB | 25,5 ms | `responseStart - requestStart` de la navegación al frontend |
| FCP | 136 ms | Evento `first-contentful-paint` de la navegación |
| LCP | 136 ms | Último evento LCP observado durante la ventana de captura de la medición |
| Estado HTTP de API | 200 | GET `https://ecologistics.onrender.com/health` |
| Latencia de API | 252,6 ms | Una solicitud GET a `/health`, medida con `performance.now()` |

Estos valores corresponden a una sola muestra desde un navegador y una ubicación de red no controlada. No son promedios, percentiles ni garantías de rendimiento. La solicitud de API se hizo al endpoint de salud, que confirma que la aplicación responde; no mide una consulta a PostgreSQL ni una operación de negocio autenticada.

### 6.2 Disponibilidad y resiliencia verificadas

- El endpoint [GET /health](https://ecologistics.onrender.com/health) respondió HTTP 200 con el JSON de estado esperado durante la comprobación manual.
- El workflow [Deploy Production #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638), en el segundo intento, terminó en `success`. Los pasos `Wait for backend health check` y `Wait for frontend health check` finalizaron correctamente después de activar ambos Deploy Hooks.
- Se confirmó manualmente el acceso al frontend publicado y el inicio de sesión con los perfiles de administrador y operador; la presentación de opciones se ajusta al rol.
- No se ha medido uptime durante un periodo continuo ni se ha ejecutado una prueba controlada de pérdida de conectividad o recuperación de red. Esos dos indicadores siguen pendientes y no se sustituyen por la comprobación puntual de `/health`.
- En la consola del navegador se observó una solicitud a `/favicon.ico` con HTTP 404. Es un recurso estático no encontrado y no impidió cargar la página ni consumir la API.


## 7. Automatización continua

El workflow `tests.yml` ejecuta pruebas de backend, pruebas de frontend y Playwright E2E en Chromium, Firefox y WebKit. En la integración del PR #18, el workflow [Tests and E2E](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914010828) terminó con conclusión `success` y publicó artefactos de backend, frontend y Playwright.

El workflow `ci.yml` terminó con conclusión `success` en [CI del commit de cierre](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914010994). La auditoría [Green IT Audit](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914010837) también terminó con `success`.

El workflow `deploy-production.yml` valida E2E antes de publicar. La ejecución [Deploy Production #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638), en el segundo intento, terminó con conclusión `success`. Se aprobaron la validación de los cuatro secretos, la activación de `BACKEND_DEPLOY_HOOK_URL` y `FRONTEND_DEPLOY_HOOK_URL`, y los health checks definidos por `BACKEND_HEALTHCHECK_URL` y `FRONTEND_HEALTHCHECK_URL`.

Los artefactos de prueba se conservan durante 14 días por configuración del workflow. La ejecución E2E utiliza mocks para las respuestas de API; la comprobación manual del sistema desplegado y las pruebas de API del backend constituyen evidencias separadas.


## 8. Conclusión

La suite Playwright está implementada para Chromium, Firefox y WebKit, con siete escenarios por navegador y 21/21 aprobaciones en la ejecución local documentada. El workflow remoto de pruebas también terminó con `success` y almacenó reportes como artefactos. Las respuestas mock de la suite mantienen su alcance de validación de interfaz y no se presentan como pruebas contra PostgreSQL.

El sistema se encuentra publicado: frontend en [Render](https://ecologistics-frontend.onrender.com) y backend en [Render](https://ecologistics.onrender.com), con PostgreSQL en Neon. La ejecución de [Deploy Production #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638) confirmó los Deploy Hooks y los health checks de ambos servicios. Se validó manualmente el acceso con los perfiles de administrador y operador.

La medición puntual del 17/11/2026 registró TTFB 25,5 ms, FCP 136 ms, LCP 136 ms y respuesta HTTP 200 de `/health` en 252,6 ms. Son datos de una sola muestra, no promedios. El uptime continuo y la resiliencia ante fallos de red siguen sin medición. La evaluación SUS requiere aún cinco participantes reales y sus respuestas originales.


---

**Versión:** V_1_0_0<br>
**Sprint:** 4<br>
**Proyecto:** EcoLogística Huancayo (EcoLogistics)


---

## Navegación

[Índice de esta sección](README.md)
