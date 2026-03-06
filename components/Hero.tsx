'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { PERSONAL } from '@/lib/data'

// ─── Particle Network Canvas ──────────────────────────────────
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isPausedRef = useRef(false)

  // Pause animation when not visible for performance
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const section = canvas.closest('section')
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => { isPausedRef.current = !entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COLORS = {
      particle: 'rgba(55, 118, 171, 0.7)',
      particleAlt: 'rgba(255, 153, 0, 0.4)',
      line: 'rgba(55, 118, 171, 0.12)',
    }

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const PARTICLE_COUNT = Math.min(48, Math.floor((width * height) / 25000))
    const CONNECTION_DIST = 140
    const MOUSE_DIST = 180

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      color: string
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.85 ? COLORS.particleAlt : COLORS.particle,
    }))

    const draw = () => {
      if (isPausedRef.current) {
        animFrameRef.current = requestAnimationFrame(draw)
        return
      }
      ctx.clearRect(0, 0, width, height)

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(55, 118, 171, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Mouse repel connections
      particles.forEach((p) => {
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const opacity = (1 - dist / MOUSE_DIST) * 0.5
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 153, 0, ${opacity})`
          ctx.lineWidth = 0.8
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
          // Repel
          p.vx += (dx / dist) * 0.015
          p.vy += (dy / dist) * 0.015
        }
      })

      // Draw & update particles
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        // Damp velocity
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap edges
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    />
  )
}

// ─── Typing Cycler ────────────────────────────────────────────
function SubtitleCycler({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [items])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
          transition={{ duration: 0.4 }}
          className="text-gradient-blue font-mono text-lg md:text-xl"
        >
          {items[index]}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

// ─── Char-by-char name reveal ─────────────────────────────────
function CharReveal({ text, className }: { text: string; className?: string }) {
  const chars = text.split('')
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4 + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ─── Scroll Indicator ─────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
    >
      <span className="text-white/30 text-xs font-mono tracking-widest uppercase">scroll</span>
      <div className="w-[1px] h-10 overflow-hidden relative">
        <motion.div
          className="absolute w-full bg-gradient-to-b from-transparent via-[#3776AB] to-transparent"
          style={{ height: '100%' }}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main Hero ────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Parallax for the glow blob
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 })
  const glowX = useTransform(springX, [0, 1], ['-10%', '10%'])
  const glowY = useTransform(springY, [0, 1], ['-10%', '10%'])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  const stats = [
    { label: 'Projects Shipped', value: '4+' },
    { label: 'Semester @ UTP', value: '5th' },
    { label: 'Years Freelancing', value: '2+' },
    { label: 'English Level', value: 'B2' },
  ]

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Particle background */}
      <ParticleNetwork />

      {/* Radial glow — follows mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(circle, rgba(55,118,171,0.12) 0%, rgba(55,118,171,0.04) 40%, transparent 70%)',
          filter: 'blur(60px)',
          top: '50%',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Bottom fog */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16 md:pt-24">
        {/* Pre-label */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs font-mono text-white/30 tracking-[0.25em] uppercase">
            Pereira, Colombia
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-[#3776AB]" />
          <span className="text-xs font-mono text-white/30 tracking-[0.25em] uppercase">
            Systems Engineering · UTP
          </span>
        </motion.div>

        {/* Main name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-3" style={{ perspective: 600 }}>
          <CharReveal text="Jose" className="text-white mr-[0.3em]" />
          <CharReveal text="Herrera" className="text-gradient-blue" />
        </h1>

        {/* Animated subtitle */}
        <div className="h-10 flex items-center justify-center mt-4 mb-8">
          <SubtitleCycler items={PERSONAL.subtitleCycle} />
        </div>

        {/* Description */}
        <motion.p
          className="max-w-xl mx-auto text-white/50 text-base md:text-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Building production apps, exploring cloud infrastructure,
          and turning data into decisions — one{' '}
          <span className="font-mono text-[#3776AB]">.py</span> file at a time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl bg-[#3776AB] text-white font-medium text-sm shadow-lg shadow-blue-900/30 flex items-center gap-2 hover:bg-[#4a8fc7] transition-colors duration-200"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7h12M8 1.5l5.5 5.5L8 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl border border-white/10 text-white/70 font-medium text-sm hover:border-white/20 hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch
          </motion.button>
        </motion.div>

        {/* CV Download row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 -mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
        >
          <span className="text-xs font-mono text-white/25 tracking-widest uppercase hidden sm:inline">Resume</span>
          <span className="text-white/15 hidden sm:inline">&mdash;</span>
          <motion.a
            href="/cv-en.pdf"
            download="CV_Jose_Herrera_EN.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/60 text-xs font-mono hover:border-[#3776AB]/60 hover:text-white hover:bg-[#3776AB]/10 transition-all duration-200"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            English
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#3776AB]/20 text-[#3776AB] border border-[#3776AB]/25">EN</span>
          </motion.a>
          <motion.a
            href="/cv-es.pdf"
            download="CV_Jose_Herrera_ES.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-white/60 text-xs font-mono hover:border-[#FF9900]/60 hover:text-white hover:bg-[#FF9900]/10 transition-all duration-200"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Spanish
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/25">ES</span>
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-xl p-4 text-center"
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  )
}
