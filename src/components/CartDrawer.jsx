import { X } from 'lucide-react'

export default function CartDrawer({ open, items, onClose, onCheckout, onRemove }) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return (
    <div className={`fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-slate-300">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-slate-800/50 border border-white/10 rounded-lg p-3">
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-slate-300 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-rose-400 hover:text-rose-300 text-sm">Remove</button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-white mb-3">
            <span>Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 font-semibold">Checkout</button>
        </div>
      </aside>
    </div>
  )
}
