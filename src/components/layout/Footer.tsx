'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast('Subscribed!', 'Thank you for joining the ServiceHub community updates.', 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Service<span className="text-sky-400">Hub</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Pakistan’s premier local service marketplace. Connecting homeowners and businesses with verified plumbers, electricians, AC technicians, designers and tutors across major cities.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Gulberg III, Main Boulevard, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+92 (42) 111-737-842 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@servicehub.com.pk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/professionals" className="hover:text-white transition-colors">
                  Find Professionals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/become-provider" className="hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Services */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Top Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services?category=plumbing" className="hover:text-white transition-colors">
                  Plumbing & Leakages
                </Link>
              </li>
              <li>
                <Link href="/services?category=electrical" className="hover:text-white transition-colors">
                  Electrical & Solar UPS
                </Link>
              </li>
              <li>
                <Link href="/services?category=ac-repair" className="hover:text-white transition-colors">
                  Inverter AC Master Service
                </Link>
              </li>
              <li>
                <Link href="/services?category=cleaning" className="hover:text-white transition-colors">
                  Home Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services?category=web-development" className="hover:text-white transition-colors">
                  Web & App Development
                </Link>
              </li>
              <li>
                <Link href="/services?category=tutoring" className="hover:text-white transition-colors">
                  O/A Level & FSc Tutors
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities & Newsletter */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get seasonal service discounts, promo vouchers and home maintenance tips.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-900">
              <span className="text-[11px] text-slate-400 block mb-1">Cities Served:</span>
              <p className="text-[11px] text-slate-500">
                Lahore • Islamabad • Karachi • Rawalpindi • Faisalabad • Multan • Gujranwala
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ServiceHub Pakistan. All rights reserved. Demo Marketplace.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Safety Guidelines
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
