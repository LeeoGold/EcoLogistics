import { useEffect, useState } from 'react'
import VehicleFilters from './VehicleFilters'
import InfoTooltip from '../common/InfoTooltip'
import { deleteVehicle, getVehiclesPage, updateVehicle } from '../../services/vehicleService'
import { useVehicles } from '../../state/VehicleContext'
import PaginationControls from '../common/PaginationControls'
import VehicleEditForm from './VehicleEditForm'

export default function VehicleTable({ isAdmin = false }) {
  const { vehicles, searchTerm, statusFilter } = useVehicles()
  const [page, setPage] = useState(1)
  const [result, setResult] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(null)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  async function loadPage(targetPage = page) {
    setLoading(true)
    setError('')
    try {
      const data = await getVehiclesPage({
        page: targetPage,
        page_size: 12,
        q: searchTerm,
        estado: statusFilter,
      })
      setResult(data)
      setPage(data.page)
      return true
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el listado de vehículos.')
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    void loadPage(1)
  }, [searchTerm, statusFilter, vehicles])

  async function handleUpdate(payload) {
    setSaving(true)
    setNotice(null)
    setError('')
    try {
      await updateVehicle(editingVehicle.vehiculo_id, payload)
      setEditingVehicle(null)
      const refreshed = await loadPage(page)
      setNotice({
        type: refreshed ? 'success' : 'error',
        text: refreshed
          ? 'Vehículo actualizado correctamente.'
          : 'El vehículo se actualizó, pero no se pudo refrescar el listado. Usa “Actualizar”.',
      })
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'No se pudo actualizar el vehículo.' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(vehicle) {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el vehículo ${vehicle.placa}? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    setDeletingId(vehicle.vehiculo_id)
    setNotice(null)
    setError('')
    try {
      await deleteVehicle(vehicle.vehiculo_id)
      const nextPage = result.items.length === 1 && page > 1 ? page - 1 : page
      const refreshed = await loadPage(nextPage)
      if (editingVehicle?.vehiculo_id === vehicle.vehiculo_id) setEditingVehicle(null)
      setNotice({
        type: refreshed ? 'success' : 'error',
        text: refreshed
          ? `Vehículo ${vehicle.placa} eliminado correctamente.`
          : `El vehículo ${vehicle.placa} se eliminó, pero no se pudo refrescar el listado. Usa “Actualizar”.`,
      })
    } catch (err) {
      setNotice({ type: 'error', text: err.message || 'No se pudo eliminar el vehículo.' })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <article className="card wide">
      <div className="card-heading">
        <div>
          <h2>Flota registrada</h2>
          <p>{isAdmin ? 'Consulta y administra los registros de vehículos.' : 'Datos persistidos en PostgreSQL.'}</p>
        </div>
        <button className="secondary" onClick={() => void loadPage()} type="button" disabled={loading}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </button>
      </div>
      <VehicleFilters />

      {notice && <p className={`message ${notice.type}`} role="status" aria-live="polite">{notice.text}</p>}
      {error && <p className="message error" role="alert">{error}</p>}

      {isAdmin && editingVehicle && (
        <VehicleEditForm
          key={editingVehicle.vehiculo_id}
          vehicle={editingVehicle}
          saving={saving}
          onCancel={() => setEditingVehicle(null)}
          onSave={handleUpdate}
        />
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th><span className="label-with-hint"><span>Consumo</span><InfoTooltip text="Rendimiento del vehículo expresado en kilómetros por galón estadounidense (US)." /></span></th>
              <th><span className="label-with-hint"><span>CO₂</span><InfoTooltip text="Factor de emisión expresado en kilogramos de CO₂ por cada kilómetro recorrido." /></span></th>
              <th>Año</th>
              <th>Estado</th>
              {isAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {result.items.map((vehicle) => (
              <tr key={vehicle.vehiculo_id}>
                <td>{vehicle.placa}</td>
                <td>{vehicle.tipo}</td>
                <td>{vehicle.capacidad_kg}</td>
                <td>{vehicle.consumo_km_gal}</td>
                <td>{vehicle.factor_co2_kg_km}</td>
                <td>{vehicle.anio_fabricacion}</td>
                <td>{vehicle.estado}</td>
                {isAdmin && (
                  <td>
                    <div className="vehicle-row-actions">
                      <button
                        type="button"
                        className="secondary"
                        aria-label={`Editar vehículo ${vehicle.placa}`}
                        onClick={() => {
                          setNotice(null)
                          setEditingVehicle(vehicle)
                        }}
                        disabled={saving || deletingId !== null}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="vehicle-row-actions__delete"
                        aria-label={`Eliminar vehículo ${vehicle.placa}`}
                        onClick={() => void handleDelete(vehicle)}
                        disabled={saving || deletingId !== null}
                      >
                        {deletingId === vehicle.vehiculo_id ? 'Eliminando…' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {!loading && result.items.length === 0 && (
              <tr><td colSpan={isAdmin ? 8 : 7}>No hay vehículos que coincidan con los filtros.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <PaginationControls page={page} total={result.total} onPageChange={(next) => void loadPage(next)} />
    </article>
  )
}
