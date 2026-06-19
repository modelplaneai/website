/* The inference ecosystem, simplified to its role: Modelplane is the control plane
   that sits above the stack and orchestrates it. One control-plane bar on top, then
   the open ecosystem in slim layers below: models, serving engines, accelerators, and
   providers. Representative pieces per layer (sorted by adoption), not an exhaustive
   matrix. Pills are static, no outbound links. */

type Item = { name: string; logo: string | null }
type Row = { label?: string; items: Item[]; more?: string }
type Layer = { name: string; caption: string; accent: string; rows: Row[] }

// Each list is ordered left-to-right by adoption / popularity.
const models: Item[] = [
  { name: 'Llama',    logo: '/logos/meta.svg' },
  { name: 'Qwen',     logo: '/logos/alibaba.svg' },
  { name: 'DeepSeek', logo: '/logos/deepseek.svg' },
  { name: 'Mistral',  logo: '/logos/mistralai.svg' },
  { name: 'gpt-oss',  logo: '/logos/openai.svg' },
  { name: 'Gemma',    logo: '/logos/googlecloud.svg' },
]

const engines: Item[] = [
  { name: 'vLLM',         logo: '/logos/vllm.svg' },
  { name: 'SGLang',       logo: null },
  { name: 'TensorRT-LLM', logo: '/logos/nvidia.svg' },
  { name: 'TGI',          logo: '/logos/huggingface.svg' },
  { name: 'llama.cpp',    logo: null },
  { name: 'LMDeploy',     logo: null },
]

const accelerators: Item[] = [
  { name: 'NVIDIA',       logo: '/logos/nvidia.svg' },
  { name: 'AMD',          logo: '/logos/amd.svg' },
  { name: 'Google TPU',   logo: '/logos/googlecloud.svg' },
  { name: 'AWS Trainium', logo: '/logos/amazonaws.svg' },
  { name: 'Intel Gaudi',  logo: '/logos/intel.svg' },
]

const providers: Item[] = [
  { name: 'AWS',       logo: '/logos/amazonaws.svg' },
  { name: 'GCP',       logo: '/logos/googlecloud.svg' },
  { name: 'Azure',     logo: '/logos/microsoftazure.svg' },
  { name: 'CoreWeave', logo: '/logos/coreweave.svg' },
  { name: 'Lambda',    logo: '/logos/lambda.svg' },
  { name: 'on-prem',   logo: null },
]

const layers: Layer[] = [
  {
    name: 'Models',
    caption: 'open weights & custom',
    accent: '#f472b6',
    rows: [{ items: models, more: '+ any open-weight model' }],
  },
  {
    name: 'Serving',
    caption: 'inference engines',
    accent: 'var(--purple-hi)',
    rows: [{ items: engines, more: '+ any engine' }],
  },
  {
    name: 'Infrastructure',
    caption: 'accelerators & providers',
    accent: 'var(--cyan)',
    rows: [
      { label: 'Accelerators', items: accelerators, more: '+ any accelerator' },
      { label: 'Providers',    items: providers,    more: '+ any Kubernetes' },
    ],
  },
]

const capabilities = ['composes', 'provisions', 'schedules', 'autoscales', 'routes', 'caches']

function LogoPill({ name, logo }: Item) {
  return (
    <span className="infra-pill infra-pill--static">
      {logo
        ? <img src={logo} alt={name} className="infra-pill-logo" />
        : <span className="infra-pill-initial">{name[0]}</span>}
      {name}
    </span>
  )
}

function Pills({ items, more }: Row) {
  return (
    <div className="eco-pills">
      {items.map(i => <LogoPill key={i.name} {...i} />)}
      {more && <span className="infra-pill infra-pill-more">{more}</span>}
    </div>
  )
}

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="infra-section">
      <div className="wrap">
        <h2 className="section-title reveal">The inference ecosystem. <span className="grad">Under one control plane.</span></h2>
        <p className="section-body section-body--wide reveal">
          Any model, any engine, any infrastructure. Modelplane doesn&rsquo;t replace the inference
          ecosystem; it sits above the pieces your teams already choose and composes them into a
          running, self-reconciling fleet.
        </p>

        <div className="eco-stack reveal">
          {/* Modelplane: the control plane, on top */}
          <div className="eco-mp">
            <div className="eco-mp-id">
              <img src="/logo-inverted.svg" className="eco-mp-logo" alt="Modelplane" />
            </div>
            <div className="eco-mp-caps">
              {capabilities.map(c => <span key={c}>{c}</span>)}
            </div>
          </div>

          <p className="eco-orchestrates">orchestrates</p>

          {/* The open ecosystem, in layers below */}
          <div className="eco">
            {layers.map(layer => (
              <div key={layer.name} className="eco-layer" style={{ borderLeftColor: layer.accent }}>
                <div className="eco-layer-head">
                  <p className="eco-layer-label" style={{ color: layer.accent }}>{layer.name}</p>
                  <p className="eco-layer-caption">{layer.caption}</p>
                </div>
                <div className="eco-layer-body">
                  {layer.rows.map((row, i) => (
                    <div key={row.label ?? i} className="eco-sub">
                      {row.label && <p className="eco-sub-label">{row.label}</p>}
                      <Pills {...row} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
