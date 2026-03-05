'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CLOUD_PATH, type PathStep } from '@/lib/data'

// ─── Step icon map ────────────────────────────────────────────
function StepIcon({ icon, color }: { icon: string; color: string }) {
  const simpleIcons: Record<string, string> = {
    python: 'python',
    databricks: 'databricks',
  }
  if (simpleIcons[icon]) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${simpleIcons[icon]}/ffffff`}
        width="26" height="26" alt={icon}
        className="opacity-80"
        style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
      />
    )
  }
  const inlineSVGs: Record<string, JSX.Element> = {
    chart: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    globe: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    cpu: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="6" height="6"/><rect x="2" y="2" width="20" height="20" rx="2"/>
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
      </svg>
    ),
    cloud: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    spark: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    pipeline: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="6" height="4" rx="1"/><rect x="9" y="3" width="6" height="4" rx="1"/><rect x="16" y="3" width="6" height="4" rx="1"/>
        <rect x="2" y="10" width="6" height="4" rx="1"/><rect x="9" y="10" width="6" height="4" rx="1"/><rect x="16" y="10" width="6" height="4" rx="1"/>
        <rect x="2" y="17" width="6" height="4" rx="1"/><rect x="9" y="17" width="6" height="4" rx="1"/>
      </svg>
    ),
  }
  return inlineSVGs[icon] ?? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  )
}

// ─── Status config ────────────────────────────────────────────
const STATUS_CONFIG = {
  done:        { label: 'Done',     bg: 'rgba(62,207,142,0.12)',  border: 'rgba(62,207,142,0.3)',  text: '#3ECF8E' },
  'in-progress': { label: 'In Progress', bg: 'rgba(255,153,0,0.12)', border: 'rgba(255,153,0,0.3)', text: '#FF9900' },
  next:        { label: 'Next',     bg: 'rgba(55,118,171,0.12)',  border: 'rgba(55,118,171,0.3)', text: '#3776AB' },
  future:      { label: 'Future',   bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.3)' },
}

// ─── Individual step card ─────────────────────────────────────
function StepCard({ step, index }: { step: PathStep; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cfg = STATUS_CONFIG[step.status]

  const isActive = step.status === 'done' || step.status === 'in-progress'
  const isCurrent = step.status === 'in-progress'

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Node circle */}
      <motion.div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 cursor-pointer"
        style={{
          background: isActive ? `${step.color}20` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isActive ? step.color + '40' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isCurrent ? `0 0 20px ${step.color}40` : 'none',
          opacity: step.status === 'future' ? 0.45 : 1,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.12, y: -4 }}
        animate={isCurrent ? { boxShadow: [`0 0 10px ${step.color}30`, `0 0 25px ${step.color}50`, `0 0 10px ${step.color}30`] } : {}}
        transition={isCurrent ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
      >
        <StepIcon icon={step.icon} color={isActive ? step.color : 'rgba(255,255,255,0.2)'} />

        {/* "Current" pulse ring */}
        {isCurrent && (
          <motion.div
            className="absolute -inset-1 rounded-2xl border"
            style={{ borderColor: step.color }}
            animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Done checkmark */}
        {step.status === 'done' && (
          <div
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
            style={{ background: '#3ECF8E', color: '#000' }}
          >
            ✓
          </div>
        )}
      </motion.div>

      {/* Title */}
      <p
        className="text-center font-bold text-sm mb-1"
        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}
      >
        {step.title}
      </p>
      <p className="text-center text-[10px] font-mono text-white/30 mb-2">{step.subtitle}</p>

      {/* Status badge */}
      <span
        className="text-[9px] font-mono px-2 py-0.5 rounded-full"
        style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
      >
        {cfg.label}
      </span>

      {/* Hover tooltip with skills */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute z-20 glass rounded-xl p-4 w-52 mt-2"
            style={{
              top: '100%',
              left: '50%',
              translateX: '-50%',
              borderColor: `${step.color}30`,
              boxShadow: `0 10px 40px rgba(0,0,0,0.6), 0 0 20px ${step.color}15`,
            }}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-white/70 text-xs leading-relaxed mb-3">{step.description}</p>
            <div className="flex flex-wrap gap-1">
              {step.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ color: step.color, background: `${step.color}15`, border: `1px solid ${step.color}20` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Progress bar connector ───────────────────────────────────
function Connector({ fromStep, toStep, index }: { fromStep: PathStep; toStep: PathStep; index: number }) {
  const fromDone = fromStep.status === 'done'
  const toDone = toStep.status === 'done'
  const active = fromDone

  return (
    <div className="flex-1 flex items-center relative" style={{ opacity: active ? 1 : 0.25 }}>
      <div className="w-full h-[1px] relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {active && (
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${fromStep.color}, ${toStep.color})` }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
          />
        )}
      </div>
      {/* Animated particle travelling along */}
      {fromStep.status === 'in-progress' && (
        <motion.div
          className="absolute w-2 h-2 rounded-full"
          style={{ background: fromStep.color, boxShadow: `0 0 6px ${fromStep.color}` }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────
export default function CloudPath() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Stats
  const done = CLOUD_PATH.filter((s) => s.status === 'done').length
  const total = CLOUD_PATH.length

  return (
    <section
      id="cloud-path"
      ref={sectionRef}
      className="relative section-padding bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(55,118,171,1) 1px, transparent 1px), linear-gradient(90deg, rgba(55,118,171,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(55,118,171,0.07) 0%, transparent 70%)', filter: 'blur(100px)', transform: 'translate(-50%,-50%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-3">05 — My Path</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Cloud & Data journey
          </h2>
          <div className="divider mt-4 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #FF9900, transparent)', width: 80 }} />
          <p className="text-white/40 text-sm mt-3 max-w-lg mx-auto">
            From a Python script to distributed data pipelines at cloud scale.
            Hover each node for details.
          </p>

          {/* Progress meter */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs font-mono text-white/40">Journey progress</span>
            <div className="w-32 h-1.5 rounded-full bg-white/08 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #3776AB, #FF9900)' }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(done / total) * 100}%` } : {}}
                transition={{ duration: 1.2, delay: 0.6 }}
              />
            </div>
            <span className="text-xs font-mono text-[#FF9900]">{done}/{total} stages</span>
          </motion.div>
        </motion.div>

        {/* Desktop: horizontal path ────────────────────────── */}
        <div className="hidden md:block">
          <div className="relative flex items-start gap-3">
            {CLOUD_PATH.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1 relative">
                <div className="relative flex-1 flex flex-col items-center">
                  <StepCard step={step} index={i} />
                </div>
                {i < CLOUD_PATH.length - 1 && (
                  <div className="relative flex-shrink-0 w-8 flex items-center" style={{ marginTop: '-30px' }}>
                    <Connector fromStep={CLOUD_PATH[i]} toStep={CLOUD_PATH[i + 1]} index={i} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack ─────────────────────────── */}
        <div className="md:hidden space-y-4">
          {CLOUD_PATH.map((step, i) => {
            const cfg = STATUS_CONFIG[step.status]
            return (
              <motion.div
                key={step.id}
                className="glass rounded-2xl p-5 relative overflow-hidden"
                style={{
                  borderColor: step.status !== 'future' ? `${step.color}25` : 'rgba(255,255,255,0.06)',
                  opacity: step.status === 'future' ? 0.5 : 1,
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: step.status === 'future' ? 0.5 : 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{step.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white text-sm">{step.title}</h3>
                      <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs font-mono">{step.subtitle}</p>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-1">
                  {step.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                      style={{ color: step.color, background: `${step.color}15`, border: `1px solid ${step.color}20` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* "Where I'm headed" narrative */}
        <motion.div
          className="mt-16 glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,153,0,0.08) 0%, transparent 60%)' }}
          />
          <p className="text-xs font-mono text-[#FF9900] tracking-[0.3em] uppercase mb-4 relative z-10">Where I'm headed</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            The mission: Cloud Data Engineer
          </h3>
          <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-6 relative z-10">
            I'm building towards a career where I architect <span className="text-[#FF9900]">data pipelines</span> at scale,
            design <span className="text-[#3776AB]">cloud infrastructure</span> for analytics, and use{' '}
            <span className="text-[#FF3621]">Spark & Databricks</span> to turn raw data into business intelligence.
            Each project I ship today brings me one step closer.
          </p>
          <div className="flex flex-wrap gap-2 justify-center relative z-10">
            {['AWS Certified', 'Azure Data Engineer', 'Databricks Platform', 'dbt Developer', 'Apache Spark'].map((cert) => (
              <span
                key={cert}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-white/40"
              >
                🎯 {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
