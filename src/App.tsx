import { useState } from 'react'
import { BoardQuestion } from './components/BoardQuestion'
import { ContextTrail } from './components/ContextTrail'
import { GeometricMark } from './components/GeometricMark'
import { LearningCard } from './components/LearningCard'
import { capabilities } from './data/capabilities'
import type { Choice } from './types/content'

interface QuestionStep {
  question: string
  choices: Choice[]
}

function App() {
  const [steps, setSteps] = useState<QuestionStep[]>([{ question: '¿Qué quieres hacer hoy?', choices: capabilities }])
  const [path, setPath] = useState<Choice[]>([])
  const [lesson, setLesson] = useState<Choice['lesson']>()

  const currentStep = steps[steps.length - 1]
  const isHome = steps.length === 1 && path.length === 0 && !lesson

  const restart = () => {
    setSteps([{ question: '¿Qué quieres hacer hoy?', choices: capabilities }])
    setPath([])
    setLesson(undefined)
  }

  const goBack = () => {
    if (lesson) {
      setLesson(undefined)
      setPath((currentPath) => currentPath.slice(0, -1))
      return
    }
    if (steps.length > 1) {
      setSteps((currentSteps) => currentSteps.slice(0, -1))
      setPath((currentPath) => currentPath.slice(0, -1))
    }
  }

  const choose = (choice: Choice) => {
    if (choice.lesson) {
      setPath((currentPath) => [...currentPath, choice])
      setLesson(choice.lesson)
      return
    }
    if (choice.children) {
      setPath((currentPath) => [...currentPath, choice])
      setSteps((currentSteps) => [...currentSteps, { question: choice.question ?? '¿Qué quieres hacer?', choices: choice.children ?? [] }])
    }
  }

  const goToPath = (index: number) => {
    const targetStepCount = index + 2
    setSteps((currentSteps) => currentSteps.slice(0, targetStepCount))
    setPath((currentPath) => currentPath.slice(0, index + 1))
    setLesson(undefined)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" type="button" onClick={restart} aria-label="Volver al inicio de Pizarra IA">
          <span className="brand__mark"><GeometricMark shape="hexagon" accent="currentColor" size="small" /></span>
          <span className="brand__name">Pizarra <em>IA</em></span>
        </button>
      </header>

      <main className="board" aria-live="polite">
        {!isHome && <div className="board__topline">
          <span>Ideas · preguntas · aprendizaje real</span>
          <button className="restart-button" type="button" onClick={restart}>Empezar de nuevo</button>
        </div>}

        {path.length > 0 && <ContextTrail path={path} onSelect={goToPath} />}

        {lesson ? <LearningCard lesson={lesson} /> : <BoardQuestion question={currentStep.question} choices={currentStep.choices} onSelect={choose} isHome={isHome} />}

        <div className="board__footer">
          {!isHome && <button className="back-button" type="button" onClick={goBack}>← <span>Volver</span></button>}
          <span className="board__motto">Explora. Prueba. Comprueba. Aprende.</span>
        </div>
      </main>
    </div>
  )
}

export default App
