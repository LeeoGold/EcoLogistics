import { test, expect } from '@playwright/test'
import { installApiMocks, loginAs, testVehicle } from './helpers.js'

test.beforeEach(async ({ page }) => {
  await installApiMocks(page)
})

test('el administrador puede ver acciones de edición y eliminación de vehículos', async ({ page }) => {
  await loginAs(page, 'admin.e2e')
  await page.getByRole('button', { name: 'Flota' }).click()

  await expect(page.getByRole('heading', { name: 'Flota operativa' })).toBeVisible()
  await expect(page.getByText(testVehicle.placa)).toBeVisible()
  await expect(page.getByRole('button', { name: `Editar vehículo ${testVehicle.placa}` })).toBeVisible()
  await expect(page.getByRole('button', { name: `Eliminar vehículo ${testVehicle.placa}` })).toBeVisible()
})

test('el operador puede consultar y registrar pero no ve acciones administrativas en la flota', async ({ page }) => {
  await loginAs(page, 'operador.e2e')
  await expect(page.getByText(/operador\.e2e · OPERADOR/i)).toBeVisible()
  await page.getByRole('button', { name: 'Flota' }).click()

  await expect(page.getByRole('heading', { name: 'Flota operativa' })).toBeVisible()
  await expect(page.getByText(testVehicle.placa)).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Registrar vehículo' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Editar vehículo/ })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /Eliminar vehículo/ })).toHaveCount(0)
})
