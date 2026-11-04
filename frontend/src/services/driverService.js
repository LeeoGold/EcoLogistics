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

export async function getDriversPage(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries({ page: 1, page_size: 12, ...params })) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
  }
  const response = await apiFetch(`/api/conductores/pagina?${query.toString()}`)
  return parseResponse(response, 'No se pudo consultar la página solicitada.')
}
