import Head from 'next/head'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Intelligence belongs to everyone'
const DESCRIPTION =
  'Intelligence should belong to everyone. Why we are building Modelplane in the open as a neutral control plane for the open intelligence ecosystem.'

export default function Manifesto() {
  const url = `${SITE_URL}/manifesto`

  return (
    <>
      <Head>
        <title>Manifesto · Modelplane</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${TITLE} · Modelplane`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${TITLE} · Modelplane`} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>
      <Nav />
      <main className="blog-main">
        <div className="wrap">
          <header className="post-header">
            <p className="section-label">Manifesto</p>
            <h1 className="post-title">{TITLE}</h1>
          </header>

          <article className="post">
            <div className="prose">
              <p>
                Intelligence is becoming the most important capability humanity has ever
                built. The defining question of this era is who controls it. We believe
                intelligence should belong to everyone: every company, every developer,
                every institution, and every country should be able to run and control its
                own intelligence.
              </p>
              <p>
                The first generation of AI moved in the opposite direction. A small number
                of organizations built and operated the most capable models, while everyone
                else reached them through APIs. This gave us access to intelligence
                controlled by someone else, access that could be revoked, restricted,
                degraded, or shaped by the priorities of a provider, a platform, or a
                government. Dependence on one provider also constrains the intelligence
                itself, because the models you can use, the economics of running them, and
                the pace at which they improve for your data and use cases are ultimately
                determined by a vendor.
              </p>
              <p>
                Open-weight models are changing that trajectory. Once frontier-quality
                models could be downloaded and run by anyone, intelligence stopped being a
                product sold by a few and started becoming an ecosystem built by many.
                Models, inference engines, gateways, serving systems, accelerators, and
                clouds, are now evolving independently, each advancing faster than any one
                company could move alone. No vendor can own every breakthrough across an
                ecosystem this broad and fast-moving. For the first time, people can choose
                the best pieces for their needs while keeping control of the intelligence
                they depend on.
              </p>
              <p>
                But choice without coordination can become fragmentation. As the ecosystem
                grows, so does the complexity of operating it. Intelligence becomes spread
                across many environments, providers, and technologies, and the burden of
                holding it all together becomes the limiting factor. Every important
                horizontal ecosystem eventually develops a neutral control layer that
                allows independent parts to function as a coherent whole. Open intelligence
                is beginning to need the same thing.
              </p>
              <p>
                That is why we are building Modelplane in the open. Modelplane is a control
                plane designed to bring together the models, engines, gateways, schedulers,
                clouds, and accelerators that make up the open intelligence ecosystem and
                help operate them as a single system under your control. We intend to donate
                Modelplane to a neutral open source foundation this year, ensuring that it
                belongs to the ecosystem it serves.
              </p>
              <p>Intelligence belongs to everyone. Help us build that future.</p>
              <p className="manifesto-sign">– Bassam Tabbara</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
