import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
}

let toastCount = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, description?: string) => {
    const id = `toast-${toastCount++}`;
    const newToast = { id, title, description };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toasts, addToast };
}

export function CustomToast({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 min-w-[300px] animate-in slide-in-from-right duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check size={12} className="text-green-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{toast.title}</p>
            {toast.description && (
              <p className="text-xs text-slate-400 mt-1">{toast.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}