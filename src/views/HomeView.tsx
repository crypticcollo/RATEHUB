import { Product } from '../types';
import { ProductList } from '../components/ProductList';
import { Search, TrendingUp, ShieldCheck } from 'lucide-react';
import { Input } from '/components/ui/input';

interface HomeViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function HomeView({ products, onProductClick }: HomeViewProps) {
  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover & Review the <span className="text-amber-400">Best</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users sharing authentic experiences on products and services. 
            Make informed decisions with RateHub.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              placeholder="Search for products, services, or categories..." 
              className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <TrendingUp className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Real Reviews</h3>
                <p className="text-sm text-slate-600">Authentic feedback from real users like you.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Trusted Platform</h3>
                <p className="text-sm text-slate-600">Verified accounts and moderated content.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Search className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Easy Discovery</h3>
                <p className="text-sm text-slate-600">Find exactly what you're looking for quickly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore Categories</h2>
          <p className="text-slate-600">Browse our curated collection of products and services</p>
        </div>
        
        <ProductList products={products} onProductClick={onProductClick} />
      </div>
    </div>
  );
}