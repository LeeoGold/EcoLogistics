import { useClients } from '../../state/ClientContext'
import { useOrders } from '../../state/OrderContext'

function formatDateTime(value) {
  if (!value) return '—'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('es-PE', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function OrderTable() {
  const { filteredOrders, orders, loading, loadOrders } = useOrders()
  const { clients } = useClients()

  const clientNames = new Map(
    clients.map((client) => [client.cliente_id, client.nombre])
  )

  return (
    <article className="card wide">
      <div className="card-heading">
        <div>
          <h2>Pedidos registrados</h2>
          <p>Consulta de pedidos disponibles para gestión y planificación.</p>
        </div>
        <button className="secondary" onClick={loadOrders} type="button">
          {loading ? 'Actualizando…' : 'Actualizar'}
        </button>
      </div>

      <p className="result-count">
        Mostrando {filteredOrders.length} de {orders.length} pedido(s).
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Peso (kg)</th>
              <th>Volumen (m³)</th>
              <th>Ventana</th>
              <th>Prioridad</th>
              <th>Producto</th>
              <th>Estado</th>
              <th>Referencia</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.pedido_id}>
                <td>{clientNames.get(order.cliente_id) || order.cliente_id}</td>
                <td>{order.peso_kg}</td>
                <td>{order.volumen_m3}</td>
                <td>
                  {formatDateTime(order.ventana_inicio)}
                  {' – '}
                  {formatDateTime(order.ventana_fin)}
                </td>
                <td>{order.prioridad}</td>
                <td>{order.tipo_producto}</td>
                <td>{order.estado}</td>
                <td>{order.referencia_entrega || '—'}</td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="8">No hay pedidos que coincidan con los filtros seleccionados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  )
}
