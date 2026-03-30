import { useEffect } from 'react';
import { X } from 'lucide-react';

interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function CustomModal({ open, onOpenChange, children, className = "" }: CustomModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={`relative z-50 w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-hidden flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full p-1 transition-colors"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}