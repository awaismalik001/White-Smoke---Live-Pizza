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
import AdminSecurity from './admin/AdminSecurity'
import { ADMIN_PATH } from './adminPath'

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
  return isAuthenticated ? children : <Navigate to={ADMIN_PATH} replace />
}

export default function App() {
  const { isAuthenticated } = useContext(AdminContext)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Navigate to="/" replace />} />
      <Route path={ADMIN_PATH} element={isAuthenticated ? <Navigate to={`${ADMIN_PATH}/dashboard`} /> : <AdminLogin />} />
      <Route path={`${ADMIN_PATH}/dashboard`} element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path={`${ADMIN_PATH}/orders`}    element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
      <Route path={`${ADMIN_PATH}/menu`}      element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
      <Route path={`${ADMIN_PATH}/reviews`}   element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
      <Route path={`${ADMIN_PATH}/security`}  element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
