import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

// Dynamic Open Graph card rendered on the dark "deep space" theme.
// Usage: /api/og?title=...&author=...
export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'Modelplane Blog').slice(0, 120)
  const author = searchParams.get('author') || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #070714 0%, #0f0f22 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, color: '#8b8aae' }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              marginRight: 16,
              background: 'linear-gradient(135deg, #AD7BFC 0%, #22d3ee 100%)',
            }}
          />
          Modelplane Blog
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '90%',
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, color: '#b0afcc' }}>
          {author && <span>{author}</span>}
          <div
            style={{
              marginLeft: author ? 'auto' : 0,
              marginRight: author ? 0 : 'auto',
              height: 6,
              width: 220,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #AD7BFC 0%, #22d3ee 100%)',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
