# Sprint 3 — Calidad de código y evaluación

| Dato | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo |
| Periodo documental | Octubre de 2026 |
| Naturaleza | Registro histórico del Sprint 3; sus estados y métricas no sustituyen los resultados de la Release Green IT `v1.0.0`. |

[← Índice de implementación](../README.md) · [README principal](../../../README.md) · [Índice Green IT de la versión `v1.0.0`](../reduccion%20del%20impacto%20ambiental/README.md)

## 1. Entregables del Sprint 3

| Ítem | Documento | Propósito | Alcance temporal |
|---|---|---|---|
| 1 | [01 Revisión del Sprint V_1_0_0](./01%20Revisi%C3%B3n%20del%20Sprint%20V_1_0_0.md) | Alcance real, demostración técnica, resultados y pendientes. | Revisión de octubre de 2026. |
| 2 | [02 Retrospectiva del Sprint V_1_0_0](./02%20Retrospectiva%20del%20Sprint%20V_1_0_0.md) | Aprendizajes, fortalezas y acciones de mejora. | Cierre de Sprint 3. |
| 3 | [03 Calidad de código V_1_0_0](./03%20Calidad%20de%20c%C3%B3digo%20V_1_0_0.md) | Quality Gate, cobertura, duplicación e incidencias. | Métricas de la ejecución/PR indicada en el propio informe. |
| 4 | [04 OWASP V_1_0_1](./04%20OWASP%20V_1_0_1.md) | Matriz OWASP Top 10:2025 y hallazgos de seguridad. | Evaluación preliminar de octubre de 2026; requiere revalidación contra `v1.0.0`. |
| 5 | [05 WCAG V_1_0_1](./05%20WCAG%20V_1_0_1.md) | Accesibilidad, resultados automatizados y revisión manual. | Evidencia limitada a vistas y pruebas descritas en el informe. |

## 2. Cómo interpretar los hallazgos históricos

- El informe OWASP registró SEC-001 y SEC-002 como hallazgos abiertos en su fecha de evaluación. El código de la versión Green IT contiene autenticación JWT, hash Argon2 y controles de rol; esto debe tomarse como una implementación posterior o una diferencia de alcance que requiere volver a probar los controles, no como cierre automático de los hallazgos.
- El repositorio contiene un flujo de autenticación y autorización en backend. No se declara que toda la matriz OWASP esté cerrada, que exista MFA/TOTP funcional ni que el sistema tenga certificación de seguridad.
- El informe WCAG contiene resultados de determinadas vistas y pruebas manuales. No equivale a una certificación de conformidad WCAG 2.2 AA para toda la aplicación.
- Las métricas de cobertura, número de pruebas y módulos transformados que aparecen en los documentos del Sprint 3 son fotografías de ese periodo. No se deben presentar como métricas de la Release `v1.0.0`.

## 3. Referencias técnicas de entregas posteriores

Para presentar el estado de la versión publicada, utiliza la documentación de la Inspección 04:

- [Resumen, arquitectura y estado Green IT](../reduccion%20del%20impacto%20ambiental/README.md)
- [Informe ambiental y resultados Lighthouse/SWDM](../reduccion%20del%20impacto%20ambiental/01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md)
- [Matriz de trazabilidad de la rúbrica](../reduccion%20del%20impacto%20ambiental/03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md)
- [Release `v1.0.0` en GitHub](https://github.com/LeeoGold/EcoLogistics/releases/tag/v1.0.0)

## 4. Evidencias externas

- [Repositorio y código fuente](https://github.com/LeeoGold/EcoLogistics)
- [Pull Request #6 — Sprint 3](https://github.com/LeeoGold/EcoLogistics/pull/6)
- [Historial de GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions)
- [Proyecto EcoLogistics en SonarQube Cloud](https://sonarcloud.io/project/overview?id=LeeooGold_EcoLogistics)

**Nota:** los estados externos deben consultarse en sus plataformas para conocer su situación actual. Las capturas y los documentos de esta carpeta son evidencias históricas con fecha.
