import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ rating, onRatingChange, readonly = false, size = 20 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          className={`transition-transform hover:scale-110 ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            className={
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-amber-400'
            }
          />
        </button>
      ))}
    </div>
  );
}