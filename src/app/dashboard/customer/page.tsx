'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Booking } from '@/types';
import ProviderCard from '@/components/common/ProviderCard';
import RatingStars from '@/components/common/RatingStars';
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  Star,
  User,
  Settings,
  LogOut,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Eye,
  X,
  Phone,
  ArrowRight,
  Search,
} from 'lucide-react';

function CustomerDashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const {
    currentUser,
    bookings,
    savedProviders,
    updateBookingStatus,
    logout,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<Booking | null>(null);

  // Stats
  const upcomingCount = bookings.filter(
    (b) => b.status === 'Confirmed' || b.status === 'Pending'
  ).length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;
  const totalCount = bookings.length;
  const savedCount = savedProviders.length;

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilterStatus === 'all') return true;
    return b.status.toLowerCase() === bookingFilterStatus.toLowerCase();
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'Cancelled');
    if (selectedBookingDetails?.id === bookingId) {
      setSelectedBookingDetails(null);
    }
    showToast('Booking Cancelled', 'Your booking request has been cancelled.', 'info');
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'My Bookings', icon: CalendarCheck, badge: upcomingCount },
    { id: 'saved', label: 'Saved Providers', icon: Heart, badge: savedCount },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Banner Greeting */}
        <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-sky-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  Welcome, {currentUser.name}!
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 uppercase tracking-wider">
                  Customer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your service appointments, track providers and view past invoices.
              </p>
            </div>
          </div>

          <Link
            href="/services"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors self-start sm:self-auto shadow-sm flex items-center gap-1.5"
          >
            <span>Book New Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dashboard Grid: Sidebar (3 Cols) + Content (9 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2 sticky top-28">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-sky-50 text-sky-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          active ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Upcoming
                    </span>
                    <div className="text-2xl font-black text-slate-900">{upcomingCount}</div>
                    <span className="text-[11px] text-emerald-600 font-semibold block">Scheduled</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Completed
                    </span>
                    <div className="text-2xl font-black text-slate-900">{completedCount}</div>
                    <span className="text-[11px] text-sky-600 font-semibold block">Past services</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Saved
                    </span>
                    <div className="text-2xl font-black text-slate-900">{savedCount}</div>
                    <span className="text-[11px] text-rose-600 font-semibold block">Favorites</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Total Bookings
                    </span>
                    <div className="text-2xl font-black text-slate-900">{totalCount}</div>
                    <span className="text-[11px] text-slate-500 font-semibold block">All-time</span>
                  </div>
                </div>

                {/* Upcoming Active Bookings Preview */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Recent Appointments</h3>
                      <p className="text-xs text-slate-400">Your upcoming and ongoing service orders</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>View All ({bookings.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {bookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={b.providerAvatar}
                            alt={b.providerName}
                            className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{b.providerName}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {b.bookingCode}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">{b.serviceName}</p>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>📅 {b.date} at {b.time}</span>
                              <span>•</span>
                              <span>📍 {b.city}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <div className="text-right">
                            <span className="text-xs font-bold text-slate-900 block">
                              PKR {b.price.toLocaleString()}
                            </span>
                            {getStatusBadge(b.status)}
                          </div>

                          <button
                            onClick={() => setSelectedBookingDetails(b)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Providers Carousel Preview */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Saved Professionals</h3>
                      <p className="text-xs text-slate-400">Quickly re-book your preferred experts</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('saved')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>See All ({savedProviders.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {savedProviders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {savedProviders.slice(0, 2).map((p) => (
                        <ProviderCard key={p.id} provider={p} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">
                      You haven’t saved any professionals yet. Click the heart icon on any provider profile to add them here.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* MY BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">My Bookings</h3>
                    <p className="text-xs text-slate-500">
                      Manage appointments, check status and download receipts.
                    </p>
                  </div>

                  {/* Status Filter Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
                    {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setBookingFilterStatus(st)}
                        className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-all ${
                          bookingFilterStatus === st
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-white transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={b.providerAvatar}
                            alt={b.providerName}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-sm">{b.providerName}</h4>
                              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                {b.bookingCode}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-slate-700">{b.serviceName}</p>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500">
                              <span>📅 {b.date} • {b.time}</span>
                              <span>📍 {b.address}, {b.city}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <div className="text-left sm:text-right">
                            <span className="text-sm font-black text-slate-900 block">
                              PKR {b.price.toLocaleString()}
                            </span>
                            {getStatusBadge(b.status)}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBookingDetails(b)}
                              className="px-3 py-2 text-xs font-bold text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
                            >
                              View Details
                            </button>

                            {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                              <button
                                onClick={() => handleCancelBooking(b.id)}
                                className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No bookings found with status "{bookingFilterStatus}".
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SAVED PROVIDERS TAB */}
            {activeTab === 'saved' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Saved Providers</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your bookmarked service professionals for quick re-hiring.
                  </p>
                </div>

                {savedProviders.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedProviders.map((provider) => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 space-y-3">
                    <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-xs">You haven't saved any providers to your list yet.</p>
                    <Link
                      href="/professionals"
                      className="inline-block px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
                    >
                      Explore Professionals
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* MY REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900">My Reviews & Ratings</h3>
                <p className="text-xs text-slate-500">
                  Reviews you have submitted for completed services on ServiceHub.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Ahmed Khan (Plumber)</span>
                    <RatingStars rating={5} size="sm" showScore={false} />
                  </div>
                  <p className="text-slate-600 italic">
                    "Ahmed arrived on time in DHA Lahore and fixed our leaking bathroom pipe in under an hour. Highly recommend!"
                  </p>
                  <span className="text-[10px] text-slate-400 block">Submitted on 28 Sep 2026</span>
                </div>
              </div>
            )}

            {/* PROFILE & SETTINGS TAB */}
            {(activeTab === 'profile' || activeTab === 'settings') && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="text-lg font-bold text-slate-900">Customer Profile & Preferences</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={currentUser.name}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      defaultValue={currentUser.phone}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={currentUser.email}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      defaultValue={currentUser.city}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => showToast('Profile Updated', 'Your profile details have been saved.', 'success')}
                    className="px-5 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Order Information</span>
                <h4 className="text-base font-black text-slate-900">{selectedBookingDetails.bookingCode}</h4>
              </div>
              <button
                onClick={() => setSelectedBookingDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Status:</span>
                <div>{getStatusBadge(selectedBookingDetails.status)}</div>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Provider:</span>
                <span className="font-bold text-slate-900">{selectedBookingDetails.providerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Service:</span>
                <span className="font-semibold text-slate-800">{selectedBookingDetails.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-semibold text-slate-800">
                  {selectedBookingDetails.date} at {selectedBookingDetails.time}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Address:</span>
                <span className="font-semibold text-slate-800 text-right">
                  {selectedBookingDetails.address}, {selectedBookingDetails.city}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Total Price:</span>
                <span className="font-black text-emerald-600 text-sm">
                  PKR {selectedBookingDetails.price.toLocaleString()}
                </span>
              </div>
              {selectedBookingDetails.notes && (
                <div className="py-1">
                  <span className="text-slate-400 block mb-1">Customer Notes:</span>
                  <p className="p-2.5 rounded-xl bg-slate-50 text-slate-700 italic text-[11px]">
                    "{selectedBookingDetails.notes}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex gap-2">
              {selectedBookingDetails.status !== 'Cancelled' && (
                <button
                  onClick={() => handleCancelBooking(selectedBookingDetails.id)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  Cancel Booking
                </button>
              )}
              <button
                onClick={() => setSelectedBookingDetails(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading customer dashboard...</div>}>
      <CustomerDashboardContent />
    </Suspense>
  );
}
