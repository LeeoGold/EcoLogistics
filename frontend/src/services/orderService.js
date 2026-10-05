import { parseResponse } from './apiResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function getOrders() {
  const response = await fetch(`${API_URL}/api/pedidos`)
  return parseResponse(response, 'No se pudieron consultar los pedidos.')
}
