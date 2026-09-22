# 03 Registro de riesgos V_1_0_0

[← Volver al README](../../README.md)

## Matriz de riesgos de implementación

Escala cualitativa utilizada en este checkpoint:

- Probabilidad: Baja / Media / Alta
- Impacto: Bajo / Medio / Alto
- Nivel: resultado cualitativo combinado para orientar la respuesta.

| ID | Riesgo | Tipo | Probabilidad | Impacto | Nivel | Estrategia | Contingencia | Responsable |
|---|---|---|---|---|---|---|---|---|
| RI-001 | La implementación funcional y el estado registrado en Jira pueden quedar desalineados. | Requisitos / Proceso | Media | Alto | Alto | Mitigar | Revisar HU, subtareas y evidencia antes de cada cambio de estado. | Equipo de desarrollo |
| RI-002 | La conectividad inestable puede retrasar commits/push y la sincronización entre PCs. | Infraestructura | Alta | Medio | Alto | Mitigar | Guardar checkpoints locales y sincronizar en cuanto exista conexión. | Equipo de desarrollo |
| RI-003 | La falta de pruebas evidenciadas puede impedir cerrar HUs aunque exista implementación. | Técnico | Media | Alto | Alto | Mitigar | Ejecutar y documentar pruebas del módulo antes de mover una HU a Listo. | Equipo de desarrollo |
| RI-004 | El módulo puede crecer sin respetar la arquitectura modular exigida por la consigna. | Técnico | Media | Medio | Medio | Mitigar | Aplicar refactorización por capas y componentes antes de consolidar el incremento. | Equipo de desarrollo |

## Riesgos que requieren seguimiento

Los riesgos con mayor relación con el cierre de Sprint 1 son la desalineación entre Jira y el código, la conectividad, y la ausencia de evidencia de pruebas. Estos riesgos deben revisarse antes del cierre definitivo del Sprint.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_0_0 | 2026-09-22 | Actualización del registro para el contexto de implementación de Sprint 1. |

[← Volver al README](../../README.md)
