import { useState } from 'react'

interface ShareLinksProps {
  url: string
  title: string
}

export default function ShareLinks({ url, title }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)

  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  }

  return (
    <div className="share-links">
      <span className="share-label">Share</span>
      <a className="share-btn" href={x} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <a className="share-btn" href={linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <button type="button" className="share-btn" onClick={copy}>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
