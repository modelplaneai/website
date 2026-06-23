// Canonical site origin, used for absolute URLs in OG tags, RSS, and the sitemap.
// Override per-environment with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://modelplane.ai').replace(
  /\/$/,
  ''
)

export const SITE_NAME = 'Modelplane'

// Site-wide SEO defaults. Used by <Seo> when a page does not override them, and
// kept here so the home page <title> and the global social card stay in sync.
export const DEFAULT_TITLE = 'Modelplane · The open source control plane for AI inference'
export const DEFAULT_DESCRIPTION =
  'Modelplane is the open source control plane for AI models. Deploy any model on any GPU infrastructure you own (cloud, neocloud, or on-premise) and let the control plane operate it continuously.'
export const DEFAULT_OG_TITLE = 'Modelplane · The open source control plane for AI inference'
export const DEFAULT_OG_DESCRIPTION =
  'Run any model on infrastructure you own. The control plane provisions, reconciles, and governs it continuously, without humans in the loop.'

// Absolute URL for a dynamically rendered Open Graph card. `accent`, when it is a
// trailing phrase of `title`, is rendered in the brand purple→sky gradient.
export function ogCardUrl({ title, accent }: { title: string; accent?: string }): string {
  const params = new URLSearchParams({ title })
  if (accent) params.set('accent', accent)
  return `${SITE_URL}/api/og?${params.toString()}`
}

// Official Modelplane social accounts. The GitHub link points at the project
// repository so visitors land ready to star.
export const SOCIAL = {
  github: 'https://github.com/modelplaneai/modelplane',
  linkedin: 'https://www.linkedin.com/company/modelplane/',
  x: 'https://x.com/ModelplaneAI',
  bluesky: 'https://bsky.app/profile/modelplaneai.bsky.social',
  youtube: 'https://www.youtube.com/@ModelplaneAI',
}

export const BLOG_TITLE = 'Modelplane Blog'
export const BLOG_DESCRIPTION =
  'Engineering, research, and updates from the Modelplane community on running AI models on infrastructure you own.'

// Where blog content lives on GitHub, for the "View source on GitHub" link.
export const GITHUB_REPO = 'https://github.com/modelplaneai/website'
export const GITHUB_BRANCH = 'main'

export function githubSourceUrl(folder: string): string {
  return `${GITHUB_REPO}/blob/${GITHUB_BRANCH}/content/blog/${folder}/index.mdx`
}
