import { apiFetch } from './apiClient'
import { parseResponse } from './apiResponse'

export async function getDashboardSummary() {
  const response = await apiFetch('/api/dashboard/resumen')
  return parseResponse(response, 'No se pudo consultar el resumen operativo.')
}
