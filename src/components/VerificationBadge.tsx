import type { VerificationStatus } from '../types/content'

export function VerificationBadge({ verification }: { verification: VerificationStatus }) {
  return (
    <span className="verification-badge" title={`Estado: ${verification.state}`}>
      <span aria-hidden="true">✓</span> {verification.state} · actualizado: {verification.updatedAt}
    </span>
  )
}
