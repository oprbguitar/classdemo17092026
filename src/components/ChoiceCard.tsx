import type { Choice } from '../types/content'
import { GeometricMark } from './GeometricMark'

interface ChoiceCardProps {
  choice: Choice
  onSelect: (choice: Choice) => void
  selected?: boolean
}

export function ChoiceCard({ choice, onSelect, selected = false }: ChoiceCardProps) {
  return (
    <button
      className={`choice-card choice-card--${choice.accent} ${selected ? 'is-selected' : ''}`}
      type="button"
      onClick={() => onSelect(choice)}
      aria-label={choice.label}
    >
      <span className="choice-card__mark"><GeometricMark shape={choice.shape} accent="currentColor" size="small" /></span>
      <span className="choice-card__copy">
        <span className="choice-card__label">{choice.label}</span>
        {choice.description && <span className="choice-card__description">{choice.description}</span>}
      </span>
      <span className="choice-card__arrow" aria-hidden="true">↗</span>
    </button>
  )
}
