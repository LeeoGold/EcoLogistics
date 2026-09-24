# 05 Retrospectiva del Sprint V_1_1_0

[← Volver al README principal](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23

## 1. Método utilizado

Se utiliza el formato **Keep / Start / Stop** para identificar prácticas que deben mantenerse, comenzar o dejar de utilizarse y convertirlas en compromisos medibles para Sprint 2.

## 2. Keep — Mantener

- Mantener Jira como fuente de seguimiento de HUs y subtareas.
- Mantener checkpoints y pushes frecuentes para reducir riesgo de pérdida de trabajo.
- Mantener el desarrollo incremental: primero construir una funcionalidad comprobable y luego ampliar el alcance.
- Mantener pruebas automáticas como evidencia de calidad del backend.

## 3. Start — Empezar

- Empezar cada sesión verificando entorno: Python, dependencias, PostgreSQL, `.env`, puertos y frontend.
- Empezar a registrar evidencia de pruebas el mismo día de ejecución.
- Empezar cada HU nueva con la estructura modular de frontend y backend ya definida.
- Empezar a trabajar con ramas y Pull Requests para que la revisión quede evidenciada cuando el flujo del equipo lo permita.

## 4. Stop — Dejar de hacer

- Dejar de mover HUs a estados finales antes de verificar la DoD completa.
- Dejar de añadir el alcance del Sprint después de su inicio; el Burndown registró que las seis HUs fueron incorporadas el 11/09/2026, mientras el Sprint iniciaba el 09/09/2026.
- Dejar de depender de que una PC tenga una configuración distinta sin una verificación previa del entorno.
- Dejar de concentrar responsabilidades en pocos archivos cuando la consigna exige modularidad.

## 5. Compromisos medibles para Sprint 2

| Compromiso | Indicador | Meta | Responsable |
|---|---|---|---|
| Sincronizar Jira con el trabajo real | Subtareas trabajadas actualizadas en Jira | **100 %** en la misma sesión | Equipo de desarrollo |
| Evidenciar pruebas | HUs implementadas con evidencia de prueba | **100 %** antes de pasar a revisión final | Equipo de desarrollo |
| Verificar entorno al inicio | Sesiones con checklist de entorno | **100 %** | Equipo de desarrollo |
| Proteger avances | Sesiones con checkpoint/push | **≥1 por sesión** con conectividad | Equipo de desarrollo |
| Evitar alcance tardío | Historias agregadas después del inicio | **0** sin justificación formal | Equipo de desarrollo |
| Aplicar modularidad | Funcionalidades nuevas con estructura por capas/componentes | **100 %** | Equipo de desarrollo |

## 6. Aprendizajes

Sprint 1 permitió comprobar en la práctica que la implementación funcional, el registro en Jira, las pruebas, la evidencia y la documentación deben evolucionar de forma sincronizada.

También se comprobó la importancia de mantener un entorno reproducible: la diferencia de disponibilidad de PostgreSQL entre PCs obligó a trasladar la validación integral a MAIN.

## 7. Datos observables para la retrospectiva

- El Sprint tuvo **20 SP** comprometidos y Jira registró **6 SP** completados.
- La velocidad registrada al cierre fue de **6 SP**.
- Las seis HUs fueron incorporadas al alcance el **11/09/2026**, aunque la fecha planificada de inicio era el 09/09/2026.
- Dos HUs llegaron a completarse y cuatro quedaron abiertas y fueron trasladadas al backlog.
- La validación integral del backend se realizó en MAIN debido a diferencias de entorno entre PCs.

## 8. Conclusión

El Sprint 1 dejó una base técnica utilizable y permitió identificar mejoras concretas de proceso. Las acciones de Sprint 2 se enfocan en sincronización temprana, verificación del entorno, evidencia de calidad y control del alcance desde el inicio del Sprint.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación inicial de la retrospectiva. |
| 1.1.0 | 2026-09-23 | Consolidación de observaciones de flujo, entorno, QA, resultados de Jira, velocidad y compromisos medibles. |

[← Volver al README principal](../../README.md)

[← Volver al README Principal](../../README.md)
