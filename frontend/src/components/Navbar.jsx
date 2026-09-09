import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const links = ['Home','Menu','Deals','Gallery','About','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-[0_4px_40px_rgba(229,0,0,0.15)]' : 'bg-brand-dark/80 backdrop-blur-sm'
    } border-b border-brand-border`}>
      <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <div className="font-bebas text-2xl tracking-[4px] text-brand-white text-glow-red cursor-pointer" onClick={() => scrollTo('home')}>
          WHITE <span className="text-brand-red">SMOKE</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)}
                className="text-brand-white/70 hover:text-brand-red text-xs font-bold tracking-[2px] uppercase transition-colors duration-300 relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Order Button */}
        <button onClick={() => scrollTo('contact')}
          className="hidden md:block bg-brand-red hover:bg-brand-red2 text-white text-xs font-bold tracking-[2px] uppercase px-6 py-3 rounded-sm transition-all duration-300 box-glow-red hover:box-glow-red-strong hover:-translate-y-0.5">
          Order Now
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-white text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-brand-darker border-t border-brand-border overflow-hidden">
            <div className="flex flex-col py-4 px-6 gap-4">
              {links.map(link => (
                <button key={link} onClick={() => scrollTo(link)}
                  className="text-brand-white/70 hover:text-brand-red text-sm font-bold tracking-[2px] uppercase text-left transition-colors">
                  {link}
                </button>
              ))}
              <button onClick={() => scrollTo('contact')}
                className="bg-brand-red text-white text-xs font-bold tracking-[2px] uppercase px-6 py-3 rounded-sm mt-2">
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
