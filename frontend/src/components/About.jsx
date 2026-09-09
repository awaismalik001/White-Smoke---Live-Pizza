import { motion } from 'framer-motion'
import { FiClock, FiShield, FiSmile, FiZap } from 'react-icons/fi'

const PILLARS = [
  {
    icon: <FiZap className="text-xl text-brand-red" />,
    title: 'Live Flame Cooking',
    desc: 'Baking on high heat stone creates a blistered crust with smoky flavors.',
  },
  {
    icon: <FiShield className="text-xl text-brand-gold" />,
    title: '100% Certified Halal',
    desc: 'Only farm-fresh, premium poultry and handpicked toppings touch our kitchen.',
  },
  {
    icon: <FiClock className="text-xl text-brand-red" />,
    title: 'Rapid Kitchen Prep',
    desc: 'Freshly assembled and delivered steaming hot to preserve true texture.',
  },
  {
    icon: <FiSmile className="text-xl text-brand-gold" />,
    title: 'Customer Satisfaction',
    desc: 'Proudly serving thousands of happy pizza lovers across B-17 Islamabad.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual Layer with Real Oven Photo and Layered Depth */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1000&auto=format&fit=crop"
              alt="Live Wood Fired Pizza Making"
              className="w-full h-[450px] object-cover brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 glass-card p-5 rounded-2xl">
              <span className="text-brand-red text-xs font-bold uppercase tracking-wider block mb-1">Authentic Kitchen</span>
              <p className="font-syne font-bold text-lg text-white">Hand-tossed dough with fresh secret sauce daily.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Editorial Story */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 text-left"
        >
          <span className="text-brand-red text-xs font-bold tracking-[4px] uppercase block mb-3">Our Heritage</span>
          <h2 className="font-syne font-black text-[clamp(2rem,4.2vw,3.5rem)] text-white tracking-tight leading-tight">
            The Story Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-gold">
              White Smoke Live Pizza
            </span>
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed mt-6">
            Born out of love for authentic stone-oven pizzas and bold street fast food, White Smoke combines modern culinary craft with the rustic, smoky aroma of open-flame cooking.
          </p>

          <p className="text-zinc-400 text-sm leading-relaxed mt-3">
            Situated conveniently at Mellow Multi Mall in Multi Gardens B-17 Islamabad, our goal has always been simple: zero compromise on cheese quality, generous fillings, and lightning-fast service.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="glass-card rounded-2xl p-5 border border-white/[0.06] transition-all hover:border-brand-red/30"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3">
                  {p.icon}
                </div>
                <h4 className="font-syne font-bold text-sm text-white mb-1.5">{p.title}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
