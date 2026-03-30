import { Product } from '../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800 mb-3 ring-1 ring-slate-700 group-hover:ring-amber-500/50 transition-all duration-300">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <span className="text-slate-600 text-4xl font-bold">{product.name.charAt(0)}</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-white text-xs font-semibold">{product.averageRating}</span>
        </div>

        {/* Review Count Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1">
          <span className="text-slate-300 text-xs">
            {product.totalReviews} review{product.totalReviews !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-white font-medium text-sm leading-tight group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-xs mt-1">{product.category}</p>
      </div>
    </div>
  );
}