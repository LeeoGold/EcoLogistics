import { parseResponse } from './apiResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function getDrivers() {
  const response = await fetch(`${API_URL}/api/conductores`)
  return parseResponse(response, 'No se pudieron consultar los conductores.')
}

export async function createDriver(driver) {
  const response = await fetch(`${API_URL}/api/conductores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(driver),
  })

  return parseResponse(response, 'No se pudo registrar el conductor.')
}
