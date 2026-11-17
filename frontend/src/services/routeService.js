import { apiFetch } from './apiClient'
import { parseResponse } from './apiResponse'

export async function getRoutes() {
  const response = await apiFetch('/api/rutas')
  return parseResponse(response, 'No se pudieron consultar las rutas.')
}

export async function createRoute(route) {
  const response = await apiFetch('/api/rutas', {
    method: 'POST',
    body: JSON.stringify(route),
  })
  return parseResponse(response, 'No se pudo planificar la ruta.')
}

export async function getRoutesPage(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries({ page: 1, page_size: 12, ...params })) {
    const normalizedValue = String(value ?? '')

    if (normalizedValue.length === 0) continue

    query.set(key, normalizedValue)
  }
  const response = await apiFetch(`/api/rutas/pagina?${query.toString()}`)
  return parseResponse(response, 'No se pudo consultar la página solicitada.')
}
