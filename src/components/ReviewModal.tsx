import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Product, SortOption } from '../types';
import { sortReviews } from '../utils/reviews';
import { StarRating } from './StarRating';
import { Modal } from './Modal';
import { Button } from '/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '/components/ui/select';
import { Card, CardContent } from '/components/ui/card';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ReviewModal({ open, onOpenChange, product }: ReviewModalProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  if (!product) return null;

  const sortedReviews = sortReviews(product.reviews, sortBy);

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-700 mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">{product.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full text-xs font-medium">
                {product.category}
              </span>
              <span className="text-slate-400 text-sm">
                {product.totalReviews} review{product.totalReviews !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center bg-slate-700 rounded-xl px-4 py-2">
            <span className="text-3xl font-bold text-white">{product.averageRating}</span>
            <StarRating rating={product.averageRating} readonly size={14} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2 mb-4">
          <h3 className="font-semibold text-white">All Reviews</h3>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="max-h-[60vh] overflow-y-auto -mx-2 px-2">
          {sortedReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedReviews.map((review) => (
                <Card key={review.id} className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-slate-300">A</span>
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">Anonymous</p>
                          <p className="text-xs text-slate-400">
                            {formatDistanceToNow(review.date, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} readonly size={14} />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}