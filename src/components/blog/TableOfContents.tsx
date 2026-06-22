import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TocItem[]
}

// Sticky table of contents with scroll-spy. Renders as a <details>: open and
// sticky on desktop, collapsed but tappable on mobile so it doesn't push the
// article down.
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  // SSR renders open to match desktop; the effect collapses it on mobile.
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    const apply = () => setOpen(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === 'undefined') return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    // Track which headings are currently on screen; highlight the topmost one.
    const onScreen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target.id)
          else onScreen.delete(entry.target.id)
        }
        const firstVisible = items.find((item) => onScreen.has(item.id))
        if (firstVisible) setActiveId(firstVisible.id)
      },
      { rootMargin: '-90px 0px -70% 0px' }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="toc-wrap">
      <details className="toc" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary>On this page</summary>
        <nav aria-label="Table of contents">
          <ul>
            {items.map((item) => (
              <li key={item.id} className={`toc-d${item.depth}`}>
                <a
                  href={`#${item.id}`}
                  className={activeId === item.id ? 'active' : undefined}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </aside>
  )
}
