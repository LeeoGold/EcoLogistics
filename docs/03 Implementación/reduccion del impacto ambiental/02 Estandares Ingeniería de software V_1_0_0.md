# Estándares de ingeniería de software y guía Green IT

**Proyecto:** EcoLogística Huancayo / EcoLogistics
**Versión documental:** V_1_0_0
**Fecha de actualización:** 2026-10-29
**Rama objetivo de entrega:** `main`
**Estado:** prácticas adaptadas al stack real; la división de código del frontend es la práctica implementada y probada en esta intervención. No se afirma certificación ni conformidad total con las normas.

[← README principal](../../../README.md) · [Índice de implementación](../README.md) · [Informe Green IT](./01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md)

## 1. Propósito

Establecer pautas verificables para eficiencia, mantenibilidad, seguridad y sostenibilidad del software EcoLogistics. Cada pauta se registra con un estado real y una evidencia de aceptación, en vez de asumir que una recomendación es una implementación.

## 2. Arquitectura evaluada

- **Frontend:** React 19 + Vite 8.
- **Backend:** FastAPI + Python.
- **Base de datos:** PostgreSQL mediante SQLAlchemy.
- **Pruebas:** pytest/pytest-cov, Vitest y Testing Library.
- **Automatización/calidad:** GitHub Actions y SonarQube Cloud.

Los ejemplos de MongoDB/Mongoose y Express del HTML de la actividad no son aplicables literalmente a este proyecto.

## 3. Relación con estándares y guías

### 3.1 ISO/IEC 25010:2023 — modelo de calidad del producto

Se toman como perspectivas relevantes:

- **Eficiencia de desempeño:** comparar comportamiento temporal, transferencia y uso de recursos con escenarios repetibles.
- **Mantenibilidad:** mantener código modular y facilitar análisis, cambios y pruebas.
- **Fiabilidad y seguridad:** comprobar que paginación, caché, compresión o carga diferida no rompan flujos ni expongan respuestas privadas.

La aplicación de una sola práctica no equivale a conformidad integral con ISO/IEC 25010.

Referencia oficial: https://www.iso.org/standard/78176.html

### 3.2 Green Software Foundation / ISO/IEC 21031:2024 — Software Carbon Intensity (SCI)

SCI requiere delimitar el sistema, definir una unidad funcional y declarar método, datos y supuestos. EcoLogistics no tiene una medición directa de energía de infraestructura incorporada en esta actividad; por tanto, este cierre no asigna una puntuación SCI ni un valor de CO₂e a las cargas de `/login`.

Referencias:
- ISO/IEC 21031:2024: https://www.iso.org/standard/86612.html
- Green Software Foundation — SCI: https://greensoftware.foundation/standards/sci/
- Especificación SCI: https://sci.greensoftware.foundation/

### 3.3 W3C Web Sustainability Guidelines (WSG)

Las WSG reúnen recomendaciones para considerar impactos ambientales, sociales y económicos en productos digitales. En la fecha de esta revisión, la referencia citada se identifica como **W3C Group Note Draft**, no como una certificación ni un estándar final. Se usa como guía de buenas prácticas.

Referencia: https://www.w3.org/TR/web-sustainability-guidelines/

### 3.4 Sustainable Web Design Model (SWDM)

Puede usarse para estimar emisiones digitales si se registran la versión del modelo, los límites, la unidad funcional, los factores y los supuestos aplicables. El peso de un bundle o la puntuación Lighthouse no se convierten directamente en gramos de CO₂e.

Referencia: https://sustainablewebdesign.org/estimating-digital-emissions/

## 4. Guía de desarrollo verde adaptada

### 4.1 Backend — FastAPI, Python, SQLAlchemy y PostgreSQL

1. **Paginación:** evitar listados ilimitados. Definir límite máximo y formato de página/offset o cursor cuando el caso de uso lo requiera; probar límites, orden, datos vacíos y errores.
2. **Consultas SQL:** revisar columnas recuperadas, consultas N+1 y planes `EXPLAIN (ANALYZE, BUFFERS)` en datos de prueba; no crear índices sin una justificación de uso medible.
3. **Carga ORM:** recuperar solo relaciones necesarias y comprobar el efecto de las estrategias de carga.
4. **Compresión HTTP:** evaluar `GZipMiddleware` para respuestas textuales suficientemente grandes; verificar `Accept-Encoding`, `Content-Encoding`, tamaño y latencia.
5. **Caché segura:** no compartir respuestas privadas/autenticadas entre usuarios; documentar encabezados y políticas adecuadas para cada recurso.
6. **Pruebas de contrato:** mantener códigos HTTP, estructura de respuesta, autenticación y autorización cuando se optimicen endpoints.

### 4.2 Frontend — React y Vite

1. **División de código:** usar `React.lazy()` y `Suspense` en vistas secundarias si reduce el bundle inicial sin perjudicar la interacción; proporcionar un fallback entendible y accesible.
2. **Dependencias:** justificar librerías nuevas, revisar su efecto en bundle y evitar retirar paquetes sin tests/build.
3. **Imágenes/activos:** inventariar formato, dimensiones y tamaño antes de convertir; conservar calidad, dimensiones declaradas y alternativas apropiadas.
4. **Carga diferida de imágenes:** aplicar `loading="lazy"` a imágenes no críticas fuera del primer viewport; no retrasar un recurso esencial que determine LCP.
5. **Solicitudes HTTP:** buscar duplicados y llamadas repetidas en Network, midiendo el mismo flujo antes/después.
6. **Activos estáticos/caché:** revisar los nombres con hash de Vite y las cabeceras reales del servidor de publicación antes de declarar una política de caché.
7. **Accesibilidad:** conservar anuncios de estado, navegación por teclado, foco visible, texto alternativo y manejo de errores después de los cambios.

### 4.3 Pruebas y evidencia

- Backend: `python -m pytest --cov=app --cov-report=term-missing` desde `backend` cuando se modifique el backend.
- Frontend: `npm test -- --run` y `npm run build` desde `frontend`.
- Guardar commit, entorno, comandos, resultados y limitaciones.
- Mantener idéntica la ruta/condición al comparar auditorías; reportar por separado Lighthouse y una captura Network sin throttling.
- Mantener la línea base original sin sobrescribirla.
- No incluir contraseñas, tokens ni datos productivos en logs o reportes.

## 5. Matriz de estado de las prácticas

| N.º | Práctica | Estado de este cierre | Evidencia o criterio pendiente |
|---:|---|---|---|
| 1 | Consultas SQL, columnas e índices | **Pendiente de evaluación** | Consultas concretas, datos de prueba, plan SQL y comparación de latencia/recursos. |
| 2 | Paginación de listados | **Pendiente de verificación por endpoint** | Confirmar contratos API y tests de límite/página; medir bytes por listado. |
| 3 | Optimización de imágenes | **Pendiente de inventario** | Lista de recursos, tamaños/formats y comparativa si aplica optimización. |
| 4 | React `lazy()`/`Suspense` | **Aplicada y probada** | Build produce chunks; 14 pruebas frontend aprobadas. Lighthouse: bundle/bytes bajan, pero el score no mejora y la medición posterior presenta discrepancias. |
| 5 | Limpieza de dependencias | **No realizada en esta intervención** | Auditoría del uso real y comparación del bundle; no eliminar por intuición. |
| 6 | Minimización de peticiones | **Medida solo en `/login`** | 3 solicitudes antes y 3 después; revisar dashboard y flujos autenticados por separado. |
| 7 | Caché HTTP | **Pendiente de medir en despliegue** | Encabezados, comportamiento de caché/revalidación y revisión de seguridad en respuestas autenticadas. |
| 8 | Compresión backend | **Pendiente de medir** | Verificar configuración FastAPI, `Content-Encoding`, bytes transferidos y latencia. |

Esta matriz refleja lo que se verificó en esta intervención. No se marca como «implementada» una optimización que solo fue sugerida en el HTML de referencia.

## 6. Validación del cambio implementado

En la intervención de división de código:

- `frontend/src/routes/AppRoutes.jsx` importa las páginas funcionales secundarias de forma diferida y usa un estado de carga accesible con `Suspense`.
- `LoginPage` permanece estática.
- La suite frontend posterior finalizó con **14/14 pruebas aprobadas**.
- `npm run build` finalizó correctamente; Vite transformó 48 módulos y generó chunks para las vistas secundarias.
- El JavaScript principal bajó de 272.07 kB a 235.76 kB sin comprimir (aprox. 13.3 %). Los bytes transferidos por Lighthouse en `/login` bajaron de 83,811 a 77,706.
- El score Performance mediano de Lighthouse para `/login` pasó de 100 a 95 en las tres ejecuciones posteriores. Además, los informes posteriores presentan discrepancias entre LCP, desglose del renderizado y la secuencia de fotogramas. Por esa razón, el resultado no se presenta como una mejora global de rapidez percibida.

El cambio documentado es principalmente frontend; si posteriormente se alteran endpoints, consultas, paginación o compresión backend, deben repetirse los tests del backend y los escenarios de API pertinentes.

## 7. CI/CD para Green IT

El repositorio dispone de CI para las pruebas y la compilación existentes. Un workflow separado de Lighthouse CI puede agregarse como mejora opcional tras seleccionar una URL reproducible y decidir los umbrales. No se afirma que `green-audit.yml` esté implementado ni ejecutado.

Requisitos para implementarlo más adelante:

1. Usar versiones bloqueadas con `npm ci`.
2. Compilar y servir la aplicación en modo producción antes de auditar.
3. Verificar disponibilidad de la URL objetivo y configurar explícitamente el entorno.
4. Guardar el reporte como artefacto de GitHub Actions.
5. No ocultar fallos con `|| true`; separar claramente umbrales informativos y bloqueantes.
6. No publicar informes que contengan datos privados.

## 8. Reglas de aceptación para la revisión Green IT

- [x] Los documentos están adaptados a React/FastAPI/PostgreSQL.
- [x] Se identifica la práctica implementada y se separa de las pendientes.
- [x] Se conservaron tres informes Lighthouse anteriores y tres posteriores.
- [x] La división de código se validó con tests frontend y build de producción.
- [x] Los resultados adversos e inconsistencias de Lighthouse están registrados.
- [x] No se presentan emisiones de CO₂e no medidas como resultados reales.
- [ ] Los documentos y evidencias se deben incorporar a `main` mediante commit y push.

## 9. Referencias

1. ISO/IEC 25010:2023, *Product quality model*: https://www.iso.org/standard/78176.html
2. ISO/IEC 21031:2024, *Software Carbon Intensity (SCI) specification*: https://www.iso.org/standard/86612.html
3. Green Software Foundation, SCI: https://greensoftware.foundation/standards/sci/
4. SCI Specification: https://sci.greensoftware.foundation/
5. W3C, Web Sustainability Guidelines (Group Note Draft): https://www.w3.org/TR/web-sustainability-guidelines/
6. Sustainable Web Design Model: https://sustainablewebdesign.org/estimating-digital-emissions/
7. Repositorio EcoLogistics: https://github.com/LeeoGold/EcoLogistics/tree/main

## 10. Historial del documento

| Versión | Fecha | Cambios |
|---|---|---|
| V_1_0_0 | 2026-10-29 | Actualización de estado tras division de código y comparación Lighthouse/transferencia; criterios restantes explícitos. |
