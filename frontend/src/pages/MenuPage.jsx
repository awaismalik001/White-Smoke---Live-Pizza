import { Link } from 'react-router-dom'
import { FiShoppingBag, FiTag, FiPhoneCall } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

export default function MenuPage() {
  const { openCart } = useCart()

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Top Breadcrumb & Page Banner */}
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">Menu</span>
          </div>
        </div>

        {/* Full Menu Component */}
        <Menu />

        {/* Bottom Ordering & Deals CTA Strip */}
        <section className="border-t border-white/[0.08] bg-zinc-950/80 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-brand-red text-xs font-bold tracking-wider uppercase block mb-3">
              Fast Delivery & Takeaway
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Ready to Taste the White Smoke Difference?
            </h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              Order directly online or explore our value-packed family &amp; student combos. Freshly baked at 450°C in B-17 Islamabad.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <button
                onClick={openCart}
                className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-300 box-glow-red hover:scale-105 active:scale-95 tracking-wide"
              >
                <FiShoppingBag className="text-base" /> View Cart & Order
              </button>
              <Link
                to="/deals"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-brand-gold border border-brand-gold/30 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FiTag className="text-base" /> View Signature Deals
              </Link>
              <a
                href="tel:+923045788808"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FiPhoneCall className="text-base" /> Call 0304-5788808
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
