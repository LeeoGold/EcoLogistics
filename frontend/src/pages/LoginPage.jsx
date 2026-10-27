import { useEffect, useState } from 'react'
import { login } from '../services/authService'

export default function LoginPage({ onLogin, message = '' }) {
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

  const fieldStyle = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    marginTop: '6px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '16px',
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        boxSizing: 'border-box',
        background: '#f1f5f9',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '32px',
          boxSizing: 'border-box',
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>
          ECOLOGÍSTICA HUANCAYO
        </div>
        <h1 style={{ marginBottom: '8px', color: '#0f172a' }}>
          Iniciar sesión
        </h1>
        <p style={{ marginTop: 0, color: '#64748b' }}>
          Ingresa tus credenciales para acceder al centro de operaciones.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Nombre de usuario
          </label>
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
            style={fieldStyle}
          />

          <label htmlFor="password" style={{ display: 'block', marginTop: '18px' }}>
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={128}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={fieldStyle}
          />

          {error && (
            <p role="alert" style={{ color: '#b91c1c', marginTop: '16px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '24px',
              border: 0,
              borderRadius: '8px',
              background: loading ? '#64748b' : '#1d4ed8',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Validando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  )
}