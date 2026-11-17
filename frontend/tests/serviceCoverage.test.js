import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  apiFetch: vi.fn(),
  parseResponse: vi.fn(),
}))

vi.mock('../src/services/apiClient', () => ({
  apiFetch: mocks.apiFetch,
}))

vi.mock('../src/services/apiResponse', () => ({
  parseResponse: mocks.parseResponse,
}))

import { getClients, createClient } from '../src/services/clientService'
import { getDrivers, createDriver } from '../src/services/driverService'
import { getOrders, createOrder } from '../src/services/orderService'
import { getRoutes, createRoute } from '../src/services/routeService'

const response = { ok: true }
const result = { success: true }

const services = [
  {
    name: 'clientes',
    getAll: getClients,
    create: createClient,
    endpoint: '/api/clientes',
    getMessage: 'No se pudieron consultar los clientes.',
    createMessage: 'No se pudo registrar el cliente.',
    payload: { nombre: 'Cliente de prueba' },
  },
  {
    name: 'conductores',
    getAll: getDrivers,
    create: createDriver,
    endpoint: '/api/conductores',
    getMessage: 'No se pudieron consultar los conductores.',
    createMessage: 'No se pudo registrar el conductor.',
    payload: { nombre_completo: 'Conductor de prueba' },
  },
  {
    name: 'pedidos',
    getAll: getOrders,
    create: createOrder,
    endpoint: '/api/pedidos',
    getMessage: 'No se pudieron consultar los pedidos.',
    createMessage: 'No se pudo registrar el pedido.',
    payload: { cliente_id: 'cliente-prueba' },
  },
  {
    name: 'rutas',
    getAll: getRoutes,
    create: createRoute,
    endpoint: '/api/rutas',
    getMessage: 'No se pudieron consultar las rutas.',
    createMessage: 'No se pudo planificar la ruta.',
    payload: { fecha_planificada: '2026-11-17' },
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.apiFetch.mockResolvedValue(response)
  mocks.parseResponse.mockResolvedValue(result)
})

describe('consultas y registros de servicios', () => {
  it.each(services)(
    '$name: consulta el listado',
    async ({ getAll, endpoint, getMessage }) => {
      await expect(getAll()).resolves.toEqual(result)

      expect(mocks.apiFetch).toHaveBeenCalledWith(endpoint)
      expect(mocks.parseResponse).toHaveBeenCalledWith(
        response,
        getMessage,
      )
    },
  )

  it.each(services)(
    '$name: registra datos mediante POST',
    async ({ create, endpoint, createMessage, payload }) => {
      await expect(create(payload)).resolves.toEqual(result)

      expect(mocks.apiFetch).toHaveBeenCalledWith(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      expect(mocks.parseResponse).toHaveBeenCalledWith(
        response,
        createMessage,
      )
    },
  )
})