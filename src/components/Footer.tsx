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
            <a href="#">Docs</a>
            <a href="/blog">Blog</a>
            <a href="https://github.com/modelplaneai" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
