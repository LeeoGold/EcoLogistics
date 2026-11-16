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

export async function getOrdersPage(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries({ page: 1, page_size: 12, ...params })) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value))
  }
  const response = await apiFetch(`/api/pedidos/pagina?${query.toString()}`)
  return parseResponse(response, 'No se pudo consultar la página solicitada.')
}
