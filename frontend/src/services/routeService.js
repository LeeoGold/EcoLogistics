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