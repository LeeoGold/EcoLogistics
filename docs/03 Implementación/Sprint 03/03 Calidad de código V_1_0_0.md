# Evaluación de Calidad de Código — SonarQube

**Nombre del proyecto:** EcoLogística Huancayo\
**Fecha de análisis/evidencia:** 2026-10-20\
**Versión del documento:** V_1_0_0\
**Pull Request evaluado:** [#6 — Sprint 3: calidad de código y SonarQube](https://github.com/LeeoGold/EcoLogistics/pull/6)

[← Índice del Sprint 3](README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## 1. Resumen ejecutivo de Quality Gate

- **Estado del Quality Gate del PR #11:** **PASSED**.
- **Nuevas incidencias en el análisis del PR:** 0.
- **Accepted issues:** 0.
- **Security Hotspots en el PR:** 0.
- **Coverage on New Code en el PR #11:** 88,1 % según SonarCloud; corresponde al código nuevo, no a la cobertura global del repositorio.
- **Duplication on New Code en el PR:** 0,0 % según la pantalla del check.
- **Cobertura total local del backend:** 97 % con `pytest-cov` (72 pruebas aprobadas; 981 sentencias y 34 no cubiertas).
- **Cobertura local del frontend:** 14/14 pruebas aprobadas; 100 % en sentencias, líneas y funciones y 90 % en ramas para los cuatro archivos instrumentados.

**Interpretación:** los datos de Coverage on New Code y Duplication on New Code pertenecen al alcance nuevo del PR. No deben presentarse como métricas globales del producto. La cobertura global medida localmente por `pytest-cov` fue 97 %, pero debe verificarse en SonarQube que el archivo `backend/coverage.xml` esté siendo importado y que la página Measures muestre la métrica global esperada.

## 2. Métricas principales

### Resultado del código nuevo de PR #6

| Categoría/métrica | Resultado documentado | Severidad / alcance |
|---|---|---|
| Nuevas incidencias (todas las categorías) | 0 | El check del PR no reportó issues nuevos. El desglose por tipo no quedó en la captura disponible. |
| Bugs nuevos | No hay desglose por tipo en la evidencia guardada | No se atribuye un total de la rama principal al código nuevo. |
| Vulnerabilidades nuevas | No hay desglose por tipo en la evidencia guardada | No se deduce que el proyecto completo esté libre de vulnerabilidades. |
| Code Smells nuevos | No hay desglose por tipo en la evidencia guardada | Revisar Issues/Measures para obtener cifras actuales. |
| Security Hotspots del PR | 0 | Corresponde al análisis del pull request. |
| Cobertura de código nuevo | 0,0 % | Métrica del código nuevo mostrada por SonarQube para el PR. |
| Duplicación de código nuevo | 0,0 % | Métrica del código nuevo mostrada por SonarQube para el PR. |

### Contexto histórico: captura anterior de `main`

Una captura de SonarQube tomada antes del análisis del PR #6 mostraba los siguientes valores en `main`:

| Área en la vista del proyecto | Valor observado entonces | Observación |
|---|---:|---|
| Security | 1 incidencia abierta; rating A | La captura no permite identificar su detalle o severidad concreta. |
| Reliability | 5 incidencias abiertas; rating E | Revisar la lista actual para conocer regla, archivo y severidad. |
| Maintainability | 0 incidencias abiertas; rating A | Es una captura histórica, no una afirmación sobre el estado actual. |
| Quality Gate | Not computed | El análisis aún no se había computado en esa vista. |
| Coverage | Sin datos visibles | Aparecía la indicación de configurar el análisis de cobertura. |
| Duplications | 0,0 % | La captura indicaba que no había condiciones definidas para unas 3,6 mil líneas. |

> Este contexto histórico no debe mezclarse con el resultado de Quality Gate del PR #6. Después del merge conviene abrir la rama principal actual, revisar las métricas y conservar una captura nueva.

### Incidencias abiertas observadas en main (captura del 2026-10-22)

La captura de SonarQube Cloud del proyecto EcoLogistics muestra cinco incidencias abiertas bajo los filtros aplicados. El esfuerzo total estimado por la herramienta es de 50 minutos; es una estimación, no un tiempo de reparación medido.

| N.º | Archivo y ubicación | Hallazgo mostrado por SonarQube | Clasificación visible | Esfuerzo estimado |
|---:|---|---|---|---:|
| 1 | `database/migrations/001_rename_consumo_km_a_km_gal.sql`, línea 25 | Comprobar que la consulta `UPDATE` incluya una cláusula `WHERE`. | Reliability — Blocker | 30 min |
| 2 | `backend/app/schemas/vehicle.py`, línea 20 | Expresión dependiente del tiempo dentro del cuerpo de una clase. Regla `pythonenterprise:S8434`. | Security — High; Reliability — High | 5 min |
| 3 | `frontend/src/state/ClientContext.jsx`, línea 43 | Promesa sin manejo explícito de rechazo. | Reliability — Medium | 5 min |
| 4 | `frontend/src/state/OrderContext.jsx`, línea 33 | Promesa sin manejo explícito de rechazo. | Reliability — Medium | 5 min |
| 5 | `frontend/src/state/VehicleContext.jsx`, línea 38 | Promesa sin manejo explícito de rechazo. | Reliability — Medium | 5 min |

El hallazgo de `backend/app/schemas/vehicle.py` corresponde a la expresión `date.today().year + 1` usada como límite superior de `anio_fabricacion` en un atributo de clase. La fecha se calcula al importar el módulo y el valor puede quedar desactualizado hasta que el proceso se reinicie.

**Remediación propuesta, todavía no aplicada:** conservar la validación de año mínimo y evaluar el límite superior con la fecha vigente durante la validación del dato, por ejemplo mediante un validador de campo. Añadir pruebas para el año permitido y el siguiente año no permitido. Ejecutar después las pruebas de backend y volver a analizar con SonarQube.

Las incidencias anteriores corresponden a la rama `main` consultada. No se afirma que hayan sido introducidas por el Pull Request #6 ni que estén corregidas.

## 3. Deuda técnica y plan de remediación

**Deuda técnica estimada:** no se obtuvo una estimación temporal verificable en las capturas consultadas; no se asigna una duración inventada.

| Prioridad | Hallazgo o limitación | Acción correctiva / seguimiento | Evidencia para cerrar |
|---|---|---|---|
| Alta | La captura histórica de `main` reflejaba 5 incidencias abiertas de Reliability. | Abrir la lista actual, inspeccionar regla, archivo y severidad; priorizar correcciones en orden de impacto. | Lista de incidencias revisada y PR correctiva cuando corresponda. |
| Alta | Una captura histórica mostraba 1 incidencia abierta en Security. | Verificar el issue actual y confirmar si es vulnerabilidad, hotspot u otra categoría; no asumir que son equivalentes. | Detalle del issue y decisión documentada. |
| Media | No quedó comprobada la cobertura global importada en SonarQube. | Confirmar que CI genera `backend/coverage.xml`, que el archivo está disponible antes del scanner y que `sonar.python.coverage.reportPaths=backend/coverage.xml` se aplica desde la raíz del repositorio. | Medida Coverage global visible en SonarQube o error de importación identificado. |
| Media | La advertencia de compatibilidad de httpx/Starlette se atendió en el PR #9. | Mantener las versiones compatibles y revisar avisos en futuras actualizaciones. | La validación posterior finalizó con 72/72 pruebas del backend aprobadas. |
| Baja | GitHub Actions mostró avisos sobre acciones que apuntan a Node.js 20 y futura migración de `ubuntu-latest`. | Revisar las versiones soportadas de las acciones y migrarlas en un cambio separado, con validación CI. | Workflow actualizado y checks verdes. |

## 4. Conclusión

El análisis de SonarQube Cloud para el PR #11 terminó con **Quality Gate passed**. Registró 0 nuevas incidencias, 0 incidencias aceptadas, 0 Security Hotspots, 88,1 % de cobertura en código nuevo y 0,0 % de duplicación en código nuevo. Localmente, el backend alcanzó 72/72 pruebas aprobadas y 97 % de cobertura total; el frontend alcanzó 14/14 pruebas aprobadas y un build correcto. Las cifras locales y las métricas de código nuevo de SonarCloud corresponden a alcances distintos.

## 5. Fuentes y evidencias

- [PR #6 en GitHub](https://github.com/LeeoGold/EcoLogistics/pull/6)
- [Ejecuciones de GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions)
- [Resumen de EcoLogistics en SonarQube Cloud](https://sonarcloud.io/project/overview?id=LeeooGold_EcoLogistics)
- [Documentación de SonarQube Cloud: análisis de cobertura de Python](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/test-coverage/python-test-coverage/)

## Navegación

- [Índice del Sprint 3](README.md)
- [Índice de implementación](../README.md)
- [README principal](../../../README.md)
