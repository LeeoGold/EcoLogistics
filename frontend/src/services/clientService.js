import { parseResponse } from './apiResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function getClients() {
  const response = await fetch(`${API_URL}/api/clientes`)
  return parseResponse(response, 'No se pudieron consultar los clientes.')
}

export async function createClient(client) {
  const response = await fetch(`${API_URL}/api/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  })

  return parseResponse(response, 'No se pudo registrar el cliente.')
}
