# Retrospectiva del Sprint — V_1_0_0

**Nombre del proyecto:** EcoLogística Huancayo\
**Líder del proyecto:** Kevyn Leeonardo Velasquez Palomino\
**Fecha:** 2026-10-20\
**Versión:** V_1_0_0

[← Índice del Sprint 3](README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## ¿Qué aprendimos?

- La automatización debe verificarse tanto localmente como en GitHub Actions. Que las pruebas pasen en la PC no garantiza por sí solo que el job de nube esté correctamente configurado.
- La indentación y las rutas relativas son críticas en los workflows YAML. La revisión del diff y del contenido final ayudó a detectar errores antes de hacer push.
- El primer análisis de SonarQube falló con HTTP 403 al solicitar metadatos de JRE. La ejecución posterior pasó sin modificar el código de la aplicación; por eso, ante un fallo de infraestructura/autenticación, conviene leer el primer error concreto y reintentar de forma controlada.
- Las métricas de cobertura deben interpretarse por alcance. El 97 % de `pytest-cov` local mide cobertura del backend, mientras que el 0,0 % de Coverage on New Code de SonarQube en el PR se refiere al código nuevo del cambio.
- Una rama, un commit, una ejecución de CI, un análisis de SonarQube y el merge deben quedar enlazados para que la evidencia sea rastreable.

## ¿Qué estamos haciendo bien?

- Se ejecutaron localmente 43 pruebas del backend con resultado satisfactorio y 97 % de cobertura.
- Se verificó la compilación del frontend antes de completar el flujo de CI.
- Se mantuvo `SONAR_TOKEN` como secreto de GitHub Actions en vez de escribir su valor en archivos versionados.
- Se trabajó mediante rama de feature/documentación, pull request y comprobaciones automáticas antes de integrar en `develop`.
- Se conservó el reporte XML como artefacto generado y se añadió a `.gitignore` para evitar versionar resultados temporales.

## ¿Qué podemos hacer mejor?

### Personas

- Hacer explícito quién revisa la calidad, la seguridad y la accesibilidad en cada iteración, aunque una misma persona cumpla varios roles.
- Antes de presentar un resultado, comprobar que la captura o el registro corresponden a la rama y al commit que se están documentando.

### Relaciones

- Mantener en cada pull request una descripción del propósito, las verificaciones ejecutadas y las limitaciones conocidas.
- No declarar una aceptación formal de stakeholders sin evidencia o confirmación registrada.

### Procesos

- Mantener un checklist de cierre que incluya `git diff --check`, pruebas locales, build frontend, checks del pull request y estado de Quality Gate.
- Separar los resultados medidos de las evaluaciones pendientes. En especial, no usar un Quality Gate aprobado como sustituto de una revisión OWASP o WCAG.
- Verificar que la cobertura XML se importa en SonarQube y registrar la cobertura global por separado de Coverage on New Code.

### Herramientas

- Revisar los registros completos de GitHub Actions ante un fallo y corregir la causa identificada en lugar de cambiar archivos a ciegas.
- Vigilar los avisos de deprecación de acciones (Node.js 20) y la futura migración del runner `ubuntu-latest`; actualizar acciones de forma deliberada y volver a validar CI.
- Continuar usando `SONAR_TOKEN` como secreto y rotarlo si alguna vez se expone.

## Acciones a realizar

| Acción | Responsable (rol) | Criterio medible de cierre | Plazo propuesto |
|---|---|---|---|
| Verificar la importación del reporte `backend/coverage.xml` y documentar la cobertura global de SonarQube. | Responsable de calidad del repositorio | La pantalla de medidas muestra cobertura global o queda documentada la causa exacta de su ausencia. | Antes de cerrar la documentación del Sprint 3. |
| Revisar las incidencias históricas actuales de Security y Reliability y registrar regla, severidad, archivo y decisión. | Responsable técnico | Cada incidencia activa revisada tiene evidencia y una acción priorizada. | Antes de la siguiente revisión técnica. |
| Completar la matriz de las diez categorías OWASP Top 10:2025. | Responsable de seguridad | Las 10 categorías tienen estado justificado y evidencia/recomendación; no quedan como “limpio” sin revisión. | Antes de cerrar la evaluación de seguridad. |
| Ejecutar Lighthouse y/o axe/WAVE más pruebas manuales de teclado y formularios. | Responsable de frontend/accesibilidad | Se registran resultados para los cuatro principios WCAG, hallazgos y correcciones o justificación. | Antes de cerrar la evaluación WCAG. |
| Conservar todas las comprobaciones CI en verde y revisar avisos de acciones al actualizar dependencias. | Mantenedor del repositorio | Todo PR tiene backend, frontend y análisis SonarCloud satisfactorios o una excepción documentada. | En cada pull request. |

## Cierre de la retrospectiva

El sprint consiguió automatizar y verificar el flujo de pruebas, build y análisis de calidad. La mejora más importante pendiente es completar las evaluaciones específicas de seguridad y accesibilidad y consolidar las métricas globales de SonarQube antes de dar la entrega documental por cerrada.

## Navegación

- [Índice del Sprint 3](README.md)
- [Índice de implementación](../README.md)
- [README principal](../../../README.md)
