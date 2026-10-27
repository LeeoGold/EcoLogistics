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