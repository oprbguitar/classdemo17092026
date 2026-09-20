import type { PhaseContent, PhaseId } from '../types/content'

interface PhaseRailProps {
  phases: PhaseContent[]
  activeId: PhaseId
  onSelect: (id: PhaseId) => void
  onBack: () => void
}

export function PhaseRail({ phases, activeId, onSelect, onBack }: PhaseRailProps) {
  return (
    <aside className="phase-rail" aria-label="Fases de aprendizaje">
      <button className="phase-rail__back" type="button" onClick={onBack}>← <span>Volver</span></button>
      <p className="phase-rail__label">Tu recorrido</p>
      <ol>
        {phases.map((phase) => (
          <li key={phase.id}>
            <button className={phase.id === activeId ? 'phase-rail__step is-active' : 'phase-rail__step'} type="button" aria-label={phase.label} aria-pressed={phase.id === activeId} onClick={() => onSelect(phase.id)}>
              <span className="phase-rail__number">{phase.number}</span>
              <span className="phase-rail__copy"><strong>{phase.label}</strong><small>{phase.summary}</small></span>
            </button>
          </li>
        ))}
      </ol>
      <p className="phase-rail__hint">Avanza cuando puedas explicar qué cambió entre una versión y la siguiente.</p>
    </aside>
  )
}
