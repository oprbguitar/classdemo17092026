export interface PracticalCase {
  id: string
  title: string
  category: string
  description: string
  accessLevel: 'open' | 'advanced'
}

export const practicalCases: PracticalCase[] = [
  { id: 'norma-extensa', title: 'Revisar una norma extensa', category: 'Entender', description: 'Encontrar obligaciones y comprobar cada conclusión en la fuente original.', accessLevel: 'open' },
  { id: 'registros-excel', title: 'Analizar cientos de registros en Excel', category: 'Analizar', description: 'Detectar patrones, inconsistencias y preguntas que valga la pena investigar.', accessLevel: 'open' },
  { id: 'presentacion-profesional', title: 'Preparar una presentación profesional', category: 'Crear', description: 'Pasar de una idea o informe a una historia clara para una audiencia concreta.', accessLevel: 'open' },
  { id: 'flujo-documental', title: 'Organizar documentos administrativos', category: 'Construir', description: 'Convertir una tarea repetitiva en un flujo que se pueda revisar y mejorar.', accessLevel: 'advanced' },
]
