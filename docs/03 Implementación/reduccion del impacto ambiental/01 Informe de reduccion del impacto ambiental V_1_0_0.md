# Informe de reducción del impacto ambiental — Green IT

**Proyecto:** EcoLogística Huancayo / EcoLogistics
**Versión documental:** V_1_0_0
**Fecha de actualización:** 2026-10-29
**Rama objetivo de entrega:** `main`
**Estado:** división de código del frontend aplicada y validada localmente; documentación y evidencias preparadas para integrar. No se declara una reducción de emisiones de CO₂e porque no se midió directamente energía ni se calculó una estimación reproducible.

[← README principal](../../../README.md) · [Índice de implementación](../README.md) · [Estándares de ingeniería de software](./02%20Estandares%20Ingeniería%20de%20software%20V_1_0_0.md)

## 1. Propósito y alcance

Registrar las mejoras relacionadas con eficiencia digital que se han aplicado realmente en EcoLogistics, explicar cómo se midieron y separar los resultados demostrados de las recomendaciones pendientes. Este informe se limita al cambio de división de código del frontend y a las mediciones de la pantalla `/login` en un build de producción local.

El HTML de la actividad utiliza MERN en sus ejemplos. EcoLogistics utiliza React + Vite, FastAPI + Python y PostgreSQL + SQLAlchemy, por lo que no se atribuyen al proyecto ejemplos o resultados de MongoDB/Express.

## 2. Arquitectura evaluada

- **Frontend:** React 19 y Vite 8.
- **Backend:** FastAPI y Python.
- **Persistencia:** PostgreSQL mediante SQLAlchemy.
- **Validación automatizada:** Vitest/Testing Library, pytest/pytest-cov y build de producción Vite.
- **Escenario de rendimiento comparado:** `http://127.0.0.1:4173/login`, servido localmente con Vite Preview.

## 3. Cambio implementado

Se cambió la importación estática de las seis páginas funcionales secundarias en `frontend/src/routes/AppRoutes.jsx` por carga dinámica con `React.lazy()`. Se añadió `Suspense` con un mensaje accesible (`role="status"` y `aria-live="polite"`) como fallback de carga. `LoginPage` se mantiene como importación estática, de forma que el acceso de login no necesite descargar por separado esas páginas secundarias.

El cambio cubre la optimización de **división de código/carga diferida de vistas**. No se debe describir como implementación completa de las ocho categorías del HTML de referencia. Consultas SQL, paginación, imágenes, dependencias, número de peticiones, caché y compresión siguen siendo áreas para inspección y medición específica.

## 4. Evidencia funcional y de build

| Indicador | Antes | Después | Interpretación |
|---|---:|---:|---|
| Pruebas frontend | 14/14 aprobadas | 14/14 aprobadas | La suite se ejecutó después de cambiar el renderizado asíncrono de la página; se actualizó la aserción de test para esperar el contenido lazy. |
| Build frontend | Correcto; 47 módulos transformados | Correcto; 48 módulos transformados | La compilación genera chunks adicionales para las vistas cargadas bajo demanda. |
| JavaScript principal listado por Vite | 272.07 kB; 80.02 kB gzip | 235.76 kB; 73.91 kB gzip | Reducción de 36.31 kB (~13.3 %) sin comprimir y 6.11 kB (~7.6 %) en el tamaño gzip informado por Vite. |
| CSS listado por Vite | 11.95 kB; 3.15 kB gzip | 11.95 kB; 3.15 kB gzip | Sin cambio apreciable de tamaño en CSS. |
| Chunks de vistas secundarias | No separados como chunks independientes | Generados para las páginas secundarias | Vite produce recursos separados para dashboard, clientes, vehículos, conductores, pedidos y rutas. |

Los resultados anteriores corresponden a las ejecuciones registradas durante el trabajo. El cambio fue de frontend; en este paso no se modificaron modelos, rutas ni consultas de backend.

## 5. Comparación de Lighthouse antes y después

Los seis informes HTML originales están conservados en `evidencias/`. Se auditó la categoría **Performance** de Lighthouse 13.5.0, modo Desktop, sobre el mismo login local. Se ejecutaron tres repeticiones para cada estado.

| Métrica para `/login` | Antes (3 ejecuciones) | Después (3 ejecuciones) | Lectura responsable |
|---|---|---|---|
| Performance | 100, 100, 100; mediana **100/100** | 92, 95, 98; mediana **95/100** | El score bajó en estas ejecuciones; no se afirma una mejora global del score. |
| FCP | 342.95, 342.28, 344.77 ms; mediana **342.95 ms** | 343.06, 360.10, 360.20 ms; mediana **360.10 ms** | La mediana posterior es aproximadamente 17.14 ms mayor. |
| LCP | 342.95, 342.28, 344.77 ms; mediana **342.95 ms** | 343.06, 360.10, 360.20 ms; mediana **360.10 ms** | El valor principal de LCP posterior es parecido a FCP, pero hay una inconsistencia con el diagnóstico/filmstrip descrita abajo. |
| Total Blocking Time (TBT) | 0 ms en las tres | 0 ms en las tres | Sin cambio en los valores reportados. |
| Cumulative Layout Shift (CLS) | 0 en las tres | 0 en las tres | Sin cambio en los valores reportados. |
| Speed Index | ~343 ms en las tres | 3230, 2202, 1479 ms; mediana **2202 ms** | La variación posterior y la captura visual no concuerdan bien con FCP/LCP; el indicador debe tratarse con cautela. |
| Peso total transferido | 83,811 bytes en cada ejecución | 77,706 bytes en cada ejecución | Reducción observada de **6,105 bytes (~7.28 %)**. |
| Peticiones de red | 3 | 3 | El número de solicitudes iniciales se mantiene en tres: documento, JS principal y CSS. |
| JS principal (recurso) | 272,076 bytes; 79,661 bytes transferidos | 235,763 bytes; 73,556 bytes transferidos | Reducción del archivo principal de **36,313 bytes (~13.34 %)**. El total transferido también bajó en 6,105 bytes. |
| CSS (recurso) | 11,951 bytes; 3,493 transferidos | 11,951 bytes; 3,493 transferidos | Sin cambio. |

Los bytes reportados son los del artefacto de Lighthouse; el tamaño de recurso y el tamaño transferido son métricas distintas y no deben intercambiarse.

### 5.1 Limitación/anomalía de la medición posterior

Los informes posteriores muestran una contradicción interna: el FCP/LCP principal aparece alrededor de **343–360 ms**, pero el diagnóstico de desglose de LCP reporta demoras de renderizado del elemento de aproximadamente **2.25–5.32 s** y la secuencia de fotogramas del informe conserva pantallas en blanco hasta fotogramas tardíos. El Speed Index también varía entre aproximadamente 1.48 y 3.23 s.

Con los artefactos disponibles no se puede atribuir esa inconsistencia de forma concluyente al código, al entorno de ejecución o a Lighthouse. Por ello:

- no se afirma que la percepción de carga haya mejorado;
- no se cambia ni se omite el score posterior desfavorable;
- sí se reportan como resultados demostrados la reducción del bundle principal, el menor volumen transferido y el build/pruebas aprobados;
- la grabación local de Chrome Performance puede conservarse como evidencia auxiliar si se exporta el perfil, pero no es necesaria para demostrar la reducción del tamaño del bundle.

### 5.2 Condiciones de prueba y artefactos

- URL: `http://127.0.0.1:4173/login`.
- Entorno: build de producción local servido con Vite Preview; no es un despliegue público.
- Lighthouse: versión 13.5.0, modo Desktop, `throttlingMethod=simulate`, RTT 40 ms, throughput 10,240 kbps, CPU slowdown 1.
- Categoría ejecutada: Performance. Estas mediciones no certifican accesibilidad, SEO ni las otras categorías.
- La captura `network-antes.png` tiene caché desactivada y `No throttling`; corresponde únicamente a la línea base. No se usa como comparación directa de latencia contra los resultados de Lighthouse.
- Evidencias principales: tres HTML `lighthouse-antes-desktop-*.html`, tres HTML `lighthouse-despues-desktop-*.html`, resumen de línea base y parche de revisión del cambio de código.

## 6. Interpretación ambiental y límites

La transferencia inicial medida en la pantalla login se redujo en **6,105 bytes por carga** en la comparación de Lighthouse. La división de código también redujo el tamaño del JavaScript principal y evita incluir las páginas secundarias en ese archivo inicial. Estos son indicadores técnicos compatibles con el objetivo de reducir recursos transferidos/procesados; no constituyen una medición directa de energía ni de emisiones de carbono.

No se estima CO₂e por visita en este informe. Para hacerlo habría que declarar una metodología reproducible (por ejemplo, SWDM en una versión específica), definir la unidad funcional, límites de sistema, tipo de usuarios/caché, factores energéticos y supuestos. No se utiliza la fórmula simplificada ni las cifras de ejemplo del documento de referencia como si fueran datos reales.

## 7. Estado de las áreas Green IT

| Área indicada en la guía | Estado para este cierre | Próximo paso si la actividad exige ampliación |
|---|---|---|
| División de código/carga diferida de páginas React | **Aplicada y validada** con tests y build | Mantener pruebas de navegación y errores de carga. |
| Consultas SQL e índices | Pendiente de medición | Revisar consultas SQLAlchemy y planes PostgreSQL en un conjunto de datos representativo. |
| Paginación en listados | Pendiente de verificación por endpoint | Comprobar contratos de API y consumidores React; añadir límites y tests donde falte. |
| Imágenes y recursos | No se identificó una oportunidad cuantificada en esta medición | Inventariar tamaños/formats y optimizar solo recursos reales. |
| Limpieza de dependencias | No realizada en esta intervención | Revisar uso real y peso antes de retirar paquetes. |
| Minimización de solicitudes HTTP | Medida en `/login`: 3 antes y 3 después | Revisar otros flujos, duplicados y llamadas a API por separado. |
| Caché HTTP | Pendiente de medición en servidor de publicación | Inspeccionar encabezados y política por tipo de recurso; proteger datos autenticados. |
| Compresión backend | Pendiente de medición | Verificar `GZipMiddleware`, `Content-Encoding`, transferencia y latencia de FastAPI. |

## 8. Criterios de cierre de esta intervención

- [x] Cambio de división de código aplicado a vistas secundarias del frontend.
- [x] Pruebas frontend posteriores aprobadas (14/14).
- [x] Build de producción posterior correcto (48 módulos transformados).
- [x] Tres reportes Lighthouse antes y tres después conservados.
- [x] Reducción del tamaño del bundle y bytes transferidos cuantificada.
- [x] La caída del score y las inconsistencias del diagnóstico posterior quedan explícitas.
- [x] No se inventan métricas de API, consumo energético o carbono.
- [ ] Integrar los documentos/evidencias en `main` mediante commit y push desde el repositorio local.

## 9. Referencias

- Sustainable Web Design Model, metodología de estimación de emisiones digitales: https://sustainablewebdesign.org/estimating-digital-emissions/
- ISO/IEC 21031:2024 — Software Carbon Intensity (SCI): https://www.iso.org/standard/86612.html
- Green Software Foundation — SCI: https://greensoftware.foundation/standards/sci/
- ISO/IEC 25010:2023 — modelo de calidad de producto: https://www.iso.org/standard/78176.html
- W3C Web Sustainability Guidelines (WSG), Group Note Draft: https://www.w3.org/TR/web-sustainability-guidelines/
- Repositorio EcoLogistics: https://github.com/LeeoGold/EcoLogistics/tree/main

## 10. Historial del documento

| Versión | Fecha | Cambios |
|---|---|---|
| V_1_0_0 | 2026-10-29 | Actualización del informe con resultados del cambio de división de código, comparación de seis reportes Lighthouse y limitaciones de la medición posterior. |
