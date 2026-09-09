import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhoneCall } from 'react-icons/fi'

const links = [
  { name: 'Home', id: 'home' },
  { name: 'Menu', id: 'menu' },
  { name: 'Deals', id: 'deals' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const scrollPos = window.scrollY + 200
      for (const link of links) {
        const el = document.getElementById(link.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-5 transition-all duration-500 pointer-events-none">
      {/* Floating Capsule Bar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto capsule-nav rounded-full px-5 sm:px-7 py-2.5 sm:py-3 w-full max-w-5xl flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'scale-[0.98]' : 'scale-100'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-syne font-black text-sm shadow-[0_0_15px_rgba(229,0,0,0.7)] group-hover:scale-105 transition-transform">
            W
          </div>
          <span className="font-syne font-extrabold text-base tracking-wider text-white">
            WHITE<span className="text-brand-red ml-1">SMOKE</span>
          </span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]">
          {links.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="capsuleIndicator"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </button>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+923045788808"
            className="text-zinc-400 hover:text-brand-red p-2 transition-colors"
            title="Call White Smoke"
          >
            <FiPhoneCall className="text-base" />
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="bg-brand-red hover:bg-brand-red2 text-white text-xs font-bold px-5 py-2 rounded-full transition-all duration-300 box-glow-red hover:box-glow-red-strong hover:scale-105 active:scale-95 tracking-wide"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-300 hover:text-white p-1 text-xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50"
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`py-2 text-left text-sm font-semibold tracking-wide border-b border-white/5 transition-colors ${
                  activeSection === link.id ? 'text-brand-red' : 'text-zinc-300'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 w-full bg-brand-red text-white text-xs font-bold py-3 rounded-xl tracking-wider uppercase"
            >
              Order Online
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
