import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMenu } from '../hooks/useApi'

const FALLBACK = {
  'Pizza (Regular)': [
    { name: 'Chicken Tikka Pizza', price: 'S:500 / M:1050 / L:1600 / XL:2050' },
    { name: 'Chicken Fajita Pizza', price: 'S:500 / M:1050 / L:1600 / XL:2050' },
    { name: 'Malai Boti Pizza', price: 'S:500 / M:1050 / L:1600 / XL:2050' },
    { name: 'Behari Kabab Pizza', price: 'S:500 / M:1050 / L:1600 / XL:2050' },
    { name: 'White Smoke Special Pizza', price: 'S:500 / M:1050 / L:1600 / XL:2050' },
  ],
  'Pizza (Special)': [
    { name: 'Crown Crust Pizza', price: 'S:800 / M:1500 / L:2000 / XL:2500' },
    { name: 'Kabab Stuffer Pizza', price: 'S:800 / M:1500 / L:2000 / XL:2500' },
    { name: 'Chesse Stuffer Pizza', price: 'S:800 / M:1500 / L:2000 / XL:2500' },
    { name: 'Half & Half Pizza', price: 'S:800 / M:1500 / L:2000 / XL:2500' },
  ],
  'Burgers': [
    { name: 'Chicken Burger', price: '250' },{ name: 'Crunch Burger', price: '300' },
    { name: 'Petty Burger', price: '350' },{ name: 'Zinger Burger', price: '450' },{ name: 'Tower Burger', price: '550' },
  ],
  'Rolls': [
    { name: 'Chicken Shawarma', price: '220' },{ name: 'Special Shawarma', price: '250' },
    { name: 'Zinger Shawarma', price: '350' },{ name: 'Jumbo Shawarma', price: '400' },
    { name: 'Chicken Paratha Roll', price: '400' },{ name: 'Zinger Paratha Roll', price: '400' },
    { name: 'Kabab Shawarma', price: '250' },{ name: 'Kabab Paratha Roll', price: '350' },
    { name: 'Spin Roll (4 Pcs)', price: '550' },{ name: 'Malai Boti Spin Roll (4 Pcs)', price: '600' },
    { name: 'Tortilla Wrap', price: '500' },{ name: 'Tortilla Wrap Malai Boti', price: '600' },
  ],
  'Appetizer': [
    { name: 'Regular Fries', price: '200' },{ name: 'Jumbo Fries', price: '350' },
    { name: 'Loaded Fries (Small)', price: '450' },{ name: 'Loaded Fries (Large)', price: '650' },
    { name: 'Oven Bake Wings (5 Pcs)', price: '400' },{ name: 'Oven Bake Wings (10 Pcs)', price: '800' },
    { name: 'Hot Wings (10 Pcs)', price: '800' },{ name: 'Hot Shots (10 Pcs)', price: '800' },
    { name: 'Nuggets (5 Pcs)', price: '400' },{ name: 'Nuggets (10 Pcs)', price: '800' },
  ],
  'Pasta': [{ name: 'Special Pasta (Small)', price: '450' },{ name: 'Special Pasta (Large)', price: '750' }],
  'Donor & Sandwich': [
    { name: 'Regular Donor', price: '500' },{ name: 'Special Donor', price: '600' },{ name: 'Special Sandwich', price: '600' },
  ],
  'Beverages': [
    { name: '300ml Drink', price: '80' },{ name: '345ml Drink', price: '100' },{ name: '500ml Drink', price: '120' },
    { name: '1 Ltr Drink', price: '200' },{ name: '1.5 Ltr Drink', price: '220' },
  ],
}

const EMOJIS = { 'Pizza (Regular)': '🍕','Pizza (Special)': '🍕','Burgers': '🍔','Rolls': '🌯',
  'Appetizer': '🍟','Pasta': '🍝','Donor & Sandwich': '🥙','Beverages': '🥤','Platter': '🍽️' }

export default function Menu() {
  const [menu, setMenu] = useState(FALLBACK)
  const [activeTab, setActiveTab] = useState(Object.keys(FALLBACK)[0])

  useEffect(() => {
    getMenu().then(r => { if (r.data?.menu && Object.keys(r.data.menu).length) setMenu(r.data.menu) }).catch(() => {})
  }, [])

  const tabs = Object.keys(menu)
  const items = menu[activeTab] || []

  return (
    <section id="menu" className="py-28 px-6 bg-brand-darker">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold tracking-[6px] uppercase block mb-3">What We Serve</span>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] tracking-[4px]">Our Menu</h2>
          <div className="section-line mx-auto mt-4" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`text-[0.7rem] font-bold tracking-[2px] uppercase px-5 py-2.5 rounded-sm border transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-brand-red border-brand-red text-white box-glow-red'
                  : 'bg-transparent border-brand-border text-brand-white/50 hover:border-brand-red hover:text-brand-red'
              }`}>
              {EMOJIS[tab] || '🍴'} {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Split into chunks of 6 items per card */}
            {Array.from({ length: Math.ceil(items.length / 6) }, (_, ci) => {
              const chunk = items.slice(ci * 6, ci * 6 + 6)
              return (
                <div key={ci} className="flip-card h-[300px]">
                  <div className="flip-inner">
                    {/* Front */}
                    <div className="flip-front bg-brand-card border border-brand-border flex flex-col items-center justify-center p-6">
                      <div className="text-6xl mb-4 animate-float">{EMOJIS[activeTab] || '🍴'}</div>
                      <h3 className="font-bebas text-2xl tracking-[2px] text-brand-white text-center">{activeTab}</h3>
                      <p className="text-brand-red text-[0.65rem] tracking-[2px] mt-1">{chunk.length} items · hover to see</p>
                    </div>
                    {/* Back */}
                    <div className="flip-back bg-gradient-to-br from-[#1a0000] to-brand-card border border-brand-red p-5 flex flex-col justify-center"
                      style={{ boxShadow: 'inset 0 0 30px rgba(229,0,0,0.08)' }}>
                      <h3 className="font-bebas text-xl tracking-[2px] text-brand-red mb-3 text-center">{activeTab}</h3>
                      <ul className="space-y-2 overflow-y-auto">
                        {chunk.map((item, i) => (
                          <li key={i} className="flex justify-between items-center text-[0.72rem] border-b border-white/5 pb-1.5">
                            <span className="text-brand-white/80">{item.name}</span>
                            <span className="text-brand-gold font-bold ml-2 shrink-0">Rs.{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
