import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Product, SortOption } from '../types';
import { sortReviews } from '../utils/reviews';
import { StarRating } from '../components/StarRating';
import { ArrowLeft, Star, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '/components/ui/button';
import { Card, CardContent } from '/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '/components/ui/select';

interface ProductDetailViewProps {
  product: Product | null;
  onBack: () => void;
  onAddReview: () => void;
}

export function ProductDetailView({ product, onBack, onAddReview }: ProductDetailViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  if (!product) return null;

  const sortedReviews = sortReviews(product.reviews, sortBy);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Browse</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-gray-200">
              <CardContent className="p-6">
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 mb-6">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-slate-300">{product.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h1>
                  <p className="text-slate-600 text-sm">
                    {product.totalReviews} review{product.totalReviews !== 1 ? 's' : ''} • Community rated
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star size={32} className="text-amber-500 fill-amber-500" />
                    <span className="text-4xl font-bold text-slate-900">{product.averageRating}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">out of 5 stars</p>
                  <Button 
                    onClick={onAddReview}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Write a Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Reviews */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare size={24} className="text-slate-400" />
                  Reviews ({product.totalReviews})
                </h2>
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {sortedReviews.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <MessageSquare size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No reviews yet</h3>
                  <p className="text-slate-600 mb-6">Be the first to share your experience!</p>
                  <Button onClick={onAddReview} variant="outline">
                    Write the First Review
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <Card key={review.id} className="border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{review.userName}</p>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar size={12} />
                              {formatDistanceToNow(review.date, { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                        <StarRating rating={review.rating} readonly size={16} />
                      </div>
                      <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}