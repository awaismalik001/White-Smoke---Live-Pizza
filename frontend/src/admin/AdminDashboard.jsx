import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { getStats, getAdminOrders } from '../hooks/useApi'
import { FiGrid, FiList, FiStar, FiMenu, FiLogOut } from 'react-icons/fi'

export function AdminSidebar() {
  const { logout } = useContext(AdminContext)
  const navigate   = useNavigate()
  const location   = useLocation()

  const handleLogout = () => { logout(); navigate('/admin') }

  const navItems = [
    { to: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
    { to: '/admin/orders',    icon: <FiList />, label: 'Orders' },
    { to: '/admin/menu',      icon: <FiMenu />, label: 'Menu Manager' },
    { to: '/admin/reviews',   icon: <FiStar />, label: 'Reviews' },
  ]

  return (
    <aside className="admin-sidebar flex flex-col">
      <div className="p-6 border-b border-brand-border">
        <div className="font-bebas text-xl tracking-[4px] text-glow-red">WHITE <span className="text-brand-red">SMOKE</span></div>
        <div className="text-brand-white/30 text-[0.6rem] tracking-[4px] uppercase mt-0.5">Admin Panel</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <Link key={item.to} to={item.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-semibold transition-all duration-200
              ${location.pathname === item.to
                ? 'bg-brand-red text-white box-glow-red'
                : 'text-brand-white/50 hover:text-brand-white hover:bg-brand-border'}`}>
            {item.icon}{item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-brand-border">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-brand-white/50 hover:text-brand-red text-sm font-semibold transition-colors rounded-sm hover:bg-brand-border">
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )
}

function StatCard({ label, value, color = 'text-brand-white' }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-sm p-6 hover:border-brand-red transition-colors">
      <p className="text-brand-white/50 text-xs tracking-[3px] uppercase mb-2">{label}</p>
      <p className={`font-bebas text-4xl tracking-[2px] ${color}`}>{value}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const { token }  = useContext(AdminContext)
  const [stats, setStats]   = useState(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getStats(token).then(r => setStats(r.data.stats)).catch(() => {})
    getAdminOrders(token).then(r => setOrders(r.data.orders?.slice(0, 5) || [])).catch(() => {})
  }, [token])

  const STATUS_CLS = {
    Pending:   'status-pending',
    Confirmed: 'status-confirmed',
    Preparing: 'status-preparing',
    Ready:     'status-ready',
    Delivered: 'status-delivered',
  }

  return (
    <div className="flex min-h-screen bg-brand-dark text-brand-white">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl tracking-[3px]">Dashboard</h1>
          <p className="text-brand-white/40 text-sm mt-1">Welcome back, Admin 👋</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard label="Total Orders"   value={stats.totalOrders}   />
            <StatCard label="Pending Orders" value={stats.pendingOrders} color="text-yellow-400" />
            <StatCard label="Revenue (Rs.)"  value={`${Number(stats.totalRevenue || 0).toLocaleString()}`} color="text-brand-gold" />
            <StatCard label="Pending Reviews" value={stats.pendingReviews} color="text-brand-red" />
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-brand-card border border-brand-border rounded-sm overflow-hidden">
          <div className="p-5 border-b border-brand-border">
            <h2 className="font-bebas text-xl tracking-[2px]">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border text-brand-white/40 text-xs tracking-[2px] uppercase">
                  <th className="text-left p-4">Order No</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0
                  ? <tr><td colSpan={5} className="p-6 text-center text-brand-white/30">No orders yet.</td></tr>
                  : orders.map(o => (
                    <tr key={o.id} className="border-b border-brand-border/50 hover:bg-brand-border/30 transition-colors">
                      <td className="p-4 font-bold text-brand-red">{o.orderNumber}</td>
                      <td className="p-4">{o.customerName}</td>
                      <td className="p-4 text-brand-gold">Rs.{Number(o.total).toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_CLS[o.status]}`}>{o.status}</span>
                      </td>
                      <td className="p-4 text-brand-white/50">{new Date(o.createdAt).toLocaleDateString()}</td>
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
