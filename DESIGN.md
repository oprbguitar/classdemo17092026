# Pizarra IA — dirección de producto y diseño

## Dirección

- **Modo:** explore, con un flujo de lectura/aprendizaje práctico.
- **Usuario principal:** persona adulta que necesita resolver una tarea de trabajo y todavía no conoce bien la IA.
- **Tarea principal:** elegir una intención, responder una pregunta sencilla y llegar a una instrucción que pueda probar.
- **Dirección visual:** línea de tiempo por fases con tinta oscura, superficie marfil y ámbar vivo; el rail de fases guía el avance y el canvas central concentra el trabajo.
- **Tipografía:** Archivo para títulos, Public Sans para lectura y controles, y JetBrains Mono para instrucciones copiables y metadatos.
- **Motion:** continuo y escalonado: 220 ms para revelar una decisión, 40 ms entre elementos; se desactiva con `prefers-reduced-motion`.

## Decisión estructural

El selector de Pierre asignó `Línea de tiempo por fases`. Se conserva la exploración progresiva de la pizarra y se adapta la lección a un **espacio de trabajo de tres zonas**: rail izquierdo para volver y cambiar de fase, canvas central para contenido y práctica, y rail derecho para proveedores secundarios.

## Tokens

Los tokens viven en `src/styles/tokens.css` y son la única fuente de color, tipografía, espacio, forma y motion. El radio es 0 para sostener la geometría de bloques. El ámbar comunica avance y selección; los colores secundarios siguen reservados para las formas del mapa de decisiones.

## Sistema de interfaz

- `AppShell`: marca mínima, principio de producto y lienzo central.
- `LearningBoard`: cambia entre inicio, preguntas y lección sin recarga.
- `ChoiceCard`: elección táctil con forma geométrica, hover, pressed y focus-visible.
- `ContextTrail`: contexto clicable sin barra lateral.
- `LearningCard`: encabezado de lección y canvas compuesto por `PhaseRail`, `PhaseCanvas` y el panel lateral de proveedores.
- `PhaseRail` y `PhaseCanvas`: tres capas informativas —Hacer, Hacerlo mejor y Crear un sistema— con contenido, instrucciones y checklist propios.
- `ToolBadge` y `ProviderLogo`: botones de selección con logos SVG code-native, estado activo, explicación del proveedor y enlace externo.
- `CopyButton`: copia instrucciones y comunica el resultado de forma accesible.
- `VerificationBadge` y `ResponsibleNotice`: confianza y uso responsable sin interrumpir el flujo.

## Responsive y accesibilidad

La cuadrícula inicial es 3 × 2 en escritorio y 2 × 3 en móvil. La lección pasa a tres columnas en escritorio y se apila en móvil: rail de fases, canvas y proveedores. El contenido tiene un máximo de 1180 px y no usa scroll horizontal. Se verifican 360, 390, 768, 1280 y 1600 px. Todos los controles son botones semánticos de al menos 44 px, con focus-visible visible y estados nombrados además del color.

## Anti-patrones evitados

No hay login, métricas inventadas, gamificación, gradientes, sombras decorativas, hero de marketing ni una pared de tarjetas. El panel de proveedores es contextual, no un catálogo: solo aparece dentro de una lección y ofrece información accionable.
