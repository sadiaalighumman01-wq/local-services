import React from 'react';
import Link from 'next/link';
import { ServiceCategory } from '@/types';
import CategoryIcon from './CategoryIcon';
import { ArrowRight, Users } from 'lucide-react';

interface ServiceCardProps {
  category: ServiceCategory;
}

export default function ServiceCard({ category }: ServiceCardProps) {
  return (
    <Link
      href={`/services?category=${category.slug}`}
      className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-sky-50 rounded-bl-full -mr-6 -mt-6 group-hover:scale-125 transition-transform duration-500 opacity-60" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
            <CategoryIcon name={category.iconName} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{category.providerCount} Experts</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
          {category.description}
        </p>

        {/* Popular Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {category.popularServices.slice(0, 2).map((srv, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100 font-medium"
            >
              {srv}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 block">Starting from</span>
          <span className="text-sm font-bold text-slate-900">
            PKR {category.startingPrice.toLocaleString()}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform">
          <span>View Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
