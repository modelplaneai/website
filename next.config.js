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
      // The pre-launch preview lived at /preview; it is now the home page.
      { source: '/preview', destination: '/', statusCode: 301 },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'slack.modelplane.ai',
          },
        ],
        destination:
          'https://join.slack.com/t/modelplane/shared_invite/zt-426rmxjk0-9EdeAfiDSvQA823gAAQk5g',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
