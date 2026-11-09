# Matriz de trazabilidad de la rúbrica — Inspección 04 Green IT

| Dato | Valor |
|---|---|
| Proyecto | EcoLogística Huancayo (EcoLogistics) |
| Versión de revisión documental | V_1_0_1 |
| Fecha | 08 de noviembre de 2026 |
| Versión del código evaluado | GitHub Release `v1.0.0`, commit `6041fe83d54367afd7a00139c1366d9f4c90c2fa` |

[← Índice Green IT](./README.md) · [Informe ambiental](./01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) · [Informe de estándares](./02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md) · [Evidencias](./evidencias/README.md)

## 1. Objetivo y criterio de lectura

Esta matriz conecta cada criterio de la rúbrica con archivos y evidencias existentes en el repositorio. No reemplaza la calificación del docente. Distingue entre código implementado, mediciones locales, estados de no aplicabilidad y verificaciones que dependen de una revisión adicional.

La rúbrica asigna pesos de 11 puntos a refactorización/impacto ambiental, 4 a estándares, 3 a CI/CD/Git y 2 a documentación. Para el primer criterio, el nivel suficiente requiere entre seis y siete optimizaciones con evidencia antes/después, Lighthouse entre 70 y 89 y uso del modelo SWDM v4; el nivel sobresaliente requiere ocho optimizaciones, Lighthouse igual o superior a 90 y límites adicionales de FCP/LCP/TBT/CLS/transferencia, con cálculo SWDM correcto. Se debe considerar el alcance real de la medición: Lighthouse se ejecutó sobre `/login`, no sobre todas las vistas autenticadas.

## 2. Criterio 1 — Refactorización técnica e impacto ambiental (11 puntos)

| Área | Implementación comprobada | Evidencia en el repositorio | Antes/después o medición | Límite que debe declararse |
|---|---|---|---|---|
| 1. Consultas SQL eficientes | Lecturas relacionadas de rutas en bloque, filtros en SQL y conteos agregados en dashboard. | `backend/app/services/route_service.py`; `backend/app/routes/dashboard.py`; informe §3.1. | El informe contiene fragmentos comparativos y explicación de reducción de consultas repetidas. | Los índices listados ya existían en el esquema; no se atribuye su creación al trabajo Green IT. |
| 2. Paginación | Backend y frontend en clientes, conductores, pedidos, vehículos y rutas; `page_size` máximo 12. | `backend/app/pagination.py`; `backend/app/routes/`; `frontend/src/components/common/PaginationControls.jsx`; informe §3.2. | Código comparativo y pruebas de endpoints paginados. | Los endpoints de catálogo completos se conservan para selectores y compatibilidad de otros flujos. |
| 3. WebP/AVIF | No se incorporó conversión ni `<picture>`. | Inventario de `frontend/src` y `frontend/public`. | No hay activo rasterizado de la aplicación al que aplicar una conversión. | No contar capturas PNG almacenadas en `docs/` como imágenes de la interfaz de producto. |
| 4. Code splitting | Seis páginas secundarias se importan con `React.lazy()` y se muestran con `Suspense`. | `frontend/src/routes/AppRoutes.jsx`; informe §3.4; `green-it-code-splitting.patch`. | Comparación histórica: transferencia de `/login` de 83,811 B a 77,706 B (−7.28 %). | En esa serie, FCP/LCP no mejoraron; no afirmar aceleración global del renderizado por esta sola intervención. |
| 5. APIs nativas | Los servicios utilizan `fetch` y `URLSearchParams`; no se incorpora una biblioteca HTTP/serialización. | `frontend/src/services/apiClient.js`; servicios `*Service.js`; informe §3.5. | El informe muestra el uso de APIs nativas en los servicios paginados. | No hubo sustitución de una biblioteca instalada; se trata de uso nativo y prevención de dependencias, no de migración. |
| 6. SVG inline | No se aplicó transformación. | Inventario del frontend: no se hallaron SVG externos ni referencias SVG. | No hay solicitud SVG independiente identificada que pueda eliminarse. | Área sin oportunidad demostrada en la versión auditada. |
| 7. Caché HTTP | ETag débil estable, caché privada con revalidación y respuesta 304. | `backend/app/http_cache.py`; rutas paginadas y dashboard; informe §3.7. | Pruebas de API de caché condicional; cabeceras `ETag`, `Cache-Control`, `Vary`. | No se usa React Query; la optimización acreditada es HTTP del lado servidor. |
| 8. Compresión | FastAPI usa `GZipMiddleware`, umbral 500 bytes y nivel 5. | `backend/app/main.py`; `backend/tests/test_vehicle_api.py::test_vehicle_list_uses_gzip_when_response_exceeds_threshold`; anexo 04. | Fragmento de configuración antes/después y medición Lighthouse. | GZip implementado; Brotli no configurado. |

**Lectura defendible:** cinco áreas tienen una implementación técnica directa; el área 5 tiene evidencia de uso de APIs nativas y de no introducir dependencias, pero no una sustitución material de una librería. Las áreas 3 y 6 no presentan oportunidad en el inventario auditado. El informe original agrupa el área 5 entre las seis aplicadas/conformes; si el docente exige una sustitución efectiva, esta área puede ser discutida y el criterio técnico debe valorarse con cautela.

### Métricas Lighthouse registradas

| Indicador | Mediana registrada | Umbral sobresaliente de la rúbrica | Resultado en `/login` |
|---|---:|---:|---|
| Performance | 100/100 | ≥ 90 | Cumple |
| FCP | 213 ms | ≤ 1,000 ms | Cumple |
| LCP | 350 ms | ≤ 1,400 ms | Cumple |
| TBT | 0 ms | ≤ 85 ms | Cumple |
| CLS | 0.000 | ≤ 0.02 | Cumple |
| Transferencia | 76.99 KiB | ≤ 1.1 MB | Cumple |

Son tres ejecuciones Lighthouse CI Desktop de la compilación de producción local sobre `http://localhost/login`. No demuestran esos mismos resultados en clientes, conductores, pedidos, vehículos o rutas ni en un despliegue público.

### SWDM v4 — estimación, no medición directa

La comparación utiliza la reducción de 6,105 bytes por carga, 0.300 kWh/GB y 494 gCO₂e/kWh. Para 500,000 cargas anuales hipotéticas, el ahorro estimado es de 0.91575 kWh/año y 0.45238 kgCO₂e/año. El volumen de 500,000 vistas es un supuesto; no hay evidencia de que corresponda al tráfico real.

**Evaluación prudente:** las métricas Lighthouse y el cálculo SWDM están documentados, pero la interpretación del requisito “6–7 optimizaciones aplicadas” depende de si el docente acepta el área 5 como uso de APIs nativas sin sustitución material. No se debe declarar 8/8 optimizaciones.

## 3. Criterio 2 — Estándares, arquitectura y guía verde (4 puntos)

| Elemento de la rúbrica | Evidencia | Estado y límite |
|---|---|---|
| ISO/IEC 25010:2023 | Informe de estándares §2; relación con eficiencia de desempeño y mantenibilidad. | Referencia de calidad de producto; no afirmar certificación ISO del sistema. |
| Green Software Foundation | Informe §3 y matriz de correspondencia; eficiencia de carbono, energía, carbono consciente y hardware. | Relación conceptual con las decisiones de transferencia y recursos; no hay medición directa de emisiones operativas. |
| W3C WSG 1.0 | Informe §4 y matriz de las ocho áreas; pautas 1.2, 2.4 y 3.1 como pide la rúbrica, además de otras relacionadas. | La publicación consultada es una Group Note Draft, no una certificación de conformidad. |
| Clean Code / SOLID / DRY / YAGNI | Informe §5, reglas para backend y frontend. | Guía de diseño aplicada como criterio de revisión, no certificación formal. |
| Matriz de trazabilidad | Informe de estándares §6; esta matriz complementaria. | Las ocho áreas están mapeadas, incluidas las dos sin oportunidad demostrada. |

## 4. Criterio 3 — CI/CD y gestión de versiones con Git (3 puntos)

| Elemento | Evidencia | Estado |
|---|---|---|
| CI general | `.github/workflows/ci.yml` | Configura pytest con cobertura XML, Vitest con LCOV, build frontend y SonarQube Cloud. La configuración no sustituye la consulta del resultado de cada job. |
| Workflow Green IT | `.github/workflows/green-audit.yml` | Configura build de producción, Lighthouse CI y publicación de reportes como artefacto. |
| Umbrales Lighthouse | `frontend/lighthouserc.json` | Performance ≥ 0.90, FCP ≤ 1,000 ms, LCP ≤ 1,400 ms, TBT ≤ 85 ms, CLS ≤ 0.02 y transferencia ≤ 1,100,000 bytes. |
| Workflow remoto | [GitHub Actions](https://github.com/LeeoGold/EcoLogistics/actions) | Green IT Audit reportado en verde durante el cierre; revisar por separado el resultado de `CI` y del análisis SonarQube. |
| Rama, commit y tag | `main`, commit `6041fe83…`, tag `v1.0.0`. | Release publicada en GitHub. |
| Secuencia Git | Informe de estándares §8; historial del repositorio. | El cierre se consolidó en `main`; no describirlo como merge de PR si no se utilizó uno para este commit. |

## 5. Criterio 4 — Estructura documental y comunicación (2 puntos)

| Evidencia | Ubicación |
|---|---|
| README principal y navegación | `README.md` |
| Configuración de desarrollo | `DEV_SETUP.md` |
| Índice de implementación | `docs/03 Implementación/README.md` |
| Índice Green IT | `docs/03 Implementación/reduccion del impacto ambiental/README.md` |
| Informe ambiental | `01 Informe de reduccion del impacto ambiental V_1_0_0.md` |
| Estándares | `02 Estandares Ingeniería de software V_1_0_0.md` |
| Capturas, pruebas y Lighthouse | `evidencias/README.md` y subcarpetas |

La documentación utiliza Markdown, tablas, código delimitado y enlaces relativos. Se recomienda presentar los documentos en el orden: índice Green IT → informe ambiental → estándares → matriz de trazabilidad → evidencias.

## 6. Preparación de la exposición

- [ ] Abrir el README principal y explicar stack real y alcance de la plataforma.
- [ ] Mostrar la paginación en los cinco módulos y el límite de 12 registros.
- [ ] Abrir el código de `route_service.py` y `dashboard.py` para explicar las lecturas por bloques y agregaciones.
- [ ] Mostrar `http_cache.py` y `main.py` para ETag, 304 y GZip.
- [ ] Mostrar `AppRoutes.jsx` y los chunks de build para code splitting.
- [ ] Mostrar los tres reportes Lighthouse y aclarar que solo corresponden a `/login`.
- [ ] Explicar el cálculo SWDM v4 y el carácter hipotético de las 500,000 cargas/año.
- [ ] Reconocer sin ocultar que WebP/AVIF y SVG inline no se aplicaron por falta de activos; aclarar el alcance parcial del área de APIs nativas.
- [ ] Mostrar la Release `v1.0.0` y la ejecución de GitHub Actions en verde.

## 7. Fuentes

- Rúbrica de evaluación de la Inspección 04, distribuida en el aula virtual.
- Código fuente del repositorio `LeeoGold/EcoLogistics`, Release `v1.0.0`.
- Informes Green IT y evidencias Lighthouse conservadas en esta carpeta.


## 6. Verificación posterior a la Release

La revisión posterior a `v1.0.0` corrige compatibilidad con Python 3.13 y agrega una prueba de GZip; no modifica las cifras históricas atribuidas a la Release original. La suite backend obtuvo 81 pruebas aprobadas en Python 3.13.5 con pytest 9.0.2; el workflow usa pytest `>=8,<9`, así que CI debe confirmar el mismo resultado con su dependencia declarada. Ver [Anexo 04](./04%20Anexo%20de%20validacion%20posterior%20a%20v1.0.0.md). La publicación de esta corrección queda condicionada a la validación de CI general y Green IT Audit.
