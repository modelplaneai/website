import type { Author } from '@/lib/blog'

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

interface PostMetaProps {
  authors: Author[]
  date: string
  readingTime: string
  size?: 'sm' | 'md'
  // Render author names as links. Disable inside a card, which is itself an
  // anchor — nested <a> is invalid HTML and breaks hydration.
  linkAuthors?: boolean
}

// Byline row: author avatars/names + published date + reading time.
export default function PostMeta({
  authors,
  date,
  readingTime,
  size = 'md',
  linkAuthors = true,
}: PostMetaProps) {
  return (
    <div className={`post-meta post-meta-${size}`}>
      {authors.length > 0 && (
        <div className="post-authors">
          {authors.some((a) => a.avatar) && (
            <div className="post-avatars">
              {authors.map(
                (a) =>
                  a.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={a.name} src={a.avatar} alt={a.name} className="post-avatar" />
                  )
              )}
            </div>
          )}
          <span className="post-author-names">
            {authors.map((a, i) => (
              <span key={a.name}>
                {a.url && linkAuthors ? (
                  <a href={a.url} target="_blank" rel="noopener noreferrer">
                    {a.name}
                  </a>
                ) : (
                  a.name
                )}
                {i < authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </span>
        </div>
      )}
      <time dateTime={date}>{formatDate(date)}</time>
      <span className="post-meta-dot">·</span>
      <span>{readingTime}</span>
    </div>
  )
}
