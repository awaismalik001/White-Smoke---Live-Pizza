import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Smoke particles
    const smokes = Array.from({ length: 35 }, () => createSmoke(canvas))
    // Ember particles
    const embers = Array.from({ length: 55 }, () => createEmber(canvas))

    function createSmoke(c) {
      return {
        x: Math.random() * c.width, y: c.height + 20,
        size: Math.random() * 70 + 20,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.04 + 0.01,
        grow: Math.random() * 0.2 + 0.1,
      }
    }
    function createEmber(c) {
      return {
        x: Math.random() * c.width, y: c.height + 5,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 2 + 0.8),
        speedX: (Math.random() - 0.5) * 1.5,
        life: 1, decay: Math.random() * 0.005 + 0.002,
        alpha: Math.random() * 0.8 + 0.2,
        isGold: Math.random() > 0.7,
      }
    }

    function resetSmoke(p) { Object.assign(p, { ...createSmoke(canvas), y: canvas.height + 20 }) }
    function resetEmber(p) { Object.assign(p, { ...createEmber(canvas), y: canvas.height + 5 }) }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      smokes.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.size += p.grow; p.alpha *= 0.998
        if (p.y + p.size < 0 || p.alpha < 0.001) resetSmoke(p)
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, `rgba(200,170,170,${p.alpha})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
      })

      embers.forEach(p => {
        p.x += p.speedX + Math.sin(Date.now() * 0.001 + p.x) * 0.3
        p.y += p.speedY; p.life -= p.decay
        if (p.life <= 0 || p.y < -10) resetEmber(p)
        ctx.save()
        ctx.globalAlpha = p.life * p.alpha
        ctx.fillStyle = p.isGold ? '#f5a623' : '#e50000'
        ctx.shadowColor = p.isGold ? '#f5a623' : '#e50000'
        ctx.shadowBlur = 8
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  })

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Gradient BG */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Smoke Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 px-6">
        <motion.p {...fadeUp(0.2)} className="text-brand-red text-xs font-bold tracking-[8px] uppercase mb-4">
          🔥 Live Pizza &amp; Fast Food
        </motion.p>

        <motion.h1 {...fadeUp(0.5)} className="font-bebas leading-none tracking-[6px]">
          <div className="text-[clamp(4rem,12vw,10rem)] text-brand-white text-glow-red">WHITE</div>
          <div className="text-[clamp(4rem,12vw,10rem)] text-stroke-red">SMOKE</div>
        </motion.h1>

        <motion.p {...fadeUp(0.8)} className="font-dancing text-brand-gold text-[clamp(1.2rem,3vw,2rem)] mt-2">
          Live Pizza · Islamabad
        </motion.p>

        <motion.p {...fadeUp(1.0)} className="max-w-md mx-auto text-brand-white/50 text-sm leading-loose mt-5">
          Experience the finest live-cooked pizza, smoky flavors, and bold tastes —
          crafted fresh for you every single time at B-17 Islamabad.
        </motion.p>

        <motion.div {...fadeUp(1.2)} className="flex flex-wrap justify-center gap-4 mt-8">
          <button onClick={() => scrollTo('menu')}
            className="bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-[3px] uppercase px-10 py-4 rounded-sm transition-all duration-300 box-glow-red hover:box-glow-red-strong hover:-translate-y-1">
            Explore Menu
          </button>
          <button onClick={() => scrollTo('deals')}
            className="border border-brand-white/30 hover:border-brand-red text-brand-white hover:text-brand-red font-bold text-xs tracking-[3px] uppercase px-10 py-4 rounded-sm transition-all duration-300 hover:-translate-y-1">
            View Deals
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div {...fadeUp(1.8)} className="absolute bottom-8 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-brand-red to-transparent animate-pulse" />
        <span className="text-brand-white/30 text-[0.6rem] tracking-[3px] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
