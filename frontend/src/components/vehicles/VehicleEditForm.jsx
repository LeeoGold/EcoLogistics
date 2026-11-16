import { useState } from 'react'
import './VehicleEditForm.css'

const STATUS_OPTIONS = ['DISPONIBLE', 'NO_DISPONIBLE', 'MANTENIMIENTO']

function createFormState(vehicle) {
  return {
    placa: vehicle.placa ?? '',
    tipo: vehicle.tipo ?? 'CAMIONETA',
    capacidad_kg: String(vehicle.capacidad_kg ?? ''),
    consumo_km_gal: String(vehicle.consumo_km_gal ?? ''),
    factor_co2_kg_km: String(vehicle.factor_co2_kg_km ?? ''),
    anio_fabricacion: String(vehicle.anio_fabricacion ?? ''),
    estado: vehicle.estado ?? 'DISPONIBLE',
  }
}

export default function VehicleEditForm({ vehicle, saving, onCancel, onSave }) {
  const [form, setForm] = useState(() => createFormState(vehicle))
  const statusOptions = STATUS_OPTIONS.includes(form.estado)
    ? STATUS_OPTIONS
    : [...STATUS_OPTIONS, form.estado]

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    onSave({
      ...form,
      capacidad_kg: Number(form.capacidad_kg),
      consumo_km_gal: Number(form.consumo_km_gal),
      factor_co2_kg_km: Number(form.factor_co2_kg_km),
      anio_fabricacion: Number(form.anio_fabricacion),
    })
  }

  return (
    <section className="vehicle-edit-panel" aria-labelledby="vehicle-edit-title">
      <div className="vehicle-edit-panel__heading">
        <div>
          <p className="section-kicker">GESTIÓN ADMINISTRATIVA</p>
          <h3 id="vehicle-edit-title">Editar vehículo · {vehicle.placa}</h3>
          <p>Revisa los datos y guarda los cambios del registro seleccionado.</p>
        </div>
        <button className="secondary" type="button" onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
      </div>

      <form className="vehicle-edit-form" onSubmit={submit}>
        <label>
          Placa
          <input name="placa" value={form.placa} onChange={updateField} maxLength="15" required />
        </label>

        <label>
          Tipo
          <input name="tipo" value={form.tipo} onChange={updateField} maxLength="30" required />
        </label>

        <label>
          Capacidad (kg)
          <input type="number" name="capacidad_kg" value={form.capacidad_kg} onChange={updateField} min="0.01" step="0.01" required />
        </label>

        <label>
          Consumo (km/galón)
          <input type="number" name="consumo_km_gal" value={form.consumo_km_gal} onChange={updateField} min="0.001" step="0.001" required />
        </label>

        <label>
          Factor CO₂ (kg/km)
          <input type="number" name="factor_co2_kg_km" value={form.factor_co2_kg_km} onChange={updateField} min="0" step="0.0001" required />
        </label>

        <label>
          Año de fabricación
          <input type="number" name="anio_fabricacion" value={form.anio_fabricacion} onChange={updateField} min="1900" step="1" required />
        </label>

        <label>
          Estado
          <select name="estado" value={form.estado} onChange={updateField} required>
            {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <div className="vehicle-edit-form__actions">
          <button type="button" className="secondary" onClick={onCancel} disabled={saving}>
            Cancelar
          </button>
          <button type="submit" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </section>
  )
}
