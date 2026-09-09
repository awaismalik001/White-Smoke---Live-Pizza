import { useState } from 'react'
import { FiX, FiSearch } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { trackOrder } from '../hooks/useApi'

const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered']

const STATUS_COLORS = {
  Pending:   'text-yellow-400',
  Confirmed: 'text-blue-400',
  Preparing: 'text-orange-400',
  Ready:     'text-green-400',
  Delivered: 'text-gray-400',
}

export default function TrackOrder({ onClose }) {
  const [orderNum, setOrderNum] = useState('')
  const [order, setOrder]       = useState(null)
  const [loading, setLoading]   = useState(false)

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderNum.trim()) return toast.error('Please enter an order number.')
    setLoading(true)
    setOrder(null)
    try {
      const res = await trackOrder(orderNum.trim().toUpperCase())
      setOrder(res.data.order)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order not found.')
    } finally { setLoading(false) }
  }

  const currentStep = order ? STATUSES.indexOf(order.status) : -1

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-card border border-brand-border rounded-sm w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-border">
          <h2 className="font-bebas text-2xl tracking-[3px] text-brand-red">Track Your Order</h2>
          <button onClick={onClose} className="text-brand-white/60 hover:text-brand-red text-2xl transition-colors"><FiX /></button>
        </div>

        <div className="p-6">
          {/* Search Form */}
          <form onSubmit={handleTrack} className="flex gap-3 mb-6">
            <input value={orderNum} onChange={e => setOrderNum(e.target.value)}
              placeholder="Enter Order Number (e.g. WS-0001)"
              className="flex-1 bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white
                placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red transition-colors uppercase" />
            <button type="submit" disabled={loading}
              className="bg-brand-red hover:bg-brand-red2 text-white px-5 py-3 rounded-sm transition-colors
                flex items-center gap-2 disabled:opacity-50">
              <FiSearch /> {loading ? '...' : 'Track'}
            </button>
          </form>

          {/* Order Details */}
          {order && (
            <div className="space-y-5">
              {/* Info */}
              <div className="bg-brand-dark border border-brand-border rounded-sm p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-white/50">Order No</span>
                  <span className="font-bold text-brand-red">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-white/50">Name</span>
                  <span>{order.customerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-white/50">Total</span>
                  <span className="text-brand-gold font-bold">Rs.{order.total?.toLocaleString()}/-</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-white/50">Status</span>
                  <span className={`font-bold ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <p className="text-brand-white/50 text-xs tracking-[3px] uppercase mb-4">Order Progress</p>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-brand-border" />
                  {STATUSES.map((status, i) => (
                    <div key={status} className="flex items-center gap-4 mb-4 relative">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all
                        ${i <= currentStep
                          ? 'border-brand-red bg-brand-red shadow-[0_0_10px_rgba(229,0,0,0.6)]'
                          : 'border-brand-border bg-brand-dark'}`}>
                        {i < currentStep && <span className="text-white text-xs">✓</span>}
                        {i === currentStep && <span className="w-2 h-2 bg-white rounded-full block" />}
                      </div>
                      <span className={`text-sm ${i <= currentStep ? 'text-brand-white font-bold' : 'text-brand-white/30'}`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              {order.items && Array.isArray(order.items) && (
                <div className="bg-brand-dark border border-brand-border rounded-sm p-4">
                  <p className="text-brand-white/50 text-xs tracking-[3px] uppercase mb-3">Items Ordered</p>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1 border-b border-brand-border/50 last:border-0">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="text-brand-gold">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
