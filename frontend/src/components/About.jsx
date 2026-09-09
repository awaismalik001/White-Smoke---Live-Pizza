import { motion } from 'framer-motion'

const features = [
  { icon: '🔥', title: 'Live Cooking',        desc: 'Watch your food being made fresh right before your eyes.' },
  { icon: '🍕', title: 'Premium Ingredients', desc: 'Only the finest toppings and freshest dough — every time.' },
  { icon: '⚡', title: 'Fast Service',         desc: 'Quick prep, hot delivery. We value your precious time.' },
  { icon: '💯', title: '100% Halal',           desc: 'All our meat is certified halal for your peace of mind.' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-brand-dark">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Visual */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center h-[420px]">
          {/* Orbiting Rings */}
          {[250, 350, 450].map((size, i) => (
            <div key={i} className="absolute rounded-full border border-brand-red/20"
              style={{
                width: size, height: size,
                animation: `spin ${[20, 15, 25][i]}s linear infinite ${i % 2 ? 'reverse' : ''}`,
              }} />
          ))}
          {/* Central pizza */}
          <div className="text-[8rem] animate-float z-10 drop-shadow-[0_0_40px_rgba(229,0,0,0.6)]">🍕</div>
          {/* Floating mini items */}
          {['🍔', '🌯', '🍟', '🥤'].map((emoji, i) => (
            <div key={i} className="absolute text-2xl animate-float"
              style={{
                top: `${[15, 70, 20, 65][i]}%`, left: `${[10, 5, 80, 85][i]}%`,
                animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i * 0.5}s`,
              }}>
              {emoji}
            </div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-brand-red text-xs font-bold tracking-[6px] uppercase block mb-3">Our Story</span>
          <h2 className="font-bebas text-[clamp(2.5rem,5vw,4.5rem)] tracking-[4px] leading-none">About White Smoke</h2>
          <div className="section-line mt-4" />

          <p className="text-brand-white/60 leading-loose text-sm mt-6">
            White Smoke is where passion meets flavor. We craft every pizza, burger, and roll with premium
            ingredients and live cooking techniques that fill the air with irresistible smoky aromas.
            Located in the heart of B-17 Islamabad at Mellow Multi Mall, we serve a community that loves
            bold, authentic flavors made with love.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {features.map(f => (
              <div key={f.title}
                className="bg-brand-card border border-brand-border rounded-sm p-4
                  hover:border-brand-red hover:shadow-[0_0_20px_rgba(229,0,0,0.15)] transition-all duration-300">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                <p className="text-brand-white/45 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
