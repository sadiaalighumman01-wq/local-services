import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/mockData';
import ServiceCard from '@/components/common/ServiceCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function PopularServices() {
  // 8 popular categories requested explicitly in Section 1
  const targetCategorySlugs = [
    'plumbing',
    'electrical',
    'graphic-design',
    'web-development',
    'cleaning',
    'carpentry',
    'ac-repair',
    'tutoring',
  ];

  const popular = CATEGORIES.filter((cat) => targetCategorySlugs.includes(cat.slug));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Popular Services
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Choose from our most requested home improvement, digital, and maintenance services delivered by verified professionals.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group"
          >
            <span>View All 12 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Popular Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((category) => (
            <ServiceCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
