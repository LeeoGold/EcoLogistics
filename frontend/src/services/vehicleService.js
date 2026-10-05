import { parseResponse } from './apiResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export async function getVehicles() {
  const response = await fetch(`${API_URL}/api/vehiculos`)
  return parseResponse(response, 'No se pudo consultar la flota.')
}

export async function createVehicle(vehicle) {
  const response = await fetch(`${API_URL}/api/vehiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicle),
  })

  return parseResponse(response, 'No se pudo registrar el vehículo.')
}
