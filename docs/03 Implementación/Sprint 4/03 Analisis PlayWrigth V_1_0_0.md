# Análisis de Playwright — Sprint 4

[← Volver al README principal](../../../README.md)

## 1. Objetivo

Implementar y ejecutar una suite de pruebas End-to-End (E2E) con Playwright para verificar desde el navegador los recorridos principales de EcoLogística Huancayo: navegación pública, control de acceso, autenticación y presentación de acciones según el rol del usuario.

## 2. Entorno y configuración

| Elemento | Configuración verificada |
|---|---|
| Aplicación | EcoLogística Huancayo — frontend React 19 y Vite 8 |
| Automatización | `@playwright/test` |
| Archivo de configuración | `frontend/playwright.config.js` |
| Carpeta de pruebas | `frontend/e2e/` |
| Servidor frontend | Vite en `http://127.0.0.1:5173` |
| Navegadores | Chromium, Firefox y WebKit |
| Ejecución local | Windows, PowerShell, Node.js 24 / npm 11 |
| Workers locales observados | 4 |
| Reporte | Listado en consola y reporte HTML (`playwright-report/`) |

La configuración define tres proyectos de navegador: `chromium`, `firefox` y `webkit`. En ejecución local se utiliza el servidor Vite iniciado por Playwright, con `reuseExistingServer` habilitado fuera de CI. Los tiempos de espera configurados son 10 segundos para acciones y 20 segundos para navegación. Las capturas, videos y trazas se conservan cuando una prueba falla.

En CI se activa el modo `CI`, se limita la concurrencia a dos workers y se permite un reintento para reducir el efecto de fallos transitorios. El reporte HTML se genera en `frontend/playwright-report/`.

## 3. Arquitectura de pruebas

```text
frontend/
├── playwright.config.js
└── e2e/
    ├── helpers.js
    ├── public.spec.js
    ├── auth.spec.js
    └── roles.spec.js
```

`helpers.js` concentra las respuestas simuladas de API y la rutina de inicio de sesión de prueba. Los archivos `*.spec.js` contienen los escenarios independientes.

### 3.1 Alcance de las simulaciones

Las pruebas navegan por el frontend real servido por Vite y utilizan interceptación de red de Playwright para simular respuestas de autenticación, resumen del dashboard y listado de vehículos. Los datos de prueba y el token son ficticios y solo sirven dentro de la ejecución E2E.

Por esa razón, esta suite verifica la experiencia de navegador y la visibilidad de las acciones por rol; **no** constituye una prueba contra PostgreSQL ni demuestra por sí sola que la API autorice o rechace solicitudes. La autorización del backend se valida por separado mediante las pruebas automatizadas de FastAPI, incluyendo las pruebas que comprueban que el operador recibe `403` al intentar actualizar o eliminar vehículos.

## 4. Casos E2E ejecutados

| Archivo | Escenario | Resultado por navegador |
|---|---|---:|
| `public.spec.js` | La página pública muestra sus módulos principales | 3/3 |
| `public.spec.js` | El acceso directo a Flota sin sesión vuelve a la vista pública | 3/3 |
| `auth.spec.js` | Inicio de sesión correcto y presentación del panel según perfil | 3/3 |
| `auth.spec.js` | Mensaje ante credenciales incorrectas | 3/3 |
| `auth.spec.js` | Cierre de sesión y retorno a la página pública | 3/3 |
| `roles.spec.js` | El administrador ve las acciones de edición y eliminación de vehículos | 3/3 |
| `roles.spec.js` | El operador consulta y registra, sin ver acciones administrativas | 3/3 |

## 5. Resultados de ejecución

**Ejecución local reportada por Playwright:**

| Indicador | Resultado |
|---|---:|
| Total de ejecuciones | 21 |
| Aprobadas | 21 |
| Fallidas | 0 |
| Omitidas | 0 |
| Chromium | 7/7 aprobadas |
| Firefox | 7/7 aprobadas |
| WebKit | 7/7 aprobadas |
| Duración total informada | 1,2 minutos |

**Tasa de éxito:**

\[
\text{Éxito} = \frac{21}{21} \times 100 = 100\%
\]

La salida de consola de la ejecución muestra las 21 pruebas aprobadas y finaliza con `21 passed (1.2m)`. Esta cifra corresponde a la ejecución local comunicada durante el cierre del Sprint 4; no debe presentarse como resultado de GitHub Actions hasta que el workflow remoto se ejecute correctamente.

### 5.1 Comando de reproducción

Desde la carpeta `frontend/`:

```powershell
npm run test:e2e
```

Para abrir el informe HTML generado localmente:

```powershell
npm run test:e2e:report
```

## 6. Rendimiento, disponibilidad y resiliencia

La suite inicial confirma que el frontend puede arrancar bajo el servidor Vite gestionado por Playwright y completar los recorridos funcionales descritos en los tres navegadores. El escenario de credenciales incorrectas verifica una respuesta HTTP simulada `401`; las rutas API no simuladas reciben una respuesta simulada `404`.

No se ha registrado todavía una medición cuantitativa reproducible de TTFB, FCP, LCP ni latencia de API. Tampoco se ha medido uptime de un entorno desplegado, ni se ha ejecutado una prueba de caída real de red. Estos indicadores quedan pendientes de medición en un entorno de despliegue; no se deben completar con cifras estimadas o datos inventados.

| Indicador solicitado | Estado de evidencia |
|---|---|
| TTFB | Pendiente de medición instrumentada |
| FCP | Pendiente de medición instrumentada |
| LCP | Pendiente de medición instrumentada |
| Tiempo de respuesta de API | Pendiente de medición contra API real; los tiempos mock no representan latencia del backend |
| Estado HTTP de autenticación inválida | `401` simulado y comprobado mediante escenario E2E |
| Uptime del entorno desplegado | Pendiente de despliegue y observación |
| Reporte HTML | Generado localmente por Playwright; conservar como evidencia de ejecución |
| Trazas, capturas y videos de fallo | Configurados para conservarse cuando exista un fallo |

## 7. Automatización continua

El workflow `tests.yml` ejecuta la suite Playwright en GitHub Actions cuando se realiza `push` a `main`, `develop` o `feature/sprint-4-cierre`, ante `pull_request` hacia `main` o `develop`, y manualmente mediante `workflow_dispatch`.

El flujo instala las dependencias bloqueadas con `npm ci`, instala Chromium, Firefox y WebKit, ejecuta `npm run test:e2e` y almacena el reporte HTML y diagnósticos como artefacto durante 14 días. El estado remoto debe registrarse después de la primera ejecución del workflow.

## 8. Conclusión

La implementación inicial de Playwright quedó integrada y ejecutada localmente con 100 % de éxito: 21 de 21 pruebas aprobadas en Chromium, Firefox y WebKit. Se verificaron los recorridos públicos, autenticación y presentación de permisos del módulo de flota. La evidencia es reproducible mediante `npm run test:e2e`.

El alcance debe interpretarse junto con sus límites: las respuestas de API fueron simuladas en esta suite, la autorización del servidor se cubre con pruebas backend separadas y las métricas Web Vitals, latencia real, resiliencia de red y uptime requieren una medición adicional sobre un entorno desplegado.

---

**Versión:** V_1_0_0<br>
**Sprint:** 4<br>
**Proyecto:** EcoLogística Huancayo (EcoLogistics)


---

## Navegación

[Índice de esta sección](README.md)
