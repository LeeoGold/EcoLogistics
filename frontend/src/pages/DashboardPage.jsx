import { useClients } from '../state/ClientContext'
import { useDrivers } from '../state/DriverContext'
import { useOrders } from '../state/OrderContext'
import { useVehicles } from '../state/VehicleContext'

export default function DashboardPage() {
  const { vehicles } = useVehicles()
  const { clients } = useClients()
  const { drivers } = useDrivers()
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
        <article className="metric-card">
          <span className="metric-label">Conductores activos</span>
          <strong>{drivers.filter((driver) => driver.estado === 'ACTIVO').length}</strong>
          <span>de {drivers.length} registrados</span>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="card">
          <p className="section-kicker">Sprint 2</p>
          <h2>Funcionalidades implementadas</h2>
          <div className="check-list">
            <span>✓ Gestión de flota y rendimiento en km/galón</span>
            <span>✓ Registro y consulta de clientes</span>
            <span>✓ Registro, consulta y filtrado de pedidos</span>
            <span>✓ Registro y consulta de conductores desde la interfaz</span>
            <span>✓ Validaciones de datos y ventanas de tiempo</span>
            <span>✓ Validaciones de formularios y pruebas automatizadas de backend</span>
          </div>
        </article>

        <article className="card">
          <p className="section-kicker">Flujo de demostración</p>
          <h2>Orden recomendado</h2>
          <ol className="demo-flow">
            <li><span>01</span> Revisar vehículos y métricas ambientales.</li>
            <li><span>02</span> Registrar o consultar conductores.</li>
            <li><span>03</span> Registrar un cliente y su punto de entrega.</li>
            <li><span>04</span> Registrar un pedido asociado al cliente.</li>
            <li><span>05</span> Consultar y filtrar pedidos.</li>
            <li><span>06</span> Planificar una ruta y asignar pedidos.</li>
          </ol>
        </article>
      </section>
    </main>
  )
}
