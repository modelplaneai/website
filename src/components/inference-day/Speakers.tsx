import speakers from '@/data/inference-day/speakers.json'

// Speakers: a featured row (Kelsey large, Viktor small) above a panelist grid.
// The JSON order is authoritative — Itay Neeman first, Annie Talvasto last.
const [kelsey, viktor] = speakers.featured

export default function Speakers() {
  return (
    <section className="id-speakers" id="speakers">
      <div className="id-wrap">
        <p className="id-eyebrow">Speakers</p>
        <h2 className="id-h2">The people building the inference stack.</h2>

        <div className="id-featured">
          <div className="id-featured--large">
            <img
              src={kelsey.photo}
              alt={kelsey.name}
              width={300}
              height={392}
              className="id-photo"
              loading="lazy"
            />
            <div>
              <p className="id-eyebrow">{kelsey.eyebrow}</p>
              <p className="id-featured-name-lg">{kelsey.name}</p>
              <p className="id-featured-bio-lg">{kelsey.bio}</p>
            </div>
          </div>

          <div className="id-featured--small">
            <img
              src={viktor.photo}
              alt={viktor.name}
              width={150}
              height={196}
              className="id-photo"
              loading="lazy"
            />
            <div>
              <p className="id-eyebrow">{viktor.eyebrow}</p>
              <p className="id-featured-name-sm">{viktor.name}</p>
              <p className="id-featured-bio-sm">{viktor.bio}</p>
            </div>
          </div>
        </div>

        <p className="id-eyebrow id-panelists-label">Panelists</p>
        <div className="id-panel-grid">
          {speakers.panelists.map((p) => (
            <div key={p.id} className="id-panel-card">
              <img
                src={p.photo}
                alt={p.name}
                width={150}
                height={150}
                className="id-photo"
                loading="lazy"
              />
              {p.tag && <p className="id-panel-tag">{p.tag}</p>}
              <h3 className="id-panel-name">{p.name}</h3>
              <p className="id-panel-role">{p.role}</p>
              <p className="id-panel-project">{p.project}</p>
            </div>
          ))}
        </div>

        {speakers.footnote && <p className="id-panel-footnote">{speakers.footnote}</p>}
      </div>
    </section>
  )
}
