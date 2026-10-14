# US-013 · Planificación operativa de rutas

## Objetivo

Permitir que un operador registre una ruta planificada asignando una fecha, hora de salida, conductor activo, vehículo disponible y uno o varios pedidos pendientes.

## Alcance de este incremento

- Consulta de rutas registradas desde `GET /api/rutas`.
- Consulta individual desde `GET /api/rutas/{ruta_id}`.
- Creación de una ruta y sus asignaciones desde `POST /api/rutas`.
- Registro de secuencia de pedidos en `detalle_ruta` según el orden seleccionado.
- Validación de existencia y estado del conductor, vehículo y pedidos.
- Validación de disponibilidad horaria del conductor y capacidad máxima de carga.
- Prevención conservadora de dobles asignaciones al mismo conductor o vehículo el mismo día cuando no se conoce el fin de la ruta anterior.
- Actualización del estado de los pedidos incluidos a `ASIGNADO` dentro de la misma transacción de base de datos.
- Interfaz de consulta y creación manual, con resumen de carga y validaciones previas.

## Reglas operativas

1. Se requiere al menos un pedido y no se permite repetir el mismo pedido en la solicitud.
2. El conductor debe existir, estar `ACTIVO` y encontrarse dentro de su horario de disponibilidad.
3. El vehículo debe existir y estar `DISPONIBLE`.
4. Todos los pedidos deben existir y estar en estado `PENDIENTE`.
5. La suma del peso de los pedidos no puede superar la capacidad del vehículo.
6. Si la creación falla, los cambios de ruta, asignación, detalles y estados de pedidos se revierten juntos.

## Limitaciones conocidas

Este incremento implementa planificación manual y persistencia de asignaciones. No calcula distancia por carretera, tiempos estimados de llegada, consumo, emisiones reales ni una ruta óptima. Esos valores permanecen sin calcular hasta integrar datos de geolocalización y un motor de rutas apropiado. La restricción de horario utiliza el inicio planificado; la estimación de duración y ventanas reales de entrega se abordará en una mejora posterior.

## Verificación

La suite añade pruebas para crear y listar rutas, actualizar el estado del pedido, validar capacidad, validar disponibilidad horaria, rechazar conductores inactivos, rechazar vehículos no disponibles, gestionar identificadores inexistentes, impedir pedidos repetidos y detectar asignaciones incompatibles.
