'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { PROVIDERS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import RatingStars from '@/components/common/RatingStars';
import ReviewCard from '@/components/common/ReviewCard';
import {
  BadgeCheck,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Phone,
  Mail,
  Heart,
  Share2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  X,
  Star,
} from 'lucide-react';

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = (params?.id as string) || '';

  const { isFavorite, toggleFavorite, showToast, reviews, addReview, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'reviews' | 'availability'>('services');
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState<string | null>(null);

  // Review Modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewService, setNewReviewService] = useState('');

  const provider = PROVIDERS.find((p) => p.id === providerId || p.slug === providerId) || PROVIDERS[0];
  const providerReviews = reviews.filter((r) => r.providerId === provider.id);
  const favorite = isFavorite(provider.id);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied!', 'Provider profile link copied to clipboard.', 'success');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment) return;

    addReview({
      providerId: provider.id,
      customerName: currentUser.name || 'Zubair Tariq',
      customerAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      customerCity: currentUser.city || 'Lahore',
      rating: newReviewRating,
      comment: newReviewComment,
      serviceName: newReviewService || provider.services[0]?.name || 'Professional Service',
    });

    setReviewModalOpen(false);
    setNewReviewComment('');
  };

  const daysOrder: (keyof typeof provider.availability)[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/professionals" className="hover:text-slate-900 transition-colors">Find Professionals</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate">{provider.name}</span>
        </nav>

        {/* Top Profile Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Cover Header Banner */}
          <div className="h-44 sm:h-56 bg-gradient-to-r from-sky-900 via-slate-800 to-slate-900 relative">
            {provider.coverImage && (
              <img
                src={provider.coverImage}
                alt={provider.name}
                className="w-full h-full object-cover opacity-35"
              />
            )}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(provider.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                  favorite ? 'bg-rose-50 text-rose-600' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={favorite ? 'Remove from saved' : 'Save provider'}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all"
                title="Share profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Meta Area */}
          <div className="px-6 pb-8 pt-0 relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              {/* Avatar + Main Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                <div className="relative">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl bg-slate-100">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {provider.verified && (
                    <span
                      className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1.5 shadow-md ring-2 ring-white"
                      title="Verified Professional"
                    >
                      <BadgeCheck className="w-5 h-5" />
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                      {provider.category}
                    </span>
                    {provider.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ID Verified
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {provider.name}
                  </h1>

                  <p className="text-sm font-medium text-slate-500">{provider.profession}</p>

                  <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start text-xs pt-1">
                    <RatingStars
                      rating={provider.rating}
                      reviewCount={providerReviews.length || provider.reviewCount}
                      size="md"
                    />

                    <span className="text-slate-300">•</span>

                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {provider.area}, {provider.city}
                    </span>

                    <span className="text-slate-300">•</span>

                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {provider.experienceYears}+ years experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Starting Price */}
              <div className="flex items-center justify-between sm:justify-end gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Starting from</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    PKR {provider.startingPrice.toLocaleString()}
                  </div>
                </div>

                <Link
                  href={`/book/${provider.id}`}
                  className="px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-md shadow-sky-600/25 hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content Grid: Left Main Details + Right Sticky Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Sections */}
          <div className="lg:col-span-8 space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-xs flex items-center gap-1 overflow-x-auto">
              {[
                { id: 'services', label: `Services (${provider.services.length})` },
                { id: 'portfolio', label: `Portfolio (${provider.portfolio.length})` },
                { id: 'reviews', label: `Reviews (${providerReviews.length})` },
                { id: 'availability', label: 'Availability & Location' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* About Bio Section */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">About the Professional</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{provider.bio}</p>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Core Specializations & Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services List with PKR Prices */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Offered Services & Pricing</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Itemized rate card with clear estimated durations</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      Standard PKR Rates
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {provider.services.map((service) => (
                      <div
                        key={service.id}
                        className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                            {service.name}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                            {service.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                            <Clock className="w-3 h-3" />
                            Est. {service.duration}
                          </span>
                        </div>

                        <div className="flex items-center sm:flex-col sm:items-end justify-between gap-3 shrink-0">
                          <span className="text-base font-extrabold text-slate-900">
                            PKR {service.price.toLocaleString()}
                          </span>

                          <Link
                            href={`/book/${provider.id}?service=${encodeURIComponent(service.name)}`}
                            className="px-3.5 py-1.5 text-xs font-semibold text-sky-600 hover:text-white bg-sky-50 hover:bg-sky-600 rounded-xl transition-all"
                          >
                            Book This
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Project Portfolio & Past Work</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Real photographs of previous installations and jobs completed by {provider.name}. Click to expand.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.portfolio.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPortfolioImage(item.imageUrl)}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative aspect-4/3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                        <h5 className="font-bold text-xs">{item.title}</h5>
                        <p className="text-[10px] text-slate-300 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Customer Reviews</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Verified ratings and comments from clients who booked this provider.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-3xl font-black text-slate-900">{provider.rating}</span>
                      <div>
                        <RatingStars rating={provider.rating} size="sm" showScore={false} />
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {providerReviews.length} Verified Reviews
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setReviewModalOpen(true)}
                      className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Write Review</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {providerReviews.length > 0 ? (
                    providerReviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No text reviews displayed yet. All ratings averaged at {provider.rating} ★.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: AVAILABILITY & LOCATION */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                {/* Weekly Availability Calendar */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Weekly Schedule & Working Hours</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Working Hours: {provider.workingHours}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
                    {daysOrder.map((day) => {
                      const status = provider.availability[day];
                      return (
                        <div
                          key={day}
                          className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                            status === 'available'
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : status === 'limited'
                              ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <span className="text-[11px] uppercase font-bold tracking-wider block">
                            {day.slice(0, 3)}
                          </span>
                          <span
                            className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                              status === 'available'
                                ? 'bg-emerald-600 text-white'
                                : status === 'limited'
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Location Map Placeholder Card */}
                <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Service Coverage Area</h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {provider.area}, {provider.city}
                    </span>
                  </div>

                  {/* Interactive Styled Map Placeholder */}
                  <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200 shadow-lg text-center max-w-xs space-y-2">
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Serving {provider.area}, {provider.city}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Doorstep service within 20km radius of {provider.city}. Average arrival time 45-60 minutes upon booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary & Instant Booking Action */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900">Quick Booking</h3>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Starting Rate</span>
                  <span className="font-bold text-slate-900 text-sm">
                    PKR {provider.startingPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Completed Jobs</span>
                  <span className="font-bold text-emerald-600">{provider.completedJobs}+ jobs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Response Time</span>
                  <span className="font-bold text-slate-700">~15 Minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">City</span>
                  <span className="font-bold text-slate-700">{provider.city}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/book/${provider.id}`}
                  className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-md shadow-sky-600/20 text-center flex items-center justify-center gap-2 transition-all"
                >
                  <span>Book This Professional</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => toggleFavorite(provider.id)}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    favorite
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
                  <span>{favorite ? 'Saved to Favorites' : 'Save to Favorites'}</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Satisfaction ServiceHub Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>No upfront payment required online</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Review {provider.name}</h4>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              {/* Rating Star Selector */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= newReviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {newReviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Service Taken */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Service Performed</label>
                <select
                  value={newReviewService}
                  onChange={(e) => setNewReviewService(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="">Select Service</option>
                  {provider.services.map((srv) => (
                    <option key={srv.id} value={srv.name}>{srv.name}</option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details of your experience with this professional..."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Portfolio Lightbox Modal */}
      {selectedPortfolioImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPortfolioImage(null)}
        >
          <div className="max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden p-2 relative">
            <img
              src={selectedPortfolioImage}
              alt="Expanded work"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-xs text-slate-300 py-3">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
