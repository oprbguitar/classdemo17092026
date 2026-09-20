import type { Tool } from '../types/content'

export const tools: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Asistente general para conversar, analizar archivos y redactar.',
    website: 'https://chatgpt.com',
    freePlan: true,
    strengths: ['Conversación flexible', 'Análisis de documentos', 'Variedad de formatos'],
    limitations: ['Las funciones disponibles dependen del plan y la cuenta'],
    recommendedFor: ['explorar una tarea', 'iterar instrucciones'],
    verification: { state: 'Probado', updatedAt: 'septiembre de 2026' },
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Asistente orientado a lectura, escritura y razonamiento sobre textos.',
    website: 'https://claude.ai',
    freePlan: true,
    strengths: ['Lectura extensa', 'Redacción clara', 'Análisis estructurado'],
    limitations: ['Los límites y formatos cambian según el plan'],
    recommendedFor: ['revisar documentos', 'mejorar textos'],
    verification: { state: 'Probado', updatedAt: 'septiembre de 2026' },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Asistente de Google para texto, archivos y tareas conectadas.',
    website: 'https://gemini.google.com',
    freePlan: true,
    strengths: ['Integración con servicios de Google', 'Trabajo multimodal'],
    limitations: ['La experiencia depende del ecosistema de Google'],
    recommendedFor: ['trabajo en Drive', 'crear borradores'],
    verification: { state: 'Probado', updatedAt: 'septiembre de 2026' },
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    description: 'Asistente para personas que trabajan dentro del ecosistema Microsoft.',
    website: 'https://copilot.microsoft.com',
    freePlan: true,
    strengths: ['Integración con Microsoft 365', 'Apoyo en tareas de oficina'],
    limitations: ['Las funciones de Microsoft 365 dependen de la licencia'],
    recommendedFor: ['documentos de Office', 'resúmenes de reuniones'],
    verification: { state: 'En revisión', updatedAt: 'septiembre de 2026' },
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Buscador conversacional que presenta respuestas con fuentes.',
    website: 'https://www.perplexity.ai',
    freePlan: true,
    strengths: ['Búsqueda con referencias', 'Exploración rápida de temas'],
    limitations: ['Las fuentes deben abrirse y revisarse antes de usarlas'],
    recommendedFor: ['investigación inicial', 'comparar fuentes'],
    verification: { state: 'Probado', updatedAt: 'septiembre de 2026' },
  },
]

export function getTools(...ids: string[]) {
  return ids.flatMap((id) => {
    const tool = tools.find((candidate) => candidate.id === id)
    return tool ? [tool] : []
  })
}
