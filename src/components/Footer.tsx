import GithubIcon from '@/components/GithubIcon'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-left">
            <a href="/" className="footer-logo">
              <img src="/icon-color.svg" alt="Modelplane" height={32} />
            </a>
            <span className="footer-tagline">Open source control plane for AI models</span>
          </div>
          <div className="footer-right">
            <a href="https://docs.modelplane.ai">Docs</a>
            <a href="/blog">Blog</a>
            <a href="https://github.com/modelplaneai" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
          </div>
        </div>
        <p className="footer-legal">
          © 2026 The Modelplane Authors. Modelplane™ is a trademark.{' '}
          <a href="https://www.upbound.io/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy</a>
        </p>
      </div>
    </footer>
  )
}
