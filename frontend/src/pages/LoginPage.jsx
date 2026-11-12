import { useEffect, useState } from 'react'
import { login } from '../services/authService'
import './LoginPage.css'

export default function LoginPage({ onLogin, onBackHome, message = '' }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(message)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError(message)
  }, [message])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(username.trim(), password)
      onLogin(user)
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="public-login">
      <section className="public-login__story">
        <button className="public-login__back" type="button" onClick={onBackHome}>
          <span aria-hidden="true">←</span> Volver al inicio
        </button>
        <div className="public-login__story-content">
          <a className="public-login__brand" href="#/home" onClick={(event) => { event.preventDefault(); onBackHome() }}>
            <span className="public-login__brand-mark">E</span>
            <span><strong>EcoLogística</strong><small>HUANCAYO · OPERACIONES</small></span>
          </a>
          <span className="public-login__eyebrow">CENTRO DE OPERACIONES</span>
          <h1>Tu operación logística, en un solo lugar.</h1>
          <p>Accede a las herramientas de gestión de flota, clientes, conductores, pedidos y planificación de rutas.</p>
          <div className="public-login__story-points">
            <span><b>01</b> Información centralizada</span>
            <span><b>02</b> Acceso según el rol asignado</span>
            <span><b>03</b> Seguimiento de la operación</span>
          </div>
        </div>
        <div className="public-login__story-footer">EcoLogística Huancayo <span>React · FastAPI · PostgreSQL</span></div>
      </section>

      <section className="public-login__panel">
        <div className="public-login__form-wrap">
          <div className="public-login__mobile-brand">
            <span className="public-login__brand-mark">E</span>
            <strong>EcoLogística Huancayo</strong>
          </div>
          <div className="public-login__form-heading">
            <span className="public-login__eyebrow">ACCESO AL SISTEMA</span>
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para continuar.</p>
          </div>

          <form className="public-login__form" onSubmit={handleSubmit}>
            <label htmlFor="username">
              Nombre de usuario
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                minLength={3}
                maxLength={80}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </label>

            <label htmlFor="password">
              Contraseña
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </label>

            {error && <p className="public-login__error" role="alert">{error}</p>}

            <button className="public-login__submit" type="submit" disabled={loading}>
              {loading ? 'Validando acceso…' : 'Ingresar al sistema'}
              <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="public-login__security-note">
            El acceso y las funcionalidades disponibles dependen del rol asignado a tu cuenta.
          </p>
        </div>
      </section>
    </main>
  )
}
