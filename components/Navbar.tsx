'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PERSONAL } from '@/lib/data'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Cloud Path', href: '#cloud-path' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on resize above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Intersection Observer for active section highlight
  useEffect(() => {
    const sections = navItems.map((item) => item.href.slice(1))
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress bar — top of viewport */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[1000] origin-left"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, #3776AB, #FF9900, #0078D4)',
        }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'glass backdrop-blur-xl border border-white/[0.06] shadow-2xl shadow-black/50'
              : 'bg-transparent border-transparent'
          }`}
        >
          <nav className="flex items-center justify-between px-5 py-3">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono bg-gradient-to-br from-[#3776AB] to-[#0078D4] text-white shadow-lg shadow-blue-900/30">
                JH
              </div>
              <span className="text-sm font-mono text-white/60 group-hover:text-white transition-colors duration-200">
                jose.dev
              </span>
            </motion.button>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <motion.button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      activeSection === item.href.slice(1)
                        ? 'text-white'
                        : 'text-white/50 hover:text-white/90'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeSection === item.href.slice(1) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(55,118,171,0.15)', border: '1px solid rgba(55,118,171,0.25)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>

            {/* CTA — Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="https://linkedin.com/in/jose-miguel-herrera-guti%C3%A9rrez-841319340"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium rounded-xl text-white/70 hover:text-white transition-colors duration-200 border border-white/[0.06] hover:border-white/[0.15]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Say Hi
              </motion.a>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-[#3776AB] text-white hover:bg-[#4a8fc7] transition-colors duration-200 shadow-lg shadow-blue-900/20 flex items-center gap-1.5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Resume
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[2px] bg-white origin-center"
                  animate={
                    menuOpen
                      ? {
                          width: i === 1 ? 0 : 20,
                          rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                          y: i === 0 ? 7 : i === 2 ? -7 : 0,
                        }
                      : { width: i === 1 ? 14 : 20, rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[998] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            {/* Menu panel */}
            <motion.nav
              className="absolute inset-x-0 top-0 pt-24 px-6 pb-10"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-4 py-4 text-2xl font-light text-white/70 hover:text-white border-b border-white/[0.04] transition-colors duration-200"
                    >
                      <span className="font-mono text-[#3776AB] text-sm mr-3">0{i + 1}.</span>
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="flex gap-3 mt-8">
                <a
                  href="mailto:josemiguelherreragutierrez7@gmail.com"
                  className="flex-1 text-center px-4 py-3 rounded-xl border border-white/[0.08] text-white/70 text-sm"
                >
                  Say Hi 👋
                </a>
                <a
                  href="/jose_herrera_cv_en.pdf"
                  download
                  className="flex-1 text-center px-4 py-3 rounded-xl bg-[#3776AB] text-white text-sm font-medium"
                >
                  Resume ↗
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
