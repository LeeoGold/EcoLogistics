import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/services/apiClient', () => ({
  API_URL: 'http://api.test',
  TOKEN_STORAGE_KEY: 'ecologistics_access_token',
  apiFetch: vi.fn(),
}))

import { apiFetch } from '../src/services/apiClient'
import {
  getCurrentUser,
  login,
  logout,
} from '../src/services/authService'

let fetchMock

function jsonResponse(data, ok = true) {
  return {
    ok,
    json: vi.fn().mockResolvedValue(data),
  }
}

beforeEach(() => {
  sessionStorage.clear()
  apiFetch.mockReset()
  fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
  sessionStorage.clear()
})

describe('authService', () => {
  it('inicia sesión y guarda el token recibido', async () => {
    const result = {
      access_token: 'token-valido',
      user: {
        nombre_usuario: 'admin',
        rol: 'ADMINISTRADOR',
      },
    }
    fetchMock.mockResolvedValue(jsonResponse(result))

    const user = await login('admin', 'contraseña-prueba')

    expect(user.nombre_usuario).toBe('admin')
    expect(sessionStorage.getItem('ecologistics_access_token')).toBe('token-valido')
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      nombre_usuario: 'admin',
      password: 'contraseña-prueba',
    })
  })

  it('rechaza credenciales inválidas', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ detail: 'Credenciales incorrectas' }, false),
    )

    await expect(login('admin', 'incorrecta')).rejects.toThrow(
      'Credenciales incorrectas',
    )
    expect(sessionStorage.getItem('ecologistics_access_token')).toBeNull()
  })

  it('rechaza una respuesta de login sin token ni usuario', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ user: {} }))

    await expect(login('admin', 'cualquiera')).rejects.toThrow(
      'La respuesta de autenticación no es válida.',
    )
  })

  it('obtiene el usuario de la sesión actual', async () => {
    const user = {
      usuario_id: '123',
      nombre_usuario: 'admin',
      rol: 'ADMINISTRADOR',
    }
    apiFetch.mockResolvedValue(jsonResponse(user))

    await expect(getCurrentUser()).resolves.toEqual(user)
    expect(apiFetch).toHaveBeenCalledWith('/api/auth/me')
  })

  it('elimina el token al cerrar sesión', () => {
    sessionStorage.setItem('ecologistics_access_token', 'token-valido')

    logout()

    expect(sessionStorage.getItem('ecologistics_access_token')).toBeNull()
  })
})