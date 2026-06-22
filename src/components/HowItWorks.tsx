/* Core concepts — the resource model. Two roles, each owning its own resources,
   shown as mini resource views (kind + a couple of spec fields). Developers/ML teams:
   ModelService → ModelDeployments + a managed ModelEndpoint. Platform teams:
   InferenceGateway → InferenceClusters. */

const PINK = 'rgba(236,72,153,0.13)'
const PINK_BORDER = 'rgba(236,72,153,0.45)'
const PURPLE = 'rgba(173,123,252,0.12)'
const PURPLE_BORDER = 'rgba(173,123,252,0.4)'
const CYAN_BG = 'rgba(34,211,238,0.1)'
const CYAN_BORDER = 'rgba(34,211,238,0.4)'

const TONES: Record<string, { bg: string; bd: string; c: string }> = {
  pink:   { bg: PINK,   bd: PINK_BORDER,   c: '#f472b6' },
  purple: { bg: PURPLE, bd: PURPLE_BORDER, c: 'var(--purple-hi)' },
  cyan:   { bg: CYAN_BG, bd: CYAN_BORDER,  c: 'var(--cyan)' },
}

function ResCard({ kind, fields, tone, weight, full, extra }: {
  kind: string
  fields: [string, string][]
  tone: 'pink' | 'purple' | 'cyan'
  weight?: string
  full?: boolean
  extra?: string
}) {
  const t = TONES[tone]
  return (
    <div className={`hiw-card hiw-res${full ? ' hiw-res--full' : ''}${extra ? ' ' + extra : ''}`} style={{ background: t.bg, borderColor: t.bd }}>
      {weight && <span className="hiw-route-weight" style={{ color: t.c, borderColor: t.bd }}>{weight}</span>}
      <p className="hiw-res-kind">kind: <b style={{ color: t.c }}>{kind}</b></p>
      {fields.map(([k, v]) => (
        <p key={k} className="hiw-res-field"><span className="k">{k}:</span> {v}</p>
      ))}
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how" className="hiw-section">
      <div className="wrap">
        <h2 className="section-title reveal">A resource API for inference. <span className="grad">Serving two roles.</span></h2>
        <p className="section-body section-body--wide reveal">
          Modelplane defines a flexible API for inference. Each role owns its own
          resources: developers declare model deployments and expose one service across regions,
          clouds, and managed vendors, while platform teams declare the fleet of clusters,
          accelerators, and gateways underneath.
        </p>

        <div className="hiw-roles reveal">
          <div className="hiw-role" style={{ borderColor: PINK_BORDER }}>
            <div className="hiw-role-head">
              <p className="hiw-role-label" style={{ color: '#f472b6' }}>Development &amp; ML teams</p>
              <p className="hiw-role-sub">Define model deployments: the model, the engine and its configuration, serving topology, hardware request, region, and environment. Then expose them as one service, weighted across regions, clouds, and managed vendors.</p>
            </div>

            <div className="hiw-graph">
              <div className="hiw-graph-top">
                <ResCard full tone="pink" kind="ModelService" fields={[['name', 'prod-llama'], ['routing', 'weighted, openai']]} />
              </div>

              <svg className="hiw-fan" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <line x1="150" y1="0" x2="50"  y2="24" stroke={PINK_BORDER} strokeWidth="1" />
                <line x1="150" y1="0" x2="150" y2="24" stroke={PINK_BORDER} strokeWidth="1" />
                <line x1="150" y1="0" x2="250" y2="24" stroke={CYAN_BORDER} strokeWidth="1" />
              </svg>

              <div className="hiw-graph-children">
                <ResCard tone="pink" weight="60" kind="ModelDeployment" fields={[['model', 'llama-4-70b'], ['cluster', 'aws-us-east']]} />
                <ResCard tone="pink" weight="30" kind="ModelDeployment" fields={[['model', 'llama-4-70b'], ['cluster', 'gcp-eu-west']]} />
                <ResCard tone="cyan" weight="10" kind="ModelEndpoint" fields={[['target', 'vendor-api'], ['type', 'managed']]} />
              </div>
            </div>
          </div>

          <div className="hiw-role" style={{ borderColor: PURPLE_BORDER }}>
            <div className="hiw-role-head">
              <p className="hiw-role-label" style={{ color: 'var(--purple-hi)' }}>Platform teams</p>
              <p className="hiw-role-sub">Declare the fleet: a gateway over clusters across clouds and regions, each with its own hardware classes and node pools. Set the capacity, accelerators, policy, and cost controls the whole fleet runs within.</p>
            </div>

            <div className="hiw-graph">
              <div className="hiw-graph-top">
                <ResCard full tone="purple" kind="InferenceGateway" fields={[['name', 'prod-gateway'], ['routes', 'all endpoints']]} />
              </div>

              <svg className="hiw-fan" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <line x1="150" y1="0" x2="50"  y2="24" stroke={PURPLE_BORDER} strokeWidth="1" />
                <line x1="150" y1="0" x2="150" y2="24" stroke={PURPLE_BORDER} strokeWidth="1" />
                <line x1="150" y1="0" x2="250" y2="24" stroke={PURPLE_BORDER} strokeWidth="1" />
              </svg>

              <div className="hiw-cluster-row">
                <ResCard tone="purple" kind="InferenceCluster" fields={[['name', 'aws-us-east'], ['pools', 'h200, h100']]} />
                <ResCard tone="purple" kind="InferenceCluster" fields={[['name', 'gcp-eu-west'], ['pools', 'tpu-v6e, a100']]} />
                <ResCard tone="purple" kind="InferenceCluster" fields={[['name', 'onprem-dc1'], ['pools', 'h100, l40s']]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
