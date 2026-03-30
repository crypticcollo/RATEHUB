import { useState } from 'react';
import { useToast } from './ToastProvider';
import { Modal } from './Modal';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { Package, Plus, Image as ImageIcon } from 'lucide-react';

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (name: string, category: string, image?: string) => void;
}

export function AddProductModal({ open, onOpenChange, onAddProduct }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const { showToast } = useToast();

  const handleSubmit = () => {
    if (!name.trim() || !category.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    onAddProduct(name.trim(), category.trim(), image.trim() || undefined);
    showToast('Product added successfully!', 'success');
    
    // Reset form
    setName('');
    setCategory('');
    setImage('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName('');
    setCategory('');
    setImage('');
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={handleCancel}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <Package size={20} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Add New Product</h2>
            <p className="text-slate-400 text-sm">Add a product or service to be reviewed</p>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-white font-medium">
              Product/Service Name *
            </Label>
            <Input
              id="productName"
              type="text"
              placeholder="e.g., Wireless Headphones"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-medium">
              Category *
            </Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Electronics"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-white font-medium flex items-center gap-2">
              <ImageIcon size={14} />
              Image URL (Optional)
            </Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
            <p className="text-xs text-slate-500">Leave empty to use a default placeholder</p>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>
    </Modal>
  );
}