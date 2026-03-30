import { useState } from 'react';
import { useToast } from '../components/ToastProvider';
import { Button } from '/components/ui/button';
import { Input } from '/components/ui/input';
import { Label } from '/components/ui/label';
import { Textarea } from '/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '/components/ui/card';
import { Package, Plus, Image as ImageIcon, ArrowLeft } from 'lucide-react';

interface AddProductViewProps {
  onAddProduct: (name: string, category: string, description: string, image?: string) => void;
  onCancel: () => void;
}

export function AddProductView({ onAddProduct, onCancel }: AddProductViewProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const { showToast } = useToast();

  const handleSubmit = () => {
    if (!name.trim() || !category.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    onAddProduct(name.trim(), category.trim(), description.trim(), image.trim() || undefined);
    showToast('Product added successfully!', 'success');
    
    // Reset form
    setName('');
    setCategory('');
    setDescription('');
    setImage('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Cancel</span>
        </button>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Product</h1>
        <p className="text-slate-600">List a new product or service for the community to review</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="text-amber-500" size={24} />
            Product Details
          </CardTitle>
          <CardDescription>
            Fill in the information below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName">Product/Service Name *</Label>
            <Input
              id="productName"
              type="text"
              placeholder="e.g., Sony WH-1000XM5 Headphones"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Electronics"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the product or service..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="flex items-center gap-2">
              <ImageIcon size={14} />
              Image URL (Optional)
            </Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p className="text-xs text-slate-500">Leave empty to use a default placeholder</p>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
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
        </CardContent>
      </Card>
    </div>
  );
}