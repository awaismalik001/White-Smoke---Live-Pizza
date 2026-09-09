import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { AdminSidebar } from './AdminDashboard'
import { getAdminMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../hooks/useApi'
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const CATEGORIES = ['Pizza (Regular)', 'Pizza (Special)', 'Burgers', 'Rolls', 'Appetizer', 'Pasta', 'Donor & Sandwich', 'Platter', 'Beverages']

const BLANK = { category: 'Burgers', name: '', price: '', available: true }

export default function AdminMenu() {
  const { token }         = useContext(AdminContext)
  const [items, setItems] = useState([])
  const [form, setForm]   = useState(BLANK)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getAdminMenu(token).then(r => setItems(r.data.items || [])).catch(() => toast.error('Failed to load menu.')).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [token])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return toast.error('Name and price are required.')
    try {
      if (editId) {
        await updateMenuItem(editId, form, token)
        toast.success('Item updated.')
        setEditId(null)
      } else {
        await addMenuItem(form, token)
        toast.success('Item added.')
      }
      setForm(BLANK)
      load()
    } catch { toast.error('Failed to save item.') }
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setForm({ category: item.category, name: item.name, price: item.price, available: item.available })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try { await deleteMenuItem(id, token); toast.success('Item deleted.'); load() }
    catch { toast.error('Failed to delete.') }
  }

  const handleToggle = async (item) => {
    try {
      await updateMenuItem(item.id, { ...item, available: !item.available }, token)
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, available: !i.available } : i))
    } catch { toast.error('Failed to toggle.') }
  }

  return (
    <div className="flex min-h-screen bg-brand-dark text-brand-white">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-bebas text-4xl tracking-[3px]">Menu Manager</h1>
          <p className="text-brand-white/40 text-sm mt-1">{items.length} menu items</p>
        </div>

        {/* Add / Edit Form */}
        <div className="bg-brand-card border border-brand-border rounded-sm p-6 mb-8">
          <h2 className="font-bebas text-xl tracking-[2px] text-brand-red mb-4">
            {editId ? '✏️ Edit Item' : '➕ Add New Item'}
          </h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-brand-white/50 text-xs tracking-[2px] uppercase block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 text-sm text-brand-white rounded-sm focus:outline-none focus:border-brand-red">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-brand-white/50 text-xs tracking-[2px] uppercase block mb-1">Item Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Item name" required
                className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="text-brand-white/50 text-xs tracking-[2px] uppercase block mb-1">Price</label>
              <input value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. 450 or S:500/M:1050" required
                className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 text-sm text-brand-white placeholder-brand-white/30 rounded-sm focus:outline-none focus:border-brand-red" />
            </div>
            <div className="flex gap-2">
              <button type="submit"
                className="flex-1 bg-brand-red hover:bg-brand-red2 text-white font-bold text-xs tracking-[2px] uppercase py-2.5 px-4 rounded-sm transition-colors flex items-center justify-center gap-2">
                {editId ? <><FiCheck /> Update</> : <><FiPlus /> Add</>}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setForm(BLANK) }}
                  className="border border-brand-border text-brand-white/50 hover:text-brand-red px-3 py-2.5 rounded-sm transition-colors">
                  <FiX />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-brand-card border border-brand-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border text-brand-white/40 text-xs tracking-[2px] uppercase">
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Available</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? <tr><td colSpan={5} className="p-8 text-center text-brand-white/30">Loading...</td></tr>
                  : items.map(item => (
                    <tr key={item.id} className="border-b border-brand-border/50 hover:bg-brand-border/20 transition-colors">
                      <td className="p-4 text-brand-red text-xs font-bold tracking-[1px] uppercase">{item.category}</td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 text-brand-gold">Rs.{item.price}</td>
                      <td className="p-4">
                        <button onClick={() => handleToggle(item)}
                          className={`w-10 h-5 rounded-full transition-colors relative ${item.available ? 'bg-green-500' : 'bg-brand-border'}`}>
                          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow ${item.available ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(item)} className="text-brand-white/50 hover:text-brand-gold transition-colors p-1"><FiEdit2 /></button>
                          <button onClick={() => handleDelete(item.id)} className="text-brand-white/50 hover:text-brand-red transition-colors p-1"><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
