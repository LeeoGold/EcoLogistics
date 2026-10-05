# 03 Revisión del Sprint V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Sprint | Sprint 2 — Gestión operativa y flota |
| Periodo | 23/09/2026 – 05/10/2026 |
| Corte documental | 04/10/2026 |
| Estado de la revisión | En consolidación de evidencias de cierre |

## 2. Historias de Usuario completadas técnicamente

| Historia | SP | Resultado |
|---|---:|---|
| US-003 Registrar pedido | 5 | Registro de pedidos asociado a clientes, con validaciones de datos y ventana temporal |
| US-004 Consultar pedidos | 3 | Consulta de pedidos y filtros por estado, prioridad y fecha |
| US-005 Registrar conductor | 3 | Registro con validaciones de documento, licencia, experiencia y disponibilidad |
| US-006 Registrar cliente | 3 | Registro de clientes con ubicación, horario preferido y restricciones de acceso |
| US-011 Mejorar información y precisión de la gestión de flota | 3 | Consumo en km/galón estadounidense y ayudas contextuales de consumo y emisiones |

**Total:** 17 SP implementados técnicamente.

## 3. Evidencia del incremento

### US-003 — Pedidos

Se demuestra la asociación del pedido con el cliente y la validación de información obligatoria. La implementación mantiene integridad referencial en PostgreSQL.

### US-004 — Consulta

Se demuestra la consulta de pedidos y la aplicación de filtros por estado, prioridad y fecha.

### US-005 — Conductores

Se demuestra el registro de conductor con validaciones de los datos obligatorios y de disponibilidad.

### US-006 — Clientes

Se demuestra el formulario de registro y consulta de clientes. Durante la integración se verificó que los errores de FastAPI se mostraran como mensajes legibles y que los horarios opcionales se manejaran correctamente.

### US-011 — Flota

Se demuestra que el consumo se expresa en km/galón estadounidense y que la interfaz incluye ayuda contextual sobre consumo y factor de emisiones.

## 4. Resultados de calidad

- 30/30 pruebas automatizadas del backend aprobadas.
- 98 % de cobertura sobre `app`.
- `compileall` sin errores.
- `pip check` sin dependencias rotas.
- `npm run build` exitoso.
- Validación manual realizada para el flujo de registro de clientes después de las mejoras de interfaz.

## 5. Demostración ante stakeholders

La demostración de cierre deberá cubrir, en este orden:

1. Registrar un pedido válido asociado a un cliente.
2. Consultar pedidos y utilizar filtros.
3. Registrar un conductor.
4. Registrar un cliente.
5. Revisar la información de flota y explicar el consumo en km/galón y el factor de emisiones.

### Evidencia requerida para el cierre

La evidencia final deberá incorporarse en `docs/03 Implementación/evidencias/` y enlazarse desde esta sección. Debe permitir identificar claramente la funcionalidad demostrada y el resultado observado.

**Estado actual:** la documentación técnica y las verificaciones de calidad están disponibles, pero la evidencia formal de demostración ante stakeholders todavía debe consolidarse.

## 6. Aceptación y Definition of Done

La aceptación técnica debe sustentarse con implementación, pruebas, cobertura mínima de 80 % y validación de criterios Gherkin.

Las pruebas automatizadas disponibles demuestran 30/30 aprobaciones y 98 % de cobertura. Antes del cierre administrativo debe quedar documentada la validación Gherkin correspondiente y el resultado final de la revisión.

## 7. Pendientes

| Pendiente | Responsable | Estado |
|---|---|---|
| Consolidar evidencia de demo | Equipo | Abierto |
| Validar y cerrar US-011 en Jira con evidencia | Equipo | En revisión |
| Actualizar estados finales en Jira | Equipo | Pendiente |
| Completar cierre del Sprint 2 en Jira | Equipo | Pendiente de cumplimiento de condiciones |

## 8. Conclusión

El Sprint 2 presenta un incremento técnico funcional y verificable. La revisión mantiene separados los resultados comprobados de las evidencias administrativas que todavía deben registrarse, evitando declarar un cierre que no tenga respaldo documental.

## 9. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 04/10/2026 | Consolidación de historias implementadas, resultados técnicos, demo y pendientes de cierre. |
