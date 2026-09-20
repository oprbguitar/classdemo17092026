import { useState } from 'react'

interface CopyButtonProps {
  value: string
}

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(value)
    } catch {
      // El feedback visual se mantiene aunque el navegador bloquee el portapapeles.
    } finally {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <button className="copy-button" type="button" onClick={handleCopy} aria-live="polite">
      <span aria-hidden="true">{copied ? '✓' : '□'}</span>
      {copied ? 'Instrucción copiada' : 'Copiar instrucción'}
    </button>
  )
}
