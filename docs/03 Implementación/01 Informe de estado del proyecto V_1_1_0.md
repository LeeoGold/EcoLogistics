# 01 Informe de estado del proyecto V_1_1_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23
**Estado del Sprint:** Cerrado en Jira

## 1. Datos del Sprint

| Campo | Valor |
|---|---|
| Proyecto | **EcoLogística Huancayo** |
| Sprint | **ECO Sprint 1** |
| Periodo planificado | **09/09/2026 – 22/09/2026** |
| Historias comprometidas | **6 HUs** |
| Story Points comprometidos | **20 SP** |
| Release | **v1.0.0 - MVP EcoLogística Huancayo** |
| Meta | Implementar la base operativa para registrar y consultar vehículos, conductores, clientes y pedidos, dejando la información preparada para la planificación de rutas. |

## 2. Estado final de las HUs comprometidas

Al cierre del Sprint 1, Jira registró **2 actividades completadas** y **4 actividades abiertas**. Las 2 HUs completadas fueron US-001 y US-002; las 4 restantes fueron trasladadas al backlog para trabajo posterior.

| HU | Descripción | Estado Jira | SP |
|---|---|---|---:|
| US-001 | Registrar vehículo | Completada en Jira | 3 |
| US-002 | Consultar vehículos | Completada en Jira | 3 |
| US-003 | Registrar pedido | Abierta / Backlog | 5 |
| US-004 | Consultar pedidos | Abierta / Backlog | 3 |
| US-005 | Registrar conductor | Abierta / Backlog | 3 |
| US-006 | Registrar cliente | Abierta / Backlog | 3 |

### 2.1 Avance por HUs

- HUs comprometidas: **6**
- HUs completadas al cierre según Jira: **2/6 = 33.3 %**
- HUs abiertas trasladadas al backlog: **4/6 = 66.7 %**

### 2.2 Avance por Story Points

- SP comprometidos: **20 SP**
- SP completados al cierre según Jira: **6 SP**
- SP trasladados como trabajo abierto: **14 SP**
- Cumplimiento por SP: **6/20 = 30 %**

## 3. Evidencia de trabajo registrado en Jira

Los reportes de Jira del Sprint 1 muestran una reducción de **20 SP a 14 SP** en el Burndown, equivalente a **6 SP** de trabajo retirado del trabajo restante.

El Burnup registra **6 SP de trabajo completado en el historial del Sprint**. Este dato debe interpretarse como trabajo registrado por Jira en su historial y no como declaración de que las dos HUs cumplan por sí solas toda la Definition of Done.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)

### 3.1 Observación sobre incorporación del alcance

El Burndown muestra que las seis HUs del Sprint fueron incorporadas al alcance el **11/09/2026**, aunque el periodo planificado inicia el **09/09/2026**. Esta diferencia queda registrada como una observación del flujo real y se considera un punto de mejora para Sprint 2.

## 4. Velocidad y métricas del equipo

### Velocidad estimada vs. real

| Métrica | Resultado |
|---|---:|
| Velocidad estimada / capacidad comprometida | **20 SP** |
| Velocidad real registrada por Jira al cierre | **6 SP** |
| Diferencia | **14 SP** |
| Cumplimiento del compromiso por SP | **30 %** |

La planificación comprometió 20 SP. Una vez cerrado ECO Sprint 1, Jira registró **6 SP completados** y un promedio de **6 SP**, correspondiente al único Sprint cerrado disponible en el reporte de velocidad.

### Burndown y Burnup

El Burndown muestra 20 SP incorporados al alcance y 14 SP restantes al corte final, equivalente a una reducción de 6 SP. El Burnup registra 6 SP de trabajo completado.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)
> - [Velocidad de Sprint 1](./evidencias/09-velocidad-sprint-1.png)

La lectura debe considerar que Jira registra la incorporación de las seis HUs al alcance el **11/09/2026**, aunque el Sprint estaba planificado desde el **09/09/2026**.

## 5. Calidad y verificación técnica

Se ejecutaron pruebas automatizadas del módulo de vehículos con el siguiente resultado:

- **11 pruebas aprobadas**.
- **0 fallos**.
- **99 % de cobertura** sobre `app`.
- `python -m compileall -q app tests` ejecutado sin errores.
- `python -m pip check` ejecutado con resultado **No broken requirements found**.

Durante la ejecución se observaron dos warnings de deprecación de dependencias (`Starlette/httpx` y `anyio`). Los warnings no provocaron fallos en las pruebas.

## 5.1 Matriz de verificación de la Definition of Done

| Condición de la DoD | Estado | Evidencia / observación |
|---|---|---|
| Implementación del incremento | Verificada | US-001 y US-002 implementadas. |
| Pruebas automatizadas y cobertura ≥ 80 % | Verificada | 11/11 pruebas aprobadas; 99 % de cobertura del backend. |
| Criterios Gherkin | Parcialmente verificada | Los criterios forman parte de la planificación; no se dispone de una ejecución independiente de Gherkin para este cierre. |
| Análisis estático sin vulnerabilidades críticas | No verificada | No se ejecutó una herramienta específica de análisis estático durante este cierre. |
| Revisión por pares mediante Pull Request | Verificada para el cierre documental | PR #1 de cierre documental aprobada y fusionada. |
| Integración correcta | Verificada | React ↔ FastAPI ↔ PostgreSQL validado en MAIN. |
| Despliegue automatizado a staging | No verificada | No existe evidencia de un despliegue automatizado a staging. |
| Documentación actualizada | Verificada | Documentación Sprint 1 actualizada y versionada. |
| Trazabilidad | Verificada | HUs, subtareas, evidencias y documentación relacionados. |

## 6. Avance técnico del incremento

### Backend

Se implementó y reorganizó el módulo de vehículos con separación de responsabilidades:

```text
routes → controllers → services → repositories → models
```

La API de vehículos permite listar, consultar, registrar, actualizar y eliminar registros. La persistencia se realiza mediante SQLAlchemy sobre PostgreSQL.

### Frontend

El módulo de vehículos fue reorganizado en una estructura modular con:

```text
components/
services/
routes/
state/
assets/
pages/
```

Se verificó la comunicación React ↔ FastAPI y la funcionalidad de registro, consulta, búsqueda y filtros de vehículos.

### Base de datos

La aplicación se ejecutó correctamente sobre la base PostgreSQL `ecologistica` en el equipo MAIN.

## 7. Hitos técnicos

| Hito | Estado | Evidencia |
|---|---|---|
| Backend FastAPI funcionando | Completado | Ejecución local verificada |
| PostgreSQL operativo | Completado | Persistencia verificada |
| Registro de vehículos | Completado técnicamente | Prueba funcional + automatizada |
| Consulta de vehículos | Completado técnicamente | Swagger + frontend |
| Búsqueda/filtros de vehículos | Completado técnicamente | Prueba funcional |
| Arquitectura backend por capas | Completado | Repositorio |
| Frontend modular | Completado | Repositorio |
| Pruebas automatizadas | Completado | 11/11 |
| Cobertura | Completado | 99 % |
| Despliegue automatizado a staging | No verificado | Sin evidencia |

## 8. Situación global del PFA

La planificación, los artefactos de Jira, Sprint 1 y los primeros incrementos funcionales están desarrollados. La consigna de implementación exige reportar el progreso real respecto del plan global, por lo que se conserva la separación entre avance del Sprint y avance total del PFA.

No se asigna un porcentaje global del PFA en este informe porque no existe una fórmula oficial única de ponderación del avance global disponible en las fuentes revisadas.

## 9. Conclusión

Sprint 1 dejó un incremento técnico funcional en gestión de vehículos, con backend y frontend integrados, persistencia PostgreSQL, búsqueda/filtros y 11 pruebas automatizadas con 99 % de cobertura.

Al cierre, Jira registró **2 HUs completadas (6 SP)** y **4 HUs abiertas trasladadas al backlog (14 SP)**. La velocidad oficial del reporte de Jira quedó en **6 SP**. El informe conserva como hechos separados el resultado de Jira, la evidencia técnica de QA y las condiciones de la DoD que sí pudieron ser verificadas.

No se afirma despliegue automatizado a staging ni aceptación formal del PO cuando no existe evidencia de esos eventos.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación inicial del informe. |
| 1.1.0 | 2026-09-23 | Incorporación de Burndown/Burnup, QA, cobertura, estructura técnica, cierre del Sprint y velocidad real de 6 SP. |

[← Volver al README Principal](../../README.md)
