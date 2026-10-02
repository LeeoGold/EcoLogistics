# 03 Revisión del Sprint V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Sprint | Sprint 2 — Gestión operativa y flota |
| Periodo | 23/09/2026 – 05/10/2026 |
| Corte documental | 02/10/2026 |
| Estado de la revisión | Preparada para consolidación al cierre |

## 2. Historias revisadas

| Historia | SP | Resultado técnico |
|---|---:|---|
| US-003 Registrar pedido | 5 | Implementada en backend/API |
| US-004 Consultar pedidos | 3 | Implementada en frontend, con consulta y filtros |
| US-005 Registrar conductor | 3 | Implementada en backend/API |
| US-006 Registrar cliente | 3 | Implementada en backend/API y frontend de apoyo |
| US-011 Mejorar información y precisión de la gestión de flota | 3 | Implementada en backend, base de datos y frontend |

## 3. Demostración funcional prevista

La demostración debe presentar, en este orden:

1. Registro de un pedido con datos válidos y asociación a un cliente.
2. Consulta de pedidos y uso de filtros por estado, prioridad y fecha.
3. Registro de un conductor con validación de disponibilidad.
4. Registro de un cliente con ubicación y horario preferido.
5. Registro/consulta de vehículos mostrando consumo en km/galón estadounidense y las ayudas contextuales de consumo y factor de emisiones.

## 4. Evidencias técnicas disponibles al corte

- Backend: compilación con `python -m compileall -q app` sin errores durante la implementación de US-003, US-005 y US-006.
- Frontend: `npm run build` exitoso después de integrar US-004 y US-006.
- Estructura modular por capas conservada en backend y por componentes/páginas/servicios/estado en frontend.
- Cambios de flota alineados con la unidad km/galón estadounidense y ayudas contextuales.

## 5. Aceptación y Definition of Done

Al corte del 02/10/2026, la implementación técnica de las cinco historias está preparada. La aceptación final no debe declararse completa hasta registrar:

- ejecución de pruebas funcionales y unitarias;
- cobertura final de al menos 80 %;
- validación de criterios Gherkin;
- sincronización de los estados reales en Jira;
- evidencias finales del Sprint Review.

## 6. Pendientes

1. Ejecutar la batería final de pruebas.
2. Medir cobertura y documentar resultados.
3. Registrar evidencias de las demostraciones.
4. Actualizar los estados finales en Jira.
5. Consolidar observaciones de stakeholders, si corresponden.

## 7. Conclusión

El Sprint 2 cuenta con las funcionalidades técnicas principales implementadas. La revisión final se cerrará cuando las pruebas, evidencias y estados de seguimiento estén consolidados y sean coherentes con el trabajo real.
