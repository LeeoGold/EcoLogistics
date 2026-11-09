# EcoLogística Huancayo (EcoLogistics)

**Plataforma web para la gestión de operaciones logísticas y la planificación manual de rutas de última milla.**

EcoLogística Huancayo es un proyecto académico que organiza información de clientes, pedidos, conductores, vehículos y rutas. El sistema proporciona una base operativa para gestionar asignaciones y consultar indicadores; no se presenta como un motor de optimización automática de rutas ni como una plataforma de cálculo de emisiones por recorrido.

> **Estado de la versión:** `v1.0.0` — *Green IT Release*, publicada en GitHub sobre `main`. Esta versión consolida la Inspección 04 y su documentación técnica. La publicación de GitHub no debe confundirse con el registro de publicación del MVP en Jira, que conserva su propio estado y calendario.

- [Código y Release `v1.0.0`](https://github.com/LeeoGold/EcoLogistics/releases/tag/v1.0.0)
- [Commit de la entrega Green IT (`6041fe83`)](https://github.com/LeeoGold/EcoLogistics/commit/6041fe83d54367afd7a00139c1366d9f4c90c2fa)
- [Ejecuciones de GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions)

## 1. Alcance funcional actual

| Módulo | Capacidad documentada |
|---|---|
| Autenticación | Inicio de sesión y recuperación de usuario autenticado mediante la API. |
| Dashboard | Resumen agregado de vehículos, clientes, pedidos y conductores. |
| Vehículos | Consulta y gestión de la flota. |
| Clientes | Consulta y gestión de clientes. |
| Conductores | Consulta y gestión de conductores. |
| Pedidos | Consulta y gestión de pedidos. |
| Rutas | Planificación manual, asignación de conductor y vehículo y orden de pedidos. |

La historia `US-013` implementa planificación manual con validaciones de disponibilidad y capacidad. No calcula rutas geográficas por carretera, distancias, ETA, consumo de combustible ni CO₂e de cada entrega. Esas funciones requieren integración adicional con geolocalización y un servicio o motor de rutas.

## 2. Arquitectura y tecnologías

| Capa | Tecnologías | Responsabilidad |
|---|---|---|
| Frontend | React 19, Vite 8, JavaScript | Interfaz, navegación, formularios, tablas y paginación. |
| API | Python, FastAPI, Pydantic | Endpoints, validación y reglas de negocio. |
| Persistencia | SQLAlchemy, PostgreSQL, psycopg | Acceso relacional y almacenamiento. |
| Pruebas | pytest, pytest-cov, Vitest, Testing Library | Verificación de backend y frontend. |
| Automatización | GitHub Actions, Lighthouse CI, SonarQube Cloud | `ci.yml` ejecuta suites y cobertura; `green-audit.yml` ejecuta build y Lighthouse CI. |

La rúbrica de Green IT utiliza ejemplos MERN, pero este repositorio no es MERN. La evaluación se adapta al stack real: FastAPI y SQLAlchemy para las responsabilidades de Express/Mongoose, y PostgreSQL para persistencia relacional. No se incorporó MongoDB para imitar el ejemplo de la rúbrica.

## 3. Green IT — Inspección 04

La entrega incorpora paginación server-side de hasta 12 elementos por página en cinco módulos, consultas agregadas para el dashboard, lectura por bloques para reducir consultas repetidas de rutas, validación de caché HTTP mediante ETag, compresión GZip y división de código con `React.lazy()`/`Suspense`.

| Área solicitada | Situación documentada |
|---|---|
| Consultas SQL y lectura de relaciones | Optimización aplicada en la lectura de rutas y en el resumen agregado del dashboard. Los índices existentes se documentan, sin atribuir su creación a esta inspección. |
| Paginación | Aplicada en clientes, conductores, pedidos, vehículos y rutas; máximo 12 registros por página. |
| Imágenes WebP/AVIF | No aplicable al frontend auditado: no se encontraron imágenes rasterizadas del producto en `frontend/src` o `frontend/public`. Las capturas dentro de `docs/` son evidencias, no activos de la aplicación. |
| Code splitting | Aplicado a las páginas secundarias con `React.lazy()` y `Suspense`. |
| APIs nativas | `fetch` y `URLSearchParams` se usan sin dependencia HTTP/serialización adicional. No se afirma que se haya eliminado una biblioteca instalada: no existía una biblioteca equivalente que sustituir. |
| SVG inline | Sin oportunidad demostrada: no se encontraron activos SVG externos ni referencias SVG en el frontend auditado. |
| Caché HTTP | Aplicada mediante ETag, `Cache-Control: private, no-cache`, `Vary: Authorization` y respuesta 304 cuando corresponde. |
| Compresión | GZip configurado en FastAPI; Brotli no está configurado. |

El resultado se presenta como **seis áreas aplicadas o conformes con alcance explícito y dos áreas no aplicables/sin oportunidad identificada**. En el área de APIs nativas, la evidencia respalda la decisión de no añadir una dependencia y el uso de APIs del navegador; no respalda una migración desde una biblioteca externa. La aceptación de esa área como optimización depende de la interpretación del docente.

**Documentación principal:**

- [Índice Green IT y resumen de la entrega](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/README.md)
- [Informe de reducción del impacto ambiental y SWDM v4](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md)
- [Estándares de ingeniería y guía de desarrollo verde](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md)
- [Matriz de trazabilidad de la rúbrica](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md)
- [Índice de evidencias](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/evidencias/README.md)

## 4. Validaciones registradas para `v1.0.0`

Los resultados siguientes corresponden a ejecuciones locales documentadas durante el cierre de la inspección. No se presentan como una nueva ejecución de pruebas dentro de este archivo ZIP.

| Verificación | Resultado registrado | Alcance y límite |
|---|---:|---|
| Backend | **80 pruebas aprobadas** | Suite pytest comunicada para el cierre de Green IT. |
| Frontend | **14 pruebas aprobadas en 4 archivos** | Suite Vitest comunicada para el cierre de Green IT. |
| Build | **Correcto; 50 módulos transformados** | Compilación Vite 8.3.5. |
| Lighthouse CI | **100/100 de Performance** | Tres ejecuciones Desktop sobre `/login` en una compilación local de producción. |
| FCP / LCP | **213 ms / 350 ms de mediana** | Valores de la misma auditoría restringida a `/login`. |
| TBT / CLS | **0 ms / 0.000** | Valores de la misma auditoría restringida a `/login`. |
| Transferencia Lighthouse | **76.99 KiB** | `total-byte-weight` de `/login`; no es el tamaño completo de descarga de todas las vistas autenticadas. |
| GitHub Actions | **Green IT Audit en verde** | Estado confirmado durante el cierre de la Release. El workflow `ci.yml` está configurado por separado para pruebas, cobertura y análisis SonarQube; su estado debe comprobarse en su propia ejecución. |

### Verificación correctiva posterior a `v1.0.0`

En una revisión posterior se corrigió una incompatibilidad de anotaciones en `RouteRepository` para Python 3.13 y se añadió una prueba automatizada de compresión GZip. La suite backend volvió a ejecutarse en Python 3.13.5 con **81 pruebas aprobadas** (pytest 9.0.2 en el entorno de revisión). El workflow `ci.yml` instala pytest mediante `requirements-tests.txt` (`pytest>=8,<9`), por lo que la ejecución remota debe confirmar el resultado con esa dependencia. Estos cambios son posteriores a la Release `v1.0.0` y quedan pendientes de validar en ambos workflows de GitHub Actions; no se atribuyen retroactivamente a esa Release.

Detalle: [Anexo de validación posterior a v1.0.0](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md).

La comparación histórica del code splitting registró 83,811 B antes y 77,706 B después (reducción de 6,105 B; 7.28 %) en la ruta `/login`. En esa serie, el score mediano de Performance pasó de 100 a 95 y FCP/LCP fueron ligeramente mayores; por eso no se atribuye una mejora general del tiempo de carga a esa intervención aislada.

El cálculo SWDM v4 es una **estimación modelada**, basada en la diferencia de transferencia y un escenario hipotético de 500,000 cargas anuales de `/login`. El resultado de 0.45238 kgCO₂e/año no es tráfico observado ni una medición eléctrica directa.

## 5. Seguridad y límites conocidos

El código contiene una base de autenticación y autorización: contraseñas con Argon2, tokens JWT de acceso, comprobación de cuenta activa y dependencias para exigir roles en operaciones protegidas. Esto corrige la descripción antigua que afirmaba que no existía un flujo de autenticación conectado a la API.

Este baseline **no equivale a una auditoría OWASP completa ni a una certificación de seguridad**. MFA/TOTP no se debe presentar como implementado; figura como trabajo de evolución. La evaluación OWASP del Sprint 3 es una fotografía histórica de octubre de 2026 y sus hallazgos deben revisarse contra la versión actual antes de declarar que están cerrados.

## 6. Documentación del repositorio

| Ubicación | Contenido |
|---|---|
| [`docs/01 Inicio/`](docs/01%20Inicio/) | Visión, requisitos, usuarios, stack, base de datos y modelo C4. |
| [`docs/02 Planificación/`](docs/02%20Planificaci%C3%B3n/) | Planificación ágil, Jira, riesgos, presupuesto y evidencias. |
| [`docs/03 Implementación/`](docs/03%20Implementaci%C3%B3n/README.md) | Índice de Sprints y entregables Green IT. |
| [`docs/03 Implementación/Sprint 1/`](docs/03%20Implementaci%C3%B3n/Sprint%201/README.md) | Registro histórico del primer Sprint. |
| [`docs/03 Implementación/Sprint 2/`](docs/03%20Implementaci%C3%B3n/Sprint%202/README.md) | Registro histórico del segundo Sprint. |
| [`docs/03 Implementación/Sprint 03/`](docs/03%20Implementaci%C3%B3n/Sprint%2003/README.md) | Calidad, seguridad y accesibilidad; resultados fechados de octubre de 2026. |
| [`docs/03 Implementación/reduccion del impacto ambiental/`](docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental/README.md) | Inspección 04, estándares, trazabilidad y evidencias Green IT. |
| [`docs/04-desarrollo/`](docs/04-desarrollo/) | Historias de usuario y flujo Git. |
| [`DEV_SETUP.md`](DEV_SETUP.md) | Preparación del entorno local. |

Los documentos de Sprint 1, Sprint 2 y Sprint 3 conservan métricas y estados de sus fechas originales. Para presentar el estado de la Release `v1.0.0`, utiliza los resultados resumidos en este README y el índice Green IT; no mezcles números de ejecuciones de distintos Sprints.

## 7. Configuración y ejecución

Consulta [`DEV_SETUP.md`](DEV_SETUP.md) para preparar PostgreSQL, instalar backend/frontend, ejecutar pruebas y levantar la aplicación. El flujo de ramas se describe en [`docs/04-desarrollo/GITFLOW.md`](docs/04-desarrollo/GITFLOW.md).

## 8. Historial de actualización del README

| Versión | Fecha | Cambios |
|---|---|---|
| V_1_0_0–V_1_3_0 | 2026-09-22 a 2026-10-23 | Versiones documentales anteriores; se conserva su historial en Git. |
| V_1_4_0 | 2026-11-08 | Se conecta el README con la Release Green IT, se corrigen métricas antiguas y se aclaran alcance funcional, seguridad y estados de auditoría. |

---

**Proyecto académico — Ingeniería de Sistemas e Informática**
