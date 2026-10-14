import { useDrivers } from '../../state/DriverContext'

function formatTime(value) {
  return value ? value.slice(0, 5) : '—'
}

export default function DriverTable() {
  const {
    drivers,
    filteredDrivers,
    loading,
    loadDrivers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    clearFilters,
  } = useDrivers()

  const activeCount = drivers.filter((driver) => driver.estado === 'ACTIVO').length

  return (
    <article className="card wide">
      <div className="card-heading">
        <div>
          <h2>Conductores registrados</h2>
          <p>Información consultada desde la API del sistema.</p>
        </div>
        <button className="secondary" onClick={() => void loadDrivers()} type="button" disabled={loading}>
          {loading ? 'Actualizando…' : 'Actualizar listado'}
        </button>
      </div>

      <div className="driver-summary" aria-label="Resumen de conductores">
        <div><span>Total</span><strong>{drivers.length}</strong></div>
        <div><span>Activos</span><strong>{activeCount}</strong></div>
        <div><span>Inactivos / otros</span><strong>{drivers.length - activeCount}</strong></div>
      </div>

      <div className="filters driver-filters">
        <label>
          Buscar
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nombre, documento, licencia o contacto"
          />
        </label>
        <label>
          Estado
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">Todos</option>
            <option value="ACTIVO">Activos</option>
            <option value="INACTIVO">Inactivos</option>
          </select>
        </label>
        <button className="secondary filter-clear" type="button" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </div>

      <p className="result-count">
        Mostrando {filteredDrivers.length} de {drivers.length} conductor(es).
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Conductor</th>
              <th>Documento</th>
              <th>Licencia</th>
              <th>Experiencia</th>
              <th>Disponibilidad</th>
              <th>Contacto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.conductor_id}>
                <td>{driver.nombre_completo}</td>
                <td>{driver.documento_identidad}</td>
                <td>
                  <strong>{driver.licencia}</strong>
                  <span className="table-subtext">{driver.categoria_licencia}</span>
                </td>
                <td>{driver.anios_experiencia} año(s)</td>
                <td>{formatTime(driver.disponibilidad_inicio)} – {formatTime(driver.disponibilidad_fin)}</td>
                <td>{driver.contacto}</td>
                <td>
                  <span className={`status-chip ${driver.estado === 'ACTIVO' ? 'is-active' : 'is-inactive'}`}>
                    {driver.estado}
                  </span>
                </td>
              </tr>
            ))}
            {filteredDrivers.length === 0 && (
              <tr>
                <td colSpan="7">
                  {drivers.length === 0
                    ? 'No hay conductores registrados. Usa el formulario para añadir el primero.'
                    : 'No hay conductores que coincidan con los filtros.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  )
}
