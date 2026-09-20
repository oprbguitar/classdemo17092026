export type Geometry = 'circle' | 'triangle' | 'search' | 'grid' | 'spark' | 'hexagon' | 'document' | 'table' | 'flow'
export type Accent = 'coral' | 'mustard' | 'teal' | 'green' | 'ink'
export type AccessLevel = 'open' | 'advanced'
export type VerificationState = 'Probado' | 'Actualizado' | 'En revisión' | 'Función modificada' | 'Experimental'
export type PhaseId = 'hacer' | 'mejorar' | 'sistema'

export interface VerificationStatus {
  state: VerificationState
  updatedAt: string
}

export interface Tool {
  id: string
  name: string
  description: string
  website: string
  freePlan: boolean
  strengths: string[]
  limitations: string[]
  recommendedFor: string[]
  verification: VerificationStatus
}

export interface ProfessionalContext {
  id: string
  label: string
  accent: Accent
}

export interface PhaseSection {
  title: string
  body?: string
  bullets?: string[]
}

export interface PhaseContent {
  id: PhaseId
  number: string
  label: string
  summary: string
  sections: PhaseSection[]
  instruction: string
  checklist: string[]
}

export interface LearningCard {
  id: string
  title: string
  summary: string
  whatYouCanDo: string
  example: string
  steps: string[]
  instruction: string
  tools: Tool[]
  caution: string
  responsible: string
  accessLevel: AccessLevel
  verification: VerificationStatus
  contexts: ProfessionalContext[]
  contextVariants: Record<string, { example: string; note: string }>
  further: string
  phases: PhaseContent[]
}

export interface Choice {
  id: string
  label: string
  description?: string
  shape: Geometry
  accent: Accent
  question?: string
  children?: Choice[]
  lesson?: LearningCard
}

export interface Capability extends Choice {
  id: 'escribir' | 'entender' | 'buscar' | 'analizar' | 'crear' | 'construir'
  question: string
}
