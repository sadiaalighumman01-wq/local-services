'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORIES, CITIES } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Star,
  Users,
  Upload,
  ArrowRight,
  Briefcase,
  FileImage,
  DollarSign,
} from 'lucide-react';

export default function BecomeProviderPage() {
  const router = useRouter();
  const { showToast, loginAs } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [experience, setExperience] = useState('5');
  const [city, setCity] = useState(CITIES[0]);
  const [servicesOffered, setServicesOffered] = useState('');
  const [startingPrice, setStartingPrice] = useState('2000');
  const [aboutBio, setAboutBio] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [portfolioCount, setPortfolioCount] = useState(0);

  const [submittedModal, setSubmittedModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedModal(true);
    showToast('Registration Received!', 'Your provider application is being reviewed.', 'success');
  };

  const benefits = [
    {
      title: 'Get More Customers',
      desc: 'Connect with homeowners, property managers and businesses looking for verified local professionals daily.',
      icon: Users,
    },
    {
      title: 'Showcase Your Services',
      desc: 'Build a dedicated profile page highlighting your rates, skills, past customer reviews and photo portfolio.',
      icon: Star,
    },
    {
      title: 'Manage Bookings Easily',
      desc: 'Accept or decline client requests with one tap, manage weekly schedules and reduce cancellations.',
      icon: CheckCircle2,
    },
    {
      title: 'Build Your Reputation',
      desc: 'Earn verified reviews and top-rated badges that make you the go-to specialist in your neighborhood.',
      icon: ShieldCheck,
    },
    {
      title: 'Grow Your Business',
      desc: 'Keep 100% control over your rates and schedule with predictable income and zero signup fees.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Pakistan's Fastest Growing Service Network</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Grow Your Business With <span className="text-sky-600">ServiceHub</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Turn your skills into steady client bookings. From plumbing and electrical work to web design and home tutoring, expand your local reach today.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Registration Form Card */}
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Provider Application</h2>
            <p className="text-xs text-slate-500 mt-1">
              Please enter accurate information. All professionals undergo verification before public listing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* 1. Basic Details */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">1. Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tariq@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Professional Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">2. Professional Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Profession Title</label>
                  <input
                    type="text"
                    required
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Master Sanitary Plumber"
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Service Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">City / Location</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Starting Price (PKR)</label>
                  <input
                    type="number"
                    step="100"
                    required
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    placeholder="e.g. 2000"
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Specific Services Offered (Comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={servicesOffered}
                  onChange={(e) => setServicesOffered(e.target.value)}
                  placeholder="e.g. Leakage Repair, Pipe Replacement, Water Tank Setup, Geyser Installation"
                  className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  About You & Professional Bio
                </label>
                <textarea
                  rows={3}
                  required
                  value={aboutBio}
                  onChange={(e) => setAboutBio(e.target.value)}
                  placeholder="Briefly describe your training, tools, warranty policy and experience..."
                  className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* 3. Media Upload UI */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">3. Photos & Portfolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Profile Photo Upload Box */}
                <div
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    photoUploaded
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-slate-300 hover:border-sky-400 bg-slate-50/50'
                  }`}
                >
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${photoUploaded ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="font-bold text-slate-800 block">Profile Photo</span>
                  <span className="text-[11px] text-slate-500">
                    {photoUploaded ? '✓ portrait_photo.jpg selected' : 'Click to select profile picture'}
                  </span>
                </div>

                {/* Portfolio Upload Box */}
                <div
                  onClick={() => setPortfolioCount((prev) => (prev >= 6 ? 0 : prev + 2))}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    portfolioCount > 0
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : 'border-slate-300 hover:border-sky-400 bg-slate-50/50'
                  }`}
                >
                  <FileImage className={`w-8 h-8 mx-auto mb-2 ${portfolioCount > 0 ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="font-bold text-slate-800 block">Work Portfolio Images</span>
                  <span className="text-[11px] text-slate-500">
                    {portfolioCount > 0 ? `✓ ${portfolioCount} sample photos attached` : 'Click to upload 4–6 job photos'}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Provider Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Welcome to ServiceHub! Our verification team will review your credentials within 24 hours. You can already explore the Provider Dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  loginAs('provider');
                  router.push('/dashboard/provider');
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                Open Provider Dashboard
              </button>

              <button
                onClick={() => setSubmittedModal(false)}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
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
