import { useEffect, useState } from 'react'
import { getClientsPage } from '../../services/clientService'
import { useClients } from '../../state/ClientContext'
import PaginationControls from '../common/PaginationControls'

function formatTime(value) {
  return value ? value.slice(0, 5) : '—'
}

export default function ClientTable() {
  const { clients } = useClients()
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadPage(targetPage = page) {
    setLoading(true)
    setError('')
    try {
      const data = await getClientsPage({ page: targetPage, page_size: 12 })
      setResult(data)
      setPage(data.page)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadPage(1) }, [clients])

  return (
    <article className="card wide">
      <div className="card-heading">
        <div><h2>Clientes registrados</h2><p>Datos persistidos en PostgreSQL.</p></div>
        <button className="secondary" onClick={() => void loadPage()} type="button" disabled={loading}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </button>
      </div>
      {error && <p className="message error" role="alert">{error}</p>}
      <div className="table-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Contacto</th><th>Dirección</th><th>Latitud</th><th>Longitud</th><th>Horario</th><th>Restricciones</th></tr></thead>
          <tbody>
            {result.items.map((client) => (
              <tr key={client.cliente_id}>
                <td>{client.nombre}</td><td>{client.contacto || '—'}</td><td>{client.direccion_referencia}</td>
                <td>{client.latitud}</td><td>{client.longitud}</td>
                <td>{formatTime(client.horario_preferido_inicio)} – {formatTime(client.horario_preferido_fin)}</td>
                <td>{client.restricciones_acceso || '—'}</td>
              </tr>
            ))}
            {!loading && result.items.length === 0 && <tr><td colSpan="7">No hay clientes registrados.</td></tr>}
          </tbody>
        </table>
      </div>
      <PaginationControls page={page} total={result.total} onPageChange={(next) => void loadPage(next)} />
    </article>
  )
}
