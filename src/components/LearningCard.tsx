import { useMemo, useState } from 'react'
import type { LearningCard as LearningCardData } from '../types/content'
import { CopyButton } from './CopyButton'
import { ResponsibleNotice } from './ResponsibleNotice'
import { ToolBadge } from './ToolBadge'
import { VerificationBadge } from './VerificationBadge'

interface LearningCardProps {
  lesson: LearningCardData
}

export function LearningCard({ lesson }: LearningCardProps) {
  const [contextId, setContextId] = useState('general')
  const selectedContext = useMemo(() => lesson.contextVariants[contextId] ?? lesson.contextVariants.general, [contextId, lesson.contextVariants])
  const context = lesson.contexts.find((candidate) => candidate.id === contextId)

  return (
    <article className="lesson" aria-labelledby="lesson-title">
      <header className="lesson__header">
        <div>
          <span className="eyebrow">Lección práctica</span>
          <h1 id="lesson-title">{lesson.title}</h1>
          <p className="lesson__summary">{lesson.summary}</p>
        </div>
        <VerificationBadge verification={lesson.verification} />
      </header>

      <div className="lesson__body">
        <div className="lesson__main">
          <section className="lesson-section">
            <p className="section-kicker">01</p>
            <div>
              <h2>Qué puedes hacer</h2>
              <p>{lesson.whatYouCanDo}</p>
            </div>
          </section>

          <section className="lesson-section lesson-section--example">
            <p className="section-kicker">02</p>
            <div>
              <h2>Ejemplo</h2>
              <p className="example-quote">“{selectedContext.example || lesson.example}”</p>
              {context && <p className="context-note"><strong>Para {context.label.toLowerCase()}:</strong> {selectedContext.note}</p>}
            </div>
          </section>

          <section className="lesson-section">
            <p className="section-kicker">03</p>
            <div>
              <h2>Pruébalo</h2>
              <ol className="steps-list">
                {lesson.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          </section>

          <section className="instruction-block" aria-labelledby="instruction-title">
            <div className="instruction-block__heading">
              <div>
                <p className="section-kicker">04</p>
                <h2 id="instruction-title">Prueba esta instrucción</h2>
              </div>
              <CopyButton value={lesson.instruction} />
            </div>
            <p className="instruction-block__text">{lesson.instruction}</p>
          </section>
        </div>

        <aside className="lesson__aside">
          <section className="aside-section">
            <p className="section-kicker">05</p>
            <h2>Puedes hacerlo con</h2>
            <p className="aside-section__intro">La capacidad es lo importante. Estas son algunas opciones que puedes explorar.</p>
            <div className="tool-list">
              {lesson.tools.map((tool) => <ToolBadge key={tool.id} tool={tool} />)}
            </div>
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
