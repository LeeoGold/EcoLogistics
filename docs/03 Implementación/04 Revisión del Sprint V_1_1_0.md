# 04 Revisión del Sprint V_1_1_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23

## 1. Objetivo de la revisión

Revisar el incremento del Sprint 1, contrastando HUs, subtareas, pruebas, evidencia técnica y Definition of Done (DoD).

## 2. Resultado por HU

| HU | Estado Jira actual | Resultado técnico | DoD/aceptación |
|---|---|---|---|
| US-001 Registrar vehículo | Completada en Jira al cierre | Registro funcional, persistencia PostgreSQL y pruebas automatizadas verificadas. | Completada en Jira; la aceptación formal del Product Owner y el staging automatizado no cuentan con evidencia en los materiales revisados. |
| US-002 Consultar vehículos | Completada en Jira al cierre | Consulta, visualización, búsqueda y filtros verificados. | Completada en Jira; la aceptación formal del Product Owner y el staging automatizado no cuentan con evidencia en los materiales revisados. |
| US-003 Registrar pedido | Por hacer | No implementada en este Sprint. | No aplica aún. |
| US-004 Consultar pedidos | Por hacer | No implementada en este Sprint. | No aplica aún. |
| US-005 Registrar conductor | Por hacer | No implementada en este Sprint. | No aplica aún. |
| US-006 Registrar cliente | Por hacer | No implementada en este Sprint. | No aplica aún. |

## 3. HUs terminadas y aceptación

Al cerrar el Sprint, Jira registró **2 actividades completadas**, correspondientes a US-001 y US-002. La revisión técnica documenta que ambas tienen implementación y pruebas verificadas.

**Aceptación formal por Product Owner:** no se dispone de una evidencia documental de aceptación durante la revisión, por lo que no se atribuye esa aceptación al PO.

**DoD:** se verificaron implementación, pruebas, cobertura, compilación, dependencias, integración y trazabilidad. No se dispone de evidencia de despliegue automatizado a staging ni de una revisión PR asociada específicamente a cada HU; la PR #1 disponible corresponde al cierre documental; no se utiliza como evidencia específica de aceptación de cada HU.

## 4. HUs no terminadas / pendientes

- **US-003 a US-006:** quedaron abiertas al cierre del Sprint y fueron trasladadas al backlog para trabajo posterior. No se registró implementación de estas HUs durante el Sprint 1.

## 5. Evidencia de calidad

Para el incremento de vehículos se verificó:

- 11 pruebas automatizadas aprobadas.
- 99 % de cobertura sobre `app`.
- Compilación de `app` y `tests` sin errores.
- Dependencias consistentes según `pip check`.
- Integración React ↔ FastAPI ↔ PostgreSQL.

## 6. Feedback de stakeholders / docente

No se dispone de una retroalimentación documentada de stakeholders o docente correspondiente a este Sprint. No se inventa contenido para esta sección.

## 7. Observaciones técnicas para Sprint 2

- Las seis HUs fueron incorporadas al alcance registrado del Sprint el 11/09/2026, después del inicio planificado del 09/09/2026.
- La mayor concentración de trabajo se produjo al final del periodo, reflejada en Burndown/Burnup.
- El módulo de vehículos alcanzó un estado técnico funcional, pero la evidencia formal de DoD debe integrarse al flujo habitual del equipo.

## 8. Conclusión de la revisión

El Sprint 1 produjo un incremento funcional verificable en el módulo de vehículos y una base modular para continuar el desarrollo. Jira registró 2 HUs completadas (6 SP) y 4 HUs abiertas trasladadas al backlog. La evidencia de QA registra 11/11 pruebas aprobadas y 99 % de cobertura en el backend.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación inicial de la revisión. |
| 1.1.0 | 2026-09-23 | Incorporación de resultados de QA, Burndown/Burnup, estado real de aceptación y velocidad final. |

[← Volver al README Principal](../../README.md)
