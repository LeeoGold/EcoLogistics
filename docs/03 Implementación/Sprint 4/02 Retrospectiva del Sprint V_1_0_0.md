# Retrospectiva del sprint

**Nombre del Proyecto:** EcoLogística Huancayo (EcoLogistics)<br>
**Líder del Proyecto:** Kevyn Leeonardo Velasquez Palomino<br>
**Versión documental:** V_1_0_0<br>
**Alcance:** Reflexión individual del trabajo de automatización, despliegue y cierre técnico del Sprint 4.

[← Volver al README principal](../../../README.md) · [Índice del Sprint 4](README.md)

## ¿Qué aprendimos?

- La automatización debe verificarse en más de un motor de navegador: una suite que pasó en Chromium también se ejecutó correctamente en Firefox y WebKit.
- Las pruebas E2E con interceptación de red son útiles para repetir recorridos de interfaz, pero no deben describirse como validación del backend o de PostgreSQL. Los controles de autorización del servidor requieren pruebas de API separadas.
- La ejecución local debe complementarse con una verificación remota: en este Sprint, `tests.yml` terminó con conclusión `success` en GitHub Actions y publicó el artifact del reporte HTML y diagnósticos. Esta evidencia se registró mediante el enlace directo a la ejecución.
- Al integrar documentación con nombres de carpetas acentuados, conviene resolver la ruta real con PowerShell en lugar de asumir que el nombre Unicode del ZIP se representa idénticamente en todos los entornos.
- Los finales de línea CRLF pueden aparecer en `git diff --check` como advertencias `^M`. Normalizar los archivos de forma controlada evita que esos avisos oculten problemas reales.
- Las métricas de usabilidad y rendimiento tienen que proceder de participantes y mediciones reales; no se deben completar con datos simulados.
- Configurar CORS con el origen exacto del frontend publicado es imprescindible para que el navegador pueda consumir la API; un `Failed to fetch` puede deberse a CORS y no a credenciales incorrectas.
- El workflow de despliegue debe comprobar tanto los secretos como las URLs de salud después de activar los Deploy Hooks.

## ¿Qué estamos haciendo bien?

- Se mantuvo una rama aislada `feature/sprint-4-cierre` a partir de `main` sincronizada y limpia.
- Se instaló Playwright y los tres motores de navegador requeridos por la actividad.
- Se implementaron siete escenarios E2E y la ejecución local reportó 21/21 aprobados, sin fallos.
- Se definió una separación clara entre la suite del navegador, las pruebas automatizadas del backend y los workflows de CI.
- Se verificó que `frontend/package.json` sea JSON válido y que `git diff --check` termine sin advertencias después de normalizar los finales de línea.
- Se documentaron explícitamente las limitaciones de los mocks para no atribuirles resultados de base de datos, latencia de API real o disponibilidad de producción.

## ¿Qué podemos hacer mejor?

### Personas

- Involucrar a usuarios que representen los perfiles de uso previstos en la evaluación SUS y explicarles las tareas sin inducir sus respuestas.
- Asignar a una persona la custodia de las respuestas anónimas y la verificación aritmética de los puntajes.
- Evitar registrar nombres, contraseñas u otros datos personales en las evidencias de usabilidad.

### Relaciones

- Coordinar una demostración breve con los stakeholders y recoger observaciones concretas, diferenciando comentarios recibidos de aceptación formal.
- Compartir con el equipo el enlace al reporte de Playwright y el estado del workflow remoto, no solamente una captura del terminal local.
- Confirmar quién dispone de acceso al proveedor de hosting y puede configurar los secretos sin exponer sus valores en el repositorio.

### Procesos

- Incorporar al checklist de cierre: pruebas locales, `git diff --check`, build, ejecución remota, revisión de artefactos y comprobación de enlaces.
- Asociar cada entregable del sprint con una historia o tarea real de Jira y su Pull Request/commit. No crear identificadores retrospectivos sin registrarlos en Jira.
- Separar explícitamente los estados: preparado localmente, ejecutado en GitHub Actions y desplegado/validado en producción.
- Ejecutar la evaluación SUS después de que cada participante complete tareas equivalentes y calcular el puntaje a partir de las diez respuestas originales.

### Herramientas

- Mantener `@playwright/test` y su lockfile sincronizados mediante `npm install` y validar las instalaciones limpias con `npm ci`.
- Conservar `playwright-report/` y `test-results/` como artefactos de GitHub Actions; no subir dependencias ni resultados temporales al repositorio.
- Mantener los secretos de despliegue exclusivamente en GitHub Secrets y comprobar los endpoints de salud después de cada publicación.
- Usar rutas relativas y verificar los enlaces de Markdown en GitHub después de integrar los documentos.

### Acciones a realizar

| Acción | Responsable | Criterio medible de cierre | Estado al 17/11/2026 |
|---|---|---|---|
| Integrar el trabajo de Sprint 4 en `main` y conservar `develop` en su línea base previa. | Mantenedor del repositorio | PR #17 y PR #18 fusionados; `develop` permanece en `68dd466`. | **Completado.** |
| Ejecutar pruebas automatizadas y conservar reportes. | Responsable de calidad | CI, Tests and E2E y Green IT Audit en `success`; pruebas E2E en Chromium, Firefox y WebKit. | **Completado.** |
| Configurar despliegue de backend y frontend. | Mantenedor con acceso a Render y GitHub | Dos Deploy Hooks activados por Actions y dos health checks aprobados. | **Completado:** [Deploy Production #2](https://github.com/LeeoGold/EcoLogistics/actions/runs/43914369638). |
| Validar acceso por perfiles en producción. | Responsable de validación | Login de administrador y operador y opciones de interfaz según el rol. | **Comprobado manualmente.** |
| Registrar métricas de rendimiento iniciales. | Responsable técnico | TTFB, FCP, LCP y respuesta HTTP/latencia de `/health` anotados con fecha, ruta y herramienta. | **Completado como muestra puntual:** 25,5 ms; 136 ms; 136 ms; HTTP 200 en 252,6 ms. |
| Aplicar SUS a cinco o más participantes. | Responsable de evaluación UX | Cinco formularios completos, diez respuestas cada uno, puntajes individuales y promedio global. | **Pendiente de participantes reales.** |
| Completar medición de disponibilidad y resiliencia. | Responsable técnico | Uptime observado durante un intervalo y prueba de manejo de fallo de red documentada. | **Pendiente.** |
| Registrar demostración y comentarios de stakeholders, si se realiza. | Líder del proyecto | Evidencia de la demostración y comentarios reales, sin atribuir aceptación no documentada. | **Pendiente de evidencia formal.** |


## Cierre de la retrospectiva

El Sprint 4 cuenta con pruebas automatizadas aprobadas, artefactos conservados, frontend y backend publicados, base PostgreSQL conectada y despliegue automatizado validado mediante GitHub Actions. La comprobación manual de los perfiles de administrador y operador se realizó en el entorno público. La medición inicial de rendimiento se registró como muestra puntual. El cierre cuantitativo de usabilidad sigue condicionado a recolectar respuestas de cinco participantes reales; tampoco se afirma uptime continuo, resiliencia ante fallos de red ni aceptación formal de stakeholders sin evidencia adicional.


## Navegación

- [Índice del Sprint 4](README.md)
- [README principal](../../../README.md)
