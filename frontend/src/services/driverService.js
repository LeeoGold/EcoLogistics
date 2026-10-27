import { apiFetch } from './apiClient'
import { parseResponse } from './apiResponse'

export async function getDrivers() {
  const response = await apiFetch('/api/conductores')
  return parseResponse(response, 'No se pudieron consultar los conductores.')
}

export async function createDriver(driver) {
  const response = await apiFetch('/api/conductores', {
    method: 'POST',
    body: JSON.stringify(driver),
  })
  return parseResponse(response, 'No se pudo registrar el conductor.')
}