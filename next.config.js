/** @type {import('next').NextConfig} */

// The docs are a separate Hugo project (the `modelplane-docs` Vercel project)
// served under /docs on this domain for SEO. We proxy /docs/* to that
// deployment with a rewrite. Hugo's baseURL only prefixes the URLs *inside*
// its HTML — the files themselves are emitted at the deployment root
// (/concepts/, /scss/, /js/, …), so we strip the /docs prefix when proxying.
//
// The origin is configured via DOCS_ORIGIN (set in this project's Vercel
// environment) rather than hardcoded, because the docs project's stable
// production alias isn't fixed here. When it's unset (e.g. local dev), we skip
// the rewrite so the build never breaks and /docs simply isn't proxied.
const DOCS_ORIGIN = process.env.DOCS_ORIGIN?.replace(/\/$/, '')

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    if (!DOCS_ORIGIN) return []
    return [
      { source: '/docs', destination: `${DOCS_ORIGIN}/` },
      { source: '/docs/:path*', destination: `${DOCS_ORIGIN}/:path*` },
    ]
  },
}

module.exports = nextConfig
