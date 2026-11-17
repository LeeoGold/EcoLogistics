# Revisión del sprint

**Nombre del Proyecto:** EcoLogística Huancayo (EcoLogistics)<br>
**Líder del Proyecto:** Kevyn Leeonardo Velasquez Palomino<br>
**Versión documental:** V_1_0_0<br>
**Alcance:** Cierre técnico y metodológico del Sprint 4.

[← Volver al README principal](../../../README.md) · [Índice del Sprint 4](README.md)

## Historias de Usuario completadas en este Sprint

El registro de Jira versionado en el repositorio describe la configuración inicial y el Sprint 1, pero no contiene una relación verificable de Historias de Usuario asignadas al Sprint 4. Por esa razón, este cierre no inventa códigos US ni atribuye al Sprint 4 historias de otras iteraciones. El trabajo de esta actividad se registra como entregables técnicos y de evaluación:

| Entregable técnico | Criterios verificados | Evidencia disponible | Estado de trazabilidad |
|---|---|---|---|
| Suite End-to-End con Playwright | Siete escenarios de interfaz ejecutados en Chromium, Firefox y WebKit. Incluye página pública, acceso directo a módulo sin sesión, login válido, login inválido, cierre de sesión y visibilidad de acciones por rol. | Ejecución local: 21/21 pruebas aprobadas (7 por navegador). Ejecución remota `E2E Tests`: conclusión `success`; el reporte HTML y diagnósticos se guardaron como artifact. | Commit `2b2b42c`; [PR #16](https://github.com/LeeoGold/EcoLogistics/pull/16) integrado en `develop` mediante el merge `a11451e`. El Sprint 4 quedó integrado en `main` mediante los PR #17 y #18. La rama `develop` se conservó en la línea base anterior, sin incorporar los cambios del Sprint 4. |
| Automatización E2E en GitHub Actions | Workflow `tests.yml` instala dependencias y Chromium, Firefox y WebKit, ejecuta la suite y conserva reportes como artefactos. | [Ejecución remota exitosa](https://github.com/LeeoGold/EcoLogistics/actions/runs/43893234055); artifact `playwright-e2e-report-2` disponible durante 14 días desde su generación. | Verificado en GitHub Actions: `success`. |
| Informe técnico de Playwright | Se documentaron arquitectura, escenarios, resultados, comandos de reproducción y límites de las simulaciones API. | [Análisis Playwright](./03%20Analisis%20PlayWrigth%20V_1_0_0.md). | Documento versionado en `develop` por el [PR #16](https://github.com/LeeoGold/EcoLogistics/pull/16). |
| Evaluación cuantitativa de usabilidad | Se definió el instrumento SUS, tareas previas, escala y método de puntuación. | [Informe e instrumento SUS](./04%20Usabilidad%20V_1_0_0.md). | La aplicación a participantes y sus resultados se registrarán después de recolectar respuestas reales. |
| Despliegue continuo | Workflow `deploy-production.yml` condicionado a CI y E2E. | Frontend y backend publicados en Render; backend conectado a Neon; health checks de ambos servicios aprobados en GitHub Actions. | [Deploy Production #2, intento 2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638), conclusión `success`. |

**Referencia de la versión funcional previa:** el PR [#15 — acciones administrativas de edición y eliminación de vehículos](https://github.com/LeeoGold/EcoLogistics/pull/15) fue integrado en `main` mediante el merge commit [`68dd466`](https://github.com/LeeoGold/EcoLogistics/commit/68dd46611cde924540f9ca23d9a728ba2ae5e6c5). Este PR es parte de la línea base anterior y no se atribuye como incremento del Sprint 4.

## Demostración del trabajo completado

La demostración técnica disponible se ejecutó en el entorno local de desarrollo, con frontend React/Vite iniciado por Playwright en `http://127.0.0.1:5173`, Node.js 24 y los navegadores instalados localmente. La salida de Playwright informó:

| Indicador | Resultado observado |
|---|---:|
| Escenarios definidos | 7 |
| Ejecuciones totales | 21 |
| Aprobadas | 21 |
| Fallidas | 0 |
| Chromium | 7/7 |
| Firefox | 7/7 |
| WebKit | 7/7 |
| Duración indicada por Playwright | 1,2 minutos |

La tasa de aprobación de esta ejecución fue `21 / 21 × 100 = 100 %`.

Las pruebas E2E utilizan interceptación de red para simular las respuestas de login, dashboard y vehículos. Por ello, la demostración comprueba la interfaz del navegador y la presentación de controles según el rol; no representa una prueba E2E contra PostgreSQL ni sustituye las pruebas de autorización del backend. Estas últimas se encuentran en la suite de FastAPI y contemplan el rechazo `403` de intentos de actualización/eliminación de vehículos por parte del operador.

No se registra aceptación formal de stakeholders ni comentarios de usuarios en esta revisión, porque no se ha aportado un acta o evidencia de esa sesión. La evaluación SUS está prevista en el documento correspondiente y deberá completarse con participantes reales.

Enlaces de verificación:

- [Repositorio EcoLogistics](https://github.com/LeeoGold/EcoLogistics)
- [GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions)
- [Pull Request #15 — línea base de flota](https://github.com/LeeoGold/EcoLogistics/pull/15)
- [Informe de Playwright](./03%20Analisis%20PlayWrigth%20V_1_0_0.md)

## Verificaciones completadas al 17 de noviembre de 2026

- El trabajo del Sprint 4 está en `main`. El [PR #17](https://github.com/LeeoGold/EcoLogistics/pull/17) integró correcciones documentales y el [PR #18](https://github.com/LeeoGold/EcoLogistics/pull/18) integró el pipeline de pruebas. La rama `develop` permanece en la línea base anterior (`68dd466`), conforme a la decisión de mantener el cierre del Sprint 4 solo en `main`.
- En el commit `9f54aae`, los workflows [CI](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914010994), [Tests and E2E](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914010828) y [Green IT Audit](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914010837) terminaron con conclusión `success`.
- El workflow [Deploy Production #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638), en su segundo intento, terminó con conclusión `success`. Se aprobaron la validación E2E, los cuatro secretos, la activación de los Deploy Hooks de backend y frontend, y los health checks de ambos servicios.
- El frontend se encuentra publicado en [https://ecologistics-frontend.onrender.com](https://ecologistics-frontend.onrender.com) y el backend en [https://ecologistics.onrender.com](https://ecologistics.onrender.com). La ruta pública `/health` respondió HTTP 200 con el estado esperado.
- Se comprobó manualmente el inicio de sesión en producción con los perfiles `ADMINISTRADOR` y `OPERADOR`, así como la presentación de opciones según el rol. No se incluyen credenciales en la documentación.
- Se corrigió CORS para permitir el origen público del frontend y conservar el origen local de Vite.
- La medición puntual del 17/11/2026 desde Chrome DevTools registró TTFB 25,5 ms, FCP 136 ms, LCP 136 ms y respuesta HTTP 200 de `/health` en 252,6 ms. Es una sola muestra de la página pública; no representa un promedio ni una medición de latencia de una operación de negocio.
- El informe SUS conserva el instrumento, pero no presenta resultados porque aún requiere respuestas de cinco participantes reales.

## Evidencia de despliegue y rendimiento

| Evidencia | Resultado | Alcance |
|---|---|---|
| Frontend público | [Abrir aplicación](https://ecologistics-frontend.onrender.com) | Render Static Site |
| Backend público | [Abrir API](https://ecologistics.onrender.com) | Render Web Service |
| Health check backend | [HTTP 200](https://ecologistics.onrender.com/health) | Comprobación puntual de disponibilidad |
| CI/CD | [Deploy Production #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638) — `success` | E2E, Deploy Hooks y health checks aprobados |
| Web Vitals observados | TTFB 25,5 ms; FCP 136 ms; LCP 136 ms | Una navegación a la página pública, Chrome DevTools |
| Respuesta de API observada | HTTP 200; 252,6 ms | Una solicitud GET a `/health`; no mide consulta SQL ni operación autenticada |


## Pendientes

1. Aplicar el cuestionario SUS a un mínimo de cinco participantes reales, conservar las diez respuestas originales de cada uno, calcular los puntajes individuales y el promedio global, e interpretar el resultado frente al umbral de 68 puntos. No se deben inventar respuestas.
2. Completar mediciones repetidas de rendimiento y disponibilidad. Los valores actuales son una muestra puntual; falta observar uptime durante un intervalo y ejecutar una comprobación controlada de resiliencia ante fallos de red.
3. Registrar, si existió, la demostración ante stakeholders y su retroalimentación. La comprobación manual realizada por el mantenedor en producción no equivale por sí sola a aceptación formal de stakeholders.
4. Vincular los entregables con historias o tareas reales del backlog/Jira, únicamente si existe ese registro verificable. No inventar códigos de HU retrospectivamente.


## Navegación

- [Índice del Sprint 4](README.md)
- [README principal](../../../README.md)
