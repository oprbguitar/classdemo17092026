import { useMemo, useState } from 'react'
import { PhaseCanvas } from './PhaseCanvas'
import { PhaseRail } from './PhaseRail'
import { ResponsibleNotice } from './ResponsibleNotice'
import { ToolBadge } from './ToolBadge'
import { VerificationBadge } from './VerificationBadge'
import { LearningResources } from './LearningResources'
import type { LearningCard as LearningCardData, PhaseId } from '../types/content'

interface LearningCardProps {
  lesson: LearningCardData
  onBack: () => void
  onRestart: () => void
}

export function LearningCard({ lesson, onBack, onRestart }: LearningCardProps) {
  const [contextId, setContextId] = useState('general')
  const [phaseId, setPhaseId] = useState<PhaseId>(lesson.phases[0]?.id ?? 'hacer')
  const [toolId, setToolId] = useState(lesson.tools[0]?.id ?? '')
  const context = lesson.contexts.find((candidate) => candidate.id === contextId)
  const selectedContext = useMemo(() => {
    const variant = lesson.contextVariants[contextId] ?? lesson.contextVariants.general
    if (!context) return variant
    return {
      example: variant.example || `Una aplicación práctica de esta lección para ${context.label.toLowerCase()}.`,
      note: variant.note || `Adapta el lenguaje, los criterios y la revisión final a las necesidades de ${context.label.toLowerCase()}.`,
    }
  }, [context, contextId, lesson.contextVariants])
  const phase = lesson.phases.find((candidate) => candidate.id === phaseId) ?? lesson.phases[0]
  const selectedTool = lesson.tools.find((tool) => tool.id === toolId) ?? lesson.tools[0]
  const activeContext = useMemo(() => context && selectedContext ? { label: context.label, note: selectedContext.note, example: selectedContext.example } : undefined, [context, selectedContext])
  const contextName = activeContext?.label.toLowerCase()
  const contextualPhase = !phase || !activeContext ? phase : {
    ...phase,
    summary: `${phase.summary} En ${contextName}, prioriza un resultado que puedas revisar y reutilizar.`,
    sections: phase.sections.map((section, index) => index === 0
      ? { ...section, body: `${section.body ?? ''} En este caso, piensa en las necesidades concretas de ${contextName}.` }
      : section),
    instruction: `${phase.instruction}\n\nContexto de trabajo: ${activeContext.label}. ${activeContext.note || activeContext.example}\nAdapta los ejemplos, el formato y los criterios de revisión a este contexto.`,
  }

  if (!phase) return null

  return (
    <article className="lesson" aria-labelledby="lesson-title">
      <header className="lesson__header">
        <div className="lesson__header-copy">
          <span className="eyebrow">Lección práctica · canvas de fases</span>
          <h1 id="lesson-title">{lesson.title}</h1>
          <p className="lesson__summary">{lesson.summary}</p>
        </div>
        <div className="lesson__header-side">
          <div className="lesson__header-actions">
            <VerificationBadge verification={lesson.verification} />
            <button className="lesson__restart" type="button" onClick={onRestart}>Empezar de nuevo</button>
          </div>
          <div className="lesson__header-guide">
            <p className="section-kicker">Orientación rápida</p>
            <strong>Prueba · mejora · sistematiza</strong>
            <span>{lesson.steps[0]}</span>
          </div>
        </div>
      </header>

      <div className="lesson__workspace">
        <PhaseRail phases={lesson.phases} activeId={phase.id} onSelect={setPhaseId} onBack={onBack} />

        <main className="lesson__canvas">
          <PhaseCanvas phase={contextualPhase} lessonTitle={lesson.title} selectedTool={selectedTool} context={activeContext} />
        </main>

        <aside className="lesson__aside">
          <section className="aside-section provider-panel" aria-labelledby="providers-title">
            <p className="section-kicker">Proveedores</p>
            <h2 id="providers-title">Pruébalo con</h2>
            <p className="aside-section__intro">Elige un proveedor para ver qué aporta a esta tarea y abrirlo en otra pestaña.</p>
            {lesson.recommendation && <div className="quick-recommendation">
              <span className="quick-recommendation__label">{lesson.recommendation.title}</span>
              <p>{lesson.recommendation.body}</p>
              <button type="button" onClick={() => setToolId(lesson.recommendation?.toolId ?? '')}>Seleccionar {lesson.tools.find((tool) => tool.id === lesson.recommendation?.toolId)?.name ?? 'proveedor'}</button>
            </div>}
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
                <div className="provider-detail__pricing">
                  <div>
                    <span className="provider-detail__label">Planes y precio orientativo</span>
                    <strong>{selectedTool.pricing.summary}</strong>
                  </div>
                  <a href={selectedTool.pricing.url} target="_blank" rel="noreferrer">Ver precios ↗</a>
                </div>
                <div className="model-advice">
                  <p className="provider-detail__label">Elección rápida de modelo</p>
                  <div><span>Más económico</span><strong>{selectedTool.modelAdvice.economy}</strong></div>
                  <div><span>Más rápido</span><strong>{selectedTool.modelAdvice.fast}</strong></div>
                  <div><span>Más capaz</span><strong>{selectedTool.modelAdvice.quality}</strong></div>
                  <p>{selectedTool.modelAdvice.note}</p>
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

          <LearningResources />

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
