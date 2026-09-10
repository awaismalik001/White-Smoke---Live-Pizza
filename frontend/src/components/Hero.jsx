import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiArrowDownRight, FiShoppingBag } from 'react-icons/fi'

export default function Hero() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Smoke particles
    const smokes = Array.from({ length: 30 }, () => createSmoke(canvas))
    // Amber embers
    const embers = Array.from({ length: 50 }, () => createEmber(canvas))

    function createSmoke(c) {
      return {
        x: Math.random() * c.width,
        y: c.height + 20,
        size: Math.random() * 80 + 30,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.045 + 0.015,
        grow: Math.random() * 0.25 + 0.1,
      }
    }

    function createEmber(c) {
      return {
        x: Math.random() * c.width,
        y: c.height + 10,
        size: Math.random() * 2.8 + 0.6,
        speedY: -(Math.random() * 2.2 + 0.9),
        speedX: (Math.random() - 0.5) * 1.8,
        life: 1,
        decay: Math.random() * 0.005 + 0.002,
        alpha: Math.random() * 0.85 + 0.2,
        isGold: Math.random() > 0.65,
      }
    }

    function resetSmoke(p) {
      Object.assign(p, { ...createSmoke(canvas), y: canvas.height + 20 })
    }
    function resetEmber(p) {
      Object.assign(p, { ...createEmber(canvas), y: canvas.height + 10 })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      smokes.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.size += p.grow
        p.alpha *= 0.998
        if (p.y + p.size < 0 || p.alpha < 0.001) resetSmoke(p)

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0, `rgba(230, 200, 200, ${p.alpha})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      embers.forEach((p) => {
        p.x += p.speedX + Math.sin(Date.now() * 0.0015 + p.x) * 0.4
        p.y += p.speedY
        p.life -= p.decay
        if (p.life <= 0 || p.y < -10) resetEmber(p)

        ctx.save()
        ctx.globalAlpha = p.life * p.alpha
        ctx.fillStyle = p.isGold ? '#f5a623' : '#e50000'
        ctx.shadowColor = p.isGold ? '#f5a623' : '#e50000'
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Dynamic Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(180,0,0,0.18),rgba(5,5,5,0.98))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Smoke Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Hero Body */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Typography */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex max-w-full items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[0.68rem] sm:text-xs font-semibold tracking-wide text-brand-red mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
            LIVE WOOD-FIRED ARTISAN PIZZAS &amp; BURGERS
          </motion.div>

          {/* Main Title with Responsive Proportional Sizing */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white"
          >
            SMOKED TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-500 to-brand-gold">
              PERFECTION.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 text-sm sm:text-base md:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Taste the unmistakable aroma of live flames, 100% mozzarella stretch, and secret slow-marinated spices at Mellow Multi Mall, B-17 Islamabad.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="group flex w-full sm:w-auto justify-center items-center gap-3 bg-brand-red hover:bg-brand-red2 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 box-glow-red hover:box-glow-red-strong hover:scale-105 active:scale-95 tracking-wide"
            >
              <FiShoppingBag className="text-lg group-hover:-translate-y-0.5 transition-transform" />
              Order Right Now
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="flex w-full sm:w-auto justify-center items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-zinc-200 hover:text-white hover:border-white/40 hover:bg-white/[0.03] text-sm font-semibold transition-all duration-300"
            >
              Explore Menu
              <FiArrowDownRight className="text-brand-red text-base" />
            </button>
          </motion.div>

          {/* Micro stats banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-8 text-xs text-zinc-400 font-medium text-center lg:text-left"
          >
            <div>
              <span className="block font-heading font-bold text-xl sm:text-2xl text-white">4.9 ★</span>
              <span>Customer Rating</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div>
              <span className="block font-heading font-bold text-xl sm:text-2xl text-white">25 Mins</span>
              <span>Fast Kitchen Prep</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div>
              <span className="block font-heading font-bold text-xl sm:text-2xl text-brand-gold">100%</span>
              <span>Fresh Halal Cuts</span>
            </div>
          </motion.div>
        </div>

        {/* Right High-Def Live Food Showcase with 3D Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="lg:col-span-5 relative flex items-center justify-center mt-2 lg:mt-0"
        >
          {/* Circular Glow Aura */}
          <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-brand-red/30 to-amber-500/20 blur-2xl animate-pulse-slow" />

          {/* Centerpiece Image Container */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-white/10 p-2 sm:p-3 bg-gradient-to-b from-white/[0.06] to-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] group">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
              alt="White Smoke Signature Pizza"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105 brightness-105 contrast-110"
              loading="eager"
            />

            {/* Floating Glass Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 glass-card rounded-2xl p-2 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-xl"
            >
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Live Wood Oven</p>
                <p className="text-xs font-heading font-bold text-white">450°C Stone Baked</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 glass-card rounded-2xl p-2 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-xl"
            >
              <span className="text-2xl">🍕</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-brand-gold tracking-wider">Bestseller</p>
                <p className="text-xs font-heading font-bold text-white">Crown Crust Special</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
