# Sprint 3 — Calidad de código y evaluación

**Proyecto:** EcoLogística Huancayo\
**Versión del índice:** V_1_0_0\
**Fecha de preparación:** 2026-10-20

[← Índice de implementación](../README.md) · [README principal](../../../README.md)

## Entregables del Sprint 3

| Ítem | Documento | Propósito | Estado documental |
|---|---|---|---|
| 1 | [01 Revisión del Sprint V_1_0_0](./01%20Revisi%C3%B3n%20del%20Sprint%20V_1_0_0.md) | Alcance real, demostración técnica, resultados y pendientes. | Preparado con evidencia técnica disponible. |
| 2 | [02 Retrospectiva del Sprint V_1_0_0](./02%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) | Aprendizajes, fortalezas y acciones medibles de mejora. | Preparado; compromisos propuestos para el siguiente ciclo. |
| 3 | [03 Calidad de código V_1_0_0](./03%20Calidad%20de%20c%C3%B3digo%20V_1_0_0.md) | Quality Gate, cobertura, duplicación, incidencias y remediación. | Quality Gate del PR aprobado; falta confirmar cobertura global actual. |
| 4 | [04 OWASP V_1_0_0](./04%20OWASP%20V_1_0_0.md) | Matriz OWASP Top 10:2025 y plan de verificación. | Evaluación preliminar; categorías pendientes de revisión específica. |
| 5 | [05 WCAG V_1_0_0](./05%20WCAG%20V_1_0_0.md) | Accesibilidad según los cuatro principios WCAG, hallazgos y correcciones. | Lighthouse en Inicio: 100/100; 18 auditorías automáticas aprobadas y 0 fallidas. Pendientes: 10 comprobaciones manuales y otras vistas. |

## Evidencias técnicas disponibles

- Pull Request [#6 — Sprint 3: calidad de código y SonarQube](https://github.com/LeeoGold/EcoLogistics/pull/6), integrado en `develop`.
- Ejecuciones de [GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions).
- Proyecto [EcoLogistics en SonarQube Cloud](https://sonarcloud.io/project/overview?id=LeeooGold_EcoLogistics).
- Pruebas locales del backend: **43 aprobadas de 43**, cobertura total local **97 %** y una advertencia de obsolescencia de `httpx`/Starlette.
- Compilación local del frontend con Vite: **44 módulos transformados**, resultado correcto.
- SonarQube Cloud para el PR #6: **Quality Gate passed**, 0 incidencias nuevas, 0 accepted issues, 0 Security Hotspots y 0,0 % en las métricas de cobertura y duplicación *de código nuevo* mostradas por el análisis del PR.

> Importante: el 97 % es la cobertura local del backend calculada por `pytest-cov`. No se debe presentar como cobertura global de SonarQube. El 0,0 % de cobertura en código nuevo que muestra el análisis del PR tampoco equivale a la cobertura global de la aplicación. La importación de `backend/coverage.xml` y la cobertura global actual deben comprobarse por separado.

## Criterio de cierre documental

- [ ] Los cinco documentos están revisados y sin marcadores pendientes que se presenten como resultados reales.
- [ ] Se completa la revisión manual de las categorías OWASP 2025 y se documenta evidencia por categoría.
- [ ] Se ejecutan Lighthouse y/o axe/WAVE y las comprobaciones manuales de WCAG; se adjuntan resultados reales.
- [ ] Se confirma la cobertura global visible en SonarQube Cloud y se revisan las incidencias históricas actuales.
- [ ] README principal, índice de implementación e índice del Sprint conservan enlaces de ida y vuelta.

## Navegación

- [← Volver al índice de implementación](../README.md)
- [← Volver al README principal](../../../README.md)
