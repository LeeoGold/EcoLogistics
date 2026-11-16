import { expect } from '@playwright/test'

export const testVehicle = {
  vehiculo_id: '0b8f7d30-7a2d-4b0e-b4bd-6d2bbd0a1234',
  placa: 'E2E-001',
  tipo: 'CAMIONETA',
  capacidad_kg: 1200,
  consumo_km_gal: 25,
  factor_co2_kg_km: 0.18,
  anio_fabricacion: 2023,
  estado: 'DISPONIBLE',
}

export async function installApiMocks(page) {
  await page.route('http://127.0.0.1:8000/**', async (route) => {
    const request = route.request()
    const url = new URL(request.url())

    if (url.pathname === '/api/auth/login' && request.method() === 'POST') {
      const body = request.postDataJSON()
      if (body.password === 'clave-incorrecta') {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ detail: 'Credenciales incorrectas' }),
        })
        return
      }

      const rol = body.nombre_usuario === 'operador.e2e' ? 'OPERADOR' : 'ADMINISTRADOR'
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'token-e2e-no-valido-fuera-de-pruebas',
          token_type: 'bearer',
          user: { usuario_id: 1, nombre_usuario: body.nombre_usuario, rol },
        }),
      })
      return
    }

    if (url.pathname === '/api/dashboard/resumen') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          vehiculos_disponibles: 1,
          vehiculos_total: 1,
          clientes_total: 2,
          pedidos_pendientes: 1,
          conductores_activos: 1,
          conductores_total: 1,
        }),
      })
      return
    }

    if (url.pathname === '/api/vehiculos/pagina') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [testVehicle],
          total: 1,
          page: 1,
          page_size: 12,
          pages: 1,
        }),
      })
      return
    }

    if (url.pathname === '/api/vehiculos') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
      return
    }

    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ detail: `Ruta E2E no simulada: ${url.pathname}` }),
    })
  })
}

export async function loginAs(page, username = 'admin.e2e') {
  await page.goto('/#/login')
  await page.getByLabel('Nombre de usuario').fill(username)
  await page.getByLabel('Contraseña').fill('clave-e2e')
  await page.getByRole('button', { name: /Ingresar al sistema/ }).click()
  await expect(page.getByRole('heading', { name: /Panel de administración|Panel operativo/ })).toBeVisible()
}
