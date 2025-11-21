import { useEffect, useMemo, useState } from 'react'
import { Search, Clock, MapPin, Plus, Minus } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function CustomerApp() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [address, setAddress] = useState('')
  const [order, setOrder] = useState(null)

  const subtotal = useMemo(() => Object.values(cart).reduce((s, it) => s + it.price * it.qty, 0), [cart])

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API}/api/products?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`, { signal: controller.signal })
      .then(r => r.json())
      .then(setProducts)
      .catch(() => {})
    return () => controller.abort()
  }, [q, category])

  const addToCart = (p) => setCart(prev => ({ ...prev, [p.id]: { ...p, qty: (prev[p.id]?.qty || 0) + 1 } }))
  const decFromCart = (p) => setCart(prev => {
    const qty = (prev[p.id]?.qty || 0) - 1
    const n = { ...prev }
    if (qty <= 0) delete n[p.id]
    else n[p.id].qty = qty
    return n
  })

  const checkout = async () => {
    const items = Object.values(cart).map(it => ({ product_id: it.id, quantity: it.qty }))
    const res = await fetch(`${API}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address, items, payment_method: 'COD', delivery_window_minutes: 20 }) })
    const data = await res.json()
    setOrder(data)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 mb-4">
              <Search className="text-slate-400" size={18} />
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search groceries..." className="bg-transparent outline-none flex-1" />
              <Clock size={18} className="text-emerald-400" />
              <span className="text-xs text-emerald-400">10-20 min</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="aspect-[4/3] bg-slate-800">
                    {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-3">
                    <div className="text-sm text-slate-300">{p.category}</div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-emerald-400">${p.price.toFixed(2)}</div>
                    <div className="text-xs text-slate-400 mb-2">In stock: {p.stock}</div>
                    <div className="flex items-center gap-2">
                      {cart[p.id]?.qty ? (
                        <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1">
                          <button onClick={() => decFromCart(p)} className="p-1 hover:text-emerald-400"><Minus size={16} /></button>
                          <span className="text-sm w-6 text-center">{cart[p.id].qty}</span>
                          <button onClick={() => addToCart(p)} className="p-1 hover:text-emerald-400"><Plus size={16} /></button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(p)} className="text-sm px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">Add</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-80">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sticky top-24">
              <div className="font-semibold mb-2">Delivery</div>
              <div className="flex items-center gap-2 mb-3 text-sm">
                <MapPin size={16} className="text-slate-400" />
                <input value={address} onChange={(e)=>setAddress(e.target.value)} className="bg-slate-800 border border-slate-700 rounded px-2 py-1 w-full" placeholder="Address" />
              </div>
              <div className="font-semibold mb-2">Cart</div>
              <div className="space-y-2 max-h-64 overflow-auto pr-1">
                {Object.values(cart).length === 0 && <div className="text-sm text-slate-400">Your cart is empty</div>}
                {Object.values(cart).map(it => (
                  <div key={it.id} className="flex items-center justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium">{it.name}</div>
                      <div className="text-slate-400">{it.qty} x ${it.price.toFixed(2)}</div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1">
                      <button onClick={() => decFromCart(it)} className="p-1 hover:text-emerald-400"><Minus size={16} /></button>
                      <span className="text-sm w-6 text-center">{it.qty}</span>
                      <button onClick={() => addToCart(it)} className="p-1 hover:text-emerald-400"><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-800 my-3"></div>
              <div className="flex items-center justify-between"><span className="text-slate-400">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
              <button onClick={checkout} className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2 rounded-lg">Checkout</button>
              {order && (
                <div className="mt-3 text-sm text-emerald-400">Order placed! ID: {order.order_id || order?.id}. ETA ~ 10-20 mins.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
