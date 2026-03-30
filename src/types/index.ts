export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'buyer' | 'seller' | 'admin';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: Date;
  userId?: string;
  userName: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export type SortOption = 'newest' | 'highest' | 'lowest';
export type View = 'home' | 'login' | 'signup' | 'product' | 'profile' | 'add-product';