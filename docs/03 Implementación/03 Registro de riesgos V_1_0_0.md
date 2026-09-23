# 03 Registro de riesgos V_1_0_0

[← Volver al README](../../README.md)

**Versión documental:** 1.1.0  
**Fecha de corte:** 2026-09-23

## Matriz de riesgos de implementación

Escala utilizada:

- Probabilidad (P): 1 = muy baja, 5 = muy alta.
- Impacto (I): 1 = muy bajo, 5 = muy alto.
- Exposición: **P × I**.
- Nivel: 1–5 Bajo, 6–10 Medio, 11–25 Alto.

| ID | Riesgo | Tipo | P | I | Exposición | Nivel | Estrategia | Contingencia | Responsable |
|---|---|---|---:|---:|---:|---|---|---|---|
| RI-001 | Desalineación entre el estado real del código y el estado registrado en Jira. | Proceso/Requisitos | 3 | 4 | 12 | Alto | Mitigar | Revisar HU, subtareas, pruebas y evidencia antes de cambiar estados. | Equipo de desarrollo |
| RI-002 | Conectividad inestable entre PCs que retrase commits, pushes y sincronización. | Infraestructura | 4 | 3 | 12 | Alto | Mitigar | Crear checkpoints locales y sincronizar al recuperar conexión. | Equipo de desarrollo |
| RI-003 | Falta de evidencia de pruebas que impida cerrar HUs aunque exista implementación. | Técnico/Calidad | 2 | 4 | 8 | Medio | Mitigar | Ejecutar pruebas y registrar evidencia antes de declarar Done. | Equipo de desarrollo |
| RI-004 | Crecimiento de funcionalidad sin respetar la modularidad exigida. | Técnico/Arquitectura | 3 | 3 | 9 | Medio | Mitigar | Aplicar separación por capas y componentes desde el inicio de cada módulo. | Equipo de desarrollo |
| RI-005 | Diferencias de entorno entre PCs, especialmente PostgreSQL, `.env` o dependencias. | Infraestructura | 3 | 4 | 12 | Alto | Mitigar | Verificación inicial del entorno y ejecución integral en MAIN cuando sea necesario. | Equipo de desarrollo |

## Seguimiento de riesgos

Los riesgos con exposición alta deben revisarse antes de cada incremento. Durante Sprint 1 se materializaron situaciones relacionadas con conectividad y diferencias de entorno, por lo que RI-002 y RI-005 pasan a ser riesgos prioritarios para Sprint 2.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Actualización inicial del registro para implementación. |
| 1.1.0 | 2026-09-23 | Se incorpora evaluación cuantitativa P×I, riesgo de entorno multi-PC y seguimiento actualizado. |

[← Volver al README](../../README.md)
