import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = category === 'all' ? `${baseUrl}/api/crackers` : `${baseUrl}/api/crackers?category=${encodeURIComponent(category)}`
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category))
    return ['all', ...Array.from(cats)]
  }, [products])

  const addToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id)
      if (existing) {
        return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const checkout = async () => {
    if (cart.length === 0) return
    const order = {
      items: cart.map(i => ({ product_id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      customer: {
        name: 'Guest Customer',
        email: 'guest@example.com',
        address: 'N/A',
        city: 'N/A',
        pincode: '000000'
      },
      total_amount: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      status: 'pending'
    }
    try {
      const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
      const data = await res.json()
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Failed to place order')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Navbar cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onCartClick={() => setCartOpen(true)} />

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Festive Crackers Catalog</h1>
          <p className="text-slate-300 mt-3">Browse premium sparklers, rockets, fountains and more.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-center mb-8">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${category === c ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-200 border-white/10 hover:border-white/30'}`}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-slate-300">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={checkout} onRemove={removeFromCart} />

      <footer className="py-10 text-center text-slate-400 border-t border-white/10">
        <p>Safe and responsible celebration. Follow local laws and guidelines.</p>
      </footer>
    </div>
  )
}

export default App
