import type { ReactNode } from 'react'

type CalloutType = 'info' | 'tip' | 'warn'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const ICONS: Record<CalloutType, string> = {
  info: 'ℹ',
  tip: '✦',
  warn: '▲',
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-icon" aria-hidden="true">
        {ICONS[type]}
      </div>
      <div className="callout-body">
        {title && <div className="callout-title">{title}</div>}
        {children}
      </div>
    </div>
  )
}
