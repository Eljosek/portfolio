'use client'

import dynamic from 'next/dynamic'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Contact from '@/components/Contact'

// Lazy-load heavy sections to preserve initial load performance
const TechSphere = dynamic(() => import('@/components/TechSphere'), {
  ssr: false,
  loading: () => (
    <section id="skills" className="section-padding flex items-center justify-center">
      <div className="text-white/20 font-mono text-sm animate-pulse">Loading tech sphere...</div>
    </section>
  ),
})

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false,
  loading: () => (
    <section id="projects" className="section-padding flex items-center justify-center">
      <div className="text-white/20 font-mono text-sm animate-pulse">Loading projects...</div>
    </section>
  ),
})

const Timeline = dynamic(() => import('@/components/Timeline'), {
  ssr: false,
  loading: () => (
    <section id="timeline" className="section-padding flex items-center justify-center">
      <div className="text-white/20 font-mono text-sm animate-pulse">Loading timeline...</div>
    </section>
  ),
})

const CloudPath = dynamic(() => import('@/components/CloudPath'), {
  ssr: false,
  loading: () => (
    <section id="cloud-path" className="section-padding flex items-center justify-center">
      <div className="text-white/20 font-mono text-sm animate-pulse">Loading cloud path...</div>
    </section>
  ),
})

export default function Home() {
  return (
    <>
      {/* Custom cursor — client only, no SSR */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <About />
        <TechSphere />
        <Projects />
        <Timeline />
        <CloudPath />
        <Contact />
      </main>
    </>
  )
}
