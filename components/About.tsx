'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { PERSONAL } from '@/lib/data'

const tags = [
  { label: 'UTP', color: '#FF9900', description: 'Systems Engineering, 5th semester' },
  { label: 'SENA', color: '#3ECF8E', description: 'Systems Technician, 2022–2024' },
  { label: 'Colombo', color: '#0078D4', description: 'English B2, bilingual education' },
  { label: 'Freelancer', color: '#3776AB', description: 'Production apps since 2024' },
  { label: 'Python', color: '#3776AB', description: 'Primary language' },
  { label: 'Cloud', color: '#4285F4', description: 'AWS & Azure learning path' },
  { label: 'Data', color: '#F7931E', description: 'Analysis & visualization' },
  { label: 'Pereira', color: '#888888', description: 'Coffee region, Colombia' },
]

function FadeInWhenVisible({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Avatar placeholder with pixel-art style initials
function AvatarBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* Glow behind */}
      <motion.div
        className="absolute -inset-4 rounded-3xl"
        style={{ background: 'radial-gradient(circle, rgba(55,118,171,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Main avatar card */}
      <motion.div
        className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden glass"
        initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
        animate={isInView ? { scale: 1, opacity: 1, rotateY: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03, rotateY: 4 }}
        style={{ perspective: 800 }}
      >
        {/* Gradient placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-[#111] via-[#1a1a2e] to-[#0a0a0a] flex flex-col items-center justify-center gap-3">
          {/* Code icon */}
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#3776AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
          <div className="text-center">
            <p className="text-white/80 font-bold font-mono text-sm">JH</p>
            <p className="text-white/30 font-mono text-xs">v19.0.0</p>
          </div>
        </div>
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      </motion.div>

      {/* Status badge */}
      <motion.div
        className="absolute -bottom-3 -right-3 glass rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-mono"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
        <span className="text-white/60">Available for work</span>
      </motion.div>

      {/* Tech badge */}
      <motion.div
        className="absolute -top-3 -left-3 glass rounded-xl px-3 py-2 text-xs font-mono text-[#3776AB] flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="https://cdn.simpleicons.org/python/3776AB" width="12" height="12" alt="" aria-hidden="true" />
        Python-first
      </motion.div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute right-0 top-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,153,0,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          y,
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <FadeInWhenVisible>
          <div className="mb-14">
            <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-3">01 — About Me</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              The human behind
              <br />
              <span className="text-gradient-blue">the keyboard</span>
            </h2>
            <div className="divider mt-4" />
          </div>
        </FadeInWhenVisible>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left: avatar */}
          <FadeInWhenVisible delay={0.1}>
            <div className="w-full lg:w-auto flex justify-center lg:justify-start">
              <AvatarBlock />
            </div>
          </FadeInWhenVisible>

          {/* Right: text content */}
          <div className="flex-1 space-y-6">
            <FadeInWhenVisible delay={0.2}>
              <p className="text-white/70 text-lg leading-relaxed">
                Hey, I'm <span className="text-white font-semibold">Jose Miguel Herrera</span> — a 19-year-old
                developer from <span className="text-[#FF9900]">Pereira, Colombia</span> (coffee capital of the world).
                I study Systems Engineering at <span className="text-white/90">UTP</span> and have been shipping
                production apps as a freelancer since 2024.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <p className="text-white/55 leading-relaxed">
                My stack is built around <span className="font-mono text-[#3776AB]">Python</span> at the core —
                from data manipulation to web backends — with a strong <span className="text-white/80">React/Next.js</span> frontend
                layer. I've deployed real solutions for NGOs, insurance companies, and e-commerce businesses
                that people actually use every day.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.4}>
              <p className="text-white/55 leading-relaxed">
                Right now I'm deep in my cloud journey —{' '}
                <span className="text-[#FF9900]">AWS</span>,{' '}
                <span className="text-[#0078D4]">Azure</span>, and{' '}
                <span className="text-[#FF3621]">Databricks</span> are on my radar.
                The goal: become a Data/Cloud Engineer who bridges the gap between
                <span className="text-white/80"> raw data</span> and{' '}
                <span className="text-white/80">business intelligence</span>.
              </p>
            </FadeInWhenVisible>

            {/* Tags chip cloud */}
            <FadeInWhenVisible delay={0.5}>
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag, i) => (
                  <motion.div
                    key={tag.label}
                    className="tag group relative"
                    whileHover={{ scale: 1.06, y: -1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    style={{ color: tag.color, borderColor: `${tag.color}30` }}
                    title={tag.description}
                  >
                    {tag.label}
                  </motion.div>
                ))}
              </div>
            </FadeInWhenVisible>

            {/* Quick facts row */}
            <FadeInWhenVisible delay={0.6}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {[
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3776AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
                    label: 'Location', value: 'Pereira, Colombia'
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3776AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 10-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c3.6 1.333 8.4 1.333 12 0v-5"/></svg>,
                    label: 'Education', value: 'UTP · 5th Semester'
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3776AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                    label: 'Languages', value: 'Spanish · English B2'
                  },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="glass rounded-xl p-3.5 flex items-start gap-3"
                  >
                    <span className="mt-0.5 shrink-0">{fact.icon}</span>
                    <div>
                      <p className="text-white/30 text-xs font-mono mb-0.5">{fact.label}</p>
                      <p className="text-white/80 text-sm font-medium">{fact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  )
}
