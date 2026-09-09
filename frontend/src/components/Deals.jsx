import { motion } from 'framer-motion'

const DEALS = {
  '🔥 White Smoke Special Deals': [
    { badge: 'Deal 1', title: 'Wings Deal',       items: ['Wings (10 Pcs)', '1 Jumbo Fries', '2 (300ml) Drink'],           price: '1,260' },
    { badge: 'Deal 2', title: 'Pizza + Nuggets',  items: ['1 Medium Pizza', 'Nuggets (5 Pcs)', '2 (300ml) Drink'],          price: '1,560' },
    { badge: 'Deal 3', title: 'Large Pizza Deal', items: ['1 Large Pizza', '1 (1.5 Ltr) Drink'],                            price: '1,720' },
    { badge: 'Deal 4', title: 'XL Pizza Deal',    items: ['1 XL Pizza', '1 (1.5 Ltr) Drink'],                              price: '2,170' },
  ],
  '👨‍👩‍👧‍👦 Family Deals': [
    { badge: 'Deal 5', title: 'Burger Family',    items: ['4 Zinger Burger', '1 Jumbo Fries', '1 (1.5 Ltr) Drink'],        price: '2,250' },
    { badge: 'Deal 6', title: 'Pizza Family',     items: ['2 Large Pizza', 'Wings (5 Pcs)', '1 (1.5 Ltr) Drink'],          price: '3,620' },
  ],
  '🎓 Student Deals': [
    { badge: 'Deal 7', title: 'Student Burger',   items: ['1 Zinger Burger', '1 Reg Fries', '1 (300ml) Drink'],            price: '680' },
    { badge: 'Deal 8', title: 'Student Pizza',    items: ['1 Small Pizza', '1 Reg Fries', '1 (300ml) Drink'],              price: '730' },
    { badge: 'Deal 9', title: 'Tower Meal',       items: ['1 Tower Burger', '1 Reg Fries', '1 (500ml) Drink'],             price: '820' },
    { badge: 'Deal 10', title: 'Loaded Deal',     items: ['1 Loaded Fries (Small)', '1 Petty Burger', '1 (500ml) Drink'],  price: '870' },
  ],
}

function DealCard({ deal, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-brand-card border border-brand-border rounded-sm relative overflow-hidden
        hover:-translate-y-2 hover:border-brand-red hover:shadow-[0_20px_60px_rgba(229,0,0,0.2)] transition-all duration-400">
      <div className="absolute left-0 top-0 w-1 h-full bg-brand-red" />
      <div className="p-6 pl-8">
        <span className="inline-block bg-brand-red text-white text-[0.6rem] font-bold tracking-[3px] uppercase px-3 py-1 rounded-sm mb-3">
          {deal.badge}
        </span>
        <h3 className="font-bebas text-2xl tracking-[2px] mb-3">{deal.title}</h3>
        <ul className="space-y-1.5 mb-5">
          {deal.items.map((item, i) => (
            <li key={i} className="text-brand-white/65 text-sm flex items-center gap-2">
              <span className="text-brand-red text-[0.55rem]">▸</span>{item}
            </li>
          ))}
        </ul>
        <div className="font-bebas text-4xl text-brand-gold tracking-[2px]">
          {deal.price}<span className="font-mont text-base text-brand-white/40 ml-1">/-</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Deals() {
  return (
    <section id="deals" className="py-28 px-6 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold tracking-[6px] uppercase block mb-3">Save More</span>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] tracking-[4px]">Special Deals</h2>
          <div className="section-line mx-auto mt-4" />
        </div>

        {Object.entries(DEALS).map(([category, deals]) => (
          <div key={category} className="mb-14">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-6">
              <h3 className="font-bebas text-2xl tracking-[4px] text-brand-red whitespace-nowrap">{category}</h3>
              <div className="flex-1 h-px bg-brand-border" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deals.map((deal, i) => <DealCard key={deal.badge} deal={deal} index={i} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
