# 05 Registro de riesgos V_1_0_0

[← Volver al README Principal](../../README.md)

**Documento complementario de implementación**  
**Versión documental:** 1.0.0  
**Fecha de corte:** 2026-09-23

> Este documento complementa los cuatro entregables oficiales del Sprint 1. Se conserva como soporte de gestión y trazabilidad de riesgos.

## Matriz de riesgos de implementación

Escala utilizada:

- Probabilidad (P): 1 = muy baja, 5 = muy alta.
- Impacto (I): 1 = muy bajo, 5 = muy alto.
- Exposición: **P × I**.
- Nivel: 1–6 Bajo, 7–14 Medio, 15–25 Alto.

| ID | Riesgo | Tipo | P | I | Exposición | Nivel | Estrategia | Contingencia | Responsable |
|---|---|---|---:|---:|---:|---:|---|---|---|
| RI-001 | Desalineación entre el estado real del código y el estado registrado en Jira. | Proceso/Requisitos | 3 | 4 | 12 | Medio | Mitigar | Revisar HU, subtareas, pruebas y evidencia antes de cambiar estados. | Equipo de desarrollo |
| RI-002 | Conectividad inestable entre PCs que retrase commits, pushes y sincronización. | Infraestructura | 4 | 3 | 12 | Medio | Mitigar | Crear checkpoints locales y sincronizar al recuperar conexión. | Equipo de desarrollo |
| RI-003 | Falta de evidencia de pruebas que impida cerrar HUs aunque exista implementación. | Técnico/Calidad | 2 | 4 | 8 | Medio | Mitigar | Ejecutar pruebas y registrar evidencia antes de declarar Done. | Equipo de desarrollo |
| RI-004 | Crecimiento de funcionalidad sin respetar la modularidad exigida. | Técnico/Arquitectura | 3 | 3 | 9 | Medio | Mitigar | Aplicar separación por capas y componentes desde el inicio de cada módulo. | Equipo de desarrollo |
| RI-005 | Diferencias de entorno entre PCs, especialmente PostgreSQL, `.env` o dependencias. | Infraestructura | 3 | 4 | 12 | Medio | Mitigar | Verificación inicial del entorno y ejecución integral en MAIN cuando sea necesario. | Equipo de desarrollo |

## Seguimiento de riesgos

Todos los riesgos registrados para Sprint 1 mantienen un nivel de exposición **Medio** según la escala P×I utilizada. RI-002 y RI-005 pasan a ser riesgos prioritarios de seguimiento para Sprint 2 debido a que se materializaron situaciones relacionadas con conectividad y diferencias de entorno.

## Relación con el Sprint 1

- RI-002 se relaciona con el impedimento IMP-001 de conectividad inestable.
- RI-005 se relaciona con el impedimento IMP-002 por disponibilidad de PostgreSQL en la PC secundaria.
- RI-001 se relaciona con la necesidad de mantener Jira alineado con el estado real del trabajo.
- RI-003 se relaciona con la evidencia de pruebas y la Definition of Done.
- RI-004 se relaciona con la arquitectura modular documentada en el incremento.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-23 | Consolidación del registro como documento complementario de gestión de riesgos del Sprint 1. |

[← Volver al README Principal](../../README.md)
