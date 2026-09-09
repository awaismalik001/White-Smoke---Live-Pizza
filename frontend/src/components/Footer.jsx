const links = ['Home','Menu','Deals','Gallery','About','Contact']

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-brand-dark border-t border-brand-border py-12 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-bebas text-4xl tracking-[6px] text-brand-white text-glow-red cursor-pointer" onClick={() => scrollTo('home')}>
          WHITE <span className="text-brand-red">SMOKE</span>
        </div>
        <p className="font-dancing text-brand-gold text-lg mt-1">Live Pizza &amp; Fast Food</p>

        <ul className="flex flex-wrap justify-center gap-6 my-6">
          {links.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)}
                className="text-brand-white/40 hover:text-brand-red text-[0.7rem] tracking-[2px] uppercase font-bold transition-colors">
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-6 text-brand-white/40 text-sm mb-6">
          <span>📍 Mellow Multi Mall, B-17 Islamabad</span>
          <span>📞 0304-5788808</span>
          <span>🕐 12 PM – 1 AM</span>
        </div>

        <div className="h-px bg-brand-border mb-6" />
        <p className="text-brand-white/20 text-[0.68rem] tracking-[2px]">
          © 2026 White Smoke Live Pizza · Islamabad · All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
