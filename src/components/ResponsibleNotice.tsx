import type { ReactNode } from 'react'

export function ResponsibleNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="responsible-notice" role="note">
      <span className="responsible-notice__mark" aria-hidden="true">!</span>
      <span><strong>Ten en cuenta</strong>{children}</span>
    </aside>
  )
}
