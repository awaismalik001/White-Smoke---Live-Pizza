import { motion } from 'framer-motion'

const ITEMS = [
  { emoji: '🍕', label: 'Signature Pizza',  span: 'col-span-2 row-span-2', size: 'text-8xl' },
  { emoji: '🍗', label: 'Hot Wings',         span: '', size: 'text-5xl' },
  { emoji: '🍔', label: 'Fresh Burgers',     span: '', size: 'text-5xl' },
  { emoji: '🌯', label: 'Zinger Shawarma',   span: '', size: 'text-5xl' },
  { emoji: '🍟', label: 'Loaded Fries',      span: 'col-span-2', size: 'text-5xl' },
  { emoji: '🍝', label: 'Special Pasta',     span: '', size: 'text-5xl' },
  { emoji: '🍽️', label: 'Platter',          span: '', size: 'text-5xl' },
  { emoji: '🥤', label: 'Cold Beverages',    span: '', size: 'text-5xl' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 px-6 bg-brand-darker">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold tracking-[6px] uppercase block mb-3">Food Porn</span>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] tracking-[4px]">Gallery</h2>
          <div className="section-line mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[580px]">
          {ITEMS.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`${item.span} bg-brand-card border border-brand-border rounded-sm
                flex items-center justify-center relative overflow-hidden cursor-pointer group
                hover:border-brand-red transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,0,0,0.25)]`}>
              <span className={`${item.size} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {item.emoji}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/80 via-transparent to-transparent
                translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex items-end">
                <p className="text-white font-bold text-xs tracking-[2px] uppercase p-3">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
