// Canonical site origin, used for absolute URLs in OG tags, RSS, and the sitemap.
// Override per-environment with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://modelplane.ai').replace(
  /\/$/,
  ''
)

export const SITE_NAME = 'Modelplane'
export const BLOG_TITLE = 'Modelplane Blog'
export const BLOG_DESCRIPTION =
  'Engineering, research, and updates from the Modelplane community on running AI models on infrastructure you own.'

// Where blog content lives on GitHub, for the "View source on GitHub" link.
export const GITHUB_REPO = 'https://github.com/modelplaneai/website'
export const GITHUB_BRANCH = 'main'

export function githubSourceUrl(folder: string): string {
  return `${GITHUB_REPO}/blob/${GITHUB_BRANCH}/content/blog/${folder}/index.mdx`
}
