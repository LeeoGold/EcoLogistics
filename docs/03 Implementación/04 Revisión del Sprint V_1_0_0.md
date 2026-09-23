# 04 Revisión del Sprint V_1_0_0

[← Volver al README](../../README.md)

**Versión documental:** 1.1.0  
**Fecha de corte:** 2026-09-23

## 1. Objetivo de la revisión

Revisar el incremento del Sprint 1, contrastando HUs, subtareas, pruebas, evidencia técnica y Definition of Done (DoD).

## 2. Resultado por HU

| HU | Estado Jira actual | Resultado técnico | DoD/aceptación |
|---|---|---|---|
| US-001 Registrar vehículo | En revisión / QA | Registro funcional, persistencia PostgreSQL y pruebas automatizadas verificadas. | En revisión; no se declara Done por falta de evidencia de PR aprobada, staging y aceptación formal del PO. |
| US-002 Consultar vehículos | En revisión / QA | Consulta, visualización, búsqueda y filtros verificados. | En revisión; no se declara Done por falta de evidencia de PR aprobada, staging y aceptación formal del PO. |
| US-003 Registrar pedido | Por hacer | No implementada en este Sprint. | No aplica aún. |
| US-004 Consultar pedidos | Por hacer | No implementada en este Sprint. | No aplica aún. |
| US-005 Registrar conductor | Por hacer | No implementada en este Sprint. | No aplica aún. |
| US-006 Registrar cliente | Por hacer | No implementada en este Sprint. | No aplica aún. |

## 3. HUs terminadas y aceptadas por PO

Con la evidencia disponible, **no se declara ninguna HU como terminada y aceptada formalmente por el Product Owner**.

Las dos HUs de vehículos tienen implementación y pruebas verificadas, pero permanecen en revisión/QA porque todavía no existe evidencia suficiente para acreditar todas las condiciones de la DoD ni una aceptación formal del PO.

## 4. HUs no terminadas / pendientes

- **US-001:** implementación y pruebas realizadas; revisión QA pendiente de cierre formal.
- **US-002:** implementación, consulta y filtros realizados; revisión QA pendiente de cierre formal.
- **US-003 a US-006:** permanecen en Por hacer por falta de implementación dentro del Sprint 1.

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

El Sprint 1 produjo un incremento funcional verificable en el módulo de vehículos y una base modular para continuar el desarrollo. El resultado no se declara como cumplimiento total del Sprint, dado que cuatro HUs siguen pendientes y las dos HUs implementadas permanecen en revisión/QA.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación inicial de la revisión. |
| 1.1.0 | 2026-09-23 | Incorporación de resultados de QA, Burndown/Burnup y estado real de aceptación. |

[← Volver al README](../../README.md)
