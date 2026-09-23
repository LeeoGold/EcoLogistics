# 04 RevisiÃ³n del Sprint V_1_1_0

[â† Volver al README](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23

## 1. Objetivo de la revisiÃ³n

Revisar el incremento del Sprint 1, contrastando HUs, subtareas, pruebas, evidencia tÃ©cnica y Definition of Done (DoD).

## 2. Resultado por HU

| HU | Estado Jira actual | Resultado tÃ©cnico | DoD/aceptaciÃ³n |
|---|---|---|---|
| US-001 Registrar vehÃ­culo | En revisiÃ³n / QA | Registro funcional, persistencia PostgreSQL y pruebas automatizadas verificadas. | En revisiÃ³n; no se declara Done por falta de evidencia de PR aprobada, staging y aceptaciÃ³n formal del PO. |
| US-002 Consultar vehÃ­culos | En revisiÃ³n / QA | Consulta, visualizaciÃ³n, bÃºsqueda y filtros verificados. | En revisiÃ³n; no se declara Done por falta de evidencia de PR aprobada, staging y aceptaciÃ³n formal del PO. |
| US-003 Registrar pedido | Por hacer | No implementada en este Sprint. | No aplica aÃºn. |
| US-004 Consultar pedidos | Por hacer | No implementada en este Sprint. | No aplica aÃºn. |
| US-005 Registrar conductor | Por hacer | No implementada en este Sprint. | No aplica aÃºn. |
| US-006 Registrar cliente | Por hacer | No implementada en este Sprint. | No aplica aÃºn. |

## 3. HUs terminadas y aceptaciÃ³n

Al cerrar el Sprint, Jira registrÃ³ **2 actividades completadas**, correspondientes a US-001 y US-002. La revisiÃ³n tÃ©cnica documenta que ambas tienen implementaciÃ³n y pruebas verificadas.

**AceptaciÃ³n formal por Product Owner:** no se dispone de una evidencia documental de aceptaciÃ³n durante la revisiÃ³n, por lo que no se atribuye esa aceptaciÃ³n al PO.

**DoD:** se verificaron implementaciÃ³n, pruebas, cobertura, compilaciÃ³n, dependencias, integraciÃ³n y trazabilidad. No se dispone de evidencia de despliegue automatizado a staging ni de una revisiÃ³n PR asociada especÃ­ficamente a cada HU; la PR #1 disponible corresponde al cierre documental del Sprint.

## 4. HUs no terminadas / pendientes

- **US-003 a US-006:** quedaron abiertas al cierre del Sprint y fueron trasladadas al backlog para trabajo posterior. No se registrÃ³ implementaciÃ³n de estas HUs durante el Sprint 1.

## 5. Evidencia de calidad

Para el incremento de vehÃ­culos se verificÃ³:

- 11 pruebas automatizadas aprobadas.
- 99 % de cobertura sobre `app`.
- CompilaciÃ³n de `app` y `tests` sin errores.
- Dependencias consistentes segÃºn `pip check`.
- IntegraciÃ³n React â†” FastAPI â†” PostgreSQL.

## 6. Feedback de stakeholders / docente

No se dispone de una retroalimentaciÃ³n documentada de stakeholders o docente correspondiente a este Sprint. No se inventa contenido para esta secciÃ³n.

## 7. Observaciones tÃ©cnicas para Sprint 2

- Las seis HUs fueron incorporadas al alcance registrado del Sprint el 11/09/2026, despuÃ©s del inicio planificado del 09/09/2026.
- La mayor concentraciÃ³n de trabajo se produjo al final del periodo, reflejada en Burndown/Burnup.
- El mÃ³dulo de vehÃ­culos alcanzÃ³ un estado tÃ©cnico funcional, pero la evidencia formal de DoD debe integrarse al flujo habitual del equipo.

## 8. ConclusiÃ³n de la revisiÃ³n

El Sprint 1 produjo un incremento funcional verificable en el mÃ³dulo de vehÃ­culos y una base modular para continuar el desarrollo. Jira registrÃ³ 2 HUs completadas (6 SP) y 4 HUs abiertas trasladadas al backlog. La evidencia de QA registra 11/11 pruebas aprobadas y 99 % de cobertura en el backend.

## Historial de cambios

| VersiÃ³n | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | CreaciÃ³n inicial de la revisiÃ³n. |
| 1.1.0 | 2026-09-23 | Incorporación de resultados de QA, Burndown/Burnup, estado real de aceptación, cierre del Sprint y velocidad final registrada. |

[â† Volver al README](../../README.md)
