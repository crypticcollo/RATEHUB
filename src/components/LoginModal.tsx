import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { Mail, Lock, Star } from 'lucide-react';
import { Modal } from './Modal';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleSignup: () => void;
}

export function LoginModal({ open, onOpenChange, onToggleSignup }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(email, password);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    } else {
      onOpenChange(false);
      setEmail('');
      setPassword('');
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
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Sign in to RateHub to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

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

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white h-11 text-base"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleSignup}
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}