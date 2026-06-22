import Link from 'next/link'
import { authorNameToSlug } from '@/lib/authors'
import type { Author } from '@/lib/blog'
import SocialLinks from './SocialLinks'

interface AuthorBioProps {
  authors: Author[]
}

// "About the author" block shown at the end of a post for any author with a bio.
export default function AuthorBio({ authors }: AuthorBioProps) {
  const withBio = authors.filter((a) => a.bio)
  if (withBio.length === 0) return null

  return (
    <section className="author-bios" aria-label="About the author">
      {withBio.map((a) => (
        <div key={a.name} className="author-bio">
          {a.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.avatar} alt={a.name} className="author-bio-avatar" />
          )}
          <div className="author-bio-body">
            <p className="author-bio-name">
              <Link href={`/blog/authors/${authorNameToSlug(a.name)}`}>{a.name}</Link>
              {a.title && <span className="author-bio-title">{a.title}</span>}
            </p>
            <p className="author-bio-text">{a.bio}</p>
            <div className="author-bio-links">
              <Link href={`/blog/authors/${authorNameToSlug(a.name)}`} className="author-bio-more">
                More posts →
              </Link>
              <SocialLinks author={a} />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
