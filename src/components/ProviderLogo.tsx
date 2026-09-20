interface ProviderLogoProps {
  provider: string
  size?: 'small' | 'large'
}

const providerAssets: Record<string, string> = {
  chatgpt: 'openai.svg',
  claude: 'claude.svg',
  gemini: 'gemini.svg',
  copilot: 'copilot.svg',
  perplexity: 'perplexity.svg',
  codex: 'openai.svg',
  'claude-code': 'claude.svg',
  notebooklm: 'gemini.svg',
}

export function ProviderLogo({ provider, size = 'small' }: ProviderLogoProps) {
  const asset = providerAssets[provider]
  if (!asset) return null

  return <img className={`provider-logo provider-logo--${size}`} src={`${import.meta.env.BASE_URL}providers/${asset}`} alt="" aria-hidden="true" />
}
