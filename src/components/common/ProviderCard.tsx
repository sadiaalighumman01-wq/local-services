'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Provider } from '@/types';
import { useApp } from '@/context/AppContext';
import RatingStars from './RatingStars';
import { BadgeCheck, MapPin, Briefcase, Heart, Calendar, ArrowRight } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(provider.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Top Banner & Avatar Header */}
      <div className="relative p-5 pb-0">
        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(provider.id);
          }}
          className={`absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            favorite
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 scale-105'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
          title={favorite ? 'Remove from saved' : 'Save provider'}
          aria-label="Save provider"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
        </button>

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-slate-100 shadow-sm relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {provider.verified && (
              <span
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-md ring-2 ring-white"
                title="Verified Professional"
              >
                <BadgeCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                {provider.category}
              </span>
              {provider.featured && (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Featured
                </span>
              )}
            </div>

            <Link href={`/professionals/${provider.id}`}>
              <h3 className="font-bold text-slate-900 text-lg hover:text-sky-600 transition-colors mt-1.5 truncate">
                {provider.name}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 line-clamp-1">{provider.profession}</p>

            <div className="mt-2">
              <RatingStars
                rating={provider.rating}
                reviewCount={provider.reviewCount}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Specs & Bio */}
      <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
          {provider.bio}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{provider.area}, {provider.city}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{provider.experienceYears}+ years exp</span>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {provider.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-[11px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
            >
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{provider.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Price & Actions */}
      <div className="p-5 pt-3 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-500 block">Starting from</span>
          <div className="text-base font-bold text-slate-900">
            PKR {provider.startingPrice.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/professionals/${provider.id}`}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-white rounded-xl border border-slate-200 transition-all"
          >
            Profile
          </Link>

          <Link
            href={`/book/${provider.id}`}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
