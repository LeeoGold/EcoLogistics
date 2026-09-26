# 01 Informe de estado del proyecto V_1_0_0

[← Volver al README Principal](../../README.md)

**Versión documental:** 1.0.0  
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

Al cierre del Sprint 1, Jira registró **2 HUs completadas** y **4 HUs abiertas**. Las HUs completadas fueron US-001 y US-002; las restantes fueron trasladadas al backlog para trabajo posterior.

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
- HUs completadas al cierre según Jira: **2/6 = 33,3 %**
- HUs abiertas trasladadas al backlog: **4/6 = 66,7 %**

### 2.2 Avance por Story Points

- SP comprometidos: **20 SP**
- SP completados al cierre según Jira: **6 SP**
- SP trasladados como trabajo abierto: **14 SP**
- Cumplimiento por SP: **6/20 = 30 %**

## 3. Evidencia de trabajo registrado en Jira

Los reportes del Sprint 1 muestran una reducción de **20 SP a 14 SP** en el Burndown, equivalente a **6 SP** de trabajo retirado del trabajo restante. El Burnup registra **6 SP de trabajo completado** en el historial del Sprint.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)

### 3.1 Observación sobre incorporación del alcance

El Burndown muestra que las seis HUs del Sprint fueron incorporadas al alcance el **11/09/2026**, aunque el periodo planificado inicia el **09/09/2026**. Esta diferencia se registra como un punto de mejora para Sprint 2.

## 4. Velocidad y métricas del equipo

| Métrica | Resultado |
|---|---:|
| Capacidad comprometida | **20 SP** |
| Velocidad real registrada por Jira | **6 SP** |
| Diferencia | **14 SP** |
| Cumplimiento del compromiso por SP | **30 %** |

Jira registra una velocidad de **6 SP** para el único Sprint cerrado disponible en el reporte.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)
> - [Velocidad de Sprint 1](./evidencias/09-velocidad-sprint-1.png)

## 5. Calidad y verificación técnica

Se ejecutaron pruebas automatizadas del módulo de vehículos con el siguiente resultado:

- **11 pruebas aprobadas**.
- **0 fallos**.
- **99 % de cobertura** sobre `app`.
- `python -m compileall -q app tests` ejecutado sin errores.
- `python -m pip check` ejecutado con resultado **No broken requirements found**.

Durante la ejecución se observaron dos warnings de deprecación de dependencias (`Starlette/httpx` y `anyio`). Los warnings no provocaron fallos en las pruebas.

### 5.1 Matriz de verificación de la Definition of Done

| Condición de la DoD | Estado | Evidencia / observación |
|---|---|---|
| Implementación del incremento | Verificada | US-001 y US-002 implementadas. |
| Pruebas automatizadas y cobertura ≥ 80 % | Verificada | 11/11 pruebas aprobadas; 99 % de cobertura del backend. |
| Criterios Gherkin | Parcialmente verificada | Los criterios forman parte de la planificación; no se dispone de una ejecución independiente de Gherkin para este cierre. |
| Análisis estático sin vulnerabilidades críticas | No verificada | No se ejecutó una herramienta específica de análisis estático durante este cierre. |
| Revisión por Pull Request | Parcialmente verificada | PR #1 de cierre documental creada y en estado **Ready to merge**; la evidencia disponible no muestra revisión de terceros ni merge. |
| Integración correcta | Verificada | React ↔ FastAPI ↔ PostgreSQL validado en MAIN. |
| Despliegue automatizado a staging | No verificada | No existe evidencia de un despliegue automatizado a staging. |
| Documentación actualizada | Verificada | Documentación del Sprint 1 actualizada y versionada. |
| Trazabilidad | Verificada | HUs, subtareas, evidencias y documentación relacionados. |

## 6. Avance técnico del incremento

### Backend

Se implementó y reorganizó el módulo de vehículos con separación de responsabilidades:

```text
routes → controllers → services → repositories → models
```

La API permite listar, consultar, registrar, actualizar y eliminar registros de vehículos. La persistencia se realiza mediante SQLAlchemy sobre PostgreSQL.

### Frontend

El módulo de vehículos se organizó de forma modular con:

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

La aplicación se ejecutó sobre PostgreSQL `ecologistica` en el equipo MAIN.

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

La planificación, los artefactos de Jira, el Sprint 1 y los primeros incrementos funcionales están documentados. El presente informe diferencia el avance específico del Sprint 1 del avance global del PFA y no asigna un porcentaje global porque no existe una fórmula oficial única de ponderación en los materiales revisados.

## 9. Conclusión

Sprint 1 dejó un incremento técnico funcional en gestión de vehículos, con backend y frontend integrados, persistencia PostgreSQL, búsqueda/filtros y 11 pruebas automatizadas con 99 % de cobertura.

Al cierre, Jira registró **2 HUs completadas (6 SP)** y **4 HUs abiertas trasladadas al backlog (14 SP)**. El informe conserva como hechos separados el resultado de Jira, la evidencia técnica de QA y las condiciones de la DoD que sí pudieron verificarse.

No se afirma despliegue automatizado a staging ni aceptación formal del Product Owner cuando no existe evidencia de esos eventos.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-23 | Consolidación del informe final del Sprint 1 conforme a la plantilla de implementación y a la evidencia disponible. |

[← Volver al README Principal](../../README.md)
