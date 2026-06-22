import { useState, useEffect } from 'react'
import GithubIcon from '@/components/GithubIcon'

const GITHUB_URL = 'https://github.com/modelplaneai'
// TODO: replace with the real Slack invite URL (not provided in the copy doc).
const SLACK_URL = '#slack'

export default function Nav() {
  const [open, setOpen] = useState(false)
  // On the homepage the hero shows its own large wordmark, so we hide the nav
  // logo while the hero is in view (avoids two logos). Once the hero scrolls
  // away, the nav slides in with the logo and stays sticky. Pages without a
  // hero just show the logo normally.
  const [past, setPast] = useState(false)
  const [heroPage, setHeroPage] = useState(false)

  // Close menu on route/hash change
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  useEffect(() => {
    const hero = document.querySelector('.herox')
    if (!hero) {
      setPast(true) // no hero on this page → show the logo normally
      return
    }
    setHeroPage(true)
    const obs = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  const navClass = [
    !past ? 'nav--top' : '',
    past && heroPage ? 'nav--reveal' : '',
  ].filter(Boolean).join(' ')

  return (
    <nav className={navClass}>
      <div className="wrap">
        <a href="/" className="nav-logo">
          <img src="/icon-color.svg" alt="Modelplane" height={32} />
        </a>

        <ul className="nav-links">
          <li><a href="https://docs.modelplane.ai">Docs</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/manifesto">Manifesto</a></li>
          <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a></li>
          <li><a href={SLACK_URL} target="_blank" rel="noopener noreferrer">Slack</a></li>
          <li><a href="#" className="nav-cta">Get started →</a></li>
          <li><a href={GITHUB_URL} className="nav-cta-ghost" target="_blank" rel="noopener noreferrer">★ Star the Project</a></li>
        </ul>

        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="nav-dropdown">
          <a href="https://docs.modelplane.ai" onClick={() => setOpen(false)}>Docs</a>
          <a href="/blog" onClick={() => setOpen(false)}>Blog</a>
          <a href="/manifesto" onClick={() => setOpen(false)}>Manifesto</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => setOpen(false)}><GithubIcon /></a>
          <a href={SLACK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Slack</a>
          <a href="#" className="nav-cta-mobile" onClick={() => setOpen(false)}>Get started →</a>
          <a href={GITHUB_URL} className="nav-cta-mobile" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>★ Star the Project</a>
        </div>
      )}
    </nav>
  )
}
