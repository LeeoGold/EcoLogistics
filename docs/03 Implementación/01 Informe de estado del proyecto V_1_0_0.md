# 01 Informe de estado del proyecto V_1_0_0

[← Volver al README](../../README.md)

## 1. Datos del Sprint

- Proyecto: **EcoLogística Huancayo**
- Sprint: **Sprint 1**
- Periodo planificado: **09/09/2026 – 22/09/2026**
- Historias comprometidas: **6 HUs**
- Story Points comprometidos: **20 SP**
- Release: **v1.0.0 - MVP EcoLogística Huancayo**

## 2. Estado actual de las HUs comprometidas

Estado observado en Jira antes de completar el Sprint y actualizado con el trabajo registrado durante este checkpoint:

| HU | Descripción | Estado | SP |
|---|---|---|---:|
| US-001 | Registrar vehículo | En curso | 3 |
| US-002 | Consultar vehículos | En revisión / QA | 3 |
| US-003 | Registrar pedido | Por hacer | 5 |
| US-004 | Consultar pedidos | Por hacer | 3 |
| US-005 | Registrar conductor | Por hacer | 3 |
| US-006 | Registrar cliente | Por hacer | 3 |

### 2.1 Avance de HUs

- HUs comprometidas: **6**
- HUs en estado **Listo**: **0**
- HUs en estado **En revisión / QA**: **1**
- HUs en estado **En curso**: **1**
- HUs en estado **Por hacer**: **4**
- Porcentaje de HUs terminadas según Jira: **0 % (0/6)**

### 2.2 Avance por Story Points

- SP comprometidos: **20**
- SP en estado Listo: **0 SP**
- SP en En revisión / QA: **3 SP**
- SP en En curso: **3 SP**
- SP pendientes en Por hacer: **14 SP**
- SP terminados según Jira: **0 % (0/20)**

## 3. Subtareas registradas en las HUs con avance

### US-001 Registrar vehículo

- ECO-30 Definir campos y validaciones del vehículo → **Listo**
- ECO-31 Implementar registro de vehículo → **Listo**
- ECO-32 Probar registro de vehículo → **Por hacer**

Resultado Jira: **2/3 subtareas** registradas como terminadas.

### US-002 Consultar vehículos

- ECO-33 Definir consulta y filtros de vehículos → **Por hacer**
- ECO-34 Implementar consulta y visualización de la flota → **Listo**
- ECO-35 Probar consulta y filtros → **Por hacer**

Resultado Jira: **1/3 subtareas** registradas como terminadas.

## 4. Velocidad y métricas del equipo

### Velocidad estimada del Sprint

La planificación comprometió **20 SP** para Sprint 1.

### Velocidad observada a este checkpoint

El tablero registra **0 SP en estado Listo**, por lo que la velocidad cerrada observable en Jira en este momento es **0 SP**.

> Esta cifra no debe interpretarse como una velocidad histórica estable del equipo. Es solamente el resultado registrado en el tablero para este Sprint antes de su cierre.

### Burndown / Burnup

No se reconstruye una serie diaria con datos inventados. El material disponible en este checkpoint es un estado puntual del tablero. Para el cierre del informe se deberá incorporar el gráfico o historial de Jira, si se cuenta con él.

## 5. Avance técnico del incremento

El repositorio contiene un primer incremento funcional del módulo de vehículos con:

- Backend en **Python + FastAPI**.
- Persistencia en **PostgreSQL** mediante SQLAlchemy.
- Frontend en **React + Vite**.
- Endpoints para listar, consultar, registrar, actualizar y eliminar vehículos.
- Validaciones de entrada y control de placa duplicada.
- Interfaz para registrar vehículos y consultar la flota.

La estructura actual del repositorio muestra un primer avance funcional, pero todavía requiere una reorganización adicional para cumplir completamente el esquema modular por capas solicitado para la implementación.

## 6. Milestones técnicos

| Milestone | Estado |
|---|---|
| Base del backend FastAPI | Implementado |
| Modelo de vehículo y persistencia | Implementado |
| API inicial de vehículos | Implementado |
| Interfaz React de registro/consulta | Implementado |
| Pruebas del registro de vehículo | Pendiente de evidencia de ejecución |
| Pruebas de consulta/filtros | Pendiente de evidencia de ejecución |
| Arquitectura modular por capas | Pendiente de refactorización |

## 7. Situación global del PFA

La planificación Agile, el backlog inicial, los artefactos de Jira y la definición del Sprint 1 se encuentran preparados. En este checkpoint el proyecto se encuentra en la etapa de **implementación inicial del Sprint 1**.

El porcentaje global del PFA completo **no se calcula en este documento** porque no se dispone aquí de una fórmula oficial de avance global ni de una medición consolidada de todos los entregables del PFA.

## 8. Conclusión del checkpoint

El Sprint 1 presenta un incremento funcional concentrado en la gestión inicial de vehículos y una parte de la consulta de flota. El tablero todavía no registra historias en estado Listo, por lo que el cumplimiento final del Sprint debe documentarse después de revisar pruebas, criterios de aceptación, Definition of Done y aceptación del Product Owner.

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_0_0 | 2026-09-22 | Creación del informe con el estado real disponible del Sprint 1. |

[← Volver al README](../../README.md)
