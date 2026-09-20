import { describe, expect, it } from 'vitest'
import { capabilities, findChoice, getCapability } from './capabilities'

describe('contenido de la pizarra', () => {
  it('expone exactamente las seis intenciones principales', () => {
    expect(capabilities).toHaveLength(6)
    expect(capabilities.map((capability) => capability.label)).toEqual([
      'ESCRIBIR',
      'ENTENDER',
      'BUSCAR',
      'ANALIZAR',
      'CREAR',
      'CONSTRUIR',
    ])
  })

  it('mantiene el flujo profundo de entender un documento', () => {
    const capability = getCapability('entender')
    const documentChoice = findChoice(capability, 'un-documento')
    const questionChoice = findChoice(capability, 'hacer-preguntas')

    expect(documentChoice?.children?.length).toBeGreaterThan(0)
    const deepLesson = questionChoice?.lesson
    expect(deepLesson).toBeDefined()
    expect(deepLesson?.title).toBe('Hacer preguntas a un documento')
    expect(deepLesson?.steps).toHaveLength(4)
  })

  it('ofrece una lección completa para cada intención del MVP', () => {
    const actionIds = ['mejorar-un-texto', 'hacer-preguntas', 'investigar-con-fuentes', 'analizar-una-tabla', 'crear-una-presentacion', 'automatizar-una-tarea']
    actionIds.forEach((actionId) => {
      expect(capabilities.some((capability) => findChoice(capability, actionId)?.lesson)).toBe(true)
    })
  })
})
