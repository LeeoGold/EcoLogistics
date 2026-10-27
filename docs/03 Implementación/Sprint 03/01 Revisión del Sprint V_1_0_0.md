# Revisión del Sprint — V_1_0_0

**Nombre del proyecto:** EcoLogística Huancayo\
**Líder del proyecto:** Kevyn Leeonardo Velasquez Palomino\
**Fecha de revisión documental:** 2026-10-20\
**Pull Request de referencia:** [#6 — Sprint 3: calidad de código y SonarQube](https://github.com/LeeoGold/EcoLogistics/pull/6)\
**Versión:** V_1_0_0

[← Índice del Sprint 3](README.md) · [Índice de implementación](../README.md) · [README principal](../../../README.md)

## Historias de Usuario completadas en este Sprint

En el pull request #6 no se incorporaron nuevas historias funcionales con un identificador US-XX. El incremento de esta iteración se centró en la automatización y la evaluación técnica de calidad, así como en preparar sus evidencias.

| Ítem de trabajo | Resultado comprobado | Criterio de terminado (Definition of Done) |
|---|---|---|
| Integración de pruebas del backend en CI | El job `Backend tests (SQLite aislada)` pasó en GitHub Actions. | Las dependencias se instalan, las pruebas se ejecutan y el trabajo termina en verde. |
| Generación del reporte de cobertura | `pytest-cov` generó `backend/coverage.xml` en local; el workflow genera el reporte durante CI. | El XML se genera durante el trabajo de pruebas y se excluye del control de versiones por ser un artefacto generado. |
| Análisis de SonarQube Cloud | El check `SonarCloud Code Analysis` del PR #6 terminó con **Quality Gate passed**. | El análisis termina correctamente y el resultado queda visible en el pull request. |
| Construcción del frontend | Vite completó la compilación local y `Frontend build` pasó en GitHub Actions. | `npm ci` y `npm run build` terminan correctamente. |
| Configuración y trazabilidad | Se integraron `.github/workflows/ci.yml`, `.gitignore` y `sonar-project.properties` mediante el PR #6. | Los cambios están integrados en `develop` y la rama local se sincronizó con `origin/develop`. |

## Demostración del trabajo completado

La demostración técnica disponible se realizó mediante la ejecución de pruebas, el build del frontend y la comprobación de SonarQube en el pull request. Los resultados observados fueron:

- **Backend local:** 72 pruebas aprobadas de 72; 981 sentencias medidas, 34 no cubiertas y 97 % de cobertura total.
- **Frontend:** 14 pruebas aprobadas de 14; 100 % en sentencias, líneas y funciones y 90 % en ramas, medido sobre los cuatro archivos instrumentados.
- **SonarCloud, PR #11:** Quality Gate aprobado; 0 nuevas incidencias, 0 Security Hotspots, 88,1 % de cobertura en código nuevo y 0,0 % de duplicación en código nuevo.
- **Frontend local:** Vite transformó 44 módulos y terminó con código de salida 0.
- **GitHub Actions:** los trabajos `Backend tests (SQLite aislada)` y `Frontend build` quedaron en verde tanto en la ejecución push observada como en las comprobaciones del pull request.
- **SonarQube Cloud, PR #6:** `Quality Gate passed`, 0 incidencias nuevas, 0 accepted issues y 0 Security Hotspots en el análisis del PR. La pantalla mostró 0,0 % de Coverage on New Code y 0,0 % de Duplication on New Code; estos valores describen el código nuevo del PR, no la cobertura global del backend.
- **Integración Git:** PR #6 integrado en `develop`; commit de merge informado por Git como `aa8de14`.

Enlaces de evidencia:

- [Pull Request #6](https://github.com/LeeoGold/EcoLogistics/pull/6)
- [GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions)
- [Proyecto EcoLogistics en SonarQube Cloud](https://sonarcloud.io/project/overview?id=LeeooGold_EcoLogistics)

> No se adjuntó una evidencia separada de aceptación formal por stakeholders. Por ello, este documento registra la demostración técnica verificable y no afirma una aceptación externa que no se haya documentado.

## Pendientes

1. Confirmar en SonarQube Cloud que `backend/coverage.xml` se importa y consultar la cobertura global más reciente del proyecto.
2. Revisar la lista actual de incidencias de la rama principal; una captura anterior a la integración mostraba 1 incidencia abierta en Security y 5 en Reliability. Esos datos son históricos y deben verificarse de nuevo antes de considerarlos vigentes.
3. Completar la evaluación del OWASP Top 10:2025 con una revisión específica de las diez categorías; no se infiere que el proyecto esté libre de riesgo solo porque el PR no reportó incidencias nuevas.
4. Ejecutar y registrar las pruebas de accesibilidad WCAG 2.2 AA automáticas y manuales.
5. Si corresponde a la dinámica académica, realizar o dejar registrada la demostración formal ante stakeholders.
6. Capturar y conservar las evidencias finales en el repositorio, manteniendo enlaces desde los README.

## Navegación

- [Índice del Sprint 3](README.md)
- [Índice de implementación](../README.md)
- [README principal](../../../README.md)
