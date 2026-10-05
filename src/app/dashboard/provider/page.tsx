'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PROVIDERS } from '@/data/mockData';
import { Booking } from '@/types';
import RatingStars from '@/components/common/RatingStars';
import ReviewCard from '@/components/common/ReviewCard';
import {
  LayoutDashboard,
  User,
  Wrench,
  Inbox,
  Calendar,
  Star,
  DollarSign,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus,
  BadgeCheck,
  TrendingUp,
  Award,
  Check,
  X,
} from 'lucide-react';

export default function ProviderDashboardPage() {
  const { bookings, updateBookingStatus, showToast, reviews } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Let's use Ahmed Khan as the active provider persona
  const provider = PROVIDERS[0];
  const providerReviews = reviews.filter((r) => r.providerId === provider.id);

  // Provider specific bookings (or all pending requests)
  const providerBookings = bookings;
  const pendingRequests = providerBookings.filter((b) => b.status === 'Pending');
  const confirmedJobs = providerBookings.filter((b) => b.status === 'Confirmed');
  const completedJobs = providerBookings.filter((b) => b.status === 'Completed');

  // Interactive schedule state
  const [scheduleState, setScheduleState] = useState(provider.availability);

  // New service state
  const [myServices, setMyServices] = useState(provider.services);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('2 Hours');
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  // Calculate earnings
  const completedGross = completedJobs.reduce((acc, curr) => acc + curr.price, 0);
  const totalEarningsPKR = 48500 + completedGross;

  const handleAcceptRequest = (bookingId: string) => {
    updateBookingStatus(bookingId, 'Confirmed');
    showToast('Booking Accepted', 'You have accepted the customer appointment.', 'success');
  };

  const handleDeclineRequest = (bookingId: string) => {
    updateBookingStatus(bookingId, 'Cancelled');
    showToast('Booking Declined', 'The booking request was declined.', 'info');
  };

  const handleCompleteJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'Completed');
    showToast('Job Completed', 'Appointment marked as completed! Payment recorded.', 'success');
  };

  const toggleDayStatus = (day: keyof typeof scheduleState) => {
    const current = scheduleState[day];
    const nextStatus =
      current === 'available'
        ? 'limited'
        : current === 'limited'
        ? 'unavailable'
        : 'available';

    setScheduleState((prev) => ({ ...prev, [day]: nextStatus }));
    showToast('Schedule Updated', `${day.toUpperCase()} status set to ${nextStatus}.`, 'info');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice) return;

    setMyServices((prev) => [
      ...prev,
      {
        id: `srv-${Date.now()}`,
        name: newServiceName,
        description: 'Quality doorstep service with satisfaction warranty.',
        price: Number(newServicePrice),
        duration: newServiceDuration,
      },
    ]);

    setNewServiceName('');
    setNewServicePrice('');
    setServiceModalOpen(false);
    showToast('Service Added', 'New service package published to your profile.', 'success');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Booking Requests', icon: Inbox, badge: pendingRequests.length },
    { id: 'services', label: 'My Services', icon: Wrench },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: providerReviews.length },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const daysList: (keyof typeof scheduleState)[] = [
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Provider Header */}
        <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-100"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
                <BadgeCheck className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {provider.name}
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  Verified Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {provider.profession} • {provider.city}, Pakistan
              </p>
            </div>
          </div>

          <Link
            href={`/professionals/${provider.id}`}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-sky-600 bg-slate-100 hover:bg-slate-200 transition-colors self-start sm:self-auto"
          >
            Preview Public Profile
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1 sticky top-28">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        active ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Provider Content Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* OVERVIEW / DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 Stats Required: Total Bookings, Pending Requests, Completed Jobs, Average Rating */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Total Bookings
                    </span>
                    <div className="text-2xl font-black text-slate-900">
                      {providerBookings.length + provider.completedJobs}
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold block">All-time</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Pending Requests
                    </span>
                    <div className="text-2xl font-black text-amber-600">
                      {pendingRequests.length}
                    </div>
                    <span className="text-[11px] text-amber-600 font-semibold block">Needs Action</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Completed Jobs
                    </span>
                    <div className="text-2xl font-black text-emerald-600">
                      {completedJobs.length + provider.completedJobs}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold block">100% Success</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Average Rating
                    </span>
                    <div className="text-2xl font-black text-slate-900 flex items-center gap-1">
                      {provider.rating} <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold block">
                      From {providerReviews.length || provider.reviewCount} reviews
                    </span>
                  </div>
                </div>

                {/* Booking Requests Section */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Action Required: Booking Requests
                      </h3>
                      <p className="text-xs text-slate-400">
                        Review customer details and accept or decline appointment dates.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {pendingRequests.length} Pending
                    </span>
                  </div>

                  {pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                      {pendingRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-sm">{req.customerName}</h4>
                              <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {req.bookingCode}
                              </span>
                            </div>

                            <p className="text-xs font-semibold text-slate-800">
                              Service: <span className="text-sky-700">{req.serviceName}</span>
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {req.date} at {req.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {req.address}, {req.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {req.customerPhone}
                              </span>
                            </div>

                            {req.notes && (
                              <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-200/60 mt-1 max-w-lg">
                                Note: "{req.notes}"
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-amber-200/60">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] text-slate-400 block uppercase">Customer Total</span>
                              <span className="text-base font-black text-slate-900">
                                PKR {req.price.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleAcceptRequest(req.id)}
                                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Accept</span>
                              </button>

                              <button
                                onClick={() => handleDeclineRequest(req.id)}
                                className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Decline</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-2xl">
                      No pending requests right now. All appointments have been accepted or processed!
                    </div>
                  )}
                </div>

                {/* Confirmed Appointments with Complete action */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Upcoming Confirmed Jobs</h3>
                    <span className="text-xs text-slate-400">{confirmedJobs.length} active jobs</span>
                  </div>

                  {confirmedJobs.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {confirmedJobs.map((b) => (
                        <div key={b.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900">{b.customerName}</h4>
                              <span className="text-slate-400 text-[10px] font-mono">{b.bookingCode}</span>
                            </div>
                            <p className="text-slate-600 font-medium">{b.serviceName}</p>
                            <span className="text-slate-400 text-[11px]">
                              📅 {b.date} • {b.time} | 📍 {b.address}, {b.city}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right">
                              <span className="font-bold text-slate-900 block">PKR {b.price.toLocaleString()}</span>
                              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                                Confirmed
                              </span>
                            </div>

                            <button
                              onClick={() => handleCompleteJob(b.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Mark Done</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">No confirmed jobs pending completion right now.</p>
                  )}
                </div>
              </div>
            )}

            {/* REQUESTS TAB */}
            {activeTab === 'requests' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="text-lg font-bold text-slate-900">All Booking Requests</h3>
                <div className="space-y-4">
                  {providerBookings.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{req.customerName}</div>
                        <div className="text-slate-600">{req.serviceName}</div>
                        <div className="text-slate-400 mt-1">
                          📅 {req.date} at {req.time} • 📍 {req.city}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900">PKR {req.price.toLocaleString()}</span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            req.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : req.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : req.status === 'Completed'
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MY SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">My Offered Services</h3>
                    <p className="text-xs text-slate-500">Manage itemized rates and service descriptions</p>
                  </div>
                  <button
                    onClick={() => setServiceModalOpen(true)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {myServices.map((s) => (
                    <div key={s.id} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                        <p className="text-xs text-slate-500 max-w-md">{s.description}</p>
                        <span className="text-[11px] text-slate-400">Duration: {s.duration}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900 text-sm block">
                          PKR {s.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCHEDULE TAB */}
            {activeTab === 'schedule' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Weekly Working Schedule</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any day badge below to toggle your availability between <strong>Available</strong>, <strong>Limited</strong>, and <strong>Unavailable</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {daysList.map((day) => {
                    const st = scheduleState[day];
                    return (
                      <div
                        key={day}
                        onClick={() => toggleDayStatus(day)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-102 flex items-center justify-between ${
                          st === 'available'
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : st === 'limited'
                            ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider block">
                            {day}
                          </span>
                          <span className="text-[11px] capitalize text-slate-600 mt-0.5 block">
                            {st}
                          </span>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            st === 'available'
                              ? 'bg-emerald-600 text-white'
                              : st === 'limited'
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-300 text-slate-700'
                          }`}
                        >
                          Toggle
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Customer Reviews & Ratings</h3>
                    <p className="text-xs text-slate-500">Live feedback received for your work</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={provider.rating} size="sm" showScore={false} />
                    <span className="text-xs font-bold text-slate-800">{provider.rating} / 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {providerReviews.map((rev) => (
                    <ReviewCard key={rev.id} review={rev} />
                  ))}
                </div>
              </div>
            )}

            {/* EARNINGS TAB */}
            {activeTab === 'earnings' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Earnings & Payouts</h3>
                  <p className="text-xs text-slate-500">Track cash on delivery income and marketplace dues</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                    <span className="text-xs text-emerald-800 font-semibold">Total Revenue (Gross)</span>
                    <div className="text-2xl font-black text-emerald-950">
                      PKR {totalEarningsPKR.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs text-slate-600 font-semibold">This Month</span>
                    <div className="text-2xl font-black text-slate-900">
                      PKR {(24500 + completedGross).toLocaleString()}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
                    <span className="text-xs text-sky-800 font-semibold">Platform Fee (5%)</span>
                    <div className="text-2xl font-black text-sky-950">
                      PKR {Math.round(totalEarningsPKR * 0.05).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE & SETTINGS TAB */}
            {(activeTab === 'profile' || activeTab === 'settings') && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 capitalize">Provider Profile & Account</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                    <input type="text" defaultValue={provider.name} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Profession</label>
                    <input type="text" defaultValue={provider.profession} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                    <input type="text" defaultValue={provider.phone} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">City</label>
                    <input type="text" defaultValue={provider.city} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                  </div>
                </div>
                <button
                  onClick={() => showToast('Profile Saved', 'Provider details updated successfully.', 'success')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Save Profile
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Add Service Package</h4>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Water Tank Deep Chemical Cleaning"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Price (PKR)</label>
                <input
                  type="number"
                  required
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  placeholder="e.g. 4500"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Estimated Duration</label>
                <input
                  type="text"
                  required
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(e.target.value)}
                  placeholder="e.g. 2.5 Hours"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors shadow-xs"
              >
                Publish Service
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
