import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'

// Public
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Menu from './components/Menu'
import Deals from './components/Deals'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminOrders from './admin/AdminOrders'
import AdminMenu from './admin/AdminMenu'
import AdminReviews from './admin/AdminReviews'

function HomePage() {
  return (
    <div className="bg-brand-dark">
      <Navbar />
      <Hero />
      <StatsBar />
      <Menu />
      <Deals />
      <Gallery />
      <Reviews />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AdminContext)
  return isAuthenticated ? children : <Navigate to="/admin" replace />
}

export default function App() {
  const { isAuthenticated } = useContext(AdminContext)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/orders"    element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
      <Route path="/admin/menu"      element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
      <Route path="/admin/reviews"   element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
