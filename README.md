# 🚚 EcoLogística Huancayo

## Plataforma de gestión y optimización de rutas logísticas

EcoLogística Huancayo es un proyecto de desarrollo de software orientado a la gestión y optimización de operaciones de distribución de última milla en Huancayo.

La propuesta busca apoyar la planificación de rutas considerando diferentes factores operativos y ambientales, entre ellos la distancia recorrida, el tiempo, el consumo de combustible, las emisiones de CO₂, las ventanas de entrega y las restricciones de operación.

> **Estado actual:** Fase de análisis de requisitos y diseño arquitectónico.

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

El componente central del proyecto será un motor de optimización de rutas capaz de evaluar diferentes alternativas considerando múltiples restricciones y objetivos.

---

# 🎯 Objetivo

Desarrollar una plataforma web que permita gestionar operaciones logísticas y generar propuestas de rutas optimizadas, buscando mejorar la eficiencia de las entregas y proporcionar indicadores relacionados con costos, combustible y emisiones.

---

# 🌱 Propuesta de valor

EcoLogística Huancayo busca integrar en una misma plataforma:

- Gestión logística.
- Optimización de rutas.
- Visualización geográfica.
- Indicadores de sostenibilidad.
- Reoptimización ante cambios operativos.
- Control de acceso según roles.
- Trazabilidad de operaciones.

A diferencia de una planificación exclusivamente manual, la propuesta considera múltiples criterios para evaluar las alternativas de ruta.

---

# 👥 Usuarios principales

El sistema considera los siguientes perfiles:

| Rol | Función principal |
|---|---|
| **Administrador** | Gestionar usuarios, permisos y configuración. |
| **Operador logístico** | Gestionar pedidos y planificar rutas. |
| **Conductor** | Consultar rutas y entregas asignadas. |
| **Cliente** | Proporcionar y consultar información propia autorizada. |
| **Responsable de operaciones** | Consultar indicadores y resultados logísticos. |
| **Auditor** | Consultar información autorizada para revisión. |

---

# ⚙️ Principales funcionalidades previstas

## Gestión

- Gestión de usuarios y roles.
- Gestión de vehículos.
- Gestión de conductores.
- Gestión de clientes.
- Gestión de pedidos.

## Optimización

- Generación de rutas.
- Evaluación de alternativas.
- Consideración de restricciones operativas.
- Reoptimización ante cambios.

## Visualización

- Visualización de rutas.
- Puntos de entrega.
- Información operativa.
- Indicadores logísticos y ambientales.

## Seguridad

- Autenticación.
- Autorización basada en roles.
- Principio de mínimo privilegio.
- Trazabilidad de operaciones.

---

# 🧠 Optimización de rutas

El proyecto considera la utilización de técnicas metaheurísticas para resolver el problema de ruteo.

El proceso conceptual es:

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

# 📅 Planificación del proyecto

La planificación Agile y sus evidencias se encuentran en `docs/02 Planificación/`.

| Artefacto | Documento |
|---|---|
| Transformación a ágil | [01 Transformando a ágil V_1_0_0](docs/02%20Planificación/01%20Transformando%20a%20ágil%20V_1_0_0.md) |
| Artefactos Jira | [02 Artefactos Jira V_1_0_0](docs/02%20Planificación/02%20Artefactos%20Jira%20V_1_0_0.md) |
| Registro de riesgos | [03 Registro de riesgos V_1_0_0](docs/02%20Planificación/03%20Registro%20de%20riesgos%20V_1_0_0.md) |
| Presupuesto del proyecto | [04 Presupuesto del proyecto V_1_0_0](docs/02%20Planificación/04%20Presupuesto%20del%20proyecto%20V_1_0_0.md) |
