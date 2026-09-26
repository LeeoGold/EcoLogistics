# 03 Revisión del Sprint V_1_0_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.0.0  
**Fecha de corte:** 2026-09-23

## 1. Objetivo de la revisión

Revisar el incremento del Sprint 1, contrastando las Historias de Usuario, resultados técnicos, pruebas, evidencias disponibles y Definition of Done (DoD).

## 2. Historias de Usuario completadas en este Sprint

| HU | Estado Jira | Resultado técnico | DoD / aceptación |
|---|---|---|---|
| US-001 Registrar vehículo | Completada en Jira al cierre | Registro funcional, persistencia PostgreSQL y pruebas automatizadas verificadas. | Completada en Jira. No se dispone de evidencia documental de aceptación formal del Product Owner ni de staging automatizado. |
| US-002 Consultar vehículos | Completada en Jira al cierre | Consulta, visualización, búsqueda y filtros verificados. | Completada en Jira. No se dispone de evidencia documental de aceptación formal del Product Owner ni de staging automatizado. |

## 3. Demostración del trabajo completado

La demostración del incremento debe centrarse en las funcionalidades efectivamente desarrolladas durante Sprint 1:

1. Registro de vehículos.
2. Consulta de vehículos.
3. Búsqueda y filtros.
4. Persistencia en PostgreSQL.
5. Integración React ↔ FastAPI.
6. Pruebas automatizadas del módulo.

### Evidencias disponibles

- [Burndown del Sprint 1](./evidencias/06-burndown-sprint-1.png)
- [Burnup del Sprint 1](./evidencias/07-burnup-sprint-1.png)
- [Velocidad del Sprint 1](./evidencias/09-velocidad-sprint-1.png)
- [Pull Request de cierre documental](./evidencias/08-pull-request-cierre.png)

> **Estado de la demostración formal ante stakeholders:** en los materiales revisados no existe un acta, captura o registro que permita afirmar que se realizó una demostración formal ante stakeholders. Esta evidencia debe completarse en la revisión final del Sprint para satisfacer literalmente ese requisito de la rúbrica.

## 4. HUs no terminadas / pendientes

- **US-003 Registrar pedido:** pendiente.
- **US-004 Consultar pedidos:** pendiente.
- **US-005 Registrar conductor:** pendiente.
- **US-006 Registrar cliente:** pendiente.

Las cuatro HUs quedaron abiertas al cierre y fueron trasladadas al backlog para trabajo posterior.

## 5. Evidencia de calidad

Para el incremento de vehículos se verificó:

- 11 pruebas automatizadas aprobadas.
- 99 % de cobertura sobre `app`.
- Compilación de `app` y `tests` sin errores.
- Dependencias consistentes según `pip check`.
- Integración React ↔ FastAPI ↔ PostgreSQL.

## 6. Feedback de stakeholders / docente

No se dispone de una retroalimentación documentada correspondiente a este Sprint. Por tanto, no se atribuyen comentarios o decisiones a un stakeholder cuando no existe evidencia registrada.

## 7. Estado de la DoD al cierre

| Condición | Estado | Observación |
|---|---|---|
| Implementación del incremento | Verificada | US-001 y US-002 implementadas. |
| Pruebas automatizadas y cobertura ≥ 80 % | Verificada | 11/11 y 99 %. |
| Criterios Gherkin ejecutados | Parcial | Los criterios están documentados; no se dispone de una ejecución independiente. |
| Análisis estático | No verificado | No existe evidencia de herramienta específica en este cierre. |
| Pull Request revisada | Parcial | PR #1 creada y en estado Ready to merge; sin evidencia de revisión de tercero. |
| Integración | Verificada | React ↔ FastAPI ↔ PostgreSQL. |
| Staging automatizado | No verificado | Sin evidencia disponible. |
| Documentación | Verificada | Documentos de Sprint 1 preparados y versionados. |

## 8. Observaciones para Sprint 2

- Incorporar todo el alcance del Sprint antes del inicio operativo.
- Sincronizar Jira con el trabajo real durante la ejecución.
- Registrar evidencia de pruebas antes del cierre de cada HU.
- Completar el flujo de revisión por Pull Request.
- Establecer un procedimiento de demostración y aceptación de cada incremento.

## 9. Conclusión de la revisión

El Sprint 1 produjo un incremento funcional verificable en el módulo de vehículos y una base modular para continuar el desarrollo. Jira registró 2 HUs completadas (6 SP) y 4 HUs abiertas trasladadas al backlog. La evidencia de QA registra 11/11 pruebas aprobadas y 99 % de cobertura en el backend.

La revisión mantiene separados los hechos comprobados en Jira y en el repositorio de las actividades de aceptación formal o demostración ante stakeholders que no cuentan con evidencia documental en los materiales disponibles.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-23 | Consolidación de la revisión del Sprint 1 conforme a la plantilla y evidencia disponible. |

[← Volver al README Principal](../../README.md)
