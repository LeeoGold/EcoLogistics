# 02 Registro de Impedimentos V_1_1_0

[â† Volver al README](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23

## Registro

| ID | Impedimento | Fecha de detecciÃ³n | Impacto en cronograma/HUs | AcciÃ³n / resoluciÃ³n | Estado | Responsable |
|---|---|---|---|---|---|---|
| IMP-001 | Conectividad inestable en la PC secundaria utilizada para continuar la implementaciÃ³n y sincronizar cambios con GitHub. | 2026-09-22 | RetrasÃ³ la sincronizaciÃ³n remota y obligÃ³ a trabajar con checkpoints. | Continuar en bloques pequeÃ±os y realizar push cuando hubo conectividad. | Resuelto | Equipo de desarrollo |
| IMP-002 | La PC secundaria no tenÃ­a PostgreSQL disponible en `localhost:5432`, por lo que no podÃ­a ejecutar el backend con la misma configuraciÃ³n local. | 2026-09-22 | ImpidiÃ³ realizar la prueba completa de ejecuciÃ³n en esa PC y trasladÃ³ la validaciÃ³n a MAIN. | Ejecutar la validaciÃ³n integral en MAIN, donde PostgreSQL ya estaba disponible, y mantener el desarrollo sincronizado mediante Git. | Resuelto | Equipo de desarrollo |

## Seguimiento

Los dos impedimentos fueron resueltos para el cierre tÃ©cnico del incremento revisado. La estrategia utilizada fue separar el trabajo de desarrollo del entorno de ejecuciÃ³n y centralizar la validaciÃ³n integral en MAIN.

## Impacto aprendido

La experiencia mostrÃ³ que el proyecto depende de disponer de un entorno reproducible en cada equipo. Para Sprint 2 se recomienda documentar una verificaciÃ³n inicial de Python, dependencias, PostgreSQL, `.env` y puertos antes de comenzar el trabajo.

## Historial de cambios

| VersiÃ³n | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | CreaciÃ³n del registro inicial. |
| 1.1.0 | 2026-09-23 | Incorporación del impedimento de entorno PostgreSQL, validación en MAIN y consolidación del cierre de impedimentos del Sprint 1. |

[â† Volver al README](../../README.md)
