# Implementación del Sprint 1

[← Volver al README Principal](../../README.md)

**Versión de la documentación:** 1.1.0  
**Fecha de actualización:** 2026-09-23  
**Estado:** Sprint 1 cerrado en Jira

## 1. Propósito

Esta carpeta reúne los cinco entregables exigidos para documentar la implementación del Sprint 1 de **EcoLogística Huancayo**, junto con las evidencias técnicas y de gestión generadas durante el cierre. La consigna exige los cinco archivos Markdown, la organización del código fuente, la revisión de la documentación previa, el versionado y el enlazado bidireccional con el README principal.

## 2. Entregables

| Ítem | Entregable | Documento |
|---|---|---|
| 1 | Informe de estado | [01 Informe de estado del proyecto V_1_1_0](./01%20Informe%20de%20estado%20del%20proyecto%20V_1_1_0.md) |
| 2 | Registro de Impedimentos | [02 Registro de Impedimentos V_1_1_0](./02%20Registro%20de%20Impedimentos%20V_1_1_0.md) |
| 3 | Registro de Riesgos | [03 Registro de riesgos V_1_1_0](./03%20Registro%20de%20riesgos%20V_1_1_0.md) |
| 4 | Revisión del Sprint | [04 Revisión del Sprint V_1_1_0](./04%20Revisión%20del%20Sprint%20V_1_1_0.md) |
| 5 | Retrospectiva del Sprint | [05 Retrospectiva del Sprint V_1_1_0](./05%20Retrospectiva%20del%20Sprint%20V_1_1_0.md) |

## 3. Resultado final del Sprint 1

| Métrica | Resultado |
|---|---:|
| HUs comprometidas | 6 |
| HUs completadas por Jira al cierre | 2 |
| HUs abiertas trasladadas al backlog | 4 |
| Story Points comprometidos | 20 |
| Story Points completados | 6 |
| Story Points pendientes | 14 |
| Cumplimiento por HUs | 33,3 % |
| Cumplimiento por SP | 30 % |
| Velocidad registrada por Jira | 6 SP |
| Pruebas automatizadas | 11/11 aprobadas |
| Cobertura sobre `app` | 99 % |

## 4. Evidencias de cierre

| Evidencia | Archivo | Qué demuestra |
|---|---|---|
| Burndown | [06-burndown-sprint-1.png](./evidencias/06-burndown-sprint-1.png) | Evolución del trabajo restante del Sprint. |
| Burnup | [07-burnup-sprint-1.png](./evidencias/07-burnup-sprint-1.png) | Trabajo completado registrado por Jira. |
| Pull Request | [08-pull-request-aprobada.png](./evidencias/08-pull-request-aprobada.png) | Revisión y aprobación de la PR de cierre documental. |
| Velocidad | [09-velocidad-sprint-1.png](./evidencias/09-velocidad-sprint-1.png) | Velocidad registrada por Jira al cerrar Sprint 1. |

## 5. Calidad y verificación técnica

El incremento de gestión de vehículos fue validado en **MAIN** con: 11 pruebas automatizadas aprobadas, 99 % de cobertura sobre `app`, ejecución de `python -m compileall -q app tests` sin errores y `python -m pip check` con **No broken requirements found**. También se validó la integración **React ↔ FastAPI ↔ PostgreSQL**.

Los dos warnings observados durante `pytest` corresponden a avisos de deprecación de dependencias y no generaron fallos en las pruebas.

## 6. Trazabilidad con la consigna de implementación

| Ítem de la consigna | Evidencia en el repositorio | Estado documental |
|---|---|---|
| 1. Informe de estado | Informe + Burndown/Burnup + velocidad | Documentado |
| 2. Impedimentos | Registro con impacto, resolución, estado y responsable | Documentado |
| 3. Riesgos | Matriz P×I + mitigación + contingencia | Documentado |
| 4. Revisión del Sprint | Estado final de las 6 HUs + justificación + nota sobre feedback | Documentado; no se recibió feedback formal documentado |
| 5. Retrospectiva | Keep / Start / Stop + compromisos medibles para Sprint 2 | Documentado |
| 6. Código y `.gitignore` | Frontend modular + backend por capas + exclusiones de entorno | Verificado en repositorio |
| 7. Coherencia y versionado | Actualizaciones V_1_1_0 en documentos seleccionados | Documentado |
| 8. Repositorio y enlazado bidireccional | README principal ↔ documentos + retornos | Verificado |

## 7. Ingeniería de software aumentada con IA

Durante la evolución del proyecto se preparó un flujo **spec-driven** con **OpenSpec** y **OpenCode**. OpenSpec quedó configurado en el repositorio con el esquema `spec-driven` y OpenCode fue preparado como herramienta de trabajo con sus skills y comandos correspondientes.

En esta entrega de Sprint 1, el uso de IA se refleja principalmente en la organización y trazabilidad de cambios, análisis de implementación, apoyo a QA y preparación de la siguiente evolución. La especificación de MFA/TOTP quedó preparada para una etapa posterior y **no se declara como funcionalidad implementada dentro del Sprint 1**.

## 8. Observaciones para Sprint 2

- Mantener Jira sincronizado con el trabajo real desde el inicio del Sprint.
- Verificar el entorno de desarrollo antes de comenzar cada sesión.
- Registrar evidencia de pruebas antes del cambio de estado final de cada HU.
- Aplicar ramas y Pull Requests al desarrollo de las nuevas funcionalidades cuando el flujo del equipo lo permita.
- Mantener control del alcance desde el inicio del Sprint.

## 9. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación de la documentación del Sprint 1. |
| 1.1.0 | 2026-09-23 | Consolidación del cierre, métricas, evidencias, trazabilidad y preparación del flujo de ingeniería aumentada con IA. |

[← Volver al README Principal](../../README.md)
