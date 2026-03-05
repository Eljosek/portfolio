'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { TIMELINE, type TimelineItem } from '@/lib/data'

// ─── Type icon ────────────────────────────────────────────────
function TypeIcon({ type }: { type: TimelineItem['type'] }) {
  if (type === 'work') return <span>💼</span>
  if (type === 'cert') return <span>🏆</span>
  return <span>🎓</span>
}

// ─── Single timeline item ─────────────────────────────────────
function TimelineNode({
  item,
  index,
  isLeft,
}: {
  item: TimelineItem
  index: number
  isLeft: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={nodeRef}
      className={`relative flex items-start gap-6 ${
        isLeft ? 'md:flex-row-reverse md:text-right' : 'md:flex-row'
      } flex-row`}
      initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Connector line + dot — only on md+ */}
      <div className="hidden md:flex flex-col items-center" style={{ width: 1 }}>
        {/* This is the vertical line spacer — handled in parent */}
      </div>

      {/* Card */}
      <motion.div
        className={`flex-1 glass glass-hover rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
          expanded ? 'shadow-lg' : ''
        }`}
        style={{
          borderColor: expanded ? `${item.color}30` : 'rgba(255,255,255,0.06)',
          maxWidth: '480px',
        }}
        onClick={() => setExpanded((v) => !v)}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Color accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: item.color, transformOrigin: 'top' }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        />

        {/* Glow on expand */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: `radial-gradient(ellipse at 0% 50%, ${item.color}10 0%, transparent 60%)` }}
            />
          )}
        </AnimatePresence>

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-2 pl-3">
          <div className="flex items-center gap-2.5">
            <span className="text-lg"><TypeIcon type={item.type} /></span>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base leading-tight">
                {item.title}
              </h3>
              <p className="text-white/50 text-xs mt-0.5 font-mono">
                {item.organization}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}25` }}
            >
              {item.period}
            </span>
            <motion.span
              className="text-white/30 text-sm"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </div>
        </div>

        {/* Tags always visible */}
        <div className="flex flex-wrap gap-1.5 pl-3 mb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md text-white/40 border border-white/06"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="pl-3 mt-3 space-y-2 border-t border-white/[0.04] pt-3">
                {item.description.map((line, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm text-white/55 leading-relaxed"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0 opacity-40" />
                    {line}
                  </motion.li>
                ))}
              </ul>
              {item.link && (
                <div className="pl-3 mt-3">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono animated-link"
                    style={{ color: item.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View on GitHub →
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.8', 'end 0.2'] })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative section-padding bg-[#0a0a0a] overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(55,118,171,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-3">04 — Experience & Education</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The journey so far
          </h2>
          <div className="divider mt-4 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #3776AB, transparent)', width: 80 }} />
          <p className="text-white/30 text-sm mt-3">Click any card for details</p>
        </motion.div>

        {/* Timeline with center line */}
        <div className="relative">
          {/* Center vertical line — draw-on-scroll */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] translate-x-[-0.5px] overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-[#3776AB] via-[#FF9900] to-[#0078D4]"
              style={{ height: '100%', scaleY: lineScaleY, transformOrigin: 'top' }}
            />
            {/* Background track */}
            <div className="absolute inset-0 bg-white/[0.04] -z-10" />
          </div>

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <div key={item.id} className="relative pl-12 md:pl-0">
                {/* Dot on the line */}
                <motion.div
                  className="absolute left-[13px] md:left-1/2 top-6 w-5 h-5 rounded-full border-2 -translate-x-1/2 z-10 flex items-center justify-center"
                  style={{
                    borderColor: item.color,
                    background: '#0a0a0a',
                    boxShadow: `0 0 10px ${item.color}60`,
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 200 }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.color }}
                  />
                </motion.div>

                {/* Alternate left/right on desktop */}
                <div className={`md:flex md:gap-8 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2" />
                  <div className="md:w-1/2">
                    <TimelineNode
                      item={item}
                      index={i}
                      isLeft={i % 2 !== 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
