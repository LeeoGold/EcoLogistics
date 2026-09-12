# 01 Transformando a ágil V_1_0_0

[← Volver al README Principal](../../README.md)

## Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Artefacto | Transformando a ágil |
| Versión | V_1_0_0 |
| Enfoque | Híbrido con planificación y ejecución Agile |
| Fuente de requisitos | `docs/01 Inicio/06. Requisitos funcionales V_1_0_0.md`, `07. Requisitos no funcionales V_1_0_0.md` y `09. Reglas de negocio V_1_0_0.md` |

## 1. Propósito

Este artefacto transforma los requisitos ya definidos en el repositorio en una estructura Agile utilizable en Jira. La propuesta conserva la trazabilidad con RF, RNF y reglas de negocio y organiza el trabajo mediante Épicas, Historias de Usuario, Enablers y Subtasks.

## 2. Mapeo de requisitos a Épicas

| Épica | Nombre | Trazabilidad principal |
|---|---|---|
| EP-01 | Gestión de Flota | RF-001, RF-002 |
| EP-02 | Gestión de Conductores y Clientes | RF-005, RF-006 |
| EP-03 | Gestión de Pedidos | RF-003, RF-004 |
| EP-04 | Gestión y Optimización de Rutas | RF-007, RF-008, RF-010, EN-001, EN-002 |
| EP-05 | Monitoreo e Indicadores | RF-009 |
| EP-06 | Seguridad y Calidad Técnica | EN-003 a EN-012 |

## 3. Historias de Usuario

### US-001 — Registrar vehículo
**Épica:** EP-01  
**Story Points:** 3  
**Prioridad:** High  
**Componente:** BACKEND / API  
**Trazabilidad:** RF-001, RN-001

**Historia:** Como operador logístico, quiero registrar un vehículo con su información operativa, para mantener actualizada la flota disponible para la planificación.

**Criterios Gherkin:**
```gherkin
Scenario: Registro correcto
Given que el operador está autenticado y autorizado
And proporciona los datos obligatorios de un vehículo
When registra el vehículo
Then el sistema debe guardar el vehículo
And debe confirmar que el registro fue realizado correctamente

Scenario: Placa duplicada o dato inválido
Given que el operador intenta registrar un vehículo
When la placa ya existe o falta un dato obligatorio
Then el sistema debe rechazar el registro
And debe informar el motivo del rechazo
```

### US-002 — Consultar vehículos
**Épica:** EP-01  
**Story Points:** 3  
**Prioridad:** Medium  
**Componente:** FRONTEND  
**Trazabilidad:** RF-002

**Historia:** Como operador logístico, quiero consultar los vehículos registrados, para conocer la flota disponible antes de realizar la planificación.

```gherkin
Scenario: Consulta de flota
Given que el usuario tiene permisos para consultar vehículos
When solicita la lista de vehículos registrados
Then el sistema debe mostrar los vehículos disponibles
And debe mostrar su información principal

Scenario: Aplicación de filtros
Given que existen vehículos registrados
When el usuario aplica un filtro válido
Then el sistema debe mostrar únicamente los vehículos que cumplen el filtro
And debe conservar la información correspondiente a cada vehículo
```

### US-003 — Registrar pedido
**Épica:** EP-03  
**Story Points:** 5  
**Prioridad:** High  
**Componente:** BACKEND / API  
**Trazabilidad:** RF-003, RN-003, RN-004

**Historia:** Como operador logístico, quiero registrar un pedido con la información necesaria para su entrega, para incluirlo en la planificación de rutas.

```gherkin
Scenario: Pedido válido
Given que el operador proporciona cliente, ubicación, peso, volumen, ventana de tiempo, prioridad y tipo de producto válidos
When registra el pedido
Then el sistema debe guardar el pedido
And debe dejarlo disponible para la planificación de rutas

Scenario: Información inválida
Given que el operador intenta registrar un pedido
When falta información obligatoria o la ventana de tiempo no es válida
Then el sistema debe rechazar el registro
And debe indicar los datos que deben corregirse
```

### US-004 — Consultar pedidos
**Épica:** EP-03  
**Story Points:** 3  
**Prioridad:** Medium  
**Componente:** FRONTEND  
**Trazabilidad:** RF-004

**Historia:** Como operador logístico, quiero consultar los pedidos registrados, para revisar la información necesaria para su gestión y planificación.

```gherkin
Scenario: Consulta
Given que el usuario está autorizado
When solicita los pedidos registrados
Then el sistema debe mostrar los pedidos disponibles
And debe mostrar la información necesaria para su gestión

Scenario: Filtrado
Given que existen pedidos registrados
When el usuario filtra por estado, prioridad o fecha
Then el sistema debe mostrar únicamente los pedidos correspondientes
And debe actualizar el resultado según el criterio seleccionado
```

### US-005 — Registrar conductor
**Épica:** EP-02  
**Story Points:** 3  
**Prioridad:** High  
**Componente:** BACKEND / API  
**Trazabilidad:** RF-005, RN-006

**Historia:** Como administrador o usuario autorizado, quiero registrar un conductor, para mantener actualizada la información de los conductores disponibles.

```gherkin
Scenario: Registro válido
Given que un usuario autorizado proporciona los datos válidos del conductor
When registra al conductor
Then el sistema debe guardar la información
And debe confirmar el registro correctamente

Scenario: Datos incorrectos
Given que el usuario intenta registrar un conductor
When existen datos obligatorios incompletos o inválidos
Then el sistema debe impedir el registro
And debe identificar la información que debe corregirse
```

### US-006 — Registrar cliente
**Épica:** EP-02  
**Story Points:** 3  
**Prioridad:** High  
**Componente:** BACKEND / API  
**Trazabilidad:** RF-006, RN-013

**Historia:** Como operador logístico, quiero registrar un cliente, para disponer de la información necesaria para gestionar sus pedidos y entregas.

```gherkin
Scenario: Registro válido
Given que el operador está autorizado
And proporciona los datos obligatorios del cliente
When registra al cliente
Then el sistema debe guardar la información
And debe confirmar el registro

Scenario: Información incompleta
Given que el operador intenta registrar un cliente
When falta información obligatoria
Then el sistema debe impedir el registro
And debe indicar los datos faltantes
```

### US-007 — Generar ruta optimizada
**Épica:** EP-04  
**Story Points:** 13  
**Prioridad:** Highest  
**Componente:** OPTIMIZACIÓN DE RUTAS  
**Trazabilidad:** RF-007, RN-002, RN-005, RN-006, RN-008, RN-009

**Historia:** Como operador logístico, quiero generar una ruta optimizada a partir de los pedidos y recursos disponibles, para obtener una planificación válida que respete las restricciones operativas.

```gherkin
Scenario: Planificación válida
Given que existen pedidos válidos
And existen vehículos y conductores disponibles
When el operador solicita generar una ruta
Then el sistema debe generar una planificación válida
And debe respetar las restricciones definidas

Scenario: Capacidad insuficiente
Given que los pedidos asignados superan la capacidad disponible de un vehículo
When el operador intenta generar la ruta
Then el sistema debe impedir una planificación inválida
And debe informar la restricción de capacidad
```

### US-008 — Visualizar ruta en mapa
**Épica:** EP-04  
**Story Points:** 5  
**Prioridad:** High  
**Componente:** FRONTEND  
**Trazabilidad:** RF-008

**Historia:** Como operador logístico, quiero visualizar la ruta generada en un mapa, para comprender el recorrido y los puntos de entrega planificados.

```gherkin
Scenario: Visualización correcta
Given que existe una ruta válida almacenada
When el operador accede a la visualización de la ruta
Then el sistema debe mostrar la ruta en el mapa
And debe mostrar los puntos de entrega correspondientes

Scenario: Servicio cartográfico no disponible
Given que existe una planificación válida
When el servicio cartográfico no está disponible
Then el sistema debe informar la indisponibilidad del mapa
And no debe perder la planificación almacenada
```

### US-009 — Mostrar indicadores
**Épica:** EP-05  
**Story Points:** 5  
**Prioridad:** Medium  
**Componente:** FRONTEND  
**Trazabilidad:** RF-009, RN-016

**Historia:** Como responsable de operaciones, quiero consultar indicadores operativos, para evaluar el comportamiento de las rutas y la planificación logística.

```gherkin
Scenario: Datos suficientes
Given que existe información válida y suficiente de pedidos, vehículos y rutas
When el responsable de operaciones consulta los indicadores
Then el sistema debe calcular y mostrar los indicadores disponibles
And debe presentar los resultados de forma comprensible

Scenario: Datos insuficientes
Given que no existe información suficiente para calcular un indicador
When el responsable consulta los indicadores
Then el sistema debe informar que el indicador no puede calcularse
And no debe mostrar un resultado incorrecto
```

### US-010 — Reoptimizar rutas
**Épica:** EP-04  
**Story Points:** 8  
**Prioridad:** High  
**Componente:** OPTIMIZACIÓN DE RUTAS  
**Trazabilidad:** RF-010, RN-010, RN-011

**Historia:** Como operador logístico, quiero reoptimizar una ruta cuando ocurre un cambio operativo, para mantener una planificación de entregas válida.

```gherkin
Scenario: Nueva solución válida
Given que existe una planificación vigente
And ocurre un cambio operativo
When el operador solicita la reoptimización
Then el sistema debe generar una nueva planificación válida
And debe actualizar la planificación vigente

Scenario: Sin nueva solución válida
Given que existe una planificación válida
When ocurre un cambio operativo y no existe una nueva solución válida
Then el sistema debe conservar la última planificación válida
And debe informar que la reoptimización no pudo completarse
```

## 4. Enablers

| ID | Enabler | Épica | SP | Prioridad | Componente | RNF |
|---|---|---|---:|---|---|---|
| EN-001 | Rendimiento de generación de rutas | EP-04 | 5 | High | OPTIMIZACIÓN DE RUTAS | RNF-001 |
| EN-002 | Rendimiento de reoptimización | EP-04 | 5 | High | OPTIMIZACIÓN DE RUTAS | RNF-002 |
| EN-003 | Control de acceso por roles | EP-06 | 3 | Highest | SEGURIDAD | RNF-003 |
| EN-004 | Seguridad basada en OWASP | EP-06 | 5 | Highest | SEGURIDAD | RNF-004 |
| EN-005 | Disponibilidad del sistema | EP-06 | 5 | High | INFRAESTRUCTURA / DEVOPS | RNF-005 |
| EN-006 | Usabilidad de la plataforma | EP-06 | 3 | Medium | FRONTEND | RNF-006 |
| EN-007 | Accesibilidad de la plataforma | EP-06 | 3 | Medium | FRONTEND | RNF-007 |
| EN-008 | Escalabilidad de la solución | EP-06 | 5 | High | INFRAESTRUCTURA / DEVOPS | RNF-008 |
| EN-009 | Compatibilidad multiplataforma | EP-06 | 3 | Medium | FRONTEND | RNF-009 |
| EN-010 | Mantenibilidad del sistema | EP-06 | 3 | Medium | BACKEND / API | RNF-010 |
| EN-011 | Eficiencia energética | EP-06 | 3 | Low | INFRAESTRUCTURA / DEVOPS | RNF-011 |
| EN-012 | Fiabilidad e integridad de datos | EP-06 | 5 | Highest | BASE DE DATOS | RNF-012 |

### EN-001 — Rendimiento de generación de rutas
```gherkin
Scenario: Medición del rendimiento
Given que existen los datos necesarios para generar una ruta
When se ejecuta el proceso de optimización
Then el tiempo de generación debe ser medido
And debe verificarse contra el objetivo de RNF-001 (<= 45 segundos para 150 pedidos y 15 vehículos)

Scenario: Respuesta del motor
Given que el motor de optimización procesa una solicitud
When finaliza el cálculo
Then la respuesta debe retornar correctamente al sistema
And no debe producir errores por el procesamiento normal
```

### EN-002 — Rendimiento de reoptimización
```gherkin
Scenario: Medición de reoptimización
Given que existe una planificación vigente
When se solicita una reoptimización
Then debe medirse el tiempo de procesamiento
And debe verificarse contra el objetivo de RNF-002 (<= 30 segundos)

Scenario: Resultado de reoptimización
Given que ocurre un cambio operativo válido
When se ejecuta la reoptimización
Then el sistema debe procesar el cambio correctamente
And debe devolver el resultado de la nueva planificación
```

### EN-003 — Control de acceso por roles
```gherkin
Scenario: Acceso permitido
Given que un usuario tiene un rol determinado
When intenta acceder a una funcionalidad permitida para dicho rol
Then el sistema debe permitir el acceso

Scenario: Acceso denegado
Given que un usuario intenta acceder a una funcionalidad no autorizada
When solicita dicha funcionalidad
Then el sistema debe impedir el acceso
And debe mantener protegida la información restringida
```

### EN-004 — Seguridad basada en OWASP
```gherkin
Scenario: Validación de entrada
Given que el sistema recibe datos de entrada
When dichos datos son procesados
Then deben aplicarse las validaciones y controles de seguridad definidos
And deben rechazarse entradas no válidas

Scenario: Vulnerabilidades críticas
Given que se realiza una revisión de seguridad
When se evalúan los controles implementados
Then no deben quedar vulnerabilidades críticas OWASP Top 10 sin mitigar
```

### EN-005 — Disponibilidad
```gherkin
Scenario: Operación disponible
Given que los componentes del sistema están desplegados
When un usuario solicita una funcionalidad disponible
Then el sistema debe responder correctamente

Scenario: Recuperación
Given que ocurre una falla en un componente
When el sistema ejecuta el mecanismo de recuperación definido
Then debe restablecer el servicio según la estrategia de disponibilidad
And debe preservar la información válida
```

### EN-006 — Usabilidad
```gherkin
Scenario: Flujo comprensible
Given que un usuario accede al sistema según su rol
When utiliza una funcionalidad disponible
Then debe poder identificar claramente las acciones principales
And debe recibir información comprensible del resultado

Scenario: Error comprensible
Given que un usuario ejecuta una operación incorrecta
When el sistema detecta el error
Then debe mostrar un mensaje comprensible
And debe orientar al usuario sobre la acción necesaria
```

### EN-007 — Accesibilidad
```gherkin
Scenario: Interacción accesible
Given que un usuario accede a la interfaz
When utiliza los controles disponibles
Then los elementos deben presentar una estructura accesible
And la navegación debe poder realizarse de forma consistente

Scenario: Verificación WCAG
Given que se ejecutan pruebas de accesibilidad
When se evalúan las pantallas prioritarias del MVP
Then deben cumplirse los criterios aplicables de WCAG 2.1 nivel AA
```

### EN-008 — Escalabilidad
```gherkin
Scenario: Carga incrementada
Given que aumenta la cantidad de información procesada
When el sistema recibe una carga superior a la habitual
Then debe continuar procesando las operaciones soportadas
And debe mantenerse estable dentro de la capacidad definida

Scenario: Escenario de 1000 pedidos
Given que se ejecutan pruebas de carga
When se procesa un escenario de hasta 1000 pedidos diarios y 50 vehículos
Then las funciones principales no deben presentar errores funcionales críticos
```

### EN-009 — Compatibilidad
```gherkin
Scenario: Entorno soportado
Given que el sistema se ejecuta en un entorno soportado
When el usuario accede a la plataforma
Then la interfaz debe funcionar correctamente
And las funciones principales deben mantenerse disponibles

Scenario: Prueba de compatibilidad
Given que se realizan pruebas en los entornos definidos como compatibles
When se ejecutan las funcionalidades principales
Then no deben presentarse incompatibilidades bloqueantes
```

### EN-010 — Mantenibilidad
```gherkin
Scenario: Cambio localizado
Given que el sistema está organizado en componentes definidos
When un desarrollador realiza una modificación
Then debe poder identificar claramente el componente correspondiente
And debe evitarse afectar funcionalidades no relacionadas

Scenario: Pruebas posteriores al cambio
Given que se modifica un módulo del sistema
When se ejecutan las pruebas automatizadas relacionadas
Then deben mantenerse satisfactorias
And no deben introducirse defectos críticos conocidos
```

### EN-011 — Eficiencia energética
```gherkin
Scenario: Procesamiento necesario
Given que se ejecutan operaciones de procesamiento y consultas
When se analiza su comportamiento
Then deben identificarse las operaciones con mayor consumo computacional
And deben aplicarse las optimizaciones previstas

Scenario: Validación de optimización
Given que se aplicaron optimizaciones
When se vuelven a ejecutar las operaciones evaluadas
Then deben registrarse los resultados
And debe verificarse la mejora de eficiencia obtenida
```

### EN-012 — Fiabilidad e integridad de datos
```gherkin
Scenario: Operación válida
Given que el sistema registra o modifica información
When la operación es válida
Then los datos deben almacenarse correctamente
And deben mantenerse sus relaciones e integridad

Scenario: Operación con error
Given que una operación produce un error
When el sistema procesa el fallo
Then debe evitar guardar información inconsistente
And debe informar correctamente el resultado de la operación
```

## 5. Subtasks y jerarquía

Cada Story y Enabler tiene tres Subtasks. La jerarquía utilizada en Jira es:

`Épica → Story/Enabler → Subtask`

### Stories

| Padre | Subtask 1 | Subtask 2 | Subtask 3 |
|---|---|---|---|
| US-001 | Definir campos y validaciones del vehículo | Implementar registro de vehículo | Probar registro de vehículo |
| US-002 | Definir consulta y filtros de vehículos | Implementar consulta y visualización de la flota | Probar consulta y filtros |
| US-003 | Definir datos obligatorios y reglas del pedido | Implementar registro y persistencia del pedido | Probar campos obligatorios y ventanas de tiempo |
| US-004 | Definir criterios y filtros de consulta | Implementar consulta y visualización de pedidos | Probar filtros por estado, prioridad y fecha |
| US-005 | Definir datos y validaciones del conductor | Implementar registro del conductor | Probar validaciones y permisos del conductor |
| US-006 | Definir datos y validaciones del cliente | Implementar registro y persistencia del cliente | Probar datos obligatorios y control de acceso |
| US-007 | Preparar pedidos, vehículos, conductores y restricciones | Integrar servicio y motor de optimización | Probar capacidad, disponibilidad y restricciones de planificación |
| US-008 | Integrar servicio cartográfico | Implementar visualización de rutas y puntos de entrega | Probar visualización y disponibilidad del mapa |
| US-009 | Definir indicadores y reglas de cálculo | Implementar panel de indicadores | Probar cálculos y disponibilidad de datos |
| US-010 | Detectar y registrar cambios operativos | Implementar reoptimización y actualización de planificación | Probar nueva solución y conservación de la última planificación válida |

### Enablers

| Padre | Subtask 1 | Subtask 2 | Subtask 3 |
|---|---|---|---|
| EN-001 | Medir rendimiento base de generación | Optimizar proceso de generación de rutas | Ejecutar pruebas de rendimiento |
| EN-002 | Medir rendimiento de reoptimización | Optimizar flujo de reoptimización | Ejecutar pruebas de rendimiento |
| EN-003 | Definir matriz de permisos por rol | Implementar autenticación y autorización | Probar accesos permitidos y denegados |
| EN-004 | Revisar riesgos de seguridad según OWASP | Implementar controles de seguridad | Ejecutar pruebas de seguridad |
| EN-005 | Definir estrategia de disponibilidad y recuperación | Implementar verificaciones de salud del sistema | Probar recuperación ante fallos |
| EN-006 | Revisar flujos de uso por rol | Mejorar navegación y claridad de interfaces | Validar usabilidad mediante pruebas |
| EN-007 | Revisar requisitos básicos de accesibilidad | Ajustar controles, etiquetas y navegación | Ejecutar pruebas de accesibilidad |
| EN-008 | Revisar componentes y puntos de crecimiento | Ejecutar pruebas de carga | Validar comportamiento ante incremento de usuarios y datos |
| EN-009 | Definir navegadores y entornos soportados | Corregir incompatibilidades de interfaz | Ejecutar pruebas de compatibilidad |
| EN-010 | Revisar estructura y separación de componentes | Aplicar estándares de código y documentación | Validar mantenibilidad del sistema |
| EN-011 | Identificar operaciones de mayor consumo computacional | Optimizar consultas y procesamiento | Validar mejoras de eficiencia |
| EN-012 | Implementar validaciones e integridad transaccional | Gestionar errores y recuperación de operaciones | Ejecutar pruebas de integridad y consistencia |

## 6. Definition of Done

Una Story o Enabler se considera **Done** cuando cumple todos los criterios aplicables:

1. Implementación terminada conforme al alcance definido.
2. Pruebas unitarias ejecutadas y cobertura de código de al menos 80 %.
3. Criterios de aceptación Gherkin validados.
4. Análisis estático ejecutado y sin vulnerabilidades críticas pendientes.
5. Revisión por pares mediante Pull Request aprobada.
6. Integración correcta en la rama correspondiente.
7. Despliegue automatizado al entorno de prueba/staging disponible.
8. Documentación funcional, técnica o de API actualizada cuando corresponda.
9. Trazabilidad mantenida hacia Story/Enabler, Épica y requisito de origen.

## 7. Resumen de estimación

| Grupo | Elementos | Story Points |
|---|---:|---:|
| Stories | 10 | 51 |
| Enablers | 12 | 48 |
| Total | 22 | 99 |

## 8. Trazabilidad general

La transformación mantiene como fuentes de verdad los documentos existentes de `01 Inicio`. Los RF-001 a RF-010 se transforman en Stories y los RNF-001 a RNF-012 en Enablers. Las reglas RN-001 a RN-016 se utilizan como soporte de aceptación y restricciones de negocio.

## 9. Nota de planificación

Los Story Points son estimaciones relativas utilizadas para planificación Agile. No representan horas ni costo monetario.
