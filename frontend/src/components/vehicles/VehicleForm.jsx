import { useVehicles } from '../../state/VehicleContext'
import InfoTooltip from '../common/InfoTooltip'

export default function VehicleForm() {
  const { form, updateField, registerVehicle, message } = useVehicles()

  return (
    <article className="card">
      <h2>Registrar vehículo</h2>
      <p>Completa los datos básicos de la flota.</p>

      <form onSubmit={registerVehicle}>
        <label>
          Placa
          <input type="text" maxLength="15" name="placa" value={form.placa} onChange={updateField} required />
        </label>

        <label>
          Tipo
          <select name="tipo" value={form.tipo} onChange={updateField}>
            <option value="CAMIONETA">CAMIONETA</option>
            <option value="FURGON">FURGON</option>
            <option value="MOTO">MOTO</option>
          </select>
        </label>

        <label>
          Capacidad (kg)
          <input type="number" min="1" name="capacidad_kg" value={form.capacidad_kg} onChange={updateField} required />
        </label>

        <label>
          <span className="label-with-hint">
            <span>Consumo (km/galón)</span>
            <InfoTooltip text="Indica la distancia estimada que el vehículo puede recorrer con un galón estadounidense (US) de combustible." />
          </span>
          <input
            type="number"
            min="0.1"
            step="0.001"
            name="consumo_km_gal"
            value={form.consumo_km_gal}
            onChange={updateField}
            required
          />
        </label>

        <label>
          <span className="label-with-hint">
            <span>Factor CO₂ (kg/km)</span>
            <InfoTooltip text="Factor de emisión: cantidad estimada de kilogramos de CO₂ que emite el vehículo por cada kilómetro recorrido." />
          </span>
          <input
            type="number"
            min="0"
            step="0.0001"
            name="factor_co2_kg_km"
            value={form.factor_co2_kg_km}
            onChange={updateField}
            required
          />
        </label>

        <label>
          Año
          <input type="number" min="1900" name="anio_fabricacion" value={form.anio_fabricacion} onChange={updateField} required />
        </label>

        <button type="submit">Registrar vehículo</button>
      </form>
      {message && <p className="message">{message}</p>}
    </article>
  )
}
