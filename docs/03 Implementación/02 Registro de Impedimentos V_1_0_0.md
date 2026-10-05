# 02 Registro de Impedimentos V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Sprint | Sprint 2 — Gestión operativa y flota |
| Periodo | 23/09/2026 – 05/10/2026 |
| Corte | 04/10/2026 |

## 2. Registro de impedimentos

| Impedimento # | Fecha de Registro | Descripción del Impedimento así como el Impacto en el Proyecto | Prioridad | Reportado por | Fecha tope de Resolución | Estado | Fecha de Resolución | Resolución/Comentarios |
|---|---|---|---|---|---|---|---|---|
| IMP-001 | 24/09/2026 | Diferencias de entorno entre PCs, principalmente disponibilidad de PostgreSQL local y dependencias. **Impacto:** puede impedir ejecutar el sistema de forma uniforme y retrasar la validación en otros equipos. | Alta | Equipo de desarrollo | 26/09/2026 | Mitigado | 26/09/2026 | Se mantuvo el entorno documentado en `DEV_SETUP.md`, se verificaron dependencias y se centralizó la validación en un entorno con PostgreSQL operativo. |
| IMP-002 | 04/10/2026 | Los errores de validación de FastAPI llegaban al frontend como estructuras complejas y se mostraban como `[object Object]`. **Impacto:** el usuario no podía interpretar correctamente el motivo del rechazo de un formulario. | Alta | Equipo de desarrollo | 04/10/2026 | Resuelto | 04/10/2026 | Se creó el formateador compartido `frontend/src/services/apiResponse.js` y se aplicó a los servicios para mostrar mensajes legibles. |
| IMP-003 | 04/10/2026 | Los campos horarios opcionales del cliente podían enviarse como cadenas vacías. **Impacto:** FastAPI podía rechazar la solicitud aunque el usuario no hubiera ingresado un horario. | Media | Equipo de desarrollo | 04/10/2026 | Resuelto | 04/10/2026 | Se normalizaron los valores opcionales a `null` antes de enviar la solicitud y se mantuvo la validación de coherencia cuando se proporciona la ventana horaria. |
| IMP-004 | 04/10/2026 | Consolidación de evidencias finales de demostración y cierre de seguimiento en Jira. **Impacto:** sin estas evidencias no es posible declarar completado el cierre documental con el máximo nivel de la rúbrica. | Alta | Equipo de desarrollo | 05/10/2026 | Abierto | — | Ejecutar la demostración final, guardar las capturas/evidencias y sincronizar el estado definitivo de Jira antes del cierre del Sprint. |

## 3. Seguimiento

IMP-001 fue mitigado y dejó de bloquear la continuidad del proyecto. IMP-002 e IMP-003 fueron resueltos durante la mejora de la interfaz y validación del flujo de clientes.

IMP-004 permanece abierto porque corresponde al cierre de gestión y evidencias del Sprint. No representa un defecto funcional del incremento, pero sí un pendiente documental y de trazabilidad.

## 4. Criterio de cierre

Un impedimento se considerará cerrado cuando exista evidencia verificable de la resolución o mitigación, la acción aplicada esté documentada y el problema no produzca un bloqueo sobre la entrega comprometida.

## 5. Trazabilidad

| Impedimento | Artefactos relacionados |
|---|---|
| IMP-001 | `DEV_SETUP.md`, configuración del entorno, flujo Git |
| IMP-002 | `apiResponse.js`, `clientService.js`, `orderService.js`, `vehicleService.js` |
| IMP-003 | `ClientContext.jsx`, `ClientForm.jsx`, schemas FastAPI |
| IMP-004 | Jira Sprint 2, Sprint Review, evidencias de demostración |

## 6. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 04/10/2026 | Registro consolidado de impedimentos técnicos, de calidad y de cierre del Sprint 2. |
