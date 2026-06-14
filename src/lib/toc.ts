import GithubSlugger from 'github-slugger'

export interface TocItem {
  depth: 2 | 3
  text: string
  id: string
}

// Strip the inline markdown that can appear in a heading so the TOC shows clean text.
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/_([^_]+)_/g, '$1') // italic (underscore)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> link text
    .trim()
}

// Build a table of contents from the raw MDX body. Only h2/h3 are included.
// Fenced code blocks are skipped so commented `#` lines aren't mistaken for headings.
// Slugs are generated with github-slugger so they match the ids rehype-slug assigns.
export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inFence = false
  let fenceMarker = ''

  for (const rawLine of content.split('\n')) {
    const line = rawLine.trimEnd()
    const fenceMatch = line.match(/^(```|~~~)/)
    if (fenceMatch) {
      const marker = fenceMatch[1]
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
        fenceMarker = ''
      }
      continue
    }
    if (inFence) continue

    const heading = line.match(/^(#{2,3})\s+(.*)$/)
    if (!heading) continue

    const depth = heading[1].length as 2 | 3
    const text = stripInlineMarkdown(heading[2])
    if (!text) continue
    items.push({ depth, text, id: slugger.slug(text) })
  }

  return items
}
