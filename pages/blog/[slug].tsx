import Head from 'next/head'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PostMetaRow from '@/components/blog/PostMeta'
import PostCard from '@/components/blog/PostCard'
import TableOfContents from '@/components/blog/TableOfContents'
import ShareLinks from '@/components/blog/ShareLinks'
import { mdxComponents } from '@/components/mdx'
import {
  getAllPostSlugs,
  getAllPosts,
  getPostBySlug,
  getPostFolder,
  getRelatedPosts,
  type PostMeta,
} from '@/lib/blog'
import { extractToc, type TocItem } from '@/lib/toc'
import { SITE_URL, githubSourceUrl } from '@/lib/site'

interface PostPageProps {
  meta: PostMeta
  mdxSource: MDXRemoteSerializeResult
  toc: TocItem[]
  related: PostMeta[]
  sourceUrl: string
  prev: Pick<PostMeta, 'slug' | 'title'> | null
  next: Pick<PostMeta, 'slug' | 'title'> | null
}

function ogImageFor(meta: PostMeta): string {
  if (meta.cover) return meta.cover.startsWith('http') ? meta.cover : `${SITE_URL}${meta.cover}`
  const params = new URLSearchParams({ title: meta.title })
  if (meta.authors[0]) params.set('author', meta.authors[0].name)
  return `${SITE_URL}/api/og?${params.toString()}`
}

export default function PostPage({
  meta,
  mdxSource,
  toc,
  related,
  sourceUrl,
  prev,
  next,
}: PostPageProps) {
  const url = `${SITE_URL}/blog/${meta.slug}`
  const ogImage = ogImageFor(meta)

  return (
    <>
      <Head>
        <title>{`${meta.title} · Modelplane Blog`}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={meta.date} />
        {meta.authors.map((a) => (
          <meta property="article:author" content={a.name} key={a.name} />
        ))}
        {meta.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <Nav />
      <main className="blog-main">
        <div className="wrap">
          <Link href="/blog" className="post-back">
            ← All posts
          </Link>

          {meta.cover && (
            <div className="post-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={meta.cover} alt={meta.title} />
            </div>
          )}

          <header className="post-header">
            <h1 className="post-title">{meta.title}</h1>
            {meta.description && <p className="post-lead">{meta.description}</p>}
            <PostMetaRow authors={meta.authors} date={meta.date} readingTime={meta.readingTime} />
            {meta.tags.length > 0 && (
              <div className="post-tags">
                {meta.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${encodeURIComponent(tag)}`}
                    className="post-tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="post-layout">
            <div className="post-main">
              <article className="post">
                <div className="prose">
                  <MDXRemote {...mdxSource} components={mdxComponents} />
                </div>

                <div className="post-actions">
                  <ShareLinks url={url} title={meta.title} />
                  <a
                    className="post-source share-btn"
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="gh-icon"
                      viewBox="0 0 16 16"
                      width="15"
                      height="15"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"
                      />
                    </svg>
                    View source
                  </a>
                </div>
              </article>

              {(prev || next) && (
                <nav className="post-nav" aria-label="More posts">
                  {prev ? (
                    <Link href={`/blog/${prev.slug}`} className="post-nav-link">
                      <span className="post-nav-label">← Older post</span>
                      <span className="post-nav-title">{prev.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <Link href={`/blog/${next.slug}`} className="post-nav-link post-nav-next">
                      <span className="post-nav-label">Newer post →</span>
                      <span className="post-nav-title">{next.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}
                </nav>
              )}

              {related.length > 0 && (
                <section className="post-related">
                  <h2 className="section-label">Related posts</h2>
                  <div className="post-grid">
                    {related.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <TableOfContents items={toc} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)
  if (!post) return { notFound: true }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        // Lift standalone images out of their wrapping <p> so our <figure>/<figcaption>
        // image renderer doesn't produce invalid <p><figure> nesting (a hydration error).
        rehypeUnwrapImages,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
            content: { type: 'text', value: '#' },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            // Let our CSS own the background so code blocks match the deep-space theme.
            keepBackground: false,
          },
        ],
      ],
    },
  })

  // Compute prev/next within the visible, date-sorted set (newest first).
  const all = getAllPosts()
  const i = all.findIndex((p) => p.slug === slug)
  const newer = i > 0 ? all[i - 1] : null
  const older = i >= 0 && i < all.length - 1 ? all[i + 1] : null

  const folder = getPostFolder(slug)

  return {
    props: {
      meta: post.meta,
      mdxSource,
      toc: extractToc(post.content),
      related: getRelatedPosts(slug, 3),
      sourceUrl: folder ? githubSourceUrl(folder) : SITE_URL,
      prev: older ? { slug: older.slug, title: older.title } : null,
      next: newer ? { slug: newer.slug, title: newer.title } : null,
    },
  }
}
