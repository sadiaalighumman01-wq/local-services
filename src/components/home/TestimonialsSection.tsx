import React from 'react';
import { TESTIMONIALS } from '@/data/mockData';
import RatingStars from '@/components/common/RatingStars';
import { Quote, MessageSquareHeart } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Loved by Thousands of Customers
          </h2>
          <p className="text-slate-500 text-sm">
            Read authentic feedback from families and business owners across Pakistan who trust ServiceHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <RatingStars rating={t.rating} size="sm" showScore={false} />
                  <Quote className="w-5 h-5 text-slate-300" />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.city} • {t.serviceTaken}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
