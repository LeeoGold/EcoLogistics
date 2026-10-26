# 🚚 EcoLogística Huancayo

## Plataforma de gestión y optimización de rutas logísticas

EcoLogística Huancayo es un proyecto de desarrollo de software orientado a apoyar la gestión de operaciones de distribución de última milla en Huancayo. La propuesta busca organizar pedidos, recursos logísticos y rutas, considerando factores operativos y ambientales.

> **Estado del proyecto:** la plataforma cuenta con módulos de gestión y una primera planificación manual de rutas (`US-013`). El Sprint 3 reúne entregables de revisión, retrospectiva, calidad de código, seguridad y accesibilidad. El cierre de las auditorías de seguridad y accesibilidad, así como la confirmación de métricas globales en SonarQube, siguen pendientes.

## Estado técnico verificado

Los siguientes resultados corresponden a ejecuciones locales del entorno de desarrollo, no a una certificación completa del sistema ni a métricas globales de SonarQube.

| Verificación | Resultado |
|---|---|
| Pruebas automatizadas del backend | **47 aprobadas de 47** |
| Cobertura local del backend (`pytest-cov`) | **97 %** |
| Compilación de producción del frontend | **Correcta con Vite 8.3.5** |
| Módulos transformados durante la compilación | **44** |
| Auditoría de dependencias npm | **0 vulnerabilidades reportadas** |
| Auditoría local de dependencias Python (`pip-audit`) | **No se encontraron vulnerabilidades conocidas en esa ejecución** |
| Advertencias pendientes | Starlette advierte sobre el uso de `httpx` con `TestClient`; requiere revisar la compatibilidad recomendada |

La cobertura del 97 % corresponde al backend local analizado por `pytest-cov`. No debe interpretarse como cobertura global de SonarQube. La auditoría `npm audit` tampoco sustituye una revisión completa de seguridad de la aplicación.

## Incremento técnico actual: planificación operativa de rutas

La historia `US-013` incorpora una primera planificación **manual** de rutas sobre las tablas `rutas`, `asignaciones_conductor` y `detalle_ruta`. El flujo permite registrar una ruta planificada con conductor, vehículo, fecha, hora y pedidos ordenados. El backend valida condiciones operativas como el estado de los recursos, la disponibilidad horaria del conductor y la capacidad total; los pedidos incluidos cambian a estado `ASIGNADO` dentro de la misma transacción.

### Endpoints de rutas

| Endpoint | Propósito |
|---|---|
| `GET /api/rutas` | Listar rutas planificadas y el resumen de asignaciones. |
| `GET /api/rutas/{ruta_id}` | Consultar una ruta. |
| `POST /api/rutas` | Crear una ruta y asignar uno o más pedidos. |

La funcionalidad actual es una planificación manual inicial. **Todavía no representa una optimización automática** y no calcula distancias reales por carretera, tiempos de llegada, consumo de combustible ni emisiones de una ruta. Para esos cálculos será necesario integrar geolocalización y un motor de rutas.

Consulta el alcance, las reglas y las limitaciones de esta historia en [US-013 · Planificación operativa de rutas](docs/04-desarrollo/US-013-planificacion-rutas.md).

---

## 📌 Descripción del proyecto

La plataforma busca centralizar la información necesaria para organizar las operaciones logísticas. El alcance funcional previsto comprende:

- Gestión de vehículos.
- Gestión de conductores.
- Gestión de clientes.
- Gestión de pedidos.
- Planificación de rutas y asignaciones.
- Seguimiento de entregas e incidencias, como evolución del proyecto.
- Indicadores operativos y ambientales.

Estas funciones no deben interpretarse como implementadas en su totalidad: el estado de cada capacidad depende del incremento desarrollado y de su evidencia técnica correspondiente.

## 🎯 Objetivo

Desarrollar una plataforma web que apoye la gestión de operaciones logísticas y permita evolucionar hacia propuestas de rutas optimizadas, buscando mejorar la organización de las entregas y aportar indicadores relacionados con costos, combustible y emisiones.

## 🌱 Propuesta de valor

EcoLogística Huancayo busca integrar en una misma plataforma la gestión logística, la planificación de rutas, la visualización geográfica, los indicadores de sostenibilidad, la adaptación ante cambios operativos y la trazabilidad de las operaciones.

La optimización automática, el cálculo de rutas reales y los controles completos de acceso por roles forman parte de la evolución prevista y no se declaran como implementados por el solo hecho de aparecer en el objetivo del proyecto.

## 👥 Perfiles de usuario previstos

| Perfil | Función prevista |
|---|---|
| Administrador | Gestionar usuarios, permisos y configuración. |
| Operador logístico | Gestionar pedidos y planificar rutas. |
| Conductor | Consultar rutas y entregas asignadas. |
| Cliente | Proporcionar y consultar su propia información autorizada. |
| Responsable de operaciones | Consultar indicadores y resultados logísticos. |
| Auditor | Consultar información autorizada para revisión. |

La autenticación y autorización por roles deben verificarse en el código y en las pruebas antes de presentar estos perfiles como controles de acceso funcionales.

## ⚙️ Funcionalidades del proyecto

### Gestión

- Gestión de vehículos, conductores, clientes y pedidos.
- Validación de datos operativos.
- Asignación de pedidos a una planificación de ruta.

### Planificación y optimización

- Planificación manual de rutas.
- Organización de pedidos y asignación de recursos.
- Consideración de restricciones operativas.
- Evolución futura hacia evaluación de alternativas y reoptimización.

### Visualización e indicadores

- Visualización de rutas y puntos de entrega como capacidad prevista.
- Información operativa para supervisar las entregas.
- Indicadores logísticos y ambientales como evolución posterior.

### Seguridad

- Revisar e implementar la autenticación y autorización según las necesidades del sistema.
- Aplicar el principio de mínimo privilegio.
- Registrar las acciones operativas relevantes sin exponer secretos ni datos sensibles.
- Validar los controles de acceso a nivel de API y de recurso.

Los puntos anteriores describen el alcance objetivo; no constituyen por sí mismos evidencia de que todas esas capacidades estén implementadas.

## 🧠 Evolución prevista de la optimización de rutas

El proyecto contempla estudiar técnicas de optimización para el problema de ruteo. El flujo conceptual es:

```text
Pedidos
   ↓
Vehículos
   ↓
Conductores
   ↓
Restricciones operativas
   ↓
Motor de optimización
   ↓
Ruta propuesta
   ↓
Indicadores
```

Este diagrama representa la dirección técnica prevista. La funcionalidad validada actualmente para `US-013` es la planificación manual y no un motor de optimización automática.

---

## 🏗️ Arquitectura y diseño técnico

Los siguientes documentos contienen el diseño técnico y las decisiones documentadas del proyecto:

| Documento | Enlace |
|---|---|
| Stack tecnológico | [10. Stack tecnológico V_1_1_0](docs/01%20Inicio/10.%20Stack%20tecnol%C3%B3gico%20V_1_1_0.md) |
| Base de datos | [11. Base de datos V_1_2_0](docs/01%20Inicio/11.%20Base%20de%20datos%20V_1_2_0.md) |
| Modelo C4 | [12. Modelo C4 V_1_2_0](docs/01%20Inicio/12.%20Modelo%20C4%20V_1_2_0.md) |
| Restricciones | [13. Restricciones V_1_2_0](docs/01%20Inicio/13.%20Restricciones%20V_1_2_0.md) |

## 📅 Planificación del proyecto

La planificación ágil y sus evidencias se encuentran en `docs/02 Planificación/`.

| Artefacto | Documento |
|---|---|
| Transformación a ágil | [01 Transformando a ágil V_1_0_0](docs/02%20Planificaci%C3%B3n/01%20Transformando%20a%20%C3%A1gil%20V_1_0_0.md) |
| Artefactos Jira | [02 Artefactos Jira V_1_1_0](docs/02%20Planificaci%C3%B3n/02%20Artefactos%20Jira%20V_1_1_0.md) |
| Registro de riesgos | [03 Registro de riesgos V_1_1_0](docs/02%20Planificaci%C3%B3n/03%20Registro%20de%20riesgos%20V_1_1_0.md) |
| Presupuesto | [04 Presupuesto del proyecto V_1_0_0](docs/02%20Planificaci%C3%B3n/04%20Presupuesto%20del%20proyecto%20V_1_0_0.md) |

### Resumen de planificación ágil

Este es el resumen de planificación registrado en la documentación del proyecto; debe contrastarse con Jira si se necesita confirmar el estado más reciente.

| Elemento | Cantidad registrada |
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

## 🛠️ Implementación por Sprints

Los entregables se organizan por iteración dentro de `docs/03 Implementación/`. Los Sprints 1 y 2 se conservan como historial y el Sprint 3 contiene los documentos de revisión de calidad y evaluación.

| Iteración | Índice | Alcance documentado |
|---|---|---|
| Sprint 1 | [Índice del Sprint 1](docs/03%20Implementaci%C3%B3n/Sprint%201/README.md) | Incremento inicial de gestión de vehículos; Jira registró 2 HUs completadas de 6 comprometidas y 6 SP de 20 al cierre. |
| Sprint 2 | [Índice del Sprint 2](docs/03%20Implementaci%C3%B3n/Sprint%202/README.md) | Incrementos de gestión operativa y flota; el registro documental consigna un alcance técnico de 5 historias y 17 SP. |
| Sprint 3 | [Índice del Sprint 3](docs/03%20Implementaci%C3%B3n/Sprint%2003/README.md) | Revisión del Sprint, retrospectiva, calidad de código, seguridad OWASP y accesibilidad WCAG. |

### Entregables documentales del Sprint 1

| Documento | Versión registrada |
|---|---|
| Informe de estado | [01 Informe de estado del proyecto V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/01%20Informe%20de%20estado%20del%20proyecto%20V_1_2_0.md) |
| Registro de impedimentos | [02 Registro de Impedimentos V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/02%20Registro%20de%20Impedimentos%20V_1_2_0.md) |
| Revisión del Sprint | [03 Revisión del Sprint V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/03%20Revisi%C3%B3n%20del%20Sprint%20V_1_2_0.md) |
| Retrospectiva | [04 Retrospectiva del Sprint V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/04%20Retrospectiva%20del%20Sprint%20V_1_2_0.md) |
| Registro de riesgos complementario | [05 Registro de riesgos V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/05%20Registro%20de%20riesgos%20V_1_2_0.md) |

### Entregables documentales del Sprint 2

| Documento | Versión registrada |
|---|---|
| Informe de estado | [01 Informe de estado del proyecto V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%202/01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) |
| Registro de impedimentos | [02 Registro de Impedimentos V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%202/02%20Registro%20de%20Impedimentos%20V_1_0_0.md) |
| Revisión del Sprint | [03 Revisión del Sprint V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%202/03%20Revisi%C3%B3n%20del%20Sprint%20V_1_0_0.md) |
| Retrospectiva | [04 Retrospectiva del Sprint V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%202/04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) |

### Entregables de evaluación del Sprint 3

| Documento | Propósito y estado |
|---|---|
| [README del Sprint 3](docs/03%20Implementaci%C3%B3n/Sprint%2003/README.md) | Índice de entregables y criterios de cierre. |
| [01 Revisión del Sprint V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%2003/01%20Revisi%C3%B3n%20del%20Sprint%20V_1_0_0.md) | Alcance real, demostración técnica, resultados y pendientes. |
| [02 Retrospectiva del Sprint V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%2003/02%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) | Aprendizajes y propuestas medibles de mejora. |
| [03 Calidad de código V_1_0_0](docs/03%20Implementaci%C3%B3n/Sprint%2003/03%20Calidad%20de%20c%C3%B3digo%20V_1_0_0.md) | Calidad, cobertura, duplicación, incidencias y remediación. |
| [04 OWASP V_1_0_1](docs/03%20Implementaci%C3%B3n/Sprint%2003/04%20OWASP%20V_1_0_1.md) | Matriz OWASP Top 10:2025; SEC-001 y SEC-002 abiertos; remediación pendiente. |
| [05 WCAG V_1_0_1](docs/03%20Implementaci%C3%B3n/Sprint%2003/05%20WCAG%20V_1_0_1.md) | Lighthouse en Inicio: 100/100 en el informe registrado; pruebas manuales favorables de foco, navegación y activación por teclado en controles probados; otras comprobaciones y vistas pendientes. |

### Métricas técnicas por iteración

| Métrica | Sprint 1 | Sprint 2 | Estado local reciente |
|---|---:|---:|---:|
| Pruebas automatizadas del backend | 11/11 | 30/30 | 47/47 |
| Cobertura de `app` en la ejecución local documentada | 99 % | 98 % | 97 % |

Las métricas pertenecen a ejecuciones e incrementos distintos. No deben sumarse ni tratarse como una única ejecución continua. La validación local reciente corresponde a 47 pruebas aprobadas y un 97 % de cobertura del backend.

---

## 🤖 Ingeniería de software aumentada con IA

El proyecto cuenta con una preparación documental para continuar con un flujo de desarrollo *spec-driven* mediante OpenSpec y OpenCode.

- **OpenSpec:** estructura de cambios y especificaciones bajo el esquema *spec-driven*.
- **OpenCode:** entorno de trabajo preparado con *skills* y comandos del flujo de OpenSpec.
- **Evolución posterior:** la especificación de MFA/TOTP corresponde a una etapa futura; no se declara como funcionalidad implementada en los Sprints documentados.

## 🧪 Calidad, seguridad y accesibilidad

### Calidad de código

- Backend: 47 pruebas aprobadas de 47 y 97 % de cobertura local en la ejecución reciente.
- Frontend: compilación de producción correcta con Vite 8.3.5 y 44 módulos transformados.
- Dependencias npm: `npm audit` reportó cero vulnerabilidades en la ejecución registrada.
- Pendiente: confirmar la cobertura global y las incidencias actuales directamente en SonarQube Cloud.

### Seguridad

El análisis de SonarQube registrado para el PR #6 indicó *Quality Gate passed*, cero incidencias nuevas y cero *Security Hotspots* en ese análisis. Es una evidencia histórica favorable sobre el pull request, pero **no equivale a una auditoría completa de OWASP Top 10:2025 ni garantiza que toda la aplicación esté libre de vulnerabilidades**.

La matriz OWASP sigue en revisión. En la inspección preliminar del backend no se localizó un flujo de autenticación/autorización claramente conectado a los endpoints examinados, aunque existen variables de configuración relacionadas con tokens. Esto constituye una **brecha de verificación prioritaria**: no debe afirmarse que la API está protegida por roles hasta comprobar e implementar los controles correspondientes y probarlos. La observación se limita a los módulos inspeccionados y no sustituye una auditoría exhaustiva del despliegue.

También deben verificarse la configuración de seguridad, las dependencias, la validación de entradas, el tratamiento de errores, el registro de eventos y el resto de las categorías incluidas en el informe.

### Accesibilidad

El informe registrado de Lighthouse 13.4.1 obtuvo 100/100 en la carga inicial de Inicio, con 18 auditorías automáticas aprobadas y ninguna fallida. El resultado no abarca todas las vistas ni demuestra por sí solo conformidad completa con WCAG 2.2 AA. La revisión manual de Inicio comprobó el foco visible, el orden lógico, el recorrido sin trampa de foco y la activación por teclado de los controles probados; otras comprobaciones y vistas siguen pendientes.

Los informes y planes de verificación se encuentran en el [índice de Sprint 3](docs/03%20Implementaci%C3%B3n/Sprint%2003/README.md).

## ✅ Pendientes para el cierre de Sprint 3

- [x] Ejecutar las pruebas locales del backend: 47 aprobadas de 47.
- [x] Compilar el frontend con Vite 8.3.5.
- [x] Ejecutar `npm audit`: cero vulnerabilidades reportadas en esa ejecución.
- [ ] Revisar la cobertura global y las incidencias actuales en SonarQube Cloud.
- [ ] Completar la revisión manual de OWASP Top 10:2025 y documentar evidencias por categoría, priorizando autenticación y autorización.
- [ ] La revisión manual de Inicio comprobó foco visible, orden lógico, navegación sin trampa de foco y activación por teclado de los controles probados. Las demás comprobaciones y vistas siguen pendientes.
- [ ] Confirmar los enlaces de navegación y actualizar los documentos de calidad, seguridad y accesibilidad con resultados de las comprobaciones finales.

## 📂 Estructura principal del repositorio

```text
EcoLogistics/
├── backend/
├── frontend/
├── database/
├── docs/
│   ├── 01 Inicio/
│   ├── 02 Planificación/
│   ├── 03 Implementación/
│   │   ├── README.md
│   │   ├── Sprint 1/
│   │   ├── Sprint 2/
│   │   └── Sprint 03/
│   └── 04-desarrollo/
├── .gitignore
├── DEV_SETUP.md
└── README.md
```

## 🔧 Flujo de desarrollo y configuración local

- [Guía de configuración del entorno](DEV_SETUP.md)
- [Flujo Git/Gitflow del proyecto](docs/04-desarrollo/GITFLOW.md)

El flujo de trabajo definido utiliza `develop` para la integración del desarrollo y ramas `feature/` o `fix/` para aislar funcionalidades y correcciones. `main` se reserva para incrementos estables siguiendo el procedimiento acordado por el proyecto.

## 📜 Historial de cambios del README

| Versión | Fecha | Cambio |
|---|---|---|
| V_1_0_0 | 2026-09-22 | Incorporación del índice de implementación del Sprint 1. |
| V_1_1_0 | 2026-09-23 | Actualización de arquitectura técnica, cierre del Sprint 1, evidencias, QA, versionado y flujo de ingeniería aumentada con IA. |
| V_1_2_0 | 2026-10-09 | Separación por Sprint, conservación de versiones y navegación bidireccional. |
| V_1_3_0 | 2026-10-23 | Reorganización integral; actualización de resultados técnicos locales, limitaciones de `US-013` y entregables de evaluación del Sprint 3. |

---

**Proyecto final de asignatura — Ingeniería de Sistemas de Información**

[Volver al inicio](#-ecolog%C3%ADstica-huancayo)
