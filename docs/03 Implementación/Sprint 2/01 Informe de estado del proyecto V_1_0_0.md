# 01 Informe de estado del proyecto V_1_0_0

[← Volver al índice del Sprint 2](./README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## 1. Información general

| Campo | Información |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Iteración | Sprint 2 — Gestión operativa y flota |
| Periodo planificado | 23/09/2026 – 05/10/2026 |
| Corte del informe | 04/10/2026 |
| Estado | Incremento técnico implementado; cierre documental en consolidación |
| Stack | React + FastAPI + PostgreSQL |

## 2. Resumen ejecutivo

Durante el Sprint 2 se implementó el alcance técnico definido para la gestión operativa y la mejora de la información de flota. El incremento comprende el registro de pedidos, la consulta y filtrado de pedidos, el registro de conductores, el registro de clientes y la mejora de la precisión de la información de consumo y emisiones de los vehículos.

La solución conserva una arquitectura modular: el backend mantiene separación por rutas, controladores, servicios, repositorios y modelos; el frontend mantiene separación por páginas, componentes, servicios y estado.

Al último corte técnico, las cinco historias del alcance fueron implementadas a nivel de código. La validación automatizada del backend obtuvo 30/30 pruebas aprobadas y 98 % de cobertura sobre `app`. El frontend fue construido con Vite sin errores. También se validó manualmente el flujo de registro de clientes después de mejorar el manejo de errores de validación.

El cierre administrativo requiere consolidar la evidencia final de demostración ante stakeholders y sincronizar el estado definitivo de Jira, especialmente la historia US-011 que al último corte permanecía en revisión/QA.

## 3. Avance funcional del Sprint 2

| Historia | SP | Componente | Estado técnico | Resultado |
|---|---:|---|---|---|
| US-003 Registrar pedido | 5 | BACKEND / API | Implementada | Registro, validaciones y persistencia del pedido |
| US-004 Consultar pedidos | 3 | FRONTEND | Implementada | Consulta y filtros por estado, prioridad y fecha |
| US-005 Registrar conductor | 3 | BACKEND / API | Implementada | Registro con validaciones de datos y disponibilidad |
| US-006 Registrar cliente | 3 | BACKEND / API + FRONTEND | Implementada | Registro, ubicación, horario y restricciones |
| US-011 Mejorar información y precisión de la gestión de flota | 3 | FRONTEND / BACKEND / DATABASE | Implementada técnicamente | Consumo en km/galón estadounidense y ayudas contextuales |

**Alcance comprometido:** 17 SP.

**Implementación técnica:** 5/5 historias del alcance.

**Estado administrativo de Jira al último corte registrado:** 4 historias en Listo y US-011 en En revisión/QA.

## 4. Cambios técnicos relevantes

### US-003 — Registrar pedido

Se incorporó el registro de pedidos asociados a clientes, incluyendo peso, volumen, ventana temporal, prioridad, tipo de producto, estado y referencia de entrega.

La implementación valida la existencia del cliente y mantiene la integridad referencial mediante `cliente_id`.

### US-004 — Consultar pedidos

Se incorporó una interfaz para consultar pedidos y aplicar filtros por estado, prioridad y fecha de la ventana de entrega.

### US-005 — Registrar conductor

Se incorporó el registro de conductores con documento de identidad, licencia, categoría, experiencia, disponibilidad, contacto y estado, incluyendo validaciones de datos y unicidad.

### US-006 — Registrar cliente

Se incorporó el registro y consulta de clientes con información de contacto, dirección de referencia, coordenadas, horario preferido y restricciones de acceso.

Durante la integración se corrigió el manejo de errores de validación de FastAPI para evitar la presentación `[object Object]` y se normalizaron los campos horarios opcionales como `null` cuando no son proporcionados.

### US-011 — Mejora de información y precisión de flota

La unidad de consumo se actualizó de km/L a km/galón estadounidense mediante el campo `consumo_km_gal`. El frontend incorpora ayudas contextuales para explicar el consumo y el factor de emisiones `factor_co2_kg_km`.

## 5. Calidad y validación

| Verificación | Resultado |
|---|---|
| Pruebas backend | 30/30 aprobadas |
| Cobertura sobre `app` | 98 % |
| `python -m compileall -q app` | Sin errores |
| `python -m pip check` | `No broken requirements found` |
| `npm run build` | Exitoso |
| Validación manual de registro de cliente | Flujo validado después de la mejora de errores |
| Validación Gherkin final del Sprint | Debe quedar respaldada con evidencia antes del cierre administrativo |

La batería automatizada supera el mínimo de cobertura del proyecto (80 %).

## 6. Impedimentos y riesgos de cierre

Los principales impedimentos identificados y sus acciones se documentan en:

[02 Registro de Impedimentos V_1_0_0](./02%20Registro%20de%20Impedimentos%20V_1_0_0.md)

Como punto de cierre, todavía debe consolidarse la evidencia de demostración ante stakeholders y comprobar que los estados finales de Jira reflejen exactamente el estado técnico.

## 7. Próximos pasos de cierre

1. Ejecutar y documentar la demostración final del incremento ante stakeholders.
2. Registrar las evidencias de la demostración en el repositorio.
3. Finalizar la validación pendiente de US-011 y actualizar su estado en Jira cuando exista evidencia.
4. Ejecutar los pasos de cierre del Sprint 2 en Jira si todas las historias cumplen la Definition of Done.
5. Consolidar Sprint Review y Retrospectiva.
6. Realizar un último `git status`, `git diff --check` y push de la documentación final.

## 8. Conclusión

El Sprint 2 cuenta con el incremento técnico principal implementado y con resultados sólidos de calidad automatizada. La documentación refleja el estado real sin declarar como completadas evidencias que todavía deben consolidarse. El cierre definitivo se producirá cuando la demostración, la evidencia y la trazabilidad de Jira estén alineadas con el incremento entregado.

## 9. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 04/10/2026 | Consolidación del estado real del Sprint 2, resultados técnicos y pasos de cierre. |
