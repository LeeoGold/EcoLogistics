import { useVehicles } from '../../state/VehicleContext'

export default function VehicleFilters() {
  const {
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    clearFilters,
  } = useVehicles()

  return (
    <div className="filters" aria-label="Filtros de vehículos">
      <label>
        Buscar por placa
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Ej. HYO-002"
        />
      </label>

      <label>
        Estado
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="">Todos</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="NO_DISPONIBLE">No disponible</option>
          <option value="MANTENIMIENTO">Mantenimiento</option>
        </select>
      </label>

      <button className="secondary filter-clear" onClick={clearFilters} type="button">
        Limpiar filtros
      </button>
    </div>
  )
}
