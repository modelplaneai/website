import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Modelplane is the open source control plane for AI models. Deploy any model on any GPU infrastructure you own (cloud, neocloud, or on-premise) and let the control plane operate it continuously." />
        <meta property="og:title" content="Modelplane · Open Source Control Plane for AI Models" />
        <meta property="og:description" content="Run any model on infrastructure you own. The control plane provisions, reconciles, and governs it continuously, without humans in the loop." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icon.png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="alternate" type="application/rss+xml" title="Modelplane Blog" href="/feed.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
