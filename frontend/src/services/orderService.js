const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function parseResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.detail || fallbackMessage)
  }

  return data
}

export async function getOrders() {
  const response = await fetch(`${API_URL}/api/pedidos`)
  return parseResponse(response, 'No se pudieron consultar los pedidos.')
}
