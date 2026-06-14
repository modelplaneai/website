import type { GetServerSideProps } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

export default function Sitemap() {
  return null
}

function urlEntry(loc: string, lastmod?: string): string {
  return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts()
  const tags = getAllTags()

  const entries = [
    urlEntry(`${SITE_URL}/`),
    urlEntry(`${SITE_URL}/blog`),
    ...posts.map((p) =>
      urlEntry(`${SITE_URL}/blog/${p.slug}`, new Date(p.date).toISOString())
    ),
    ...tags.map((t) => urlEntry(`${SITE_URL}/blog/tags/${encodeURIComponent(t)}`)),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
    '\n'
  )}\n</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()

  return { props: {} }
}
