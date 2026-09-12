# 04 Presupuesto del proyecto V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Alcance y criterio presupuestal

Este presupuesto es **académico y referencial** para planificar el MVP de EcoLogística Huancayo. Los documentos existentes del repositorio no contienen tarifas monetarias definitivas; por ello, las cifras de horas, tarifas y costos de infraestructura se declaran como supuestos de planificación y deberán validarse con la realidad del proyecto antes de contratar servicios.

Moneda: **soles peruanos (S/)**.

## 2. CAPEX — esfuerzo de desarrollo capitalizable de referencia

| Recurso | Horas | Tarifa referencial | Subtotal |
|---|---:|---:|---:|
| Desarrollo backend/API | 160 h | S/ 30/h | S/ 4,800 |
| Desarrollo frontend | 120 h | S/ 30/h | S/ 3,600 |
| QA y automatización | 80 h | S/ 25/h | S/ 2,000 |
| Análisis/gestión del proyecto | 60 h | S/ 30/h | S/ 1,800 |
| UX y validación de interfaz | 40 h | S/ 25/h | S/ 1,000 |
| **CAPEX estimado** | **460 h** |  | **S/ 13,200** |

> Estos importes son supuestos académicos para estimar el costo del trabajo del proyecto; no representan una cotización laboral real.

## 3. Licencias y herramientas

| Recurso | Base | Costo presupuestado |
|---|---|---:|
| GitHub | Plan de trabajo suficiente para repositorio académico | S/ 0 |
| Jira | Plan gratuito / académico supuesto | S/ 0 |
| React / Python / FastAPI / PostgreSQL | Software de código abierto | S/ 0 |
| Leaflet / OpenStreetMap | Biblioteca/servicio de mapas según uso previsto | S/ 0* |
| **Total licencias** |  | **S/ 0** |

\* El costo real de servicios cartográficos o proveedores concretos debe verificarse según uso, políticas y límites del proveedor seleccionado.

## 4. OPEX / infraestructura

| Concepto | Periodo presupuestado | Subtotal |
|---|---|---:|
| Servidor o instancia de aplicación | 3 meses | S/ 450 |
| Base de datos / almacenamiento | 3 meses | S/ 300 |
| Dominio | 1 año | S/ 70 |
| Copias de seguridad | 3 meses | S/ 120 |
| Monitoreo/servicios auxiliares | 3 meses | S/ 90 |
| **Total OPEX** |  | **S/ 1,030** |

## 5. Subtotal y contingencia

| Concepto | Monto |
|---|---:|
| CAPEX | S/ 13,200 |
| Licencias | S/ 0 |
| OPEX | S/ 1,030 |
| **Subtotal** | **S/ 14,230** |
| Contingencia (12 %) | **S/ 1,707.60** |
| **Presupuesto total referencial** | **S/ 15,937.60** |

## 6. Justificación de la contingencia

Se aplica una contingencia del **12 %** sobre el subtotal porque el proyecto tiene riesgos técnicos asociados al motor de optimización, rendimiento, seguridad, compatibilidad, infraestructura y evolución del alcance.

El porcentaje no pretende reemplazar una estimación financiera formal; funciona como reserva de planificación para el MVP.

## 7. Consolidado

| Categoría | Monto | Participación aproximada |
|---|---:|---:|
| CAPEX | S/ 13,200.00 | 82.8 % |
| Licencias | S/ 0.00 | 0.0 % |
| OPEX | S/ 1,030.00 | 6.5 % |
| Contingencia | S/ 1,707.60 | 10.7 % |
| **Total** | **S/ 15,937.60** | **100 %** |

## 8. Justificación técnica y económica

La estructura prioriza el costo del trabajo de desarrollo porque el MVP requiere integrar gestión de flota, pedidos, conductores, clientes, rutas, optimización, seguridad, indicadores y persistencia.

El uso previsto de React, Python, FastAPI y PostgreSQL favorece el uso de tecnologías abiertas y ayuda a controlar costos de licenciamiento. El repositorio existente también identifica como restricciones el control del costo del ciclo de vida, la optimización de recursos y el control del alcance.

La inversión de infraestructura se mantiene moderada y se plantea como OPEX acotado al periodo de construcción inicial. Los costos reales deberán actualizarse cuando se seleccione el proveedor definitivo de nube, dominio, mapas y servicios externos.

## 9. Supuestos presupuestales

1. El equipo académico utiliza las herramientas gratuitas disponibles.
2. El MVP se construye durante un periodo inicial de tres meses.
3. No se considera compra de hardware dedicado.
4. No se incluyen impuestos, costos legales ni contratación empresarial.
5. Las tarifas horarias son supuestos académicos para estimación.
6. Los costos reales de proveedores deberán validarse antes de contratar servicios.
