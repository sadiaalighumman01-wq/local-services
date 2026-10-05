import React from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, CalendarCheck2, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Search',
      description: 'Find the service you need by searching category, task or your city.',
      icon: Search,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      step: '02',
      title: 'Choose a Professional',
      description: 'Compare profiles, verified credentials, real customer reviews, and clear PKR rates.',
      icon: SlidersHorizontal,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      step: '03',
      title: 'Book & Relax',
      description: 'Select your preferred date, time and address. Receive doorstep service guaranteed.',
      icon: CalendarCheck2,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How ServiceHub Works
          </h2>
          <p className="text-slate-500 text-sm">
            Booking professional home and commercial services in Pakistan has never been this seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-sky-200 via-emerald-200 to-indigo-200 -translate-y-8 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
              >
                {/* Step badge */}
                <span className="text-[11px] font-extrabold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full mb-6">
                  STEP {item.step}
                </span>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border shadow-xs group-hover:scale-110 transition-transform ${item.color}`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/professionals"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md"
          >
            <span>Start Searching Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
