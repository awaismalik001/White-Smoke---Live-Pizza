import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getReviews, submitReview } from '../hooks/useApi'

function Stars({ rating, onRate }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button"
          onClick={() => onRate && onRate(s)}
          onMouseEnter={() => onRate && setHover(s)}
          onMouseLeave={() => onRate && setHover(0)}
          className="text-xl transition-colors">
          <FiStar className={`${(hover || rating) >= s ? 'text-brand-gold fill-brand-gold' : 'text-brand-border'}`}
            style={{ fill: (hover || rating) >= s ? '#f5a623' : 'none' }} />
        </button>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  const load = () => getReviews().then(r => setReviews(r.data.reviews || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.rating || !form.comment)
      return toast.error('Please fill all fields and select a rating.')
    setSubmitting(true)
    try {
      await submitReview(form)
      toast.success('Review submitted! It will appear after approval.')
      setForm({ name: '', rating: 0, comment: '' })
    } catch { toast.error('Failed to submit review. Try again.') }
    finally { setSubmitting(false) }
  }

  return (
    <section id="reviews" className="py-28 px-6 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-red text-xs font-bold tracking-[6px] uppercase block mb-3">What People Say</span>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] tracking-[4px]">Reviews</h2>
          <div className="section-line mx-auto mt-4" />
        </div>

        {/* Review Cards */}
        {reviews.length === 0 ? (
          <p className="text-center text-brand-white/30 mb-10">No reviews yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {reviews.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-brand-card border border-brand-border rounded-sm p-5 hover:border-brand-red transition-colors">
                <Stars rating={r.rating} />
                <p className="text-brand-white/70 text-sm leading-relaxed mt-3 mb-4">"{r.comment}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{r.name}</span>
                  <span className="text-brand-white/30 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Submit Form */}
        <div className="max-w-xl mx-auto bg-brand-card border border-brand-border rounded-sm p-8">
          <h3 className="font-bebas text-2xl tracking-[2px] mb-6 text-brand-red">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Your Name" required
              className="w-full bg-brand-dark border border-brand-border rounded-sm px-4 py-3 text-sm
                text-brand-white placeholder-brand-white/30 focus:outline-none focus:border-brand-red transition-colors" />
            <div>
              <p className="text-brand-white/50 text-xs tracking-[2px] uppercase mb-2">Your Rating</p>
              <Stars rating={form.rating} onRate={r => setForm(p => ({ ...p, rating: r }))} />
            </div>
            <textarea value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
              placeholder="Share your experience..." rows={4} required
              className="w-full bg-brand-dark border border-brand-border rounded-sm px-4 py-3 text-sm
                text-brand-white placeholder-brand-white/30 focus:outline-none focus:border-brand-red transition-colors resize-none" />
            <button type="submit" disabled={submitting}
              className="w-full bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-[3px] uppercase
                py-3 rounded-sm transition-all duration-300 box-glow-red disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
