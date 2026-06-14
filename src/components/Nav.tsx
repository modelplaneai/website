import { useState, useEffect } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Close menu on route/hash change
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <nav>
      <div className="wrap">
        <a href="/" className="nav-logo">
          <img src="/icon-white.svg" alt="Modelplane" height={32} />
        </a>

        <ul className="nav-links">
          <li><a href="#">Docs</a></li>
          <li><a href="https://github.com/modelplaneai" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="#" className="nav-cta">Get started →</a></li>
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
          <a href="#" onClick={() => setOpen(false)}>Docs</a>
          <a href="https://github.com/modelplaneai" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>GitHub</a>
          <a href="#" className="nav-cta-mobile" onClick={() => setOpen(false)}>Get started →</a>
        </div>
      )}
    </nav>
  )
}
