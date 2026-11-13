import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  getVehiclesPage: vi.fn(),
  updateVehicle: vi.fn(),
  deleteVehicle: vi.fn(),
  vehicleContext: {
    vehicles: [],
    searchTerm: '',
    statusFilter: '',
    setSearchTerm: vi.fn(),
    setStatusFilter: vi.fn(),
    clearFilters: vi.fn(),
  },
}))

vi.mock('../src/services/vehicleService', () => ({
  getVehiclesPage: mocks.getVehiclesPage,
  updateVehicle: mocks.updateVehicle,
  deleteVehicle: mocks.deleteVehicle,
}))

vi.mock('../src/state/VehicleContext', () => ({
  useVehicles: () => mocks.vehicleContext,
}))

import VehicleTable from '../src/components/vehicles/VehicleTable'

const sampleVehicle = {
  vehiculo_id: 'vehicle-001',
  placa: 'HYO-123',
  tipo: 'CAMIONETA',
  capacidad_kg: '1000.00',
  consumo_km_gal: '10.000',
  factor_co2_kg_km: '0.2500',
  anio_fabricacion: 2024,
  estado: 'DISPONIBLE',
}

function pagedVehicleResult(items = [sampleVehicle]) {
  return {
    items,
    total: items.length,
    page: 1,
    page_size: 12,
    total_pages: items.length ? 1 : 0,
  }
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.vehicleContext.vehicles = []
  mocks.vehicleContext.searchTerm = ''
  mocks.vehicleContext.statusFilter = ''
  mocks.getVehiclesPage.mockResolvedValue(pagedVehicleResult())
  mocks.updateVehicle.mockResolvedValue({ ...sampleVehicle, capacidad_kg: 1500 })
  mocks.deleteVehicle.mockResolvedValue({})
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('VehicleTable por rol', () => {
  it('muestra acciones de edición y eliminación al administrador', async () => {
    render(<VehicleTable isAdmin />)

    expect(await screen.findByText('HYO-123')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Editar vehículo HYO-123' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Eliminar vehículo HYO-123' })).toBeTruthy()
  })

  it('no muestra acciones de edición ni eliminación al operador', async () => {
    render(<VehicleTable isAdmin={false} />)

    expect(await screen.findByText('HYO-123')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Editar vehículo HYO-123' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Eliminar vehículo HYO-123' })).toBeNull()
  })

  it('permite al administrador editar y actualizar un vehículo', async () => {
    render(<VehicleTable isAdmin />)

    fireEvent.click(await screen.findByRole('button', { name: 'Editar vehículo HYO-123' }))
    fireEvent.change(screen.getByLabelText('Capacidad (kg)'), { target: { value: '1500' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    await waitFor(() => {
      expect(mocks.updateVehicle).toHaveBeenCalledWith('vehicle-001', expect.objectContaining({
        placa: 'HYO-123',
        capacidad_kg: 1500,
        consumo_km_gal: 10,
        factor_co2_kg_km: 0.25,
        anio_fabricacion: 2024,
        estado: 'DISPONIBLE',
      }))
    })
    expect(await screen.findByText('Vehículo actualizado correctamente.')).toBeTruthy()
  })

  it('pide confirmación antes de eliminar un vehículo', async () => {
    render(<VehicleTable isAdmin />)

    fireEvent.click(await screen.findByRole('button', { name: 'Eliminar vehículo HYO-123' }))

    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('HYO-123'))
    await waitFor(() => expect(mocks.deleteVehicle).toHaveBeenCalledWith('vehicle-001'))
    expect(await screen.findByText('Vehículo HYO-123 eliminado correctamente.')).toBeTruthy()
  })

  it('no elimina el vehículo cuando el administrador cancela la confirmación', async () => {
    window.confirm.mockReturnValue(false)
    render(<VehicleTable isAdmin />)

    fireEvent.click(await screen.findByRole('button', { name: 'Eliminar vehículo HYO-123' }))

    expect(mocks.deleteVehicle).not.toHaveBeenCalled()
  })
})
