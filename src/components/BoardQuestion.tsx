import type { Choice } from '../types/content'
import { ChoiceGrid } from './ChoiceGrid'

interface BoardQuestionProps {
  question: string
  choices: Choice[]
  onSelect: (choice: Choice) => void
  isHome?: boolean
}

export function BoardQuestion({ question, choices, onSelect, isHome = false }: BoardQuestionProps) {
  return (
    <section className={`board-question ${isHome ? 'board-question--home' : ''}`} aria-labelledby="board-question-title">
      <div className="board-question__prompt">
        <span className="prompt-line" aria-hidden="true" />
        <h1 id="board-question-title">{question}</h1>
        {isHome && <p>Empieza por algo que necesites resolver.</p>}
      </div>
      <ChoiceGrid choices={choices} onSelect={onSelect} />
    </section>
  )
}
