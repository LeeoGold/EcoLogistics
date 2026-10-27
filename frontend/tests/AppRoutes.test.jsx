import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/services/authService', () => ({
  login: vi.fn(),
  getCurrentUser: vi.fn(),
  logout: vi.fn(),
}))

vi.mock('../src/services/apiClient', () => ({
  TOKEN_STORAGE_KEY: 'ecologistics_access_token',
}))

vi.mock('../src/state/ClientContext', () => ({
  ClientProvider: ({ children }) => children,
}))
vi.mock('../src/state/DriverContext', () => ({
  DriverProvider: ({ children }) => children,
}))
vi.mock('../src/state/OrderContext', () => ({
  OrderProvider: ({ children }) => children,
}))
vi.mock('../src/state/VehicleContext', () => ({
  VehicleProvider: ({ children }) => children,
}))

vi.mock('../src/pages/DashboardPage', () => ({
  default: () => 'InicioMock',
}))
vi.mock('../src/pages/ClientsPage', () => ({
  default: () => 'ClientesMock',
}))
vi.mock('../src/pages/DriversPage', () => ({
  default: () => 'ConductoresMock',
}))
vi.mock('../src/pages/OrdersPage', () => ({
  default: () => 'PedidosMock',
}))
vi.mock('../src/pages/RoutesPage', () => ({
  default: () => 'RutasMock',
}))
vi.mock('../src/pages/VehiclesPage', () => ({
  default: () => 'FlotaMock',
}))

import {
  getCurrentUser,
  login,
  logout,
} from '../src/services/authService'
import AppRoutes from '../src/routes/AppRoutes'

const admin = {
  usuario_id: '123',
  nombre_usuario: 'admin',
  rol: 'ADMINISTRADOR',
  estado: 'ACTIVO',
}

beforeEach(() => {
  sessionStorage.clear()
  window.history.replaceState({}, '', '/')
  vi.clearAllMocks()
  login.mockResolvedValue(admin)
  getCurrentUser.mockResolvedValue(admin)
  logout.mockImplementation(() => {
    sessionStorage.removeItem('ecologistics_access_token')
  })
})

afterEach(() => {
  cleanup()
  sessionStorage.clear()
  window.history.replaceState({}, '', '/')
})

describe('AppRoutes', () => {
  it('muestra el login sin sesión y permite ingresar', async () => {
    render(<AppRoutes />)

    expect(await screen.findByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy()
    expect(getCurrentUser).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('Nombre de usuario'), {
      target: { value: 'admin' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'contraseña-prueba' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(await screen.findByText(/admin\s*·\s*ADMINISTRADOR/)).toBeTruthy()
    expect(screen.getByText('InicioMock')).toBeTruthy()
  })

  it('restaura sesión, navega por las secciones y permite salir', async () => {
    sessionStorage.setItem('ecologistics_access_token', 'token-valido')
    render(<AppRoutes />)

    expect(await screen.findByText(/admin\s*·\s*ADMINISTRADOR/)).toBeTruthy()

    const sections = [
      ['Flota', 'FlotaMock'],
      ['Clientes', 'ClientesMock'],
      ['Conductores', 'ConductoresMock'],
      ['Pedidos', 'PedidosMock'],
      ['Rutas', 'RutasMock'],
      ['Inicio', 'InicioMock'],
    ]

    for (const [label, content] of sections) {
      fireEvent.click(screen.getByRole('button', { name: label }))
      await waitFor(() => expect(screen.getByText(content)).toBeTruthy())
    }

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))

    expect(await screen.findByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy()
    expect(logout).toHaveBeenCalled()
  })

  it('rechaza una sesión inválida y regresa al login', async () => {
    sessionStorage.setItem('ecologistics_access_token', 'token-invalido')
    getCurrentUser.mockRejectedValue(new Error('No autorizado'))

    render(<AppRoutes />)

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('La sesión expiró')
    expect(logout).toHaveBeenCalled()
  })
})