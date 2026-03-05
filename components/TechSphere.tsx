'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { TECH_STACK, type Tech } from '@/lib/data'

// ─── Single orbiting node ─────────────────────────────────────
function TechNode({
  tech,
  position,
  onHover,
  hovered,
}: {
  tech: Tech
  position: [number, number, number]
  onHover: (t: Tech | null) => void
  hovered: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      const targetScale = hovered ? 1.4 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  // Convert hex color
  const color = new THREE.Color(tech.color === '#ffffff' ? '#aaaaaa' : tech.color)

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(tech) }}
        onPointerOut={() => onHover(null)}
      >
        <icosahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={tech.proficiency > 50 ? 0.95 : 0.6}
        />
      </mesh>

      {/* Label */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, -0.42, 0]}
          fontSize={0.14}
          color={hovered ? '#ffffff' : 'rgba(255,255,255,0.6)'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/jetbrains-mono.woff"
        >
          {tech.name}
        </Text>
      </Billboard>

      {/* Glow ring on hover */}
      {hovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.42, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

// ─── Orbit path ring ──────────────────────────────────────────
function OrbitRing({ radius, opacity = 0.06 }: { radius: number; opacity?: number }) {
  const lineObj = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color: '#3776AB', transparent: true, opacity })
    return new THREE.Line(geo, mat)
  }, [radius, opacity])

  return <primitive object={lineObj} />
}

// ─── Central Python logo ──────────────────────────────────────
function CenterNode({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial color="#3776AB" transparent opacity={0.04} />
      </mesh>

      {/* Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.45, 2]} />
        <meshStandardMaterial
          color="#3776AB"
          emissive="#3776AB"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>

      <Billboard follow>
        <Text
          position={[0, -0.75, 0]}
          fontSize={0.2}
          color="#3776AB"
          anchorX="center"
          anchorY="middle"
        >
          Python Core
        </Text>
      </Billboard>
    </group>
  )
}

// ─── Full 3D Scene ────────────────────────────────────────────
function TechScene({ onHover, hoveredTech }: {
  onHover: (t: Tech | null) => void
  hoveredTech: Tech | null
}) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  // Distribute tech around orbit rings by category
  const orbitConfig: Record<Tech['category'], { radius: number; tilt: number; speed: number }> = {
    core:   { radius: 0,   tilt: 0,    speed: 0 },
    data:   { radius: 2.2, tilt: 0.3,  speed: 0.5 },
    web:    { radius: 3.2, tilt: -0.2, speed: 0.35 },
    cloud:  { radius: 4.0, tilt: 0.5,  speed: 0.25 },
    devops: { radius: 2.8, tilt: -0.4, speed: 0.4 },
  }

  const techPositions: { tech: Tech; pos: [number, number, number] }[] = []

  const categoryGroups: Record<string, Tech[]> = {}
  TECH_STACK.filter((t) => t.category !== 'core').forEach((t) => {
    if (!categoryGroups[t.category]) categoryGroups[t.category] = []
    categoryGroups[t.category].push(t)
  })

  Object.entries(categoryGroups).forEach(([cat, items]) => {
    const cfg = orbitConfig[cat as Tech['category']]
    items.forEach((tech, i) => {
      const angle = (i / items.length) * Math.PI * 2
      const x = Math.cos(angle) * cfg.radius
      const z = Math.sin(angle) * cfg.radius
      const y = Math.sin(angle + cfg.tilt) * 0.6
      techPositions.push({ tech, pos: [x, y, z] })
    })
  })

  return (
    <group ref={groupRef}>
      {/* Orbit rings */}
      {[2.2, 2.8, 3.2, 4.0].map((r, i) => (
        <OrbitRing key={r} radius={r} opacity={0.06 - i * 0.01} />
      ))}

      {/* Central Python node */}
      <CenterNode hovered={false} />

      {/* Tech nodes */}
      {techPositions.map(({ tech, pos }) => (
        <TechNode
          key={tech.name}
          tech={tech}
          position={pos}
          onHover={onHover}
          hovered={hoveredTech?.name === tech.name}
        />
      ))}

      {/* Ambient particles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = 5 + Math.random() * 1.5
        return (
          <mesh key={`p-${i}`} position={[
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi) * 0.4,
            r * Math.sin(phi) * Math.sin(theta),
          ]}>
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial color="#3776AB" transparent opacity={0.3} />
          </mesh>
        )
      })}
    </group>
  )
}

// ─── Tooltip panel ────────────────────────────────────────────
function TechTooltip({ tech }: { tech: Tech }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl p-5 min-w-[240px] text-center pointer-events-none z-20"
      style={{ borderColor: `${tech.color}30`, boxShadow: `0 0 30px ${tech.color}20` }}
    >
      <div className="text-3xl mb-2">{tech.icon}</div>
      <div className="font-bold text-white mb-1">{tech.name}</div>
      <div className="text-white/50 text-xs mb-3">{tech.description}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-white/40 font-mono">Proficiency</span>
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: tech.color }}
            initial={{ width: 0 }}
            animate={{ width: `${tech.proficiency}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs font-mono" style={{ color: tech.color }}>{tech.proficiency}%</span>
      </div>
      {tech.projects > 0 && (
        <div className="text-xs text-white/30 font-mono">{tech.projects} projects</div>
      )}
      {tech.proficiency <= 40 && (
        <div className="mt-1 text-xs font-mono" style={{ color: tech.color }}>🔄 Currently learning</div>
      )}
    </motion.div>
  )
}

// ─── Category legend ──────────────────────────────────────────
const CATEGORIES = [
  { key: 'core', label: 'Core', color: '#3776AB' },
  { key: 'data', label: 'Data & ML', color: '#F7931E' },
  { key: 'web', label: 'Web', color: '#61DAFB' },
  { key: 'cloud', label: 'Cloud', color: '#FF9900' },
  { key: 'devops', label: 'DevOps', color: '#F05032' },
]

// ─── Main Section ─────────────────────────────────────────────
export default function TechSphere() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredTech, setHoveredTech] = useState<Tech | null>(null)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative section-padding bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(55,118,171,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono text-[#3776AB] tracking-[0.3em] uppercase mb-3">02 — Tech Stack</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The tools I think with
          </h2>
          <div className="divider mt-4" />
          <p className="text-white/40 mt-3 max-w-lg text-sm">
            Python at the center. Everything else orbits around it.
            Hover a node to see details.
          </p>
        </motion.div>

        {/* 3D Canvas + Tooltip wrapper */}
        <motion.div
          className="relative w-full rounded-3xl overflow-hidden glass"
          style={{ height: 520 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-white/30 font-mono text-sm">
              Loading 3D scene...
            </div>
          }>
            <Canvas
              camera={{ position: [0, 2.5, 9], fov: 55 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.8} color="#3776AB" />
              <pointLight position={[-10, -5, -10]} intensity={0.4} color="#FF9900" />
              <pointLight position={[0, -8, 0]} intensity={0.3} color="#0078D4" />

              <TechScene onHover={setHoveredTech} hoveredTech={hoveredTech} />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI * 0.72}
              />
            </Canvas>
          </Suspense>

          {/* Hover tooltip */}
          {hoveredTech && <TechTooltip tech={hoveredTech} />}

          {/* Category legend — top right */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <span className="text-white/40">{cat.label}</span>
              </div>
            ))}
          </div>

          {/* Drag hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono">
            drag to rotate
          </div>
        </motion.div>

        {/* Flat list grid for accessibility / non-3D fallback */}
        <motion.div
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="glass glass-hover rounded-xl px-3 py-2.5 flex items-center gap-2.5 group"
              whileHover={{ scale: 1.03, y: -2 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.02 }}
            >
              <span className="text-lg">{tech.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-white/80 text-xs font-medium truncate">{tech.name}</p>
                <div className="h-[2px] rounded-full bg-white/10 mt-1 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: tech.color, width: `${tech.proficiency}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.02 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
