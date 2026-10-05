import { useClients } from '../../state/ClientContext'

export default function ClientForm() {
  const { form, message, messageType, updateField, registerClient, loading } = useClients()

  return (
    <article className="card form-card">
      <div className="card-heading stacked-mobile">
        <div>
          <p className="section-kicker">US-006 · Registro</p>
          <h2>Nuevo cliente</h2>
          <p className="form-help">
            Registra ubicación, contacto y ventana preferida para preparar la planificación.
          </p>
        </div>
        <span className="module-badge">3 SP</span>
      </div>

      <form onSubmit={registerClient}>
        <div className="form-section">
          <p className="form-section-title">Datos principales</p>
          <div className="client-form-grid">
            <label>
              Nombre <span className="required-mark">*</span>
              <input
                name="nombre"
                value={form.nombre}
                onChange={updateField}
                maxLength="150"
                placeholder="Ej. Comercial Huancayo"
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
                placeholder="Teléfono o referencia"
              />
            </label>

            <label className="full-width">
              Dirección de referencia <span className="required-mark">*</span>
              <input
                name="direccion_referencia"
                value={form.direccion_referencia}
                onChange={updateField}
                maxLength="255"
                placeholder="Ej. Av. Ferrocarril 123"
                required
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Ubicación</p>
          <div className="client-form-grid">
            <label>
              Latitud <span className="required-mark">*</span>
              <input
                type="number"
                name="latitud"
                value={form.latitud}
                onChange={updateField}
                min="-90"
                max="90"
                step="0.0000001"
                placeholder="-12.0656"
                required
              />
            </label>

            <label>
              Longitud <span className="required-mark">*</span>
              <input
                type="number"
                name="longitud"
                value={form.longitud}
                onChange={updateField}
                min="-180"
                max="180"
                step="0.0000001"
                placeholder="-75.2040"
                required
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <p className="form-section-title">Ventana y acceso</p>
          <div className="client-form-grid">
            <label>
              Horario desde
              <input
                type="time"
                name="horario_preferido_inicio"
                value={form.horario_preferido_inicio}
                onChange={updateField}
              />
            </label>

            <label>
              Horario hasta
              <input
                type="time"
                name="horario_preferido_fin"
                value={form.horario_preferido_fin}
                onChange={updateField}
              />
            </label>

            <p className="field-note full-width">
              El horario es opcional, pero cuando se registra debe incluir inicio y fin.
            </p>

            <label className="full-width">
              Restricciones de acceso
              <input
                name="restricciones_acceso"
                value={form.restricciones_acceso}
                onChange={updateField}
                maxLength="255"
                placeholder="Ej. acceso solo por puerta principal"
              />
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando…' : 'Registrar cliente'}
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
