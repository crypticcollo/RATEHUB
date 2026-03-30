import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from './ToastProvider';
import { Modal } from './Modal';
import { Button } from '/components/ui/button';
import { Textarea } from '/components/ui/textarea';
import { Label } from '/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '/components/ui/select';
import { Star } from 'lucide-react';

interface ReviewFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: any[];
  onSubmitReview: (productId: string, rating: number, comment: string) => void;
}

export function ReviewFormModal({ open, onOpenChange, products, onSubmitReview }: ReviewFormModalProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (!selectedProductId) {
      showToast('Please select a product or service', 'error');
      return;
    }
    if (rating === 0) {
      showToast('Please select a star rating', 'error');
      return;
    }
    if (!comment.trim()) {
      showToast('Please write a review', 'error');
      return;
    }

    onSubmitReview(selectedProductId, rating, comment.trim());
    showToast('Review submitted successfully!', 'success');
    
    // Reset form
    setSelectedProductId('');
    setRating(0);
    setComment('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedProductId('');
    setRating(0);
    setComment('');
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={handleCancel}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Write a Review</h2>
          <p className="text-slate-400 text-sm">
            {user ? `Posting as ${user.name}` : 'Posting as Anonymous'}
          </p>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="product" className="text-white font-medium">
              Product or Service *
            </Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select a product..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id} className="text-white focus:bg-slate-700">
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={
                      star <= (hoveredRating || rating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-600'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-white font-medium">
              Your Review *
            </Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this product or service..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={4}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
            />
            <p className="text-xs text-slate-500 text-right">{comment.length}/500</p>
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
            Submit Review
          </Button>
        </div>
      </div>
    </Modal>
  );
}