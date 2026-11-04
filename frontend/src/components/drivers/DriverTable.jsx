import { useEffect, useState } from 'react'
import { getDriversPage } from '../../services/driverService'
import { useDrivers } from '../../state/DriverContext'
import PaginationControls from '../common/PaginationControls'

function formatTime(value) { return value ? value.slice(0, 5) : '—' }

export default function DriverTable() {
  const { drivers, searchTerm, setSearchTerm, statusFilter, setStatusFilter, clearFilters } = useDrivers()
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadPage(targetPage = page) {
    setLoading(true); setError('')
    try {
      const data = await getDriversPage({ page: targetPage, page_size: 12, q: searchTerm, estado: statusFilter })
      setResult(data); setPage(data.page)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { setPage(1); void loadPage(1) }, [searchTerm, statusFilter, drivers])

  return (
    <article className="card wide">
      <div className="card-heading"><div><h2>Conductores registrados</h2><p>Información consultada desde la API del sistema.</p></div>
        <button className="secondary" onClick={() => void loadPage()} type="button" disabled={loading}>{loading ? 'Actualizando…' : 'Actualizar listado'}</button>
      </div>
      <div className="filters driver-filters">
        <label>Buscar<input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Nombre, documento, licencia o contacto" /></label>
        <label>Estado<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">Todos</option><option value="ACTIVO">Activos</option><option value="INACTIVO">Inactivos</option></select></label>
        <button className="secondary filter-clear" type="button" onClick={clearFilters}>Limpiar filtros</button>
      </div>
      {error && <p className="message error" role="alert">{error}</p>}
      <div className="table-wrap"><table>
        <thead><tr><th>Conductor</th><th>Documento</th><th>Licencia</th><th>Experiencia</th><th>Disponibilidad</th><th>Contacto</th><th>Estado</th></tr></thead>
        <tbody>
          {result.items.map((driver) => <tr key={driver.conductor_id}>
            <td>{driver.nombre_completo}</td><td>{driver.documento_identidad}</td><td><strong>{driver.licencia}</strong><span className="table-subtext">{driver.categoria_licencia}</span></td>
            <td>{driver.anios_experiencia} año(s)</td><td>{formatTime(driver.disponibilidad_inicio)} – {formatTime(driver.disponibilidad_fin)}</td><td>{driver.contacto}</td>
            <td><span className={`status-chip ${driver.estado === 'ACTIVO' ? 'is-active' : 'is-inactive'}`}>{driver.estado}</span></td>
          </tr>)}
          {!loading && result.items.length === 0 && <tr><td colSpan="7">No hay conductores que coincidan con los filtros.</td></tr>}
        </tbody>
      </table></div>
      <PaginationControls page={page} total={result.total} onPageChange={(next) => void loadPage(next)} />
    </article>
  )
}
