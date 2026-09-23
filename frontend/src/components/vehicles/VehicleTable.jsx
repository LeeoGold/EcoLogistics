import VehicleFilters from './VehicleFilters'
import { useVehicles } from '../../state/VehicleContext'

export default function VehicleTable() {
  const { filteredVehicles, vehicles, loading, loadVehicles } = useVehicles()

  return (
    <article className="card wide">
      <div className="card-heading">
        <div>
          <h2>Flota registrada</h2>
          <p>Datos persistidos en PostgreSQL.</p>
        </div>
        <button className="secondary" onClick={loadVehicles} type="button">
          {loading ? 'Actualizando…' : 'Actualizar'}
        </button>
      </div>

      <VehicleFilters />

      <p className="result-count">
        Mostrando {filteredVehicles.length} de {vehicles.length} vehículo(s).
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Consumo</th>
              <th>CO₂</th>
              <th>Año</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.vehiculo_id}>
                <td>{vehicle.placa}</td>
                <td>{vehicle.tipo}</td>
                <td>{vehicle.capacidad_kg}</td>
                <td>{vehicle.consumo_km_l}</td>
                <td>{vehicle.factor_co2_kg_km}</td>
                <td>{vehicle.anio_fabricacion}</td>
                <td>{vehicle.estado}</td>
              </tr>
            ))}
            {filteredVehicles.length === 0 && (
              <tr>
                <td colSpan="7">
                  {vehicles.length === 0
                    ? 'No hay vehículos registrados.'
                    : 'No hay vehículos que coincidan con los filtros.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  )
}
