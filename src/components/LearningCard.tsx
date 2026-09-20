import { useMemo, useState } from 'react'
import { PhaseCanvas } from './PhaseCanvas'
import { PhaseRail } from './PhaseRail'
import { ResponsibleNotice } from './ResponsibleNotice'
import { ToolBadge } from './ToolBadge'
import { VerificationBadge } from './VerificationBadge'
import type { LearningCard as LearningCardData, PhaseId } from '../types/content'

interface LearningCardProps {
  lesson: LearningCardData
  onBack: () => void
}

export function LearningCard({ lesson, onBack }: LearningCardProps) {
  const [contextId, setContextId] = useState('general')
  const [phaseId, setPhaseId] = useState<PhaseId>(lesson.phases[0]?.id ?? 'hacer')
  const [toolId, setToolId] = useState(lesson.tools[0]?.id ?? '')
  const selectedContext = useMemo(() => lesson.contextVariants[contextId] ?? lesson.contextVariants.general, [contextId, lesson.contextVariants])
  const context = lesson.contexts.find((candidate) => candidate.id === contextId)
  const phase = lesson.phases.find((candidate) => candidate.id === phaseId) ?? lesson.phases[0]
  const selectedTool = lesson.tools.find((tool) => tool.id === toolId) ?? lesson.tools[0]

  if (!phase) return null

  return (
    <article className="lesson" aria-labelledby="lesson-title">
      <header className="lesson__header">
        <div>
          <span className="eyebrow">Lección práctica · canvas de fases</span>
          <h1 id="lesson-title">{lesson.title}</h1>
          <p className="lesson__summary">{lesson.summary}</p>
        </div>
        <VerificationBadge verification={lesson.verification} />
      </header>

      <div className="lesson__workspace">
        <PhaseRail phases={lesson.phases} activeId={phase.id} onSelect={setPhaseId} onBack={onBack} />

        <main className="lesson__canvas">
          <PhaseCanvas phase={phase} lessonTitle={lesson.title} selectedTool={selectedTool} />
        </main>

        <aside className="lesson__aside">
          <section className="aside-section provider-panel" aria-labelledby="providers-title">
            <p className="section-kicker">Proveedores</p>
            <h2 id="providers-title">Pruébalo con</h2>
            <p className="aside-section__intro">Elige un proveedor para ver qué aporta a esta tarea y abrirlo en otra pestaña.</p>
            <div className="tool-list">
              {lesson.tools.map((tool) => <ToolBadge key={tool.id} tool={tool} selected={tool.id === selectedTool?.id} onSelect={() => setToolId(tool.id)} />)}
            </div>
            {selectedTool && (
              <div className="provider-detail">
                <div className="provider-detail__name"><span className="provider-detail__dot" aria-hidden="true" />{selectedTool.name}</div>
                <p>{selectedTool.description}</p>
                <div className="provider-detail__meta">
                  <span>{selectedTool.freePlan ? 'Tiene acceso gratuito' : 'Revisa el plan disponible'}</span>
                  <span>{selectedTool.verification.state}</span>
                </div>
                <p className="provider-detail__label">Funciona especialmente bien para</p>
                <ul>{selectedTool.recommendedFor.map((item) => <li key={item}>{item}</li>)}</ul>
                <a className="provider-detail__open" href={selectedTool.website} target="_blank" rel="noreferrer">Abrir {selectedTool.name} ↗</a>
              </div>
            )}
          </section>

          <ResponsibleNotice>{lesson.caution} {lesson.responsible}</ResponsibleNotice>

          <section className="context-picker" aria-labelledby="context-title">
            <p className="section-kicker">En tu trabajo</p>
            <h2 id="context-title">¿Cómo puedo usar esto?</h2>
            <div className="context-picker__options">
              <button className={contextId === 'general' ? 'is-selected' : ''} type="button" onClick={() => setContextId('general')}>Un ejemplo general</button>
              {lesson.contexts.slice(0, 4).map((candidate) => (
                <button className={contextId === candidate.id ? 'is-selected' : ''} type="button" key={candidate.id} onClick={() => setContextId(candidate.id)}>{candidate.label}</button>
              ))}
            </div>
            {context && selectedContext.example && <p className="context-picker__note"><strong>Ejemplo para {context.label.toLowerCase()}:</strong> {selectedContext.example}</p>}
          </section>

          <details className="further-details">
            <summary>Quiero ir más lejos</summary>
            <p>{lesson.further}</p>
            {lesson.accessLevel === 'advanced' && <span className="advanced-label">Contenido avanzado</span>}
          </details>
        </aside>
      </div>
    </article>
  )
}
