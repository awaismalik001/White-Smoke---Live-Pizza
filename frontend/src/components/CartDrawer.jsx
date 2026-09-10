import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { placeOrder } from '../hooks/useApi'
import { useCart } from '../context/CartContext'

const WA = 'https://wa.me/923000000000'

export default function CartDrawer() {
  const { items, updateQty, removeItem, clearCart, total, count, isOpen, closeCart } = useCart()
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', notes: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.customerName || !form.phone || !form.address)
      return toast.error('Please fill all required fields.')
    if (items.length === 0)
      return toast.error('Your cart is empty. Add some items first.')
    setLoading(true)
    try {
      const orderItems = items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity }))
      const res = await placeOrder({ ...form, items: orderItems, total })
      const { orderNumber } = res.data
      toast.success(`Order placed! Your order number is ${orderNumber}`)
      const itemsText = orderItems.map(i => `${i.name} x${i.quantity}`).join(', ')
      const msg = encodeURIComponent(
        `🍕 New Order from White Smoke Website!\n\nOrder No: ${orderNumber}\nName: ${form.customerName}\nPhone: ${form.phone}\nAddress: ${form.address}\nItems: ${itemsText}\nTotal: Rs.${total.toLocaleString()}/-\n${form.notes ? `Notes: ${form.notes}` : ''}`
      )
      window.open(`${WA}?text=${msg}`, '_blank')
      clearCart()
      closeCart()
    } catch { toast.error('Failed to place order. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="relative w-full max-w-md h-full bg-brand-card border-l border-brand-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-border shrink-0">
              <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-brand-red flex items-center gap-2">
                <FiShoppingBag /> Your Cart
                {count > 0 && (
                  <span className="text-xs font-bold bg-brand-red/15 text-brand-red px-2.5 py-1 rounded-full border border-brand-red/30">
                    {count} item{count > 1 ? 's' : ''}
                  </span>
                )}
              </h2>
              <button onClick={closeCart} className="text-brand-white/60 hover:text-brand-red text-2xl transition-colors"><FiX /></button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl">🛒</div>
                  <p className="text-zinc-400 text-sm">Your cart is empty.</p>
                  <p className="text-zinc-500 text-xs">Browse the <span className="text-brand-red font-semibold">Menu</span> or <span className="text-brand-red font-semibold">Deals</span> and add items to get started.</p>
                  <button onClick={closeCart}
                    className="mt-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 text-xs font-bold px-6 py-3 rounded-full transition-all duration-300">
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-brand-dark border border-brand-border rounded-sm px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <span className="text-sm font-medium block truncate">{item.name}</span>
                      <span className="text-brand-gold text-xs">Rs.{item.price.toLocaleString()} × {item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <button type="button" onClick={() => updateQty(item.id, -1)}
                        className="text-brand-white/50 hover:text-brand-red transition-colors"><FiMinus /></button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button type="button" onClick={() => updateQty(item.id, 1)}
                        className="text-brand-white/50 hover:text-brand-red transition-colors"><FiPlus /></button>
                      <button type="button" onClick={() => removeItem(item.id)}
                        className="text-brand-white/40 hover:text-brand-red transition-colors ml-1" title="Remove"><FiTrash2 /></button>
                    </div>
                  </div>
                ))
              )}

              {/* Clear cart link */}
              {items.length > 0 && (
                <button onClick={clearCart}
                  className="text-zinc-500 hover:text-brand-red text-[11px] font-bold uppercase tracking-wider transition-colors">
                  Clear All Items
                </button>
              )}
            </div>

            {/* Checkout Form */}
            {items.length > 0 && (
              <form onSubmit={handleSubmit} className="border-t border-brand-border p-4 sm:p-6 space-y-3 shrink-0 max-h-[55dvh] overflow-y-auto">
                <h3 className="text-brand-white/50 text-xs tracking-wider uppercase font-bold">Delivery Details</h3>
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
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}