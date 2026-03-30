import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Tag } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(groupedProducts).sort();

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag size={32} className="text-slate-600" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">No products yet</h3>
        <p className="text-slate-400">Be the first to add a product or service!</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px bg-slate-700 flex-1" />
            <h2 className="text-amber-500 font-semibold text-lg uppercase tracking-wider whitespace-nowrap">
              {category}
            </h2>
            <div className="h-px bg-slate-700 flex-1" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedProducts[category].map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}