import { parseResponse } from './apiResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function getOrders() {
  const response = await fetch(`${API_URL}/api/pedidos`)
  return parseResponse(response, 'No se pudieron consultar los pedidos.')
}

export async function createOrder(order) {
  const response = await fetch(`${API_URL}/api/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })

  return parseResponse(response, 'No se pudo registrar el pedido.')
}
