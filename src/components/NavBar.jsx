import { ShoppingCart, User, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 backdrop-blur bg-slate-900/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="font-semibold text-white">QuickCommerce</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link className="text-slate-300 hover:text-white" to="/customer">Customer</Link>
          <Link className="text-slate-300 hover:text-white" to="/seller">Seller</Link>
          <Link className="text-slate-300 hover:text-white" to="/rider">Rider</Link>
          <Link className="text-slate-300 hover:text-white" to="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="text-slate-200 hover:text-white"><ShoppingCart size={20} /></Link>
          <Link to="/profile" className="text-slate-200 hover:text-white"><User size={20} /></Link>
          <button className="text-slate-200 hover:text-white sm:hidden"><Menu size={20} /></button>
        </div>
      </div>
    </header>
  )
}
