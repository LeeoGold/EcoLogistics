# 02 Registro de Impedimentos V_1_1_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23

## Registro

| ID | Impedimento | Fecha de detección | Impacto en cronograma/HUs | Acción / resolución | Estado | Responsable |
|---|---|---|---|---|---|---|
| IMP-001 | Conectividad inestable en la PC secundaria utilizada para continuar la implementación y sincronizar cambios con GitHub. | 2026-09-22 | Retrasó la sincronización remota y obligó a trabajar con checkpoints. | Continuar en bloques pequeños y realizar push cuando hubo conectividad. | Resuelto | Equipo de desarrollo |
| IMP-002 | La PC secundaria no tenía PostgreSQL disponible en `localhost:5432`, por lo que no podía ejecutar el backend con la misma configuración local. | 2026-09-22 | Impidió realizar la prueba completa de ejecución en esa PC y trasladó la validación a MAIN. | Ejecutar la validación integral en MAIN, donde PostgreSQL ya estaba disponible, y mantener el desarrollo sincronizado mediante Git. | Resuelto | Equipo de desarrollo |

## Seguimiento

Los dos impedimentos fueron resueltos para el cierre técnico del incremento revisado. La estrategia utilizada fue separar el trabajo de desarrollo del entorno de ejecución y centralizar la validación integral en MAIN.

## Impacto aprendido

La experiencia mostró que el proyecto depende de disponer de un entorno reproducible en cada equipo. Para Sprint 2 se recomienda documentar una verificación inicial de Python, dependencias, PostgreSQL, `.env` y puertos antes de comenzar el trabajo.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación del registro inicial. |
| 1.1.0 | 2026-09-23 | Incorporación y cierre de los impedimentos de conectividad y entorno PostgreSQL tras la validación en MAIN. |

[← Volver al README Principal](../../README.md)
