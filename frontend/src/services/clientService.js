import { apiFetch } from './apiClient'
import { parseResponse } from './apiResponse'

export async function getClients() {
  const response = await apiFetch('/api/clientes')
  return parseResponse(response, 'No se pudieron consultar los clientes.')
}

export async function createClient(client) {
  const response = await apiFetch('/api/clientes', {
    method: 'POST',
    body: JSON.stringify(client),
  })
  return parseResponse(response, 'No se pudo registrar el cliente.')
}

export async function getClientsPage(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries({ page: 1, page_size: 12, ...params })) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
  }
  const response = await apiFetch(`/api/clientes/pagina?${query.toString()}`)
  return parseResponse(response, 'No se pudo consultar la página solicitada.')
}
