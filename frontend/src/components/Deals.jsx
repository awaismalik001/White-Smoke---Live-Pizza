import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

const DEALS = [
  {
    id: 1,
    category: 'Special Deals',
    badge: 'Deal 1',
    title: 'Wings Combo Feast',
    items: ['10 Pcs Crispy Wings', '1 Jumbo French Fries', '2 Cold Drinks (300ml)'],
    price: '1,260',
    popular: false,
    image: 'https://images.unsplash.com/photo-1527477321075-d3a7331a6256?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'Special Deals',
    badge: 'Deal 2',
    title: 'Pizza & Nuggets Delight',
    items: ['1 Medium Artisan Pizza', '5 Pcs Golden Nuggets', '2 Cold Drinks (300ml)'],
    price: '1,560',
    popular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Special Deals',
    badge: 'Deal 3',
    title: 'Large Pizza Gathering',
    items: ['1 Large Stone-Baked Pizza', '1 Jumbo Drink (1.5 Ltr)'],
    price: '1,720',
    popular: false,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    category: 'Special Deals',
    badge: 'Deal 4',
    title: 'XL Mega Crave Deal',
    items: ['1 XL Giant Pizza (Any Flavor)', '1 Jumbo Drink (1.5 Ltr)'],
    price: '2,170',
    popular: false,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    category: 'Family Deals',
    badge: 'Deal 5',
    title: 'Quad Zinger Family Pack',
    items: ['4 Crispy Zinger Burgers', '1 Jumbo French Fries', '1 Jumbo Drink (1.5 Ltr)'],
    price: '2,250',
    popular: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    category: 'Family Deals',
    badge: 'Deal 6',
    title: 'Grand Pizza Extravaganza',
    items: ['2 Large Pizzas (Your Choice)', '5 Pcs Oven Baked Wings', '1 Jumbo Drink (1.5 Ltr)'],
    price: '3,620',
    popular: false,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    category: 'Student Deals',
    badge: 'Deal 7',
    title: 'Student Zinger Saver',
    items: ['1 Zinger Burger', '1 Regular Fries', '1 Cold Drink (300ml)'],
    price: '680',
    popular: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    category: 'Student Deals',
    badge: 'Deal 8',
    title: 'Student Personal Pizza',
    items: ['1 Small Personal Pizza', '1 Regular Fries', '1 Cold Drink (300ml)'],
    price: '730',
    popular: false,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 9,
    category: 'Student Deals',
    badge: 'Deal 9',
    title: 'Tower Meal Upgrade',
    items: ['1 Double Tower Burger', '1 Regular Fries', '1 Drink (500ml)'],
    price: '820',
    popular: false,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 10,
    category: 'Student Deals',
    badge: 'Deal 10',
    title: 'Loaded Cheese & Patty Box',
    items: ['1 Loaded Cheese Fries (Small)', '1 Patty Burger', '1 Drink (500ml)'],
    price: '870',
    popular: false,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop',
  },
]

export default function Deals() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="deals" className="py-28 px-6 bg-black relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red text-xs font-bold tracking-[4px] uppercase block mb-3"
          >
            Exclusive Combos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-syne font-black text-4xl sm:text-6xl text-white tracking-tight"
          >
            Signature Deals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm mt-4"
          >
            Hand-curated value bundles prepared hot and fresh for friends, families, and students.
          </motion.p>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                deal.popular ? 'border-brand-red/60 shadow-[0_10px_35px_-10px_rgba(229,0,0,0.3)]' : ''
              }`}
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {deal.badge}
                  </span>
                  {deal.popular && (
                    <span className="bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                      Popular Pick
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-4">
                  <span className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider">{deal.category}</span>
                  <h3 className="font-syne font-bold text-xl text-white tracking-wide">{deal.title}</h3>
                </div>
              </div>

              {/* Body Section */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <ul className="space-y-2.5 my-4">
                  {deal.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium">
                      <FiCheckCircle className="text-brand-red text-sm shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">Total Price</span>
                    <span className="font-syne font-black text-2xl sm:text-3xl text-brand-gold">
                      Rs.{deal.price}
                    </span>
                  </div>

                  <button
                    onClick={() => scrollTo('contact')}
                    className="bg-brand-red hover:bg-brand-red2 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 box-glow-red hover:scale-105 active:scale-95"
                  >
                    Order Combo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
