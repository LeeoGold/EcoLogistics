# Retrospectiva del sprint

**Nombre del Proyecto:** EcoLogística Huancayo (EcoLogistics)<br>
**Líder del Proyecto:** Kevyn Leeonardo Velasquez Palomino<br>
**Versión documental:** V_1_0_0<br>
**Alcance:** Reflexión del trabajo de automatización E2E y preparación del cierre técnico del Sprint 4.

[← Volver al README principal](../../../README.md) · [Índice del Sprint 4](README.md)

## ¿Qué aprendimos?

- La automatización debe verificarse en más de un motor de navegador: una suite que pasó en Chromium también se ejecutó correctamente en Firefox y WebKit.
- Las pruebas E2E con interceptación de red son útiles para repetir recorridos de interfaz, pero no deben describirse como validación del backend o de PostgreSQL. Los controles de autorización del servidor requieren pruebas de API separadas.
- El resultado local no confirma por sí solo que GitHub Actions funcione. El workflow `tests.yml` necesita una ejecución remota satisfactoria y su artefacto descargable antes de declararse cerrado.
- Al integrar documentación con nombres de carpetas acentuados, conviene resolver la ruta real con PowerShell en lugar de asumir que el nombre Unicode del ZIP se representa idénticamente en todos los entornos.
- Los finales de línea CRLF pueden aparecer en `git diff --check` como advertencias `^M`. Normalizar los archivos de forma controlada evita que esos avisos oculten problemas reales.
- Las métricas de usabilidad y rendimiento tienen que proceder de participantes y mediciones reales; no se deben completar con datos simulados.

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

| Acción | Responsable | Criterio medible de cierre | Plazo |
|---|---|---|---|
| Publicar la rama de Sprint 4 y crear un PR hacia `main`. | Líder/mantenedor del repositorio | PR visible con descripción, diff revisado y checks adjuntos. | Antes del cierre del Sprint 4. |
| Verificar el workflow `E2E Tests`. | Responsable de calidad | Conclusión `success`, 21 ejecuciones aprobadas y artefacto de reporte disponible. | Antes de la entrega. |
| Aplicar SUS a cinco o más participantes y calcular cada resultado. | Responsable de evaluación UX | Matriz con diez respuestas completas por participante, fórmula aplicada y promedio revisado. | Antes de la entrega. |
| Configurar los destinos y secretos de despliegue y ejecutar el workflow. | Mantenedor con acceso al hosting | Los dos servicios aceptan el deploy y sus health checks responden correctamente. | Antes de declarar CI/CD completo. |
| Medir métricas de carga y API en el entorno publicado. | Responsable técnico | TTFB, FCP, LCP y latencias registradas con ruta, fecha y herramienta. | Antes de cerrar el informe Playwright. |
| Revisar navegación documental. | Responsable documental | README principal enlaza los cuatro documentos; cada documento retorna al README; enlaces comprobados. | Antes de la entrega. |

## Cierre de la retrospectiva

El avance principal del Sprint 4 es la automatización de los recorridos críticos de navegador, con resultado local satisfactorio en tres motores. La siguiente mejora es cerrar la trazabilidad y convertir los resultados locales en evidencias remotas y de campo: ejecución E2E en Actions, evaluación SUS con participantes, despliegue y mediciones reales. Hasta completar esas comprobaciones, el cierre técnico se considera en curso.

## Navegación

- [Índice del Sprint 4](README.md)
- [README principal](../../../README.md)
