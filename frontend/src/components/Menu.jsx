import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getMenu } from '../hooks/useApi'
import { useCart } from '../context/CartContext'

// High Definition food photos from Unsplash for each menu category
const CATEGORY_IMAGES = {
  'Pizza (Regular)': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=900&auto=format&fit=crop',
  'Pizza (Special)': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=900&auto=format&fit=crop',
  'Burgers':         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop',
  'Rolls':           'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=900&auto=format&fit=crop',
  'Appetizer':       'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=900&auto=format&fit=crop',
  'Pasta':           'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=900&auto=format&fit=crop',
  'Donor & Sandwich':'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=900&auto=format&fit=crop',
  'Beverages':       'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=900&auto=format&fit=crop',
}

// Parse a price string into size variants.
// e.g. 'S:500 / M:1050 / L:1600 / XL:2050' -> [{ label: 'S', price: 500 }, ...]
// Returns [] when the price is a single number.
const parseSizes = (priceStr) => {
  const matches = [...String(priceStr).matchAll(/([A-Za-z]+)\s*:\s*(\d+)/g)]
  if (matches.length > 0) {
    return matches.map(m => ({ label: m[1].toUpperCase(), price: parseInt(m[2]) }))
  }
  return []
}

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
    { name: 'Chicken Burger', price: '250' },
    { name: 'Crunch Burger', price: '300' },
    { name: 'Petty Burger', price: '350' },
    { name: 'Zinger Burger', price: '450' },
    { name: 'Tower Burger', price: '550' },
  ],
  'Rolls': [
    { name: 'Chicken Shawarma', price: '220' },
    { name: 'Special Shawarma', price: '250' },
    { name: 'Zinger Shawarma', price: '350' },
    { name: 'Jumbo Shawarma', price: '400' },
    { name: 'Chicken Paratha Roll', price: '400' },
    { name: 'Zinger Paratha Roll', price: '400' },
    { name: 'Kabab Shawarma', price: '250' },
    { name: 'Kabab Paratha Roll', price: '350' },
    { name: 'Spin Roll (4 Pcs)', price: '550' },
    { name: 'Malai Boti Spin Roll', price: '600' },
    { name: 'Tortilla Wrap', price: '500' },
    { name: 'Tortilla Wrap Malai Boti', price: '600' },
  ],
  'Appetizer': [
    { name: 'Regular Fries', price: '200' },
    { name: 'Jumbo Fries', price: '350' },
    { name: 'Loaded Fries (Small)', price: '450' },
    { name: 'Loaded Fries (Large)', price: '650' },
    { name: 'Oven Bake Wings (5 Pcs)', price: '400' },
    { name: 'Oven Bake Wings (10 Pcs)', price: '800' },
    { name: 'Hot Wings (10 Pcs)', price: '800' },
    { name: 'Hot Shots (10 Pcs)', price: '800' },
    { name: 'Nuggets (5 Pcs)', price: '400' },
    { name: 'Nuggets (10 Pcs)', price: '800' },
  ],
  'Pasta': [
    { name: 'Special Pasta (Small)', price: '450' },
    { name: 'Special Pasta (Large)', price: '750' },
  ],
  'Donor & Sandwich': [
    { name: 'Regular Donor', price: '500' },
    { name: 'Special Donor', price: '600' },
    { name: 'Special Sandwich', price: '600' },
  ],
  'Beverages': [
    { name: '300ml Drink', price: '80' },
    { name: '345ml Drink', price: '100' },
    { name: '500ml Drink', price: '120' },
    { name: '1 Ltr Drink', price: '200' },
    { name: '1.5 Ltr Drink', price: '220' },
  ],
}

export default function Menu() {
  const [menu, setMenu] = useState(FALLBACK)
  const [activeTab, setActiveTab] = useState(Object.keys(FALLBACK)[0])
  const { addItem } = useCart()

  const handleAddToCart = (item, size) => {
    const name = size ? `${item.name} (${size.label})` : item.name
    const price = size ? size.price : parseInt(String(item.price).replace(/[^\d]/g, ''))
    if (!price) return toast.error('Price unavailable for this item.')
    addItem({ id: `menu-${activeTab}-${name}`, name, price })
    toast.success(`${name} added to cart!`)
  }

  useEffect(() => {
    getMenu()
      .then((r) => {
        if (r.data?.menu && Object.keys(r.data.menu).length) {
          setMenu(r.data.menu)
        }
      })
      .catch(() => {})
  }, [])

  const tabs = Object.keys(menu)
  const items = menu[activeTab] || []
  const currentImg = CATEGORY_IMAGES[activeTab] || CATEGORY_IMAGES['Pizza (Regular)']

  return (
    <section id="menu" className="py-28 px-6 relative bg-zinc-950">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red text-xs font-bold tracking-wider uppercase block mb-3"
          >
            Handcrafted Flavors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
          >
            Explore The Menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm mt-4"
          >
            Hover or tap on any category card to flip and view all varieties with live pricing.
          </motion.p>
        </div>

        {/* Categories Pill Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-red text-white box-glow-red scale-105'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.05]'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Tab Content: High-Def 3D Flip Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Big Feature Banner with Real HD Food Photo */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[380px] border border-white/10 group">
              <img
                src={currentImg}
                alt={activeTab}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-1">Category Highlight</span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">{activeTab}</h3>
                <p className="text-zinc-300 text-xs mt-2">
                  Prepared fresh to order using original recipes and authentic cheese blends.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white">
                  <span>{items.length} items available</span>
                </div>
              </div>
            </div>

            {/* Right Cards Grid with 3D Flip capability */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: Math.ceil(items.length / 5) }, (_, ci) => {
                const chunk = items.slice(ci * 5, ci * 5 + 5)
                return (
                  <div key={ci} className="flip-card h-[380px] cursor-pointer">
                    <div className="flip-inner">
                      {/* Front Card */}
                      <div className="flip-front glass-card p-6 flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red font-bold text-lg mb-4">
                            #{ci + 1}
                          </div>
                          <h4 className="font-heading font-bold text-xl sm:text-2xl text-white">{activeTab}</h4>
                          <p className="text-zinc-400 text-xs mt-1">Pack {ci + 1}</p>
                        </div>

                        <div className="space-y-3 my-auto">
                          {chunk.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-zinc-300 truncate max-w-[170px]">{item.name}</span>
                              <span className="text-brand-gold font-bold font-heading ml-2 shrink-0">Rs.{item.price}</span>
                            </div>
                          ))}
                          {chunk.length > 3 && (
                            <p className="text-zinc-500 text-[11px] italic">+{chunk.length - 3} more items...</p>
                          )}
                        </div>

                        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                          <span className="text-brand-red text-xs font-bold tracking-wider uppercase">
                            Hover to Flip 3D
                          </span>
                          <span className="text-zinc-500 text-xs">↻</span>
                        </div>
                      </div>

                      {/* Back Card */}
                      <div className="flip-back p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-900 via-zinc-950 to-brand-red/20 border border-brand-red/50 shadow-[inset_0_0_30px_rgba(229,0,0,0.15)]">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-brand-red text-[11px] font-bold uppercase tracking-wider">Full Price List</span>
                            <span className="text-zinc-400 text-xs font-semibold">{chunk.length} Items</span>
                          </div>
                          <h4 className="font-heading font-bold text-lg text-white mb-4">{activeTab}</h4>

                          <div className="space-y-3 overflow-y-auto max-h-[220px] pr-1">
                            {chunk.map((item, i) => {
                              const sizes = parseSizes(item.price)
                              return (
                                <div key={i} className="flex justify-between items-start gap-2 text-xs border-b border-white/5 pb-2">
                                  <span className="text-zinc-200 font-medium">{item.name}</span>
                                  {sizes.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 justify-end shrink-0">
                                      {sizes.map(s => (
                                        <button
                                          key={s.label}
                                          onClick={() => handleAddToCart(item, s)}
                                          title={`Add ${item.name} (${s.label}) to cart`}
                                          className="bg-brand-red/15 hover:bg-brand-red text-brand-red hover:text-white border border-brand-red/40 px-1.5 py-0.5 rounded text-[10px] font-bold transition-all duration-200"
                                        >
                                          {s.label} Rs.{s.price}
                                        </button>
                                      ))}
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handleAddToCart(item, null)}
                                      title={`Add ${item.name} to cart`}
                                      className="flex items-center gap-1 bg-brand-red/15 hover:bg-brand-red text-brand-red hover:text-white border border-brand-red/40 px-2 py-0.5 rounded text-[10px] font-bold transition-all duration-200 shrink-0"
                                    >
                                      <FiPlus /> Rs.{item.price}
                                    </button>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 text-center">
                          <span className="text-[11px] text-zinc-400">Tap a price to add to cart · Dine-in & Takeaway</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
