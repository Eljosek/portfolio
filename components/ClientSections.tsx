'use client'

import dynamic from 'next/dynamic'

const TechStack = dynamic(() => import('@/components/TechStack'), {
  ssr: false,
  loading: () => (
    <section id="skills" className="section-padding flex items-center justify-center">
      <div className="text-white/20 font-mono text-sm animate-pulse">Loading tech stack...</div>
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

export default function ClientSections() {
  return (
    <>
      <TechStack />
      <Projects />
      <Timeline />
      <CloudPath />
    </>
  )
}
