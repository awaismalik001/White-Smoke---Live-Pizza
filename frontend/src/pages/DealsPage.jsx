import { Link } from 'react-router-dom'
import { FiShoppingBag, FiBookOpen, FiPhoneCall } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Deals from '../components/Deals'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

export default function DealsPage() {
  const { openCart } = useCart()

  return (
    <div className="bg-brand-dark min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Top Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-300">Deals</span>
          </div>
        </div>

        {/* Full Deals Component */}
        <Deals />

        {/* Bottom Menu & Order CTA Strip */}
        <section className="border-t border-white/[0.08] bg-zinc-950/80 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-brand-red text-xs font-bold tracking-wider uppercase block mb-3">
              Custom Cravings
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Looking for Individual Pizzas &amp; Burgers?
            </h2>
            <p className="text-zinc-400 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              Explore our full food catalog with 50+ items including Crown Crust pizzas, signature rolls, appetizers, and beverages.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <button
                onClick={openCart}
                className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-300 box-glow-red hover:scale-105 active:scale-95 tracking-wide"
              >
                <FiShoppingBag className="text-base" /> View Cart & Order
              </button>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FiBookOpen className="text-base text-brand-gold" /> Explore Full Menu
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
