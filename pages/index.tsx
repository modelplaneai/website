import Head from 'next/head'

export default function Teaser() {
  return (
    <>
      <Head>
        <title>Modelplane</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}>
        <img src="/logo-inverted.svg" alt="Modelplane" style={{ height: '72px', maxWidth: '80vw', objectFit: 'contain' }} />
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}>
          Coming soon
        </p>
        <a href="/preview" className="btn-primary" style={{ marginTop: '16px', fontSize: '13px', padding: '8px 20px' }}>
          Preview →
        </a>
      </div>
    </>
  )
}
