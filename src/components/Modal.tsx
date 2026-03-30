import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '/components/ui/button';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onOpenChange, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-white hover:bg-slate-700 z-10"
        >
          <X size={20} />
        </Button>
        {children}
      </div>
    </div>
  );
}