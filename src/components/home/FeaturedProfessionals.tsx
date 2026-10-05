import React from 'react';
import Link from 'next/link';
import { PROVIDERS } from '@/data/mockData';
import ProviderCard from '@/components/common/ProviderCard';
import { ArrowRight, Award } from 'lucide-react';

export default function FeaturedProfessionals() {
  // Show top featured professionals
  const featured = PROVIDERS.slice(0, 6);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Top Rated In Pakistan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Professionals
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Meet our highest-rated local experts, verified for safety, background checks, and exceptional workmanship.
            </p>
          </div>

          <Link
            href="/professionals"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group"
          >
            <span>Explore All 20+ Experts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid of Providers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </section>
  );
}
