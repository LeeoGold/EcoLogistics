import { useEffect, useState } from 'react'
import ClientsPage from '../pages/ClientsPage'
import DashboardPage from '../pages/DashboardPage'
import OrdersPage from '../pages/OrdersPage'
import VehiclesPage from '../pages/VehiclesPage'

const sections = [
  { id: 'inicio', label: 'Inicio', short: 'Inicio' },
  { id: 'flota', label: 'Flota', short: 'Flota' },
  { id: 'clientes', label: 'Clientes', short: 'Clientes' },
  { id: 'pedidos', label: 'Pedidos', short: 'Pedidos' },
]

function getInitialSection() {
  const hash = window.location.hash.replace('#/', '')
  return sections.some((section) => section.id === hash) ? hash : 'inicio'
}

export default function AppRoutes() {
  const [activeSection, setActiveSection] = useState(getInitialSection)

  useEffect(() => {
    function handleHashChange() {
      setActiveSection(getInitialSection())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function navigate(sectionId) {
    if (window.location.hash !== `#/${sectionId}`) {
      window.location.hash = `/${sectionId}`
    }
    setActiveSection(sectionId)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-icon">E</div>
          <div>
            <strong>EcoLogística Huancayo</strong>
            <span>Centro de operaciones</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navegación principal">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              type="button"
              aria-current={activeSection === section.id ? 'page' : undefined}
              onClick={() => navigate(section.id)}
            >
              {section.short}
            </button>
          ))}
        </nav>

        <span className="nav-status">MVP funcional</span>
      </header>

      <div className="main-content">
        {activeSection === 'inicio' && <DashboardPage />}
        {activeSection === 'flota' && <VehiclesPage />}
        {activeSection === 'clientes' && <ClientsPage />}
        {activeSection === 'pedidos' && <OrdersPage />}
      </div>

      <footer className="app-footer">
        <span>EcoLogística Huancayo</span>
        <span>React · FastAPI · PostgreSQL</span>
      </footer>
    </div>
  )
}
