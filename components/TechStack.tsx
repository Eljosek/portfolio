'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { TECH_STACK, type Tech } from '@/lib/data'

// ─── Category filter config ──────────────────────────────────
const CATEGORIES = [
  { key: 'all', label: 'All', color: '#3776AB' },
  { key: 'core', label: 'Core', color: '#3776AB' },
  { key: 'data', label: 'Data & ML', color: '#F7931E' },
  { key: 'web', label: 'Web', color: '#61DAFB' },
  { key: 'cloud', label: 'Cloud', color: '#FF9900' },
  { key: 'devops', label: 'DevOps', color: '#F05032' },
]

// ─── SimpleIcons slug map ─────────────────────────────────────
const SIMPLE_ICONS: Record<string, string> = {
  python: 'python',
  typescript: 'typescript',
  javascript: 'javascript',
  numpy: 'numpy',
  pandas: 'pandas',
  scikitlearn: 'scikitlearn',
  jupyter: 'jupyter',
  databricks: 'databricks',
  react: 'react',
  nextdotjs: 'nextdotjs',
  tailwindcss: 'tailwindcss',
  framer: 'framer',
  supabase: 'supabase',
  nodedotjs: 'nodedotjs',
  flask: 'flask',
  git: 'git',
  docker: 'docker',
  vercel: 'vercel',
  postgresql: 'postgresql',
}

// Devicons CDN for logos not available / reliable in SimpleIcons
const DEVICONS: Record<string, string> = {
  matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
  amazonaws: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  microsoftazure: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
  googlecloud: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
}

// ─── Individual tech card ─────────────────────────────────────
function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      className="relative glass rounded-2xl p-5 transition-colors duration-300"
      style={{
        borderColor: hovered ? `${tech.color}40` : 'rgba(255,255,255,0.06)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${tech.color}15 0%, transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Icon row */}
        <div className="flex items-start justify-between mb-3">
          <motion.div
            className="w-9 h-9 flex items-center justify-center"
            animate={
              hovered
                ? { scale: 1.2, rotate: [0, -8, 8, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            {DEVICONS[tech.icon] ? (
              <img
                src={DEVICONS[tech.icon]}
                width="28"
                height="28"
                alt={tech.name}
                className="opacity-85"
              />
            ) : SIMPLE_ICONS[tech.icon] ? (
              <img
                src={`https://cdn.simpleicons.org/${SIMPLE_ICONS[tech.icon]}/ffffff`}
                width="28"
                height="28"
                alt={tech.name}
                className="opacity-80"
                style={{ filter: `drop-shadow(0 0 4px ${tech.color}60)` }}
              />
            ) : (
              <div
                className="w-7 h-7 rounded-lg"
                style={{ background: `${tech.color}30`, border: `1px solid ${tech.color}40` }}
              />
            )}
          </motion.div>
          {tech.proficiency <= 40 && (
            <span
              className="text-[9px] font-mono px-2 py-0.5 rounded-full"
              style={{
                color: tech.color,
                background: `${tech.color}15`,
                border: `1px solid ${tech.color}25`,
              }}
            >
              Learning
            </span>
          )}
        </div>

        {/* Name + description */}
        <h3 className="text-white font-semibold text-sm mb-1">{tech.name}</h3>
        <p className="text-white/35 text-[11px] leading-relaxed mb-3 line-clamp-2">
          {tech.description}
        </p>

        {/* Proficiency bar */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${tech.color}, ${tech.color}99)`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${tech.proficiency}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.3 + index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
          <span
            className="text-[10px] font-mono shrink-0 w-8 text-right"
            style={{ color: tech.color }}
          >
            {tech.proficiency}%
          </span>
        </div>

        {/* Project count */}
        {tech.projects > 0 && (
          <p className="text-white/20 text-[10px] font-mono mt-2.5">
            Used in {tech.projects} project{tech.projects !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────
export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? TECH_STACK
        : TECH_STACK.filter((t) => t.category === activeCategory),
    [activeCategory]
  )

  const avgProficiency = useMemo(
    () =>
      Math.round(
        TECH_STACK.reduce((a, t) => a + t.proficiency, 0) / TECH_STACK.length
      ),
    []
  )

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative section-padding bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(55,118,171,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute right-1/4 bottom-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,153,0,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-3">
            02 — Tech Stack
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The tools I think with
          </h2>
          <div className="divider mt-4" />
          <p className="text-white/40 mt-3 max-w-lg text-sm">
            Python at the center. Everything else orbits around it.
            Click a category to filter.
          </p>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key
            const count =
              cat.key === 'all'
                ? TECH_STACK.length
                : TECH_STACK.filter((t) => t.category === cat.key).length

            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300"
                style={{
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: isActive
                    ? `${cat.color}20`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${
                    isActive ? `${cat.color}40` : 'rgba(255,255,255,0.06)'
                  }`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
                <span
                  className="ml-2 text-[10px] font-mono"
                  style={{ opacity: isActive ? 0.7 : 0.4 }}
                >
                  ({count})
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Animated grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <TechCard key={tech.name} tech={tech} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats footer */}
        <motion.div
          className="mt-12 glass rounded-2xl p-6 grid grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {TECH_STACK.length}
            </p>
            <p className="text-[10px] font-mono text-white/30 mt-1">
              Technologies
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-gradient-blue">
              {avgProficiency}%
            </p>
            <p className="text-[10px] font-mono text-white/30 mt-1">
              Avg Proficiency
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-gradient-orange">
              5
            </p>
            <p className="text-[10px] font-mono text-white/30 mt-1">
              Categories
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
