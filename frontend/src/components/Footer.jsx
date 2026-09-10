import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowUp } from 'react-icons/fi'

const links = [
  { name: 'Home', to: '/', type: 'home' },
  { name: 'Menu', to: '/menu', type: 'page' },
  { name: 'Deals', to: '/deals', type: 'page' },
  { name: 'Gallery', to: 'gallery', type: 'section' },
  { name: 'About', to: 'about', type: 'section' },
  { name: 'Contact', to: 'contact', type: 'section' },
]

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleLinkClick = (link) => {
    if (link.type === 'home') {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }

    if (link.type === 'page') {
      if (location.pathname === link.to) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate(link.to)
      }
      return
    }

    if (link.type === 'section') {
      if (isHome) {
        document.getElementById(link.to)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(`/#${link.to}`)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-zinc-950 border-t border-white/[0.08] pt-16 pb-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Brand */}
        <div
          className="flex items-center gap-2 mb-3 cursor-pointer"
          onClick={() => handleLinkClick({ type: 'home' })}
        >
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-[0_0_15px_rgba(229,0,0,0.7)]">
            W
          </div>
          <span className="font-heading font-bold text-xl sm:text-2xl tracking-wide text-white">
            WHITE<span className="text-brand-red ml-1">SMOKE</span>
          </span>
        </div>

        <p className="text-zinc-500 text-xs tracking-wider uppercase mb-8">
          Live Wood-Fired Pizza &amp; Fast Food — Islamabad
        </p>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link)}
              className="text-zinc-400 hover:text-white text-xs font-semibold tracking-wide transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="w-full max-w-4xl h-px bg-white/[0.06] mb-8" />

        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 White Smoke Live Pizza. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Mellow Multi Mall, B-17</span>
            <span>0304-5788808</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-brand-red text-white flex items-center justify-center transition-colors"
              title="Back to Top"
            >
              <FiArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
