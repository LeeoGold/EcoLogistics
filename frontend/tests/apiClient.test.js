import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiFetch } from '../src/services/apiClient'

let fetchMock

beforeEach(() => {
  sessionStorage.clear()
  fetchMock = vi.fn().mockResolvedValue({ ok: true })
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
  sessionStorage.clear()
})

describe('apiFetch', () => {
  it('envía el token Bearer de la sesión', async () => {
    sessionStorage.setItem('ecologistics_access_token', 'token-prueba')

    await apiFetch('/api/clientes')

    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toContain('/api/clientes')
    expect(options.headers.get('Authorization')).toBe('Bearer token-prueba')
  })

  it('establece Content-Type JSON cuando hay un cuerpo', async () => {
    await apiFetch('/api/clientes', {
      method: 'POST',
      body: JSON.stringify({ nombre: 'Cliente prueba' }),
    })

    const options = fetchMock.mock.calls[0][1]
    expect(options.headers.get('Content-Type')).toBe('application/json')
    expect(options.method).toBe('POST')
  })

  it('no inventa un token cuando no hay sesión', async () => {
    await apiFetch('/api/clientes')

    const options = fetchMock.mock.calls[0][1]
    expect(options.headers.get('Authorization')).toBeNull()
  })
})