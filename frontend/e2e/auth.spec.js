import { test, expect } from '@playwright/test'
import { installApiMocks, loginAs } from './helpers.js'

test.beforeEach(async ({ page }) => {
  await installApiMocks(page)
})

test('permite iniciar sesión y muestra el panel según el perfil', async ({ page }) => {
  await loginAs(page)
  await expect(page.getByText(/admin\.e2e · ADMINISTRADOR/i)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Cerrar sesión' })).toBeVisible()
})

test('muestra un mensaje cuando las credenciales son incorrectas', async ({ page }) => {
  await page.goto('/#/login')
  await page.getByLabel('Nombre de usuario').fill('admin.e2e')
  await page.getByLabel('Contraseña').fill('clave-incorrecta')
  await page.getByRole('button', { name: /Ingresar al sistema/ }).click()

  await expect(page.getByRole('alert')).toContainText('Credenciales incorrectas')
  await expect(page.getByRole('heading', { name: /Bienvenido de nuevo/i })).toBeVisible()
})

test('cierra la sesión y vuelve a la página pública', async ({ page }) => {
  await loginAs(page)
  await page.getByRole('button', { name: 'Cerrar sesión' }).click()

  await expect(page.getByRole('heading', { name: /Una operación más clara/i })).toBeVisible()
})
