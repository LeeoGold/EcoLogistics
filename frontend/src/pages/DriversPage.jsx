import DriverForm from '../components/drivers/DriverForm'
import DriverTable from '../components/drivers/DriverTable'

export default function DriversPage() {
  return (
    <main className="container">
      <header className="page-heading">
        <div>
          <p className="section-kicker">GESTIÓN DE CONDUCTORES · SPRINT 2</p>
          <h1>Conductores</h1>
          <p>Registra al personal de conducción y consulta su licencia, experiencia, disponibilidad y estado operativo.</p>
        </div>
        <span className="status success-status">Módulo conectado a la API</span>
      </header>

      <section className="grid drivers-grid">
        <DriverForm />
        <DriverTable />
      </section>
    </main>
  )
}
