import { useClients } from '../state/ClientContext'
import { useOrders } from '../state/OrderContext'
import { useVehicles } from '../state/VehicleContext'

export default function DashboardPage() {
  const { vehicles } = useVehicles()
  const { clients } = useClients()
  const { orders } = useOrders()

  const pendingOrders = orders.filter((order) => order.estado === 'PENDIENTE').length
  const availableVehicles = vehicles.filter((vehicle) => vehicle.estado === 'DISPONIBLE').length

  return (
    <main className="container">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">ECOLOGÍSTICA HUANCAYO</p>
          <h1>Centro de operaciones</h1>
          <p>
            Demostración funcional del MVP para gestión de flota, clientes y pedidos.
          </p>
        </div>
        <div className="hero-mark" aria-hidden="true">EC</div>
      </section>

      <section className="metric-grid" aria-label="Resumen operativo">
        <article className="metric-card">
          <span className="metric-label">Vehículos disponibles</span>
          <strong>{availableVehicles}</strong>
          <span>de {vehicles.length} registrados</span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Clientes registrados</span>
          <strong>{clients.length}</strong>
          <span>listos para asociar pedidos</span>
        </article>
        <article className="metric-card">
          <span className="metric-label">Pedidos pendientes</span>
          <strong>{pendingOrders}</strong>
          <span>disponibles para planificación</span>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="card">
          <p className="section-kicker">Sprint 2</p>
          <h2>Funcionalidades implementadas</h2>
          <div className="check-list">
            <span>✓ Gestión de flota y rendimiento en km/galón</span>
            <span>✓ Registro y consulta de clientes</span>
            <span>✓ Registro y consulta de pedidos</span>
            <span>✓ Registro de conductores mediante API</span>
            <span>✓ Validaciones de datos y ventanas de tiempo</span>
            <span>✓ Evidencia técnica: 30 pruebas y 98 % de cobertura</span>
          </div>
        </article>

        <article className="card">
          <p className="section-kicker">Flujo de demostración</p>
          <h2>Orden recomendado</h2>
          <ol className="demo-flow">
            <li><span>01</span> Revisar vehículos y tooltips ambientales.</li>
            <li><span>02</span> Registrar un cliente.</li>
            <li><span>03</span> Registrar un pedido asociado.</li>
            <li><span>04</span> Consultar y filtrar pedidos.</li>
          </ol>
        </article>
      </section>
    </main>
  )
}
