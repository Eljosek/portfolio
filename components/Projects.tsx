'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PROJECTS, type Project } from '@/lib/data'

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 w-[320px] md:w-[380px] h-[460px] rounded-2xl overflow-hidden glass group"
      style={{
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.3s ease',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={hovered
          ? { opacity: 1 }
          : { opacity: 0 }
        }
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Top preview area */}
      <div
        className="relative w-full h-48 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}18 0%, #111 100%)` }}
      >
        {/* Animated grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${project.color}40 1px, transparent 1px), linear-gradient(90deg, ${project.color}40 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Project icon / preview */}
        <motion.div
          className="relative z-10 text-center"
          animate={hovered ? { scale: 1.15, y: -5 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-5xl mb-2">
            {project.tags[0]?.emoji || '🚀'}
          </div>
          <div
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ color: project.color, background: `${project.color}20`, border: `1px solid ${project.color}30` }}
          >
            {project.tech[0]}
          </div>
        </motion.div>

        {/* Top-right featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-full bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/20">
            featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Description — shows brief by default, full on hover */}
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.p
              key="long"
              className="text-white/50 text-sm leading-relaxed mb-4 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.longDescription}
            </motion.p>
          ) : (
            <motion.p
              key="short"
              className="text-white/50 text-sm leading-relaxed mb-4 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md"
              style={{
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md text-white/30">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="text-xs px-2.5 py-1 rounded-full font-mono flex items-center gap-1"
              style={{ color: tag.color, background: `${tag.color}15`, border: `1px solid ${tag.color}25` }}
            >
              {tag.emoji} {tag.label}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
            style={{ background: project.color, boxShadow: `0 4px 20px ${project.color}30` }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Live Demo ↗
          </motion.a>
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-medium text-white/70 transition-all duration-200 border border-white/08 hover:border-white/15"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub →
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Horizontal scroll with drag ─────────────────────────────
function HorizontalCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={trackRef}
        className="flex gap-5 px-12 pb-4 horizontal-scroll overflow-x-auto"
        drag="x"
        dragConstraints={{ left: -(PROJECTS.length * 400), right: 0 }}
        dragElastic={0.1}
        style={{ cursor: 'grab' }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Glow */}
      <div
        className="absolute right-1/4 bottom-1/4 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,153,0,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-3">03 — Projects</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Things I've built
              </h2>
              <div className="divider mt-4" />
              <p className="text-white/40 text-sm mt-2">
                Real apps for real people. Drag to explore →
              </p>
            </div>
            <motion.a
              href="https://github.com/Eljosek"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-white/40 hover:text-[#3776AB] flex items-center gap-2 transition-colors duration-200 shrink-0"
              whileHover={{ x: 4 }}
            >
              View all on GitHub →
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <HorizontalCarousel />
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {PROJECTS.map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i === 0 ? '#3776AB' : 'rgba(255,255,255,0.15)' }}
          />
        ))}
      </div>
    </section>
  )
}
