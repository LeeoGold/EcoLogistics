import { useClients } from '../../state/ClientContext'

function formatTime(value) {
  return value ? value.slice(0, 5) : '—'
}

export default function ClientTable() {
  const { clients, loading, loadClients } = useClients()

  return (
    <article className="card wide">
      <div className="card-heading">
        <div>
          <h2>Clientes registrados</h2>
          <p>Datos persistidos en PostgreSQL.</p>
        </div>
        <button className="secondary" onClick={loadClients} type="button">
          {loading ? 'Actualizando…' : 'Actualizar'}
        </button>
      </div>

      <p className="result-count">
        Mostrando {clients.length} cliente(s).
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Dirección</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Horario</th>
              <th>Restricciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.cliente_id}>
                <td>{client.nombre}</td>
                <td>{client.contacto || '—'}</td>
                <td>{client.direccion_referencia}</td>
                <td>{client.latitud}</td>
                <td>{client.longitud}</td>
                <td>
                  {formatTime(client.horario_preferido_inicio)}
                  {' – '}
                  {formatTime(client.horario_preferido_fin)}
                </td>
                <td>{client.restricciones_acceso || '—'}</td>
              </tr>
            ))}

            {clients.length === 0 && (
              <tr>
                <td colSpan="7">No hay clientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  )
}
