import { useEffect, useState, type CSSProperties } from 'react'

/* ── Capability diagrams ── */

const mono = (size: number, color: string): CSSProperties => ({ fontFamily: 'var(--mono)', fontSize: `${size}px`, color })
const tinyLabel: CSSProperties = { fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '6px' }
const flowCard: CSSProperties = { flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }

function FlowArrow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', margin: '5px 0' }}>
      <div style={{ width: '1px', height: '9px', background: 'var(--muted)', opacity: 0.4 }} />
      <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--muted)', opacity: 0.85 }}>{label}</span>
      <div style={{ width: '1px', height: '9px', background: 'var(--muted)', opacity: 0.4 }} />
    </div>
  )
}

function Unit({ n, color = 'rgba(173,123,252,0.45)' }: { n: number; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ width: '9px', height: '9px', borderRadius: '2px', background: 'rgba(173,123,252,0.12)', border: `1px solid ${color}` }} />
      ))}
    </span>
  )
}

const inputPill: CSSProperties = {
  flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '10px',
  color: 'var(--purple-hi)', background: 'rgba(173,123,252,0.08)',
  border: '1px solid rgba(173,123,252,0.25)', borderRadius: '8px', padding: '9px 10px',
}

// 01 — Provisioning: provision (GKE/EKS) OR bring your own → one InferenceCluster + stack
function DiagramProvisioning() {
  const stack = ['GPU operator & drivers', 'Serving engines', 'Inference gateway']
  return (
    <div className="cap-diagram-box">
      <p className="cap-diagram-label">Provisioning</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={inputPill}>Provision · GKE / EKS</span>
        <span style={{ ...inputPill, color: 'var(--muted)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>Bring your own · any K8s</span>
      </div>
      <FlowArrow label="Modelplane installs & reconciles" />
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--purple-hi)' }}>InferenceCluster</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--green)' }}>● reconciled</span>
        </div>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--muted)', marginBottom: '8px' }}>classes: h200-8x, h100-8x · node pools · gateway</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {stack.map(s => (
            <p key={s} style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)' }}>
              <span style={{ color: 'var(--green)' }}>✓</span> {s}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

// 02 — One global pool, two-level scheduling: fleet scheduler → clusters → cluster scheduler + DRA
function DiagramScheduling() {
  const placed = [
    { name: 'aws-us-east', n: 2 },
    { name: 'gcp-eu-west', n: 1 },
    { name: 'azure-us2', n: 1 },
  ]
  return (
    <div className="cap-diagram-box">
      <p className="cap-diagram-label">Two-level scheduling</p>
      <div className="cap-flow">
        <div style={{ ...flowCard, background: 'rgba(173,123,252,0.08)', borderColor: 'rgba(173,123,252,0.3)' }}>
          <p style={tinyLabel}>fleet scheduler</p>
          <p style={{ ...mono(11, 'var(--purple-hi)'), marginBottom: '7px' }}>one global pool</p>
          <p style={mono(9, 'var(--muted)')}>tracks requirements</p>
          <p style={mono(9, 'var(--muted)')}>&harr; capabilities</p>
        </div>
        <span className="cap-flow-arrow">→</span>
        <div style={flowCard}>
          <p style={tinyLabel}>places replicas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {placed.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span style={mono(9, 'var(--muted)')}>{c.name}</span>
                <span style={{ display: 'inline-flex', gap: '3px' }}>
                  {Array.from({ length: c.n }).map((_, i) => (
                    <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(173,123,252,0.6)' }} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
        <span className="cap-flow-arrow">→</span>
        <div style={flowCard}>
          <p style={tinyLabel}>cluster scheduler</p>
          <p style={{ ...mono(9, 'var(--muted)'), marginBottom: '8px', lineHeight: 1.5 }}>DRA</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Unit n={4} />
            <span style={mono(9, 'var(--green)')}>bound</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 03 — Autoscaling: replicas scale across clouds & regions via the scale subresource (min 1)
function ReplicaRow({ name, active, total }: { name: string; active: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{name}</span>
      <span style={{ display: 'inline-flex', gap: '4px' }}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} style={{
            width: '11px', height: '11px', borderRadius: '2px',
            background: i < active ? 'rgba(173,123,252,0.5)' : 'transparent',
            border: `1px solid ${i < active ? 'rgba(173,123,252,0.6)' : 'var(--border)'}`,
          }} />
        ))}
      </span>
    </div>
  )
}

function DiagramAutoscaling() {
  return (
    <div className="cap-diagram-box">
      <p className="cap-diagram-label">Autoscaling</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '10px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)' }}>load</span>
        <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ width: '72%', height: '100%', background: 'linear-gradient(90deg, var(--purple), var(--cyan))' }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--purple-hi)' }}>spec.replicas 6</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        <ReplicaRow name="GCP · eu-west" active={3} total={4} />
        <ReplicaRow name="AWS · us-east" active={2} total={4} />
        <ReplicaRow name="Azure · us-east2" active={1} total={4} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)' }}>
        <span>min 1 · max 8 replicas</span>
        <span style={{ color: 'var(--green)' }}>scale subresource · HPA / KEDA</span>
      </div>
    </div>
  )
}

// 04 — One service over many replicas + endpoints, with a live, cycling weighted route
function DiagramRouting() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % 3), 2400)
    return () => clearInterval(id)
  }, [])
  const eps = [
    { detail: 'replica · aws-us-east', weight: '60', accent: false },
    { detail: 'replica · gcp-eu-west', weight: '30', accent: false },
    { detail: 'managed · vendor',      weight: '10', accent: true },
  ]
  const PURPLE = 'rgba(173,123,252,0.85)'
  const CYAN = 'rgba(34,211,238,0.85)'
  return (
    <div className="cap-diagram-box">
      <p className="cap-diagram-label">One service, many endpoints</p>
      <div style={{
        position: 'relative', textAlign: 'center',
        background: 'rgba(173,123,252,0.08)', border: '1px solid rgba(173,123,252,0.3)',
        borderRadius: '8px', padding: '10px 12px',
      }}>
        <span style={{ position: 'absolute', inset: '-1px', borderRadius: '8px', boxShadow: '0 0 18px 2px rgba(173,123,252,0.18)', pointerEvents: 'none' }} />
        <p style={{ ...mono(11, 'var(--purple-hi)'), marginBottom: '2px' }}>ModelService · prod-llama</p>
        <p style={mono(9, 'var(--green)')}>● one OpenAI-compatible endpoint</p>
      </div>
      <svg viewBox="0 0 300 26" preserveAspectRatio="none" style={{ width: '100%', height: '26px', display: 'block', margin: '2px 0' }} aria-hidden="true">
        {[50, 150, 250].map((x, i) => (
          <line key={i} x1="150" y1="0" x2={x} y2="26" strokeWidth="1.5"
            stroke={i === 2 ? CYAN : PURPLE}
            opacity={active === i ? 1 : 0.16}
            style={{ transition: 'opacity 0.45s ease' }} />
        ))}
      </svg>
      <div className="cap-flow">
        {eps.map((e, i) => {
          const on = active === i
          const c = e.accent ? 'var(--cyan)' : 'var(--purple-hi)'
          const bd = e.accent ? 'rgba(34,211,238,0.35)' : 'rgba(173,123,252,0.3)'
          return (
            <div key={i} style={{
              flex: 1, minWidth: 0, position: 'relative',
              background: on ? (e.accent ? 'rgba(34,211,238,0.1)' : 'rgba(173,123,252,0.1)') : 'rgba(255,255,255,0.02)',
              border: `1px ${e.accent ? 'dashed' : 'solid'} ${on ? c : bd}`,
              borderRadius: '7px', padding: '9px 10px',
              transition: 'background 0.4s ease, border-color 0.4s ease',
            }}>
              <span style={{ position: 'absolute', top: '7px', right: '8px', ...mono(9, c), fontWeight: 600, border: `1px solid ${bd}`, borderRadius: '100px', padding: '0 5px' }}>{e.weight}</span>
              <p style={{ ...mono(9, c), letterSpacing: '0.04em', marginBottom: '5px', paddingRight: '26px' }}>ModelEndpoint</p>
              <p style={mono(9, 'var(--muted)')}>{e.detail}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const diagrams = [DiagramProvisioning, DiagramScheduling, DiagramAutoscaling, DiagramRouting]

function CapDiagram({ index }: { index: number }) {
  const D = diagrams[index]
  return <D />
}

type Capability = {
  label: string
  title: string
  body: string
  roadmap?: string
  noDiagram?: boolean
}

const capabilities: Capability[] = [
  {
    label: '01 / Provisioning',
    title: 'Provision the fleet, or bring your own',
    body: "Provision inference clusters on AWS, GCP, and Azure, or bring your own on any Kubernetes. Each gets hardware classes, node pools, an inference gateway, and the full serving stack, installed and continuously reconciled.",
  },
  {
    label: '02 / Scheduling',
    title: 'One global pool of capacity',
    body: "Modelplane treats every cluster, cloud, and region as one global pool. A fleet scheduler places each model's replicas where its requirements match a cluster's capabilities, then hands off to the cluster's own scheduler and DRA.",
  },
  {
    label: '03 / Autoscaling',
    title: 'Scale replicas across clouds and regions',
    body: "Every model exposes the standard Kubernetes scale subresource, so its replicas scale out across clusters, clouds, and regions, driven by hand or by HPA and KEDA.",
    roadmap: "Scale-to-zero is on the roadmap.",
  },
  {
    label: '04 / Routing',
    title: 'One service, many replicas and endpoints',
    body: "A model service is one stable, OpenAI-compatible endpoint over many replicas and model endpoints. Weighted routing spreads traffic across replicas for canary and A/B rollouts, and a managed endpoint can take a weighted share too.",
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="capabilities">
      <div className="wrap">
        <h2 className="section-title reveal">
          Capabilities built for the fleet. <span className="grad">Not just the cluster.</span>
        </h2>

        <div className="cap-features">
          {capabilities.map((cap, i) => (
            <div key={cap.label} className={`cap-feature reveal${i % 2 === 1 ? ' cap-feature--reverse' : ''}${cap.noDiagram ? ' cap-feature--full' : ''}`}>
              <div className="cap-feature-text">
                <p className="cap-feature-label">{cap.label}</p>
                <h3 className="cap-feature-title">{cap.title}</h3>
                <p className="cap-feature-body">{cap.body}</p>
                {cap.roadmap && (
                  <p className="cap-roadmap"><span className="cap-roadmap-tag">roadmap</span>{cap.roadmap}</p>
                )}
              </div>
              {!cap.noDiagram && (
                <div className="cap-feature-diagram">
                  <CapDiagram index={i} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
