# Pizarra IA

MVP funcional de un portal de aprendizaje práctico de inteligencia artificial. La experiencia empieza con una necesidad —«¿Qué quieres hacer hoy?»— y revela solo la siguiente decisión necesaria hasta llegar a una instrucción que la persona puede probar.

## Principio de producto

> No enseñamos herramientas. Enseñamos posibilidades.

El portal no se organiza por marcas ni por profesiones. El contenido parte de seis intenciones universales: escribir, entender, buscar, analizar, crear y construir. Las marcas aparecen únicamente dentro de una lección, como información secundaria.

## Qué incluye v0.1.0

- Seis ramas principales con navegación progresiva y contexto clicable.
- Flujo completo `Entender → Un documento → Hacer preguntas`.
- Lecciones de ejemplo para mejorar un texto, investigar con fuentes, analizar una tabla, crear una presentación y automatizar una tarea repetitiva.
- Instrucciones copiables, avisos de uso responsable, estado de verificación y selector de contexto profesional.
- Arquitectura extensible para herramientas, contextos, niveles de acceso y «Ideas que funcionan».
- Interfaz responsive para móvil, tablet y escritorio sin backend ni autenticación.

## Tecnologías

React, TypeScript, Vite, CSS moderno, Vitest, Testing Library y Playwright. No se usa un framework visual ni un backend en esta primera versión.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Para validar la versión de producción:

```bash
npm test
npm run lint
npm run build
npm run preview
```

El build usa `/classdemo17092026/` como base para GitHub Pages. En desarrollo usa `/`.

## Arquitectura

```text
src/
  components/       piezas de interfaz con una responsabilidad clara
  data/             capacidades, herramientas, contextos y casos de ejemplo
  styles/           tokens y estilos responsive
  types/            contratos TypeScript del contenido
  App.tsx           estado del flujo y composición del lienzo
e2e/                recorrido Playwright del MVP
.github/workflows/  validación y publicación en GitHub Pages
DESIGN.md           dirección visual, tokens y criterios responsive
```

## Añadir una capacidad

Edita `src/data/capabilities.ts` y añade un objeto a `capabilities` con `id`, `label`, `question`, `shape`, `accent` y `children`. Cada opción debe tener `children` para abrir otra pregunta o `lesson` para terminar en una lección. Mantén el contenido en español y agrega una prueba en `src/data/flow.test.ts` para la nueva ruta.

## Añadir una herramienta

Añade un objeto en `src/data/tools.ts` con descripción, web, planes, fortalezas, limitaciones, usos recomendados y `verification`. En la lección utiliza `getTools('id')`; así la marca permanece desacoplada del árbol de capacidades.

## Actualizar verificación

Cada lección y herramienta tiene un objeto `verification` con `state` y `updatedAt`. Actualiza la fecha solo después de revisar la experiencia o la función indicada; el indicador se muestra de forma discreta junto al contenido.

## Publicación

El workflow `.github/workflows/deploy.yml` ejecuta tests, lint y build, sube `dist` y publica mediante GitHub Pages. La URL esperada, una vez habilitado Pages en el repositorio, es:

`https://oprbguitar.github.io/classdemo17092026/`

La publicación no se ejecuta desde este checkout local automáticamente. Para hacerla efectiva hay que subir el commit a `main` y activar GitHub Pages con la fuente «GitHub Actions» en la configuración del repositorio.

## Limitaciones conocidas

- El contenido es estático y las herramientas se presentan como referencias; no hay integración con modelos ni carga real de documentos.
- El navegador debe poder cargar IBM Plex Sans desde Google Fonts; existe fallback local para contextos sin red.
- La fecha de verificación representa el estado editorial del MVP, no una garantía de disponibilidad o precio de cada servicio.
