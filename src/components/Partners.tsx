export default function Partners() {
  return (
    <section className="partners-section">
      <div className="wrap">
        <div className="partners-inner reveal">
          <div className="partners-row">
            <p className="partners-label">Created by</p>
            <a href="https://upbound.io" target="_blank" rel="noopener noreferrer" className="partners-logo-link">
              <img src="/logos/upbound.svg" alt="Upbound" className="partners-logo" />
            </a>
          </div>

          <div className="partners-divider" />

          <div className="partners-row">
            <p className="partners-label">Built on</p>
            <a href="https://crossplane.io" target="_blank" rel="noopener noreferrer" className="partners-logo-link">
              <img src="/logos/crossplane-color-white.svg" alt="Crossplane" className="partners-logo partners-logo-color" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
