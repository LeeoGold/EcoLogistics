import { useEffect, useState } from 'react'
import VehicleFilters from './VehicleFilters'
import InfoTooltip from '../common/InfoTooltip'
import { getVehiclesPage } from '../../services/vehicleService'
import { useVehicles } from '../../state/VehicleContext'
import PaginationControls from '../common/PaginationControls'

export default function VehicleTable() {
  const { vehicles, searchTerm, statusFilter } = useVehicles()
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadPage(targetPage = page) {
    setLoading(true); setError('')
    try {
      const data = await getVehiclesPage({ page: targetPage, page_size: 12, q: searchTerm, estado: statusFilter })
      setResult(data); setPage(data.page)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { setPage(1); void loadPage(1) }, [searchTerm, statusFilter, vehicles])

  return (
    <article className="card wide">
      <div className="card-heading"><div><h2>Flota registrada</h2><p>Datos persistidos en PostgreSQL.</p></div>
        <button className="secondary" onClick={() => void loadPage()} type="button" disabled={loading}>{loading ? 'Actualizando…' : 'Actualizar'}</button>
      </div>
      <VehicleFilters />
      {error && <p className="message error" role="alert">{error}</p>}
      <div className="table-wrap"><table>
        <thead><tr><th>Placa</th><th>Tipo</th><th>Capacidad</th><th><span className="label-with-hint"><span>Consumo</span><InfoTooltip text="Rendimiento del vehículo expresado en kilómetros por galón estadounidense (US)." /></span></th><th><span className="label-with-hint"><span>CO₂</span><InfoTooltip text="Factor de emisión expresado en kilogramos de CO₂ por cada kilómetro recorrido." /></span></th><th>Año</th><th>Estado</th></tr></thead>
        <tbody>
          {result.items.map((vehicle) => <tr key={vehicle.vehiculo_id}><td>{vehicle.placa}</td><td>{vehicle.tipo}</td><td>{vehicle.capacidad_kg}</td><td>{vehicle.consumo_km_gal}</td><td>{vehicle.factor_co2_kg_km}</td><td>{vehicle.anio_fabricacion}</td><td>{vehicle.estado}</td></tr>)}
          {!loading && result.items.length === 0 && <tr><td colSpan="7">No hay vehículos que coincidan con los filtros.</td></tr>}
        </tbody>
      </table></div>
      <PaginationControls page={page} total={result.total} onPageChange={(next) => void loadPage(next)} />
    </article>
  )
}
