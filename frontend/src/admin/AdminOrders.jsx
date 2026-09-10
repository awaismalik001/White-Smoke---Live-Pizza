import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { AdminSidebar } from './AdminDashboard'
import { getAdminOrders, updateOrderStatus } from '../hooks/useApi'
import toast from 'react-hot-toast'

const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered']

const STATUS_CLS = {
  Pending:   'status-pending',
  Confirmed: 'status-confirmed',
  Preparing: 'status-preparing',
  Ready:     'status-ready',
  Delivered: 'status-delivered',
}

export default function AdminOrders() {
  const { token }       = useContext(AdminContext)
  const [orders, setOrders]   = useState([])
  const [filter, setFilter]   = useState('All')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getAdminOrders(token).then(r => setOrders(r.data.orders || [])).catch(() => toast.error('Failed to load orders.')).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [token])

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status, token)
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
      toast.success(`Order updated to "${status}"`)
    } catch { toast.error('Failed to update status.') }
  }

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-brand-white">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight">Orders</h1>
            <p className="text-brand-white/40 text-sm mt-1">{orders.length} total orders</p>
          </div>
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {['All', ...STATUSES].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-sm border transition-all
                  ${filter === s ? 'bg-brand-red border-brand-red text-white' : 'border-brand-border text-brand-white/50 hover:border-brand-red'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border text-brand-white/40 text-xs tracking-[2px] uppercase">
                  <th className="text-left p-4">Order No</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Phone</th>
                  <th className="text-left p-4">Address</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? <tr><td colSpan={7} className="p-8 text-center text-brand-white/30">Loading orders...</td></tr>
                  : filtered.length === 0
                    ? <tr><td colSpan={7} className="p-8 text-center text-brand-white/30">No orders found.</td></tr>
                    : filtered.map(o => (
                      <tr key={o.id} className="border-b border-brand-border/50 hover:bg-brand-border/20 transition-colors">
                        <td className="p-4 font-bold text-brand-red">{o.orderNumber}</td>
                        <td className="p-4 font-semibold">{o.customerName}</td>
                        <td className="p-4 text-brand-white/60">{o.phone}</td>
                        <td className="p-4 text-brand-white/60 max-w-[160px] truncate">{o.address}</td>
                        <td className="p-4 text-brand-gold font-bold">Rs.{Number(o.total).toLocaleString()}</td>
                        <td className="p-4">
                          <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}
                            className={`bg-brand-dark border border-brand-border rounded px-2 py-1 text-xs font-bold cursor-pointer
                              focus:outline-none focus:border-brand-red ${STATUS_CLS[o.status]}`}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="p-4 text-brand-white/40 text-xs">{new Date(o.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
