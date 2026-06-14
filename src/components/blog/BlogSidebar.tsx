import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'
import { formatDate } from './PostMeta'

interface BlogSidebarProps {
  recent: PostMeta[]
  tagCounts: { tag: string; count: number }[]
}

export default function BlogSidebar({ recent, tagCounts }: BlogSidebarProps) {
  return (
    <aside className="blog-sidebar">
      {recent.length > 0 && (
        <div className="sidebar-widget">
          <h2 className="sidebar-title">Recent posts</h2>
          <ul className="sidebar-recent">
            {recent.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tagCounts.length > 0 && (
        <div className="sidebar-widget">
          <h2 className="sidebar-title">Tags</h2>
          <div className="sidebar-tags">
            {tagCounts.map(({ tag, count }) => (
              <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`} className="post-tag">
                {tag} <span className="tag-count">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-widget">
        <h2 className="sidebar-title">Subscribe</h2>
        <a className="sidebar-rss" href="/feed.xml">
          <svg className="rss-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0zM2 9.86v2.95c2.36 0 4.62.94 6.29 2.61A8.88 8.88 0 0 1 10.9 22h2.95C13.85 15.46 8.54 10.14 2 9.86zM2 4v2.95c8.31.28 15 7.04 15 15.05h2.95C19.95 12.21 12.07 4.28 2 4z"
            />
          </svg>
          RSS feed
        </a>
      </div>
    </aside>
  )
}
