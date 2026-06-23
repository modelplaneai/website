import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

// Brand palette, mirrored from src/styles/globals.css.
const SPRUCE = '#001D2F' // --mp-dark-spruce, the Modelplane background
const PURPLE = '#9A5EFC' // --mp-purple
const SKY = '#00DCE8' // --mp-sky
const BRAND_GRADIENT = `linear-gradient(90deg, ${PURPLE} 0%, ${SKY} 100%)`

// Logo lockup aspect ratio (source art is 659.41 × 98.83).
const LOCKUP_RATIO = 98.83 / 659.41

// The orbit illustration is exported from Figma at 1200 × 437 and sits flush
// with the bottom of the 1200 × 630 card.
const ORBIT_W = 1200
const ORBIT_H = 437

// Dynamic Open Graph card on the Modelplane "dark spruce" brand theme, matching
// the Figma OG design. With a title it renders the content card (lockup + title
// + orbit); without one it renders the brand card (centered lockup).
// Usage: /api/og?title=...&accent=...
export default async function handler(req: NextRequest) {
  const origin = new URL(req.url).origin
  const [lockupSvg, orbitSvg, fontData] = await Promise.all([
    fetch(`${origin}/logo-inverted.svg`).then((r) => r.text()),
    fetch(`${origin}/og-orbit.svg`).then((r) => r.text()),
    fetch(`${origin}/fonts/Outfit-Medium.ttf`).then((r) => r.arrayBuffer()),
  ])
  const lockup = `data:image/svg+xml;base64,${btoa(lockupSvg)}`
  const orbit = `data:image/svg+xml;base64,${btoa(orbitSvg)}`

  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || '').slice(0, 120).trim()
  // Optional trailing phrase to render in the brand gradient (must be a suffix
  // of the title); used for the fixed marketing cards, omitted for post titles.
  const accentRaw = (searchParams.get('accent') || '').trim()
  const accent = accentRaw && title.endsWith(accentRaw) ? accentRaw : ''

  const fonts = [{ name: 'Outfit', data: fontData, weight: 500 as const, style: 'normal' as const }]

  // Brand card: no title → centered lockup on flat spruce (Figma node 2209:2595).
  if (!title) {
    const w = 731
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: SPRUCE,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lockup} width={w} height={Math.round(w * LOCKUP_RATIO)} alt="Modelplane" />
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  // Content card: orbit (full-bleed, behind) + lockup top-left + Outfit title
  // with optional gradient accent (Figma node 2209:2597).
  const lead = accent ? title.slice(0, title.length - accent.length).trimEnd() : title
  const leadWords = lead ? lead.split(/\s+/) : []
  const accentWords = accent ? accent.split(/\s+/) : []
  const logoW = 526.43

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: SPRUCE,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={orbit}
          width={ORBIT_W}
          height={ORBIT_H}
          alt=""
          style={{ position: 'absolute', left: 0, bottom: -40 }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '55px 76px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lockup} width={logoW} height={Math.round(logoW * LOCKUP_RATIO)} alt="Modelplane" />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: 840,
              marginTop: 48,
              fontFamily: 'Outfit',
              fontWeight: 500,
              fontSize: 59.94,
              lineHeight: 1.1,
              letterSpacing: '-1.46px',
              color: '#ffffff',
            }}
          >
            {leadWords.map((w, i) => (
              <span key={`l${i}`} style={{ marginRight: 18 }}>
                {w}
              </span>
            ))}
            {accentWords.map((w, i) => (
              <span
                key={`a${i}`}
                style={{
                  marginRight: 18,
                  backgroundImage: BRAND_GRADIENT,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  )
}
