import { useState, useEffect } from 'react'

export default function ArchDiagram() {
  // Highlight a random deployment (top) and a random, independent cluster
  // (bottom) at once. Each pick differs from its previous one so the lit
  // route never repeats in place, and top/bottom are uncorrelated.
  const [activeTop, setActiveTop] = useState(0)
  const [activeBottom, setActiveBottom] = useState(1)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTop(prev => (prev + 1 + Math.floor(Math.random() * 2)) % 3)
      setActiveBottom(prev => (prev + 1 + Math.floor(Math.random() * 2)) % 3)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  // Model deployments fanning into Modelplane (top). Engine + topology are
  // properties the user declares; Modelplane schedules them onto the fleet.
  const deploys = [
    { model: 'deepseek-r1', engine: 'SGLang',   topo: 'prefill / decode', req: '8× B200' },
    { model: 'llama-4-70b', engine: 'vLLM',     topo: 'tensor parallel',  req: '4× H100' },
    { model: 'qwen3-235b',  engine: 'TRT-LLM',  topo: 'data / expert',    req: '8× H200' },
  ]

  // Inference clusters across the fleet (bottom). Heterogeneous accelerators,
  // each exposing more than one hardware class.
  const envs = [
    { logo: '/logos/googlecloud.svg', name: 'GCP',       category: 'Cloud',    region: 'us-central1', classes: ['256× TPU v6e', '8× H100'] },
    { logo: '/logos/coreweave.svg',   name: 'CoreWeave', category: 'Neocloud', region: 'gpu-east',    classes: ['72× GB200', '8× H200'] },
    { logo: '/logos/nvidia.svg',      name: 'DGX',       category: 'On-prem',  region: 'dc-1',        classes: ['32× H100', '8× A100'] },
  ]

  return (
    <div className="arch-wrap">
      {/* ── Model deployments ── */}
      <div className="arch-deploys">
        {deploys.map((d, i) => (
          <div key={d.model} className={`arch-deploy${activeTop === i ? ' is-active' : ''}`}>
            <div className="arch-kind">ModelDeployment</div>
            <div className="arch-deploy-hd">
              <span className="arch-badge arch-badge--green">POST</span>
              <span className="arch-deploy-engine">{d.engine}</span>
            </div>
            <div className="arch-deploy-model">{d.model}</div>
            <div className="arch-deploy-tags">
              <span className="arch-deploy-topo">{d.topo}</span>
              <span className="arch-deploy-req">{d.req}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Fan-in: deployments → Modelplane ── */}
      <svg className="arch-fanin-svg" viewBox="0 0 300 36" preserveAspectRatio="none">
        <line x1="50"  y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.18)" strokeWidth="1" />
        <line x1="150" y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.18)" strokeWidth="1" />
        <line x1="250" y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.18)" strokeWidth="1" />
        <line x1="50"  y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.85)" strokeWidth="1.5" className={`arch-rl${activeTop === 0 ? ' is-active' : ''}`} />
        <line x1="150" y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.85)" strokeWidth="1.5" className={`arch-rl${activeTop === 1 ? ' is-active' : ''}`} />
        <line x1="250" y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.85)" strokeWidth="1.5" className={`arch-rl${activeTop === 2 ? ' is-active' : ''}`} />
      </svg>

      {/* ── Modelplane ── */}
      <div className="arch-mp">
        <div className="arch-mp-pulse" />
        <div className="arch-mp-row">
          <div className="arch-mp-brand">
            <img src="/logo-inverted.svg" className="arch-mp-logo" alt="Modelplane" />
            <div className="arch-mp-live">
              <span className="arch-live-dot" />
              reconciling
            </div>
          </div>
          <div className="arch-mp-caps">
            <div className="arch-mp-caps-row arch-mp-actions">
              <span>provisioning</span>
              <span>scheduling</span>
              <span>autoscaling</span>
              <span>routing</span>
              <span>caching</span>
            </div>
            <div className="arch-mp-caps-row arch-mp-honors">
              <span>policy</span>
              <span>governance</span>
              <span>compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Branch lines: Modelplane → envs ── */}
      <svg className="arch-branches-svg" viewBox="0 0 300 36" preserveAspectRatio="none">
        <line x1="150" y1="0" x2="50"  y2="36" stroke="rgba(173,123,252,0.18)" strokeWidth="1" />
        <line x1="150" y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.18)" strokeWidth="1" />
        <line x1="150" y1="0" x2="250" y2="36" stroke="rgba(173,123,252,0.18)" strokeWidth="1" />
        <line x1="150" y1="0" x2="50"  y2="36" stroke="rgba(173,123,252,0.85)" strokeWidth="1.5" className={`arch-rl${activeBottom === 0 ? ' is-active' : ''}`} />
        <line x1="150" y1="0" x2="150" y2="36" stroke="rgba(173,123,252,0.85)" strokeWidth="1.5" className={`arch-rl${activeBottom === 1 ? ' is-active' : ''}`} />
        <line x1="150" y1="0" x2="250" y2="36" stroke="rgba(173,123,252,0.85)" strokeWidth="1.5" className={`arch-rl${activeBottom === 2 ? ' is-active' : ''}`} />
      </svg>

      {/* ── Clusters ── */}
      <div className="arch-envs">
        {envs.map((env, i) => (
          <div key={env.name} className={`arch-env${activeBottom === i ? ' is-active' : ''}`}>
            <div className="arch-kind">InferenceCluster</div>
            <div className="arch-env-hd">
              <img src={env.logo} className="arch-env-logo" alt={env.name} />
              <span className="arch-env-name">{env.name}</span>
            </div>
            <div className="arch-env-sub">{env.category} · {env.region}</div>
            <div className="arch-env-classes">
              {env.classes.map(c => (
                <span key={c} className="arch-env-class">
                  <span className="arch-dot-g" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
