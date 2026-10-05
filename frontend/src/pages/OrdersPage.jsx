import OrderFilters from '../components/orders/OrderFilters'
import OrderTable from '../components/orders/OrderTable'

export default function OrdersPage() {
  return (
    <main className="container">
      <header className="page-heading">
        <div>
          <p className="section-kicker">GESTIÓN DE PEDIDOS · US-003 / US-004</p>
          <h1>Pedidos</h1>
          <p>Consulta la carga operativa y filtra pedidos para la planificación.</p>
        </div>
        <span className="status success-status">Módulo activo</span>
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
