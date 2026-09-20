import type { Tool } from '../types/content'
import { ProviderLogo } from './ProviderLogo'

interface ToolBadgeProps {
  tool: Tool
  selected: boolean
  onSelect: () => void
}

export function ToolBadge({ tool, selected, onSelect }: ToolBadgeProps) {
  return (
    <div className={selected ? 'tool-option is-selected' : 'tool-option'}>
      <button className="tool-option__button" type="button" aria-pressed={selected} onClick={onSelect}>
        <ProviderLogo provider={tool.id} />
        <span>{tool.name}</span>
      </button>
      <a className="tool-option__link" href={tool.website} target="_blank" rel="noreferrer" aria-label={`Visitar ${tool.name}`}>Web ↗</a>
    </div>
  )
}
