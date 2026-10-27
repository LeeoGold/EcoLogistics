export const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export const TOKEN_STORAGE_KEY = 'ecologistics_access_token'

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })
}