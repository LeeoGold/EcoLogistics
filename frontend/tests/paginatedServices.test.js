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

import { getClientsPage } from '../src/services/clientService'
import { getDriversPage } from '../src/services/driverService'
import { getOrdersPage } from '../src/services/orderService'
import { getRoutesPage } from '../src/services/routeService'

const response = { ok: true }
const result = { success: true }

const paginationServices = [
  {
    name: 'clientes',
    getPage: getClientsPage,
    endpoint: '/api/clientes/pagina',
  },
  {
    name: 'conductores',
    getPage: getDriversPage,
    endpoint: '/api/conductores/pagina',
  },
  {
    name: 'pedidos',
    getPage: getOrdersPage,
    endpoint: '/api/pedidos/pagina',
  },
  {
    name: 'rutas',
    getPage: getRoutesPage,
    endpoint: '/api/rutas/pagina',
  },
]

beforeEach(() => {
  vi.clearAllMocks()
  mocks.apiFetch.mockResolvedValue(response)
  mocks.parseResponse.mockResolvedValue(result)
})

describe('servicios de paginación', () => {
  it.each(paginationServices)(
    '$name: aplica filtros y omite valores vacíos o nulos',
    async ({ getPage, endpoint }) => {
      await expect(
        getPage({
          page: 2,
          page_size: 5,
          q: 'Huancayo',
          estado: 'ACTIVO',
          empty: '',
          nullValue: null,
          undefinedValue: undefined,
          zero: 0,
        }),
      ).resolves.toEqual(result)

      expect(mocks.apiFetch).toHaveBeenCalledWith(
        `${endpoint}?page=2&page_size=5&q=Huancayo&estado=ACTIVO&zero=0`,
      )

      expect(mocks.parseResponse).toHaveBeenCalledWith(
        response,
        'No se pudo consultar la página solicitada.',
      )
    },
  )

  it.each(paginationServices)(
    '$name: utiliza los parámetros predeterminados',
    async ({ getPage, endpoint }) => {
      await getPage()

      expect(mocks.apiFetch).toHaveBeenCalledWith(
        `${endpoint}?page=1&page_size=12`,
      )
    },
  )
})