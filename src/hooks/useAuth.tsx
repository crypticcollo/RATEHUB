import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { getCurrentUser, login, signup, logout, isAdmin, isSeller, canAddProducts } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    const result = login(email, password);
    if (result.success) {
      setUser(getCurrentUser());
    }
    return result;
  };

  const handleSignup = (name: string, email: string, password: string, role: UserRole) => {
    const result = signup(name, email, password, role);
    if (result.success) {
      setUser(getCurrentUser());
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAdmin: isAdmin(),
    isSeller: isSeller(),
    canAddProducts: canAddProducts(),
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };
}