import ClientForm from '../components/clients/ClientForm'
import ClientTable from '../components/clients/ClientTable'

export default function ClientsPage() {
  return (
    <main className="container">
      <header className="page-heading">
        <div>
          <p className="section-kicker">GESTIÓN DE CLIENTES · US-006</p>
          <h1>Clientes</h1>
          <p>Registra puntos de entrega y conserva la información necesaria para planificar.</p>
        </div>
        <span className="status success-status">Módulo activo</span>
      </header>

      <section className="grid">
        <ClientForm />
        <ClientTable />
      </section>
    </main>
  )
}
