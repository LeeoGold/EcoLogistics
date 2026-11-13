import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  apiFetch: vi.fn(),
  parseResponse: vi.fn(),
}))

vi.mock('../src/services/apiClient', () => ({
  apiFetch: mocks.apiFetch,
}))

vi.mock('../src/services/apiResponse', () => ({
  parseResponse: mocks.parseResponse,
}))

import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  getVehiclesPage,
  updateVehicle,
} from '../src/services/vehicleService'

const response = { ok: true }

beforeEach(() => {
  vi.clearAllMocks()
  mocks.apiFetch.mockResolvedValue(response)
  mocks.parseResponse.mockResolvedValue({ success: true })
})

describe('vehicleService', () => {
  it('consulta el listado de vehículos', async () => {
    await expect(getVehicles()).resolves.toEqual({ success: true })

    expect(mocks.apiFetch).toHaveBeenCalledWith('/api/vehiculos')
    expect(mocks.parseResponse).toHaveBeenCalledWith(
      response,
      'No se pudo consultar la flota.',
    )
  })

  it('registra un vehículo enviando JSON', async () => {
    const vehicle = { placa: 'HYO-001', capacidad_kg: 1200 }

    await createVehicle(vehicle)

    expect(mocks.apiFetch).toHaveBeenCalledWith('/api/vehiculos', {
      method: 'POST',
      body: JSON.stringify(vehicle),
    })
    expect(mocks.parseResponse).toHaveBeenCalledWith(
      response,
      'No se pudo registrar el vehículo.',
    )
  })

  it('actualiza un vehículo mediante PUT', async () => {
    const vehicle = { placa: 'HYO-001', capacidad_kg: 1500 }

    await updateVehicle('vehicle-001', vehicle)

    expect(mocks.apiFetch).toHaveBeenCalledWith('/api/vehiculos/vehicle-001', {
      method: 'PUT',
      body: JSON.stringify(vehicle),
    })
    expect(mocks.parseResponse).toHaveBeenCalledWith(
      response,
      'No se pudo actualizar el vehículo.',
    )
  })

  it('elimina un vehículo mediante DELETE', async () => {
    await deleteVehicle('vehicle-001')

    expect(mocks.apiFetch).toHaveBeenCalledWith('/api/vehiculos/vehicle-001', {
      method: 'DELETE',
    })
    expect(mocks.parseResponse).toHaveBeenCalledWith(
      response,
      'No se pudo eliminar el vehículo.',
    )
  })

  it('consulta una página con parámetros predeterminados', async () => {
    await getVehiclesPage()

    expect(mocks.apiFetch).toHaveBeenCalledWith(
      '/api/vehiculos/pagina?page=1&page_size=12',
    )
    expect(mocks.parseResponse).toHaveBeenCalledWith(
      response,
      'No se pudo consultar la página solicitada.',
    )
  })

  it('incluye filtros y omite valores vacíos o nulos', async () => {
    await getVehiclesPage({
      page: 2,
      page_size: 5,
      q: 'HYO',
      estado: 'DISPONIBLE',
      empty: '',
      absent: null,
    })

    expect(mocks.apiFetch).toHaveBeenCalledWith(
      '/api/vehiculos/pagina?page=2&page_size=5&q=HYO&estado=DISPONIBLE',
    )
  })
})
