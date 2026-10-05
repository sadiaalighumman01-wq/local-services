import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  reviewCount?: number;
}

export default function RatingStars({
  rating,
  max = 5,
  size = 'md',
  showScore = true,
  reviewCount,
}: RatingStarsProps) {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;

  for (let i = 1; i <= max; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star
          key={i}
          className={`${iconSizes[size]} fill-amber-400 text-amber-400`}
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className={`${iconSizes[size]} fill-amber-400 text-amber-400`}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`${iconSizes[size]} text-slate-300`}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showScore && (
        <span className={`font-semibold text-slate-800 ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-slate-500 font-normal">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
