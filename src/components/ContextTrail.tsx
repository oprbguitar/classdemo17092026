import type { Choice } from '../types/content'

interface ContextTrailProps {
  path: Choice[]
  onSelect: (index: number) => void
}

export function ContextTrail({ path, onSelect }: ContextTrailProps) {
  if (path.length === 0) return null

  return (
    <nav className="context-trail" aria-label="Tu recorrido">
      <span className="context-trail__label">Tu recorrido</span>
      {path.map((choice, index) => {
        const isCurrent = index === path.length - 1
        return (
          <span className="context-trail__item" key={`${choice.id}-${index}`}>
            <span className="context-trail__chevron" aria-hidden="true">/</span>
            {isCurrent ? <span aria-current="step">{choice.label}</span> : <button type="button" onClick={() => onSelect(index)}>{choice.label}</button>}
          </span>
        )
      })}
    </nav>
  )
}
