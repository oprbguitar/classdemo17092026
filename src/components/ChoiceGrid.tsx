import type { Choice } from '../types/content'
import { ChoiceCard } from './ChoiceCard'

interface ChoiceGridProps {
  choices: Choice[]
  onSelect: (choice: Choice) => void
}

export function ChoiceGrid({ choices, onSelect }: ChoiceGridProps) {
  return (
    <div className="choice-grid" role="list" aria-label="Opciones para continuar">
      {choices.map((choice, index) => (
        <div className="choice-grid__item" role="listitem" key={choice.id} style={{ '--choice-index': index } as React.CSSProperties}>
          <ChoiceCard choice={choice} onSelect={onSelect} />
        </div>
      ))}
    </div>
  )
}
