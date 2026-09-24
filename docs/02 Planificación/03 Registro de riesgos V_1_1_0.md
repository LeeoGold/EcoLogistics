# 03 Registro de riesgos V_1_1_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.1.0
**Fecha de actualización:** 2026-09-23

## 1. Propósito

Este documento registra y prioriza riesgos relevantes de EcoLogística Huancayo mediante una matriz cuantitativa. El nivel se calcula como **Probabilidad × Impacto** y cada riesgo incluye medidas de mitigación y un plan de contingencia.

## 2. Escala

| Valor | Probabilidad | Impacto |
|---:|---|---|
| 1 | Muy baja | Muy bajo |
| 2 | Baja | Bajo |
| 3 | Media | Medio |
| 4 | Alta | Alto |
| 5 | Muy alta | Muy alto |

**Nivel = P × I**

| Puntaje | Nivel |
|---:|---|
| 1–6 | Bajo |
| 7–14 | Medio |
| 15–25 | Alto |

## 3. Matriz cuantitativa

| ID | Riesgo | P | I | P×I | Nivel |
|---|---|---:|---:|---:|---|
| R-001 | Retraso en integración del motor de optimización | 4 | 5 | 20 | Alto |
| R-002 | Datos incorrectos o incompletos para generar rutas | 4 | 4 | 16 | Alto |
| R-003 | Fallos de seguridad o acceso no autorizado | 3 | 5 | 15 | Alto |
| R-004 | Indisponibilidad del servicio cartográfico | 3 | 4 | 12 | Medio |
| R-005 | Bajo rendimiento en generación o reoptimización | 3 | 4 | 12 | Medio |
| R-006 | Pérdida de integridad o consistencia de datos | 3 | 5 | 15 | Alto |
| R-007 | Incremento o cambio no controlado del alcance | 4 | 3 | 12 | Medio |
| R-008 | Problemas de compatibilidad entre navegadores | 2 | 3 | 6 | Bajo |
| R-009 | Baja adopción o dificultades de usabilidad | 3 | 4 | 12 | Medio |
| R-010 | Incremento de costos de infraestructura o servicios | 2 | 4 | 8 | Medio |

## 4. Registro detallado

| ID | Causa | Consecuencia | Mitigación | Contingencia |
|---|---|---|---|---|
| R-001 | Complejidad de integración API-servicio-motor | Retraso del MVP | Definir interfaz estable, integración temprana y pruebas con datos representativos | Mantener última planificación válida y permitir continuidad con ella mientras se recupera el motor |
| R-002 | Datos faltantes o inválidos | Rutas inválidas o planificación bloqueada | Validaciones, campos obligatorios y reglas de negocio antes de optimizar | Rechazar datos inválidos, informar causa y evitar su entrada al optimizador |
| R-003 | Permisos, autenticación o autorización deficientes | Exposición o modificación indebida de información | Mínimo privilegio, autenticación, autorización y controles OWASP | Bloquear acceso afectado, revisar permisos y ejecutar correcciones |
| R-004 | Caída de servicio cartográfico | Imposibilidad de representar el mapa | Desacoplar visualización y almacenamiento de la planificación | Informar indisponibilidad y conservar la ruta almacenada |
| R-005 | Consultas o procesamiento excesivos | Tiempos de respuesta elevados | Pruebas de rendimiento, optimización de consultas y separación del motor | Reducir carga y reutilizar la última planificación válida mientras se recupera el rendimiento |
| R-006 | Error en persistencia o transacción | Información inconsistente | Restricciones, validaciones, transacciones y pruebas | Revertir operación fallida, preservar último estado válido y registrar incidente |
| R-007 | Incorporación de trabajo no previsto | Retrasos y sobrecarga | Control del backlog, priorización y protección del alcance del MVP | Pasar nuevos requerimientos a una versión posterior |
| R-008 | Diferencias entre navegadores | Errores funcionales o visuales | Matriz de compatibilidad y pruebas | Priorizar navegador soportado y corregir incompatibilidad |
| R-009 | Interfaz poco clara | Baja adopción y errores | Diseño por rol y pruebas de usabilidad | Priorizar ajustes de interfaz y guía operativa |
| R-010 | Mayor consumo de infraestructura o servicios | Sobrecosto operativo | Tecnologías de costo controlado, optimización y monitoreo | Reducir recursos no esenciales o migrar a alternativas de menor costo |

## 5. Riesgos críticos prioritarios

Los riesgos R-001, R-002, R-003 y R-006 son prioritarios porque afectan directamente el funcionamiento, seguridad o integridad del sistema.

La selección es coherente con las restricciones existentes del repositorio relacionadas con seguridad, datos personales, integridad, costo del ciclo de vida, sostenibilidad y control del alcance.


## 6. Actualización del contexto de implementación — Sprint 1

Durante la implementación del Sprint 1 se identificaron y registraron riesgos operativos y técnicos adicionales que complementan la matriz de planificación original.

| ID | Riesgo | Tipo | P | I | P×I | Nivel | Estrategia | Contingencia | Responsable |
|---|---|---|---:|---:|---:|---|---|---|---|
| RI-001 | Desalineación entre el estado real del código y el estado registrado en Jira. | Proceso/Requisitos | 3 | 4 | 12 | Alto | Mitigar | Revisar HUs, subtareas, pruebas y evidencias antes de cambiar estados. | Equipo de desarrollo |
| RI-002 | Conectividad inestable entre PCs que retrase commits, pushes y sincronización. | Infraestructura | 4 | 3 | 12 | Alto | Mitigar | Crear checkpoints locales y sincronizar al recuperar conexión. | Equipo de desarrollo |
| RI-003 | Falta de evidencia de pruebas que impida cerrar HUs aunque exista implementación. | Técnico/Calidad | 2 | 4 | 8 | Medio | Mitigar | Ejecutar pruebas y registrar evidencia antes de declarar Done. | Equipo de desarrollo |
| RI-004 | Crecimiento de funcionalidad sin respetar la modularidad exigida. | Técnico/Arquitectura | 3 | 3 | 9 | Medio | Mitigar | Aplicar separación por capas y componentes desde el inicio de cada módulo. | Equipo de desarrollo |
| RI-005 | Diferencias de entorno entre PCs, especialmente PostgreSQL, `.env` o dependencias. | Infraestructura | 3 | 4 | 12 | Alto | Mitigar | Verificar el entorno al inicio y centralizar la validación integral en MAIN cuando sea necesario. | Equipo de desarrollo |

### Seguimiento del Sprint 1

Durante Sprint 1 se materializaron situaciones relacionadas con conectividad y disponibilidad de PostgreSQL en un equipo secundario. Estas experiencias justifican mantener RI-002 y RI-005 como riesgos de seguimiento prioritario para el siguiente incremento.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-01 | Matriz inicial de riesgos del proyecto. |
| 1.1.0 | 2026-09-23 | Incorporación de riesgos específicos de implementación, evaluación P×I y seguimiento del Sprint 1. |

[← Volver al README Principal](../../README.md)
