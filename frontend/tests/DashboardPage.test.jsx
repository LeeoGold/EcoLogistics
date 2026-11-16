import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/services/dashboardService', () => ({
  getDashboardSummary: vi.fn(),
}))

import { getDashboardSummary } from '../src/services/dashboardService'
import DashboardPage from '../src/pages/DashboardPage'

const summary = {
  vehiculos_disponibles: 4,
  vehiculos_total: 6,
  clientes_total: 12,
  pedidos_pendientes: 3,
  conductores_activos: 5,
  conductores_total: 6,
}

beforeEach(() => {
  getDashboardSummary.mockResolvedValue(summary)
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('DashboardPage por rol', () => {
  it('presenta el panel de administración y sus indicadores', async () => {
    render(<DashboardPage currentUser={{ nombre_usuario: 'admin', rol: 'ADMINISTRADOR' }} />)

    expect(screen.getByRole('heading', { name: 'Panel de administración' })).toBeTruthy()
    expect(await screen.findByText('4')).toBeTruthy()
    expect(screen.getByText(/Perfil:/)).toBeTruthy()
    expect(screen.getByText(/Las acciones de actualización y eliminación/)).toBeTruthy()
  })

  it('presenta el panel operativo y limita las responsabilidades del operador', async () => {
    render(<DashboardPage currentUser={{ nombre_usuario: 'operador', rol: 'OPERADOR' }} />)

    expect(screen.getByRole('heading', { name: 'Panel operativo' })).toBeTruthy()
    expect(await screen.findByText('3')).toBeTruthy()
    expect(screen.getByText(/No puedes modificar ni eliminar registros existentes/)).toBeTruthy()
  })
})
