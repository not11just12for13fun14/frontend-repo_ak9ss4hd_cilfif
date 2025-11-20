import { Star } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/40 border border-white/10 rounded-2xl overflow-hidden shadow hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
      <div className="aspect-video overflow-hidden bg-slate-900">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white font-semibold truncate mr-2">{product.name}</h3>
          <div className="flex items-center gap-1 text-yellow-300">
            <Star className="w-4 h-4 fill-yellow-300" />
            <span className="text-sm">{product.rating ?? 4.5}</span>
          </div>
        </div>
        <p className="text-slate-300/80 text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-300 font-bold">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
