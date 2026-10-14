import { parseResponse } from './apiResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function getRoutes() {
  const response = await fetch(`${API_URL}/api/rutas`)
  return parseResponse(response, 'No se pudieron consultar las rutas.')
}

export async function createRoute(route) {
  const response = await fetch(`${API_URL}/api/rutas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(route),
  })
  return parseResponse(response, 'No se pudo planificar la ruta.')
}
