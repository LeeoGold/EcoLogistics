# 03 Registro de riesgos V_1_1_0

[â† Volver al README](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23

## Matriz de riesgos de implementaciÃ³n

Escala utilizada:

- Probabilidad (P): 1 = muy baja, 5 = muy alta.
- Impacto (I): 1 = muy bajo, 5 = muy alto.
- ExposiciÃ³n: **P Ã— I**.
- Nivel: 1â€“5 Bajo, 6â€“10 Medio, 11â€“25 Alto.

| ID | Riesgo | Tipo | P | I | ExposiciÃ³n | Nivel | Estrategia | Contingencia | Responsable |
|---|---|---|---:|---:|---:|---|---|---|---|
| RI-001 | DesalineaciÃ³n entre el estado real del cÃ³digo y el estado registrado en Jira. | Proceso/Requisitos | 3 | 4 | 12 | Alto | Mitigar | Revisar HU, subtareas, pruebas y evidencia antes de cambiar estados. | Equipo de desarrollo |
| RI-002 | Conectividad inestable entre PCs que retrase commits, pushes y sincronizaciÃ³n. | Infraestructura | 4 | 3 | 12 | Alto | Mitigar | Crear checkpoints locales y sincronizar al recuperar conexiÃ³n. | Equipo de desarrollo |
| RI-003 | Falta de evidencia de pruebas que impida cerrar HUs aunque exista implementaciÃ³n. | TÃ©cnico/Calidad | 2 | 4 | 8 | Medio | Mitigar | Ejecutar pruebas y registrar evidencia antes de declarar Done. | Equipo de desarrollo |
| RI-004 | Crecimiento de funcionalidad sin respetar la modularidad exigida. | TÃ©cnico/Arquitectura | 3 | 3 | 9 | Medio | Mitigar | Aplicar separaciÃ³n por capas y componentes desde el inicio de cada mÃ³dulo. | Equipo de desarrollo |
| RI-005 | Diferencias de entorno entre PCs, especialmente PostgreSQL, `.env` o dependencias. | Infraestructura | 3 | 4 | 12 | Alto | Mitigar | VerificaciÃ³n inicial del entorno y ejecuciÃ³n integral en MAIN cuando sea necesario. | Equipo de desarrollo |

## Seguimiento de riesgos

Los riesgos con exposiciÃ³n alta deben revisarse antes de cada incremento. Durante Sprint 1 se materializaron situaciones relacionadas con conectividad y diferencias de entorno, por lo que RI-002 y RI-005 pasan a ser riesgos prioritarios para Sprint 2.

## Historial de cambios

| VersiÃ³n | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | ActualizaciÃ³n inicial del registro para implementaciÃ³n. |
| 1.1.0 | 2026-09-23 | Evaluación cuantitativa P-I, riesgo de entorno multi-PC y actualización del seguimiento con los resultados del cierre del Sprint 1. |

[â† Volver al README](../../README.md)
