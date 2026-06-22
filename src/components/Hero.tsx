import ArchDiagram from './ArchDiagram'

// ── Flight-path decor ────────────────────────────────────────────────────────
// Five nested "stadium" rects drawn under the exact Figma matrix from the design
// (matrix(0.866,-0.5,0.866,0.5,-2121.001,1914.499)). Their rounded right caps
// read as the orbit arcs; their long edges as the diagonal flight lines. Paper-
// plane marks are placed ON those lines via the same matrix so they ride a path
// at any size. Geometry is ported verbatim from the handoff so it stays pixel-exact.
const ORBITS = [
  { x: 192, y: 192, w: 3669.6, h: 993.6, rx: 496.8, o: 0.2 },
  { x: 287, y: 287, w: 3479.6, h: 803.6, rx: 401.8, o: 0.26 },
  { x: 382, y: 382, w: 3289.6, h: 613.6, rx: 306.8, o: 0.32 },
  { x: 477, y: 477, w: 3099.6, h: 423.6, rx: 211.8, o: 0.4 },
  { x: 572, y: 572, w: 2909.6, h: 233.6, rx: 116.8, o: 0.48 },
]

const M = (lx: number, ly: number) => ({
  x: 0.866 * lx + 0.866 * ly - 2121.001,
  y: -0.5 * lx + 0.5 * ly + 1914.499,
})
const onTop = (i: number, lx: number) => M(lx, ORBITS[i].y)
const onCap = (i: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  const s = ORBITS[i]
  const cx = s.x + s.w - s.rx
  const cy = s.y + s.h / 2
  return M(cx + s.rx * Math.cos(a), cy + s.rx * Math.sin(a))
}
const ANCHORS = [
  { p: onCap(0, -55), r: -22, w: 90, d: '0s' },
  { p: onCap(1, -20), r: 14, w: 76, d: '1.2s' },
  { p: onCap(0, 30), r: -10, w: 74, d: '2.1s' },
  { p: onTop(0, 3250), r: -30, w: 84, d: '0.6s' },
  { p: onTop(0, 2750), r: 20, w: 78, d: '1.8s' },
  { p: onTop(1, 2550), r: -16, w: 72, d: '0.9s' },
  { p: onTop(2, 2550), r: 24, w: 82, d: '2.4s' },
  { p: onTop(0, 3050), r: -12, w: 78, d: '1.5s' },
]
const PLANES = ANCHORS.map((a) => ({
  x: +a.p.x.toFixed(1),
  y: +a.p.y.toFixed(1),
  r: a.r,
  w: a.w,
  n: +(-a.w / 2).toFixed(1),
  d: a.d,
}))

function FlightPaths() {
  return (
    <div className="herox-decor" aria-hidden="true">
      <svg viewBox="0 0 2026 915" preserveAspectRatio="xMaxYMin slice">
        <g
          transform="matrix(0.866,-0.5,0.866,0.5,-2121.001,1914.499)"
          fill="none"
          stroke="#00DCE8"
          strokeWidth="2.2"
        >
          {ORBITS.map((o, i) => (
            <rect
              key={i}
              x={o.x}
              y={o.y}
              width={o.w}
              height={o.h}
              rx={o.rx}
              vectorEffect="non-scaling-stroke"
              style={{ opacity: o.o }}
            />
          ))}
        </g>
        {PLANES.map((pm, i) => (
          <g key={i} transform={`translate(${pm.x},${pm.y}) rotate(${pm.r})`}>
            <image
              href="/icon-color.svg"
              x={pm.n}
              y={pm.n}
              width={pm.w}
              height={pm.w}
              style={{
                animation: `mpFloat 6.5s ease-in-out infinite`,
                animationDelay: pm.d,
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.45))',
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="herox" data-screen-label="Hero">
      <FlightPaths />

      <div className="wrap herox-inner">
        <img src="/logo-inverted.svg" alt="Modelplane" className="herox-wordmark" />

        <div className="herox-card">
          <div className="herox-copy">
            <p className="herox-eyebrow">In early development · building in the open</p>
            <h1 className="herox-headline">
              The open source<br />control plane for<br />
              <span className="hero-gradient">AI inference</span>
            </h1>
            <p className="herox-sub">
              Install Modelplane in your own environment, and it operates your GPU clusters across cloud, neocloud, and on-premise as one inference fleet: provisioning clusters, placing models, autoscaling replicas, caching weights, and routing through a single OpenAI-compatible endpoint. It runs any model on any serving engine on any infrastructure, all under your control.
            </p>
            <div className="herox-actions">
              <a href="https://docs.modelplane.ai/getting-started/" className="btn-primary">Get started →</a>
              <a href="https://github.com/modelplaneai/modelplane" className="btn-ghost" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          <div className="herox-diagram">
            <ArchDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
