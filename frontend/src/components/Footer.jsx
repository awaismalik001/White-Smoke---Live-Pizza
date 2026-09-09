import { FiArrowUp } from 'react-icons/fi'

const links = [
  { name: 'Home', id: 'home' },
  { name: 'Menu', id: 'menu' },
  { name: 'Deals', id: 'deals' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-zinc-950 border-t border-white/[0.08] pt-16 pb-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => scrollTo('home')}>
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-syne font-black text-sm shadow-[0_0_15px_rgba(229,0,0,0.7)]">
            W
          </div>
          <span className="font-syne font-black text-2xl tracking-wider text-white">
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
              key={link.id}
              onClick={() => scrollTo(link.id)}
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
              onClick={() => scrollTo('home')}
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
