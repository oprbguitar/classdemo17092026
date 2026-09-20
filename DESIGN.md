# Nemo IA — dirección de producto y diseño

## Dirección

- **Modo:** operate, con un flujo de aprendizaje práctico que debe poder recorrerse rápidamente.
- **Usuario principal:** persona adulta que necesita resolver una tarea de trabajo y todavía no conoce bien la IA.
- **Tarea principal:** elegir una intención, responder una pregunta sencilla y llegar a una instrucción que pueda probar.
- **Dirección visual:** rail lateral + workspace centrado con pizarra, superficie clara y acento cian; la cabecera compacta aporta orientación, el canvas concentra el trabajo y el inspector lateral organiza proveedor, modelo, precio y formación.
- **Tipografía:** IBM Plex Serif para títulos, IBM Plex Sans para lectura y controles, y IBM Plex Mono para instrucciones copiables y metadatos.
- **Motion:** seco, 120–160 ms, reservado a selección, foco y feedback; se desactiva con `prefers-reduced-motion`.

## Decisión estructural

El selector de Pierre asignó `Tablero de estado por zonas`. Se conserva la progresión por fases y se adapta la lección a una **vista operativa compacta**: rail izquierdo para volver y cambiar de fase, canvas central para contenido y práctica, y rail derecho para proveedores y recomendaciones. Los prompts son largos por diseño, pero viven en un área de copia acotada para evitar una página innecesariamente alta.

## Tokens

Los tokens viven en `src/styles/tokens.css` y son la única fuente de color, tipografía, espacio, forma y motion. El radio es 0 para sostener la geometría de bloques. El naranja señal comunica avance y selección; el petróleo aparece como apoyo en recomendaciones y estados.

## Sistema de interfaz

- `AppShell`: marca mínima, principio de producto y lienzo central.
- `LearningBoard`: cambia entre inicio, preguntas y lección sin recarga.
- `ChoiceCard`: elección táctil con forma geométrica, hover, pressed y focus-visible.
- `ContextTrail`: contexto clicable sin barra lateral.
- `LearningCard`: encabezado de lección y canvas compuesto por `PhaseRail`, `PhaseCanvas` y el panel lateral de proveedores.
- `PhaseRail` y `PhaseCanvas`: tres capas informativas —Hacer, Hacerlo mejor y Crear un sistema— con contenido, instrucciones y checklist propios.
- `ToolBadge` y `ProviderLogo`: botones de selección con logos SVG locales de marca, estado activo, explicación del proveedor y enlace externo.
- `quick-recommendation` y `phase-context`: sugerencia breve para oficina y adaptación visible de instrucciones a Administración, Derecho, Ingeniería y otros perfiles.
- `CopyButton`: copia instrucciones y comunica el resultado de forma accesible.
- `VerificationBadge` y `ResponsibleNotice`: confianza y uso responsable sin interrumpir el flujo.

## Responsive y accesibilidad

La cuadrícula inicial es 3 × 2 en escritorio y 2 × 3 en móvil. La lección pasa a tres zonas compactas en escritorio y se apila en móvil: rail de fases, canvas y proveedores. La cabecera no repite la barra superior durante la lección: agrupa estado, reinicio y orientación rápida en un lateral útil. En escritorio el workspace usa hasta 1360 px, empieza antes en el viewport y cada zona puede desplazarse de forma independiente cuando el prompt o el inspector supera la altura disponible; en móvil el contenido fluye verticalmente para conservar legibilidad. El inspector concentra proveedores, recomendación de modelo, precio y rutas de formación sin reservar espacios decorativos. Se verifican 360, 768, 1280 y 1600 px. Todos los controles son botones semánticos de al menos 44 px, con focus-visible visible y estados nombrados además del color.

## Anti-patrones evitados

No hay login, métricas inventadas, gamificación, sombras decorativas, hero de marketing ni una pared de tarjetas. Los gradientes solo aparecen dentro del logotipo oficial de Microsoft Copilot. El panel de proveedores es contextual, no un catálogo: solo aparece dentro de una lección y ofrece información accionable.
