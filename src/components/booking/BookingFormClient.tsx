'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PROVIDERS, CITIES } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import RatingStars from '@/components/common/RatingStars';
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  User,
  Mail,
  Phone,
  FileText,
  BadgeCheck,
  Sparkles,
  Home,
} from 'lucide-react';

interface BookingFormClientProps {
  initialProviderId?: string;
}

export default function BookingFormClient({ initialProviderId }: BookingFormClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServiceName = searchParams.get('service') || '';

  const { addBooking, currentUser } = useApp();

  const [selectedProviderId, setSelectedProviderId] = useState(
    initialProviderId || PROVIDERS[0].id
  );

  const provider =
    PROVIDERS.find((p) => p.id === selectedProviderId) || PROVIDERS[0];

  const [selectedService, setSelectedService] = useState(
    initialServiceName || provider.services[0]?.name || 'Standard Inspection'
  );

  // Form Fields
  const [customerName, setCustomerName] = useState(currentUser.name || 'Zubair Tariq');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email || 'zubair.tariq@gmail.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '+92 300 4455667');
  const [address, setAddress] = useState('House 142, Street 8, Phase 4, DHA');
  const [city, setCity] = useState(provider.city || 'Lahore');
  const [bookingDate, setBookingDate] = useState('2026-10-05');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [requirements, setRequirements] = useState('');

  // Confirmation Modal State
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);

  // When provider changes, adjust selected service
  useEffect(() => {
    if (!provider.services.some((s) => s.name === selectedService)) {
      setSelectedService(provider.services[0]?.name || 'Standard Consultation');
    }
  }, [provider, selectedService]);

  const activeServiceObj =
    provider.services.find((s) => s.name === selectedService) || {
      id: 'default',
      name: selectedService,
      price: provider.startingPrice,
      duration: '1-2 Hours',
      description: 'Standard on-site service and troubleshooting',
    };

  const serviceFee = 200; // Platform handling fee PKR
  const totalPKR = activeServiceObj.price + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = addBooking({
      providerId: provider.id,
      providerName: provider.name,
      providerProfession: provider.profession,
      providerAvatar: provider.avatar,
      providerCity: provider.city,
      serviceName: selectedService,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      date: bookingDate,
      time: preferredTime,
      price: totalPKR,
      status: 'Pending',
      notes: requirements,
    });

    setSubmittedBooking(created);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Direct Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Book Your Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Select your service date, customize requirements, and confirm with zero online payment required upfront.
          </p>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Form (8 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Provider Dropdown if needed */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Selected Professional
                </label>
                <select
                  value={selectedProviderId}
                  onChange={(e) => setSelectedProviderId(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:bg-white focus:border-sky-500 focus:outline-none"
                >
                  {PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.profession} ({p.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Service Package
                </label>
                <div className="space-y-2">
                  {provider.services.map((srv) => (
                    <label
                      key={srv.id}
                      className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedService === srv.name
                          ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="serviceOption"
                          checked={selectedService === srv.name}
                          onChange={() => setSelectedService(srv.name)}
                          className="mt-1 accent-sky-600"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{srv.name}</div>
                          <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                            {srv.description}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 shrink-0 ml-3">
                        PKR {srv.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Your Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Date & Time Slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
                      >
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Address */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Service Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address / House #</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House #, Street #, Sector / Phase"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Describe specific symptoms, tools required, or gate instructions..."
                    className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-md shadow-sky-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Summary Card (5 Cols) */}
          <aside className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Booking Summary
              </h3>

              {/* Provider Mini Card */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{provider.name}</h4>
                    {provider.verified && <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{provider.profession}</p>
                  <div className="mt-1">
                    <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} size="sm" />
                  </div>
                </div>
              </div>

              {/* Key Specs */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900 text-right">{selectedService}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Date:</span>
                  <span className="font-semibold text-slate-800">{bookingDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Time:</span>
                  <span className="font-semibold text-slate-800">{preferredTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">{city}</span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Service Fee:</span>
                  <span className="font-semibold text-slate-800">PKR {activeServiceObj.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Platform Handling Fee:</span>
                  <span className="font-semibold text-slate-800">PKR {serviceFee}</span>
                </div>
                <div className="pt-2 border-t border-sky-200/60 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Total Due (Cash on Job):</span>
                  <span className="font-black text-slate-900 text-base">
                    PKR {totalPKR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>• Pay securely in cash or bank transfer directly to the provider upon job completion.</p>
                <p>• Cancel anytime up to 2 hours before the scheduled time with zero fee.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Booking ID: {submittedBooking.bookingCode}
              </span>
              <h3 className="text-2xl font-black text-slate-900 pt-2">
                Booking Request Submitted!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Your booking request has been received. The service provider will contact you shortly on {customerPhone} to reconfirm details.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Provider:</span>
                <span className="font-bold text-slate-900">{submittedBooking.providerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{submittedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schedule:</span>
                <span className="font-semibold text-slate-800">{submittedBooking.date} at {submittedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total PKR:</span>
                <span className="font-extrabold text-emerald-600">PKR {submittedBooking.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/dashboard/customer"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                Go to My Bookings
              </Link>

              <button
                onClick={() => router.push('/')}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
