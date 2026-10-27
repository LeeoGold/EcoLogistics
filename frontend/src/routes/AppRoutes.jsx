import { useEffect, useState } from 'react'
import ClientsPage from '../pages/ClientsPage'
import DashboardPage from '../pages/DashboardPage'
import DriversPage from '../pages/DriversPage'
import LoginPage from '../pages/LoginPage'
import OrdersPage from '../pages/OrdersPage'
import RoutesPage from '../pages/RoutesPage'
import VehiclesPage from '../pages/VehiclesPage'
import { ClientProvider } from '../state/ClientContext'
import { DriverProvider } from '../state/DriverContext'
import { OrderProvider } from '../state/OrderContext'
import { VehicleProvider } from '../state/VehicleContext'
import { getCurrentUser, logout } from '../services/authService'
import { TOKEN_STORAGE_KEY } from '../services/apiClient'

const sections = [
  { id: 'inicio', label: 'Inicio', short: 'Inicio' },
  { id: 'flota', label: 'Flota', short: 'Flota' },
  { id: 'clientes', label: 'Clientes', short: 'Clientes' },
  { id: 'conductores', label: 'Conductores', short: 'Conductores' },
  { id: 'pedidos', label: 'Pedidos', short: 'Pedidos' },
  { id: 'rutas', label: 'Rutas', short: 'Rutas' },
]

function getInitialSection() {
  const hash = window.location.hash.replace('#/', '')
  return sections.some((section) => section.id === hash) ? hash : 'inicio'
}

export default function AppRoutes() {
  const [activeSection, setActiveSection] = useState(getInitialSection)
  const [authStatus, setAuthStatus] = useState('checking')
  const [currentUser, setCurrentUser] = useState(null)
  const [authMessage, setAuthMessage] = useState('')

  useEffect(() => {
    let active = true

    async function restoreSession() {
      if (!sessionStorage.getItem(TOKEN_STORAGE_KEY)) {
        if (active) setAuthStatus('anonymous')
        return
      }

      try {
        const user = await getCurrentUser()
        if (active) {
          setCurrentUser(user)
          setAuthStatus('authenticated')
        }
      } catch {
        logout()
        if (active) {
          setCurrentUser(null)
          setAuthMessage('La sesión expiró o ya no es válida. Inicia sesión nuevamente.')
          setAuthStatus('anonymous')
        }
      }
    }

    restoreSession()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    function handleHashChange() {
      setActiveSection(getInitialSection())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function handleLogin(user) {
    setCurrentUser(user)
    setAuthMessage('')
    setActiveSection(getInitialSection())
    setAuthStatus('authenticated')
  }

  function handleLogout() {
    logout()
    setCurrentUser(null)
    setAuthMessage('')
    setAuthStatus('anonymous')
  }

  function navigate(sectionId) {
    if (window.location.hash !== `#/${sectionId}`) {
      window.location.hash = `/${sectionId}`
    }
    setActiveSection(sectionId)
  }

  if (authStatus === 'checking') {
    return (
      <main style={{ padding: '32px', fontFamily: 'system-ui, sans-serif' }}>
        Verificando sesión...
      </main>
    )
  }

  if (authStatus !== 'authenticated' || !currentUser) {
    return <LoginPage onLogin={handleLogin} message={authMessage} />
  }

  return (
    <VehicleProvider>
      <ClientProvider>
        <DriverProvider>
          <OrderProvider>
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="nav-status">
                    {currentUser.nombre_usuario} · {currentUser.rol}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      padding: '8px 10px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </header>

              <div className="main-content">
                {activeSection === 'inicio' && <DashboardPage />}
                {activeSection === 'flota' && <VehiclesPage />}
                {activeSection === 'clientes' && <ClientsPage />}
                {activeSection === 'conductores' && <DriversPage />}
                {activeSection === 'pedidos' && <OrdersPage />}
                {activeSection === 'rutas' && <RoutesPage />}
              </div>

              <footer className="app-footer">
                <span>EcoLogística Huancayo</span>
                <span>React · FastAPI · PostgreSQL</span>
              </footer>
            </div>
          </OrderProvider>
        </DriverProvider>
      </ClientProvider>
    </VehicleProvider>
  )
}