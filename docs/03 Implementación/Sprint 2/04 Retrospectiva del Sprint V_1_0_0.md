# 04 Retrospectiva del Sprint V_1_0_0

[← Volver al índice del Sprint 2](./README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## 1. Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Sprint | Sprint 2 — Gestión operativa y flota |
| Periodo | 23/09/2026 – 05/10/2026 |
| Corte | 04/10/2026 |
| Técnica | Retrospectiva por Personas, Relaciones, Procesos, Herramientas y plan de acción |

## 2. ¿Qué aprendimos?

El Sprint 2 mostró que la implementación incremental facilita detectar errores antes de integrar demasiados cambios. También se comprobó que una API puede estar funcionando correctamente a nivel de backend y, aun así, producir una mala experiencia en frontend si los errores de validación no se transforman en mensajes comprensibles para el usuario.

Otro aprendizaje importante fue la necesidad de mantener alineados tres niveles de trabajo: código, documentación y Jira. Cuando uno de estos elementos queda atrasado, la trazabilidad de la iteración se debilita aunque el código ya esté funcionando.

Finalmente, el trabajo con distintas PCs confirmó que el procedimiento de instalación y verificación del entorno es parte del producto académico y no un detalle secundario.

## 3. ¿Qué estamos haciendo bien?

- Mantener una arquitectura modular y separar responsabilidades por capas.
- Implementar las historias de manera incremental.
- Utilizar pruebas automatizadas y cobertura para controlar la calidad.
- Verificar compilación del backend y build del frontend antes de continuar.
- Corregir problemas de integración identificados durante la validación manual.
- Mantener commits y cambios asociados a objetivos concretos del Sprint.
- Mantener una documentación que registra tanto avances como pendientes reales.

## 4. ¿Qué podemos hacer mejor?

### Personas

**Oportunidad:** la validación final no debe depender de una sola persona o de una sola sesión.

**Mejora:** cada integrante debe revisar una historia completa desde el criterio de aceptación hasta la evidencia de prueba.

### Relaciones

**Oportunidad:** código, Jira y documentación pueden quedar desfasados cuando el estado se actualiza al final.

**Mejora:** acordar que el cambio de estado de una HU se realiza inmediatamente después de verificar su resultado y guardar su evidencia.

### Procesos

**Oportunidad:** parte de la validación se concentró al final de la integración.

**Mejora:** aplicar la Definition of Done por historia, incluyendo pruebas, cobertura cuando corresponda y evidencia antes de marcarla como completada.

### Herramientas

**Oportunidad:** las diferencias entre PCs pueden retrasar la ejecución.

**Mejora:** mantener `DEV_SETUP.md`, `.env.example`, checklist de dependencias y una secuencia única de verificación para Windows y otros entornos del equipo.

## 5. Causas y acciones concretas

| Situación | Causa | Acción correctiva | Indicador |
|---|---|---|---|
| Validación final acumulada | Se priorizó completar funcionalidades antes de consolidar toda la evidencia | Ejecutar la validación al terminar cada HU | 100 % de HUs con evidencia |
| Desfase entre Jira y código | Actualización del tablero no siempre fue inmediata | Actualizar Jira al cerrar cada HU | 100 % de HUs con estado coherente |
| Mensajes de validación poco claros | El frontend recibía estructuras de error sin formatear | Centralizar el procesamiento en `apiResponse.js` | 100 % de errores legibles |
| Diferencias de entorno | Configuraciones locales diferentes | Usar checklist y guía de entorno | 100 % de sesiones con checklist |
| Evidencias de cierre incompletas | La demo formal se dejó para el cierre | Preparar evidencias antes de la Sprint Review | 100 % de funcionalidades demostradas |

## 6. Plan de acción para el Sprint siguiente

| Acción | Responsable | Indicador | Meta | Momento |
|---|---|---|---:|---|
| Ejecutar pruebas al finalizar cada HU | Equipo | HUs con evidencia de prueba / HUs completadas | 100 % | Durante cada Sprint |
| Sincronizar Jira con el trabajo real | Equipo | HUs con estado correcto / HUs trabajadas | 100 % | Mismo día del cambio |
| Verificar el entorno antes de cada sesión | Equipo | Sesiones con checklist / sesiones totales | 100 % | Inicio de sesión |
| Registrar commits descriptivos | Equipo | Commits descriptivos / commits totales | 100 % | En cada integración |
| Preparar evidencia de demo antes del cierre | Equipo | Funcionalidades con evidencia / funcionalidades demostradas | 100 % | Antes de Sprint Review |

## 7. Cierre

La principal mejora para el siguiente Sprint será mover parte de la validación hacia el momento en que termina cada historia, evitando que las pruebas, evidencias, estados de Jira y documentación se acumulen al final.

## 8. Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 04/10/2026 | Retrospectiva consolidada con aprendizajes, aciertos, oportunidades de mejora y plan de acción. |
