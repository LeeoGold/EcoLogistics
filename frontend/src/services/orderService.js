import { apiFetch } from './apiClient'
import { parseResponse } from './apiResponse'

export async function getOrders() {
  const response = await apiFetch('/api/pedidos')
  return parseResponse(response, 'No se pudieron consultar los pedidos.')
}

export async function createOrder(order) {
  const response = await apiFetch('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(order),
  })
  return parseResponse(response, 'No se pudo registrar el pedido.')
}