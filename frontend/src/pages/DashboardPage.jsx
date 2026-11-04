import { useEffect, useState } from 'react'
import { getDashboardSummary } from '../services/dashboardService'

export default function DashboardPage() {
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')

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

  return (
    <main className="container">
      <section className="dashboard-hero"><div><p className="eyebrow">ECOLOGÍSTICA HUANCAYO</p><h1>Centro de operaciones</h1><p>Demostración funcional del MVP para gestión de flota, clientes y pedidos.</p></div><div className="hero-mark" aria-hidden="true">EC</div></section>
      {error && <p className="message error" role="alert">No se pudo cargar el resumen: {error}</p>}
      <section className="metric-grid" aria-label="Resumen operativo">
        <article className="metric-card"><span className="metric-label">Vehículos disponibles</span><strong>{summary ? metrics.vehiculos_disponibles : '—'}</strong><span>de {summary ? metrics.vehiculos_total : '—'} registrados</span></article>
        <article className="metric-card"><span className="metric-label">Clientes registrados</span><strong>{summary ? metrics.clientes_total : '—'}</strong><span>listos para asociar pedidos</span></article>
        <article className="metric-card"><span className="metric-label">Pedidos pendientes</span><strong>{summary ? metrics.pedidos_pendientes : '—'}</strong><span>disponibles para planificación</span></article>
        <article className="metric-card"><span className="metric-label">Conductores activos</span><strong>{summary ? metrics.conductores_activos : '—'}</strong><span>de {summary ? metrics.conductores_total : '—'} registrados</span></article>
      </section>
      <section className="dashboard-grid">
        <article className="card"><p className="section-kicker">Sprint 2</p><h2>Funcionalidades implementadas</h2><div className="check-list"><span>✓ Gestión de flota y rendimiento en km/galón</span><span>✓ Registro y consulta de clientes</span><span>✓ Registro, consulta y filtrado de pedidos</span><span>✓ Registro y consulta de conductores desde la interfaz</span><span>✓ Validaciones de datos y ventanas de tiempo</span><span>✓ Validaciones de formularios y pruebas automatizadas de backend</span></div></article>
        <article className="card"><p className="section-kicker">Flujo de demostración</p><h2>Orden recomendado</h2><ol className="demo-flow"><li><span>01</span> Revisar vehículos y métricas ambientales.</li><li><span>02</span> Registrar o consultar conductores.</li><li><span>03</span> Registrar un cliente y su punto de entrega.</li><li><span>04</span> Registrar un pedido asociado al cliente.</li><li><span>05</span> Consultar y filtrar pedidos.</li><li><span>06</span> Planificar una ruta y asignar pedidos.</li></ol></article>
      </section>
    </main>
  )
}
