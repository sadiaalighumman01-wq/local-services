'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Headphones,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Sent!', 'Our support representative will contact you within 2 hours.', 'success');
  };

  const contactCards = [
    {
      title: 'Email Us',
      detail: 'support@servicehub.com.pk',
      sub: 'Replies within 2 hours',
      icon: Mail,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Helpline & WhatsApp',
      detail: '+92 (42) 111-737-842',
      sub: 'Toll-free customer hotline',
      icon: Phone,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Headquarters',
      detail: 'Main Boulevard, Gulberg III',
      sub: 'Lahore, Punjab, Pakistan',
      icon: MapPin,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Support Hours',
      detail: 'Mon – Sat: 8:00 AM – 9:00 PM',
      sub: 'Sunday: 10:00 AM – 6:00 PM',
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 Dedicated Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have questions about a booking, need dispute resolution, or interested in corporate vendor partnership? We are here to help.
          </p>
        </div>

        {/* 4 Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${c.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
                  <p className="text-xs font-semibold text-slate-800 mt-1">{c.detail}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{c.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Form & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-400">Fill in your information and our team will get back to you promptly.</p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-950">Thank you for reaching out!</h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Your ticket has been logged with reference <strong>#TKT-{Math.floor(1000 + Math.random() * 9000)}</strong>. We will reply to {email} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bilal Hassan"
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
                      placeholder="bilal@example.com"
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Booking Inquiry">Booking Inquiry</option>
                      <option value="Provider Dispute">Provider Dispute</option>
                      <option value="Billing / Refund">Billing / Refund</option>
                      <option value="Become a Partner">Become a Corporate Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query or booking reference..."
                    className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-sky-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Map & Office Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Frontend Map Placeholder */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Head Office Location</h3>
                <span className="text-[11px] text-slate-400">Gulberg III, Lahore</span>
              </div>

              {/* Styled Map Container */}
              <div className="relative rounded-2xl overflow-hidden h-72 bg-slate-900 border border-slate-800 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700 max-w-xs shadow-xl space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">ServiceHub Central HQ</h4>
                  <p className="text-[11px] text-slate-300">
                    Floor 4, Arfa Software Technology Park & Gulberg III Tech Hub, Lahore
                  </p>
                  <span className="inline-block text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded">
                    Open for in-person provider onboarding
                  </span>
                </div>
              </div>
            </div>

            {/* City Regional Desks */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Regional Hubs
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="font-semibold text-slate-800">Islamabad:</span>
                  <span>Blue Area & Bahria Phase 7</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="font-semibold text-slate-800">Karachi:</span>
                  <span>Sharah-e-Faisal & Clifton Block 4</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="font-semibold text-slate-800">Faisalabad:</span>
                  <span>Kohinoor City & D-Ground</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
