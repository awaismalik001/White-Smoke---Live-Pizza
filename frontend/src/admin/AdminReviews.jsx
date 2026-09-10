import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { AdminSidebar } from './AdminDashboard'
import { getAdminReviews, updateReview, deleteReview } from '../hooks/useApi'
import { FiCheck, FiTrash2, FiStar } from 'react-icons/fi'
import toast from 'react-hot-toast'

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <FiStar key={s} className={`text-sm ${s <= rating ? 'text-brand-gold' : 'text-brand-border'}`}
          style={{ fill: s <= rating ? '#f5a623' : 'none' }} />
      ))}
    </div>
  )
}

export default function AdminReviews() {
  const { token }           = useContext(AdminContext)
  const [reviews, setReviews] = useState([])
  const [tab, setTab]         = useState('pending')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getAdminReviews(token).then(r => setReviews(r.data.reviews || [])).catch(() => toast.error('Failed to load reviews.')).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [token])

  const handleApprove = async (id) => {
    try { await updateReview(id, { approved: true }, token); toast.success('Review approved!'); load() }
    catch { toast.error('Failed to approve.') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return
    try { await deleteReview(id, token); toast.success('Review deleted.'); load() }
    catch { toast.error('Failed to delete.') }
  }

  const pending  = reviews.filter(r => !r.approved)
  const approved = reviews.filter(r =>  r.approved)
  const display  = tab === 'pending' ? pending : approved

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-brand-white">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight">Reviews</h1>
          <p className="text-brand-white/40 text-sm mt-1">{pending.length} pending · {approved.length} approved</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {[['pending', `Pending (${pending.length})`], ['approved', `Approved (${approved.length})`]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`text-xs font-bold tracking-[2px] uppercase px-5 py-2 rounded-sm border transition-all
                ${tab === key ? 'bg-brand-red border-brand-red text-white' : 'border-brand-border text-brand-white/50 hover:border-brand-red'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Review Cards */}
        {loading
          ? <p className="text-brand-white/30 text-center py-12">Loading reviews...</p>
          : display.length === 0
            ? <p className="text-brand-white/30 text-center py-12">No {tab} reviews.</p>
            : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {display.map(r => (
                  <div key={r.id} className="bg-brand-card border border-brand-border rounded-sm p-5 hover:border-brand-red/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-sm">{r.name}</p>
                        <StarDisplay rating={r.rating} />
                      </div>
                      <span className="text-brand-white/30 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-brand-white/65 text-sm leading-relaxed mb-4">"{r.comment}"</p>
                    <div className="flex gap-2">
                      {!r.approved && (
                        <button onClick={() => handleApprove(r.id)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white text-xs font-bold tracking-[1px] uppercase px-3 py-1.5 rounded-sm transition-colors">
                          <FiCheck /> Approve
                        </button>
                      )}
                      <button onClick={() => handleDelete(r.id)}
                        className="flex items-center gap-1 bg-brand-red/20 hover:bg-brand-red text-brand-red hover:text-white text-xs font-bold tracking-[1px] uppercase px-3 py-1.5 rounded-sm transition-colors">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
      </main>
    </div>
  )
}
