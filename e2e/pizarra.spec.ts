import { expect, test } from '@playwright/test'

test.describe('Pizarra IA', () => {
  test('muestra seis intenciones y no desborda el viewport', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: '¿Qué quieres hacer hoy?' })).toBeVisible()
    await expect(page.getByRole('list', { name: 'Opciones para continuar' }).getByRole('button')).toHaveCount(6)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })

  test('recorre la lección profunda y copia la instrucción', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'ENTENDER' }).click()
    await page.getByRole('button', { name: 'Un documento' }).click()
    await page.getByRole('button', { name: 'Hacer preguntas' }).click()
    await expect(page.getByRole('heading', { name: 'Hacer preguntas a un documento' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'HACER', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await page.getByRole('button', { name: 'HACERLO MEJOR' }).click()
    await expect(page.getByRole('heading', { name: 'Hacerlo mejor' })).toBeVisible()
    await page.getByRole('button', { name: 'Claude' }).click()
    await expect(page.getByText('Asistente orientado a lectura, escritura y razonamiento sobre textos.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Abrir Claude' })).toHaveAttribute('href', 'https://claude.ai')
    await page.getByRole('button', { name: 'Copiar instrucción' }).click()
    await expect(page.getByRole('button', { name: 'Instrucción copiada' })).toBeVisible()
    await page.getByRole('button', { name: '← Volver' }).click()
    await expect(page.getByRole('heading', { name: '¿Qué quieres hacer con el documento?' })).toBeVisible()
    await page.getByRole('button', { name: 'Empezar de nuevo' }).click()
    await expect(page.getByRole('heading', { name: '¿Qué quieres hacer hoy?' })).toBeVisible()
  })
})
