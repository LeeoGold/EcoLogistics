import ClientForm from '../components/clients/ClientForm'
import ClientTable from '../components/clients/ClientTable'

export default function ClientsPage() {
  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">ECOLOGÍSTICA HUANCAYO</p>
          <h1>Gestión de clientes</h1>
          <p>
            Sprint 2: registro y consulta de clientes para la operación logística.
          </p>
        </div>
        <span className="status">US-006 · 3 SP</span>
      </header>

      <section className="grid">
        <ClientForm />
        <ClientTable />
      </section>
    </main>
  )
}
