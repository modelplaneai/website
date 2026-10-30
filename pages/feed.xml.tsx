import type { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL, SITE_NAME, BLOG_TITLE, BLOG_DESCRIPTION } from '@/lib/site'

// This page renders nothing — getServerSideProps writes the RSS XML directly.
export default function Feeds() {
  return null
}

// Escape text for an XML element body or a double-quoted attribute value.
function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Titles and descriptions are free text from post frontmatter, so they go in
// CDATA. A literal "]]>" would end the section early, so we split it across two.
function cdata(s: string): string {
  return `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts()

  const channel = [
    `<title>${escapeXml(BLOG_TITLE)}</title>`,
    `<link>${escapeXml(`${SITE_URL}/blog`)}</link>`,
    `<description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `<docs>https://validator.w3.org/feed/docs/rss2.html</docs>`,
    `<language>en</language>`,
    `<copyright>${escapeXml(
      `© ${new Date().getFullYear()} The Modelplane Authors. ${SITE_NAME}™ is a trademark.`
    )}</copyright>`,
  ]

  for (const post of posts) {
    const url = `${SITE_URL}/blog/${post.slug}`
    const item = [
      `<title>${cdata(post.title)}</title>`,
      `<link>${escapeXml(url)}</link>`,
      `<guid isPermaLink="false">${escapeXml(url)}</guid>`,
      `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
    ]
    if (post.description) item.push(`<description>${cdata(post.description)}</description>`)
    for (const a of post.authors) item.push(`<author>${escapeXml(a.name)}</author>`)
    if (post.cover) {
      // The enclosure type comes from the cover's file extension (cover.png -> image/png).
      const image = `${SITE_URL}${post.cover}`
      const ext = new URL(image).pathname.split('.').pop()
      item.push(`<enclosure url="${escapeXml(image)}" length="0" type="image/${ext}"/>`)
    }
    channel.push('<item>', ...item.map((line) => `    ${line}`), '</item>')
  }

  const xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<rss version="2.0">',
    '    <channel>',
    ...channel.map((line) => `        ${line}`),
    '    </channel>',
    '</rss>',
  ].join('\n')

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()

  return { props: {} }
}
