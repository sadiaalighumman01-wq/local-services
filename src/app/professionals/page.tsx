'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROVIDERS, CATEGORIES, CITIES } from '@/data/mockData';
import ProviderCard from '@/components/common/ProviderCard';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  MapPin,
  Star,
  Clock,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';

function ProfessionalsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialLoc = searchParams.get('location') || '';
  const initialCat = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCity, setSelectedCity] = useState(initialLoc);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [minRating, setMinRating] = useState<number>(0);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'today'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'experience'>('rating');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Compute filtered list
  const filtered = useMemo(() => {
    return PROVIDERS.filter((provider) => {
      // Text match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        provider.name.toLowerCase().includes(q) ||
        provider.profession.toLowerCase().includes(q) ||
        provider.category.toLowerCase().includes(q) ||
        provider.skills.some((s) => s.toLowerCase().includes(q)) ||
        provider.services.some((s) => s.name.toLowerCase().includes(q));

      // Category match
      const matchCategory = !selectedCategory || provider.categorySlug === selectedCategory;

      // City match
      const matchCity = !selectedCity || provider.city.toLowerCase() === selectedCity.toLowerCase();

      // Rating match
      const matchRating = provider.rating >= minRating;

      // Experience match
      const matchExperience = provider.experienceYears >= minExperience;

      // Price match
      const matchPrice = provider.startingPrice <= maxPrice;

      // Availability match (e.g. today is available)
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const todayKey = days[new Date().getDay()] as keyof typeof provider.availability;
      const matchAvailability =
        availabilityFilter === 'all' ||
        provider.availability[todayKey] === 'available';

      return (
        matchSearch &&
        matchCategory &&
        matchCity &&
        matchRating &&
        matchExperience &&
        matchPrice &&
        matchAvailability
      );
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedCity,
    minRating,
    minExperience,
    maxPrice,
    availabilityFilter,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedCategory('');
    setMinRating(0);
    setMinExperience(0);
    setMaxPrice(15000);
    setAvailabilityFilter('all');
    setSortBy('rating');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(selectedCity) ||
    Boolean(selectedCategory) ||
    minRating > 0 ||
    minExperience > 0 ||
    maxPrice < 15000 ||
    availabilityFilter !== 'all';

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Find Professionals
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connect with vetted local specialists with transparent PKR rates and genuine customer reviews.
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="flex-1 py-2.5 px-4 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-xs"
            >
              <Filter className="w-4 h-4 text-sky-600" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low-High</option>
              <option value="price-desc">Price: High-Low</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                <span>Filter Experts</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Plumber, wiring, AC..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                City / Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Category / Service Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Service Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Minimum Rating
              </label>
              <div className="space-y-1.5 text-xs">
                {[0, 4.5, 4.8, 4.9].map((score) => (
                  <label
                    key={score}
                    className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={minRating === score}
                      onChange={() => setMinRating(score)}
                      className="accent-sky-600"
                    />
                    <div className="flex items-center gap-1 font-medium">
                      {score === 0 ? (
                        'Any Rating'
                      ) : (
                        <>
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{score} & above</span>
                        </>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Starting Price Max
                </label>
                <span className="text-xs font-bold text-sky-600">
                  PKR {maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={15000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>PKR 1,000</span>
                <span>PKR 15,000</span>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Minimum Experience
              </label>
              <select
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value={0}>Any Experience</option>
                <option value={5}>5+ Years</option>
                <option value={8}>8+ Years</option>
                <option value={10}>10+ Years</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Availability
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAvailabilityFilter('all')}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                    availabilityFilter === 'all'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Days
                </button>
                <button
                  type="button"
                  onClick={() => setAvailabilityFilter('today')}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                    availabilityFilter === 'today'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Available Today
                </button>
              </div>
            </div>
          </aside>

          {/* Main Results Section */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Bar for Results & Sorting */}
            <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Found <strong className="text-slate-900 font-bold text-sm">{filtered.length}</strong>{' '}
                verified professionals
                {selectedCity && <span> in {selectedCity}</span>}
              </div>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="rating">Top Rated ★</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="experience">Years of Experience</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filtered.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
                <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No professionals found</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We couldn’t find any service providers matching your exact criteria. Try changing city, lowering rating requirement, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl hover:bg-sky-700 transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Filter Professionals</h3>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Plumber, electric..."
                className="w-full px-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Minimum Rating</label>
              <div className="flex gap-2 flex-wrap">
                {[0, 4.5, 4.8, 4.9].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      minRating === r ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {r === 0 ? 'All' : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span>Max Starting Price</span>
                <span className="text-sky-600">PKR {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={15000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfessionalsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading professionals directory...</div>}>
      <ProfessionalsContent />
    </Suspense>
  );
}
