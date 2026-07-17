import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Metricool tracking pixel. Metricool's provided snippet is a static <img>,
// which on a Next.js SPA only fires on full page loads. We fire the same pixel
// on the initial load and on every client-side route change so all page views
// are counted. Rendered in production only (see _app.tsx), matching the other
// analytics integrations. Hash provided by the marketing team.
const METRICOOL_HASH = '25ef3f75f0f3067e25c8cdb4aa071465'

function trackPageview() {
  if (typeof window === 'undefined') return
  // Cache-buster (t) so each page view is a distinct request — the browser
  // would otherwise reuse the cached response and skip the hit on later
  // navigations to the same URL.
  const img = new window.Image()
  img.src = `https://tracker.metricool.com/c3po.jpg?hash=${METRICOOL_HASH}&t=${Date.now()}`
}

export default function MetricoolPixel() {
  const router = useRouter()

  useEffect(() => {
    trackPageview() // initial page view
    router.events.on('routeChangeComplete', trackPageview)
    return () => router.events.off('routeChangeComplete', trackPageview)
  }, [router.events])

  return null
}
