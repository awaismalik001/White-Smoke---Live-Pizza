import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AdminContext } from '../context/AdminContext'
import { adminLogin } from '../hooks/useApi'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const { login }               = useContext(AdminContext)
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password) return toast.error('Enter the admin password.')
    setLoading(true)
    try {
      const res = await adminLogin(password)
      login(res.data.token)
      toast.success('Welcome back, Admin!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Incorrect password.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e50000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-bebas text-5xl tracking-[6px] text-glow-red">
            WHITE <span className="text-brand-red">SMOKE</span>
          </h1>
          <p className="font-bebas text-brand-white/40 tracking-[8px] text-sm mt-1">ADMIN PANEL</p>
        </div>

        {/* Card */}
        <div className="bg-brand-card border border-brand-border rounded-sm p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="font-bebas text-2xl tracking-[3px]">Admin Access</h2>
            <p className="text-brand-white/40 text-xs mt-1">Enter your admin password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin Password"
              autoComplete="current-password"
              required
              className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm
                text-brand-white placeholder-brand-white/30 rounded-sm
                focus:outline-none focus:border-brand-red transition-colors tracking-widest"
            />
            <button type="submit" disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs
                tracking-[3px] uppercase py-4 rounded-sm transition-all duration-300
                box-glow-red hover:box-glow-red-strong disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-brand-white/20 text-xs mt-6 tracking-[2px]">
          WHITE SMOKE · ADMIN ONLY
        </p>
      </div>
    </div>
  )
}
