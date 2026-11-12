import { lazy, Suspense, useEffect, useState } from 'react'
import HomePage from '../pages/HomePage'
import '../styles/role-panels.css'
import LoginPage from '../pages/LoginPage'
import { ClientProvider } from '../state/ClientContext'
import { DriverProvider } from '../state/DriverContext'
import { OrderProvider } from '../state/OrderContext'
import { VehicleProvider } from '../state/VehicleContext'
import { getCurrentUser, logout } from '../services/authService'
import { TOKEN_STORAGE_KEY } from '../services/apiClient'

const ClientsPage = lazy(() => import('../pages/ClientsPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const DriversPage = lazy(() => import('../pages/DriversPage'))
const OrdersPage = lazy(() => import('../pages/OrdersPage'))
const RoutesPage = lazy(() => import('../pages/RoutesPage'))
const VehiclesPage = lazy(() => import('../pages/VehiclesPage'))

const sections = [
  { id: 'inicio', label: 'Inicio', short: 'Inicio' },
  { id: 'flota', label: 'Flota', short: 'Flota' },
  { id: 'clientes', label: 'Clientes', short: 'Clientes' },
  { id: 'conductores', label: 'Conductores', short: 'Conductores' },
  { id: 'pedidos', label: 'Pedidos', short: 'Pedidos' },
  { id: 'rutas', label: 'Rutas', short: 'Rutas' },
]

const SUPPORTED_ROLES = new Set(['ADMINISTRADOR', 'OPERADOR'])

function normalizeRole(role) {
  return String(role || '').trim().toUpperCase()
}

function getHashRoute() {
  return window.location.hash.replace(/^#\/?/, '').trim()
}

function getInitialSection() {
  const route = getHashRoute()
  return sections.some((section) => section.id === route) ? route : 'inicio'
}

function setHashRoute(route) {
  const nextHash = `#/${route}`
  if (window.location.hash !== nextHash) window.location.hash = nextHash
}

export default function AppRoutes() {
  const [activeSection, setActiveSection] = useState(getInitialSection)
  const [authStatus, setAuthStatus] = useState('checking')
  const [currentUser, setCurrentUser] = useState(null)
  const [authMessage, setAuthMessage] = useState('')
  const [publicView, setPublicView] = useState(() => (
    getHashRoute() === 'login' ? 'login' : 'home'
  ))

  useEffect(() => {
    let active = true

    async function restoreSession() {
      if (!sessionStorage.getItem(TOKEN_STORAGE_KEY)) {
        if (active) {
          setAuthStatus('anonymous')
          if (getHashRoute() !== 'login') {
            setPublicView('home')
            if (getHashRoute() !== 'home') setHashRoute('home')
          }
        }
        return
      }

      try {
        const user = await getCurrentUser()
        if (active) {
          setCurrentUser(user)
          setAuthStatus('authenticated')
          const route = getHashRoute()
          if (!sections.some((section) => section.id === route)) {
            setActiveSection('inicio')
            setHashRoute('inicio')
          } else {
            setActiveSection(route)
          }
        }
      } catch {
        logout()
        if (active) {
          setCurrentUser(null)
          setAuthMessage('La sesión expiró o ya no es válida. Inicia sesión nuevamente.')
          setAuthStatus('anonymous')
          setPublicView('home')
          setHashRoute('home')
        }
      }
    }

    void restoreSession()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    function handleHashChange() {
      const route = getHashRoute()
      if (route === 'login') {
        if (authStatus === 'authenticated') {
          setHashRoute('inicio')
        } else {
          setPublicView('login')
        }
        return
      }

      if (sections.some((section) => section.id === route)) {
        if (authStatus === 'authenticated') {
          setActiveSection(route)
        } else {
          setPublicView('home')
          setHashRoute('home')
        }
        return
      }

      setPublicView('home')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [authStatus])

  function handleLogin(user) {
    setCurrentUser(user)
    setAuthMessage('')
    setActiveSection('inicio')
    setAuthStatus('authenticated')
    setHashRoute('inicio')
  }

  function handleLogout() {
    logout()
    setCurrentUser(null)
    setAuthMessage('')
    setActiveSection('inicio')
    setAuthStatus('anonymous')
    setPublicView('home')
    setHashRoute('home')
  }

  function goToHome() {
    setPublicView('home')
    setHashRoute('home')
  }

  function goToLogin() {
    setPublicView('login')
    setHashRoute('login')
  }

  function navigate(sectionId) {
    setActiveSection(sectionId)
    setHashRoute(sectionId)
  }

  const normalizedRole = normalizeRole(currentUser?.rol)
  const isAdmin = normalizedRole === 'ADMINISTRADOR'
  const hasSupportedRole = SUPPORTED_ROLES.has(normalizedRole)

  if (authStatus === 'checking') {
    return (
      <main className="app-loading" role="status" aria-live="polite">
        <span className="app-loading__mark">E</span>
        <strong>EcoLogística Huancayo</strong>
        <span>Preparando tu espacio de trabajo…</span>
      </main>
    )
  }

  if (authStatus !== 'authenticated' || !currentUser) {
    if (publicView === 'login') {
      return <LoginPage onLogin={handleLogin} onBackHome={goToHome} message={authMessage} />
    }
    return <HomePage onLogin={goToLogin} message={authMessage} />
  }

  if (!hasSupportedRole) {
    return (
      <main className="container">
        <section className="card role-access-denied" role="alert">
          <p className="section-kicker">ACCESO RESTRINGIDO</p>
          <h1>Tu cuenta no tiene un perfil operativo habilitado.</h1>
          <p>Solicita al administrador que revise tu rol de acceso.</p>
          <button type="button" onClick={handleLogout}>Cerrar sesión</button>
        </section>
      </main>
    )
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

                <nav className="main-nav" aria-label={isAdmin ? 'Navegación administrativa' : 'Navegación operativa'}>
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

                <div className="app-user-menu">
                  <span className={`nav-status ${isAdmin ? 'nav-status--admin' : 'nav-status--operator'}`} title={isAdmin ? 'Permisos de administración' : 'Permisos de operador'}>
                    {currentUser.nombre_usuario} · {isAdmin ? 'ADMINISTRADOR' : 'OPERADOR'}
                  </span>
                  <button className="app-logout-button" type="button" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              </header>

              <div className="main-content">
                <Suspense fallback={<p className="app-module-loading" role="status" aria-live="polite">Cargando módulo…</p>}>
                  {activeSection === 'inicio' && <DashboardPage currentUser={currentUser} />}
                  {activeSection === 'flota' && <VehiclesPage />}
                  {activeSection === 'clientes' && <ClientsPage />}
                  {activeSection === 'conductores' && <DriversPage />}
                  {activeSection === 'pedidos' && <OrdersPage />}
                  {activeSection === 'rutas' && <RoutesPage />}
                </Suspense>
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
