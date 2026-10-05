import React from 'react';
import { Review } from '@/types';
import RatingStars from './RatingStars';
import { CheckCircle, MapPin, Quote } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={review.customerAvatar}
              alt={review.customerName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-semibold text-slate-900 text-sm">{review.customerName}</h4>
                <span title="Verified Customer">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{review.customerCity}</span>
                <span>•</span>
                <span>{review.date}</span>
              </div>
            </div>
          </div>

          <RatingStars rating={review.rating} size="sm" showScore={false} />
        </div>

        <span className="inline-block text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full mb-3">
          {review.serviceName}
        </span>

        <p className="text-xs text-slate-600 leading-relaxed italic relative pl-3 border-l-2 border-sky-400">
          "{review.comment}"
        </p>
      </div>
    </div>
  );
}
