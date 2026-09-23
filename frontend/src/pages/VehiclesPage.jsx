import VehicleForm from '../components/vehicles/VehicleForm'
import VehicleTable from '../components/vehicles/VehicleTable'

export default function VehiclesPage() {
  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">ECOLOGÍSTICA HUANCAYO</p>
          <h1>Gestión inicial de flota</h1>
          <p>Primer avance funcional del MVP: registrar y consultar vehículos.</p>
        </div>
        <span className="status">MVP 0.1</span>
      </header>

      <section className="grid">
        <VehicleForm />
        <VehicleTable />
      </section>
    </main>
  )
}
