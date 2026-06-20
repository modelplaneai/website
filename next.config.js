/** @type {import('next').NextConfig} */

// The docs are a standalone Hugo site at docs.modelplane.ai (the `modelplane-docs`
// Vercel project). We 301-redirect the legacy /docs and /docs/* paths there so old
// links and any indexed URLs keep working and their SEO equity transfers to the
// subdomain.
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/docs', destination: 'https://docs.modelplane.ai/', statusCode: 301 },
      { source: '/docs/:path*', destination: 'https://docs.modelplane.ai/:path*', statusCode: 301 },
    ]
  },
}

module.exports = nextConfig
