'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SOCIAL_LINKS, PERSONAL } from '@/lib/data'

// ─── Magnetic button wrapper ──────────────────────────────────
function MagneticButton({
  children,
  className,
  href,
  download,
  target,
  rel,
  strength = 0.35,
}: {
  children: React.ReactNode
  className?: string
  href: string
  download?: boolean
  target?: string
  rel?: string
  strength?: number
}) {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={btnRef}
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  )
}

// ─── Social link card ─────────────────────────────────────────
const ICONS: Record<string, JSX.Element> = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  download: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
}

// ─── Morphing cloud background ────────────────────────────────
function CloudBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Slow morphing blobs */}
      {[
        { x: '10%', y: '20%', size: 400, color: 'rgba(55,118,171,0.06)', dur: 8 },
        { x: '75%', y: '60%', size: 300, color: 'rgba(255,153,0,0.04)', dur: 11 },
        { x: '50%', y: '85%', size: 500, color: 'rgba(0,120,212,0.05)', dur: 14 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: [1, 1.15, 0.95, 1],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{ duration: blob.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may be unavailable in some contexts
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding bg-[#0a0a0a] overflow-hidden"
    >
      <CloudBackground />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-4">06 — Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Let's build something<br />
            <span className="text-gradient-blue">together</span>
          </h2>
          <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            I'm open to freelance projects, collaborations, and conversations
            about Python, cloud, or data engineering. Don't hesitate to reach out.
          </p>
        </motion.div>

        {/* Email copy block */}
        <motion.div
          className="glass rounded-2xl px-6 py-5 flex items-center justify-between gap-4 mb-10 group hover:border-[#3776AB]/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onClick={handleCopyEmail}
          style={{ cursor: 'pointer' }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[#3776AB] text-lg">{ICONS.mail}</span>
            <span className="font-mono text-white/70 text-sm group-hover:text-white transition-colors">
              {PERSONAL.email}
            </span>
          </div>
          <motion.span
            className="text-xs font-mono px-3 py-1.5 rounded-lg text-white/40 border border-white/10"
            animate={copied ? { scale: [1, 1.08, 1], color: '#3ECF8E' } : { color: 'rgba(255,255,255,0.4)' }}
          >
            {copied ? '✓ Copied!' : 'Click to copy'}
          </motion.span>
        </motion.div>

        {/* Social links — magnetic buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {SOCIAL_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <MagneticButton
                href={link.url}
                download={link.icon === 'download'}
                target={link.icon !== 'download' && link.icon !== 'mail' ? '_blank' : undefined}
                rel={link.icon !== 'download' && link.icon !== 'mail' ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  link.icon === 'download' && link.color === '#3776AB'
                    ? 'bg-[#3776AB] text-white shadow-lg shadow-blue-900/20 hover:bg-[#4a8fc7]'
                    : link.icon === 'download' && link.color === '#FF9900'
                    ? 'bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30 hover:bg-[#FF9900]/25'
                    : 'glass glass-hover text-white/60 hover:text-white'
                }`}
              >
                <span style={{ color: link.icon === 'download' ? '#fff' : link.color }}>
                  {ICONS[link.icon]}
                </span>
                <div className="text-left">
                  <div className="font-medium">{link.label}</div>
                  <div className="text-[10px] font-mono opacity-50">{link.description}</div>
                </div>
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer divider */}
        <motion.div
          className="border-t border-white/[0.04] pt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/20">
            <div>Built with Next.js 15 · Framer Motion · Tailwind CSS</div>
            <div>© 2026 Jose Miguel Herrera Gutierrez</div>
          </div>
          <motion.p
            className="mt-4 text-xs font-mono text-white/10"
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Pereira, Colombia · UTC-5
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
