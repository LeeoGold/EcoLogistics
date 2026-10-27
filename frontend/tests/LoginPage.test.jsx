import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/services/authService', () => ({
  login: vi.fn(),
}))

import { login } from '../src/services/authService'
import LoginPage from '../src/pages/LoginPage'

const user = {
  usuario_id: '123',
  nombre_usuario: 'admin',
  rol: 'ADMINISTRADOR',
  estado: 'ACTIVO',
}

beforeEach(() => {
  login.mockReset()
})

afterEach(() => {
  cleanup()
})

describe('LoginPage', () => {
  it('envía las credenciales y comunica el usuario autenticado', async () => {
    login.mockResolvedValue(user)
    const onLogin = vi.fn()

    render(<LoginPage onLogin={onLogin} />)

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: ' admin ' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'contraseña-prueba' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('admin', 'contraseña-prueba')
      expect(onLogin).toHaveBeenCalledWith(user)
    })
  })

  it('muestra el error cuando las credenciales son rechazadas', async () => {
    login.mockRejectedValue(new Error('Credenciales incorrectas'))
    render(<LoginPage onLogin={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'incorrecta' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('Credenciales incorrectas')
  })

  it('muestra el mensaje recibido al restaurar una sesión expirada', async () => {
    render(
      <LoginPage
        onLogin={vi.fn()}
        message="La sesión expiró. Inicia sesión nuevamente."
      />,
    )

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('La sesión expiró')
  })
})