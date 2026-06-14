// Validates blog post frontmatter before build. Run with `node scripts/validate-posts.mjs`.
// Exits non-zero on the first invalid post so CI fails fast.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

if (!fs.existsSync(BLOG_DIR)) {
  console.log('No content/blog directory; nothing to validate.')
  process.exit(0)
}

const folders = fs
  .readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .filter((e) => fs.existsSync(path.join(BLOG_DIR, e.name, 'index.mdx')))
  .map((e) => e.name)

const errors = []

for (const folder of folders) {
  const file = path.join(BLOG_DIR, folder, 'index.mdx')
  const { data } = matter(fs.readFileSync(file, 'utf8'))
  const where = `content/blog/${folder}/index.mdx`

  if (!data.title || typeof data.title !== 'string')
    errors.push(`${where}: missing or invalid "title"`)
  if (!data.description || typeof data.description !== 'string')
    errors.push(`${where}: missing or invalid "description"`)
  if (!data.date || Number.isNaN(new Date(data.date).getTime()))
    errors.push(`${where}: missing or invalid "date" (use YYYY-MM-DD)`)
  if ('draft' in data && typeof data.draft !== 'boolean')
    errors.push(`${where}: "draft" must be true or false`)
  if ('pinned' in data && typeof data.pinned !== 'boolean')
    errors.push(`${where}: "pinned" must be true or false`)
  if ('tags' in data && !Array.isArray(data.tags))
    errors.push(`${where}: "tags" must be a list`)
  if ('authors' in data && !Array.isArray(data.authors))
    errors.push(`${where}: "authors" must be a list`)
}

if (errors.length > 0) {
  console.error('Blog frontmatter validation failed:\n')
  errors.forEach((e) => console.error('  - ' + e))
  process.exit(1)
}

console.log(`Validated ${folders.length} blog post(s). All good.`)
