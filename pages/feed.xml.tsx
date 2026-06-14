import type { GetServerSideProps } from 'next'
import { Feed } from 'feed'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL, SITE_NAME, BLOG_TITLE, BLOG_DESCRIPTION } from '@/lib/site'

// This page renders nothing — getServerSideProps writes the RSS XML directly.
export default function Feeds() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts()

  const feed = new Feed({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    id: `${SITE_URL}/blog`,
    link: `${SITE_URL}/blog`,
    language: 'en',
    favicon: `${SITE_URL}/icon.png`,
    copyright: `${new Date().getFullYear()} ${SITE_NAME}`,
    feedLinks: { rss2: `${SITE_URL}/feed.xml` },
  })

  for (const post of posts) {
    const url = `${SITE_URL}/blog/${post.slug}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(post.date),
      image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
      author: post.authors.map((a) => ({ name: a.name, link: a.url })),
    })
  }

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(feed.rss2())
  res.end()

  return { props: {} }
}
