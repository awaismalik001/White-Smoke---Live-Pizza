import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AdminProvider } from './context/AdminContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#111', color: '#f0f0f0', border: '1px solid #1e1e1e' },
            success: { iconTheme: { primary: '#e50000', secondary: '#f0f0f0' } },
          }}
        />
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
)