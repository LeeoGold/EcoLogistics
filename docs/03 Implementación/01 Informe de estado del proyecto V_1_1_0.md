# 01 Informe de estado del proyecto V_1_1_0

[â† Volver al README](../../README.md)

**Versión documental:** 1.1.0
**Fecha de corte:** 2026-09-23
**Estado del Sprint:** Cerrado en Jira

## 1. Datos del Sprint

| Campo | Valor |
|---|---|
| Proyecto | **EcoLogÃ­stica Huancayo** |
| Sprint | **ECO Sprint 1** |
| Periodo planificado | **09/09/2026 â€“ 22/09/2026** |
| Historias comprometidas | **6 HUs** |
| Story Points comprometidos | **20 SP** |
| Release | **v1.0.0 - MVP EcoLogÃ­stica Huancayo** |
| Meta | Implementar la base operativa para registrar y consultar vehÃ­culos, conductores, clientes y pedidos, dejando la informaciÃ³n preparada para la planificaciÃ³n de rutas. |

## 2. Estado final de las HUs comprometidas

Al cierre del Sprint 1, Jira registrÃ³ **2 actividades completadas** y **4 actividades abiertas**. Las 2 HUs completadas fueron US-001 y US-002; las 4 restantes fueron trasladadas al backlog para trabajo posterior.

| HU | DescripciÃ³n | Estado Jira | SP |
|---|---|---|---:|
| US-001 | Registrar vehÃ­culo | Completada en Jira | 3 |
| US-002 | Consultar vehÃ­culos | Completada en Jira | 3 |
| US-003 | Registrar pedido | Abierta / Backlog | 5 |
| US-004 | Consultar pedidos | Abierta / Backlog | 3 |
| US-005 | Registrar conductor | Abierta / Backlog | 3 |
| US-006 | Registrar cliente | Abierta / Backlog | 3 |

### 2.1 Avance por HUs

- HUs comprometidas: **6**
- HUs completadas al cierre segÃºn Jira: **2/6 = 33.3 %**
- HUs abiertas trasladadas al backlog: **4/6 = 66.7 %**

### 2.2 Avance por Story Points

- SP comprometidos: **20 SP**
- SP completados al cierre segÃºn Jira: **6 SP**
- SP trasladados como trabajo abierto: **14 SP**
- Cumplimiento por SP: **6/20 = 30 %**

## 3. Evidencia de trabajo registrado en Jira

Los reportes de Jira del Sprint 1 muestran una reducciÃ³n de **20 SP a 14 SP** en el Burndown, equivalente a **6 SP** de trabajo retirado del trabajo restante.

El Burnup registra **6 SP de trabajo completado en el historial del Sprint**. Este dato debe interpretarse como trabajo registrado por Jira en su historial y no como declaraciÃ³n de que las dos HUs cumplan por sÃ­ solas toda la Definition of Done.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)

### 3.1 ObservaciÃ³n sobre incorporaciÃ³n del alcance

El Burndown muestra que las seis HUs del Sprint fueron incorporadas al alcance el **11/09/2026**, aunque el periodo planificado inicia el **09/09/2026**. Esta diferencia queda registrada como una observaciÃ³n del flujo real y se considera un punto de mejora para Sprint 2.

## 4. Velocidad y mÃ©tricas del equipo

### Velocidad estimada vs. real

| MÃ©trica | Resultado |
|---|---:|
| Velocidad estimada / capacidad comprometida | **20 SP** |
| Velocidad real registrada por Jira al cierre | **6 SP** |
| Diferencia | **14 SP** |
| Cumplimiento del compromiso por SP | **30 %** |

La planificaciÃ³n comprometiÃ³ 20 SP. Una vez cerrado ECO Sprint 1, Jira registrÃ³ **6 SP completados** y un promedio de **6 SP**, correspondiente al Ãºnico Sprint cerrado disponible en el reporte de velocidad.

### Burndown y Burnup

El Burndown muestra 20 SP incorporados al alcance y 14 SP restantes al corte final, equivalente a una reducciÃ³n de 6 SP. El Burnup registra 6 SP de trabajo completado.

> **Evidencias:**
> - [Burndown de Sprint 1](./evidencias/06-burndown-sprint-1.png)
> - [Burnup de Sprint 1](./evidencias/07-burnup-sprint-1.png)
> - [Velocidad de Sprint 1](./evidencias/09-velocidad-sprint-1.png)

La lectura debe considerar que Jira registra la incorporaciÃ³n de las seis HUs al alcance el **11/09/2026**, aunque el Sprint estaba planificado desde el **09/09/2026**.

## 5. Calidad y verificaciÃ³n tÃ©cnica

Se ejecutaron pruebas automatizadas del mÃ³dulo de vehÃ­culos con el siguiente resultado:

- **11 pruebas aprobadas**.
- **0 fallos**.
- **99 % de cobertura** sobre `app`.
- `python -m compileall -q app tests` ejecutado sin errores.
- `python -m pip check` ejecutado con resultado **No broken requirements found**.

Durante la ejecuciÃ³n se observaron dos warnings de deprecaciÃ³n de dependencias (`Starlette/httpx` y `anyio`). Los warnings no provocaron fallos en las pruebas.

## 6. Avance tÃ©cnico del incremento

### Backend

Se implementÃ³ y reorganizÃ³ el mÃ³dulo de vehÃ­culos con separaciÃ³n de responsabilidades:

```text
routes â†’ controllers â†’ services â†’ repositories â†’ models
```

La API de vehÃ­culos permite listar, consultar, registrar, actualizar y eliminar registros. La persistencia se realiza mediante SQLAlchemy sobre PostgreSQL.

### Frontend

El mÃ³dulo de vehÃ­culos fue reorganizado en una estructura modular con:

```text
components/
services/
routes/
state/
assets/
pages/
```

Se verificÃ³ la comunicaciÃ³n React â†” FastAPI y la funcionalidad de registro, consulta, bÃºsqueda y filtros de vehÃ­culos.

### Base de datos

La aplicaciÃ³n se ejecutÃ³ correctamente sobre la base PostgreSQL `ecologistica` en el equipo MAIN.

## 7. Hitos tÃ©cnicos

| Hito | Estado | Evidencia |
|---|---|---|
| Backend FastAPI funcionando | Completado | EjecuciÃ³n local verificada |
| PostgreSQL operativo | Completado | Persistencia verificada |
| Registro de vehÃ­culos | Completado tÃ©cnicamente | Prueba funcional + automatizada |
| Consulta de vehÃ­culos | Completado tÃ©cnicamente | Swagger + frontend |
| BÃºsqueda/filtros de vehÃ­culos | Completado tÃ©cnicamente | Prueba funcional |
| Arquitectura backend por capas | Completado | Repositorio |
| Frontend modular | Completado | Repositorio |
| Pruebas automatizadas | Completado | 11/11 |
| Cobertura | Completado | 99 % |
| Despliegue automatizado a staging | No verificado | Sin evidencia |

## 8. SituaciÃ³n global del PFA

La planificaciÃ³n, los artefactos de Jira, Sprint 1 y los primeros incrementos funcionales estÃ¡n desarrollados. La consigna de implementaciÃ³n exige reportar el progreso real respecto del plan global, por lo que se conserva la separaciÃ³n entre avance del Sprint y avance total del PFA.

No se asigna un porcentaje global del PFA en este informe porque no existe una fÃ³rmula oficial Ãºnica de ponderaciÃ³n del avance global disponible en las fuentes revisadas.

## 9. ConclusiÃ³n

Sprint 1 dejÃ³ un incremento tÃ©cnico funcional en gestiÃ³n de vehÃ­culos, con backend y frontend integrados, persistencia PostgreSQL, bÃºsqueda/filtros y 11 pruebas automatizadas con 99 % de cobertura.

Al cierre, Jira registrÃ³ **2 HUs completadas (6 SP)** y **4 HUs abiertas trasladadas al backlog (14 SP)**. La velocidad oficial del reporte de Jira quedÃ³ en **6 SP**. El informe conserva como hechos separados el resultado de Jira, la evidencia tÃ©cnica de QA y las condiciones de la DoD que sÃ­ pudieron ser verificadas.

No se afirma despliegue automatizado a staging ni aceptaciÃ³n formal del PO cuando no existe evidencia de esos eventos.

## Historial de cambios

| VersiÃ³n | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-22 | CreaciÃ³n inicial del informe. |
| 1.1.0 | 2026-09-23 | Incorporación de Burndown/Burnup, QA, cobertura, estructura técnica, estado actualizado de Jira, cierre del Sprint y velocidad real de 6 SP. |

[â† Volver al README](../../README.md)
