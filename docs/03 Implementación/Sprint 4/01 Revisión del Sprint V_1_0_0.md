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
| Suite End-to-End con Playwright | Siete escenarios de interfaz ejecutados en Chromium, Firefox y WebKit. Incluye página pública, acceso directo a módulo sin sesión, login válido, login inválido, cierre de sesión y visibilidad de acciones por rol. | Ejecución local: 21/21 pruebas aprobadas (7 por navegador). Ejecución remota `E2E Tests`: conclusión `success`; el reporte HTML y diagnósticos se guardaron como artifact. | Commit `2b2b42c`; [PR #16](https://github.com/LeeoGold/EcoLogistics/pull/16) integrado en `develop` mediante el merge `a11451e`. La promoción de `develop` hacia `main` sigue pendiente. |
| Automatización E2E en GitHub Actions | Workflow `tests.yml` instala dependencias y Chromium, Firefox y WebKit, ejecuta la suite y conserva reportes como artefactos. | [Ejecución remota exitosa](https://github.com/LeeoGold/EcoLogistics/actions/runs/43893234055); artifact `playwright-e2e-report-2` disponible durante 14 días desde su generación. | Verificado en GitHub Actions: `success`. |
| Informe técnico de Playwright | Se documentaron arquitectura, escenarios, resultados, comandos de reproducción y límites de las simulaciones API. | [Análisis Playwright](./03%20Analisis%20PlayWrigth%20V_1_0_0.md). | Documento versionado en `develop` por el [PR #16](https://github.com/LeeoGold/EcoLogistics/pull/16). |
| Evaluación cuantitativa de usabilidad | Se definió el instrumento SUS, tareas previas, escala y método de puntuación. | [Informe e instrumento SUS](./04%20Usabilidad%20V_1_0_0.md). | La aplicación a participantes y sus resultados se registrarán después de recolectar respuestas reales. |
| Despliegue continuo | Se preparó un workflow condicionado a que CI y E2E terminen correctamente y a que se configuren los destinos de despliegue y sus secretos. | `.github/workflows/deploy-production.yml`. | No se declara despliegue operativo hasta configurar hosting, secretos y comprobar los health checks. |

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

## Verificaciones completadas al 16 de noviembre de 2026

- La rama `feature/sprint-4-cierre` fue publicada y el [PR #16](https://github.com/LeeoGold/EcoLogistics/pull/16) quedó integrado en `develop` mediante el merge [`a11451e`](https://github.com/LeeoGold/EcoLogistics/commit/a11451eea98ef51a24512f170d3c4ea4313bc289). `main` todavía conserva su línea base anterior; la promoción `develop` → `main` requiere un PR separado.
- El workflow [CI](https://github.com/LeeoGold/EcoLogistics/actions/runs/43893234056) terminó con conclusión `success`.
- El workflow [E2E Tests](https://github.com/LeeoGold/EcoLogistics/actions/runs/43893234055) terminó con conclusión `success`; el artifact `playwright-e2e-report-2` está disponible en esa ejecución.
- El README principal contiene los enlaces a los cuatro entregables; se añadieron badges para CI, E2E y Deploy Production.

## Pendientes

1. Abrir un nuevo Pull Request de `develop` hacia `main`, revisar sus checks y fusionarlo solo cuando estén aprobados.
2. Aplicar el cuestionario SUS a un mínimo de cinco participantes reales, conservar sus diez respuestas por persona, calcular puntajes individuales y promedio global y actualizar el informe `04 Usabilidad`.
3. Configurar frontend y backend en un proveedor de hosting, añadir los cuatro GitHub Secrets requeridos por `deploy-production.yml` y comprobar una publicación real mediante los health checks. El workflow no se debe considerar operativo antes de esa comprobación.
4. Medir y registrar TTFB, FCP, LCP y tiempo de respuesta de API contra el entorno desplegado; los tiempos de respuestas simuladas no representan latencia del backend.
5. Realizar o registrar la demostración ante stakeholders y documentar la retroalimentación recibida, sin afirmar aceptación si no existe evidencia.
6. Vincular los entregables del Sprint 4 con historias o tareas reales del backlog/Jira y sus PR/commits. No inventar códigos de HU retrospectivamente.

## Navegación

- [Índice del Sprint 4](README.md)
- [README principal](../../../README.md)
