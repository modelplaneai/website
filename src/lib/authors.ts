// Pure, client-safe author helpers. Kept out of lib/blog.ts (which imports fs/path)
// so client components can use it without pulling Node-only modules into the bundle.

// Derive a URL slug from an author name. "Bassam Tabbara" -> "bassam-tabbara".
export function authorNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
