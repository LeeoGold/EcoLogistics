# Matriz de trazabilidad de la rúbrica de evaluación final

[← Volver al índice del cierre](README.md) · [README principal](../../README.md)

Esta matriz vincula cada criterio de la consigna con el documento, evidencia y actividad que permite demostrarlo. Los niveles y la calificación final los determina el docente. El máximo ponderado de la rúbrica es 33 puntos (11 puntos de peso × 3 niveles de logro).

| Criterio de la rúbrica | Peso | Entregables / evidencia | Evidencia verificable | Actividad final que debe realizar el responsable |
|---|---:|---|---|---|
| Reportes narrativos y análisis EVM | 1 | [01 Estado](01%20Reporte%20de%20Estado%20V_1_0_0.md), [02 Variación](02%20Reporte%20de%20Variaci%C3%B3n%20V_1_0_0.md), [03 EVM](03%20Reporte%20de%20An%C3%A1lisis%20de%20Valor%20Ganado%20-%20EVM%20V_1_0_0.md) | Cronograma planificado vs. real, causas raíz, acciones correctivas, PV/EV/AC, SV/CV, SPI/CPI, tres fórmulas EAC y justificación. | Verificar que no queden marcadores; explicar que el ejercicio EVM es simulado porque no existe un libro de costos reales. |
| Reportes visuales y cierre administrativo | 1 | [04 Tableros](04%20Tableros%20de%20Control%20-%20H%C3%ADbridos%20V_1_0_0.md), [05 Radiadores](05%20Radiadores%20de%20Informaci%C3%B3n%20V_1_0_0.md), [06 Final](06%20Reporte%20Final%20del%20Proyecto%20V_1_0_0.md), [07 Lecciones](07%20Reporte%20Final%20de%20Lecciones%20Aprendidas%20V_1_0_0.md) | RAG, gráficos EVM, flujo de SP, Burndown/Burnup/Scrum Board históricos, retrospectivas y cierre. | Añadir captura actual del tablero si existe; conservar Mood Chart y Kanban reconstruidos como reconstrucciones, no como capturas originales. Obtener SUS solo con participantes reales. |
| Trazabilidad y versionamiento del repositorio | 1 | README principal, índices de `docs/04 Cierre` y `docs/05 Video proyecto`, `.gitignore` | Siete nombres requeridos, enlaces relativos de ida/vuelta, estructura y exclusión de `.env`, dependencias y temporales. | Copiar el paquete a la raíz del repositorio, revisar enlaces en GitHub y ejecutar `git diff --check`; conservar historial de Git. |
| Demostración funcional y arquitectura del código | 4 | Aplicación desplegada, README, `DEV_SETUP.md`, PRs, workflows y código | React 19/Vite 8, FastAPI, SQLAlchemy, PostgreSQL; CI 85/85 backend y 96 % cobertura; frontend 55/55; Playwright 21/21; cuatro workflows `success` al 17/11/2026. | Preparar una demo en vivo de 10 minutos, con flujos reales, login, dashboard, recursos, pedidos, planificación manual y permisos por rol. No afirmar optimización geográfica. |
| Evidencia audiovisual (MP4) | 4 | [Guion de video de 5 minutos](../05%20Video%20proyecto/guion-video-5-minutos.md) | Estructura de 1 minuto de Elevator Pitch + 4 minutos de demostración. | Grabar el MP4 real en 1080p, con audio claro, duración de 4:45–5:15, guardarlo como `EcoLogistics_Demo_Final.mp4` y revisarlo antes de subirlo. |

## Límites que deben exponerse con transparencia

- Los importes y valores EVM son un escenario didáctico simulado; no existen gastos reales medidos en el repositorio.
- El proyecto entrega planificación manual de rutas; no entrega optimización automática, mapas de rutas reales, ETA ni emisiones por recorrido.
- Burndown, Burnup y Scrum Board proceden de capturas históricas del Sprint 1. Los gráficos Kanban de cierre y Mood Chart son reconstrucciones, no exportaciones de Jira ni encuestas de equipo.
- Las pruebas E2E de Playwright interceptan algunas respuestas API y no equivalen a un recorrido completo navegador–API–PostgreSQL.
- El login con cuentas de demostración fue confirmado manualmente por el responsable el 21/11/2026; no se deben publicar contraseñas.
- No hay resultados SUS ni aceptación formal de stakeholders sin instrumentos y respuestas reales.

## Cómo estimar el objetivo de nota

La consigna muestra 33 puntos ponderados máximos, pero no especifica en el documento la fórmula de conversión a una nota sobre 20. Si el docente aplica conversión proporcional, 25/33 equivaldrían aproximadamente a 15.15/20; se recomienda apuntar a 27–30/33 para tener margen. La puntuación real depende de la evaluación docente y de que se complete la demo y el MP4.
