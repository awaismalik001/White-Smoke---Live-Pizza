import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiClock, FiMessageCircle } from 'react-icons/fi'
import OrderModal from './OrderModal'
import TrackOrder from './TrackOrder'

const WA = 'https://wa.me/923000000000'

const contactCards = [
  {
    icon: <FiMapPin className="text-brand-red text-2xl" />,
    label: 'Our Location',
    value: 'Mellow Multi Mall, Block B\nNear Gate No. 2, Multi Gardens\nB-17, Islamabad',
    action: null,
  },
  {
    icon: <FiPhone className="text-brand-red text-2xl" />,
    label: 'Call Us',
    value: '0304-5788808\n0315-5788997',
    action: 'tel:+923045788808',
  },
  {
    icon: <FiClock className="text-brand-red text-2xl" />,
    label: 'Opening Hours',
    value: 'Open Daily\n12:00 PM – 1:00 AM',
    action: null,
  },
  {
    icon: <FiMessageCircle className="text-brand-red text-2xl" />,
    label: 'WhatsApp',
    value: '+92 300 0000000 (Mock)',
    action: `${WA}?text=Hi! I'd like to enquire about White Smoke.`,
  },
]

export default function Contact() {
  const [showOrder, setShowOrder] = useState(false)
  const [showTrack, setShowTrack] = useState(false)

  const reserveWA = () => {
    const msg = encodeURIComponent("Hi! I'd like to make a reservation at White Smoke.\nName: \nDate: \nTime: \nGuests: ")
    window.open(`${WA}?text=${msg}`, '_blank')
  }

  return (
    <section id="contact" className="py-28 px-6 bg-brand-darker">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold tracking-[6px] uppercase block mb-3">Find Us</span>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] tracking-[4px]">Contact &amp; Location</h2>
          <div className="section-line mx-auto mt-4" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setShowOrder(true)}
            className="bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-[3px] uppercase px-8 py-3 rounded-sm
              transition-all duration-300 box-glow-red hover:box-glow-red-strong hover:-translate-y-1">
            🛒 Place Order
          </button>
          <button onClick={reserveWA}
            className="bg-[#25D366] hover:bg-[#1ebc5a] text-white font-bold text-xs tracking-[3px] uppercase px-8 py-3 rounded-sm
              transition-all duration-300 hover:-translate-y-1">
            📅 Reservation via WhatsApp
          </button>
          <button onClick={() => setShowTrack(true)}
            className="border border-brand-border hover:border-brand-red text-brand-white hover:text-brand-red font-bold text-xs tracking-[3px] uppercase px-8 py-3 rounded-sm
              transition-all duration-300 hover:-translate-y-1">
            🔍 Track Order
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="flex flex-col gap-4">
            {contactCards.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onClick={() => c.action && window.open(c.action, '_blank')}
                className={`bg-brand-card border border-brand-border rounded-sm p-5 flex items-start gap-4
                  hover:border-brand-red hover:translate-x-2 transition-all duration-300
                  ${c.action ? 'cursor-pointer' : ''}`}>
                <div className="shrink-0 mt-0.5">{c.icon}</div>
                <div>
                  <p className="text-brand-red text-[0.65rem] font-bold tracking-[3px] uppercase mb-1">{c.label}</p>
                  <p className="text-brand-white font-semibold text-sm whitespace-pre-line">{c.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="rounded-sm overflow-hidden border border-brand-border min-h-[350px]">
            <iframe
              title="White Smoke Location"
              src="https://maps.google.com/maps?q=33.6922747,72.8316121&z=17&output=embed"
              className="w-full h-full min-h-[350px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      </div>

      {showOrder && <OrderModal onClose={() => setShowOrder(false)} />}
      {showTrack && <TrackOrder onClose={() => setShowTrack(false)} />}
    </section>
  )
}
