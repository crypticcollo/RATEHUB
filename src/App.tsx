import { useState } from 'react';
import { Product } from './types';
import { initialProducts, addReview, deleteReview, updateUserNameAcrossReviews } from './utils/reviews';
import { ProductList } from './components/ProductList';
import { ReviewModal } from './components/ReviewModal';
import { ReviewFormModal } from './components/ReviewFormModal';
import { AddProductModal } from './components/AddProductModal';
import { LoginModal } from './components/LoginModal';
import { SignupModal } from './components/SignupModal';
import { ProfileModal } from './components/ProfileModal';
import { ToastProvider } from './components/ToastProvider';
import { useAuth } from './hooks/useAuth';
import { Plus, LogOut, Star, Shield, Store, ShoppingBag, Package } from 'lucide-react';
import { Button } from '/components/ui/button';
import { Avatar, AvatarFallback } from '/components/ui/avatar';

function App() {
  const { user, loading, isAdmin, isSeller, canAddProducts, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSubmitReview = (productId: string, rating: number, comment: string) => {
    setProducts(addReview(products, productId, rating, comment, user || undefined));
  };

  const handleDeleteReview = (productId: string, reviewId: string) => {
    setProducts(deleteReview(products, productId, reviewId));
  };

  const handleUpdateUserName = (newName: string) => {
    if (user) {
      setProducts(updateUserNameAcrossReviews(products, user.id, newName));
      // Note: In a real app, you'd also update the user in your auth context/state
      // For this demo, we'll assume the auth context handles the name update separately
      // or we'd need to pass a setUser callback here.
    }
  };

  const handleAddProduct = (name: string, category: string, image?: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      category,
      image,
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
    setProducts([newProduct, ...products]);
  };

  const handleAddReviewClick = () => {
    setIsReviewFormOpen(true);
  };

  const handleAddProductClick = () => {
    if (!user) {
      setIsLoginOpen(true);
    } else {
      setIsAddProductOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 rounded-xl mb-4 animate-pulse">
            <Star size={24} className="text-white fill-white" />
          </div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-900">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 rounded-xl p-2">
                  <StarIcon className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">RateHub</h1>
                  {user && (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-slate-400">Welcome, {user.name}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs font-medium">
                          <Shield size={10} />
                          Admin
                        </span>
                      )}
                      {isSeller && (
                        <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-medium">
                          <Store size={10} />
                          Seller
                        </span>
                      )}
                      {user.role === 'buyer' && (
                        <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs font-medium">
                          <ShoppingBag size={10} />
                          Buyer
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Auth Buttons or User Profile */}
              {!user ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsLoginOpen(true)}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {canAddProducts && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAddProductClick}
                      className="text-slate-400 hover:text-white hover:bg-slate-700 hidden sm:flex"
                    >
                      <Package size={18} className="mr-2" />
                      Add Product
                    </Button>
                  )}
                  <div className="flex items-center gap-3 border-l border-slate-700 pl-3">
                    <button 
                      onClick={() => setIsProfileOpen(true)}
                      className="flex items-center gap-2 hover:bg-slate-700 rounded-full p-1 transition-colors"
                    >
                      <Avatar className="h-8 w-8 bg-slate-700">
                        <AvatarFallback className="text-amber-500 font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <LogOut size={18} className="mr-2" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Welcome Banner for Guests */}
          {!user && (
            <div className="mb-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-amber-400 font-semibold text-xl mb-2">Welcome to RateHub</h3>
                  <p className="text-slate-400 text-sm max-w-lg">
                    Browse authentic reviews for products and services across various categories. Sign up to manage your profile and track your reviews!
                  </p>
                </div>
                <div className="hidden sm:block">
                  <Star size={48} className="text-amber-500/20" />
                </div>
              </div>
            </div>
          )}

          {/* Seller Dashboard Banner */}
          {(isAdmin || isSeller) && (
            <div className="mb-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Store size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-green-400 font-semibold">Seller Dashboard</h3>
                  <p className="text-slate-400 text-sm">You can add new products and services for customers to review</p>
                </div>
              </div>
            </div>
          )}

          {/* Admin Dashboard Banner */}
          {isAdmin && (
            <div className="mb-8 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-purple-400 font-semibold">Admin Dashboard</h3>
                  <p className="text-slate-400 text-sm">You have full access to manage reviews and products</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              Browse by Category
            </h2>
            <p className="text-sm text-slate-400">
              Discover what others are saying about products and services
            </p>
          </div>

          <ProductList products={products} onProductClick={handleProductClick} />
        </main>

        {/* Floating Add Review Button */}
        <Button
          onClick={handleAddReviewClick}
          size="lg"
          className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all rounded-full h-14 w-14 p-0 z-20"
          aria-label="Add a review"
        >
          <Plus size={24} />
        </Button>

        {/* Modals */}
        <ReviewModal
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
          product={selectedProduct}
        />

        <ReviewFormModal
          open={isReviewFormOpen}
          onOpenChange={setIsReviewFormOpen}
          products={products}
          onSubmitReview={handleSubmitReview}
        />

        <AddProductModal
          open={isAddProductOpen}
          onOpenChange={setIsAddProductOpen}
          onAddProduct={handleAddProduct}
        />

        <ProfileModal
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
          products={products}
          onDeleteReview={handleDeleteReview}
          onUpdateUserName={handleUpdateUserName}
        />

        <LoginModal 
          open={isLoginOpen} 
          onOpenChange={setIsLoginOpen}
          onToggleSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
        />

        <SignupModal 
          open={isSignupOpen} 
          onOpenChange={setIsSignupOpen}
          onToggleLogin={() => {
            setIsSignupOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </div>
    </ToastProvider>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

export default App;