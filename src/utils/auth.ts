import { User, UserRole } from '../types';

const USERS_KEY = 'ratehub_users';
const CURRENT_USER_KEY = 'ratehub_current_user';

// Admin credentials
const ADMIN_EMAIL = 'c.magondu.n@gmail.com';
const ADMIN_PASSWORD = '12345';

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function signup(name: string, email: string, password: string, role: UserRole): { success: boolean; error?: string } {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    role,
    isAdmin: role === 'admin',
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  // Check for admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const adminUser: User = {
      id: 'admin',
      name: 'Admin',
      email: ADMIN_EMAIL,
      role: 'admin',
      isAdmin: true,
    };
    setCurrentUser(adminUser);
    return { success: true };
  }

  // Regular user login
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  // In a real app, we'd verify the password hash
  setCurrentUser(user);
  return { success: true };
}

export function logout(): void {
  setCurrentUser(null);
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === 'admin' || false;
}

export function isSeller(): boolean {
  const user = getCurrentUser();
  return user?.role === 'seller' || false;
}

export function canAddProducts(): boolean {
  const user = getCurrentUser();
  return user?.role === 'seller' || user?.role === 'admin' || false;
}