import { useClients } from '../../state/ClientContext'

export default function ClientForm() {
  const { form, message, updateField, registerClient } = useClients()

  return (
    <article className="card">
      <h2>Registrar cliente</h2>
      <p className="form-help">
        Registra los datos de contacto, ubicación y horario preferido del cliente.
      </p>

      <form onSubmit={registerClient}>
        <div className="client-form-grid">
          <label>
            Nombre
            <input
              name="nombre"
              value={form.nombre}
              onChange={updateField}
              maxLength="150"
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
            Dirección de referencia
            <input
              name="direccion_referencia"
              value={form.direccion_referencia}
              onChange={updateField}
              maxLength="255"
              required
            />
          </label>

          <label>
            Latitud
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
            Longitud
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

          <label className="full-width">
            Restricciones de acceso
            <input
              name="restricciones_acceso"
              value={form.restricciones_acceso}
              onChange={updateField}
              maxLength="255"
              placeholder="Ej.: acceso restringido por horario"
            />
          </label>
        </div>

        <button type="submit">Registrar cliente</button>
      </form>

      {message && <p className="message">{message}</p>}
    </article>
  )
}
