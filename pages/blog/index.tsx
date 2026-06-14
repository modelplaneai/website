import { useMemo, useState } from 'react'
import Head from 'next/head'
import type { GetStaticProps } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PostCard from '@/components/blog/PostCard'
import PostList from '@/components/blog/PostList'
import BlogSidebar from '@/components/blog/BlogSidebar'
import { getAllPosts, getListingPosts, getTagCounts, type PostMeta } from '@/lib/blog'
import { SITE_URL, BLOG_TITLE, BLOG_DESCRIPTION } from '@/lib/site'

interface BlogIndexProps {
  posts: PostMeta[]
  recent: PostMeta[]
  tagCounts: { tag: string; count: number }[]
}

// All text a search term can match against, lowercased once per post.
function haystack(post: PostMeta): string {
  return [post.title, post.description, ...post.tags, ...post.authors.map((a) => a.name)]
    .join(' ')
    .toLowerCase()
}

export default function BlogIndex({ posts, recent, tagCounts }: BlogIndexProps) {
  const [query, setQuery] = useState('')

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const filtered = useMemo(() => {
    if (terms.length === 0) return posts
    return posts.filter((post) => {
      const hay = haystack(post)
      return terms.every((t) => hay.includes(t))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, posts])

  const searching = terms.length > 0
  const [featured, ...rest] = posts

  return (
    <>
      <Head>
        <title>{`${BLOG_TITLE} · Modelplane`}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:title" content={BLOG_TITLE} />
        <meta property="og:description" content={BLOG_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={BLOG_TITLE}
          href={`${SITE_URL}/feed.xml`}
        />
      </Head>
      <Nav />
      <main className="blog-main">
        <div className="wrap">
          <header className="blog-header">
            <span className="section-label">Blog</span>
            <h1 className="section-title">From the Modelplane community</h1>
            <p className="section-body">{BLOG_DESCRIPTION}</p>
          </header>

          <div className="blog-search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              aria-label="Search posts"
            />
          </div>

          {posts.length === 0 ? (
            <p className="section-body">No posts yet. Check back soon.</p>
          ) : (
            <div className="blog-layout">
              <div className="blog-feed">
                {searching ? (
                  filtered.length > 0 ? (
                    <PostList posts={filtered} />
                  ) : (
                    <p className="section-body">No posts match “{query}”.</p>
                  )
                ) : (
                  <>
                    {featured && <PostCard post={featured} featured />}
                    {rest.length > 0 && <PostList posts={rest} />}
                  </>
                )}
              </div>
              <BlogSidebar recent={recent} tagCounts={tagCounts} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  return {
    props: {
      posts: getListingPosts(),
      recent: getAllPosts().slice(0, 5),
      tagCounts: getTagCounts(),
    },
  }
}
