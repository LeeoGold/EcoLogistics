import { test, expect } from '@playwright/test'
import { installApiMocks } from './helpers.js'

test.beforeEach(async ({ page }) => {
  await installApiMocks(page)
})

test('muestra la página pública y sus módulos principales', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /Una operación más clara/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Módulos/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Gestión de flota/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Planificación de rutas/i })).toBeVisible()
})

test('redirige a la vista pública cuando se intenta abrir un módulo sin autenticación', async ({ page }) => {
  await page.goto('/#/flota')

  await expect(page.getByRole('heading', { name: /Una operación más clara/i })).toBeVisible()
  await expect(page).toHaveURL(/#\/home$/)
})
