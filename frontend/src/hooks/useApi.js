import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
})

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } })

// ─── Public ──────────────────────────────────────────────────
export const getMenu       = ()     => API.get('/api/menu')
export const getReviews    = ()     => API.get('/api/reviews')
export const submitReview  = (data) => API.post('/api/reviews', data)
export const placeOrder    = (data) => API.post('/api/orders', data)
export const trackOrder    = (num)  => API.get(`/api/orders/${num}`)

// ─── Admin Auth ───────────────────────────────────────────────
export const adminLogin    = (password) => API.post('/api/admin/login', { password })
export const changeAdminPassword = (data, token) => API.put('/api/admin/password', data, authHeader(token))

// ─── Admin Protected ──────────────────────────────────────────
export const getStats          = (token)          => API.get('/api/admin/stats', authHeader(token))
export const getAdminOrders    = (token)          => API.get('/api/admin/orders', authHeader(token))
export const updateOrderStatus = (id,status,token)=> API.put(`/api/admin/orders/${id}`, { status }, authHeader(token))
export const getAdminReviews   = (token)          => API.get('/api/admin/reviews', authHeader(token))
export const updateReview      = (id,data,token)  => API.put(`/api/admin/reviews/${id}`, data, authHeader(token))
export const deleteReview      = (id,token)       => API.delete(`/api/admin/reviews/${id}`, authHeader(token))
export const getAdminMenu      = (token)          => API.get('/api/admin/menu', authHeader(token))
export const addMenuItem       = (data,token)     => API.post('/api/admin/menu', data, authHeader(token))
export const updateMenuItem    = (id,data,token)  => API.put(`/api/admin/menu/${id}`, data, authHeader(token))
export const deleteMenuItem    = (id,token)       => API.delete(`/api/admin/menu/${id}`, authHeader(token))
