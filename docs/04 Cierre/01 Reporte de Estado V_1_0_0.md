# 01. Reporte de Estado del Proyecto (Status Report)

[← Volver al README principal](../../README.md)

| Campo | Información |
|---|---|
| Proyecto | EcoLogística Huancayo (EcoLogistics) |
| Fecha de corte | 21/11/2026 |
| Versión | V_1_0_0 |
| Responsable del cierre | Dirección del proyecto / responsable de consolidación |
| Estado general | MVP operativo; datos de demostración cargados y login confirmado; integración documental y MP4 pendientes |

## 1. Información de alcance

- **Logros completados:** módulos de autenticación, dashboard, flota, clientes, conductores, pedidos y planificación manual de rutas; separación frontend React/Vite y backend FastAPI; persistencia PostgreSQL; pruebas unitarias/integración; pruebas E2E con Playwright; pipelines CI, pruebas, Green IT Audit y despliegue; documentación de Sprints 1–4 y Green IT.
- **Cambios al alcance:** el alcance inicial contemplaba optimización automática mediante metaheurísticas, visualización cartográfica, reoptimización y métricas ambientales. El README vigente declara que el producto realiza planificación manual y no calcula rutas geográficas, distancias, ETA, combustible ni CO₂e por entrega. Estas capacidades quedan registradas como no implementadas/diferidas; no se presentan como logros.
- **Calidad:** la validación remota de `main` sobre el commit `0c36fd44` (17/11/2026) registró CI backend con 85/85 pruebas y 96 % de cobertura (1,199 sentencias; 46 sin cubrir); la ejecución independiente de Tests and E2E registró 55/55 pruebas frontend en 10 archivos y 21/21 pruebas Playwright (7 Chromium, 7 Firefox y 7 WebKit). Los workflows CI, Tests and E2E, Green IT Audit y Deploy Production concluyeron `success`. Son ejecuciones separadas y no una única suite.

## 2. Información de cronograma

- **Hitos planificados no completados:** motor de optimización, mapa interactivo, reoptimización automática y reportes de emisiones; la entrega audiovisual final y la encuesta SUS tampoco cuentan con evidencia de ejecución en el repositorio al corte.
- **Causa raíz de desviaciones:** el alcance inicial combinó gestión operativa, optimización matemática, geolocalización e indicadores ambientales, mientras que el desarrollo priorizó una base transaccional verificable, calidad automatizada y despliegue. También se documentaron incorporaciones tardías al Sprint 1 y consolidación de evidencias al final de las iteraciones.
- **Impacto:** el MVP es demostrable en los módulos de gestión y la planificación manual, pero no satisface la totalidad de los criterios de éxito originales relacionados con rutas optimizadas y sostenibilidad por recorrido.
- **Acciones correctivas/preventivas:** declarar explícitamente el alcance entregado; mantener las funciones de optimización y emisiones como evolución posterior; no cerrar requisitos sin prueba y evidencia; ejecutar una demostración end-to-end y registrar el video final.

## 3. Información de costos

- **Presupuesto referencial de trabajo (BAC utilizado en la simulación):** S/ 15,937.60, tomado del documento `docs/02 Planificación/04 Presupuesto del proyecto V_1_0_0.md`. Es un presupuesto académico basado en supuestos horarios y de infraestructura, no una factura ni un presupuesto monetario aprobado.
- **Fondos ejecutados reales:** no existe un registro contable verificable en el repositorio al 21/11/2026.
- **Variación de horas/recursos:** el presupuesto inicial de la carta de constitución citaba S/ 500,000 como referencia de consigna; el documento presupuestal posterior elaboró un estimado académico de S/ 15,937.60 para el MVP. La diferencia refleja una adaptación de escala, no un ahorro de caja demostrado.
- **Impacto y reserva:** no se puede afirmar consumo real de la reserva de contingencia. Las cifras EVM se incluyen en el documento 03 como escenario académico simulado y no como estado financiero auditado.

## 4. Proyección (Look Ahead)

| Actividad de cierre | Resultado esperado | Costo pendiente |
|---|---|---|
| Integrar los siete reportes Markdown preparados en este paquete | Documentos versionados, sin marcadores y con enlaces bidireccionales verificados localmente | Trabajo documental; sin desembolso real registrado |
| Grabar video MP4 ~5 minutos | 1 minuto de pitch + 4 minutos de demo funcional | No se requiere compra de herramienta; costo no registrado |
| Capturar evidencia final | Capturas actuales de tablero, demo y ejecución | Sin costo real registrado |
| Validar SUS y satisfacción | Aplicar instrumento a participantes reales | Pendiente; no simular respuestas |
| Revisión final del repositorio | Enlaces, rutas, secretos, build, pruebas y release coherentes | Trabajo de revisión; sin costo real registrado |

## 5. Riesgos, incidentes y comentarios

- **Riesgo R-001 — alcance de optimización no entregado:** se mantiene como brecha funcional frente al acta original. Respuesta: declararlo diferido y no atribuir capacidad inexistente.
- **Riesgo R-003 — seguridad:** hay autenticación JWT, hash Argon2 y controles de rol documentados; esto no equivale a auditoría OWASP completa.
- **Riesgo de evidencia:** en la revisión de la rama remota `main` del 21/11/2026, las carpetas `docs/04 Cierre` y `docs/05 Video proyecto` aún no estaban integradas. Este paquete las prepara para su incorporación; después de copiarlo, se debe verificar la navegación en GitHub. El MP4 y los resultados SUS siguen requiriendo evidencia real.
- **Comentario:** el 17/11/2026 los workflows CI, Tests and E2E, Green IT Audit y Deploy Production aparecen con conclusión `success`. Esto acredita los pipelines, no la aceptación formal del usuario final.

## 6. Entorno de demostración y validación de acceso

El responsable del proyecto informó que el script corregido de carga de datos ficticios terminó correctamente en Neon el 21/11/2026. El conjunto demostrativo contempla 8 usuarios (3 ADMINISTRADOR y 5 OPERADOR), 15 clientes, 15 conductores, 15 vehículos, 24 pedidos, 13 rutas, 13 asignaciones y 24 detalles de ruta. También confirmó manualmente que las credenciales de demostración permiten iniciar sesión en la aplicación.

Esta confirmación corresponde a la carga y al inicio de sesión reportados por el responsable; no sustituye una captura de la consulta de conteos ni evidencia de prueba de todos los flujos funcionales. Las credenciales no deben incorporarse al repositorio.

---

**Conclusión:** el producto alcanza un MVP operativo y automatizado en calidad/despliegue; el cierre académico no estará completo hasta integrar los siete documentos, adjuntar el MP4 real y completar las evidencias que dependen de participantes o capturas actuales.
