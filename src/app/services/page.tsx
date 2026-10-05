'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, PROVIDERS, CITIES } from '@/data/mockData';
import ServiceCard from '@/components/common/ServiceCard';
import ProviderCard from '@/components/common/ProviderCard';
import CategoryIcon from '@/components/common/CategoryIcon';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedCity, setSelectedCity] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'experience'>('rating');
  const [activeViewTab, setActiveViewTab] = useState<'categories' | 'providers'>('categories');

  // Filter Categories
  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      const matchSearch =
        !searchTerm ||
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.popularServices.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCat = !selectedCategory || cat.slug === selectedCategory;
      const matchPrice = cat.startingPrice <= maxPrice;

      return matchSearch && matchCat && matchPrice;
    });
  }, [searchTerm, selectedCategory, maxPrice]);

  // Filter Providers
  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter((provider) => {
      const matchSearch =
        !searchTerm ||
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        provider.services.some((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCat = !selectedCategory || provider.categorySlug === selectedCategory;
      const matchCity = !selectedCity || provider.city.toLowerCase() === selectedCity.toLowerCase();
      const matchRating = provider.rating >= minRating;
      const matchPrice = provider.startingPrice <= maxPrice;

      return matchSearch && matchCat && matchCity && matchRating && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedCity, minRating, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCity('');
    setMinRating(0);
    setMaxPrice(20000);
    setSortBy('rating');
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(selectedCategory) ||
    Boolean(selectedCity) ||
    minRating > 0 ||
    maxPrice < 20000;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Explore Our Services
          </h1>
          <p className="text-slate-500 text-sm">
            Browse through 12 verified service categories or discover individual skilled specialists in your local city.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services or skills..."
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="">All 12 Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer font-medium text-slate-700"
              >
                <option value="rating">Sort by: Top Rated ★</option>
                <option value="price-asc">Sort by: Price Low to High</option>
                <option value="price-desc">Sort by: Price High to Low</option>
                <option value="experience">Sort by: Most Experienced</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Price & Rating Slider */}
          <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Rating Radio pills */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Rating:</span>
                {[0, 4.5, 4.8, 4.9].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      minRating === rate
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {rate === 0 ? 'All' : `${rate}★+`}
                  </button>
                ))}
              </div>

              {/* Price Range Slider */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Max Price:</span>
                <input
                  type="range"
                  min={1000}
                  max={25000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-28 sm:w-36 accent-sky-600 cursor-pointer"
                />
                <span className="font-bold text-slate-800">
                  PKR {maxPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 transition-colors self-end md:self-auto cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-2xl">
            <button
              onClick={() => setActiveViewTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeViewTab === 'categories'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Categories ({filteredCategories.length})
            </button>
            <button
              onClick={() => setActiveViewTab('providers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeViewTab === 'providers'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Specialist Providers ({filteredProviders.length})
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:block">
            Showing{' '}
            <strong className="text-slate-800">
              {activeViewTab === 'categories' ? filteredCategories.length : filteredProviders.length}
            </strong>{' '}
            results
          </span>
        </div>

        {/* Content Display */}
        {activeViewTab === 'categories' ? (
          <div>
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category) => (
                  <ServiceCard key={category.id} category={category} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
                <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No categories found</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search keywords or price limit to find available services.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
                <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No professionals found</h3>
                <p className="text-xs text-slate-500">
                  No providers match your exact filters. Try broadening your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading services marketplace...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
