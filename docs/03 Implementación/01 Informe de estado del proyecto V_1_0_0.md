# 01 Informe de estado del proyecto V_1_0_0

[← Volver al README](../../README.md)

**Versión documental:** 1.1.0  
**Fecha de corte:** 2026-09-23

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

## 2. Estado actual de las HUs comprometidas

Al corte de este informe, Jira muestra **2 HUs en En revisión / QA**, **4 HUs en Por hacer** y **0 HUs en Listo**.

| HU | Descripción | Estado Jira | SP |
|---|---|---|---:|
| US-001 | Registrar vehículo | En revisión / QA | 3 |
| US-002 | Consultar vehículos | En revisión / QA | 3 |
| US-003 | Registrar pedido | Por hacer | 5 |
| US-004 | Consultar pedidos | Por hacer | 3 |
| US-005 | Registrar conductor | Por hacer | 3 |
| US-006 | Registrar cliente | Por hacer | 3 |

### 2.1 Avance por HUs

- HUs comprometidas: **6**
- HUs actualmente en Listo: **0/6 = 0 %**
- HUs actualmente en En revisión / QA: **2/6 = 33.3 %**
- HUs actualmente en Por hacer: **4/6 = 66.7 %**

El 33.3 % corresponde a HUs que han llegado a revisión/QA, no a HUs declaradas Done.

### 2.2 Avance por Story Points

- SP comprometidos: **20 SP**
- SP actualmente en Listo: **0 SP**
- SP actualmente en En revisión / QA: **6 SP**
- SP actualmente en Por hacer: **14 SP**

## 3. Evidencia de trabajo registrado en Jira

Los reportes de Jira del Sprint 1 muestran una reducción de **20 SP a 14 SP** en el Burndown, equivalente a **6 SP** de trabajo retirado del trabajo restante.

El Burnup registra **6 SP de trabajo completado en el historial del Sprint**. Este dato debe interpretarse como trabajo registrado por Jira en su historial y no como declaración de que las dos HUs cumplan por sí solas toda la Definition of Done.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)

### 3.1 Observación sobre incorporación del alcance

El Burndown muestra que las seis HUs del Sprint fueron incorporadas al alcance el **11/09/2026**, aunque el periodo planificado inicia el **09/09/2026**. Esta diferencia queda registrada como una observación del flujo real y se considera un punto de mejora para Sprint 2.

## 4. Velocidad y métricas del equipo

### Velocidad estimada

La planificación del Sprint comprometió **20 SP**.

### Velocidad real cerrada

No se registra todavía una velocidad histórica definitiva, porque el Sprint aún no ha sido cerrado formalmente en Jira y las HUs de mayor avance permanecen en **En revisión / QA**.

Por ello, **no se inventa una velocidad real de Sprint 1**. El dato se incorporará después del cierre formal del Sprint si Jira lo genera.

### Métricas disponibles al corte

| Métrica | Resultado |
|---|---:|
| HUs comprometidas | 6 |
| HUs en revisión/QA | 2 |
| HUs en Listo | 0 |
| HUs por hacer | 4 |
| SP comprometidos | 20 |
| SP en revisión/QA | 6 |
| SP pendientes | 14 |
| Cobertura automatizada del backend | **99 %** |
| Pruebas automatizadas | **11/11 aprobadas** |

## 5. Calidad y verificación técnica

Se ejecutaron pruebas automatizadas del módulo de vehículos con el siguiente resultado:

- **11 pruebas aprobadas**.
- **0 fallos**.
- **99 % de cobertura** sobre `app`.
- `python -m compileall -q app tests` ejecutado sin errores.
- `python -m pip check` ejecutado con resultado **No broken requirements found**.

Durante la ejecución se observaron dos warnings de deprecación de dependencias (`Starlette/httpx` y `anyio`). Los warnings no provocaron fallos en las pruebas.

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

Sprint 1 dejó un incremento técnico funcional en gestión de vehículos, con backend y frontend integrados, persistencia PostgreSQL, búsqueda/filtros y un conjunto de 11 pruebas automatizadas con 99 % de cobertura.

Al mismo tiempo, Jira mantiene las dos HUs de vehículos en **En revisión / QA**, mientras las otras cuatro HUs permanecen en **Por hacer**. Por ello, el informe diferencia entre **trabajo técnico comprobado**, **trabajo registrado como completado por los reportes** y **HUs formalmente Done**.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | Creación inicial del informe. |
| 1.1.0 | 2026-09-23 | Incorporación de Burndown/Burnup, QA, cobertura, estructura técnica y estado actualizado de Jira. |

[← Volver al README](../../README.md)
