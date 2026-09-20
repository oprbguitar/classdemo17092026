import { CopyButton } from './CopyButton'
import type { PhaseContent, Tool } from '../types/content'

interface PhaseCanvasProps {
  phase: PhaseContent
  lessonTitle: string
  selectedTool?: Tool
  context?: { label: string; note: string; example: string }
}

export function PhaseCanvas({ phase, lessonTitle, selectedTool, context }: PhaseCanvasProps) {
  return (
    <section className="phase-canvas" aria-labelledby="phase-title">
      <div className="phase-canvas__intro">
        <p className="phase-canvas__eyebrow">Fase {phase.number} · {phase.label}</p>
        <h2 id="phase-title">{phase.id === 'hacer' ? 'Hacer' : phase.id === 'mejorar' ? 'Hacerlo mejor' : 'Crear un sistema'}</h2>
        <p className="phase-canvas__summary">{phase.summary}</p>
        {selectedTool && <p className="phase-canvas__provider">Puedes probarlo con <strong>{selectedTool.name}</strong>.</p>}
        {context && <div className="phase-context"><span>Aplicado a {context.label}</span><p>{context.note || context.example}</p></div>}
      </div>

      <section className="phase-instruction" aria-labelledby="phase-instruction-title">
        <div className="phase-instruction__heading">
          <div>
            <p className="section-kicker">Práctica guiada</p>
            <h3 id="phase-instruction-title">Prueba esta instrucción</h3>
          </div>
          <CopyButton value={phase.instruction} />
        </div>
        <p className="phase-instruction__text">{phase.instruction}</p>
      </section>

      <div className="phase-canvas__sections">
        {phase.sections.map((section, index) => (
          <section className={index === 0 ? 'phase-section phase-section--lead' : 'phase-section'} key={section.title}>
            <p className="section-kicker">0{index + 1}</p>
            <div>
              <h3>{section.title}</h3>
              {section.body && <p>{section.body}</p>}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </div>
          </section>
        ))}
      </div>

      <section className="phase-checklist" aria-labelledby="phase-checklist-title">
        <div>
          <p className="section-kicker">Criterio de salida</p>
          <h3 id="phase-checklist-title">¿Cómo sabes que avanzaste?</h3>
        </div>
        <ul>{phase.checklist.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
      </section>

      <p className="phase-canvas__footer">Esta fase forma parte de: <strong>{lessonTitle}</strong></p>
    </section>
  )
}
