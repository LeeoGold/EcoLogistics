import VehicleForm from '../components/vehicles/VehicleForm'
import VehicleTable from '../components/vehicles/VehicleTable'

export default function VehiclesPage() {
  return (
    <main className="container">
      <header className="page-heading">
        <div>
          <p className="section-kicker">GESTIÓN DE FLOTA · US-001 / US-002 / US-011</p>
          <h1>Flota operativa</h1>
          <p>Registro, consulta y lectura clara de las métricas ambientales de los vehículos.</p>
        </div>
        <span className="status success-status">Módulo activo</span>
      </header>

      <section className="grid">
        <VehicleForm />
        <VehicleTable />
      </section>
    </main>
  )
}
