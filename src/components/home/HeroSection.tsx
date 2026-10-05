'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CITIES } from '@/data/mockData';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const { setSearchQuery, setSearchLocation } = useApp();
  const [serviceTerm, setServiceTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(serviceTerm);
    setSearchLocation(selectedCity);

    const params = new URLSearchParams();
    if (serviceTerm) params.set('q', serviceTerm);
    if (selectedCity) params.set('location', selectedCity);

    router.push(`/professionals?${params.toString()}`);
  };

  const quickPills = [
    { label: 'Plumber', query: 'Plumbing' },
    { label: 'Electrician', query: 'Electrical' },
    { label: 'AC Repair', query: 'AC Repair' },
    { label: 'Graphic Designer', query: 'Graphic Design' },
    { label: 'Deep Cleaning', query: 'Cleaning' },
    { label: 'Math Tutor', query: 'Tutoring' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/60">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-sky-200/30 to-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text & Search Form */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold border border-sky-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Pakistan’s #1 Local Services Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Find Trusted <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600">
                Professionals
              </span>{' '}
              Near You
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Book reliable local experts for your everyday services — quickly, easily and securely. Verified plumbers, electricians, AC technicians and designers at transparent PKR prices.
            </p>

            {/* Search Box Card */}
            <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-200/80 max-w-2xl mx-auto lg:mx-0">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5">
                {/* Service Search */}
                <div className="flex-1 relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 shrink-0" />
                  <input
                    type="text"
                    value={serviceTerm}
                    onChange={(e) => setServiceTerm(e.target.value)}
                    placeholder="Plumber, electrician, designer…"
                    className="w-full pl-11 pr-3 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-sm text-slate-900 placeholder-slate-400 border border-transparent focus:border-sky-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Location Search Dropdown */}
                <div className="sm:w-48 relative flex items-center">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 shrink-0 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-11 pr-8 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-sm text-slate-900 border border-transparent focus:border-sky-500 focus:outline-none appearance-none cursor-pointer transition-all"
                  >
                    <option value="">All Cities</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-md shadow-sky-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Pills */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs text-slate-500 justify-center sm:justify-start">
                <span className="font-medium text-slate-400">Popular:</span>
                {quickPills.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => {
                      setServiceTerm(pill.query);
                      setSearchQuery(pill.query);
                      router.push(`/professionals?q=${encodeURIComponent(pill.query)}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-sky-50 hover:text-sky-600 text-slate-600 transition-colors font-medium text-[11px]"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-2 flex items-center gap-6 sm:gap-8 justify-center lg:justify-start text-left">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">100% Verified</div>
                  <div className="text-xs text-slate-500">ID & Skill Checked</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">4.9 / 5 Rating</div>
                  <div className="text-xs text-slate-500">From 25,000+ Reviews</div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">10,000+ Pros</div>
                  <div className="text-xs text-slate-500">Across 9 Cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition / Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                  alt="ServiceHub Professional at Work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/90 text-[11px] font-bold uppercase tracking-wider mb-1">
                    Featured Pro of the Week
                  </span>
                  <h3 className="text-lg font-bold">Ali Raza — Licensed Electrician</h3>
                  <p className="text-xs text-slate-200">Islamabad • 4.8 ★ (118 reviews) • From PKR 1,500</p>
                </div>
              </div>

              {/* Floating Card 1: Verified Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 fill-emerald-500 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Verified Expert</div>
                  <div className="text-[11px] text-slate-500">Background Checked</div>
                </div>
              </div>

              {/* Floating Card 2: Instant Booking */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-pulse [animation-duration:3s]">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">
                  ⚡ 2m
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Instant Booking</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Available Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
