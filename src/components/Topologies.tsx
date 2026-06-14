/* Serving stack — the serving topologies Modelplane can place. Topology is described
   as shape, so new parallelism strategies work without changes to Modelplane. */

const PURPLE = 'rgba(173,123,252,0.55)'
const CYAN = 'rgba(34,211,238,0.55)'
const GREEN = 'rgba(52,211,153,0.55)'

function Sq({ color = PURPLE, fill = 'rgba(173,123,252,0.18)' }: { color?: string; fill?: string }) {
  return <span style={{ width: '16px', height: '16px', borderRadius: '3px', background: fill, border: `1px solid ${color}`, display: 'inline-block' }} />
}
function Arr() {
  return <span style={{ color: 'var(--muted)', fontSize: '13px', opacity: 0.75 }}>→</span>
}
function Gap() {
  return <span style={{ width: '7px', display: 'inline-block' }} />
}

const topologies = [
  {
    name: 'tensor parallel',
    desc: 'Split each layer across GPUs in a node for low-latency single-model serving.',
    shape: <><Sq /><Sq /><Sq /><Sq /></>,
  },
  {
    name: 'pipeline parallel',
    desc: 'Stage a model across nodes so very large models fit beyond a single box.',
    shape: <><Sq /><Arr /><Sq /><Arr /><Sq /></>,
  },
  {
    name: 'data / expert',
    desc: 'Replicate workers, or shard experts across them for MoE throughput.',
    shape: <><Sq /><Sq /><Gap /><Sq /><Sq /></>,
  },
  {
    name: 'prefill / decode',
    desc: 'Disaggregate prefill and decode onto separate pools for frontier serving.',
    shape: <><Sq color={CYAN} fill="rgba(34,211,238,0.18)" /><Sq color={CYAN} fill="rgba(34,211,238,0.18)" /><Arr /><Sq color={GREEN} fill="rgba(52,211,153,0.18)" /><Sq color={GREEN} fill="rgba(52,211,153,0.18)" /></>,
  },
]

export default function Topologies() {
  return (
    <section id="topologies" className="topo-section">
      <div className="wrap">
        <h2 className="section-title reveal">Advanced serving. <span className="grad">From one GPU to frontier.</span></h2>
        <p className="section-body section-body--wide reveal">
          Modelplane matches each model&rsquo;s requirements and serving topology to the hardware
          available, using expressive CEL selectors and composable API shapes. Topology is declared
          as shape, so it places anything from a single GPU to multi-node, disaggregated frontier
          serving, and new parallelism strategies work as they emerge.
        </p>

        <div className="topo-grid reveal">
          {topologies.map(t => (
            <div key={t.name} className="topo-card">
              <span className="topo-shape">{t.shape}</span>
              <p className="topo-name">{t.name}</p>
              <p className="topo-desc">{t.desc}</p>
            </div>
          ))}
          <div className="topo-card topo-next">
            <span className="topo-shape">
              <span className="topo-ph" /><span className="topo-ph" /><span className="topo-ph" />
            </span>
            <p className="topo-name">+ emerging topology</p>
            <p className="topo-desc">Described as shape, so future parallelism strategies just work.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
