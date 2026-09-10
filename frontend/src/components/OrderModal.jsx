import { useState } from 'react'
import { FiX, FiPlus, FiMinus } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { placeOrder } from '../hooks/useApi'

const WA = 'https://wa.me/923000000000'

const QUICK_ITEMS = [
  { name: 'Chicken Tikka Pizza (M)', price: 1050 },
  { name: 'Zinger Burger', price: 450 },
  { name: 'Chicken Shawarma', price: 220 },
  { name: 'Jumbo Fries', price: 350 },
  { name: 'Hot Wings (10 Pcs)', price: 800 },
  { name: 'Special Pasta (Small)', price: 450 },
  { name: 'Tower Burger', price: 550 },
  { name: 'Spin Roll (4 Pcs)', price: 550 },
  { name: 'Nuggets (5 Pcs)', price: 400 },
  { name: '1.5 Ltr Drink', price: 220 },
]

export default function OrderModal({ onClose }) {
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', notes: '' })
  const [cart, setCart] = useState({})
  const [loading, setLoading] = useState(false)

  const total = Object.entries(cart).reduce((sum, [name, qty]) => {
    const item = QUICK_ITEMS.find(i => i.name === name)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  const adjust = (name, delta) => {
    setCart(prev => {
      const qty = Math.max(0, (prev[name] || 0) + delta)
      const next = { ...prev }
      if (qty === 0) delete next[name]
      else next[name] = qty
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.customerName || !form.phone || !form.address)
      return toast.error('Please fill all required fields.')
    if (Object.keys(cart).length === 0)
      return toast.error('Please add at least one item to your order.')
    setLoading(true)
    try {
      const items = Object.entries(cart).map(([name, qty]) => {
        const it = QUICK_ITEMS.find(i => i.name === name)
        return { name, price: it?.price || 0, quantity: qty }
      })
      const res = await placeOrder({ ...form, items, total })
      const { orderNumber } = res.data
      toast.success(`Order placed! Your order number is ${orderNumber}`)
      const itemsText = items.map(i => `${i.name} x${i.quantity}`).join(', ')
      const msg = encodeURIComponent(
        `🍕 New Order from White Smoke Website!\n\nOrder No: ${orderNumber}\nName: ${form.customerName}\nPhone: ${form.phone}\nAddress: ${form.address}\nItems: ${itemsText}\nTotal: Rs.${total}/-\n${form.notes ? `Notes: ${form.notes}` : ''}`
      )
      window.open(`${WA}?text=${msg}`, '_blank')
      onClose()
    } catch { toast.error('Failed to place order. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-brand-card border border-brand-border rounded-t-2xl sm:rounded-sm w-full max-w-2xl max-h-[92dvh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-border sticky top-0 bg-brand-card z-10">
          <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-brand-red">Place Your Order</h2>
          <button onClick={onClose} className="text-brand-white/60 hover:text-brand-red text-2xl transition-colors"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="text-brand-white/50 text-xs tracking-wider uppercase font-bold">Your Details</h3>
            <input value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))}
              placeholder="Full Name *" required
              className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red transition-colors" />
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="Phone Number *" required
              className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red transition-colors" />
            <input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
              placeholder="Delivery Address *" required
              className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red transition-colors" />
            <input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Special Instructions (optional)"
              className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red transition-colors" />
          </div>

          {/* Item Selection */}
          <div>
            <h3 className="text-brand-white/50 text-xs tracking-wider uppercase font-bold mb-3">Select Items</h3>
            <div className="space-y-2">
              {QUICK_ITEMS.map(item => (
                <div key={item.name} className="flex items-center justify-between bg-brand-dark border border-brand-border rounded-sm px-4 py-3">
                  <div>
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-brand-gold text-xs ml-2">Rs.{item.price}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => adjust(item.name, -1)}
                      className="text-brand-white/50 hover:text-brand-red transition-colors"><FiMinus /></button>
                    <span className="text-sm font-bold w-4 text-center">{cart[item.name] || 0}</span>
                    <button type="button" onClick={() => adjust(item.name, 1)}
                      className="text-brand-white/50 hover:text-brand-red transition-colors"><FiPlus /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Submit */}
          <div className="border-t border-brand-border pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total</span>
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-gold">Rs.{total.toLocaleString()}/-</span>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-[3px] uppercase py-4 rounded-sm
                transition-all duration-300 box-glow-red disabled:opacity-50">
              {loading ? 'Placing Order...' : '✅ Place Order & Confirm on WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
