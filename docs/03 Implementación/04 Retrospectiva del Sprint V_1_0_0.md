# 04 Retrospectiva del Sprint V_1_0_0

[← Volver al README Principal](../../README.md)

## 1. Información general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Sprint | Sprint 2 — Gestión operativa y flota |
| Periodo | 23/09/2026 – 05/10/2026 |
| Corte | 02/10/2026 |
| Técnica | Análisis por cuatro ejes + plan de acción |

## 2. Personas

### Aprendizajes

La división del desarrollo por historia facilita identificar qué parte del sistema debe cambiar y reduce la necesidad de modificar archivos no relacionados.

### Aciertos

Se mantuvo una forma de trabajo incremental: implementar una historia, revisar la estructura y realizar una verificación de compilación antes de avanzar.

### Oportunidad de mejora

La validación integral no debe quedar concentrada al final. Debe existir una rutina de pruebas funcionales por historia antes de acumular demasiados cambios.

## 3. Relaciones

### Aprendizajes

La sincronización del trabajo entre GitHub y Jira es importante para que el estado del tablero represente el estado técnico real.

### Aciertos

Los cambios se organizaron de forma que cada bloque funcional pudiera identificarse por historia.

### Oportunidad de mejora

Los cambios de estado en Jira deben realizarse cerca del momento en que se completa y verifica cada historia, no únicamente al cierre.

## 4. Procesos

### Aprendizajes

La separación entre implementación, compilación y validación ayuda a detectar problemas antes de integrar nuevas funcionalidades.

### Aciertos

Se utilizaron comprobaciones intermedias de `compileall` y `npm run build` para evitar acumular errores de sintaxis o integración.

### Oportunidad de mejora

La Definition of Done debe aplicarse por historia, incluyendo pruebas y evidencia, para evitar que la verificación de calidad se concentre en una sola sesión final.

## 5. Herramientas

### Aprendizajes

Git, GitHub, Jira, FastAPI, React, Vite y PostgreSQL deben considerarse parte de un mismo flujo de trazabilidad y no como herramientas aisladas.

### Aciertos

La arquitectura modular permitió incorporar pedidos, conductores y clientes sin abandonar la separación por capas y componentes.

### Oportunidad de mejora

Mantener un procedimiento de entorno actualizado y verificable para reducir diferencias entre PCs y facilitar la continuidad del trabajo.

## 6. Plan de acción Sprint siguiente

| Acción | Responsable | Indicador | Objetivo |
|---|---|---|---|
| Ejecutar pruebas antes de cerrar cada HU | Equipo | HUs con evidencia de prueba / HUs completadas | 100 % |
| Sincronizar Jira con el trabajo real | Equipo | HUs con estado correcto / HUs trabajadas | 100 % |
| Verificar entorno antes de iniciar sesión | Equipo | Sesiones con checklist / sesiones totales | 100 % |
| Registrar cambios mediante commits claros | Equipo | Commits descriptivos / commits totales | 100 % |
| Mantener evidencia de validación | Equipo | HUs con evidencia / HUs completadas | 100 % |

## 7. Cierre

La principal mejora de proceso identificada para la siguiente iteración es trasladar parte de la validación de calidad hacia el momento de finalización de cada historia, manteniendo la implementación incremental y la sincronización continua entre código, documentación y Jira.
