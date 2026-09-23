const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function parseResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.detail || fallbackMessage)
  }
  return data
}

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
