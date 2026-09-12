# 03 Registro de riesgos V_1_0_0

[← Volver al README Principal](../../README.md)

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
| 8–12 | Medio |
| 15–25 | Alto |

> La consigna deja sin clasificar los valores 7, 13 y 14; el registro evita esos puntajes.

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
