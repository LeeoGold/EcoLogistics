import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
const initialForm = {
  placa: '',
  tipo: 'CAMIONETA',
  capacidad_kg: '',
  consumo_km_l: '',
  factor_co2_kg_km: '',
  anio_fabricacion: new Date().getFullYear(),
  estado: 'DISPONIBLE',
}

export default function App() {
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadVehicles() {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/vehiculos`)
      if (!response.ok) throw new Error('No se pudo consultar la flota.')
      setVehicles(await response.json())
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function createVehicle(event) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/api/vehiculos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          capacidad_kg: Number(form.capacidad_kg),
          consumo_km_l: Number(form.consumo_km_l),
          factor_co2_kg_km: Number(form.factor_co2_kg_km),
          anio_fabricacion: Number(form.anio_fabricacion),
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.detail || 'No se pudo registrar el vehículo.')

      setMessage('Vehículo registrado correctamente.')
      setForm(initialForm)
      await loadVehicles()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">ECOLOGÍSTICA HUANCAYO</p>
          <h1>Gestión inicial de flota</h1>
          <p>Primer avance funcional del MVP: registrar y consultar vehículos.</p>
        </div>
        <span className="status">MVP 0.1</span>
      </header>

      <section className="grid">
        <article className="card">
          <h2>Registrar vehículo</h2>
          <form onSubmit={createVehicle}>
            <label>Placa<input name="placa" value={form.placa} onChange={updateField} required /></label>
            <label>Tipo<select name="tipo" value={form.tipo} onChange={updateField}><option>CAMIONETA</option><option>FURGON</option><option>MOTO</option></select></label>
            <label>Capacidad (kg)<input type="number" min="1" name="capacidad_kg" value={form.capacidad_kg} onChange={updateField} required /></label>
            <label>Consumo (km/L)<input type="number" min="0.1" step="0.001" name="consumo_km_l" value={form.consumo_km_l} onChange={updateField} required /></label>
            <label>Factor CO₂ (kg/km)<input type="number" min="0" step="0.0001" name="factor_co2_kg_km" value={form.factor_co2_kg_km} onChange={updateField} required /></label>
            <label>Año<input type="number" min="1900" name="anio_fabricacion" value={form.anio_fabricacion} onChange={updateField} required /></label>
            <button type="submit">Registrar vehículo</button>
          </form>
          {message && <p className="message">{message}</p>}
        </article>

        <article className="card wide">
          <div className="card-heading">
            <div><h2>Flota registrada</h2><p>Datos persistidos en PostgreSQL.</p></div>
            <button className="secondary" onClick={loadVehicles}>{loading ? 'Actualizando…' : 'Actualizar'}</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Placa</th><th>Tipo</th><th>Capacidad</th><th>Consumo</th><th>CO₂</th><th>Año</th><th>Estado</th></tr></thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.vehiculo_id}>
                    <td>{vehicle.placa}</td><td>{vehicle.tipo}</td><td>{vehicle.capacidad_kg}</td><td>{vehicle.consumo_km_l}</td><td>{vehicle.factor_co2_kg_km}</td><td>{vehicle.anio_fabricacion}</td><td>{vehicle.estado}</td>
                  </tr>
                ))}
                {vehicles.length === 0 && <tr><td colSpan="7">No hay vehículos registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  )
}
