import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../src/components/vehicles/VehicleForm', () => ({
  default: () => <div>Registro de vehículos</div>,
}))

vi.mock('../src/components/vehicles/VehicleTable', () => ({
  default: ({ isAdmin }) => <div>{isAdmin ? 'Acciones administrativas' : 'Consulta operativa'}</div>,
}))

import VehiclesPage from '../src/pages/VehiclesPage'

describe('VehiclesPage por rol', () => {
  it('habilita administración para el rol ADMINISTRADOR', () => {
    render(<VehiclesPage currentUser={{ rol: 'ADMINISTRADOR' }} />)

    expect(screen.getByText('Administración habilitada')).toBeTruthy()
    expect(screen.getByText('Acciones administrativas')).toBeTruthy()
  })

  it('mantiene la consulta operativa para el rol OPERADOR', () => {
    render(<VehiclesPage currentUser={{ rol: 'OPERADOR' }} />)

    expect(screen.getByText('Consulta y registro')).toBeTruthy()
    expect(screen.getByText('Consulta operativa')).toBeTruthy()
  })
})
