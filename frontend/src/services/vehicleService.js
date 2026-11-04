import { apiFetch } from './apiClient'
import { parseResponse } from './apiResponse'

export async function getVehicles() {
  const response = await apiFetch('/api/vehiculos')
  return parseResponse(response, 'No se pudo consultar la flota.')
}

export async function createVehicle(vehicle) {
  const response = await apiFetch('/api/vehiculos', {
    method: 'POST',
    body: JSON.stringify(vehicle),
  })
  return parseResponse(response, 'No se pudo registrar el vehículo.')
}

export async function getVehiclesPage(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries({ page: 1, page_size: 12, ...params })) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
  }
  const response = await apiFetch(`/api/vehiculos/pagina?${query.toString()}`)
  return parseResponse(response, 'No se pudo consultar la página solicitada.')
}
