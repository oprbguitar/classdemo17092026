import { getTools } from './tools'
import { professionalContexts } from './professions'
import type { Capability, Choice, LearningCard, PhaseContent } from '../types/content'

const contextVariants = (overrides: Record<string, { example: string; note: string }>) => ({
  general: { example: '', note: '' },
  ...overrides,
})

const practiceInstruction = (instruction: string) => `${instruction}

Organiza la respuesta en este orden:
1. Objetivo y alcance de la tarea.
2. Resultado principal, con títulos y pasos fáciles de revisar.
3. Supuestos o información que falta.
4. Comprobaciones que debería hacer una persona antes de usar el resultado.

No inventes datos. Si una parte no se puede determinar con la información disponible, dilo explícitamente.`

const improvementInstruction = (instruction: string) => `${instruction}

Ahora mejora el resultado con criterios definidos:
- Adapta el lenguaje a la audiencia indicada.
- Separa hechos, interpretación y recomendaciones.
- Conserva nombres, cifras, fechas, citas y compromisos del material original.
- Señala dudas, riesgos de interpretación y decisiones que requieren revisión humana.

Devuelve primero la versión mejorada y después una breve lista de cambios y comprobaciones pendientes.`

const systemInstruction = (title: string) => {
  const isBuildTask = /automatizar|herramienta|flujo|sistema|software/i.test(title)
  const buildGuidance = isBuildTask ? `

Si vas a convertirlo en software o automatización, usa Codex o Claude Code como agente de implementación y trabaja por entregas revisables:
- Primero inspecciona el repositorio o el proceso actual y devuelve un mapa de archivos, datos, permisos y dependencias. No cambies nada todavía.
- Después propone una arquitectura pequeña, criterios de aceptación y una lista de pruebas. Pide confirmación antes de tocar datos, credenciales o producción.
- Implementa por verticales: interfaz, lógica, persistencia e integración. Mantén un registro de errores, reintentos, auditoría y una bandeja de excepciones.
- Ejecuta lint, pruebas unitarias, integración y una prueba de extremo a extremo. Muestra el diff, los comandos ejecutados y cualquier limitación.
- Documenta instalación, variables de entorno, recuperación, responsables y cómo desactivar el flujo.

Para tareas repetitivas compara antes de programar: Zapier si necesitas conectar muchas aplicaciones sin código; Make si necesitas rutas visuales y condiciones; n8n si necesitas control técnico o autoalojamiento; Claude Cowork u otro espacio de trabajo solo si está disponible en tu cuenta y con sus permisos revisados.` : ''

  return `Diseña un sistema reutilizable para: ${title}.

Especifica con detalle:
1. Objetivo, alcance y resultado esperado.
2. Entradas permitidas, formato y datos que nunca deben compartirse.
3. Instrucción principal y pasos de transformación.
4. Criterios de calidad para aceptar, rechazar o devolver un resultado.
5. Casos excepcionales y una bandeja de pendientes que no pueda resolver la IA.
6. Revisión humana obligatoria, responsable y momento de aprobación.
7. Salida final, nombre de los archivos o campos, y dónde guardar la evidencia.
8. Prueba piloto con tres casos conocidos, indicadores de error y plan de mejora.${buildGuidance}

No conectes herramientas ni automatices una decisión hasta validar el flujo con una persona responsable.`
}

type LessonDraft = Omit<LearningCard, 'contexts' | 'verification' | 'accessLevel' | 'phases'> & Partial<Pick<LearningCard, 'contexts' | 'verification' | 'accessLevel'>>

function buildPhases(card: Omit<LearningCard, 'phases'>): PhaseContent[] {
  return [
    {
      id: 'hacer',
      number: '01',
      label: 'HACER',
      summary: 'Obtén un primer resultado útil y aprende a revisar qué hizo la herramienta.',
      sections: [
        { title: 'Primer resultado', body: card.whatYouCanDo },
        { title: 'Un caso concreto', body: card.example },
        { title: 'Ruta de trabajo', bullets: card.steps.slice(0, 3) },
      ],
      instruction: practiceInstruction(card.instruction),
      checklist: ['El resultado responde a la pregunta original.', 'Puedes localizar la información de origen.', 'Anotaste qué parte todavía necesita revisión.'],
    },
    {
      id: 'mejorar',
      number: '02',
      label: 'HACERLO MEJOR',
      summary: 'Añade criterios claros para conseguir una respuesta más comprobable y útil.',
      sections: [
        { title: 'Ajusta la respuesta', body: 'Pide un formato, una audiencia y un estándar de evidencia. La herramienta trabaja mejor cuando sabe qué debe conservar, qué debe separar y cómo debe mostrar sus límites.', bullets: ['Define quién usará el resultado.', 'Exige que separe hechos, interpretación y dudas.', 'Pide una estructura que puedas comparar entre versiones.'] },
        { title: 'Señales de calidad', body: card.caution, bullets: ['Las afirmaciones importantes tienen una fuente o una explicación.', 'El resultado declara lo que no puede determinar.', 'La versión mejorada mantiene el sentido y los datos originales.'] },
        { title: 'Compara dos versiones', body: 'Revisa el primer resultado y la versión con criterios concretos. Conserva los cambios que mejoran la decisión y descarta los que solo hacen que el texto suene más seguro.' },
      ],
      instruction: improvementInstruction(card.instruction),
      checklist: ['Definiste el formato y la audiencia.', 'Comparaste el resultado con el material original.', 'Marcaste las decisiones que todavía requieren criterio humano.'],
    },
    {
      id: 'sistema',
      number: '03',
      label: 'CREAR UN SISTEMA',
      summary: 'Convierte una prueba puntual en un proceso reutilizable, medible y con revisión humana.',
      sections: [
        { title: 'Del caso al proceso', body: card.further },
        { title: 'Diseña un flujo verificable', bullets: ['Entrada: qué información llega y en qué formato.', 'Transformación: qué pasos puede apoyar la IA.', 'Revisión humana: qué debe comprobar una persona.', 'Salida: qué se guarda, comparte o deriva.'] },
        { title: 'Responsabilidad y límites', body: card.responsible },
      ],
      instruction: systemInstruction(card.title),
      checklist: ['Probaste el flujo con casos conocidos.', 'Registraste errores y excepciones.', 'Definiste quién revisa antes de usar el resultado.'],
    },
  ]
}

function lesson(data: LessonDraft): LearningCard {
  const base: Omit<LearningCard, 'phases'> = {
    contexts: professionalContexts,
    verification: { state: 'Probado', updatedAt: 'septiembre de 2026' },
    accessLevel: 'open',
    ...data,
  }
  return { ...base, phases: buildPhases(base) }
}

const entenderDocumento = lesson({
  id: 'hacer-preguntas-documento',
  title: 'Hacer preguntas a un documento',
  summary: 'Aprende a conversar con un documento sin perder de vista la fuente original.',
  whatYouCanDo: 'Puedes subir un documento y pedirle a una herramienta de IA que responda preguntas sobre su contenido. También puedes pedir que indique la página o sección que respalda cada respuesta.',
  example: 'Tengo una norma de 40 páginas y quiero conocer cuáles son sus principales obligaciones.',
  steps: ['Adjunta el documento.', 'Explica qué quieres conocer.', 'Pide que indique de dónde obtiene cada respuesta.', 'Comprueba la información en el documento original.'],
  instruction: 'Analiza este documento y explícame sus principales obligaciones. Indica la página o sección de donde obtienes cada conclusión. Si no encuentras la respuesta, dilo con claridad.',
  tools: getTools('chatgpt', 'claude', 'gemini', 'copilot', 'notebooklm'),
  caution: 'La IA puede interpretar mal un documento o completar un vacío con una suposición. Comprueba siempre lo importante en la fuente original.',
  responsible: 'No compartas información sensible sin autorización. Si el documento contiene datos personales, usa una copia desidentificada cuando sea posible.',
  further: 'En el siguiente paso puedes definir un formato fijo de respuesta, exigir una tabla de evidencias o comparar el documento con una versión anterior.',
  contextVariants: contextVariants({
    derecho: { example: 'Tengo una resolución administrativa y quiero ubicar sus obligaciones, plazos y excepciones.', note: 'Pide que separe texto literal, interpretación y puntos que necesitan revisión profesional.' },
    administracion: { example: 'Tengo un procedimiento interno y quiero convertirlo en una lista clara de responsabilidades y plazos.', note: 'Pide que conserve los nombres de las áreas y la sección que sustenta cada paso.' },
    'sector-publico': { example: 'Tengo una directiva y quiero encontrar qué debe hacer cada unidad y desde cuándo.', note: 'Pide que identifique la fecha de vigencia y las disposiciones transitorias.' },
  }),
})

const mejorarTexto = lesson({
  id: 'mejorar-un-texto',
  title: 'Mejorar un texto',
  summary: 'Haz que un texto sea más claro sin perder su intención ni su información importante.',
  whatYouCanDo: 'Puedes pedir que un borrador sea más claro, directo y adecuado para una audiencia concreta. La instrucción puede exigir que no se inventen datos ni se cambie el sentido.',
  example: 'Tengo un correo largo para explicar un cambio de procedimiento y quiero que se entienda en una sola lectura.',
  steps: ['Pega el texto y explica quién lo leerá.', 'Indica qué debe conservarse.', 'Pide una versión mejorada y una breve lista de cambios.', 'Revisa que la versión final mantenga tu intención.'],
  instruction: 'Mejora la claridad de este texto para [audiencia]. Conserva todos los datos, fechas y compromisos. No inventes información. Devuélveme primero la versión revisada y luego tres cambios importantes que hayas hecho.',
  tools: getTools('chatgpt', 'claude', 'copilot', 'jenni-ai'),
  recommendation: { title: 'Sugerencia para oficina', body: 'Si trabajas en Word o Excel, prueba Microsoft Copilot: está integrado en Microsoft 365 y puede ayudarte a reescribir, ampliar o mejorar textos dentro del flujo de trabajo.', toolId: 'copilot' },
  caution: 'Una redacción más fluida puede ocultar un cambio de sentido. Compara la versión revisada con tu borrador antes de enviarla.',
  responsible: 'Retira nombres, teléfonos y datos internos si no tienes autorización para compartirlos.',
  further: 'Puedes crear una guía de estilo reutilizable para que todos tus documentos mantengan el mismo tono y estructura.',
  contextVariants: contextVariants({
    educacion: { example: 'Tengo una explicación sobre evaluación formativa y quiero adaptarla para familias sin perder precisión.', note: 'Pide ejemplos sencillos, pero conserva los conceptos que deben aprenderse.' },
    negocios: { example: 'Tengo una propuesta comercial y quiero que sea más concreta para una persona que debe decidir.', note: 'Pide que distinga beneficios, condiciones y próximos pasos.' },
    administracion: { example: 'Tengo un correo o informe interno y quiero que sea claro para el equipo que debe ejecutarlo.', note: 'Conserva responsables, plazos y acciones; separa instrucciones de contexto.' },
    derecho: { example: 'Tengo un borrador administrativo y quiero mejorar su claridad sin alterar su alcance ni sus fundamentos.', note: 'Conserva citas, fechas y términos; pide que marque cualquier cambio que pueda modificar el sentido.' },
    ingenieria: { example: 'Tengo una nota técnica y quiero que sea más clara para una revisión de proyecto.', note: 'Conserva unidades, supuestos y condiciones; pide que no simplifique una limitación técnica importante.' },
  }),
})

const investigarFuentes = lesson({
  id: 'investigar-con-fuentes',
  title: 'Investigar con fuentes',
  summary: 'Convierte una pregunta amplia en una búsqueda que puedas revisar y sostener.',
  whatYouCanDo: 'Puedes pedir ayuda para delimitar un tema, encontrar fuentes iniciales y organizar lo que cada fuente realmente afirma. La herramienta no reemplaza la lectura de las fuentes.',
  example: 'Necesito entender qué cambios recientes afectan a un procedimiento y quiero comparar fuentes oficiales.',
  steps: ['Formula la pregunta y el país o periodo.', 'Pide fuentes primarias y separa las secundarias.', 'Abre cada enlace y comprueba la fecha.', 'Organiza los hallazgos y las dudas que quedan abiertas.'],
  instruction: 'Investiga este tema para el contexto de [país/organización] y el periodo [fechas]. Prioriza fuentes primarias. Para cada hallazgo, indica el enlace, la fecha y qué parte de la fuente lo respalda. Separa hechos comprobados de interpretaciones.',
  tools: getTools('perplexity', 'chatgpt', 'gemini', 'notebooklm'),
  caution: 'Una respuesta con enlaces no garantiza que las fuentes digan lo que la respuesta afirma. Abre y lee cada fuente relevante.',
  responsible: 'No uses una búsqueda generada como única base para una decisión legal, médica o financiera.',
  further: 'Puedes diseñar una matriz de fuentes con criterios de autoridad, fecha, alcance y coincidencias entre documentos.',
  contextVariants: contextVariants({
    investigacion: { example: 'Quiero revisar investigaciones sobre aprendizaje activo y distinguir revisiones, estudios y opiniones.', note: 'Pide que identifique método, muestra y limitaciones antes de resumir conclusiones.' },
    derecho: { example: 'Quiero ubicar la normativa y jurisprudencia relacionada con una pregunta concreta.', note: 'Pide separar norma vigente, antecedentes y criterios que no sean vinculantes.' },
  }),
})

const analizarTabla = lesson({
  id: 'analizar-una-tabla',
  title: 'Analizar una tabla',
  summary: 'Haz preguntas sobre tus datos antes de saltar a un gráfico o una conclusión.',
  whatYouCanDo: 'Puedes cargar una tabla y pedir que describa columnas, detecte valores faltantes, encuentre patrones y proponga preguntas. La interpretación final sigue siendo tuya.',
  example: 'Tengo un registro de atenciones y quiero saber en qué periodos se concentran los casos y qué datos necesitan revisión.',
  steps: ['Explica qué representa cada fila.', 'Pide una revisión de calidad y valores faltantes.', 'Haz preguntas concretas sobre periodos, categorías o diferencias.', 'Comprueba los cálculos con una muestra de filas.'],
  instruction: 'Analiza esta tabla como si fueras un asistente de revisión. Primero describe las columnas y los valores faltantes. Luego encuentra patrones o diferencias relevantes, muestra cómo llegaste a cada conclusión y señala qué no puede saberse con estos datos.',
  tools: getTools('chatgpt', 'copilot', 'gemini'),
  caution: 'Un patrón en una tabla no demuestra por sí solo una causa. Revisa el periodo, la definición de cada columna y los registros atípicos.',
  responsible: 'Evita cargar datos personales o confidenciales sin autorización. Trabaja con una copia mínima y desidentificada.',
  further: 'El siguiente paso puede ser convertir esta revisión en un flujo repetible con las mismas comprobaciones cada semana.',
  contextVariants: contextVariants({
    administracion: { example: 'Tengo una tabla de expedientes y quiero ver tiempos de atención y registros incompletos.', note: 'Pide que distinga demora, volumen y calidad del registro para no mezclar indicadores.' },
    ingenieria: { example: 'Tengo mediciones de campo y quiero ubicar lecturas atípicas antes de preparar el informe.', note: 'Pide que conserve unidades y marque los valores que requieren validación técnica.' },
  }),
})

const crearPresentacion = lesson({
  id: 'crear-una-presentacion',
  title: 'Crear una presentación',
  summary: 'Pasa de una idea o un informe a una historia que una audiencia pueda seguir.',
  whatYouCanDo: 'Puedes pedir una estructura de presentación, ordenar un argumento y convertir cada parte en una diapositiva con una idea principal. La herramienta ayuda con el borrador, no decide por tu audiencia.',
  example: 'Tengo un informe técnico y necesito explicar sus hallazgos a un equipo que no conoce todos los detalles.',
  steps: ['Define quién escuchará y qué debe decidir.', 'Entrega el material de origen y el tiempo disponible.', 'Pide una idea principal por diapositiva.', 'Revisa cifras, fuentes y el hilo antes de diseñar.'],
  instruction: 'Convierte este informe en una presentación de [número] diapositivas para [audiencia]. Define una idea principal por diapositiva, evidencia que la respalde y una transición clara. No inventes cifras. Termina con la decisión o acción esperada.',
  tools: getTools('chatgpt', 'gemini', 'copilot'),
  caution: 'Una presentación puede sonar convincente aunque omita matices. Revisa las fuentes y conserva las limitaciones del informe.',
  responsible: 'Confirma que puedes compartir las imágenes, datos y nombres que incluirás en la presentación.',
  further: 'Puedes crear una plantilla de instrucciones para que todas tus presentaciones tengan una estructura consistente.',
  contextVariants: contextVariants({
    educacion: { example: 'Tengo una unidad didáctica y quiero convertirla en una secuencia visual que ayude a comprender un concepto.', note: 'Pide una pregunta guía y una actividad breve, no solo texto en diapositivas.' },
    'sector-publico': { example: 'Tengo un informe de gestión y quiero explicar sus resultados y próximos pasos a la comunidad.', note: 'Pide lenguaje claro, fuentes visibles y una separación nítida entre datos y propuesta.' },
  }),
})

const automatizarTarea = lesson({
  id: 'automatizar-una-tarea',
  title: 'Automatizar una tarea repetitiva',
  summary: 'Descompón una tarea repetitiva antes de decidir qué parte conviene automatizar.',
  whatYouCanDo: 'Puedes describir un proceso, encontrar pasos repetitivos y diseñar un flujo con entradas, transformaciones, revisión humana y salida. Primero se diseña y prueba en pequeño.',
  example: 'Cada semana recibo archivos con el mismo formato, debo extraer algunos campos y preparar un resumen para revisión.',
  steps: ['Describe el proceso actual y sus excepciones.', 'Separa decisiones humanas de pasos mecánicos.', 'Diseña una prueba con pocos archivos y una salida esperada.', 'Mide errores y agrega una revisión antes de usarlo en producción.'],
  instruction: 'Ayúdame a descomponer esta tarea repetitiva: [describe la tarea]. Identifica entradas, pasos, decisiones, excepciones y salida. Propón un flujo pequeño para probar, indica dónde debe intervenir una persona y define cómo verificar que el resultado sea correcto.',
  tools: getTools('chatgpt', 'claude', 'gemini', 'zapier', 'make', 'n8n'),
  caution: 'Automatizar un proceso confuso solo hace que los errores se repitan más rápido. Prueba con casos conocidos y conserva una revisión humana.',
  responsible: 'Define quién puede acceder a la información y dónde se guardan los archivos antes de conectar herramientas.',
  accessLevel: 'advanced',
  further: 'Puedes convertir el flujo probado en una integración, un script o una herramienta interna con registros y control de errores.',
  contextVariants: contextVariants({
    administracion: { example: 'Cada mes recibo solicitudes con formatos parecidos y debo clasificarlas antes de derivarlas.', note: 'Pide reglas visibles y una bandeja de excepciones para los casos que no encajan.' },
    ingenieria: { example: 'Recibo reportes de medición y necesito validar campos antes de consolidarlos.', note: 'Pide que cada validación tenga un mensaje de error comprensible y trazable.' },
  }),
})

const simpleLesson = (id: string, title: string, summary: string, instruction: string, toolsForLesson: string[]): LearningCard => lesson({
  id,
  title,
  summary,
  whatYouCanDo: summary,
  example: 'Tengo una tarea concreta y quiero obtener un primer resultado que pueda revisar.',
  steps: ['Explica el objetivo y el contexto.', 'Entrega solo la información necesaria.', 'Pide que muestre sus supuestos.', 'Revisa el resultado antes de usarlo.'],
  instruction,
  tools: getTools(...toolsForLesson),
  caution: 'La IA puede equivocarse. Revisa el resultado en la fuente o el material original.',
  responsible: 'No compartas información sensible sin autorización.',
  further: 'Cuando el primer resultado sea útil, puedes convertir tus criterios en una instrucción reutilizable.',
  contextVariants: contextVariants({}),
})

export const capabilities: Capability[] = [
  {
    id: 'escribir', label: 'ESCRIBIR', description: 'Convertir una idea en un texto útil.', shape: 'circle', accent: 'coral', question: '¿Qué quieres escribir?',
    children: [
      { id: 'mejorar-un-texto', label: 'Mejorar un texto', description: 'Más claro, sin perder el sentido.', shape: 'document', accent: 'coral', lesson: mejorarTexto },
      { id: 'preparar-un-informe', label: 'Preparar un informe', description: 'Ordenar hallazgos y próximos pasos.', shape: 'document', accent: 'mustard', lesson: simpleLesson('preparar-informe', 'Preparar un informe', 'Puedes ordenar información dispersa en una estructura que haga visibles los hallazgos, las evidencias y los pendientes.', 'Organiza esta información en un informe para [audiencia]. Separa hechos, interpretación, pendientes y próximos pasos. No inventes datos.', ['chatgpt', 'claude']) },
      { id: 'preparar-un-correo', label: 'Preparar un correo', description: 'Ir al punto con un tono adecuado.', shape: 'document', accent: 'teal', lesson: simpleLesson('preparar-correo', 'Preparar un correo', 'Puedes transformar una idea o una situación en un correo breve, claro y con un siguiente paso concreto.', 'Redacta un correo para [persona] con este objetivo: [objetivo]. Usa un tono [tono], conserva estos datos y termina con una acción clara.', ['chatgpt', 'copilot']) },
    ],
  },
  {
    id: 'entender', label: 'ENTENDER', description: 'Encontrar sentido en información compleja.', shape: 'triangle', accent: 'coral', question: '¿Qué quieres entender?',
    children: [
      { id: 'un-documento', label: 'Un documento', description: 'Leerlo, preguntarlo y comprobarlo.', shape: 'document', accent: 'coral', question: '¿Qué quieres hacer con el documento?', children: [
        { id: 'resumir-documento', label: 'Resumirlo', description: 'Conservar lo más importante.', shape: 'document', accent: 'mustard', lesson: simpleLesson('resumir-documento', 'Resumir un documento', 'Puedes pedir un resumen ajustado a tu objetivo, con las ideas principales y la evidencia que las respalda.', 'Resume este documento para [audiencia]. Separa ideas principales, datos importantes y asuntos pendientes. Indica la página o sección de cada punto.', ['chatgpt', 'claude', 'gemini']) },
        { id: 'hacer-preguntas', label: 'Hacer preguntas', description: 'Obtener respuestas con referencias.', shape: 'search', accent: 'coral', lesson: entenderDocumento },
        { id: 'encontrar-informacion-importante', label: 'Encontrar información importante', description: 'Ubicar fechas, obligaciones o cifras.', shape: 'grid', accent: 'teal', lesson: simpleLesson('encontrar-informacion', 'Encontrar información importante', 'Puedes pedir que localice datos concretos y que te indique dónde aparecen para revisarlos rápidamente.', 'Encuentra en este documento todas las fechas, obligaciones y cifras relacionadas con [tema]. Devuelve una tabla con el dato y su página o sección.', ['chatgpt', 'claude']) },
      ] },
      { id: 'muchos-documentos', label: 'Muchos documentos', description: 'Comparar temas y diferencias.', shape: 'grid', accent: 'mustard', lesson: simpleLesson('comparar-documentos', 'Comparar documentos', 'Puedes comparar varios documentos con criterios explícitos y hacer visibles sus coincidencias y diferencias.', 'Compara estos documentos según [criterios]. Devuelve coincidencias, diferencias y puntos que no pueden determinarse con la información disponible.', ['chatgpt', 'claude']) },
      { id: 'una-norma', label: 'Una norma', description: 'Entender obligaciones y excepciones.', shape: 'document', accent: 'teal', lesson: simpleLesson('analizar-norma', 'Analizar una norma', 'Puedes convertir una norma extensa en una guía de lectura con obligaciones, responsables, plazos y excepciones.', 'Analiza esta norma. Identifica obligaciones, responsables, plazos, excepciones y fecha de vigencia. Cita la sección que sustenta cada punto.', ['chatgpt', 'claude', 'gemini']) },
    ],
  },
  {
    id: 'buscar', label: 'BUSCAR', description: 'Investigar sin perder las fuentes.', shape: 'search', accent: 'teal', question: '¿Qué quieres buscar?',
    children: [
      { id: 'investigar-con-fuentes', label: 'Investigar con fuentes', description: 'Pasar de una pregunta a evidencia revisable.', shape: 'search', accent: 'teal', lesson: investigarFuentes },
      { id: 'encontrar-antecedentes', label: 'Encontrar antecedentes', description: 'Saber qué se ha dicho antes.', shape: 'document', accent: 'mustard', lesson: simpleLesson('antecedentes', 'Encontrar antecedentes', 'Puedes construir una primera cronología de antecedentes y decidir qué documentos vale la pena leer completos.', 'Busca antecedentes sobre [tema] en [contexto]. Ordénalos por fecha, enlaza la fuente y explica por qué cada uno es relevante.', ['perplexity', 'chatgpt']) },
      { id: 'verificar-informacion', label: 'Verificar información', description: 'Comprobar una afirmación.', shape: 'grid', accent: 'coral', lesson: simpleLesson('verificar-informacion', 'Verificar información', 'Puedes convertir una afirmación en una lista de comprobaciones y buscar evidencia que la confirme o la contradiga.', 'Verifica esta afirmación: [afirmación]. Busca fuentes primarias, indica la fecha y separa evidencia a favor, en contra y lo que aún no se puede concluir.', ['perplexity', 'gemini']) },
    ],
  },
  {
    id: 'analizar', label: 'ANALIZAR', description: 'Hacer preguntas mejores a tus datos.', shape: 'grid', accent: 'mustard', question: '¿Qué quieres analizar?',
    children: [
      { id: 'analizar-una-tabla', label: 'Analizar una tabla', description: 'Detectar patrones y datos por revisar.', shape: 'table', accent: 'mustard', lesson: analizarTabla },
      { id: 'encontrar-patrones', label: 'Encontrar patrones', description: 'Observar repeticiones y diferencias.', shape: 'grid', accent: 'teal', lesson: simpleLesson('encontrar-patrones', 'Encontrar patrones', 'Puedes pedir que busque repeticiones, concentraciones y cambios, siempre dejando claro qué datos los sostienen.', 'Encuentra patrones en estos datos. Explica qué filas o columnas sostienen cada patrón y qué explicaciones alternativas deberían revisarse.', ['chatgpt', 'copilot']) },
      { id: 'detectar-inconsistencias', label: 'Detectar inconsistencias', description: 'Encontrar registros que no cuadran.', shape: 'circle', accent: 'coral', lesson: simpleLesson('detectar-inconsistencias', 'Detectar inconsistencias', 'Puedes revisar formatos, rangos, duplicados y relaciones que no se comportan como esperabas.', 'Revisa estos datos en busca de duplicados, valores faltantes, formatos distintos y relaciones imposibles. Devuelve una lista de casos y cómo verificarlos.', ['chatgpt', 'gemini']) },
    ],
  },
  {
    id: 'crear', label: 'CREAR', description: 'Dar forma a una idea para compartirla.', shape: 'spark', accent: 'mustard', question: '¿Qué quieres crear?',
    children: [
      { id: 'crear-una-presentacion', label: 'Crear una presentación', description: 'Contar una historia clara con evidencia.', shape: 'spark', accent: 'mustard', lesson: crearPresentacion },
      { id: 'crear-una-infografia', label: 'Crear una infografía', description: 'Hacer visible una idea o proceso.', shape: 'grid', accent: 'teal', lesson: simpleLesson('crear-infografia', 'Crear una infografía', 'Puedes definir la estructura de una infografía antes de diseñarla y comprobar que cada elemento tiene una función.', 'Propón una infografía sobre [tema] para [audiencia]. Define la idea principal, secciones, datos que debe mostrar y una fuente para cada dato.', ['chatgpt', 'gemini']) },
      { id: 'material-educativo', label: 'Crear material educativo', description: 'Convertir un objetivo en una actividad.', shape: 'triangle', accent: 'green', lesson: simpleLesson('material-educativo', 'Crear material educativo', 'Puedes diseñar una actividad alrededor de un objetivo de aprendizaje y adaptarla a un grupo concreto.', 'Diseña una actividad sobre [tema] para [grupo]. Incluye objetivo, instrucciones, materiales, una forma de comprobar comprensión y una adaptación posible.', ['chatgpt', 'claude']) },
    ],
  },
  {
    id: 'construir', label: 'CONSTRUIR', description: 'Convertir una tarea en un sistema.', shape: 'hexagon', accent: 'green', question: '¿Qué quieres construir?',
    children: [
      { id: 'automatizar-una-tarea', label: 'Automatizar una tarea repetitiva', description: 'Diseñar un flujo pequeño y verificable.', shape: 'flow', accent: 'green', lesson: automatizarTarea },
      { id: 'crear-un-flujo', label: 'Crear un flujo de trabajo', description: 'Ordenar entradas, decisiones y salidas.', shape: 'flow', accent: 'teal', lesson: simpleLesson('crear-flujo', 'Crear un flujo de trabajo', 'Puedes dibujar un proceso y convertirlo en pasos que otra persona pueda entender, revisar y mejorar.', 'Describe este proceso como un flujo: [proceso]. Enumera entradas, decisiones, responsables, salidas y excepciones. Señala qué parte conviene probar primero.', ['chatgpt', 'claude', 'zapier', 'make', 'n8n']) },
      { id: 'herramienta-interna', label: 'Construir una herramienta interna', description: 'Pasar de una necesidad a un prototipo.', shape: 'hexagon', accent: 'coral', lesson: simpleLesson('herramienta-interna', 'Construir una herramienta interna', 'Puedes convertir una necesidad repetida en una especificación de prototipo con usuarios, datos, acciones y límites.', 'Convierte esta necesidad en una especificación de herramienta interna: [necesidad]. Incluye usuarios, entradas, acciones, permisos, errores y una primera versión pequeña. Indica si conviene implementarla con OpenAI Codex o Claude Code y por qué.', ['codex', 'claude-code', 'chatgpt', 'claude']) },
    ],
  },
]

export function getCapability(id: Capability['id']) {
  return capabilities.find((capability) => capability.id === id) ?? capabilities[0]
}

export function findChoice(capability: Capability, id: string): Choice | undefined {
  for (const choice of capability.children ?? []) {
    if (choice.id === id) return choice
    const nested = choice.children?.find((child) => child.id === id)
    if (nested) return nested
  }
  return undefined
}
