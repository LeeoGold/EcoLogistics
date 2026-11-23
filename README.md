# EcoLogística Huancayo (EcoLogistics)

[![CI](https://github.com/LeeoGold/EcoLogistics/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/LeeoGold/EcoLogistics/actions/workflows/ci.yml)
[![Tests and E2E](https://github.com/LeeoGold/EcoLogistics/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/LeeoGold/EcoLogistics/actions/workflows/tests.yml)
[![Green IT Audit](https://github.com/LeeoGold/EcoLogistics/actions/workflows/green-audit.yml/badge.svg?branch=main)](https://github.com/LeeoGold/EcoLogistics/actions/workflows/green-audit.yml)
[![Deploy Production](https://github.com/LeeoGold/EcoLogistics/actions/workflows/deploy-production.yml/badge.svg?branch=main)](https://github.com/LeeoGold/EcoLogistics/actions/workflows/deploy-production.yml)

**Plataforma web académica para la gestión de operaciones logísticas y la planificación manual de rutas de última milla en Huancayo.**

EcoLogística Huancayo organiza la información de clientes, pedidos, conductores, vehículos y rutas. Su propósito es ofrecer una base operativa para registrar y consultar información, gestionar la flota y planificar asignaciones de reparto. El producto implementado debe describirse de acuerdo con sus capacidades verificadas: **la versión actual permite planificar rutas manualmente; no implementa un motor de optimización automática, cartografía de recorridos ni cálculo de emisiones por entrega**.

> **Estado del repositorio al 21/11/2026:** la rama principal es `main` y su último commit revisado es [`0c36fd44`](https://github.com/LeeoGold/EcoLogistics/commit/0c36fd4402b12ef4a7835c878a538a1d1fbc44c1), integrado el 17/11/2026. La Release publicada `v1.0.0 — Green IT Release` se creó el 04/11/2026 y representa una versión anterior de la línea de desarrollo; no debe confundirse con el estado más reciente de `main`.

## Accesos rápidos

| Recurso | Acceso |
|---|---|
| Aplicación web desplegada | [Abrir EcoLogística](https://ecologistics-frontend.onrender.com) |
| Estado de salud de la API | [API — `/health`](https://ecologistics.onrender.com/health) |
| Repositorio y código fuente | [GitHub — LeeoGold/EcoLogistics](https://github.com/LeeoGold/EcoLogistics) |
| Release Green IT `v1.0.0` | [Ver release](https://github.com/LeeoGold/EcoLogistics/releases/tag/v1.0.0) |
| Pull requests | [Historial de integración](https://github.com/LeeoGold/EcoLogistics/pulls?q=is%3Apr+is%3Amerged) |
| Automatizaciones | [GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions) |
| Preparación del entorno | [DEV_SETUP.md](DEV_SETUP.md) |

**Entorno de demostración:** el responsable del proyecto confirmó el 21/11/2026 que la importación de registros ficticios en Neon terminó correctamente y que las cuentas de demostración permiten iniciar sesión. El conjunto preparado contempla 8 usuarios (3 administradores y 5 operadores), 15 clientes, 15 conductores, 15 vehículos, 24 pedidos, 13 rutas, 13 asignaciones y 24 detalles de ruta. Las contraseñas no se publican en este README. Estos datos son exclusivamente demostrativos y no representan información real de clientes.

## 1. Propósito, alcance y estado funcional

El proyecto comenzó con una visión más amplia que incluía gestión logística, optimización automática de rutas, visualización cartográfica, indicadores ambientales y reoptimización. La implementación entregada consolidó una plataforma operativa de gestión y **planificación manual**. Esta diferencia se mantiene explícita en el cierre: no existe evidencia de una aprobación formal de re-baselining que permita presentar las funcionalidades no implementadas como parte del alcance final aprobado.

### Módulos implementados

| Módulo | Capacidades disponibles en la versión revisada |
|---|---|
| Autenticación | Inicio de sesión, validación de la sesión y obtención del perfil autenticado mediante la API, con control de acceso por rol. |
| Dashboard | Resumen agregado de vehículos, clientes, pedidos y conductores. |
| Vehículos | Consulta y gestión de la flota, con acciones administrativas sujetas al rol. |
| Clientes | Registro, consulta y gestión de clientes. |
| Conductores | Registro, consulta y gestión de conductores. |
| Pedidos | Registro, consulta y filtrado de pedidos. |
| Rutas | Planificación manual, asignación de conductor y vehículo, validaciones de disponibilidad/capacidad y ordenamiento de pedidos. |

La historia [`US-013 — Planificación de rutas`](docs/04-desarrollo/US-013-planificacion-rutas.md) documenta el alcance implementado para rutas. La planificación no calcula rutas reales por carretera, distancias, ETA, consumo de combustible ni CO₂e por entrega. Estas capacidades requieren datos geográficos y una integración adicional con un proveedor o motor de rutas.

### Capacidades que no deben declararse como implementadas

- Optimización automática de recorridos mediante metaheurísticas.
- Cálculo geográfico de distancias, tiempos estimados de llegada o rutas sobre mapas.
- Reoptimización automática por cambios operativos o incidentes.
- Cálculo medido de consumo de combustible y emisiones por recorrido.
- Autenticación multifactor MFA/TOTP.
- Auditoría OWASP completa o certificación formal de seguridad.

Las mejoras Green IT descritas más adelante son optimizaciones técnicas del software (consultas, paginación, caché, compresión y carga de módulos); **no equivalen al cálculo ambiental de cada ruta logística**.

## 2. Arquitectura y tecnologías

El repositorio utiliza una arquitectura desacoplada de frontend y backend con persistencia relacional.

| Capa | Tecnologías | Responsabilidad |
|---|---|---|
| Frontend | React 19, Vite 8, JavaScript | Interfaz, navegación, formularios, tablas, filtros y paginación. |
| API / backend | Python, FastAPI, Pydantic | Endpoints, validación de datos, reglas de negocio y autorización. |
| Persistencia | SQLAlchemy, PostgreSQL, psycopg | Modelado y acceso a datos relacionales. |
| Pruebas backend | pytest, pytest-cov | Pruebas unitarias y de integración de la API. |
| Pruebas frontend | Vitest, Testing Library | Pruebas de componentes, servicios e integración de interfaz. |
| Pruebas de navegador | Playwright | Recorridos E2E en Chromium, Firefox y WebKit. |
| Calidad y automatización | GitHub Actions, Lighthouse CI, SonarQube Cloud | CI, pruebas, cobertura, análisis de calidad, auditoría de rendimiento y despliegue. |

La rúbrica Green IT incluye ejemplos basados en MERN, pero el proyecto no utiliza ese stack. La equivalencia se realiza con FastAPI y SQLAlchemy para la capa de API y acceso a datos, y PostgreSQL para persistencia relacional. No se incorporó MongoDB ni Express para imitar el ejemplo de la rúbrica.

### Organización del código

```text
EcoLogistics/
├── backend/                 # API FastAPI, servicios, repositorios, modelos y pruebas
├── frontend/                # Aplicación React/Vite, servicios, componentes y pruebas
├── database/                # Esquema y recursos de base de datos
├── docs/
│   ├── 01 Inicio/            # Visión, acta, requisitos, arquitectura y restricciones
│   ├── 02 Planificación/     # Scrum, Jira, riesgos, presupuesto y evidencias
│   ├── 03 Implementación/    # Sprints, calidad, Green IT y sus evidencias
│   ├── 04-desarrollo/        # Historias de usuario y flujo Git
│   ├── 04 Cierre/            # Siete reportes de cierre y anexos de evidencia
│   └── 05 Video proyecto/    # Guiones y evidencia audiovisual final
├── .github/workflows/        # CI, pruebas E2E, Green IT Audit y despliegue
├── .gitignore
├── DEV_SETUP.md
└── README.md
```

## 3. Navegación de la documentación del proyecto

La documentación se organiza siguiendo el ciclo de vida del proyecto. Cada índice de sección contiene enlaces hacia sus documentos y enlaces de retorno al README principal.

| Etapa | Índice | Contenido y propósito |
|---|---|---|
| Inicio y definición | [docs/01 Inicio](docs/01%20Inicio/README.md) | Selección del enfoque, acta de constitución, visión, interesados, requisitos funcionales/no funcionales, usuarios, reglas, stack, base de datos, modelo C4 y restricciones. |
| Planificación | [docs/02 Planificación](docs/02%20Planificaci%C3%B3n/README.md) | Transformación ágil, artefactos Jira, registro de riesgos, presupuesto y evidencias de planificación. |
| Implementación y validación | [docs/03 Implementación](docs/03%20Implementaci%C3%B3n/README.md) | Informes y retrospectivas de Sprints 1–4, calidad, OWASP, WCAG, Playwright, Green IT y evidencia técnica. |
| Desarrollo y control de versiones | [docs/04-desarrollo](docs/04-desarrollo/README.md) | Historias US-012 y US-013, además del flujo de ramas y Pull Requests. |
| Cierre administrativo y técnico | [docs/04 Cierre](docs/04%20Cierre/README.md) | Siete reportes solicitados por la evaluación final: estado, variación, EVM, tableros híbridos, radiadores, reporte final y lecciones aprendidas. |
| Evidencia audiovisual | [docs/05 Video proyecto](docs/05%20Video%20proyecto/README.md) | Requisitos del MP4, guion de cinco minutos y guion de sustentación de veinte minutos. |

### 3.1 Inicio y definición

- [Índice de Inicio](docs/01%20Inicio/README.md)
- [Acta de constitución](docs/01%20Inicio/02.%20Acta%20de%20constituci%C3%B3n%20V_1_0_0.md)
- [Requisitos funcionales](docs/01%20Inicio/06.%20Requisitos%20funcionales%20V_1_2_0.md)
- [Requisitos no funcionales](docs/01%20Inicio/07.%20Requisitos%20no%20funcionales%20V_1_0_0.md)
- [Modelo C4](docs/01%20Inicio/12.%20Modelo%20C4%20V_1_2_0.md)

### 3.2 Planificación

- [Índice de Planificación](docs/02%20Planificaci%C3%B3n/README.md)
- [Transformando a ágil](docs/02%20Planificaci%C3%B3n/01%20Transformando%20a%20%C3%A1gil%20V_1_0_0.md)
- [Artefactos Jira](docs/02%20Planificaci%C3%B3n/02%20Artefactos%20Jira%20V_1_1_0.md)
- [Registro de riesgos](docs/02%20Planificaci%C3%B3n/03%20Registro%20de%20riesgos%20V_1_1_0.md)
- [Presupuesto del proyecto](docs/02%20Planificaci%C3%B3n/04%20Presupuesto%20del%20proyecto%20V_1_0_0.md)
- [Evidencias de planificación](docs/02%20Planificaci%C3%B3n/evidencias/README.md)

### 3.3 Implementación por Sprints

| Iteración | Índice y documentos principales |
|---|---|
| Sprint 1 | [Índice](docs/03%20Implementaci%C3%B3n/Sprint%201/README.md) · [Informe de estado V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/01%20Informe%20de%20estado%20del%20proyecto%20V_1_2_0.md) · [Retrospectiva V_1_2_0](docs/03%20Implementaci%C3%B3n/Sprint%201/04%20Retrospectiva%20del%20Sprint%20V_1_2_0.md) |
| Sprint 2 | [Índice](docs/03%20Implementaci%C3%B3n/Sprint%202/README.md) · [Informe de estado](docs/03%20Implementaci%C3%B3n/Sprint%202/01%20Informe%20de%20estado%20del%20proyecto%20V_1_0_0.md) · [Retrospectiva](docs/03%20Implementaci%C3%B3n/Sprint%202/04%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) |
| Sprint 3 | [Índice](docs/03%20Implementaci%C3%B3n/Sprint%2003/README.md) · Calidad de código, análisis OWASP, accesibilidad WCAG, revisión y retrospectiva. |
| Sprint 4 | [Índice](docs/03%20Implementaci%C3%B3n/Sprint%204/README.md) · [Revisión](docs/03%20Implementaci%C3%B3n/Sprint%204/01%20Revisi%C3%B3n%20del%20Sprint%20V_1_0_0.md) · [Retrospectiva](docs/03%20Implementaci%C3%B3n/Sprint%204/02%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) · [Análisis Playwright](docs/03%20Implementaci%C3%B3n/Sprint%204/03%20Analisis%20PlayWrigth%20V_1_0_0.md) · [Instrumento SUS](docs/03%20Implementaci%C3%B3n/Sprint%204/04%20Usabilidad%20V_1_0_0.md) · [Evidencias](docs/03%20Implementaci%C3%B3n/Sprint%204/evidencias/README.md) |

Los informes de Sprint conservan resultados y estados correspondientes a sus fechas de corte. Los documentos Green IT también mantienen su corte de revisión (Release, PR #13 y mediciones de noviembre); las ejecuciones del 17/11/2026 que aparecen en este README y en el Reporte Final son posteriores. No se deben interpretar métricas históricas como una medición única o actual del proyecto completo.

### 3.4 Green IT — Inspección 04

- [Índice Green IT](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/README.md)
- [Informe de reducción del impacto ambiental y SWDM v4](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md)
- [Estándares de ingeniería de software](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md)
- [Matriz de trazabilidad de la rúbrica V_1_0_2](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_2.md)
- [Anexo de validación posterior a v1.0.0](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md)
- [Índice de evidencias Green IT](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/evidencias/README.md)

La inspección registra paginación server-side de hasta 12 elementos por página en cinco módulos, consultas agregadas para el dashboard, lectura por bloques para rutas, caché HTTP basada en ETag, compresión GZip y división de código con `React.lazy()`/`Suspense`. También deja explícitos los elementos sin oportunidad demostrada en el frontend auditado: activos rasterizados para WebP/AVIF y SVG externos para convertir a SVG inline.

| Área Green IT | Estado documentado y límite |
|---|---|
| Consultas SQL y lectura de relaciones | Optimizaciones aplicadas en consultas de rutas y dashboard. No se atribuye a esta inspección la creación de índices preexistentes. |
| Paginación | Aplicada en clientes, conductores, pedidos, vehículos y rutas; máximo 12 registros por página. |
| WebP/AVIF | No aplicable al inventario auditado: no se identificaron imágenes rasterizadas del producto en `frontend/src` o `frontend/public`. |
| Code splitting | Aplicado a páginas secundarias mediante `React.lazy()` y `Suspense`. |
| APIs nativas | Uso de `fetch` y `URLSearchParams`; no se documenta una sustitución de biblioteca preexistente. |
| SVG inline | Sin oportunidad demostrada: no se identificaron SVG externos en el inventario auditado. |
| Caché HTTP | ETag, `Cache-Control: private, no-cache`, `Vary: Authorization` y respuesta 304 cuando corresponde. |
| Compresión | GZip configurado en FastAPI; Brotli no está configurado. |

Las métricas Lighthouse son mediciones acotadas a rutas, equipos y fechas documentadas en los informes. No representan automáticamente el rendimiento de todas las vistas ni una medición eléctrica directa. El cálculo SWDM v4 es una estimación modelada bajo un escenario de uso hipotético, no tráfico real observado.

### 3.5 Historias de usuario y flujo Git

- [Índice de Desarrollo](docs/04-desarrollo/README.md)
- [US-012 — Gestión de conductores](docs/04-desarrollo/US-012-gestion-conductores.md)
- [US-013 — Planificación de rutas](docs/04-desarrollo/US-013-planificacion-rutas.md)
- [GITFLOW — Convenciones de ramas y Pull Requests](docs/04-desarrollo/GITFLOW.md)

## 4. Resultados de validación automatizada

Los siguientes resultados corresponden a las ejecuciones remotas de GitHub Actions del **17/11/2026**, sobre el commit [`0c36fd44`](https://github.com/LeeoGold/EcoLogistics/commit/0c36fd4402b12ef4a7835c878a538a1d1fbc44c1). Son posteriores a la Release `v1.0.0`; por tanto, se reportan como validación de la línea actual de `main`, no como métricas de la Release original.

| Validación | Resultado observado | Evidencia remota |
|---|---:|---|
| Backend en CI | **85/85 pruebas aprobadas; 96 % de cobertura** (1,199 sentencias; 46 sin cubrir) | [CI — 17/11/2026](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108231138) |
| Frontend unitario/integración | **55/55 pruebas aprobadas en 10 archivos** | [Tests and E2E — 17/11/2026](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108231154) |
| Playwright E2E | **21/21 pruebas aprobadas**: 7 Chromium, 7 Firefox y 7 WebKit | [Tests and E2E — 17/11/2026](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108231154) |
| Green IT Audit | Workflow concluido con `success` | [Green IT Audit — 17/11/2026](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108231013) |
| Deploy Production | Workflow concluido con `success`, incluidos los pasos de health check del despliegue | [Deploy Production — 17/11/2026](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108577780) |

**Alcance de las pruebas E2E:** Playwright ejecuta el frontend real en navegadores y utiliza interceptación de red para determinados escenarios de autenticación y datos. Por ello, el resultado valida los recorridos de interfaz y el comportamiento visible; no debe presentarse como una prueba completa del flujo navegador–API–PostgreSQL en todos los módulos. Las pruebas backend se ejecutan de forma independiente.

### Resultados históricos de la Release `v1.0.0`

La Release `v1.0.0` (04/11/2026) conserva sus propios datos de validación, que no deben mezclarse con las pruebas posteriores del 17/11/2026:

| Verificación histórica | Resultado registrado | Alcance |
|---|---:|---|
| Backend | 80 pruebas aprobadas | Ejecución local documentada para la Release. |
| Frontend | 14 pruebas aprobadas en 4 archivos | Ejecución local documentada para la Release. |
| Build | 50 módulos transformados | Compilación Vite 8.3.5 registrada en el cierre Green IT. |
| Lighthouse CI | 100/100 Performance | Tres ejecuciones Desktop sobre `/login` en una compilación local de producción. |
| FCP / LCP | 213 ms / 350 ms de mediana | Solo la auditoría histórica de `/login`. |
| TBT / CLS | 0 ms / 0.000 | Solo la auditoría histórica de `/login`. |
| Transferencia | 76.99 KiB | `total-byte-weight` de `/login`; no representa la descarga total de todas las vistas. |

Para las correcciones posteriores a la Release y sus validaciones, consulta el [anexo de validación posterior a v1.0.0](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md).

## 5. Seguridad, configuración y ejecución

### Seguridad y límites conocidos

El código incorpora autenticación mediante JWT, almacenamiento de contraseñas con Argon2, comprobación del estado de la cuenta y dependencias de autorización para operaciones protegidas por rol. Esto no equivale a una auditoría OWASP completa ni a una certificación de seguridad. MFA/TOTP permanece como trabajo de evolución y no debe presentarse como una funcionalidad implementada.

No se deben versionar archivos `.env`, contraseñas, tokens, claves ni datos personales reales. El repositorio incluye plantillas `.env.example` y reglas en `.gitignore` para excluir los archivos de entorno locales, dependencias y artefactos generados.

### Preparar y ejecutar en local

La guía completa y actualizada de preparación del entorno está en [`DEV_SETUP.md`](DEV_SETUP.md). Incluye requisitos, preparación de PostgreSQL, instalación del backend, instalación del frontend, comandos de pruebas y pautas de seguridad local.

| Tarea | Referencia |
|---|---|
| Crear la base de datos y preparar el esquema | [`database/schema.sql`](database/schema.sql) y [`DEV_SETUP.md`](DEV_SETUP.md) |
| Instalar y ejecutar la API | [`backend/requirements.txt`](backend/requirements.txt) y [`DEV_SETUP.md`](DEV_SETUP.md) |
| Instalar y ejecutar la interfaz | [`frontend/package.json`](frontend/package.json) y [`DEV_SETUP.md`](DEV_SETUP.md) |
| Ejecutar pruebas backend | `python -m pytest -q` desde `backend/` |
| Ejecutar pruebas frontend | `npm run test` desde `frontend/` |
| Ejecutar build frontend | `npm run build` desde `frontend/` |
| Ejecutar pruebas E2E | `npm run test:e2e` desde `frontend/` |

Consulta `DEV_SETUP.md` antes de ejecutar comandos si el entorno no está preparado. No apuntes las pruebas a una base de datos con información real.

## 6. Cierre final del proyecto

La carpeta [`docs/04 Cierre`](docs/04%20Cierre/README.md) reúne los siete documentos solicitados para el cierre técnico, administrativo y de gestión híbrida. El índice de cierre permite navegar entre los reportes y sus evidencias.

| N.º | Documento de cierre | Contenido principal |
|---:|---|---|
| 01 | [Reporte de Estado](docs/04%20Cierre/01%20Reporte%20de%20Estado%20V_1_0_0.md) | Alcance, cronograma, costos, proyección Look Ahead, riesgos e incidentes. |
| 02 | [Reporte de Variación](docs/04%20Cierre/02%20Reporte%20de%20Variaci%C3%B3n%20V_1_0_0.md) | Variaciones de cronograma, costo y calidad; causas raíz y respuestas. |
| 03 | [Análisis de Valor Ganado — EVM](docs/04%20Cierre/03%20Reporte%20de%20An%C3%A1lisis%20de%20Valor%20Ganado%20-%20EVM%20V_1_0_0.md) | PV, EV, AC, SV, CV, SPI, CPI, porcentajes y tres fórmulas EAC. |
| 04 | [Tableros de Control Híbridos](docs/04%20Cierre/04%20Tableros%20de%20Control%20-%20H%C3%ADbridos%20V_1_0_0.md) | RAG, KPIs, tendencias EVM, flujo acumulado y relación SPI/CPI/CSI. |
| 05 | [Radiadores de Información](docs/04%20Cierre/05%20Radiadores%20de%20Informaci%C3%B3n%20V_1_0_0.md) | Burndown, Burnup, Kanban, Mood Chart y retrospectivas. |
| 06 | [Reporte Final del Proyecto](docs/04%20Cierre/06%20Reporte%20Final%20del%20Proyecto%20V_1_0_0.md) | Desempeño histórico, alcance, calidad, cronograma, costos, riesgos y evaluación del éxito. |
| 07 | [Lecciones Aprendidas](docs/04%20Cierre/07%20Reporte%20Final%20de%20Lecciones%20Aprendidas%20V_1_0_0.md) | Prácticas efectivas, oportunidades de mejora y recomendaciones accionables. |

**Índice de evidencias:** [fuentes, gráficos y evidencias del cierre](docs/04%20Cierre/evidencias/README.md).

**Matriz de evaluación:** [trazabilidad de criterios, pesos, evidencias y pendientes](docs/04%20Cierre/Matriz%20de%20trazabilidad%20de%20rúbrica.md).

### Integridad y límites de las evidencias de cierre

- **EVM:** el BAC de S/ 15,937.60 procede del presupuesto académico referencial. No hay libro contable ni registro de costos reales versionado; por ello, PV, EV, AC, SV, CV, SPI, CPI y EAC se presentan como un escenario académico simulado.
- **Radiadores:** Burndown, Burnup y tablero Scrum del Sprint 1 se enlazan como evidencias históricas. El Kanban de cierre, Mood Chart y tablero consolidado de retrospectiva son reconstrucciones documentales identificadas como tales; no son capturas tomadas en vivo de Jira ni encuestas del equipo.
- **Satisfacción / SUS:** el instrumento SUS está preparado, pero los resultados requieren respuestas de al menos cinco participantes reales. No se inventan respuestas ni un puntaje de satisfacción.
- **Stakeholders:** no se declara aceptación formal sin un acta, encuesta o confirmación verificable.
- **Video:** el MP4 final debe grabarse con la aplicación real. El guion y las instrucciones están listos; la grabación debe guardarse como `docs/05 Video proyecto/EcoLogistics_Demo_Final.mp4`.

### Evidencia audiovisual y sustentación

- [Índice de Video proyecto](docs/05%20Video%20proyecto/README.md)
- [Guion del video — 5 minutos](docs/05%20Video%20proyecto/guion-video-5-minutos.md)
- [Guion de sustentación — 20 minutos](docs/05%20Video%20proyecto/guion-sustentacion-20-minutos.md)

La evaluación solicita aproximadamente cinco minutos de video: un minuto de Elevator Pitch y cuatro minutos de demostración funcional. La sustentación en clase se distribuye en diez minutos de gestión/cierre y diez minutos de demostración técnica. El MP4 no se incluye en el repositorio hasta que se realice la grabación auténtica.

## 7. Control de versiones y actualización documental

La Release `v1.0.0` identifica la publicación Green IT del 04/11/2026. Las actualizaciones posteriores en `main` y los documentos de cierre no modifican retroactivamente esa release. Los documentos de cierre mantienen su propia nomenclatura `V_1_0_0`, mientras que el historial del README registra las actualizaciones de este archivo.

| Versión del README | Fecha | Cambios |
|---|---|---|
| V_1_0_0–V_1_3_0 | 22/09/2026–23/10/2026 | Versiones documentales anteriores conservadas en el historial de Git. |
| V_1_4_0 | 08/11/2026 | Se conectó el README con la Release Green IT y se aclararon alcance funcional, seguridad y estados de auditoría. |
| V_1_5_0 | 21/11/2026 | Se consolidó el paquete de cierre, se actualizaron las métricas remotas de CI/E2E del 17/11/2026, se documentó la base de datos demostrativa Neon y se añadieron los guiones de video y sustentación. |

---

**Proyecto académico — Ingeniería de Sistemas e Informática**
**Programa:** Ingeniería de Sistemas e Informática
**Repositorio:** [LeeoGold/EcoLogistics](https://github.com/LeeoGold/EcoLogistics)
