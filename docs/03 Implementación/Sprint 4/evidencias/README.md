# Evidencias E2E — Sprint 4

[← Índice del Sprint 4](../README.md) · [Índice de implementación](../../README.md) · [README principal](../../../../README.md)

## 1. Resultado local de Playwright

La ejecución local comunicada registró **21 pruebas aprobadas de 21**, distribuidas en Chromium (7), Firefox (7) y WebKit (7). Esta cifra corresponde a la ejecución local compartida por el equipo.

## 2. Código y reproducibilidad

| Evidencia | Ubicación | Alcance |
|---|---|---|
| Configuración | `frontend/playwright.config.js` | Chromium, Firefox y WebKit. |
| Escenarios | `frontend/e2e/` | Siete escenarios por navegador. |
| Ejecución local | `npm run test:e2e` | Resultado comunicado: 21/21. |
| Reporte HTML | `frontend/playwright-report/` | Reporte de Playwright. |
| Workflow remoto | [tests.yml](../../../../.github/workflows/tests.yml) | Ejecución en GitHub Actions. |

Las pruebas utilizan interceptación de red para simular las respuestas de la API. Verifican comportamientos de interfaz y permisos visibles; no son una prueba E2E contra PostgreSQL. La autorización real del backend se cubre con las pruebas de API.

## 3. Estado de evidencia remota

**Ejecución remota verificada:** `tests.yml` terminó con conclusión `success` el 16/11/2026. El artifact `playwright-e2e-report-2` (reporte HTML y diagnósticos) se encuentra disponible en [la ejecución de GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions/runs/43893234055) con retención de 14 días.

## 4. Navegación

- [Revisión del Sprint](../01%20Revisi%C3%B3n%20del%20Sprint%20V_1_0_0.md)
- [Análisis Playwright](../03%20Analisis%20PlayWrigth%20V_1_0_0.md)
- [README principal](../../../../README.md)