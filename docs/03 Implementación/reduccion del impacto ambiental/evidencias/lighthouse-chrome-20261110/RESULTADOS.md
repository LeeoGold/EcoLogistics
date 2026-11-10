# RESULTADOS — Lighthouse Chrome (seis vistas)

[← Índice Green IT](../../README.md) · [← Evidencias](../README.md)

## 1. Resumen

Se ejecutó una auditoría individual de Lighthouse sobre seis vistas de EcoLogistics el **10/11/2026**. Los informes originales HTML y JSON se conservan en esta misma carpeta.

- **Rendimiento:** entre 94 y 100 puntos; promedio simple de las seis vistas: **98.8/100**.
- **Accesibilidad:** 100/100 en las seis vistas.
- **Buenas prácticas:** 96/100 en las seis vistas.
- **FCP:** 325–379 ms.
- **LCP:** 478–539 ms.
- **TBT:** 0 ms en las seis vistas.
- **Transferencia:** 78.7–84.5 KiB.

El promedio de rendimiento es un promedio descriptivo de seis vistas con **una ejecución por vista**; no es una mediana ni el promedio de varias repeticiones de una misma URL.

## 2. Resultados por vista

| Vista | Rendimiento | Accesibilidad | Buenas prácticas | FCP | LCP | TBT | CLS | Transferencia |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Inicio | 100/100 | 100/100 | 96/100 | 370 ms | 504 ms | 0 ms | 0.00002 | 78.7 KiB |
| Flota | 100/100 | 100/100 | 96/100 | 342 ms | 481 ms | 0 ms | 0.02417 | 81.1 KiB |
| Clientes | 100/100 | 100/100 | 96/100 | 325 ms | 498 ms | 0 ms | 0.01597 | 80.7 KiB |
| Conductores | 100/100 | 100/100 | 96/100 | 343 ms | 527 ms | 0 ms | 0.03522 | 81.0 KiB |
| Pedidos | 94/100 | 100/100 | 96/100 | 341 ms | 478 ms | 0 ms | 0.15651 | 82.3 KiB |
| Rutas | 99/100 | 100/100 | 96/100 | 379 ms | 539 ms | 0 ms | 0.00000 | 84.5 KiB |

**Definiciones:** FCP = First Contentful Paint; LCP = Largest Contentful Paint; TBT = Total Blocking Time; CLS = Cumulative Layout Shift. La transferencia corresponde a la auditoría Lighthouse `total-byte-weight`.

## 3. Observaciones relevantes

1. **Estabilidad visual (CLS):** el umbral de referencia de 0.02 se cumple en Inicio, Clientes, Rutas. Lo superan Flota, Conductores y Pedidos; el valor más alto corresponde a Pedidos (0.15651).
2. **Buenas prácticas:** las seis auditorías registran un error de consola por respuesta **404** al solicitar `http://127.0.0.1:4173/favicon.ico`. Este hallazgo coincide con el puntaje de 96/100 en Buenas prácticas. Revisar el favicon o la referencia configurada en el frontend.
3. **Rutas:** Speed Index de 1.3 s; es una métrica complementaria y no altera el dato LCP (539 ms) consignado en la tabla.
4. No se registraron advertencias de ejecución de Lighthouse (`runWarnings`) en los JSON recibidos.

## 4. Configuración de la medición

| Parámetro | Valor registrado |
|---|---|
| Fecha | 10/11/2026 |
| Herramienta | Lighthouse 13.5.0 |
| Navegador del equipo | Chrome 157.0.0.0 (user agent reportado por Lighthouse) |
| Dispositivo | Desktop |
| Servidor / URL base | `http://127.0.0.1:4173` |
| Rutas evaluadas | `#/inicio`, `#/flota`, `#/clientes`, `#/conductores`, `#/pedidos`, `#/rutas` |
| Throttling | Simulado; RTT 40 ms, ancho de banda 10,240 Kbps, CPU ×1 |
| Categorías incluidas | Performance, Accessibility y Best Practices |
| Número de ejecuciones | Una ejecución por vista (seis JSON en total) |

Las direcciones corresponden a un servidor local. Estos resultados no representan mediciones de un despliegue público. Los reportes son auditorías manuales independientes y **no sustituyen** los tres resultados de Lighthouse CI del 03/11/2026 sobre `/login`.

## 5. Archivos originales

| Vista | HTML | JSON |
|---|---|---|
| Inicio | [inicio.html](./inicio.html) | [inicio.json](./inicio.json) |
| Flota | [flota.html](./flota.html) | [flota.json](./flota.json) |
| Clientes | [clientes.html](./clientes.html) | [clientes.json](./clientes.json) |
| Conductores | [conductores.html](./conductores.html) | [conductores.json](./conductores.json) |
| Pedidos | [pedidos.html](./pedidos.html) | [pedidos.json](./pedidos.json) |
| Rutas | [rutas.html](./rutas.html) | [rutas.json](./rutas.json) |

## 6. Alcance y lectura para la rúbrica

Las seis vistas muestran un rendimiento Lighthouse de 94–100/100, FCP y LCP por debajo de 1 s, TBT de 0 ms y transferencia inferior a 1.1 MB. El CLS de Flota, Conductores y Pedidos supera 0.02, por lo que no se declara cumplimiento uniforme de ese umbral para todas las vistas.

Esta medición acredita el comportamiento observado en las seis pantallas durante estas ejecuciones. No demuestra por sí sola una reducción antes/después ni permite calcular ahorro energético o emisiones. El cálculo SWDM v4 del informe ambiental se conserva como estimación separada, con sus propios supuestos y unidad funcional.

---

**Integridad:** los archivos JSON y HTML fueron copiados desde el ZIP recibido sin editar el contenido de los informes. Los valores resumidos de este documento se extrajeron de los JSON originales.
