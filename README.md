# 🚚 EcoLogística Huancayo

## Plataforma de gestión y optimización de rutas logísticas

EcoLogística Huancayo es un proyecto de desarrollo de software orientado a la gestión y optimización de operaciones de distribución de última milla en Huancayo.

La propuesta busca apoyar la planificación de rutas considerando factores operativos y ambientales como distancia, tiempo, consumo de combustible, emisiones de CO₂, ventanas de entrega y restricciones de operación.

> **Estado actual:** Sprint 1 cerrado. Jira registró **2 HUs completadas de 6 comprometidas**, equivalentes a **6 SP de 20 SP**. El incremento funcional validado corresponde principalmente a gestión de vehículos.

---

# 📌 Descripción del proyecto

EcoLogística Huancayo propone una plataforma web para apoyar la planificación y supervisión de operaciones logísticas.

El sistema está diseñado para gestionar:

- Vehículos.
- Conductores.
- Clientes.
- Pedidos.
- Rutas.
- Entregas.
- Incidencias.
- Indicadores logísticos y ambientales.

El componente central del proyecto será un motor de optimización de rutas capaz de evaluar alternativas considerando múltiples restricciones y objetivos.

# 🎯 Objetivo

Desarrollar una plataforma web que permita gestionar operaciones logísticas y generar propuestas de rutas optimizadas, buscando mejorar la eficiencia de las entregas y proporcionar indicadores relacionados con costos, combustible y emisiones.

# 🌱 Propuesta de valor

EcoLogística Huancayo integra en una misma plataforma gestión logística, optimización de rutas, visualización geográfica, indicadores de sostenibilidad, reoptimización ante cambios operativos, control de acceso por roles y trazabilidad de operaciones.

# 👥 Usuarios principales

| Rol | Función principal |
|---|---|
| **Administrador** | Gestionar usuarios, permisos y configuración. |
| **Operador logístico** | Gestionar pedidos y planificar rutas. |
| **Conductor** | Consultar rutas y entregas asignadas. |
| **Cliente** | Proporcionar y consultar información propia autorizada. |
| **Responsable de operaciones** | Consultar indicadores y resultados logísticos. |
| **Auditor** | Consultar información autorizada para revisión. |

# ⚙️ Principales funcionalidades previstas

### Gestión
- Gestión de usuarios y roles.
- Gestión de vehículos.
- Gestión de conductores.
- Gestión de clientes.
- Gestión de pedidos.

### Optimización
- Generación de rutas.
- Evaluación de alternativas.
- Consideración de restricciones operativas.
- Reoptimización ante cambios.

### Visualización
- Visualización de rutas y puntos de entrega.
- Información operativa.
- Indicadores logísticos y ambientales.

### Seguridad
- Autenticación.
- Autorización basada en roles.
- Principio de mínimo privilegio.
- Trazabilidad de operaciones.

# 🧠 Optimización de rutas

El proyecto considera técnicas metaheurísticas para resolver el problema de ruteo.

```text
Pedidos
   ↓
Vehículos
   ↓
Conductores
   ↓
Restricciones
   ↓
Motor de optimización
   ↓
Ruta propuesta
   ↓
Indicadores
```

---

# 🏗️ Arquitectura y diseño técnico

Los siguientes documentos contienen el diseño técnico actualizado a **V_1_1_0**:

| Documento | Enlace |
|---|---|
| Stack tecnológico | [10. Stack tecnológico V_1_1_0](docs/01%20Inicio/10.%20Stack%20tecnológico%20V_1_1_0.md) |
| Base de datos | [11. Base de datos V_1_1_0](docs/01%20Inicio/11.%20Base%20de%20datos%20V_1_1_0.md) |
| Modelo C4 | [12. Modelo C4 V_1_1_0](docs/01%20Inicio/12.%20Modelo%20C4%20V_1_1_0.md) |
| Restricciones | [13. Restricciones V_1_1_0](docs/01%20Inicio/13.%20Restricciones%20V_1_1_0.md) |

---

# 📅 Planificación del proyecto

La planificación Agile y sus evidencias se encuentran en `docs/02 Planificación/`.

| Artefacto | Documento |
|---|---|
| Transformación a ágil | [01 Transformando a ágil V_1_0_0](docs/02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_0.md) |
| Artefactos Jira | [02 Artefactos Jira V_1_1_0](docs/02%20Planificación/02%20Artefactos%20Jira%20V_1_1_0.md) |
| Registro de riesgos | [03 Registro de riesgos V_1_1_0](docs/02%20Planificación/03%20Registro%20de%20riesgos%20V_1_1_0.md) |
| Presupuesto del proyecto | [04 Presupuesto del proyecto V_1_0_0](docs/02%20Planificación/04%20Presupuesto%20del%20proyecto%20V_1_0_0.md) |

## Resumen de planificación Agile

| Elemento | Cantidad |
|---|---:|
| Épicas | 6 |
| Stories | 10 |
| Enablers | 12 |
| Subtasks | 66 |
| Actividades principales | 22 |
| Story Points de Stories | 51 |
| Story Points de Enablers | 48 |
| Story Points totales estimados | 99 |

---

# 🛠️ Implementación del Sprint 1

Los entregables de implementación, estado, impedimentos, riesgos, revisión, retrospectiva y evidencias se encuentran en `docs/03 Implementación/`.

| Artefacto | Documento |
|---|---|
| Índice de implementación | [README de implementación](docs/03%20Implementación/README.md) |
| Estado del proyecto | [01 Informe de estado V_1_1_0](docs/03%20Implementación/01%20Informe%20de%20estado%20del%20proyecto%20V_1_1_0.md) |
| Impedimentos | [02 Registro de Impedimentos V_1_1_0](docs/03%20Implementación/02%20Registro%20de%20Impedimentos%20V_1_1_0.md) |
| Riesgos | [03 Registro de riesgos V_1_1_0](docs/03%20Implementación/03%20Registro%20de%20riesgos%20V_1_1_0.md) |
| Revisión del Sprint | [04 Revisión del Sprint V_1_1_0](docs/03%20Implementación/04%20Revisión%20del%20Sprint%20V_1_1_0.md) |
| Retrospectiva | [05 Retrospectiva del Sprint V_1_1_0](docs/03%20Implementación/05%20Retrospectiva%20del%20Sprint%20V_1_1_0.md) |

## Resultado del Sprint 1

| Métrica | Resultado |
|---|---:|
| HUs comprometidas | 6 |
| HUs completadas | 2 |
| HUs abiertas | 4 |
| SP comprometidos | 20 |
| SP completados | 6 |
| SP pendientes | 14 |
| Cumplimiento por HUs | 33,3 % |
| Cumplimiento por SP | 30 % |
| Velocidad Jira | 6 SP |
| Pruebas automatizadas | 11/11 aprobadas |
| Cobertura | 99 % |

---

# 🤖 Ingeniería de software aumentada con IA

El proyecto fue preparado para continuar con un flujo de desarrollo **spec-driven** mediante **OpenSpec** y **OpenCode**.

- **OpenSpec:** estructura de cambios y especificaciones bajo el esquema `spec-driven`.
- **OpenCode:** entorno de trabajo preparado con skills y comandos del flujo de OpenSpec.
- **Siguiente evolución preparada:** especificación de MFA/TOTP para una etapa posterior.

> La especificación de MFA/TOTP pertenece a una evolución posterior y no se declara como funcionalidad implementada dentro del Sprint 1.

# 🧪 Calidad y evidencia técnica

Durante la validación del incremento de vehículos se obtuvo:

```text
11 pruebas ejecutadas
11 pruebas aprobadas
0 fallos
99 % de cobertura sobre app
compileall → sin errores
pip check → No broken requirements found
```

La revisión documental mediante Pull Request también quedó registrada y aprobada.

# 📂 Estructura principal del repositorio

```text
EcoLogistics/
├── backend/
├── frontend/
├── database/
├── docs/
│   ├── 01 Inicio/
│   ├── 02 Planificación/
│   └── 03 Implementación/
├── .gitignore
└── README.md
```

# 📜 Historial de cambios del README

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_0_0 | 2026-09-22 | Incorporación del índice de implementación del Sprint 1. |
| V_1_1_0 | 2026-09-23 | Actualización integral del README con arquitectura técnica, cierre del Sprint 1, evidencias, QA, versionado y flujo de ingeniería aumentada con IA. |

---

**Proyecto Final de Asignatura — Ingeniería de Sistemas de Información**

[Volver al inicio](#-ecolog%C3%ADstica-huancayo)
