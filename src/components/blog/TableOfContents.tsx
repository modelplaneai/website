import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TocItem[]
}

// Sticky table of contents with scroll-spy. Renders as a <details> so it can
// collapse on mobile; CSS keeps it open and sticky on desktop.
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

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
      <details className="toc" open>
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
