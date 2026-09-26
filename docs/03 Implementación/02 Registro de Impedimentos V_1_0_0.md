# 02 Registro de Impedimentos V_1_0_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.0.0  
**Fecha de corte:** 2026-09-23

## Registro de impedimentos

| Impedimento # | Fecha de Registro | Descripción del Impedimento e Impacto en el Proyecto | Prioridad | Reportado por | Fecha tope de Resolución | Estado | Fecha de Resolución | Resolución / Comentarios |
|---|---|---|---|---|---|---|---|---|
| IMP-001 | 2026-09-22 | Conectividad inestable en la PC secundaria utilizada para continuar la implementación y sincronizar cambios con GitHub. Retrasó la sincronización remota y obligó a trabajar con checkpoints. | Alta | Equipo de desarrollo | Cierre del Sprint 1 | Resuelto | 2026-09-23 | Se trabajó en bloques pequeños y se realizó push cuando se recuperó la conectividad. |
| IMP-002 | 2026-09-22 | La PC secundaria no tenía PostgreSQL disponible en `localhost:5432`, impidiendo ejecutar el backend con la misma configuración local y trasladando la validación integral a MAIN. | Alta | Equipo de desarrollo | Cierre del Sprint 1 | Resuelto | 2026-09-23 | Se centralizó la validación integral en MAIN, donde PostgreSQL estaba disponible, y se mantuvo el desarrollo sincronizado mediante Git. |

> **Nota:** “Cierre del Sprint 1” se utiliza como fecha tope operativa porque los documentos disponibles no registran una fecha límite distinta para estos impedimentos.

## Seguimiento

Los dos impedimentos fueron resueltos para el cierre técnico del incremento revisado. La estrategia utilizada fue separar el trabajo de desarrollo del entorno de ejecución y centralizar la validación integral en MAIN.

## Impacto aprendido

La experiencia mostró que el proyecto depende de disponer de un entorno reproducible en cada equipo. Para Sprint 2 se recomienda documentar una verificación inicial de Python, dependencias, PostgreSQL, `.env` y puertos antes de comenzar el trabajo.

## Acciones preventivas para Sprint 2

| Acción | Indicador | Meta |
|---|---|---:|
| Checklist de entorno antes de comenzar | Sesiones con checklist ejecutado | 100 % |
| Sincronización frecuente | Sesiones con checkpoint/push | ≥ 1 por sesión con conectividad |
| Validación cruzada de entorno | Equipos con configuración documentada | 100 % |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-23 | Consolidación del registro conforme a la plantilla del Sprint 1, incluyendo impacto, prioridad, trazabilidad y resolución. |

[← Volver al README Principal](../../README.md)
