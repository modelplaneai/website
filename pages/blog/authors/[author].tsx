import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PostCard from '@/components/blog/PostCard'
import SocialLinks from '@/components/blog/SocialLinks'
import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getPostsByAuthor,
  type AuthorWithMeta,
  type PostMeta,
} from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

interface AuthorPageProps {
  author: AuthorWithMeta
  posts: PostMeta[]
}

export default function AuthorPage({ author, posts }: AuthorPageProps) {
  const count = posts.length
  return (
    <>
      <Head>
        <title>{`${author.name} · Modelplane Blog`}</title>
        <meta
          name="description"
          content={author.bio ?? `Posts by ${author.name} on the Modelplane blog.`}
        />
        <link rel="canonical" href={`${SITE_URL}/blog/authors/${author.slug}`} />
      </Head>
      <Nav />
      <main className="blog-main">
        <div className="wrap">
          <Link href="/blog" className="post-back">
            ← All posts
          </Link>

          <header className="author-page-header">
            {author.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.avatar} alt={author.name} className="author-page-avatar" />
            )}
            <div className="author-page-body">
              <span className="section-label">Author</span>
              <h1 className="author-page-name">{author.name}</h1>
              {author.title && <p className="author-page-title">{author.title}</p>}
              {author.bio && <p className="author-page-bio">{author.bio}</p>}
              <SocialLinks author={author} className="author-page-socials" />
            </div>
          </header>

          <h2 className="section-label author-page-count">
            {count} {count === 1 ? 'post' : 'posts'}
          </h2>
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
    paths: getAllAuthorSlugs().map((author) => ({ params: { author } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<AuthorPageProps> = async ({ params }) => {
  const slug = params?.author as string
  const author = getAuthorBySlug(slug)
  const posts = getPostsByAuthor(slug)
  if (!author || posts.length === 0) return { notFound: true }
  return { props: { author, posts } }
}
