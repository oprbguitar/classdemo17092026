import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('flujo principal de Nexo', () => {
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

  it('permite avanzar por fases sin perder el contexto de la lección', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'ENTENDER' }))
    await user.click(screen.getByRole('button', { name: 'Un documento' }))
    await user.click(screen.getByRole('button', { name: 'Hacer preguntas' }))

    expect(screen.getByRole('button', { name: 'HACER' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: 'HACERLO MEJOR' }))

    expect(screen.getByRole('heading', { name: 'Hacerlo mejor' })).toBeInTheDocument()
    expect(screen.getByText(/criterios definidos/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '← Volver' })).toBeInTheDocument()
  })

  it('muestra la información del proveedor seleccionado en el lateral', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'ENTENDER' }))
    await user.click(screen.getByRole('button', { name: 'Un documento' }))
    await user.click(screen.getByRole('button', { name: 'Hacer preguntas' }))
    await user.click(screen.getByRole('button', { name: 'Claude' }))

    expect(screen.getByText('Asistente orientado a lectura, escritura y razonamiento sobre textos.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Abrir Claude/i })).toHaveAttribute('href', 'https://claude.ai')
  })

  it('adapta una instrucción al contexto profesional y ofrece una recomendación breve', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'ESCRIBIR' }))
    await user.click(screen.getByRole('button', { name: /Mejorar un texto/i }))

    expect(screen.getByText('Sugerencia para oficina')).toBeInTheDocument()
    expect(screen.getByText(/Microsoft Copilot: está integrado en Microsoft 365/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Administración' }))
    expect(screen.getByText(/Aplicado a Administración/i)).toBeInTheDocument()
    expect(screen.getByText(/necesidades concretas de administración/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'CREAR UN SISTEMA' }))
    expect(screen.getByText(/Entradas permitidas, formato y datos que nunca deben compartirse/i)).toBeInTheDocument()
  })
})
