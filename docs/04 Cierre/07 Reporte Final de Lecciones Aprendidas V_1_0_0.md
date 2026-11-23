# 07. Reporte Final de Lecciones Aprendidas (Final Lessons Learned Report)

[← Volver al README principal](../../README.md)

| Campo | Información |
|---|---|
| Proyecto | EcoLogística Huancayo (EcoLogistics) |
| Fecha de reunión / corte documental | 21/11/2026 |
| Versión | V_1_0_0 |
| Base de análisis | Retrospectivas versionadas de Sprints 1, 2, 3 y 4 |

## 1. Matriz consolidada de aprendizajes

| Categoría de gestión | Prácticas efectivas (mantener) | Oportunidades de mejora (evitar/ajustar) | Recomendación para futuros proyectos |
|---|---|---|---|
| Desempeño del equipo / responsable | Desarrollo incremental, seguimiento en Jira, commits pequeños y checkpoints | Concentración de validación y documentación hacia el final | Definir responsable de cada evidencia y cerrar trabajo en la misma sesión en que se implementa. |
| Evolución y control del alcance | Priorización de módulos operativos y registro explícito de límites | El acta inicial mantuvo capacidades avanzadas que el MVP no alcanzó | Aprobar una re-baselining formal cuando se reduzca el alcance y actualizar requisitos, criterios y README. |
| Cronograma híbrido | Iteraciones con objetivos y reportes; CI y PR como puntos de control | Sprint 1 inició antes de que el alcance estuviera completamente cargado; 14 SP fueron trasladados | Congelar compromiso al inicio, registrar cambios y usar hitos predictivos solo cuando existan fechas base aprobadas. |
| Gestión del presupuesto y costos | Presupuesto académico desglosado en CAPEX/OPEX/contingencia | No hubo registro verificable de gastos y horas reales; presupuesto inicial y estimado posterior tienen escalas distintas | Registrar horas/costos reales por periodo y separar claramente presupuesto aprobado, estimación y costo incurrido. |
| Técnicas de estimación | Story Points para backlog y estimación horaria referencial | Una sola velocidad inicial (6 SP) no era una base robusta para comprometer futuros sprints | Recalibrar estimaciones tras varios sprints y no equiparar SP con horas o dinero sin una regla explícita. |
| Aseguramiento de calidad | pytest, Vitest, Playwright, SonarQube y GitHub Actions; 85/85 backend, 55/55 frontend y 21/21 E2E en ejecuciones remotas separadas | Mocks E2E pueden confundirse con validación integral de API/DB; los resultados pertenecen a workflows distintos | Documentar entorno, commit, workflow, comando, alcance y limitación en cada resultado; separar pruebas de UI, API y base de datos. |
| Preparación de datos de prueba | Script SQL con IDs deterministas y transacción para cargar datos de demostración | La primera versión omitió `usuario_id`; el valor por defecto Python del ORM no aplica a SQL directo | Definir UUID explícito o default SQL en el esquema, ejecutar en transacción y verificar conteos antes de usar los datos. |
| Involucramiento de stakeholders | Instrumento SUS y tareas de evaluación quedaron diseñados | No se adjuntaron respuestas reales ni acta de aceptación | Ejecutar la prueba con al menos cinco usuarios reales y recoger aprobación/observaciones sin inducir respuestas. |
| Riesgos, incidentes e impedimentos | Registro cuantitativo de riesgos y retrospectivas con acciones | El riesgo del optimizador y los datos geográficos se materializó como brecha de alcance | Validar la factibilidad del componente más incierto mediante prototipo temprano y criterio de descarte aprobado. |

## 2. Conclusiones de la retrospectiva de cierre

1. La mayor fortaleza del proyecto fue convertir el trabajo técnico en cambios verificables: módulos separados, pruebas, pipelines, PRs y despliegue.
2. La principal oportunidad de mejora fue la gestión de alcance: la visión inicial incluyó optimización automática y sostenibilidad por ruta, pero el producto final entregó planificación manual. La decisión de reducir alcance debió quedar formalizada y reflejada antes en la línea base documental.
3. La calidad debe comunicarse con contexto. La evidencia actual separa CI backend (85/85 y 96 % de cobertura), pruebas frontend (55/55) y Playwright (21/21) en workflows distintos. Las pruebas E2E con mocks no deben presentarse como validación de PostgreSQL.
4. Los indicadores de costo no se pueden presentar como reales si solo existe un presupuesto referencial. La simulación EVM permite demostrar fórmulas, pero no sustituye un registro de ejecución financiera.
5. La carga de datos de demostración enseñó que los valores predeterminados del ORM de Python no se ejecutan en una inserción SQL directa. El script debió proporcionar explícitamente `usuario_id`; el uso de transacciones y una consulta posterior de conteos permitió controlar la importación.
6. En una siguiente versión, el motor de rutas debe validarse como prototipo aislado con escenarios y datos de Huancayo antes de incorporarlo como criterio de éxito del MVP.

## 3. Acciones recomendadas

| Acción | Prioridad | Evidencia de cumplimiento |
|---|---|---|
| Formalizar la línea base final de alcance | Alta | Acta o anexo de re-baselining aprobado |
| Ejecutar SUS con participantes reales | Alta | Formularios anonimizados y cálculo reproducible |
| Completar video y captura final del tablero | Alta | MP4 y capturas originales en la ruta solicitada |
| Mantener pruebas automatizadas en CI | Alta | Workflows exitosos asociados al commit de cierre |
| Prototipar optimización y mapas en una fase posterior | Media | Prototipo, dataset, benchmark y prueba de aceptación |
| Registrar horas y costos reales | Media | Hoja de tiempos y costos por periodo |

---

**Nota:** las lecciones anteriores sintetizan hechos y oportunidades descritos en las retrospectivas del repositorio. Las recomendaciones son propuestas de mejora, no evidencia de acciones ya ejecutadas.
