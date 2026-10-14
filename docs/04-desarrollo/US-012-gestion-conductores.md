# US-012 — Gestión de conductores desde la interfaz

## Objetivo

Permitir que el personal operativo registre conductores y consulte el listado desde la interfaz web de EcoLogística Huancayo, utilizando la API ya existente en FastAPI.

## Alcance de este incremento

- Añadir la opción **Conductores** a la navegación principal.
- Registrar un conductor con nombre, documento, licencia, categoría, experiencia, horario disponible, contacto y estado.
- Consultar el listado existente desde `GET /api/conductores`.
- Crear registros mediante `POST /api/conductores`.
- Buscar por nombre, documento, licencia o contacto.
- Filtrar por estado y mostrar el total de conductores y los activos.
- Mostrar estados de carga, confirmación y errores de validación de la API.
- Incorporar la cantidad de conductores activos al dashboard.

## Reglas de validación visibles

- Los campos requeridos deben completarse.
- Los años de experiencia deben ser un entero no negativo.
- La hora de inicio debe ser anterior a la hora de fin.
- Documento y licencia deben ser únicos; los duplicados se reportan desde la API.
- Las opciones de estado visibles en el formulario son `ACTIVO` e `INACTIVO`.

## Endpoints utilizados

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/api/conductores` | Consultar el listado |
| `POST` | `/api/conductores` | Registrar un conductor |

La interfaz no implementa edición ni eliminación, ya que esos endpoints no forman parte de la API actual. La asociación de un conductor con una cuenta de usuario también queda pendiente del módulo de autenticación.

## Criterios de aceptación

1. La opción Conductores aparece en la barra de navegación.
2. La página carga el listado desde la API y comunica los errores si esta no está disponible.
3. El formulario permite registrar un conductor válido y actualiza el listado después de guardar.
4. La API rechaza horarios inválidos, experiencia negativa y documentos/licencias duplicados; la interfaz presenta el mensaje devuelto.
5. La búsqueda y el filtro de estado se aplican al listado sin modificar los registros en el servidor.
6. El dashboard muestra el número de conductores cuyo estado es `ACTIVO`.

## Pruebas manuales recomendadas

1. Iniciar PostgreSQL, backend y frontend.
2. Abrir la sección Conductores y verificar que carga los registros existentes.
3. Registrar un conductor con documento y licencia de prueba únicos.
4. Intentar registrar nuevamente el mismo documento y comprobar el mensaje de duplicado.
5. Probar una hora de inicio igual o posterior a la hora de fin.
6. Buscar por parte del nombre y filtrar por `ACTIVO`.
7. Regresar al dashboard y verificar el contador de activos.
