/* Compatibility — the inference ecosystem as a three-layer stack. Models on top, the
   serving stack in the middle, infrastructure + providers underneath. Each layer has
   sub-groups of the projects/vendors Modelplane composes. */

type Item = { name: string; logo: string | null; hideLabel?: boolean; href?: string }

const models: Item[] = [
  { name: 'Llama',    logo: '/logos/meta.svg',        href: 'https://huggingface.co/meta-llama' },
  { name: 'Qwen',     logo: '/logos/alibaba.svg',     href: 'https://huggingface.co/Qwen' },
  { name: 'Mistral',  logo: '/logos/mistralai.svg',   href: 'https://huggingface.co/mistralai' },
  { name: 'Gemma',    logo: '/logos/googlecloud.svg', href: 'https://huggingface.co/google' },
  { name: 'DeepSeek', logo: '/logos/deepseek.svg', href: 'https://huggingface.co/deepseek-ai' },
  { name: 'Phi',      logo: '/logos/microsoft.svg',   href: 'https://huggingface.co/microsoft' },
  { name: 'Falcon',   logo: '/logos/huggingface.svg', href: 'https://huggingface.co/tiiuae' },
  { name: 'Kimi K',   logo: '/logos/moonshot.svg',    href: 'https://huggingface.co/moonshotai' },
  { name: 'Nemotron', logo: '/logos/nvidia.svg',      href: 'https://huggingface.co/nvidia' },
  { name: 'MiniMax',  logo: '/logos/minimax.svg',     href: 'https://huggingface.co/MiniMaxAI' },
  { name: 'gpt-oss',  logo: '/logos/openai.svg',      href: 'https://huggingface.co/openai' },
]

const engines: Item[] = [
  { name: 'vLLM',         logo: '/logos/vllm.svg',        href: 'https://github.com/vllm-project/vllm' },
  { name: 'SGLang',       logo: null,                     href: 'https://github.com/sgl-project/sglang' },
  { name: 'TensorRT-LLM', logo: '/logos/nvidia.svg',      href: 'https://github.com/NVIDIA/TensorRT-LLM' },
  { name: 'TGI',          logo: '/logos/huggingface.svg', href: 'https://github.com/huggingface/text-generation-inference' },
  { name: 'LMDeploy',     logo: null,                     href: 'https://github.com/InternLM/lmdeploy' },
  { name: 'llama.cpp',    logo: null,                     href: 'https://github.com/ggml-org/llama.cpp' },
]

const backends: Item[] = [
  { name: 'LeaderWorkerSet', logo: '/logos/kubernetes.svg', href: 'https://github.com/kubernetes-sigs/lws' },
  { name: 'llm-d',           logo: null,                    href: 'https://llm-d.ai' },
  { name: 'Dynamo',          logo: '/logos/nvidia.svg',     href: 'https://github.com/ai-dynamo/dynamo' },
  { name: 'Grove',           logo: '/logos/nvidia.svg',     href: 'https://github.com/ai-dynamo/grove' },
]

const routing: Item[] = [
  { name: 'Gateway API',   logo: '/logos/kubernetes.svg', href: 'https://gateway-api.sigs.k8s.io' },
  { name: 'Envoy Gateway', logo: '/logos/envoy.svg',      href: 'https://gateway.envoyproxy.io' },
  { name: 'Traefik',       logo: '/logos/traefik.svg',    href: 'https://traefik.io' },
  { name: 'GAIE',          logo: null,                    href: 'https://github.com/kubernetes-sigs/gateway-api-inference-extension' },
  { name: 'Istio',         logo: '/logos/istio.svg',      href: 'https://istio.io' },
]

const schedulers: Item[] = [
  { name: 'Kubernetes + DRA', logo: '/logos/kubernetes.svg', href: 'https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/' },
  { name: 'KAI',              logo: '/logos/nvidia.svg',     href: 'https://github.com/NVIDIA/KAI-Scheduler' },
  { name: 'Kueue',            logo: null,                    href: 'https://kueue.sigs.k8s.io' },
  { name: 'Volcano',          logo: null,                    href: 'https://volcano.sh' },
  { name: 'Grove',            logo: '/logos/nvidia.svg',     href: 'https://github.com/ai-dynamo/grove' },
]

const accelerators: Item[] = [
  { name: 'NVIDIA',       logo: '/logos/nvidia.svg',      href: 'https://www.nvidia.com' },
  { name: 'AMD',          logo: '/logos/amd.svg',         href: 'https://www.amd.com' },
  { name: 'Google TPU',   logo: '/logos/googlecloud.svg', href: 'https://cloud.google.com/tpu' },
  { name: 'AWS Trainium', logo: '/logos/amazonaws.svg',   href: 'https://aws.amazon.com/ai/machine-learning/trainium/' },
  { name: 'Intel Gaudi',  logo: '/logos/intel.svg',       href: 'https://www.intel.com/content/www/us/en/products/details/processors/ai-accelerators/gaudi.html' },
]

const cloud: Item[] = [
  { name: 'AWS',    logo: '/logos/amazonaws.svg',      href: 'https://aws.amazon.com' },
  { name: 'GCP',    logo: '/logos/googlecloud.svg',    href: 'https://cloud.google.com' },
  { name: 'Azure',  logo: '/logos/microsoftazure.svg', href: 'https://azure.microsoft.com' },
  { name: 'Oracle', logo: '/logos/oracle.svg',         href: 'https://www.oracle.com/cloud' },
]

const neoclouds: Item[] = [
  { name: 'CoreWeave',  logo: '/logos/coreweave.svg', href: 'https://www.coreweave.com' },
  { name: 'Lambda',     logo: '/logos/lambda.svg',    href: 'https://lambda.ai/kubernetes' },
  { name: 'Nebius',     logo: null,                   href: 'https://nebius.com' },
  { name: 'Vultr',      logo: '/logos/vultr.svg',     href: 'https://www.vultr.com/kubernetes' },
  { name: 'Crusoe',     logo: null,                   href: 'https://www.crusoe.ai' },
  { name: 'Paperspace', logo: '/logos/paperspace.svg', href: 'https://www.paperspace.com' },
]

const onprem: Item[] = [
  { name: 'on-prem', logo: null },
]

const managed: Item[] = [
  { name: 'Together',  logo: null,                   href: 'https://www.together.ai' },
  { name: 'Baseten',   logo: null,                   href: 'https://www.baseten.co' },
  { name: 'Fireworks', logo: null,                   href: 'https://fireworks.ai' },
  { name: 'Replicate', logo: '/logos/replicate.svg', href: 'https://replicate.com' },
  { name: 'Modal',     logo: '/logos/modal.svg',     href: 'https://modal.com' },
]

type Sub = { label: string; items: Item[]; more?: string }
const layers: { name: string; accent: string; subs: Sub[] }[] = [
  {
    name: 'Models',
    accent: '#f472b6',
    subs: [{ label: 'Open weights & custom', items: models, more: '+ any open-weight or custom model' }],
  },
  {
    name: 'Serving',
    accent: 'var(--purple-hi)',
    subs: [
      { label: 'Engines', items: engines, more: '+ any engine container' },
      { label: 'Multi-node backends', items: backends },
      { label: 'Routing', items: routing },
      { label: 'Schedulers', items: schedulers },
    ],
  },
  {
    name: 'Infrastructure & providers',
    accent: 'var(--cyan)',
    subs: [
      { label: 'Accelerators', items: accelerators, more: '+ any accelerator' },
      { label: 'Cloud', items: cloud },
      { label: 'Neoclouds', items: neoclouds },
      { label: 'On-prem & BYO', items: onprem, more: '+ any Kubernetes' },
      { label: 'Managed inference', items: managed, more: '+ any OpenAI-compatible endpoint' },
    ],
  },
]

function LogoPill({ name, logo, hideLabel, href }: Item) {
  const inner = (
    <>
      {logo
        ? <img src={logo} alt={name} className="infra-pill-logo" />
        : <span className="infra-pill-initial">{name[0]}</span>
      }
      {!hideLabel && name}
    </>
  )
  return href
    ? <a className="infra-pill" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <span className="infra-pill infra-pill--static">{inner}</span>
}

function Pills({ items, more }: { items: Item[]; more?: string }) {
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
          Modelplane doesn&rsquo;t replace the inference ecosystem; it orchestrates it across three
          layers: the models you run, the serving stack that runs them, and the infrastructure,
          accelerators, and providers underneath. It composes what your teams already choose, and
          integrates new pieces as they emerge.
        </p>

        <div className="eco reveal">
          {layers.map(layer => (
            <div key={layer.name} className="eco-layer" style={{ borderLeftColor: layer.accent }}>
              <p className="eco-layer-label" style={{ color: layer.accent }}>{layer.name}</p>
              <div className="eco-layer-body">
                {layer.subs.map(sub => (
                  <div key={sub.label} className="eco-sub">
                    <p className="eco-sub-label">{sub.label}</p>
                    <Pills items={sub.items} more={sub.more} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
