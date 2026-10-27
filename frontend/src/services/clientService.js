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