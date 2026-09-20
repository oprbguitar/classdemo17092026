import type { Tool } from '../types/content'

export function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <a className="tool-badge" href={tool.website} target="_blank" rel="noreferrer">
      <span className="tool-badge__dot" aria-hidden="true" />
      <span>{tool.name}</span>
    </a>
  )
}
