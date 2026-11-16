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
| Suite End-to-End con Playwright | Siete escenarios de interfaz ejecutados en Chromium, Firefox y WebKit. Incluye página pública, acceso directo a módulo sin sesión, login válido, login inválido, cierre de sesión y visibilidad de acciones por rol. | Ejecución local: 21/21 pruebas aprobadas (7 por navegador). Código en `frontend/e2e/` y configuración en `frontend/playwright.config.js`. | Rama local `feature/sprint-4-cierre`. El commit y PR de este incremento se incorporarán cuando se publique la rama. |
| Automatización E2E en GitHub Actions | Workflow `tests.yml` preparado para instalar dependencias y navegadores, ejecutar la suite y guardar reportes como artefactos. | Archivo `.github/workflows/tests.yml`. | Pendiente confirmar ejecución remota satisfactoria en GitHub Actions. |
| Informe técnico de Playwright | Se documentaron arquitectura, escenarios, resultados, comandos de reproducción y límites de las simulaciones API. | [Análisis Playwright](./03%20Analisis%20PlayWrigth%20V_1_0_0.md). | Documento integrado en la rama local. |
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

## Pendientes

1. Publicar la rama `feature/sprint-4-cierre`, crear el Pull Request hacia `main` y añadir su enlace y commit de cierre en esta revisión.
2. Confirmar que `E2E Tests` finalice con conclusión `success` en GitHub Actions y conservar el artefacto HTML.
3. Aplicar el cuestionario SUS a un mínimo de cinco participantes, conservar sus diez respuestas por persona, calcular puntajes individuales y promedio global y actualizar el informe `04 Usabilidad`.
4. Configurar frontend y backend en un proveedor de hosting, añadir los secretos de despliegue y health checks y verificar una publicación real. El workflow no se debe considerar operativo antes de esa comprobación.
5. Medir y registrar TTFB, FCP, LCP y tiempo de respuesta de API en el entorno desplegado; los tiempos de respuesta simulados no se consideran métricas de backend.
6. Realizar o registrar la demostración ante stakeholders y documentar la retroalimentación recibida, sin afirmar aceptación si no existe evidencia.
7. Actualizar el README principal con enlaces a los cuatro documentos del Sprint 4 y comprobar la navegación de ida y vuelta.

## Navegación

- [Índice del Sprint 4](README.md)
- [README principal](../../../README.md)
