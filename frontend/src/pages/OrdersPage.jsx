import OrderFilters from '../components/orders/OrderFilters'
import OrderTable from '../components/orders/OrderTable'

export default function OrdersPage() {
  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">ECOLOGÍSTICA HUANCAYO</p>
          <h1>Consulta de pedidos</h1>
          <p>
            Sprint 2: revisión de pedidos registrados para gestión y planificación.
          </p>
        </div>
        <span className="status">US-004 · 3 SP</span>
      </header>

      <section className="grid orders-grid">
        <article className="card wide order-filter-card">
          <div className="card-heading">
            <div>
              <h2>Filtros de consulta</h2>
              <p>Filtra por estado, prioridad o fecha de la ventana de entrega.</p>
            </div>
          </div>
          <OrderFilters />
        </article>

        <OrderTable />
      </section>
    </main>
  )
}
