import Head from 'next/head'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Privacy Policy'
const DESCRIPTION =
  'How Upbound, Inc. collects, uses, and shares information in connection with the Modelplane project website.'
const EFFECTIVE = 'June 22, 2026'

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
            <p className="hero-sub">Effective {EFFECTIVE} · Last updated {EFFECTIVE}</p>
          </header>

          <article className="post">
            <div className="prose">
              <p>
                This Privacy Policy describes how Upbound, Inc. and its affiliates
                (&ldquo;Upbound,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collect, use, and
                share information in connection with the Modelplane open-source project websites at{' '}
                <strong>modelplane.ai</strong> and <strong>docs.modelplane.ai</strong> (together, the
                &ldquo;Site&rdquo;).
              </p>
              <p>
                Modelplane is an open-source project that is currently operated by Upbound. This
                Privacy Policy is separate from the{' '}
                <a href="https://www.upbound.io/privacy-policy" target="_blank" rel="noopener noreferrer">Upbound Privacy Policy</a>{' '}
                (which governs upbound.io and Upbound&rsquo;s commercial services) and applies only to the
                Modelplane Site. It does not apply to any data you may process when running the
                Modelplane software (see &ldquo;The Modelplane Software&rdquo; below).
              </p>
              <p>
                Modelplane has not yet been donated to a foundation or other independent
                organization. If operation of the project transfers in the future, this Privacy
                Policy will be updated to reflect the new operator.
              </p>
              <p>
                We recommend that you read this Privacy Policy in full. If you have any questions
                about it or about our data practices, please contact us at{' '}
                <a href="mailto:info@modelplane.ai">info@modelplane.ai</a>.
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We may collect and receive information about users of the Site (&ldquo;users,&rdquo;
                &ldquo;you,&rdquo; or &ldquo;your&rdquo;) from the sources described below.
              </p>
              <p><strong>Information You Provide.</strong></p>
              <ul>
                <li>
                  <em>Communications.</em> If you contact us directly, we may receive information such
                  as your name, email address, the contents of your message and any attachments, and
                  any other information you choose to provide. We may also receive a confirmation when
                  you open an email from us.
                </li>
              </ul>
              <p>
                The personal information that you are asked to provide, and the reasons why, will be
                made clear to you at the point we ask you to provide it.
              </p>
              <p><strong>Information We Collect When You Use the Site.</strong></p>
              <ul>
                <li>
                  <em>Cookies and Other Tracking Technologies.</em> As is true of most websites, we
                  gather certain information automatically and store it in log files. This may include
                  internet protocol (IP) addresses, browser type, internet service provider (ISP),
                  referring/exit pages, operating system, date/time stamp, clickstream data, landing
                  page, and referring URL. To collect this information, cookies may be set on your
                  device when you visit the Site. Cookies contain a small amount of information that
                  allows our web servers to recognize you. In some countries, including countries in
                  the European Economic Area (&ldquo;EEA&rdquo;), this information may be considered personal
                  information under applicable data protection laws.
                </li>
              </ul>
              <p>
                <strong>The Modelplane Software.</strong> The Modelplane software does not collect
                telemetry, usage analytics, or any personal data, and it does not phone home when you
                run it. This Privacy Policy applies only to the Modelplane website.
              </p>
              <p>
                <strong>Information We Receive from Third Parties.</strong> If you interact with
                Modelplane through a linked third-party service (for example, a community platform),
                we may receive limited information from that service as needed to facilitate the
                interaction. Those services are governed by their own privacy policies.
              </p>

              <h2>2. How We Use Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain the Site;</li>
                <li>Improve and expand the Site and our documentation;</li>
                <li>Understand and analyze how you use the Site;</li>
                <li>Communicate with you, including to respond to your inquiries;</li>
                <li>Find and prevent fraud, abuse, and security issues; and</li>
                <li>
                  For compliance purposes, including enforcing our terms or other legal rights, or as
                  may be required by applicable laws and regulations or requested by any judicial
                  process or governmental agency.
                </li>
              </ul>

              <h2>3. How We Share Information</h2>
              <p>We may share the information we collect in the following ways:</p>
              <ul>
                <li>
                  <em>Vendors and Service Providers.</em> We may share information with third-party
                  vendors and service providers that perform services on our behalf, such as hosting
                  and analytics.
                </li>
                <li>
                  <em>Aggregate Information.</em> Where legally permissible, we may use and share
                  information in aggregated or de-identified form that cannot reasonably be used to
                  identify you.
                </li>
                <li>
                  <em>Analytics.</em> We use analytics providers such as Google Analytics. Google
                  Analytics uses cookies to collect non-identifying information. Google provides
                  additional privacy options regarding its Analytics cookies at{' '}
                  <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener noreferrer">google.com/policies/privacy/partners</a>.
                </li>
                <li>
                  <em>Successor Operator.</em> If the Modelplane project is transferred to a foundation
                  or other organization, information may be transferred to that successor operator, and
                  this Privacy Policy will be updated accordingly.
                </li>
                <li>
                  <em>Business Transfers.</em> Information may be disclosed or transferred to any
                  potential acquirer, successor, or assignee as part of any merger, acquisition,
                  financing, sale of assets, or similar transaction, or in the event of insolvency,
                  bankruptcy, or receivership.
                </li>
                <li>
                  <em>As Required by Law and Similar Disclosures.</em> We may share information to (i)
                  satisfy any applicable law, regulation, legal process, or governmental request; (ii)
                  enforce our terms, including investigation of potential violations; (iii) detect,
                  prevent, or address fraud, security, or technical issues; (iv) respond to your
                  requests; or (v) protect our rights, property, or safety, our users, and the public.
                </li>
                <li><em>With Your Consent.</em> We may share information with your consent.</li>
              </ul>

              <h2>4. Legal Basis for Processing Personal Information</h2>
              <p>
                Our legal basis for collecting and using the personal information described above
                depends on the personal information concerned and the specific context in which we
                collect it. We will normally collect personal information from you only (i) where the
                processing is in our legitimate interests and not overridden by your rights; or (ii)
                where we have your consent to do so. We have a legitimate interest in operating the
                Site and communicating with you as necessary, for example when responding to your
                queries, improving the Site, or detecting or preventing illegal activities. In some
                cases we may also have a legal obligation to collect personal information from you.
              </p>

              <h2>5. Third-Party Services</h2>
              <p>
                You may access other third-party services through the Site, for example by clicking on
                links to those services (such as GitHub or community platforms). We are not
                responsible for the privacy policies or practices of these third-party services, and
                we encourage you to review their privacy policies carefully.
              </p>

              <h2>6. Security</h2>
              <p>
                Upbound is committed to protecting your information. We employ a variety of security
                technologies and measures designed to protect information from unauthorized access,
                use, or disclosure, appropriate to the risk of processing your personal information.
              </p>

              <h2>7. Data Retention</h2>
              <p>
                We retain personal information we collect from you where we have an ongoing legitimate
                business need to do so (for example, to respond to a request you have made or to
                comply with applicable legal, tax, or accounting requirements). When we no longer have
                an ongoing legitimate business need to process your personal information, we will
                either delete or anonymize it or, if that is not possible (for example, because it has
                been stored in backup archives), securely store it and isolate it from further
                processing until deletion is possible.
              </p>

              <h2>8. Access</h2>
              <p>
                To protect your privacy and security, we may take reasonable steps to verify your
                identity before updating or removing your information. Information you provide may be
                archived or stored periodically according to backup processes conducted in the
                ordinary course of business for disaster recovery purposes. Your ability to access and
                correct your information may be temporarily limited where doing so could inhibit our
                ability to comply with a legal obligation; investigate, make, or defend legal claims;
                result in disclosure of personal information about a third party; or result in breach
                of a contract or disclosure of proprietary information.
              </p>

              <h2>9. Your Data Protection Rights Under the GDPR</h2>
              <p>If you are a resident of the EEA, you have the following data protection rights:</p>
              <ul>
                <li>
                  If you wish to access, correct, update, or request deletion of your personal
                  information, you can do so at any time by emailing{' '}
                  <a href="mailto:info@modelplane.ai">info@modelplane.ai</a>.
                </li>
                <li>
                  You can object to the processing of your personal information, ask us to restrict it,
                  or request portability of your personal information.
                </li>
                <li>
                  If we process your personal information with your consent, you can withdraw that
                  consent at any time. Withdrawal will not affect the lawfulness of any processing
                  conducted before withdrawal.
                </li>
                <li>
                  You have the right to complain to a data protection authority about our collection
                  and use of your personal information.
                </li>
              </ul>
              <p>
                We respond to all requests we receive from individuals wishing to exercise their data
                protection rights in accordance with applicable data protection laws.
              </p>

              <h2>10. Your Choices</h2>
              <p>
                You can use the Site without providing personal information, thereby limiting the type
                of information we collect. Many browsers let you disable or selectively accept cookies.
                If you choose not to accept cookies, some features and personalization of the Site may
                no longer work for you.
              </p>

              <h2>11. Children&rsquo;s Privacy</h2>
              <p>
                Modelplane does not knowingly collect information from children under the age of 13,
                and children under 13 are prohibited from using the Site. If you learn that a child has
                provided us with personal information in violation of this Privacy Policy, you can
                alert us at <a href="mailto:info@modelplane.ai">info@modelplane.ai</a>.
              </p>

              <h2>12. Changes to this Privacy Policy</h2>
              <p>
                This Privacy Policy may be modified from time to time, so please review it frequently.
                Changes will be posted on the Site. If we materially change the ways in which we use or
                share personal information previously collected from you, we will notify you through
                the Site, by email, or by other communication.
              </p>

              <h2>13. International Data Transfers</h2>
              <p>
                Upbound is a global business. We may transfer personal information to countries other
                than the country in which the data was originally collected. These countries may not
                have the same data protection laws as the country in which you initially provided the
                information. When we transfer your personal information, we will protect it as
                described in this Privacy Policy.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please email us at{' '}
                <a href="mailto:info@modelplane.ai">info@modelplane.ai</a>.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
