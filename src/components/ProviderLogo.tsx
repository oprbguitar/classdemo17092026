interface ProviderLogoProps {
  provider: string
  size?: 'small' | 'large'
}

export function ProviderLogo({ provider, size = 'small' }: ProviderLogoProps) {
  return (
    <svg className={`provider-logo provider-logo--${size} provider-logo--${provider}`} viewBox="0 0 40 40" aria-hidden="true">
      {provider === 'chatgpt' && (
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
          <path d="M20 5.8c3.8 0 6.8 3.1 6.8 6.8v3.1l2.7-1.6c3.3-1.9 7.4-.8 9.3 2.5 1.9 3.3.8 7.4-2.5 9.3l-2.7 1.6 2.7 1.6c3.3 1.9 4.4 6 2.5 9.3-1.9 3.3-6 4.4-9.3 2.5l-2.7-1.6v3.1c0 3.8-3.1 6.8-6.8 6.8s-6.8-3.1-6.8-6.8v-3.1l-2.7 1.6c-3.3 1.9-7.4.8-9.3-2.5-1.9-3.3-.8-7.4 2.5-9.3l2.7-1.6-2.7-1.6c-3.3-1.9-4.4-6-2.5-9.3 1.9-3.3 6-4.4 9.3-2.5l2.7 1.6v-3.1C13.2 8.9 16.2 5.8 20 5.8Z" transform="translate(-6 -6) scale(1.3)" />
          <path d="m14.8 20 5.2 3 5.2-3M20 23v6M20 17v6" />
        </g>
      )}
      {provider === 'claude' && <path fill="currentColor" d="m20 3 2.6 13.8L36 20l-13.4 3.2L20 37l-2.6-13.8L4 20l13.4-3.2L20 3Z" />}
      {provider === 'gemini' && <path fill="currentColor" d="M20 3 24 16l13 4-13 4-4 13-4-13-13-4 13-4 4-13Z" />}
      {provider === 'copilot' && (
        <g fill="none" stroke="currentColor" strokeWidth="2.4">
          <rect x="5" y="9" width="19" height="19" rx="4" />
          <rect x="16" y="12" width="19" height="19" rx="4" opacity=".55" />
        </g>
      )}
      {provider === 'perplexity' && (
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2">
          <circle cx="20" cy="20" r="8" />
          <path d="M20 3v5M20 32v5M3 20h5M32 20h5M8 8l3.5 3.5M28.5 28.5 32 32M32 8l-3.5 3.5M11.5 28.5 8 32" />
        </g>
      )}
    </svg>
  )
}
