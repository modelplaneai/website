import Head from 'next/head'
import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Capabilities from '@/components/Capabilities'
import Infrastructure from '@/components/Infrastructure'
import Topologies from '@/components/Topologies'
import HowItWorks from '@/components/HowItWorks'
import OpenSource from '@/components/OpenSource'
import Partners from '@/components/Partners'
import Footer from '@/components/Footer'

export default function Home() {
  // Set up scroll-reveal observer (mirrors the original HTML script)
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Modelplane · The open source control plane for AI inference</title>
      </Head>
      <Nav />
      <Hero />
      <hr className="divider" />
      <Partners />
      <hr className="divider" />
      <Infrastructure />
      <hr className="divider" />
      <Topologies />
      <hr className="divider" />
      <HowItWorks />
      <hr className="divider" />
      <Capabilities />
      <hr className="divider" />
      <OpenSource />
      <Footer />
    </>
  )
}
