import { useEffect, useRef, useState } from 'react'
import type { PostMeta } from '@/lib/blog'
import PostCard from './PostCard'

const INITIAL = 9
const STEP = 6

interface PostListProps {
  posts: PostMeta[]
}

// Renders a grid of post cards, revealing more as the reader scrolls (infinite scroll).
export default function PostList({ posts }: PostListProps) {
  const [visible, setVisible] = useState(INITIAL)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Restart from the top whenever the underlying list changes (e.g. a new search).
  useEffect(() => {
    setVisible(INITIAL)
  }, [posts])

  useEffect(() => {
    if (visible >= posts.length) return
    const sentinel = sentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') {
      // Fallback: no observer support — reveal everything.
      setVisible(posts.length)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible((v) => Math.min(v + STEP, posts.length))
        }
      },
      { rootMargin: '400px 0px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [visible, posts.length])

  return (
    <>
      <div className="post-grid">
        {posts.slice(0, visible).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {visible < posts.length && <div ref={sentinelRef} className="post-list-sentinel" aria-hidden="true" />}
    </>
  )
}
