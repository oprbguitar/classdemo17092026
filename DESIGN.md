# Pizarra IA — dirección de producto y diseño

## Dirección

- **Modo:** explore, con un flujo de lectura/aprendizaje práctico.
- **Usuario principal:** persona adulta que necesita resolver una tarea de trabajo y todavía no conoce bien la IA.
- **Tarea principal:** elegir una intención, responder una pregunta sencilla y llegar a una instrucción que pueda probar.
- **Dirección visual:** lienzo editorial de bloques, papel casi blanco, tinta oscura y rojo controlado para acción; formas geométricas como lenguaje de orientación.
- **Tipografía:** IBM Plex Sans para lectura y controles; IBM Plex Mono solo para instrucciones copiables y metadatos.
- **Motion:** continuo y escalonado: 220 ms para revelar una decisión, 40 ms entre elementos; se desactiva con `prefers-reduced-motion`.

## Decisión estructural

El selector de Pierre asignó `Command bar + tabla maestra`, pero esa estructura entraría en conflicto con el requisito central de una pizarra progresiva sin dashboard. Se conserva su disciplina de bloques, separadores y densidad media-alta, y se adapta el layout a un **lienzo de decisión progresiva**: una sola pregunta protagonista, elecciones abiertas y una lección que se revela solo al llegar a ella.

## Tokens

Los tokens viven en `src/styles/tokens.css` y son la única fuente de color, tipografía, espacio, forma y motion. El radio es 0 para sostener la geometría de bloques. El acento rojo solo comunica acción o selección; mostaza, teal y verde aparecen en las formas, no como superficies decorativas.

## Sistema de interfaz

- `AppShell`: marca mínima, principio de producto y lienzo central.
- `LearningBoard`: cambia entre inicio, preguntas y lección sin recarga.
- `ChoiceCard`: elección táctil con forma geométrica, hover, pressed y focus-visible.
- `ContextTrail`: contexto clicable sin barra lateral.
- `LearningCard`: secciones Qué puedes hacer, Ejemplo, Pruébalo, instrucción, herramientas y Ten en cuenta.
- `CopyButton`: copia instrucciones y comunica el resultado de forma accesible.
- `VerificationBadge` y `ResponsibleNotice`: confianza y uso responsable sin interrumpir el flujo.

## Responsive y accesibilidad

La cuadrícula es 3 × 2 en escritorio y 2 × 3 en móvil. El contenido tiene un máximo de 1180 px y no usa scroll horizontal. Se verifican 360, 390, 768, 1280 y 1600 px. Todos los controles son botones semánticos de al menos 44 px, con focus-visible visible y estados nombrados además del color.

## Anti-patrones evitados

No hay sidebar, login, métricas, gamificación, catálogo de marcas, gradientes, sombras decorativas, hero de marketing ni una pared de tarjetas. La marca es secundaria frente a la tarea.
