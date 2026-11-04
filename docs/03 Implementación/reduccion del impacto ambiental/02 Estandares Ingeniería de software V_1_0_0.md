# Estándares de ingeniería de software y guía de desarrollo verde

**Proyecto:** EcoLogística Huancayo (EcoLogistics)<br>
**Versión documental:** V_1_0_0<br>
**Fecha:** 03 de noviembre de 2026<br>
**Stack:** React 19 + Vite 8 / FastAPI + SQLAlchemy / PostgreSQL<br>
**Propósito:** justificar las decisiones de optimización mediante ISO/IEC 25010, Green Software Foundation (GSF), W3C Web Sustainability Guidelines (WSG) y prácticas de Clean Code, SOLID, DRY y YAGNI.

[Informe Green IT](./01%20Informe%20de%20reduccion%20del%20impacto%20ambiental%20V_1_0_0.md) · [Índice de evidencias](./evidencias/README.md)

---

## 1. Alcance y principio de adaptación tecnológica

La rúbrica de la actividad presenta ejemplos del stack MERN. EcoLogistics utiliza React para la interfaz, FastAPI/Python para la API y PostgreSQL mediante SQLAlchemy para persistencia. Por tanto, la correspondencia técnica se realiza por propósito:

- Operaciones MongoDB como `.select()`/`.lean()` se interpretan como selección de columnas/relaciones necesarias, consultas SQL eficientes, carga por bloques e índices apropiados con SQLAlchemy/PostgreSQL.
- Middleware Express se interpreta como middleware equivalente de FastAPI, en este caso `GZipMiddleware`.
- La caché se implementa mediante cabeceras HTTP y validadores ETag del lado servidor, sin incorporar TanStack Query.
- La división de vistas se realiza con `React.lazy()` y `Suspense`.

No se incorpora MongoDB, Express ni una biblioteca adicional solo para reproducir el ejemplo de la guía.

## 2. ISO/IEC 25010:2023 — modelo de calidad del producto

Se toma como referencia la edición 2023 del modelo de calidad del producto. El estándar define nueve características y sus subcaracterísticas como referencia para especificar, medir y evaluar calidad; no constituye por sí solo una certificación del producto.

### 2.1 Eficiencia de desempeño (Performance efficiency)

La característica considera el desempeño temporal y la utilización de recursos bajo condiciones determinadas. Para EcoLogistics se relaciona con:

- **Comportamiento temporal (time behaviour):** medir FCP, LCP, TBT, respuesta y throughput cuando se defina un escenario representativo.
- **Utilización de recursos (resource utilization):** reducir bytes transferidos, cargas de colecciones completas, consultas repetidas y procesamiento innecesario.
- **Capacidad (capacity):** limitar cada página a un máximo de 12 registros y evitar que el tamaño del listado crezca sin control en la respuesta de gestión.

### 2.2 Mantenibilidad (Maintainability)

Se relaciona con la capacidad del producto de modificarse eficaz y eficientemente. Las subcaracterísticas relevantes del modelo 2023 son:

- **Modularidad:** páginas React separadas en chunks y separación de rutas, controladores, servicios y repositorios en backend.
- **Reusabilidad:** `PageResponse`, `paginate_statement`, `PaginationControls` y `apply_private_etag` encapsulan comportamientos reutilizables.
- **Analizabilidad:** nombres de endpoints, esquemas Pydantic y capas separadas facilitan localizar el origen de un comportamiento.
- **Modificabilidad:** filtros y límites se encapsulan en endpoints y servicios específicos.
- **Testabilidad:** pytest y Vitest verifican contratos y comportamiento después de refactorizar.

El vínculo con ISO/IEC 25010 es una justificación de diseño y de objetivos de calidad; no implica que se haya ejecutado una evaluación formal completa de todas las subcaracterísticas.

## 3. Green Software Foundation (GSF)

La GSF describe principios para diseñar, desarrollar y ejecutar software con menores impactos de carbono. Para la matriz académica de la actividad se explicitan cuatro principios:

1. **Eficiencia de carbono (Carbon Efficiency):** emitir la menor cantidad de carbono posible para una unidad funcional dada.
2. **Eficiencia energética (Energy Efficiency):** utilizar menos energía para prestar la misma función.
3. **Conciencia de carbono (Carbon Awareness):** desplazar trabajo en tiempo o región cuando existan señales de electricidad con menor intensidad de carbono. No se implementó programación de trabajos según intensidad eléctrica en EcoLogistics.
4. **Eficiencia de hardware (Hardware Efficiency):** reducir la cantidad de recursos físicos necesarios y el carbono incorporado asociado.

La GSF distingue estos principios de las categorías de acción que utiliza SCI: eficiencia energética, eficiencia de hardware y conciencia de carbono. Este informe usa SWDM v4 para una estimación basada en transferencia y no declara un puntaje SCI.

### Aplicación al proyecto

- La paginación y la compresión reducen transferencia en las respuestas donde se aplican.
- La carga diferida evita descargar vistas secundarias durante el acceso inicial.
- Las consultas por bloques y los filtros SQL reducen trabajo innecesario de la API.
- ETag evita retransmitir una representación que sigue vigente cuando el cliente la revalida.
- No se afirma reducción de hardware físico ni cambio a electricidad baja en carbono: no se cuenta con mediciones para sostener tales afirmaciones.

## 4. W3C Web Sustainability Guidelines (WSG)

La versión consultada en la fecha del informe se identifica como **W3C Group Note Draft, 16 October 2026**. W3C aclara que los Group Note Drafts no están respaldados por W3C ni por sus miembros y constituyen trabajo en progreso. Se citan como guía, no como norma certificable.

La rúbrica solicita mencionar las secciones 1.2, 2.4 y 3.1. Sus significados son:

- **1.2 — Layers of guidance:** explica la estructura de las WSG (guidelines, success criteria y additional information). No es una pauta específica de imágenes ni de caché.
- **2.4 — Design efficient and streamlined user journeys:** promueve recorridos claros, tareas simples, menos decisiones innecesarias y navegación/búsqueda comprensible. Se relaciona con controles de paginación y filtros utilizables.
- **3.1 — Set goals based on performance and energy impact:** recomienda fijar objetivos medibles de rendimiento e impacto energético; se relaciona directamente con umbrales LHCI y seguimiento de recursos.

También son relevantes otras pautas del mismo borrador:

- **2.9 — Optimize media to reduce resource use:** optimización de medios cuando el producto realmente incorpora imágenes u otros recursos multimedia.
- **3.3 — Modularize bandwidth-heavy components:** dividir componentes pesados en módulos bajo demanda; corresponde a React.lazy/Suspense.
- **3.11 — Use sustainable JavaScript and APIs:** usar APIs que minimicen procesamiento y uso de datos.
- **3.12 — Use dependencies sparingly and maintain them:** limitar dependencias a las necesarias.
- **3.16 — Reduce the number and complexity of database queries:** simplificar consultas y evitar redundancia/N+1.
- **4.2 — Optimize caching and support offline access:** considerar caché según el tipo de recurso y contexto.
- **4.3 — Reduce data transfer with compression:** aplicar compresión para reducir transferencia.

Se conserva la numeración y el sentido oficial de la guía. No se atribuye a WSG 1.2 una regla de WebP/AVIF, a 2.4 una regla de arquitectura de código ni a 3.1 una pauta exclusivamente de red.

## 5. Guía de desarrollo verde basada en Clean Code, SOLID, DRY y YAGNI

### 5.1 Backend — FastAPI, Python, SQLAlchemy y PostgreSQL

| Regla | Aplicación en EcoLogistics | Criterio de revisión |
|---|---|---|
| Clean Code | Nombres explícitos, funciones enfocadas y respuestas HTTP tipadas | Evitar métodos que mezclen consulta, reglas y traducción HTTP |
| SOLID — responsabilidad única | Rutas exponen HTTP; controladores coordinan; servicios aplican reglas; repositorios consultan datos | Mantener límites de responsabilidad al añadir endpoints |
| DRY | `PageResponse` y `paginate_statement` comparten el contrato y la ejecución de paginación; `apply_private_etag` reutiliza validación HTTP | Evitar implementar variaciones incompatibles del mismo patrón |
| YAGNI | No añadir ORM, driver, framework de consultas ni caché de estado sin necesidad medida | No agregar dependencias si las APIs actuales resuelven la función |
| Eficiencia de consultas | `LIMIT/OFFSET`, filtros SQL, conteos agregados y lectura por bloques de rutas | Evitar recuperar todo y filtrar en Python cuando se puede filtrar en SQL |
| Seguridad de caché | `private, no-cache` y `Vary: Authorization` para respuestas autenticadas | No utilizar `public` ni mezclar respuestas entre usuarios |

### 5.2 Frontend — React y Vite

| Regla | Aplicación en EcoLogistics | Criterio de revisión |
|---|---|---|
| Clean Code | Separación entre páginas, componentes, contextos y servicios | Mantener componentes orientados a una tarea y con estado comprensible |
| SOLID — responsabilidad única | `PaginationControls` se ocupa de navegación; los servicios construyen solicitudes; las tablas muestran resultados | Evitar que la tabla contenga reglas SQL/API |
| DRY | Un control de paginación compartido y servicios específicos por recurso | Evitar duplicar el mismo control en cinco tablas |
| YAGNI | `fetch` nativo y sin biblioteca de caché de datos adicional | Incorporar paquetes solo si una necesidad funcional lo justifica |
| Code splitting | `React.lazy()` y `Suspense` para páginas secundarias | No cargar vistas que no se necesitan al inicio |
| Accesibilidad | Estados de carga anunciados y controles de interfaz etiquetados | Mantener foco, navegación por teclado y feedback perceptible |

### 5.3 Reglas para futuros activos visuales

No crear imágenes de relleno para justificar una métrica. Cuando se incorpore un recurso visual real, registrar su formato, peso, dimensiones, necesidad de carga inicial y alternativa de formato. Usar `<picture>` y `srcset` cuando haya variantes reales que aporten una reducción verificable. Evitar solicitudes independientes para iconos solo si existen recursos SVG externos cuyo inlining resulte beneficioso.

## 6. Matriz de correspondencia entre ocho optimizaciones y estándares

La matriz está completa para las ocho áreas solicitadas. Los estados “no aplicable” se conservan explícitos; no equivalen a una optimización implementada.

| # | Área de optimización | Estado en EcoLogistics | ISO/IEC 25010:2023 | Principio GSF relacionado | W3C WSG relacionado |
|---:|---|---|---|---|---|
| 1 | Consultas SQL e índices (equivalente `.select()`/`.lean()`) | Aplicada en lectura de rutas y filtrado SQL; índices existentes documentados | Eficiencia: comportamiento temporal, utilización de recursos y capacidad | Eficiencia energética y de hardware; eficiencia de carbono como objetivo | 3.16 reducir número/complejidad de consultas; 3.1 objetivos medibles |
| 2 | Paginación backend/frontend de 12 registros | Aplicada en cinco módulos con filtros server-side | Eficiencia: utilización de recursos y capacidad; mantenibilidad/modificabilidad | Eficiencia energética y de hardware | 2.4 recorridos eficientes; 3.1 objetivos de desempeño |
| 3 | Imágenes WebP/AVIF adaptativas con `<picture>` | No aplicable al inventario de activos revisado: no hay imágenes rasterizadas del producto que convertir | Eficiencia: comportamiento temporal y utilización de recursos | Eficiencia energética y de carbono | 2.9 optimizar medios; 3.1 fijar objetivos |
| 4 | React.lazy/Suspense y code splitting | Aplicada a páginas secundarias | Mantenibilidad/modularidad; eficiencia de recursos | Eficiencia energética y de hardware | 3.3 modularizar componentes pesados; 3.7 diferir recursos no críticos |
| 5 | Uso de APIs nativas y control de dependencias | Aplicada sin dependencia adicional: `fetch` en `apiFetch` y `URLSearchParams` en servicios paginados; no se reemplaza una biblioteca que no estaba instalada | Eficiencia de recursos; mantenibilidad/analizabilidad | Eficiencia energética | 3.11 APIs sostenibles; 3.12 uso moderado de dependencias |
| 6 | Inlining de SVG para evitar solicitudes | Sin oportunidad demostrada: no se identificaron SVG externos ni solicitudes independientes de iconos | Eficiencia: comportamiento temporal y recursos | Eficiencia energética | 2.9 optimizar medios; 3.1 objetivos |
| 7 | Caché HTTP y ETag | Aplicada a listados paginados y resumen del dashboard; política privada con revalidación | Eficiencia temporal y de recursos; mantenibilidad/modificabilidad | Eficiencia energética y de hardware | 4.2 estrategias de caché; 3.1 medición de objetivos |
| 8 | Compresión GZip/Brotli | GZip aplicado con umbral 500 bytes y nivel 5; Brotli no configurado | Eficiencia temporal, recursos y capacidad | Eficiencia energética y de carbono | 4.3 compresión de transferencia; 3.1 objetivos |

## 7. Integración continua (CI/CD) de auditoría verde

Se añadió `.github/workflows/green-audit.yml` con ejecución en `push` a `main` y a `feature/green-it-sobresaliente`, `pull_request` hacia `main` y ejecución manual (`workflow_dispatch`). El job realiza `npm ci`, build de producción, instala Lighthouse CI CLI 0.16.x, ejecuta `lhci autorun` y publica los reportes como artefacto de GitHub Actions.

La configuración `frontend/lighthouserc.json`:

- Construye y audita `frontend/dist`.
- Ejecuta tres repeticiones en preset Desktop sobre `http://localhost/login`.
- Establece los límites: Performance ≥ 0.90, FCP ≤ 1,000 ms, LCP ≤ 1,400 ms, TBT ≤ 85 ms, CLS ≤ 0.02 y `total-byte-weight` ≤ 1,100,000 bytes.
- Conserva los informes mediante destino `filesystem`.

**Estado:** Lighthouse CI `autorun` se ejecutó localmente y generó los tres informes guardados. El workflow remoto queda configurado para validar cada publicación de la rama y cada Pull Request hacia `main`. El resultado remoto debe comprobarse en la ejecución de GitHub Actions asociada al commit; este informe no declara aprobada una ejecución remota que no se haya verificado y archivado.

## 8. Gestión de versiones y secuencia de entrega

La etiqueta semántica prevista es `v1.0.0`. Debe crearse después de integrar y validar el trabajo en `main`; su existencia se comprueba con `git tag --list v1.0.0` antes de intentar crearla.

Secuencia propuesta para PowerShell, una vez revisados los cambios y aprobadas las pruebas. Se utiliza la rama de trabajo y un Pull Request para que GitHub Actions valide el cambio antes de integrarlo en `main`:

```powershell
# Ejecutar desde la raíz del repositorio
Set-Location C:\Users\User\EcoLogistics
git branch --show-current
git status --short --branch
git config --local core.autocrlf false

# Asegurar que la carpeta documental existe (PowerShell)
mkdir "docs/03 Implementación/reduccion del impacto ambiental" -Force | Out-Null

# Validar backend y frontend
Push-Location backend
python -m pytest -q
if ($LASTEXITCODE -ne 0) { throw "Fallaron las pruebas del backend." }
Pop-Location

Push-Location frontend
npm run test
if ($LASTEXITCODE -ne 0) { throw "Fallaron las pruebas del frontend." }
npm run build
if ($LASTEXITCODE -ne 0) { throw "Falló el build del frontend." }
Pop-Location

# Comprobar whitespace y revisar los cambios antes de agregarlos
git diff --check
git diff --stat

# Añadir únicamente los cambios de esta actividad
git add -A -- backend frontend .github "docs/03 Implementación/reduccion del impacto ambiental"
git diff --cached --check
git diff --cached --stat
git diff --cached --name-only

# Registrar y publicar la rama de trabajo
git commit -m "perf(green-it): add pagination caching and sustainability audit"
git fetch origin
git push -u origin feature/green-it-sobresaliente
```

Después de que `green-audit.yml` y los demás checks del Pull Request terminen correctamente, crear o revisar el Pull Request `feature/green-it-sobresaliente` → `main` y fusionarlo desde GitHub. Luego actualizar la copia local y registrar la versión semántica:

```powershell
git switch main
git pull --ff-only origin main
git fetch --tags

# Crear v1.0.0 únicamente si todavía no existe
if (-not (git tag --list "v1.0.0")) {
    git tag -a v1.0.0 -m "EcoLogistics Green IT optimization release v1.0.0"
    git push origin v1.0.0
}

git status --short --branch
git log -3 --oneline --decorate
```

No se debe hacer merge ni etiquetar una ejecución fallida. Los archivos temporales `.patch`, logs locales, `dist`, `.lighthouseci`, `coverage` y entornos virtuales no deben añadirse al commit salvo que un reporte se seleccione expresamente como evidencia.

## 9. Referencias

1. ISO, [ISO/IEC 25010:2023 — Product quality model](https://www.iso.org/standard/78176.html).
2. IEC, [ISO/IEC 25010:2023](https://webstore.iec.ch/en/publication/90024).
3. Green Software Foundation, [Learn Green Software — Introduction](https://learn.greensoftware.foundation/es/introduction/).
4. Green Software Foundation, [Software Carbon Intensity Specification](https://sci.greensoftware.foundation/).
5. W3C, [Web Sustainability Guidelines (WSG), Group Note Draft 16 October 2026](https://www.w3.org/TR/web-sustainability-guidelines/).
6. W3C, [WSG publication history](https://www.w3.org/standards/history/web-sustainability-guidelines/).
7. Sustainable Web Design, [Estimating Digital Emissions — SWDM](https://sustainablewebdesign.org/estimating-digital-emissions/).

## 10. Historial

| Versión | Fecha | Cambios |
|---|---|---|
| V_1_0_0 | 03/11/2026 | Estándares y matriz ajustados al stack real, numeración y significado vigente de WSG, estados de implementación y guía de desarrollo verde. |
