import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getReviews, submitReview } from '../hooks/useApi'

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hover || value) >= star
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange && onChange(star)}
            onMouseEnter={() => onChange && setHover(star)}
            onMouseLeave={() => onChange && setHover(0)}
            className="text-xl focus:outline-none transition-transform hover:scale-110"
          >
            <FiStar
              className={`${filled ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'} transition-colors`}
              style={{ fill: filled ? '#fbbf24' : 'none' }}
            />
          </button>
        )
      })}
    </div>
  )
}

const DEFAULT_REVIEWS = [
  {
    id: 101,
    name: 'Hamza Khan',
    rating: 5,
    comment: 'The Crown Crust pizza with extra garlic dip is heavenly. Best live pizza in B-17 hands down!',
    createdAt: '2026-03-01T12:00:00.000Z',
  },
  {
    id: 102,
    name: 'Ayesha Malik',
    rating: 5,
    comment: 'Super fast delivery and the Zinger burger was hot and crunchy. Family deal 5 is unbelievable value.',
    createdAt: '2026-03-03T14:30:00.000Z',
  },
  {
    id: 103,
    name: 'Usman Tariq',
    rating: 5,
    comment: 'Live smoky aroma when you visit the mall is captivating. Loved the loaded fries and staff hospitality.',
    createdAt: '2026-03-06T18:15:00.000Z',
  },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS)
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getReviews()
      .then((r) => {
        if (r.data?.reviews && r.data.reviews.length > 0) {
          setReviews(r.data.reviews)
        }
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim()) {
      return toast.error('Please fill in both your name and review.')
    }
    setSubmitting(true)
    try {
      await submitReview(form)
      toast.success('Thank you! Your review has been submitted for approval.')
      setForm({ name: '', rating: 5, comment: '' })
    } catch {
      toast.error('Could not submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="reviews" className="py-28 px-6 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red text-xs font-bold tracking-[4px] uppercase block mb-3"
          >
            Guest Opinions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-syne font-black text-[clamp(2rem,4.5vw,3.75rem)] text-white tracking-tight"
          >
            Real Reviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm mt-4"
          >
            What our foodies say after experiencing the smoke.
          </motion.p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id || i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <StarRating value={r.rating} />
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-5 border-t border-white/[0.08] mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-red to-orange-500 flex items-center justify-center font-syne font-bold text-white text-xs">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-syne font-bold text-sm text-white">{r.name}</h4>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <FiCheckCircle className="text-emerald-500" /> Verified Customer
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Review Card */}
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 sm:p-10 border border-white/10">
          <div className="text-center mb-8">
            <h3 className="font-syne font-bold text-2xl text-white">Share Your Taste Experience</h3>
            <p className="text-zinc-400 text-xs mt-2">Help others discover the best items on our menu.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-2">Your Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Ali Ahmed"
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-2">Rating</label>
              <StarRating value={form.rating} onChange={(r) => setForm((p) => ({ ...p, rating: r }))} />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-2">Your Review</label>
              <textarea
                value={form.comment}
                onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                placeholder="What did you order and how was the flavor?"
                rows={4}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-red transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 box-glow-red hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
