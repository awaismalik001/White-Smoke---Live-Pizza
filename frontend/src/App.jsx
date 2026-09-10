import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'

// Pages & Components
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import DealsPage from './pages/DealsPage'
import ScrollToTop from './components/ScrollToTop'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminOrders from './admin/AdminOrders'
import AdminMenu from './admin/AdminMenu'
import AdminReviews from './admin/AdminReviews'
import AdminSecurity from './admin/AdminSecurity'
import { ADMIN_PATH } from './adminPath'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AdminContext)
  return isAuthenticated ? children : <Navigate to={ADMIN_PATH} replace />
}

export default function App() {
  const { isAuthenticated } = useContext(AdminContext)

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path={ADMIN_PATH} element={isAuthenticated ? <Navigate to={`${ADMIN_PATH}/dashboard`} /> : <AdminLogin />} />
        <Route path={`${ADMIN_PATH}/dashboard`} element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path={`${ADMIN_PATH}/orders`}    element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
        <Route path={`${ADMIN_PATH}/menu`}      element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
        <Route path={`${ADMIN_PATH}/reviews`}   element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
        <Route path={`${ADMIN_PATH}/security`}  element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
