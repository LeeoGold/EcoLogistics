# Informe de reducción del impacto ambiental y optimización Green IT

**Proyecto:** EcoLogística Huancayo (EcoLogistics)<br>
**Versión documental:** V_1_0_0<br>
**Fecha:** 03 de noviembre de 2026<br>
**Stack real:** React 19 + Vite 8 / FastAPI + Python / SQLAlchemy / PostgreSQL<br>
**Rama publicada:** `main`<br>
**Release:** [`v1.0.0 — Green IT Release`](https://github.com/LeeoGold/EcoLogistics/releases/tag/v1.0.0)<br>
**Commit de entrega:** [`6041fe83d54367afd7a00139c1366d9f4c90c2fa`](https://github.com/LeeoGold/EcoLogistics/commit/6041fe83d54367afd7a00139c1366d9f4c90c2fa)<br>
**Fecha de mediciones:** 03 de noviembre de 2026<br>
**Estado de publicación actualizado:** 08 de noviembre de 2026 — Release publicada y workflow Green IT Audit confirmado en verde en GitHub.

[Informe de estándares de ingeniería](./02%20Estandares%20Ingenier%C3%ADa%20de%20software%20V_1_0_0.md) · [Matriz de trazabilidad](./03%20Matriz%20de%20trazabilidad%20de%20la%20rubrica%20V_1_0_1.md) · [Índice de evidencias](./evidencias/README.md)

---

## 1. Propósito y alcance

Este informe documenta las optimizaciones Green IT realizadas en EcoLogistics, sus pruebas y la estimación ambiental basada en Sustainable Web Design Model (SWDM) v4. Se distinguen tres tipos de evidencia:

1. **Implementación comprobada:** cambios de código aplicados en el proyecto.
2. **Medición comprobada:** resultados de pruebas, compilación y Lighthouse disponibles.
3. **No aplicable o pendiente:** áreas sin recursos que optimizar o validaciones que todavía no se han ejecutado.

La rúbrica utiliza ejemplos del stack MERN (MongoDB, Express y React). EcoLogistics no utiliza MongoDB ni Express. Las recomendaciones equivalentes se aplicaron, cuando corresponde, mediante SQLAlchemy, PostgreSQL y FastAPI. No se incorporaron tecnologías distintas a la arquitectura real solo para imitar el ejemplo.

Este trabajo no constituye una certificación ambiental, una auditoría integral de infraestructura ni una medición directa con medidor eléctrico. Las estimaciones SWDM se presentan como modelo y escenario, no como emisiones medidas.

## 2. Arquitectura evaluada

| Capa | Tecnología | Responsabilidad relevante para Green IT |
|---|---|---|
| Interfaz | React 19, Vite 8 | Carga diferida de páginas, paginación, filtros, navegación y solicitudes API |
| API | FastAPI, Python | Endpoints paginados, resumen agregado, compresión HTTP y validación de caché |
| Persistencia | PostgreSQL, SQLAlchemy | Consultas `SELECT`, `COUNT`, `LIMIT`, `OFFSET`, filtros e índices |
| Pruebas | pytest, Vitest, Testing Library | Regresión de API y frontend |
| Auditoría | Lighthouse CI 0.16.x | Tres ejecuciones locales de la página `/login` y umbrales automatizados |
| Automatización | GitHub Actions | Workflow `green-audit.yml` preparado para ejecutar LHCI al integrar cambios |

## 3. Diagnóstico y cambios aplicados

### 3.1 Consultas SQL e índices (equivalente de consultas magras)

**Situación anterior:** los listados de repositorio recuperaban colecciones completas. En la lectura de rutas, la construcción de cada resultado podía consultar individualmente asignaciones, detalles, pedidos, conductores y vehículos, generando un patrón de consultas repetidas.

**Cambio aplicado:**

- `RouteService.list_routes()` recupera las rutas y luego obtiene asignaciones, detalles, pedidos, conductores y vehículos en bloques, agrupando resultados por identificador.
- La validación de conflictos de planificación filtra desde SQL por fecha y por el conductor o vehículo solicitado, en vez de recuperar todas las asignaciones de la fecha para filtrarlas únicamente en Python.
- Se conserva el uso de `select()` de SQLAlchemy y se limita el trabajo en memoria al conjunto de datos necesario para formar la respuesta.
- `database/schema.sql` ya contiene índices para estados de conductores/vehículos, cliente/estado/ventana de pedidos, fecha/estado de rutas y relaciones de asignación/detalle. El informe no atribuye su creación a este cambio; se aprovechan índices ya existentes.

**Evidencia:** la suite de rutas aprobó 13 pruebas después de la refactorización, y la suite completa terminó con 80 pruebas aprobadas tras incorporar ETag.

**Límite:** no se conserva una comparación de planes `EXPLAIN (ANALYZE, BUFFERS)` ni una medición controlada de tiempo de SQL en una base de datos de gran volumen. Por ello se afirma reducción del patrón N+1 y filtrado en base de datos, no un porcentaje específico de aceleración de consultas.

### 3.2 Paginación de 12 registros en backend y frontend

Se incorporó una respuesta paginada uniforme con `items`, `total`, `page`, `page_size` y `total_pages`. Los endpoints de gestión usan `page_size` predeterminado de 12 y validan que no exceda 12. SQLAlchemy aplica `LIMIT` y `OFFSET`; los filtros se aplican en PostgreSQL antes de limitar los registros.

Endpoints añadidos:

| Módulo | Endpoint paginado | Filtros en servidor |
|---|---|---|
| Clientes | `GET /api/clientes/pagina` | Nombre |
| Conductores | `GET /api/conductores/pagina` | Nombre, documento, licencia, contacto y estado |
| Pedidos | `GET /api/pedidos/pagina` | Estado, prioridad y fecha de ventana |
| Vehículos | `GET /api/vehiculos/pagina` | Placa y estado |
| Rutas | `GET /api/rutas/pagina` | Paginación de resultados |

El frontend solicita páginas a demanda y presenta controles anterior/siguiente. Se mantuvieron los endpoints de listado existentes para compatibilidad con flujos que necesitan un catálogo completo. El dashboard usa consultas agregadas (`COUNT`) en `/api/dashboard/resumen`, en lugar de descargar las colecciones de vehículos, clientes, pedidos y conductores solo para calcular tarjetas. Esta optimización complementaria reduce transferencia y procesamiento en el navegador; los conteos se ejecutan en PostgreSQL. Los selectores de planificación conservan el acceso a los catálogos completos que necesitan.

**Evidencia:** hay pruebas API para los cinco endpoints paginados, incluida la restricción de 12 registros. Después de corregir el registro del router del dashboard se obtuvo `79 passed`; después de incorporar la validación ETag se obtuvo `80 passed`.

### 3.3 Imágenes WebP/AVIF adaptativas con `<picture>`

**Estado: no aplicable al inventario actual.** En el inventario de código compartido no se identificaron imágenes rasterizadas del producto que justifiquen una conversión PNG/JPEG a WebP/AVIF ni elementos `<img>` que requieran `srcset`/`<picture>`. No se introdujeron imágenes decorativas artificiales para forzar esta optimización, porque añadir recursos sin necesidad podría aumentar transferencia y complejidad.

Regla para futuras incorporaciones: antes de añadir imágenes, documentar formato, dimensiones, bytes, atributo `alt`, tamaño explícito, carga diferida si no es crítica y alternativa adaptativa AVIF/WebP/JPEG cuando corresponda.

### 3.4 Carga diferida y división de código con React

`frontend/src/routes/AppRoutes.jsx` usa `React.lazy()` y `Suspense` para las páginas funcionales secundarias. El login se mantiene como importación inicial y el resto de vistas se distribuyen en chunks que se descargan al navegar a ellas.

**Evidencia de compilación después de añadir paginación:** `npm run build` finalizó correctamente; Vite transformó 50 módulos y generó chunks separados para Dashboard, Clientes, Vehículos, Conductores, Pedidos, Rutas y `PaginationControls`.

**Evidencia de pruebas:** `npm run test` finalizó con 14 pruebas aprobadas en 4 archivos.

### 3.5 Uso de APIs nativas y control de dependencias

El cliente HTTP utiliza `fetch` nativo mediante `apiFetch`. Además, las cinco funciones nuevas de consulta paginada usan `URLSearchParams` para serializar los filtros y parámetros `page`/`page_size` sin concatenar manualmente la cadena de consulta. Esto permite implementar las solicitudes paginadas sin incorporar una biblioteca adicional para HTTP o query strings.

En el inventario no se encontraron usos de Moment.js, Lodash, Axios ni TanStack Query que pudieran retirarse. Por ello, **no se afirma la sustitución de una biblioteca que nunca estuvo instalada**; la evidencia de esta área es la elección y aplicación de APIs nativas (`fetch` y `URLSearchParams`) para resolver la comunicación y los parámetros sin dependencias adicionales.

### 3.6 SVG inline y reducción de solicitudes

**Estado: sin oportunidad demostrada de conversión.** En el inventario compartido no se identificaron archivos SVG externos, referencias `<img>` a iconos ni etiquetas SVG preexistentes que provocaran solicitudes independientes. No se atribuye una reducción de solicitudes HTTP al inlining de SVG porque no existía una petición externa de SVG que eliminar.

La auditoría de `/login` registró tres solicitudes iniciales antes y tres después de la división de código en la comparación histórica. Esto no demuestra que SVG inline redujera peticiones; el dato se conserva como medición independiente.

### 3.7 Caché privada y validación ETag

Se incorporó `backend/app/http_cache.py` y se aplicó a respuestas paginadas y al resumen del dashboard:

- `ETag` débil calculado mediante SHA-256 sobre una representación JSON estable.
- `Cache-Control: private, no-cache`, para permitir almacenamiento privado con revalidación antes de reutilizar la respuesta.
- `Vary: Authorization`, para variar la representación almacenada según la cabecera de autorización.
- Cuando `If-None-Match` coincide con la etiqueta vigente, la API devuelve `304 Not Modified` sin reenviar el cuerpo JSON.

La política es deliberadamente privada y revalidable: no configura `public` ni caché inmutable para respuestas autenticadas. La implementación se validó con una prueba de API que envía una segunda solicitud con el ETag recibido y verifica la respuesta `304`.

### 3.8 Compresión HTTP con GZip

Se agregó `GZipMiddleware` de FastAPI con `minimum_size=500` y `compresslevel=5`. La compresión se aplica cuando el cliente admite gzip y la respuesta supera el umbral configurado.

La funcionalidad se verificó localmente reduciendo temporalmente el umbral, observando `Content-Encoding: gzip` y restaurando después `minimum_size=500`. Las respuestas de 320 y 415 bytes comprobadas inicialmente no se comprimían porque estaban por debajo del umbral; eso es el comportamiento esperado. No se afirma que gzip reduzca el peso de la pantalla `/login`, porque esa página no transfiere las respuestas API de esos módulos durante la carga inicial.

## 4. Estado consolidado de las ocho áreas de la rúbrica

| # | Área | Estado honesto | Evidencia / justificación |
|---:|---|---|---|
| 1 | Consultas SQL, selección y uso de índices | **Aplicada** | Lecturas por lotes en rutas, filtro SQL de conflictos e índices existentes documentados |
| 2 | Paginación backend/frontend de 12 | **Aplicada** | Cinco endpoints paginados, filtros server-side y controles React; 80 pruebas backend aprobadas |
| 3 | WebP/AVIF y `<picture>` | **No aplicable al inventario** | No se identificaron imágenes rasterizadas del producto que convertir |
| 4 | `React.lazy()` / `Suspense` | **Aplicada** | Chunks Vite, build correcto y 14 pruebas frontend aprobadas |
| 5 | Uso de APIs nativas y control de dependencias | **Parcial / conforme** | `fetch` en `apiFetch` y `URLSearchParams` en los cinco servicios paginados; no se incorpora una biblioteca HTTP/query-string |
| 6 | SVG inline | **Sin oportunidad demostrada** | No se identificaron SVG externos ni peticiones de iconos SVG que eliminar |
| 7 | Cache-Control / ETag | **Aplicada** | Política `private, no-cache`, `Vary: Authorization`, revalidación y prueba 304 |
| 8 | Compresión GZip/Brotli | **Aplicada con GZip** | FastAPI `GZipMiddleware`, umbral 500 bytes y nivel 5; no se ha configurado Brotli |

Se presentan seis áreas con evidencia técnica (`1`, `2`, `4`, `5`, `7` y `8`). En el área 5, la evidencia es el uso de APIs nativas en las nuevas solicitudes paginadas y la ausencia justificada de una dependencia externa que reemplazar; no se atribuye una migración inexistente. Las áreas 3 y 6 se registran como no aplicables por ausencia de activos de origen. Esta distinción evita declarar ficticiamente el cumplimiento de las ocho áreas.

### 4.1 Comparación de código antes/después

Los siguientes fragmentos son extractos representativos de los archivos del proyecto. Se omiten imports y contexto no necesarios para entender el cambio. En las áreas sin recursos que transformar se documenta el motivo en lugar de inventar una versión anterior.

**Área 1 — Lecturas de rutas y consultas SQL**

Antes, la lista construía la respuesta de cada ruta mediante `_to_read`, que consultaba las relaciones dentro de cada iteración:

```python
# Antes: backend/app/services/route_service.py

def list_routes(self, db: Session) -> list[RouteRead]:
    return [self._to_read(db, route) for route in self.repository.list(db)]
```

Después, las rutas y sus relaciones se recuperan en bloques y se agrupan por identificador:

```python
# Después: extracto de backend/app/services/route_service.py
routes = self.repository.list(db)
route_ids = [route.ruta_id for route in routes]

assignments = db.scalars(
    select(DriverAssignment)
    .where(DriverAssignment.ruta_id.in_(route_ids))
    .order_by(DriverAssignment.ruta_id, DriverAssignment.hora_inicio)
).all()

detail_rows = db.scalars(
    select(RouteDetail)
    .where(RouteDetail.ruta_id.in_(route_ids))
    .order_by(RouteDetail.ruta_id, RouteDetail.secuencia)
).all()
```

También se filtra la consulta de conflictos en PostgreSQL por fecha y por el conductor o vehículo seleccionado. No se declara una mejora porcentual de latencia porque no se conservó una medición de `EXPLAIN ANALYZE`.

**Optimización complementaria del dashboard — agregación en base de datos**

Antes, el dashboard obtenía cuatro colecciones desde los contextos y calculaba los indicadores en React. Después, consulta un endpoint de resumen que ejecuta conteos en PostgreSQL:

```jsx
// Antes: frontend/src/pages/DashboardPage.jsx
const { vehicles } = useVehicles()
const { clients } = useClients()
const { drivers } = useDrivers()
const { orders } = useOrders()
const pendingOrders = orders.filter((order) => order.estado === 'PENDIENTE').length

// Después: frontend/src/pages/DashboardPage.jsx
const [summary, setSummary] = useState(null)
useEffect(() => {
  getDashboardSummary().then(setSummary)
}, [])
```

```python
# Después: backend/app/routes/dashboard.py
def _count(db: Session, model, *conditions) -> int:
    statement = select(func.count()).select_from(model)
    if conditions:
        statement = statement.where(*conditions)
    return int(db.scalar(statement) or 0)
```

**Área 2 — Paginación SQLAlchemy**

Antes, el repositorio devolvía todos los clientes ordenados:

```python
# Antes: backend/app/repositories/client_repository.py
return list(db.scalars(select(Client).order_by(Client.nombre)).all())
```

Después, el endpoint paginado delega en una función común que cuenta el total y aplica `OFFSET`/`LIMIT`:

```python
# Después: backend/app/pagination.py
count_statement = select(func.count()).select_from(
    statement.order_by(None).subquery()
)
total = int(db.scalar(count_statement) or 0)
items = list(
    db.scalars(statement.offset((page - 1) * page_size).limit(page_size)).all()
)
```

El endpoint valida que `page_size` esté entre 1 y 12 y aplica los filtros antes de ejecutar la paginación.

**Área 3 — WebP/AVIF**

No se presenta un bloque `ANTES/DESPUÉS`: el inventario del frontend revisado no contiene imágenes rasterizadas del producto para convertir ni elementos `<img>` donde introducir `<picture>`. La ausencia de activos se documenta como no aplicabilidad, no como una conversión realizada.

**Área 4 — React.lazy/Suspense**

Antes, las vistas se importaban estáticamente en el módulo de rutas:

```jsx
// Antes: imports estáticos de páginas secundarias
import ClientsPage from '../pages/ClientsPage'
import DashboardPage from '../pages/DashboardPage'
import RoutesPage from '../pages/RoutesPage'
```

Después, las páginas secundarias se importan bajo demanda:

```jsx
// Después: frontend/src/routes/AppRoutes.jsx
const ClientsPage = lazy(() => import('../pages/ClientsPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const RoutesPage = lazy(() => import('../pages/RoutesPage'))

<Suspense fallback={<p role="status" aria-live="polite">Cargando módulo…</p>}>
  {/* contenido de la sección activa */}
</Suspense>
```

**Área 5 — APIs nativas y control de dependencias**

Antes, el servicio solo consultaba el listado completo y no construía parámetros de paginación. Después, las nuevas funciones usan `URLSearchParams` junto con `fetch` nativo para generar la consulta sin incorporar una biblioteca externa de serialización:

```javascript
// Antes: frontend/src/services/clientService.js
export async function getClients() {
  const response = await apiFetch('/api/clientes')
  return parseResponse(response, 'No se pudieron consultar los clientes.')
}

// Después: consulta paginada con APIs nativas
export async function getClientsPage(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries({ page: 1, page_size: 12, ...params })) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
  }
  const response = await apiFetch(`/api/clientes/pagina?${query.toString()}`)
  return parseResponse(response, 'No se pudo consultar la página solicitada.')
}
```

La comparación muestra la ampliación del servicio con APIs nativas. No se afirma que se haya retirado Axios, Lodash u otra biblioteca presente, porque no formaban parte del inventario del proyecto.

**Área 6 — SVG inline**

No se presenta una conversión de SVG: el inventario revisado no contiene referencias a SVG externos o solicitudes de iconos SVG que se puedan eliminar. No se atribuye una reducción de peticiones a una transformación inexistente.

**Área 7 — Cache-Control/ETag**

Antes, el endpoint devolvía directamente el resultado paginado, sin validar si el cliente ya tenía una representación vigente. Después, se calcula el ETag y se responde `304 Not Modified` cuando `If-None-Match` coincide:

```python
# Antes: respuesta sin validación condicional
data = paginate_statement(db, statement, page=page, page_size=page_size)
return data

# Después: backend/app/routes/clients.py
data = paginate_statement(db, statement, page=page, page_size=page_size)
not_modified = apply_private_etag(request, response, data)
return not_modified or data
```

El helper establece `ETag`, `Cache-Control: private, no-cache` y `Vary: Authorization`. La prueba API verifica la respuesta `304` ante un `If-None-Match` vigente.

**Área 8 — Compresión GZip**

Antes, la aplicación registraba CORS, pero no middleware de compresión. Después, FastAPI incorpora GZip con un umbral para evitar comprimir respuestas pequeñas:

```python
# Antes: backend/app/main.py (sin GZipMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Después: backend/app/main.py
app.add_middleware(
    GZipMiddleware,
    minimum_size=500,
    compresslevel=5,
)
```

Brotli no está configurado; la implementación acreditada es GZip.

## 5. Auditoría Lighthouse y umbrales

### 5.1 Auditoría Lighthouse CI del 03/11/2026

Se ejecutó Lighthouse CI localmente sobre la compilación de producción y la ruta `/login`, con tres ejecuciones Desktop. Los tres reportes HTML, los tres JSON y el manifiesto se conservaron en `evidencias/lighthouse-ci-20261103/`.

| Métrica | Ejecución 1 | Ejecución 2 | Ejecución 3 | Mediana | Umbral de la rúbrica | Resultado |
|---|---:|---:|---:|---:|---:|---|
| Performance | 100 | 100 | 100 | **100/100** | ≥ 90 | Cumple |
| FCP | 244 ms | 213 ms | 213 ms | **213 ms** | ≤ 1,000 ms | Cumple |
| LCP | 375 ms | 348 ms | 350 ms | **350 ms** | ≤ 1,400 ms | Cumple |
| TBT | 0 ms | 0 ms | 0 ms | **0 ms** | ≤ 85 ms | Cumple |
| CLS | 0.000 | 0.000 | 0.000 | **0.000** | ≤ 0.02 | Cumple |
| Transferencia | 76.99 KiB | 76.99 KiB | 76.99 KiB | **76.99 KiB** | ≤ 1.1 MB | Cumple |

Las cifras son de `/login` en entorno local de producción; no son una auditoría de todos los módulos autenticados ni de una publicación remota. Las métricas de transferencia son el valor `total-byte-weight` del informe Lighthouse, expresado aquí en KiB porque la tabla de extracción dividió bytes entre 1,024.

### 5.2 Comparación histórica antes/después del cambio de code splitting

Una serie comparativa anterior, ejecutada sobre `/login`, registró la siguiente variación entre estado inicial y posterior a la división de código:

| Métrica | Antes (mediana) | Después de code splitting (mediana) | Interpretación |
|---|---:|---:|---|
| Performance | 100 | 95 | El score mediano bajó; no se atribuye mejora de score a esa intervención aislada |
| FCP | 342.95 ms | 360.10 ms | El valor posterior fue ligeramente mayor |
| LCP | 342.95 ms | 360.10 ms | El valor posterior fue ligeramente mayor |
| TBT | 0 ms | 0 ms | Sin variación reportada |
| CLS | 0.000 | 0.000 | Sin variación reportada |
| Transferencia | 83,811 B | 77,706 B | Reducción de 6,105 B (7.28 %) |
| JavaScript principal (sin comprimir) | 272.07 kB | 235.76 kB | Reducción aproximada de 13.3 % |

La serie final de LHCI del 03/11 muestra 100/100 en las tres ejecuciones. Se conserva como un conjunto de validación independiente y no se mezcla con la mediana histórica de code splitting para producir un porcentaje de mejora artificial.

### 5.3 Condiciones y límites

- La medición se realizó en entorno local de producción con Lighthouse CI; no representa latencia de Internet real, infraestructura cloud ni dispositivos de usuarios.
- La ruta evaluada fue `/login`.
- Los informes deben interpretarse con el entorno, versión de Chrome/Lighthouse y configuración que aparece en cada JSON/HTML.
- No se afirma que el performance score subió de 95 a 100 debido a una única optimización; las ejecuciones son corridas distintas.
- El umbral de transferencia en la configuración LHCI es 1,100,000 bytes, además de FCP, LCP, TBT, CLS y Performance.

## 6. Estimación ambiental mediante SWDM v4

### 6.1 Unidad funcional y límites

**Unidad funcional:** una carga de la página `/login`.<br>
**Dato de transferencia usado para la comparación:** `total-byte-weight` de la serie histórica de Lighthouse antes y después de code splitting.<br>
**Alcance:** estimación de energía y emisiones asociadas al volumen transferido para esa carga; no incluye una medición específica del despliegue, CPU real, consultas posteriores a la sesión ni toda la aplicación.

Se utiliza el conjunto de intensidades energéticas publicado por Sustainable Web Design Model:

| Segmento | Energía operacional (kWh/GB) | Energía incorporada (kWh/GB) |
|---|---:|---:|
| Centro de datos | 0.055 | 0.012 |
| Red | 0.059 | 0.013 |
| Dispositivo del usuario | 0.080 | 0.081 |
| **Total** | **0.194** | **0.106** |
| **Total operacional + incorporada** |  | **0.300 kWh/GB** |

Se usa el factor de intensidad de carbono global de referencia publicado por SWDM: **494 gCO₂e/kWh**. Los valores pueden cambiar si se sustituye por un factor regional apropiado y verificable.

### 6.2 Supuestos del escenario

Para poder aplicar la fórmula de página vista se declara el siguiente escenario simplificado:

- Green Hosting Factor (GHF) = 0: no se cuenta con evidencia del porcentaje de energía renovable del hosting.
- New Visitor Ratio = 1: escenario conservador de todas las cargas como primera visita.
- Return Visitor Ratio = 0: no se modelan visitas recurrentes en este escenario.
- Data Cache Ratio = 0: sin ahorro supuesto por caché de datos para visitantes recurrentes; al usar Return Visitor Ratio = 0, este término no modifica el resultado.
- Conversión decimal: 1 GB = 1,000,000,000 bytes.

La estimación por carga se calcula como:

`Energía modelada (kWh) = transferencia (GB) × 0.300 kWh/GB`

`Emisiones estimadas (gCO₂e) = energía modelada (kWh) × 494 gCO₂e/kWh`

El total 0.300 kWh/GB incluye intensidades operacionales e incorporadas del modelo. No debe interpretarse como lectura de consumo eléctrico de un medidor conectado al equipo.

### 6.3 Resultados

| Indicador | Antes | Después de code splitting | Ahorro estimado |
|---|---:|---:|---:|
| Transferencia | 83,811 B | 77,706 B | 6,105 B (7.28 %) |
| Transferencia decimal | 0.000083811 GB | 0.000077706 GB | 0.000006105 GB |
| Energía SWDM modelada por carga | 0.0000251433 kWh | 0.0000233118 kWh | **0.0000018315 kWh** |
| Emisiones SWDM por carga | 0.01242079 gCO₂e | 0.01151603 gCO₂e | **0.00090476 gCO₂e** |

### 6.4 Proyección anual ilustrativa

Para cumplir la comparación de escala solicitada por la rúbrica, se usa un escenario hipotético de **500,000 cargas de `/login` al año**. No es un dato de tráfico observado de EcoLogistics.

| Indicador anual ilustrativo | Antes | Después | Ahorro |
|---|---:|---:|---:|
| Energía modelada | 12.57165 kWh | 11.65590 kWh | **0.91575 kWh/año** |
| Emisiones modeladas | 6.21040 kgCO₂e | 5.75801 kgCO₂e | **0.45238 kgCO₂e/año** |

La proyección escala linealmente el ahorro calculado por carga. La incertidumbre del modelo y de los supuestos no permite presentarla como ahorro de energía o carbono medido en operación. El cambio de datos transferidos fue 7.28 %; el mismo porcentaje se refleja en esta estimación porque la intensidad por GB se mantiene constante.

## 7. Validación funcional y automatizada

| Validación | Resultado comunicado | Alcance |
|---|---:|---|
| Backend con pytest, tras ETag | **80 passed** | Suite backend completa, 03/11/2026 |
| Frontend con Vitest | **14 passed en 4 archivos** | Suite frontend existente; ejecutada después de la paginación |
| Build de producción Vite | **Correcto; 50 módulos transformados** | Compilación posterior a la paginación |
| Lighthouse CI local | **3 informes generados y analizados** | Ruta `/login`, Desktop |
| Workflow GitHub Actions | **Ejecución verde confirmada** | `green-audit.yml` ejecutado en GitHub durante el cierre de la Release |

Las pruebas automatizadas y la compilación no sustituyen una revisión visual completa de cada flujo. Las capturas funcionales adjuntas cubren Dashboard y Flota; antes de una demostración en vivo conviene realizar una pasada manual por Clientes, Conductores, Pedidos y Rutas, sin necesidad de generar una captura independiente para cada uno.

### 7.1 Estado de publicación de la versión

La versión se integró en `main` mediante el commit `6041fe83d54367afd7a00139c1366d9f4c90c2fa`, se publicó la etiqueta Git `v1.0.0` y se creó la Release **EcoLogistics v1.0.0 — Green IT Release**. El workflow `Green IT Audit` quedó en verde según la ejecución verificada en GitHub durante el cierre. Por tanto, la frase anterior de “ejecución remota pendiente” queda sustituida por este estado final.

La medición técnica principal conserva su fecha original (03/11/2026); esta actualización modifica el estado de publicación, no los valores de los reportes.

## 8. Conclusiones

1. La arquitectura real se mantuvo en React, FastAPI, SQLAlchemy y PostgreSQL.
2. Se implementaron paginación server-side de 12 registros, reducción de consultas repetidas de rutas, conteos agregados para el dashboard, ETag con revalidación privada y compresión GZip.
3. La división de código mantiene su build y suite frontend aprobados.
4. Las tres corridas Lighthouse CI del 03/11 cumplen los umbrales de la rúbrica para `/login`.
5. SWDM v4 produce una estimación ilustrativa de 0.45238 kgCO₂e de ahorro anual para el escenario hipotético de 500,000 cargas. No es una medición directa.
6. WebP/AVIF y SVG inline se registran como no aplicables/no demostrados por ausencia de activos de ese tipo en el inventario revisado. No se declaran como implementados.
7. La entrega documenta seis áreas aplicadas o conformes con alcance explícito y dos sin oportunidad identificada. El área de APIs nativas es parcial: no se sustituyó una biblioteca instalada. Si la rúbrica exige sustitución material, el evaluador podría considerar solo cinco optimizaciones plenamente implementadas.

## 9. Evidencias

Consultar `evidencias/README.md`. Los reportes HTML/JSON originales de Lighthouse CI se conservan en `evidencias/lighthouse-ci-20261103/`. Los informes previos de code splitting se mantienen como serie histórica separada.

## 10. Referencias

1. Sustainable Web Design, *Estimating Digital Emissions* (SWDM v4): https://sustainablewebdesign.org/estimating-digital-emissions/
2. W3C, *Web Sustainability Guidelines (WSG)*, Group Note Draft 16 October 2026: https://www.w3.org/TR/web-sustainability-guidelines/
3. Green Software Foundation, *Learn Green Software — Introduction*: https://learn.greensoftware.foundation/introduction/
4. Green Software Foundation, *Software Carbon Intensity Specification*: https://sci.greensoftware.foundation/
5. ISO, *ISO/IEC 25010:2023 — Product quality model*: https://www.iso.org/standard/78176.html

## 11. Historial

| Versión | Fecha | Cambios |
|---|---|---|
| V_1_0_0 | 03/11/2026 | Consolidación de paginación, consultas SQL, ETag, GZip, LHCI, estimación SWDM v4 y límites de aplicabilidad. |
| Actualización de estado | 08/11/2026 | Se registra la publicación en `main`, el tag/Release `v1.0.0` y la ejecución verde de GitHub Actions; no se alteran las mediciones del 03/11. |
