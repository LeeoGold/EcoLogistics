# 02. Reporte de Variación (Variance Report)

[← Volver al README principal](../../README.md)

| Campo | Información |
|---|---|
| Proyecto | EcoLogística Huancayo (EcoLogistics) |
| Periodo reportado | 30/08/2026–21/11/2026 (ciclo académico documentado) |
| Fecha de corte | 21/11/2026 |
| Versión | V_1_0_0 |
| Naturaleza de cifras financieras | Presupuesto académico referencial; EVM simulado |

## 1. Variación de cronograma

| Métrica / aspecto | Detalle |
|---|---|
| Resultados planificados | Acta de constitución de 30/08/2026: cuatro hitos en 14 semanas. H-01 análisis/diseño; H-02 gestión operativa y primera versión del optimizador; H-03 mapas/dashboard/indicadores; H-04 reoptimización, pruebas y cierre. Sprint 1: 09/09–22/09; Sprint 2: 23/09–05/10. |
| Resultados reales | Sprint 1: 2/6 HUs y 6/20 SP completados según Jira; 4 HUs (14 SP) retornaron al backlog. Sprint 2: 5/5 historias implementadas técnicamente (17 SP); 4 listas y US-011 en revisión/QA al último corte. Sprint 3 priorizó calidad, SonarQube y CI. Sprint 4 incorporó Playwright E2E, despliegue y documentación. |
| Variación obtenida | Sprint 1: −14 SP respecto al compromiso (30 % de cumplimiento). Sprint 2: implementación técnica 5/5, con validación administrativa pendiente de US-011. Las funciones de optimización automática, mapas y emisiones no llegaron al producto final documentado. |
| Causa raíz | Alcance inicial amplio frente al tiempo y disponibilidad del entorno; incorporación del alcance del Sprint 1 el 11/09, después del inicio planificado del 09/09; validación y evidencias acumuladas hacia el final. |
| Respuesta planificada | Priorizar módulos transaccionales y robustez técnica; mantener explícitas las capacidades diferidas; establecer DoD por historia y cerrar únicamente con prueba y evidencia. |

**Observación:** la carta de constitución define hitos por semanas, pero no contiene fechas calendario individuales para H-01…H-04. No se inventan fechas de esos hitos. Los rangos exactos de Sprint 1 y 2 proceden de sus reportes.

## 2. Variación de costo

| Métrica / aspecto | Detalle |
|---|---|
| Resultados planificados | La carta inicial citaba S/ 500,000 como referencia académica del MVP y S/ 120,000 de OPEX anual estimado. El presupuesto de planificación posterior detalló un estimado académico de S/ 15,937.60, compuesto por CAPEX S/ 13,200, OPEX S/ 1,030 y contingencia S/ 1,707.60. |
| Resultados reales | El repositorio no contiene libro de gastos, recibos, horas reales por persona ni consumos de infraestructura verificables. Por tanto, el costo desembolsado real no puede establecerse. |
| Variación obtenida | No calculable como variación financiera real. La diferencia entre S/ 500,000 y S/ 15,937.60 es una diferencia entre referencias de planificación de distinto nivel, no un ahorro ejecutado. Para practicar EVM se usa S/ 15,937.60 como BAC académico y AC simulado, claramente señalado en el documento 03. |
| Causa raíz | Las estimaciones iniciales derivaron de una consigna de alcance amplio; la estimación detallada posterior corresponde a un MVP académico reducido y usa tarifas supuestas. |
| Respuesta planificada | Mantener S/ 15,937.60 como referencia únicamente para el ejercicio EVM; reemplazarla por horas y costos reales si se dispone de registros. No presentar cifras simuladas como ejecución presupuestal. |

## 3. Variación de calidad

| Métrica / aspecto | Detalle |
|---|---|
| Resultados planificados | Los requisitos no funcionales y la documentación de calidad establecen verificación automatizada y una referencia de cobertura mínima del 80 %. Se contemplan pruebas de backend, frontend y flujos de navegador. |
| Resultados reales | En la línea actual de `main`, CI backend remoto: 85/85 pruebas y 96 % de cobertura (1,199 sentencias; 46 sin cubrir); Tests and E2E remoto: 55/55 pruebas frontend en 10 archivos y 21/21 pruebas Playwright (7 por Chromium, Firefox y WebKit). CI, Tests and E2E, Green IT Audit y Deploy Production terminaron `success` el 17/11/2026 sobre `0c36fd44`. |
| Variación obtenida | La cobertura remota documentada de 96 % supera la referencia mínima de 80 %. Los conteos de backend, frontend y E2E corresponden a workflows diferentes y no deben sumarse como una sola suite. No se ha presentado una ejecución SUS real; tampoco se afirma que las pruebas E2E con mocks validen PostgreSQL. |
| Causa raíz | La automatización se incorporó progresivamente: primero pruebas de backend/frontend, luego CI, y después E2E con tres navegadores. Los límites de los mocks se documentaron para evitar atribuirles validación de base de datos. |
| Respuesta planificada | Conservar reportes y enlaces de Actions; volver a ejecutar las pruebas después de cambios de cierre; recolectar SUS con al menos cinco participantes reales, según el instrumento existente, y guardar respuestas anónimas. |

## 4. Resumen de causas raíz y acciones

1. **Alcance mayor que el MVP implementado:** se priorizaron módulos operativos, integración y calidad, dejando el optimizador y los indicadores ambientales fuera de la versión final.
2. **Planificación y seguimiento:** el alcance de Sprint 1 se incorporó después del inicio y el cierre de Sprint 2 mantuvo una historia en QA. La retrospectiva recomienda actualizar Jira y guardar evidencia en la misma sesión.
3. **Presupuesto no transaccional:** los documentos contienen estimaciones académicas, no costos reales. El EVM debe leerse como ejercicio simulado.
4. **Evidencia final:** el video MP4 y las capturas actuales del tablero requieren actividades reales y verificables; SUS requiere respuestas de al menos cinco participantes reales.

---

**Conclusión:** las desviaciones principales se concentran en alcance y cronograma. Las métricas de calidad automatizada muestran resultados favorables; las cifras financieras no permiten afirmar un ahorro o costo real porque no existe registro contable.
