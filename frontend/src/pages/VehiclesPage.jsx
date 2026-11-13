import VehicleForm from '../components/vehicles/VehicleForm'
import VehicleTable from '../components/vehicles/VehicleTable'

export default function VehiclesPage({ currentUser }) {
  const isAdmin = String(currentUser?.rol || '').trim().toUpperCase() === 'ADMINISTRADOR'

  return (
    <main className="container">
      <header className="page-heading">
        <div>
          <p className="section-kicker">GESTIÓN DE FLOTA · US-001 / US-002 / US-011</p>
          <h1>Flota operativa</h1>
          <p>
            {isAdmin
              ? 'Registra, consulta, actualiza y elimina vehículos de la flota.'
              : 'Registra vehículos y consulta las métricas ambientales de la flota.'}
          </p>
        </div>
        <span className="status success-status">{isAdmin ? 'Administración habilitada' : 'Consulta y registro'}</span>
      </header>

      <section className="grid">
        <VehicleForm />
        <VehicleTable isAdmin={isAdmin} />
      </section>
    </main>
  )
}
