import Head from 'next/head'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Privacy Policy'
const DESCRIPTION =
  'How the Modelplane website collects, uses, and shares information about visitors.'
const LAST_UPDATED = 'June 22, 2026'

export default function Privacy() {
  const url = `${SITE_URL}/privacy`

  return (
    <>
      <Head>
        <title>Privacy Policy · Modelplane</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${TITLE} · Modelplane`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="robots" content="noindex" />
      </Head>
      <Nav />
      <main className="blog-main">
        <div className="wrap">
          <header className="manifesto-header">
            <p className="section-label">Legal</p>
            <h1 className="post-title">{TITLE}</h1>
            <p className="hero-sub">Last updated: {LAST_UPDATED}</p>
          </header>

          <article className="post">
            <div className="prose">
              <p>
                This Privacy Policy explains how information is collected, used, and shared
                when you visit the Modelplane website at modelplane.ai and the
                documentation at docs.modelplane.ai (together, the &ldquo;Site&rdquo;). The Site
                is operated by Upbound, Inc. (&ldquo;Upbound,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), the company behind
                the Modelplane open source project. This policy covers the Site only; the
                Modelplane software you download and run in your own environment does not
                send any data back to us.
              </p>

              <h2>Information we collect</h2>
              <p>We keep what we collect to a minimum. We do not require an account to use the Site.</p>
              <ul>
                <li>
                  <strong>Usage and device data, collected automatically.</strong> When you
                  visit the Site, our analytics providers collect standard information such
                  as the pages you view, referring URLs, approximate location derived from
                  your IP address, and basic device and browser details.
                </li>
                <li>
                  <strong>Information you choose to give us.</strong> If you contact us by
                  email or follow a link to an external service (for example GitHub), any
                  information you provide is handled by us or by that service under its own
                  terms.
                </li>
              </ul>

              <h2>Cookies and tracking technologies</h2>
              <p>
                We use the following analytics services on the Site. Some set cookies or
                similar identifiers in your browser:
              </p>
              <ul>
                <li>
                  <strong>Google Analytics 4</strong> (Google LLC) &mdash; measures Site
                  usage and traffic. Sets cookies. See{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&rsquo;s Privacy Policy</a>.
                </li>
                <li>
                  <strong>Common Room</strong> (Common Room PBC) &mdash; helps us understand
                  how the developer community engages with Modelplane. Sets cookies or
                  identifiers.
                </li>
                <li>
                  <strong>Vercel Web Analytics and Speed Insights</strong> (Vercel Inc.)
                  &mdash; privacy-friendly, aggregate usage and performance metrics. Does not
                  use cookies.
                </li>
              </ul>
              <p>
                You can control or refuse cookies through your browser settings, and you can
                opt out of Google Analytics specifically with the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
                Blocking cookies will not break the Site.
              </p>

              <h2>How we use information</h2>
              <ul>
                <li>To understand how the Site is used and to improve its content and performance.</li>
                <li>To understand interest in Modelplane and engage with the open source community.</li>
                <li>To maintain the security and reliability of the Site.</li>
              </ul>
              <p>We do not sell your personal information, and we do not use it for third-party advertising.</p>

              <h2>How we share information</h2>
              <p>
                We share information only with the service providers that help us operate the
                Site &mdash; the analytics providers named above and our hosting provider
                (Vercel) &mdash; who process it on our behalf. We may also disclose
                information if required by law or to protect our rights.
              </p>

              <h2>International transfers</h2>
              <p>
                We are based in the United States, and our providers may process data there.
                Where data is transferred from the European Economic Area, the United
                Kingdom, or Switzerland, our providers rely on recognized transfer mechanisms
                such as the EU&ndash;U.S. Data Privacy Framework or Standard Contractual Clauses.
              </p>

              <h2>Your rights</h2>
              <p>
                Depending on where you live, you may have rights to access, correct, delete,
                or restrict the use of your personal information, and to object to certain
                processing. Residents of the EEA, the UK, and Switzerland have rights under
                the GDPR; California residents have rights under the CCPA/CPRA. To exercise
                any of these, contact us using the details below.
              </p>

              <h2>Data retention</h2>
              <p>
                We retain analytics data only as long as needed for the purposes above, in
                line with our providers&rsquo; default retention settings, after which it is
                deleted or aggregated.
              </p>

              <h2>Children</h2>
              <p>
                The Site is intended for a professional, developer audience and is not
                directed to children under 16. We do not knowingly collect information from
                children.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                We may update this policy from time to time. When we do, we will revise the
                &ldquo;Last updated&rdquo; date above. Material changes will be made clear on this page.
              </p>

              <h2>Contact us</h2>
              <p>
                Questions about this policy or your information can be sent to{' '}
                <a href="mailto:privacy@upbound.io">privacy@upbound.io</a>. For information
                about Upbound&rsquo;s products and services more broadly, see{' '}
                <a href="https://www.upbound.io/privacy-policy" target="_blank" rel="noopener noreferrer">Upbound&rsquo;s Privacy Policy</a>.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
