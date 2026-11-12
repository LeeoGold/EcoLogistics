import { useEffect, useState } from 'react'
import { getDashboardSummary } from '../services/dashboardService'

function normalizeRole(role) {
  return String(role || '').trim().toUpperCase()
}

export default function DashboardPage({ currentUser }) {
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')
  const isAdmin = normalizeRole(currentUser?.rol) === 'ADMINISTRADOR'

  useEffect(() => {
    let active = true
    getDashboardSummary()
      .then((data) => { if (active) setSummary(data) })
      .catch((err) => { if (active) setError(err.message) })
    return () => { active = false }
  }, [])

  const metrics = summary || {
    vehiculos_disponibles: 0, vehiculos_total: 0, clientes_total: 0,
    pedidos_pendientes: 0, conductores_activos: 0, conductores_total: 0,
  }

  const adminTasks = [
    'Supervisar los indicadores y registros operativos.',
    'Consultar los seis módulos desde un único panel.',
    'Ejecutar las acciones administrativas que ya están habilitadas en la API.',
    'Supervisar que las altas registradas mantengan información consistente.',
  ]

  const operatorTasks = [
    'Registrar nuevos clientes, vehículos y conductores.',
    'Registrar pedidos y preparar rutas de trabajo.',
    'Consultar los indicadores y registros existentes.',
    'No modificar ni eliminar información ya registrada.',
  ]

  return (
    <main className="container">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">ECOLOGÍSTICA HUANCAYO · {isAdmin ? 'ADMINISTRACIÓN' : 'OPERACIONES'}</p>
          <h1>{isAdmin ? 'Panel de administración' : 'Panel operativo'}</h1>
          <p>
            {isAdmin
              ? 'Supervisa los indicadores y gestiona las operaciones de EcoLogística Huancayo.'
              : 'Registra nueva información y consulta el estado de la operación logística.'}
          </p>
          <p className="dashboard-role-greeting">
            Sesión: <strong>{currentUser?.nombre_usuario || 'Usuario'}</strong> · Perfil: <strong>{isAdmin ? 'Administrador' : 'Operador'}</strong>
          </p>
        </div>
        <div className="hero-mark" aria-hidden="true">{isAdmin ? 'AD' : 'OP'}</div>
      </section>

      {error && <p className="message error" role="alert">No se pudo cargar el resumen: {error}</p>}

      <section className="metric-grid" aria-label="Resumen operativo">
        <article className="metric-card"><span className="metric-label">Vehículos disponibles</span><strong>{summary ? metrics.vehiculos_disponibles : '—'}</strong><span>de {summary ? metrics.vehiculos_total : '—'} registrados</span></article>
        <article className="metric-card"><span className="metric-label">Clientes registrados</span><strong>{summary ? metrics.clientes_total : '—'}</strong><span>listos para asociar pedidos</span></article>
        <article className="metric-card"><span className="metric-label">Pedidos pendientes</span><strong>{summary ? metrics.pedidos_pendientes : '—'}</strong><span>disponibles para planificación</span></article>
        <article className="metric-card"><span className="metric-label">Conductores activos</span><strong>{summary ? metrics.conductores_activos : '—'}</strong><span>de {summary ? metrics.conductores_total : '—'} registrados</span></article>
      </section>

      <section className="dashboard-grid">
        <article className="card">
          <p className="section-kicker">{isAdmin ? 'CONTROL ADMINISTRATIVO' : 'ALCANCE DEL OPERADOR'}</p>
          <h2>{isAdmin ? 'Responsabilidades del administrador' : 'Tu espacio de trabajo'}</h2>
          <div className="check-list">
            {(isAdmin ? adminTasks : operatorTasks).map((task) => <span key={task}>✓ {task}</span>)}
          </div>
          <p className="role-permission-note" role="note">
            {isAdmin
              ? 'Las acciones de actualización y eliminación que ya existen en el backend están reservadas a este perfil. Se ampliarán por módulo de forma progresiva.'
              : 'No puedes modificar ni eliminar registros existentes. El flujo para solicitar cambios al administrador se incorporará en la siguiente etapa.'}
          </p>
        </article>

        <article className="card">
          <p className="section-kicker">{isAdmin ? 'SUPERVISIÓN' : 'FLUJO OPERATIVO'}</p>
          <h2>{isAdmin ? 'Seguimiento de la operación' : 'Orden de trabajo recomendado'}</h2>
          <ol className="demo-flow">
            <li><span>01</span> Revisar vehículos y disponibilidad de flota.</li>
            <li><span>02</span> Consultar conductores y datos de clientes.</li>
            <li><span>03</span> Registrar y revisar pedidos.</li>
            <li><span>04</span> Planificar rutas según capacidad y horarios.</li>
            <li><span>05</span> Verificar que los datos operativos estén actualizados.</li>
          </ol>
        </article>
      </section>
    </main>
  )
}
