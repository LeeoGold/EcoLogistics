# 06. Reporte Final del Proyecto (Final Project Report)

[← Volver al README principal](../../README.md)

| Campo | Información |
|---|---|
| Proyecto | EcoLogística Huancayo (EcoLogistics) |
| Fecha de corte de cierre | 21/11/2026 |
| Versión | V_1_0_0 |
| Enfoque de gestión | Híbrido: hitos predictivos con ejecución adaptativa por sprints |
| Responsable académico registrado | Dirección del proyecto |

## 1. Descripción general del proyecto

EcoLogística Huancayo es una plataforma web académica orientada a organizar operaciones logísticas de última milla. El proyecto comenzó con una visión amplia que incluía gestión de flota, pedidos, clientes y conductores, optimización automática de rutas, mapas, indicadores ambientales y reoptimización. La versión actualmente descrita en el README entrega una base operativa de gestión y planificación manual de rutas, no un motor geográfico de optimización. El desarrollo utiliza React 19/Vite, FastAPI/Python, SQLAlchemy y PostgreSQL.

Este informe consolida el estado del repositorio hasta el 21/11/2026 y distingue entregables verificables de funcionalidades diferidas, así como resultados medidos de estimaciones académicas.

## 2. Resumen de desempeño

### 2.1 Alcance — predictivo y adaptativo

- **Objetivo original:** disponer de un MVP que administre operaciones y genere/visualice rutas optimizadas con indicadores logísticos y ambientales.
- **Entregado:** autenticación, dashboard, gestión de vehículos, clientes, conductores y pedidos; planificación manual de rutas; integración frontend/API; base de datos relacional; pruebas automatizadas; CI/CD; documentación técnica y Release `v1.0.0`.
- **No entregado / diferido:** metaheurística de optimización, visualización cartográfica de trayectos reales, reoptimización automática y cálculo de distancia, ETA, combustible o CO₂e por ruta. El README principal declara explícitamente estas limitaciones.
- **Evaluación:** el MVP logra una base operativa demostrable, pero no cumple íntegramente los criterios de éxito originales ligados a optimización y sostenibilidad. No se registra una aprobación formal de re-baselining; por ello, la brecha se documenta como desviación de alcance.

### 2.2 Calidad

| Verificación | Resultado documentado | Alcance / límite |
|---|---|---|
| Backend | 85/85 pruebas aprobadas; 96 % cobertura (1,199 sentencias; 46 sin cubrir) | CI remoto del 17/11/2026 sobre `0c36fd44`; [ejecución CI](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108231138). |
| Frontend | 55/55 pruebas aprobadas en 10 archivos | Workflow Tests and E2E remoto del 17/11/2026; [ejecución](https://github.com/LeeoGold/EcoLogistics/actions/runs/44108231154). |
| E2E | 21/21 aprobadas (7 por Chromium, Firefox y WebKit) | Workflow remoto Tests and E2E; Playwright intercepta respuestas de API para varios escenarios y no equivale a una prueba contra PostgreSQL. |
| CI / Tests and E2E | `success` el 17/11/2026 | Los jobs de build, backend, frontend y Playwright terminaron correctamente. |
| Green IT Audit | `success` el 17/11/2026 | Auditoría automatizada según el workflow versionado. |
| Deploy Production | `success` el 17/11/2026 | Validaciones de despliegue y health checks satisfactorios. |
| SUS / satisfacción | Sin resultados reales registrados | El instrumento está definido, pero requiere al menos cinco participantes reales; no se inventan respuestas. |

**Requisitos eximidos o diferidos:** optimización automática, mapas y cálculo ambiental por ruta; pruebas de usabilidad con muestra real hasta que se realicen; auditoría OWASP integral (los resultados de SonarQube no sustituyen dicha auditoría).

### 2.3 Cronograma

| Hito / entrega | Enfoque | Fecha planificada documentada | Fecha real / evidencia | Variación / impacto |
|---|---|---|---|---|
| Acta de constitución | Predictivo | Inicio del proyecto, fecha exacta de inicio no formalizada | Elaborada 30/08/2026 | Se conserva visión inicial amplia. |
| Sprint 1 | Adaptativo | 09/09–22/09/2026 | Corte documental 23/09; Jira: 2/6 HUs y 6/20 SP completados | 14 SP se trasladaron al backlog. |
| Sprint 2 | Adaptativo | 23/09–05/10/2026 | Corte 04/10: 5/5 historias implementadas técnicamente; US-011 aún en QA | El cierre administrativo dependía de la validación final. |
| Sprint 3 | Híbrido | Hito macro H-03: semanas 8–11; sin fecha calendario exacta | Revisión y retrospectiva documentadas 20/10/2026 | Se priorizó calidad, SonarQube y CI; no se evidencia optimizador o mapas. |
| Sprint 4 | Híbrido | Hito macro H-04: semanas 12–14; sin fecha calendario exacta | E2E y despliegue documentados; PRs integrados en `main` hasta 17/11/2026 | 21/21 E2E local y remoto; workflows remotos exitosos. El video y SUS siguen pendientes. |

### 2.4 Costo

- **Presupuesto académico referencial usado como BAC del ejercicio:** S/ 15,937.60, según `docs/02 Planificación/04 Presupuesto del proyecto V_1_0_0.md`.
- **Costo final desembolsado real:** no disponible en los artefactos versionados; no se declara un monto real.
- **Variación:** no calculable como diferencia financiera real. El EVM incluido en el documento 03 es una simulación matemática basada en el presupuesto referencial.

### 2.5 Entorno de demostración en Neon

El responsable del proyecto confirmó el 21/11/2026 que la importación corregida de datos ficticios terminó correctamente y que las cuentas de demostración permiten iniciar sesión en producción. El conjunto preparado contempla 8 usuarios (3 administradores y 5 operadores), 15 clientes, 15 conductores, 15 vehículos, 24 pedidos, 13 rutas, 13 asignaciones y 24 detalles de ruta. La consulta SQL de verificación se incluye en `docs/04 Cierre/evidencias/validacion_datos_demo.sql` para conservar una evidencia de conteos. No se publican contraseñas ni datos personales reales.

La comprobación de credenciales fue manual y reportada por el responsable; no se declara que cada operación de cada módulo haya sido revalidada independientemente en producción mediante una suite automatizada.

## 3. Resumen de riesgos, incidentes e impedimentos

| ID / descripción | Tipo | Impacto al cierre | Respuesta / tratamiento |
|---|---|---|---|
| R-001 Complejidad del motor de optimización | Riesgo / desviación | Alto: el motor no se implementó en la versión publicada | Registrar como capacidad diferida; no sobredeclarar el alcance. |
| R-002 Datos geográficos insuficientes | Riesgo | Evitó validar trayectos reales y emisiones por recorrido | Mantener las funciones geográficas fuera del alcance entregado. |
| R-003 Seguridad y control de acceso | Riesgo | Se incorporaron JWT, Argon2 y roles; no se acredita auditoría OWASP completa | Mantener revisión de seguridad y pruebas de autorización del backend. |
| R-006 Integridad de datos | Riesgo | La solución usa persistencia relacional y validaciones de API | Mantener pruebas y restricciones de base de datos. |
| Diferencias entre entornos de desarrollo | Impedimento | Retrasaron la validación integral en Sprint 1 | `DEV_SETUP.md`, `.env.example`, SQLite de pruebas y pipelines reproducibles. |
| Desfase entre código, Jira y documentación | Incidente de proceso | Debilitó la trazabilidad de algunas historias | Actualizar estado/evidencia al cierre de cada historia. |

## 4. Evaluación del éxito y cierre

- **Satisfacción de stakeholders:** no hay encuesta ni acta de aceptación formal adjunta. Se registra como no medida, no como satisfacción positiva asumida.
- **Satisfacción del equipo / responsable:** las retrospectivas documentan aprendizajes y mejoras. La autoevaluación de Mood Chart es una reconstrucción cualitativa individual, no una medición de todo el equipo.
- **Transición operativa:** existen despliegues de frontend y backend y health checks exitosos. Para una transferencia operativa formal se requiere documentar credenciales de acceso por canal seguro, responsable de operación, monitoreo, respaldo y mantenimiento; secretos no se incluyen en el repositorio.
- **Cierre administrativo:** queda completo al integrar los siete documentos con enlaces bidireccionales y adjuntar el video MP4 real de aproximadamente cinco minutos.

## 5. Conclusión final

EcoLogistics cierra con una base funcional de gestión logística, arquitectura separada, automatización de pruebas y despliegue verificable. El proyecto deja evidencia técnica rastreable en GitHub y documentación de iteraciones. La principal brecha frente al acta original es la ausencia del motor de optimización geográfica y de los indicadores ambientales por recorrido. La entrega debe presentarse como un MVP operativo de planificación manual con capacidades avanzadas diferidas, y no como una plataforma que ya optimiza rutas o calcula emisiones reales.
