import './HomePage.css'

const modules = [
  {
    number: '01',
    title: 'Gestión de flota',
    description: 'Consulta vehículos, disponibilidad y datos operativos desde un solo lugar.',
    tag: 'Vehículos',
  },
  {
    number: '02',
    title: 'Clientes y entregas',
    description: 'Organiza la información de clientes y sus puntos de entrega.',
    tag: 'Clientes',
  },
  {
    number: '03',
    title: 'Pedidos',
    description: 'Registra solicitudes y revisa su estado y prioridad.',
    tag: 'Pedidos',
  },
  {
    number: '04',
    title: 'Conductores',
    description: 'Mantén visible la disponibilidad y los datos del personal conductor.',
    tag: 'Conductores',
  },
  {
    number: '05',
    title: 'Planificación de rutas',
    description: 'Asigna pedidos a conductores y vehículos considerando capacidad y horario.',
    tag: 'Rutas',
  },
  {
    number: '06',
    title: 'Indicadores operativos',
    description: 'Consulta un resumen de la actividad para apoyar el seguimiento diario.',
    tag: 'Dashboard',
  },
]

export default function HomePage({ onLogin, message = '' }) {
  return (
    <main className="public-home">
      <header className="public-home__header">
        <a className="public-home__brand" href="#home" aria-label="EcoLogística Huancayo, inicio">
          <span className="public-home__brand-mark">E</span>
          <span className="public-home__brand-copy">
            <strong>EcoLogística</strong>
            <small>HUANCAYO · OPERACIONES</small>
          </span>
        </a>

        <nav className="public-home__nav" aria-label="Navegación pública">
          <a href="#modulos">Módulos</a>
          <a href="#sostenibilidad">Enfoque sostenible</a>
          <a href="#nosotros">Proyecto</a>
        </nav>

        <button className="public-home__header-cta" type="button" onClick={onLogin}>
          Iniciar sesión <span aria-hidden="true">↗</span>
        </button>
      </header>

      {message && (
        <div className="public-home__session-alert" role="alert" aria-live="polite">
          {message}
        </div>
      )}

      <section className="public-home__hero" id="home">
        <div className="public-home__hero-copy">
          <span className="public-home__eyebrow">
            <span className="public-home__eyebrow-dot" /> PLATAFORMA DE GESTIÓN LOGÍSTICA
          </span>
          <h1>Una operación más clara, <em>de principio a fin.</em></h1>
          <p className="public-home__hero-description">
            Centraliza clientes, pedidos, conductores y vehículos. Organiza la operación
            logística y planifica asignaciones desde una plataforma diseñada para
            EcoLogística Huancayo.
          </p>
          <div className="public-home__hero-actions">
            <button className="public-home__primary-button" type="button" onClick={onLogin}>
              Acceder a la plataforma <span aria-hidden="true">→</span>
            </button>
            <a className="public-home__text-link" href="#modulos">Explorar funcionalidades</a>
          </div>
          <div className="public-home__hero-note">
            <span className="public-home__note-symbol" aria-hidden="true">✓</span>
            Gestión centralizada · Acceso según permisos · Información organizada
          </div>
        </div>

        <div className="public-home__visual" aria-label="Vista ilustrativa del panel logístico">
          <div className="public-home__visual-glow" />
          <div className="public-home__visual-card">
            <div className="public-home__visual-top">
              <div>
                <span className="public-home__visual-overline">VISTA GENERAL</span>
                <strong>Centro de operaciones</strong>
              </div>
              <span className="public-home__live-indicator"><i /> Plataforma</span>
            </div>
            <div className="public-home__visual-metrics">
              <div className="public-home__visual-metric">
                <span>Flota</span><strong>Control</strong><small>Vehículos y disponibilidad</small>
              </div>
              <div className="public-home__visual-metric">
                <span>Pedidos</span><strong>Seguimiento</strong><small>Estados y prioridades</small>
              </div>
            </div>
            <div className="public-home__route-panel">
              <div className="public-home__route-heading">
                <span>PLANIFICACIÓN</span><span>ASIGNACIÓN MANUAL</span>
              </div>
              <div className="public-home__route-map" aria-hidden="true">
                <div className="public-home__route-grid" />
                <svg viewBox="0 0 440 174" role="presentation">
                  <path className="public-home__route-line-bg" d="M54 128 C100 128 90 48 164 54 S226 142 280 104 S346 34 388 46" />
                  <path className="public-home__route-line" d="M54 128 C100 128 90 48 164 54 S226 142 280 104 S346 34 388 46" />
                  <circle cx="54" cy="128" r="8" />
                  <circle cx="164" cy="54" r="8" />
                  <circle cx="280" cy="104" r="8" />
                  <circle cx="388" cy="46" r="8" />
                </svg>
                <span className="public-home__route-label public-home__route-label--start">Origen</span>
                <span className="public-home__route-label public-home__route-label--end">Entrega</span>
              </div>
              <div className="public-home__route-footer">
                <span><b /> Conductor asignado</span>
                <span><b /> Vehículo disponible</span>
              </div>
            </div>
            <div className="public-home__visual-bottom">
              <span>EcoLogística Huancayo</span>
              <span>React · FastAPI · PostgreSQL</span>
            </div>
          </div>
          <div className="public-home__floating-label"><span>↗</span> Organización operativa</div>
        </div>
      </section>

      <section className="public-home__trust-strip" aria-label="Características de la plataforma">
        <div><strong>06</strong><span>módulos operativos</span></div>
        <div><strong>01</strong><span>plataforma centralizada</span></div>
        <div><strong>Por roles</strong><span>acceso controlado</span></div>
        <div><strong>Green IT</strong><span>optimización de recursos</span></div>
      </section>

      <section className="public-home__modules" id="modulos">
        <div className="public-home__section-heading">
          <div>
            <span className="public-home__eyebrow">HERRAMIENTAS DE TRABAJO</span>
            <h2>Todo lo necesario para organizar la operación.</h2>
          </div>
          <p>Los módulos trabajan de forma integrada para mantener la información operativa ordenada y facilitar la planificación.</p>
        </div>
        <div className="public-home__module-grid">
          {modules.map((module) => (
            <article className="public-home__module-card" key={module.number}>
              <div className="public-home__module-card-top">
                <span>{module.number}</span>
                <span className="public-home__module-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <span className="public-home__module-tag">{module.tag}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="public-home__sustainability" id="sostenibilidad">
        <div className="public-home__sustainability-mark" aria-hidden="true">↗</div>
        <div>
          <span className="public-home__eyebrow">TECNOLOGÍA CON USO RESPONSABLE DE RECURSOS</span>
          <h2>Una plataforma pensada para trabajar de forma más eficiente.</h2>
          <p>
            EcoLogistics incorpora paginación, carga diferida de módulos, consultas optimizadas,
            validación de caché HTTP y compresión GZip. Estas mejoras buscan reducir trabajo
            innecesario y transferencia de datos en las operaciones compatibles.
          </p>
        </div>
        <a href="https://github.com/LeeoGold/EcoLogistics/tree/main/docs/03%20Implementaci%C3%B3n/reduccion%20del%20impacto%20ambiental" target="_blank" rel="noreferrer">
          Ver documentación Green IT <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="public-home__about" id="nosotros">
        <div>
          <span className="public-home__eyebrow">SOBRE EL PROYECTO</span>
          <h2>EcoLogística Huancayo</h2>
        </div>
        <p>
          Proyecto académico orientado a centralizar la gestión de clientes, pedidos, conductores,
          vehículos y planificación manual de rutas de última milla. La plataforma utiliza React,
          FastAPI, SQLAlchemy y PostgreSQL.
        </p>
      </section>

      <footer className="public-home__footer">
        <a className="public-home__brand" href="#home" aria-label="Volver al inicio">
          <span className="public-home__brand-mark">E</span>
          <span className="public-home__brand-copy"><strong>EcoLogística</strong><small>HUANCAYO</small></span>
        </a>
        <span>Gestión logística · Planificación operativa</span>
        <span>© {new Date().getFullYear()} EcoLogística Huancayo</span>
      </footer>
    </main>
  )
}
