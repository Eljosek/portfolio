'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Physics-based spring for the outer ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Faster spring for the dot
  const dotSpringConfig = { damping: 40, stiffness: 400 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Outer ring — physics-lagged */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 44 : isClicking ? 20 : 32,
          height: isPointer ? 44 : isClicking ? 20 : 32,
          opacity: isHidden ? 0 : 1,
          borderColor: isPointer ? '#FF9900' : '#3776AB',
        }}
        transition={{ duration: 0.2 }}
        initial={{ width: 32, height: 32, opacity: 0 }}
      >
        <div
          className="w-full h-full rounded-full border-2"
          style={{
            borderColor: isPointer ? '#FF9900' : '#3776AB',
            background: isPointer ? 'rgba(255,153,0,0.06)' : 'rgba(55,118,171,0.06)',
            backdropFilter: 'blur(2px)',
          }}
        />
      </motion.div>

      {/* Inner dot — snappy */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 6 : isPointer ? 3 : 5,
          height: isClicking ? 6 : isPointer ? 3 : 5,
          opacity: isHidden ? 0 : 1,
          background: isPointer ? '#FF9900' : '#ffffff',
        }}
        transition={{ duration: 0.1 }}
        initial={{ width: 5, height: 5, opacity: 0 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: isPointer ? '#FF9900' : '#ffffff' }}
        />
      </motion.div>
    </>
  )
}
