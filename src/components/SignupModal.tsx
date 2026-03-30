import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { RadioGroup, RadioGroupItem } from '/components/ui/radio-group';
import { Mail, Lock, User, Star, ShoppingBag, Store } from 'lucide-react';
import { Modal } from './Modal';

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleLogin: () => void;
}

export function SignupModal({ open, onOpenChange, onToggleLogin }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = signup(name, email, password, role);
    
    if (!result.success) {
      setError(result.error || 'Signup failed');
    } else {
      onOpenChange(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
    
    setLoading(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <Star size={20} className="text-white fill-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-slate-400 text-sm">Join RateHub to share your reviews</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">Full Name</Label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pl-10 placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-medium">Email</Label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pl-10 placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-medium">Password</Label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pl-10 placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pl-10 placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white font-medium">I want to...</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="grid grid-cols-2 gap-3">
              <div className="relative">
                <RadioGroupItem value="buyer" id="buyer" className="peer sr-only" />
                <Label
                  htmlFor="buyer"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-600 cursor-pointer transition-all hover:border-slate-500 peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-500/10"
                >
                  <ShoppingBag size={24} className="mb-2 text-slate-400 peer-data-[state=checked]:text-amber-500" />
                  <span className="text-sm font-medium text-slate-300 peer-data-[state=checked]:text-white">Buy & Review</span>
                  <span className="text-xs text-slate-500 mt-1">Browse and rate products</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="seller" id="seller" className="peer sr-only" />
                <Label
                  htmlFor="seller"
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-600 cursor-pointer transition-all hover:border-slate-500 peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-500/10"
                >
                  <Store size={24} className="mb-2 text-slate-400 peer-data-[state=checked]:text-amber-500" />
                  <span className="text-sm font-medium text-slate-300 peer-data-[state=checked]:text-white">Sell Products</span>
                  <span className="text-xs text-slate-500 mt-1">Add products to review</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white h-11 text-base"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleLogin}
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}