import React from 'react';
import {
  ShieldCheck,
  CalendarCheck,
  Receipt,
  Star,
  MapPin,
  Headphones,
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'Verified Professionals',
      description: 'Every expert undergoes CNIC background screening and professional skills verification.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Easy Booking',
      description: 'Book qualified service providers in less than two minutes with our quick online reservation flow.',
      icon: CalendarCheck,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Transparent Pricing',
      description: 'Zero hidden fees. Upfront itemized PKR rates so you know exactly what you will pay before booking.',
      icon: Receipt,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Authentic Customer Reviews',
      description: 'Genuine testimonials and ratings from actual homeowners and local businesses across Pakistan.',
      icon: Star,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Local Neighborhood Experts',
      description: 'Professionals based right in your city and sector for faster arrival and responsive service.',
      icon: MapPin,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Responsive Support',
      description: 'Dedicated customer care team available 7 days a week to resolve inquiries and ensure satisfaction.',
      icon: Headphones,
      color: 'bg-teal-50 text-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Why ServiceHub
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Designed for Trust and Convenience
          </h2>
          <p className="text-slate-500 text-sm">
            We eliminate the hassle of untrusted street handymen with vetted, accountable, and rated local experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
