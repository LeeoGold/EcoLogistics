import { useEffect, useMemo, useState } from 'react'
import { getOrdersPage } from '../../services/orderService'
import { useClients } from '../../state/ClientContext'
import { useOrders } from '../../state/OrderContext'
import PaginationControls from '../common/PaginationControls'

function formatDateTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })
}

export default function OrderTable() {
  const { orders, filters } = useOrders()
  const { clients } = useClients()
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const clientNames = useMemo(() => new Map(clients.map((client) => [client.cliente_id, client.nombre])), [clients])

  async function loadPage(targetPage = page) {
    setLoading(true); setError('')
    try {
      const data = await getOrdersPage({ page: targetPage, page_size: 12, ...filters })
      setResult(data); setPage(data.page)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { setPage(1); void loadPage(1) }, [filters, orders])

  return (
    <article className="card wide">
      <div className="card-heading"><div><h2>Pedidos registrados</h2><p>Consulta de pedidos disponibles para gestión y planificación.</p></div>
        <button className="secondary" onClick={() => void loadPage()} type="button" disabled={loading}>{loading ? 'Actualizando…' : 'Actualizar'}</button>
      </div>
      {error && <p className="message error" role="alert">{error}</p>}
      <div className="table-wrap"><table>
        <thead><tr><th>Cliente</th><th>Peso (kg)</th><th>Volumen (m³)</th><th>Ventana</th><th>Prioridad</th><th>Producto</th><th>Estado</th><th>Referencia</th></tr></thead>
        <tbody>
          {result.items.map((order) => <tr key={order.pedido_id}><td>{clientNames.get(order.cliente_id) || order.cliente_id}</td><td>{order.peso_kg}</td><td>{order.volumen_m3}</td><td>{formatDateTime(order.ventana_inicio)} – {formatDateTime(order.ventana_fin)}</td><td>{order.prioridad}</td><td>{order.tipo_producto}</td><td>{order.estado}</td><td>{order.referencia_entrega || '—'}</td></tr>)}
          {!loading && result.items.length === 0 && <tr><td colSpan="8">No hay pedidos que coincidan con los filtros seleccionados.</td></tr>}
        </tbody>
      </table></div>
      <PaginationControls page={page} total={result.total} onPageChange={(next) => void loadPage(next)} />
    </article>
  )
}
