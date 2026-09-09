import { motion } from 'framer-motion'

const GALLERY_ITEMS = [
  {
    title: 'Wood-Fired Margherita',
    category: 'Artisan Crust',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=900&auto=format&fit=crop',
    span: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    title: 'Fiery Crispy Zinger',
    category: 'Gourmet Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop',
    span: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    title: 'Smoked Chicken Shawarma',
    category: 'Wraps & Rolls',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=900&auto=format&fit=crop',
    span: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    title: 'Oven Baked Garlic Wings',
    category: 'Crispy Appetizers',
    image: 'https://images.unsplash.com/photo-1527477321075-d3a7331a6256?q=80&w=900&auto=format&fit=crop',
    span: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    title: 'Loaded Cheese Fries',
    category: 'Hot Appetizers',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=900&auto=format&fit=crop',
    span: 'col-span-1 md:col-span-1 row-span-1',
  },
  {
    title: 'Signature Crown Crust Pizza',
    category: 'House Specialty',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=900&auto=format&fit=crop',
    span: 'col-span-1 md:col-span-2 row-span-1',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 px-6 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red text-xs font-bold tracking-[4px] uppercase block mb-3"
          >
            Visual Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-syne font-black text-4xl sm:text-6xl text-white tracking-tight"
          >
            Crafted for Cravings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm mt-4"
          >
            A glimpse into our fiery ovens and kitchen creations. Every bite made with care.
          </motion.p>
        </div>

        {/* Masonry-Style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 ${item.span} cursor-pointer`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95 contrast-105"
                loading="lazy"
              />

              {/* Modern Frosted Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-red mb-1">
                  {item.category}
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
