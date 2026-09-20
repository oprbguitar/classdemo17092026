import type { Geometry } from '../types/content'

interface GeometricMarkProps {
  shape: Geometry
  accent?: string
  size?: 'small' | 'large'
}

export function GeometricMark({ shape, accent = 'currentColor', size = 'large' }: GeometricMarkProps) {
  return (
    <svg className={`geometric-mark geometric-mark--${size}`} viewBox="0 0 48 48" aria-hidden="true">
      {shape === 'circle' && <circle cx="24" cy="24" r="13" fill="none" stroke={accent} strokeWidth="3" />}
      {shape === 'triangle' && <path d="M24 9 39 37H9L24 9Z" fill="none" stroke={accent} strokeWidth="3" strokeLinejoin="round" />}
      {shape === 'search' && <><circle cx="21" cy="21" r="10" fill="none" stroke={accent} strokeWidth="3" /><path d="m29 29 10 10" stroke={accent} strokeWidth="3" strokeLinecap="square" /></>}
      {shape === 'grid' && <><rect x="10" y="10" width="10" height="10" fill="none" stroke={accent} strokeWidth="2.5" /><rect x="28" y="10" width="10" height="10" fill="none" stroke={accent} strokeWidth="2.5" /><rect x="10" y="28" width="10" height="10" fill="none" stroke={accent} strokeWidth="2.5" /><rect x="28" y="28" width="10" height="10" fill="none" stroke={accent} strokeWidth="2.5" /></>}
      {shape === 'spark' && <path d="m24 6 3.6 13.4L41 24l-13.4 4.6L24 42l-3.6-13.4L7 24l13.4-4.6L24 6Z" fill="none" stroke={accent} strokeWidth="3" strokeLinejoin="round" />}
      {shape === 'hexagon' && <path d="m15 9 18 0 9 15-9 15H15L6 24l9-15Z" fill="none" stroke={accent} strokeWidth="3" strokeLinejoin="round" />}
      {shape === 'document' && <><path d="M14 7h14l7 7v27H14V7Z" fill="none" stroke={accent} strokeWidth="2.6" strokeLinejoin="round" /><path d="M28 7v8h7M19 23h11M19 30h11" stroke={accent} strokeWidth="2.6" /></>}
      {shape === 'table' && <><rect x="8" y="10" width="32" height="28" fill="none" stroke={accent} strokeWidth="2.6" /><path d="M8 19h32M8 28h32M19 10v28M30 10v28" stroke={accent} strokeWidth="2.2" /></>}
      {shape === 'flow' && <><rect x="7" y="9" width="12" height="10" fill="none" stroke={accent} strokeWidth="2.4" /><rect x="29" y="29" width="12" height="10" fill="none" stroke={accent} strokeWidth="2.4" /><path d="M19 14h9v20h1M25 29l4 5-4 5" fill="none" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" /></>}
    </svg>
  )
}
