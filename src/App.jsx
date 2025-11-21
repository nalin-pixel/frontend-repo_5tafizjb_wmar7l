import NavBar from './components/NavBar'
import CustomerApp from './components/CustomerApp'
import AdminPanel from './components/AdminPanel'
import SellerApp from './components/SellerApp'
import RiderApp from './components/RiderApp'
import { Link, Routes, Route } from 'react-router-dom'

function Landing(){
  const cards = [
    { title: 'Customer App', to: '/customer', desc: 'Browse, add to cart, checkout, and live-track deliveries.' },
    { title: 'Admin Panel', to: '/admin', desc: 'Manage sellers, riders, stores, inventory, promos and analytics.' },
    { title: 'Seller App', to: '/seller', desc: 'Manage products, stock, and handle orders in real-time.' },
    { title: 'Rider App', to: '/rider', desc: 'Accept jobs, navigate, share live location, and update status.' },
  ]
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">QuickCommerce</h1>
          <p className="text-slate-300">Hyperlocal quick-delivery platform demo</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(c => (
            <Link key={c.title} to={c.to} className="group rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-emerald-500/40 transition-colors">
              <div className="text-lg font-semibold text-white mb-1">{c.title}</div>
              <div className="text-sm text-slate-400">{c.desc}</div>
              <div className="mt-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">Open →</div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/test" className="text-sm text-slate-400 hover:text-white underline">Connection test</Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/customer" element={<CustomerApp />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/seller" element={<SellerApp />} />
        <Route path="/rider" element={<RiderApp />} />
      </Routes>
    </div>
  )
}

export default App
