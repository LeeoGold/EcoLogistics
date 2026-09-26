# 04 Retrospectiva del Sprint V_1_0_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.0.0  
**Fecha de corte:** 2026-09-23

## 1. ¿Qué aprendimos?

Sprint 1 permitió comprobar que la implementación, Jira, las pruebas, la evidencia y la documentación deben evolucionar de forma sincronizada. También se comprobó que las diferencias entre entornos de desarrollo pueden detener la validación aunque el código esté disponible.

El uso de checkpoints y la centralización de la validación integral en MAIN permitieron continuar el trabajo frente a problemas de conectividad y disponibilidad de PostgreSQL.

## 2. ¿Qué estamos haciendo bien?

- Se mantiene Jira como fuente principal de seguimiento del Sprint.
- El backend y frontend están organizados de manera modular.
- Se ejecutan pruebas automatizadas como parte de la validación.
- Se documentan las métricas del Sprint mediante Burndown, Burnup y Velocidad.
- Se mantiene trazabilidad entre HUs, evidencias y documentación.

## 3. ¿Qué podemos hacer mejor?

### Personas

- Definir responsabilidades explícitas para actualizar Jira, ejecutar pruebas y consolidar evidencias.
- Verificar el entorno antes de iniciar una sesión para reducir interrupciones durante la implementación.

### Relaciones

- Mejorar la coordinación entre quienes desarrollan y quienes revisan el estado de las HUs.
- Acordar previamente cuándo una HU puede pasar a revisión y qué evidencia debe acompañarla.
- Formalizar la comunicación de aceptación del incremento con los stakeholders cuando corresponda.

### Procesos

- Incorporar todo el alcance del Sprint antes de su inicio operativo; en Sprint 1 las seis HUs aparecen incorporadas al alcance el 11/09/2026 mientras el periodo planificado inicia el 09/09/2026.
- Utilizar la Definition of Done como lista de verificación antes de marcar una HU como terminada.
- Registrar pruebas y evidencias durante la ejecución, no solamente al cierre.
- Mantener una rutina de cierre que incluya revisión, demo, actualización de documentación y trazabilidad.

### Herramientas

- Mantener Jira, GitHub y el repositorio como fuentes coordinadas de seguimiento y versión.
- Documentar un entorno reproducible para Python, dependencias, PostgreSQL, `.env` y puertos.
- Completar el flujo de ramas y Pull Requests para que la revisión quede trazable.

### Acciones a realizar

| Acción | Indicador | Meta | Responsable |
|---|---|---:|---|
| Sincronizar Jira con el trabajo real | Subtareas/HUs actualizadas durante la sesión | **100 %** | Equipo de desarrollo |
| Evidenciar las pruebas | HUs con evidencia antes del cierre | **100 %** | Equipo de desarrollo |
| Verificar entorno | Sesiones con checklist inicial | **100 %** | Equipo de desarrollo |
| Proteger avances | Checkpoint / push | **≥ 1 por sesión** con conectividad | Equipo de desarrollo |
| Evitar alcance tardío | Historias agregadas después del inicio sin justificación | **0** | Equipo de desarrollo |
| Revisar cambios | Funcionalidades con Pull Request | **100 %** cuando aplique | Equipo de desarrollo |
| Formalizar la demo | HUs cerradas con evidencia de demostración | **100 %** | Equipo de desarrollo |

## 4. Método de retrospectiva

Se utilizó el enfoque **Keep / Start / Stop** como apoyo para convertir los hallazgos anteriores en acciones:

- **Keep:** mantener Jira, checkpoints, pruebas automatizadas y desarrollo incremental.
- **Start:** iniciar cada sesión con checklist de entorno y registrar la evidencia durante la ejecución.
- **Stop:** evitar marcar HUs como terminadas antes de comprobar la DoD y evitar incorporar alcance después del inicio del Sprint sin justificación.

## 5. Datos observables del Sprint

- **20 SP** comprometidos.
- **6 SP** registrados como completados por Jira.
- **2 HUs** completadas y **4 HUs** abiertas al cierre.
- **11/11** pruebas aprobadas.
- **99 %** de cobertura sobre `app`.
- Las seis HUs fueron incorporadas al alcance registrado el **11/09/2026**, después del inicio planificado del **09/09/2026**.
- La validación integral se centralizó en MAIN debido a diferencias de entorno.

## 6. Conclusión

La retrospectiva deja un conjunto de acciones verificables para Sprint 2. El foco está en la sincronización temprana entre Jira, código y evidencias; la preparación del entorno; la revisión de la DoD; la trazabilidad mediante Pull Requests y la formalización de la demostración del incremento.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-23 | Reformulación de la retrospectiva conforme a los cuatro ejes de la rúbrica y definición de acciones medibles. |

[← Volver al README Principal](../../README.md)
