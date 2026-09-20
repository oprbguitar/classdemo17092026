import { learningResources } from '../data/resources'

export function LearningResources() {
  return (
    <section className="learning-resources" aria-labelledby="resources-title">
      <div className="learning-resources__header">
        <div>
          <p className="section-kicker">Siguiente paso</p>
          <h2 id="resources-title">Aprende y valida</h2>
        </div>
        <span className="learning-resources__count">{learningResources.length} rutas</span>
      </div>
      <p className="learning-resources__intro">Cursos, badges, certificados de finalización y diplomados. Abre la ficha y verifica requisitos, fechas y precio antes de inscribirte.</p>
      <div className="learning-resources__list">
        {learningResources.map((resource) => (
          <a className="learning-resource" href={resource.url} target="_blank" rel="noreferrer" key={resource.id}>
            <span className="learning-resource__meta">{resource.scope} · {resource.type}</span>
            <strong>{resource.title}</strong>
            <span>{resource.provider} · {resource.description}</span>
            <span className="learning-resource__open">Abrir ficha ↗</span>
          </a>
        ))}
      </div>
      <p className="learning-resources__note">Nemo IA enlaza fuentes oficiales; no emite certificaciones ni garantiza admisión.</p>
    </section>
  )
}
