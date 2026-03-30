import { ReactNode } from 'react';
import { View } from '../types';
import { Star, Home, User, Plus, LogOut, Package } from 'lucide-react';
import { Button } from '/components/ui/button';
import { Avatar, AvatarFallback } from '/components/ui/avatar';

interface MainLayoutProps {
  children: ReactNode;
  currentView: View;
  user: any;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  onAddReviewClick: () => void;
  showAddButton?: boolean;
}

export function MainLayout({ 
  children, 
  currentView, 
  user, 
  onNavigate, 
  onLogout,
  onAddReviewClick,
  showAddButton = true 
}: MainLayoutProps) {
  const navItems = [
    { id: 'home' as View, label: 'Browse', icon: Home },
    { id: 'profile' as View, label: 'Profile', icon: User, requiresAuth: true },
    { id: 'add-product' as View, label: 'Add Product', icon: Package, requiresSeller: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="bg-amber-500 rounded-lg p-1.5">
                <Star size={20} className="text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">RateHub</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                if (item.requiresAuth && !user) return null;
                if (item.requiresSeller && user?.role !== 'seller' && user?.role !== 'admin') return null;
                
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-amber-50 text-amber-700' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-slate-100">
                      <AvatarFallback className="text-amber-600 font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="text-slate-600 hover:text-red-600"
                  >
                    <LogOut size={18} className="mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('login')}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => onNavigate('signup')}
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-slate-600 text-sm">© 2024 RateHub. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-700">About</a>
              <a href="#" className="hover:text-slate-700">Privacy</a>
              <a href="#" className="hover:text-slate-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      {showAddButton && (
        <Button
          onClick={onAddReviewClick}
          size="lg"
          className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all rounded-full h-14 w-14 p-0 z-50"
          aria-label="Add a review"
        >
          <Plus size={24} />
        </Button>
      )}
    </div>
  );
}