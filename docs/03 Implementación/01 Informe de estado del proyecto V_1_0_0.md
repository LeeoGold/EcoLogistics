# 01 Informe de estado del proyecto V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Información general

| Campo | Información |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Iteración | Sprint 2 — Gestión operativa y flota |
| Periodo planificado | 23/09/2026 – 05/10/2026 |
| Corte del informe | 02/10/2026 |
| Estado | Implementación en curso; validación funcional integral pendiente de cierre |
| Stack | React + FastAPI + PostgreSQL |

## 2. Resumen ejecutivo

Durante Sprint 2 se implementaron las funcionalidades comprometidas para la gestión operativa y la mejora de la información de flota. El alcance técnico incluye el registro de pedidos, la consulta y filtrado de pedidos, el registro de conductores, el registro de clientes y la mejora de las unidades de consumo y la interpretación del factor de emisiones de los vehículos.

La implementación mantiene la separación por capas del backend y la estructura modular del frontend. Las validaciones de compilación realizadas durante el desarrollo no han presentado errores.

La Definition of Done del proyecto exige implementación terminada, pruebas unitarias ejecutadas con cobertura mínima de 80 % y validación de los criterios Gherkin. La batería funcional integral del Sprint 2 queda pendiente de ejecutar al cierre, por lo que este informe no declara todavía esas condiciones como cumplidas.

## 3. Avance funcional del Sprint 2

| Historia | SP | Componente | Estado técnico al corte | Evidencia de compilación |
|---|---:|---|---|---|
| US-003 Registrar pedido | 5 | BACKEND / API | Implementada | `python -m compileall -q app` sin errores |
| US-004 Consultar pedidos | 3 | FRONTEND | Implementada | `npm run build` exitoso; 34 módulos transformados |
| US-005 Registrar conductor | 3 | BACKEND / API | Implementada | `python -m compileall -q app` sin errores |
| US-006 Registrar cliente | 3 | BACKEND / API | Implementada | `python -m compileall -q app` y `npm run build` exitosos durante integración |
| US-011 Mejorar información y precisión de la gestión de flota | 3 | FRONTEND / BACKEND / DATABASE | Implementada | Compilación backend y build frontend verificados durante la integración |

**Alcance planificado:** 17 SP.

## 4. Cambios técnicos relevantes

### Gestión de pedidos

Se incorporó la capacidad de registrar pedidos asociados a clientes, con peso, volumen, ventana temporal, prioridad, tipo de producto, estado y referencia de entrega.

Se incorporó la consulta de pedidos y los filtros de estado, prioridad y fecha de ventana de entrega.

### Gestión de conductores

Se incorporó el registro de conductores con documento de identidad, licencia, categoría, experiencia, disponibilidad, contacto y estado. Se contemplan validaciones para datos obligatorios, experiencia y horario de disponibilidad, además de controles de unicidad.

### Gestión de clientes

Se incorporó el registro y consulta de clientes con nombre, contacto, dirección de referencia, coordenadas geográficas, horario preferido y restricciones de acceso. Se valida la consistencia de la ventana horaria.

### Gestión de flota

La unidad de rendimiento del vehículo se actualizó de km/L a km/galón estadounidense (`consumo_km_gal`). Se añadieron ayudas contextuales para explicar el consumo y el factor de emisiones `factor_co2_kg_km`.

## 5. Calidad y validación al corte

| Verificación | Resultado |
|---|---|
| Compilación backend (`compileall`) | Sin errores en los cambios de Sprint 2 verificados |
| Build frontend | Exitoso |
| Pruebas funcionales integrales Sprint 2 | Pendientes de ejecución al cierre |
| Cobertura final Sprint 2 | Pendiente de medición final |
| Validación Gherkin final | Pendiente de ejecución/documentación final |

## 6. Riesgos e impedimentos observados

| Riesgo / impedimento | Impacto | Acción aplicada |
|---|---|---|
| Diferencias de entorno entre PCs | Puede afectar la validación local de PostgreSQL y dependencias | Mantener el repositorio sincronizado y realizar la validación integral en el entorno con PostgreSQL disponible |
| Cambios acumulados en varias historias | Puede dificultar identificar el origen de una regresión | Desarrollo incremental por historia y verificaciones de compilación/build antes de continuar |
| Pruebas finales aún no ejecutadas | No permite declarar la Definition of Done completa | Ejecutar la batería integral al cierre del Sprint y registrar resultados |

## 7. Próximos pasos

1. Ejecutar pruebas funcionales y unitarias del Sprint 2.
2. Medir y registrar cobertura final.
3. Validar criterios Gherkin y registrar evidencias.
4. Sincronizar estados reales de Jira con el trabajo técnico.
5. Completar Sprint Review y Retrospectiva.
6. Publicar cambios en GitHub según el flujo de versionado definido.

## 8. Conclusión

El Sprint 2 presenta avance técnico significativo y las cinco historias incluidas en el alcance han sido implementadas a nivel de código. La declaración de cierre queda condicionada a la ejecución y documentación de las pruebas finales, a la actualización de Jira y a la consolidación de las evidencias de la iteración.
