import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'
import PostMetaRow from './PostMeta'

interface PostCardProps {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className={`post-card${featured ? ' post-card-featured' : ''}`}>
      {post.cover && (
        <div className="post-card-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="post-card-body">
        {(post.pinned || post.tags.length > 0) && (
          <div className="post-tags">
            {post.pinned && <span className="post-pin">📌 Pinned</span>}
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="post-card-title">{post.title}</h2>
        {post.description && <p className="post-card-desc">{post.description}</p>}
        <PostMetaRow
          authors={post.authors}
          date={post.date}
          readingTime={post.readingTime}
          size="sm"
          linkAuthors={false}
        />
      </div>
    </Link>
  )
}
