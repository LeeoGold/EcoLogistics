import { apiFetch, API_URL, TOKEN_STORAGE_KEY } from './apiClient'
import { parseResponse } from './apiResponse'

export async function login(nombreUsuario, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre_usuario: nombreUsuario,
      password,
    }),
  })

  const data = await parseResponse(
    response,
    'No se pudo iniciar sesión.'
  )

  if (!data.access_token || !data.user) {
    throw new Error('La respuesta de autenticación no es válida.')
  }

  sessionStorage.setItem(TOKEN_STORAGE_KEY, data.access_token)
  return data.user
}

export async function getCurrentUser() {
  const response = await apiFetch('/api/auth/me')
  return parseResponse(
    response,
    'No se pudo validar la sesión.'
  )
}

export function logout() {
  sessionStorage.removeItem(TOKEN_STORAGE_KEY)
}