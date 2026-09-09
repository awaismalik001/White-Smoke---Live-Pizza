import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AdminContext } from '../context/AdminContext'
import { AdminSidebar } from './AdminDashboard'
import { changeAdminPassword } from '../hooks/useApi'
import { ADMIN_PATH } from '../adminPath'

export default function AdminSecurity() {
  const { token, logout } = useContext(AdminContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.newPassword.length < 12) return toast.error('Use at least 12 characters.')
    if (form.newPassword !== form.confirmPassword) return toast.error('New passwords do not match.')

    setSaving(true)
    try {
      await changeAdminPassword({ currentPassword: form.currentPassword, newPassword: form.newPassword }, token)
      logout()
      toast.success('Password changed. Sign in again.')
      navigate(ADMIN_PATH)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not change password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-brand-white">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-syne font-black text-3xl sm:text-4xl tracking-tight">Security</h1>
          <p className="text-brand-white/40 text-sm mt-1">Manage the password for this administrator account.</p>
        </div>

        <section className="max-w-xl bg-brand-card border border-brand-border rounded-sm p-4 sm:p-6">
          <h2 className="font-syne font-bold text-2xl tracking-tight mb-2">Change password</h2>
          <p className="text-brand-white/40 text-sm mb-6">All active administrator sessions will be signed out after the change.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="currentPassword" type="password" value={form.currentPassword} onChange={updateField}
              autoComplete="current-password" placeholder="Current password" required className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red" />
            <input name="newPassword" type="password" value={form.newPassword} onChange={updateField}
              autoComplete="new-password" minLength="12" placeholder="New password (12+ characters)" required className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red" />
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField}
              autoComplete="new-password" minLength="12" placeholder="Confirm new password" required className="w-full bg-brand-dark border border-brand-border px-4 py-3 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red" />
            <button type="submit" disabled={saving} className="bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-[2px] uppercase px-6 py-3 rounded-sm disabled:opacity-50">
              {saving ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
