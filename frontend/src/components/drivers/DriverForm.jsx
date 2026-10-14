import { useDrivers } from '../../state/DriverContext'

export default function DriverForm() {
  const { form, updateField, registerDriver, message, messageType, saving } = useDrivers()

  return (
    <article className="card form-card">
      <h2>Registrar conductor</h2>
      <p>Completa los datos personales, la licencia y el horario disponible.</p>

      <form onSubmit={registerDriver}>
        <label>
          Nombre completo
          <input
            name="nombre_completo"
            value={form.nombre_completo}
            onChange={updateField}
            maxLength="150"
            autoComplete="name"
            required
          />
        </label>

        <div className="driver-form-grid">
          <label>
            Documento de identidad
            <input
              name="documento_identidad"
              value={form.documento_identidad}
              onChange={updateField}
              maxLength="20"
              autoComplete="off"
              required
            />
          </label>
          <label>
            Contacto
            <input
              name="contacto"
              value={form.contacto}
              onChange={updateField}
              maxLength="30"
              autoComplete="tel"
              required
            />
          </label>
          <label>
            Número de licencia
            <input
              name="licencia"
              value={form.licencia}
              onChange={updateField}
              maxLength="30"
              required
            />
          </label>
          <label>
            Categoría de licencia
            <input
              name="categoria_licencia"
              value={form.categoria_licencia}
              onChange={updateField}
              maxLength="20"
              placeholder="Ej. A-IIa"
              required
            />
          </label>
        </div>

        <label>
          Años de experiencia
          <input
            type="number"
            name="anios_experiencia"
            value={form.anios_experiencia}
            onChange={updateField}
            min="0"
            max="80"
            step="1"
            required
          />
        </label>

        <div className="driver-form-grid">
          <label>
            Disponible desde
            <input
              type="time"
              name="disponibilidad_inicio"
              value={form.disponibilidad_inicio}
              onChange={updateField}
              required
            />
          </label>
          <label>
            Disponible hasta
            <input
              type="time"
              name="disponibilidad_fin"
              value={form.disponibilidad_fin}
              onChange={updateField}
              required
            />
          </label>
        </div>

        <label>
          Estado
          <select name="estado" value={form.estado} onChange={updateField} required>
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </label>

        <p className="field-note">
          La disponibilidad debe tener una hora de inicio anterior a la hora de fin. El documento y la licencia deben ser únicos.
        </p>

        <button type="submit" disabled={saving}>
          {saving ? 'Registrando…' : 'Registrar conductor'}
        </button>
      </form>

      {message && (
        <p className={`message ${messageType}`} role="status" aria-live="polite">
          {message}
        </p>
      )}
    </article>
  )
}
