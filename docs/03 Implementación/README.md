# Implementación del Sprint 1

[← Volver al README Principal](../../README.md)

**Versión de la documentación:** 1.0.0  
**Fecha de actualización:** 2026-09-23  
**Estado:** Sprint 1 cerrado en Jira

## 1. Propósito

Esta carpeta reúne los **cuatro entregables oficiales** exigidos para documentar la implementación del Sprint 1 de **EcoLogística Huancayo**, junto con un **Registro de riesgos complementario** y las evidencias técnicas y de gestión generadas durante el cierre.

La consigna exige que los documentos se encuentren en `docs/03 Implementación`, que utilicen los nombres indicados, mantengan coherencia con el Sprint, estén versionados y tengan navegación de ida y vuelta con el README principal.

## 2. Entregables oficiales

| Ítem | Entregable | Documento |
|---|---|---|
| 1 | Informe de Estado del Proyecto | [01 Informe de estado del proyecto V_1_0_0](./01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) |
| 2 | Registro de Impedimentos | [02 Registro de Impedimentos V_1_0_0](./02%20Registro%20de%20Impedimentos%20V_1_0_0.md) |
| 3 | Revisión del Sprint | [03 Revisión del Sprint V_1_0_0](./03%20Revisión%20del%20Sprint%20V_1_0_0.md) |
| 4 | Retrospectiva del Sprint | [04 Retrospectiva del Sprint V_1_0_0](./04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) |

## 3. Documento complementario

| Documento | Utilidad |
|---|---|
| [05 Registro de riesgos V_1_0_0](./05%20Registro%20de%20riesgos%20V_1_0_0.md) | Refuerza la gestión y trazabilidad de riesgos de implementación. |

## 4. Resultado final del Sprint 1

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

## 5. Evidencias de cierre

| Evidencia | Archivo | Qué demuestra |
|---|---|---|
| Burndown | [06-burndown-sprint-1.png](./evidencias/06-burndown-sprint-1.png) | Evolución del trabajo restante del Sprint. |
| Burnup | [07-burnup-sprint-1.png](./evidencias/07-burnup-sprint-1.png) | Trabajo completado registrado por Jira. |
| Pull Request | [08-pull-request-cierre.png](./evidencias/08-pull-request-cierre.png) | Estado de la PR de cierre documental; la captura disponible muestra **Ready to merge**. |
| Velocidad | [09-velocidad-sprint-1.png](./evidencias/09-velocidad-sprint-1.png) | Velocidad registrada por Jira al cerrar Sprint 1. |

## 6. Calidad y verificación técnica

El incremento de gestión de vehículos fue validado en MAIN con 11 pruebas automatizadas aprobadas, 99 % de cobertura sobre `app`, ejecución de `python -m compileall -q app tests` sin errores y `python -m pip check` con **No broken requirements found**. También se validó la integración **React ↔ FastAPI ↔ PostgreSQL**.

## 7. Trazabilidad con la consigna de implementación

| Ítem evaluado | Evidencia en el repositorio | Estado |
|---|---|---|
| Informe de Estado | Documento oficial + métricas + evidencias | Preparado |
| Registro de Impedimentos | Tabla completa con impacto, prioridad y resolución | Preparado |
| Revisión del Sprint | HUs, incremento, DoD y pendientes | Preparado; falta evidencia formal de demo ante stakeholders |
| Retrospectiva | Personas, Relaciones, Procesos, Herramientas y acciones | Preparado |
| Código y `.gitignore` | Frontend modular + backend por capas + exclusiones | Verificado |
| Coherencia y versionado | Documentos alineados al Sprint y nomenclatura V_1_0_0 | Preparado |
| README y navegación | Enlaces relativos de ida y vuelta | Preparado |

## 8. Observaciones para Sprint 2

- Mantener Jira sincronizado con el trabajo real desde el inicio del Sprint.
- Verificar el entorno de desarrollo antes de comenzar cada sesión.
- Registrar evidencia de pruebas antes del cambio de estado final de cada HU.
- Formalizar la revisión por Pull Request.
- Registrar una demostración y aceptación del incremento cuando corresponda.

## 9. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-23 | Consolidación del índice y trazabilidad de los entregables oficiales y del documento complementario. |

[← Volver al README Principal](../../README.md)
