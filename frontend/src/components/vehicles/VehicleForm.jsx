import { useVehicles } from '../../state/VehicleContext'

export default function VehicleForm() {
  const { form, message, updateField, registerVehicle } = useVehicles()

  return (
    <article className="card">
      <h2>Registrar vehículo</h2>
      <form onSubmit={registerVehicle}>
        <label>
          Placa
          <input name="placa" value={form.placa} onChange={updateField} required />
        </label>

        <label>
          Tipo
          <select name="tipo" value={form.tipo} onChange={updateField}>
            <option>CAMIONETA</option>
            <option>FURGON</option>
            <option>MOTO</option>
          </select>
        </label>

        <label>
          Capacidad (kg)
          <input type="number" min="1" name="capacidad_kg" value={form.capacidad_kg} onChange={updateField} required />
        </label>

        <label>
          Consumo (km/L)
          <input type="number" min="0.1" step="0.001" name="consumo_km_l" value={form.consumo_km_l} onChange={updateField} required />
        </label>

        <label>
          Factor CO₂ (kg/km)
          <input type="number" min="0" step="0.0001" name="factor_co2_kg_km" value={form.factor_co2_kg_km} onChange={updateField} required />
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
