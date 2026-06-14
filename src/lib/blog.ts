import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Build-time content loader for the blog. Reads MDX posts from content/blog/<slug>/index.mdx.
// Co-located assets (images, video) live under public/blog/<slug>/ and are referenced by
// absolute path, since Next.js (Pages Router) only serves files under public/.

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface Author {
  name: string
  title?: string
  url?: string
  avatar?: string
}

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string // ISO date string
  authors: Author[]
  tags: string[]
  cover?: string
  draft: boolean
  pinned: boolean // floats to the top of the listing
  readingTime: string // e.g. "5 min read"
}

export interface Post {
  meta: PostMeta
  content: string // raw MDX body
}

// Strip an optional leading YYYY-MM-DD- from a folder name to derive the public slug.
function folderToSlug(folder: string): string {
  return folder.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

function readPostFile(folder: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(BLOG_DIR, folder, 'index.mdx')
  const raw = fs.readFileSync(filePath, 'utf8')
  return matter(raw)
}

function normalizeAuthors(input: unknown): Author[] {
  if (!Array.isArray(input)) return []
  return input
    .map((a): Author | null => {
      if (typeof a === 'string') return { name: a }
      if (a && typeof a === 'object' && typeof (a as Author).name === 'string') {
        const author = a as Author
        return {
          name: author.name,
          title: author.title,
          url: author.url,
          avatar: author.avatar,
        }
      }
      return null
    })
    .filter((a): a is Author => a !== null)
}

function buildMeta(folder: string, data: Record<string, unknown>, content: string): PostMeta {
  const slug = folderToSlug(folder)
  const title = typeof data.title === 'string' ? data.title : slug
  const description = typeof data.description === 'string' ? data.description : ''
  const date = typeof data.date === 'string' ? data.date : new Date(0).toISOString()
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : []
  const cover = typeof data.cover === 'string' ? data.cover : undefined
  const draft = data.draft === true
  const pinned = data.pinned === true

  const meta: PostMeta = {
    slug,
    title,
    description,
    date,
    authors: normalizeAuthors(data.authors),
    tags,
    cover,
    draft,
    pinned,
    readingTime: readingTime(content).text,
  }

  // Drop undefined optional fields so the result is JSON-serializable for getStaticProps.
  return JSON.parse(JSON.stringify(meta)) as PostMeta
}

// All post folder names that contain an index.mdx.
function getPostFolders(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(BLOG_DIR, entry.name, 'index.mdx')))
    .map((entry) => entry.name)
}

function slugToFolder(slug: string): string | undefined {
  return getPostFolders().find((folder) => folderToSlug(folder) === slug)
}

// Drafts are visible in dev/preview but hidden in production builds.
function isVisible(meta: PostMeta): boolean {
  return process.env.NODE_ENV !== 'production' || !meta.draft
}

export function getAllPosts(): PostMeta[] {
  return getPostFolders()
    .map((folder) => {
      const { data, content } = readPostFile(folder)
      return buildMeta(folder, data, content)
    })
    .filter(isVisible)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Listing order: pinned posts first (newest first within each group), then the rest
// by date. getAllPosts() stays chronological so prev/next, RSS, and related are unaffected.
export function getListingPosts(): PostMeta[] {
  const all = getAllPosts()
  const pinned = all.filter((p) => p.pinned)
  const unpinned = all.filter((p) => !p.pinned)
  return [...pinned, ...unpinned]
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function getPostMeta(slug: string): PostMeta | null {
  const folder = slugToFolder(slug)
  if (!folder) return null
  const { data, content } = readPostFile(folder)
  return buildMeta(folder, data, content)
}

export function getPostBySlug(slug: string): Post | null {
  const folder = slugToFolder(slug)
  if (!folder) return null
  const { data, content } = readPostFile(folder)
  return { meta: buildMeta(folder, data, content), content }
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

// Tags with their post counts, sorted by count (desc) then name.
export function getTagCounts(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  getAllPosts().forEach((post) =>
    post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
  )
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

// The on-disk folder name (keeps the YYYY-MM-DD- prefix), used for the GitHub source link.
export function getPostFolder(slug: string): string | undefined {
  return slugToFolder(slug)
}

// Posts related to `slug`, ranked by number of shared tags then recency.
// Falls back to filling with the most recent posts when there aren't enough tag matches.
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts()
  const current = all.find((p) => p.slug === slug)
  if (!current) return []

  const others = all.filter((p) => p.slug !== slug)
  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))

  return scored.slice(0, limit).map((s) => s.post)
}
