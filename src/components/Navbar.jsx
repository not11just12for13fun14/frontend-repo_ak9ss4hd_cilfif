import { ShoppingCart, Sparkles, Menu } from 'lucide-react'

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <span className="text-lg font-semibold">Festive Crackers</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 text-white/80 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <button onClick={onCartClick} className="relative inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
