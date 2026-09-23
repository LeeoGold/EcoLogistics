# 02 Artefactos Jira V_1_1_0

**VersiÃ³n documental actual:** 1.1.0  
**Fecha de actualizaciÃ³n:** 2026-09-23

[â† Volver al README Principal](../../README.md)

## 1. InformaciÃ³n general

| Campo | Valor |
|---|---|
| Proyecto | EcoLogÃ­stica Huancayo |
| Clave Jira | ECO |
| Tipo | Scrum, espacio gestionado por el equipo |
| Release | `v1.0.0 - MVP EcoLogÃ­stica Huancayo` |
| Sprint | `ECO Sprint 1` |
| Sprint Goal | Implementar la base operativa de EcoLogÃ­stica Huancayo para registrar y consultar vehÃ­culos, conductores, clientes y pedidos, dejando la informaciÃ³n preparada para la planificaciÃ³n de rutas. |

## 2. ConfiguraciÃ³n realizada

- 6 Ã‰picas.
- 10 Stories.
- 12 Enablers.
- 66 Subtasks.
- EstimaciÃ³n con Story Points.
- Campo Prioridad para Story y Enabler.
- Campo personalizado `Componente` para Story y Enabler.
- Release `v1.0.0 - MVP EcoLogÃ­stica Huancayo`.
- Sprint 1 con duraciÃ³n de dos semanas.
- Flujo: **Por hacer â†’ En curso â†’ En revisiÃ³n / QA â†’ Listo**.

## 3. Estructura de Ã‰picas

| Jira / diseÃ±o | Ã‰pica | Contenido |
|---|---|---|
| EP-01 | GestiÃ³n de Flota | US-001, US-002 |
| EP-02 | GestiÃ³n de Conductores y Clientes | US-005, US-006 |
| EP-03 | GestiÃ³n de Pedidos | US-003, US-004 |
| EP-04 | GestiÃ³n y OptimizaciÃ³n de Rutas | US-007, US-008, US-010, EN-001, EN-002 |
| EP-05 | Monitoreo e Indicadores | US-009 |
| EP-06 | Seguridad y Calidad TÃ©cnica | EN-003 a EN-012 |

## 4. Sprint 1

**Periodo:** 09/09/2026 â€“ 22/09/2026  
**Actividades principales:** 6 Stories  
**Story Points:** 20

| Story | SP | Prioridad | Componente |
|---|---:|---|---|
| US-001 Registrar vehÃ­culo | 3 | High | BACKEND / API |
| US-002 Consultar vehÃ­culos | 3 | Medium | FRONTEND |
| US-003 Registrar pedido | 5 | High | BACKEND / API |
| US-004 Consultar pedidos | 3 | Medium | FRONTEND |
| US-005 Registrar conductor | 3 | High | BACKEND / API |
| US-006 Registrar cliente | 3 | High | BACKEND / API |

## 5. Evidencias requeridas por la rÃºbrica

Las capturas deben estar recortadas exclusivamente al panel de Jira que demuestra cada criterio, sin escritorio, navegador, pestaÃ±as o barra de tareas.

### Evidencia 1 â€” Roadmap / Cronograma

**QuÃ© demuestra:** Ã‰picas, periodo planificado, Sprint y versiÃ³n.

**Referencia:** captura del Cronograma de Jira con las seis Ã‰picas y ECO Sprint 1 visibles.

**Archivo de evidencia:** `evidencias/01-roadmap.png`  

![Roadmap / Cronograma de Jira](evidencias/01-roadmap.png)

### Evidencia 2 â€” Backlog priorizado

**QuÃ© demuestra:** Actividad, Principal, Prioridad, Story Points, Componente, Sprint y Estado.

**Referencia:** vista Lista filtrada a Stories + Enablers, 22/22 elementos.

**Archivo de evidencia:** `evidencias/02-backlog-priorizado.png`  

![Backlog priorizado con Principal, Prioridad, Story Points y Componente](evidencias/02-backlog-priorizado.png)

### Evidencia 3 â€” Sprint Planning + Sprint Goal

**QuÃ© demuestra:** ECO Sprint 1, fechas, 6 actividades, 20 SP y Meta del sprint.

**Archivo de evidencia:** `evidencias/03-sprint-planning.png`  

![Sprint Planning y Sprint Goal](evidencias/03-sprint-planning.png)

### Evidencia 4 â€” Scrum Board

**QuÃ© demuestra:** flujo y distribuciÃ³n del trabajo durante Sprint 1.

ConfiguraciÃ³n observada:
- Por hacer: 4
- En curso: 1
- En revisiÃ³n / QA: 1
- Listo: 0

**Archivo de evidencia:** `evidencias/04-scrum-board.png`  

![Scrum Board de Sprint 1](evidencias/04-scrum-board.png)

### Evidencia 5 â€” Release / PublicaciÃ³n

**QuÃ© demuestra:** `v1.0.0 - MVP EcoLogÃ­stica Huancayo` y su periodo.

**Archivo de evidencia:** `evidencias/05-release.png`  

![Release v1.0.0 de EcoLogÃ­stica Huancayo](evidencias/05-release.png)

## 6. Control de evidencias

Las cinco capturas utilizadas en este documento se almacenan en `evidencias/` y se referencian mediante rutas relativas para que GitHub las renderice directamente.

| Evidencia | Archivo | Estado |
|---|---|---|
| 1 â€” Roadmap / Cronograma | `evidencias/01-roadmap.png` | Preparada |
| 2 â€” Backlog priorizado | `evidencias/02-backlog-priorizado.png` | Preparada |
| 3 â€” Sprint Planning + Sprint Goal | `evidencias/03-sprint-planning.png` | Preparada |
| 4 â€” Scrum Board | `evidencias/04-scrum-board.png` | Preparada |
| 5 â€” Release / PublicaciÃ³n | `evidencias/05-release.png` | Preparada |

> **Nota de entrega:** las capturas deben conservar el recorte centrado en el panel de Jira y evitar escritorio, pestaÃ±as del navegador, barra de tareas u otros elementos ajenos a la evidencia.

## 7. Resultado final de Sprint 1

El Sprint 1 se cerrÃ³ en Jira con **2 actividades completadas y 4 actividades abiertas**, equivalentes a **6 SP completados de 20 SP comprometidos**. Jira registrÃ³ una velocidad real de **6 SP** para ECO Sprint 1. Las cuatro actividades abiertas fueron trasladadas al backlog.

### Evidencias posteriores al Sprint

- [Burndown de Sprint 1](../03%20ImplementaciÃ³n/evidencias/06-burndown-sprint-1.png)
- [Burnup de Sprint 1](../03%20ImplementaciÃ³n/evidencias/07-burnup-sprint-1.png)
- [Pull Request aprobada](../03%20ImplementaciÃ³n/evidencias/08-pull-request-aprobada.png)
- [Velocidad de Sprint 1](../03%20ImplementaciÃ³n/evidencias/09-velocidad-sprint-1.png)

## 7. Resumen de planificaciÃ³n Agile en Jira

| Elemento | Cantidad |
|---|---:|
| Ã‰picas | 6 |
| Stories | 10 |
| Enablers | 12 |
| Subtasks | 66 |
| Actividades principales | 22 |
| Story Points de Stories | 51 |
| Story Points de Enablers | 48 |
| Story Points totales estimados | 99 |

## 8. RelaciÃ³n con GitHub

Este documento constituye la evidencia documental de la configuraciÃ³n realizada en Jira. El cÃ³digo, los documentos y las evidencias se consolidan en el repositorio GitHub.


## Historial de cambios

| VersiÃ³n | Fecha | Cambio |
|---|---|---|
| 1.0.0 | 2026-09-01 | ConfiguraciÃ³n inicial de Jira y Sprint 1. |
| 1.1.0 | 2026-09-23 | IncorporaciÃ³n del resultado final del Sprint, velocidad y evidencias de implementaciÃ³n. |
