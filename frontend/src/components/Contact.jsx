import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiClock, FiMessageCircle, FiShoppingBag, FiSearch, FiCalendar } from 'react-icons/fi'
import OrderModal from './OrderModal'
import TrackOrder from './TrackOrder'

const WA = 'https://wa.me/923000000000'

const contactCards = [
  {
    icon: <FiMapPin className="text-brand-red text-xl" />,
    label: 'Restaurant Location',
    value: 'Mellow Multi Mall, Block B\nNear Gate No. 2, Multi Gardens\nB-17, Islamabad',
    action: 'https://maps.app.goo.gl/tg6KfAhjQQueb96k6',
  },
  {
    icon: <FiPhone className="text-brand-red text-xl" />,
    label: 'Call Direct Kitchen',
    value: '0304-5788808\n0315-5788997',
    action: 'tel:+923045788808',
  },
  {
    icon: <FiClock className="text-brand-red text-xl" />,
    label: 'Baking & Service Hours',
    value: 'Open 7 Days a Week\n12:00 PM – 1:00 AM Midnight',
    action: null,
  },
  {
    icon: <FiMessageCircle className="text-emerald-400 text-xl" />,
    label: 'Live WhatsApp Helpline',
    value: 'Direct order & inquiry\n+92 300 0000000',
    action: `${WA}?text=Hi%20White%20Smoke!%20I%20would%20like%20to%20place%20an%20order.`,
  },
]

export default function Contact() {
  const [showOrder, setShowOrder] = useState(false)
  const [showTrack, setShowTrack] = useState(false)

  const reserveWA = () => {
    const msg = encodeURIComponent(
      "Hi White Smoke Live Pizza!\nI would like to reserve a table.\n\nName: \nDate: \nTime: \nNumber of Guests: "
    )
    window.open(`${WA}?text=${msg}`, '_blank')
  }

  return (
    <section id="contact" className="py-28 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red text-xs font-bold tracking-[4px] uppercase block mb-3"
          >
            Visit or Order
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-syne font-black text-[clamp(2rem,4.5vw,3.75rem)] text-white tracking-tight"
          >
            Connect With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm mt-4"
          >
            Hot dine-in, drive-thru takeaway, or fast home delivery across B-17 Islamabad.
          </motion.p>
        </div>

        {/* Quick Launch Action Ribbon */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <button
            onClick={() => setShowOrder(true)}
            className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 box-glow-red hover:scale-105 active:scale-95"
          >
            <FiShoppingBag className="text-base" /> Place Live Order
          </button>
          <button
            onClick={reserveWA}
            className="inline-flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FiCalendar className="text-base text-emerald-400" /> Book Table on WhatsApp
          </button>
          <button
            onClick={() => setShowTrack(true)}
            className="inline-flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FiSearch className="text-base text-brand-gold" /> Track Order Status
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Info Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {contactCards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => c.action && window.open(c.action, '_blank')}
                className={`glass-card rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 ${
                  c.action ? 'cursor-pointer hover:border-brand-red/60 hover:translate-x-1' : ''
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div>
                  <span className="text-brand-red text-[11px] font-bold uppercase tracking-wider block mb-1">
                    {c.label}
                  </span>
                  <p className="text-white text-xs sm:text-sm font-medium whitespace-pre-line leading-relaxed">
                    {c.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Embedded Google Map with rounded borders and glow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 min-h-[420px] shadow-2xl relative"
          >
            <iframe
              title="White Smoke Location at Mellow Multi Mall B-17"
              src="https://maps.google.com/maps?q=33.6922747,72.8316121&z=17&output=embed"
              className="w-full h-full min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)' }}
            />
          </motion.div>
        </div>
      </div>

      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}
      {showTrack && <TrackOrder onClose={() => setShowTrack(false)} />}
    </section>
  )
}
