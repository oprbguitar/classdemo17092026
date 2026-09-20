import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('flujo principal de Pizarra IA', () => {
  it('permite llegar desde Entender hasta la lección de preguntas', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: '¿Qué quieres hacer hoy?' })).toBeInTheDocument()
    expect(within(screen.getByRole('list', { name: 'Opciones para continuar' })).getAllByRole('button')).toHaveLength(6)

    await user.click(screen.getByRole('button', { name: 'ENTENDER' }))
    await user.click(screen.getByRole('button', { name: /Un documento/i }))
    await user.click(screen.getByRole('button', { name: /Hacer preguntas/i }))

    expect(screen.getByRole('heading', { name: 'Hacer preguntas a un documento' })).toBeInTheDocument()
    expect(screen.getByText(/Puedes subir un documento y pedirle a una herramienta de IA/)).toBeInTheDocument()
  })

  it('permite volver al paso anterior y reiniciar la pizarra', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'ANALIZAR' }))
    expect(screen.getByRole('heading', { name: '¿Qué quieres analizar?' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '← Volver' }))
    expect(screen.getByRole('heading', { name: '¿Qué quieres hacer hoy?' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Construir/i }))
    await user.click(screen.getByRole('button', { name: /Empezar de nuevo/i }))
    expect(screen.getByRole('heading', { name: '¿Qué quieres hacer hoy?' })).toBeInTheDocument()
  })

  it('copia la instrucción y confirma el resultado', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'ENTENDER' }))
    await user.click(screen.getByRole('button', { name: /Un documento/i }))
    await user.click(screen.getByRole('button', { name: /Hacer preguntas/i }))
    await user.click(screen.getByRole('button', { name: /Copiar instrucción/i }))
    expect(screen.getByText('Instrucción copiada')).toBeInTheDocument()
  })
})
