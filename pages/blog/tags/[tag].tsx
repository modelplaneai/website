import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PostCard from '@/components/blog/PostCard'
import { getAllTags, getPostsByTag, type PostMeta } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

interface TagPageProps {
  tag: string
  posts: PostMeta[]
}

export default function TagPage({ tag, posts }: TagPageProps) {
  const title = `Posts tagged "${tag}"`
  return (
    <>
      <Head>
        <title>{`${title} · Modelplane Blog`}</title>
        <meta name="description" content={`Modelplane blog posts tagged ${tag}.`} />
        <link rel="canonical" href={`${SITE_URL}/blog/tags/${encodeURIComponent(tag)}`} />
      </Head>
      <Nav />
      <main className="blog-main">
        <div className="wrap">
          <header className="blog-header">
            <span className="section-label">Tag</span>
            <h1 className="section-title">#{tag}</h1>
            <Link href="/blog" className="post-back">
              ← All posts
            </Link>
          </header>
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllTags().map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
  const tag = params?.tag as string
  const posts = getPostsByTag(tag)
  if (posts.length === 0) return { notFound: true }
  return { props: { tag, posts } }
}
