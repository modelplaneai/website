const GITHUB_URL = 'https://github.com/modelplaneai'
// TODO: replace placeholders with real destinations (not provided in the copy doc).
const SLACK_URL = '#slack' // "Join the community"
const HARDWARE_URL = '#bring-hardware' // "Bring hardware to the open test fleet"

function GithubMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function OpenSource() {
  return (
    <>
      <section className="oss-section">
        <div className="wrap">
          <h2 className="section-title reveal">
            Genuinely open. <span className="grad">Yours to run and operate.</span>
          </h2>
          <p className="section-body section-body--wide reveal">
            Modelplane is Apache 2 and open source end to end. The control plane lives entirely in your infrastructure and depends on nothing outside it, so no vendor can restrict, throttle, or revoke access. Donation to a neutral open source foundation is planned.
          </p>
          <p className="section-body section-body--wide reveal">
            Built by the team behind Crossplane, the proven open source foundation for infrastructure control planes, trusted at Apple, JPMC, Nike, Elastic, Grafana, and MongoDB.
          </p>
          <div className="oss-actions reveal">
            <a href="#" className="btn-primary">Get started →</a>
            <a href={GITHUB_URL} className="btn-ghost" target="_blank" rel="noopener noreferrer">
              <GithubMark />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="oss-section">
        <div className="wrap">
          <h2 className="section-title reveal">
            Build it <span className="grad">in the open.</span>
          </h2>
          <p className="section-body section-body--wide reveal">
            Modelplane is Apache 2 and developed in public, headed for a neutral foundation. If you run
            accelerators &mdash; any vendor, any cloud, on-prem &mdash; you can help prove out the fleet
            across real hardware and shape the API before it sets.
          </p>
          <div className="oss-actions reveal">
            <a href={GITHUB_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <GithubMark />
              ★ Star on GitHub
            </a>
            <a href={SLACK_URL} className="btn-ghost" target="_blank" rel="noopener noreferrer">
              Join the community
            </a>
            <a href={HARDWARE_URL} className="btn-ghost" target="_blank" rel="noopener noreferrer">
              Bring hardware to the open test fleet
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
