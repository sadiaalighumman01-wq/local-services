import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Target,
  Award,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Heart,
  ArrowRight,
  Briefcase,
  Star,
  Sparkles,
} from 'lucide-react';
import HowItWorks from '@/components/home/HowItWorks';

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Verified Professionals', desc: 'Vetted tradesmen & freelancers' },
    { number: '25,000+', label: 'Happy Customers', desc: 'Across Pakistan’s urban centers' },
    { number: '50+', label: 'Service Categories', desc: 'From plumbing to software engineering' },
    { number: '100+', label: 'Cities & Towns Covered', desc: 'Rapidly expanding nationwide network' },
  ];

  const values = [
    {
      title: 'Trust & Safety First',
      desc: 'We independently verify identities, review backgrounds, and evaluate skills before listing any service specialist.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Transparent Pricing in PKR',
      desc: 'Eliminating guesswork and uncomfortable street bargaining. Every task features honest, upfront estimates.',
      icon: Award,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Empowering Local Craftsmen',
      desc: 'Helping Pakistani artisans, technicians, and independent freelancers build sustainable digital businesses.',
      icon: TrendingUp,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Accountability Guaranteed',
      desc: 'Our customer support team mediates and ensures satisfaction with a 100% service fulfillment commitment.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Our Mission & Vision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Connecting Pakistan with <br />
            <span className="text-sky-600">Trusted Local Services</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            ServiceHub was founded with a singular purpose: to modernize how millions of homeowners and businesses in Pakistan discover, book, and review skilled local professionals.
          </p>
        </div>
      </section>

      {/* 4 Stats Grid */}
      <section className="py-12 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-1 hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm font-bold text-sky-600">{stat.label}</div>
              <p className="text-[11px] text-slate-400">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 bg-white border-t border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                The ServiceHub Story
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                From Unreliable Handymen to Verified Excellence
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                For decades, hiring a plumber or electrician in Lahore, Karachi, or Islamabad involved asking neighbors, waiting endlessly for someone to show up, and haggling over unpredictable prices.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                ServiceHub bridges this gap by combining technological convenience with stringent quality checks. We empower talented Pakistani technicians, tradespeople, and digital creatives with digital storefronts, while giving customers the reassurance of transparent PKR ratings and verified background credentials.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% CNIC identity verification and skill checks</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero upfront payment required before job completion</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Transparent reviews from authentic local homeowners</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                  alt="ServiceHub Professional team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Value Prop: Why Customers Use It vs Why Professionals Join */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              A Platform Built for Both Sides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Balancing consumer safety and fair livelihood for local workers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Customers */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Why Customers Use ServiceHub</h3>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span><strong>Speed:</strong> Book vetted specialists in under 2 minutes with guaranteed fast response.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span><strong>Pricing Clarity:</strong> Know exact starting rates in PKR before anyone arrives at your home.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span><strong>Accountability:</strong> If anything isn't right, our local helpline steps in to make it right.</span>
                </li>
              </ul>
              <Link
                href="/professionals"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 pt-2"
              >
                <span>Browse Local Professionals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* For Professionals */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Why Professionals Join</h3>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Consistent Leads:</strong> Direct inquiries from genuine clients in your specific neighborhood.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Keep 100% of Cash:</strong> Low transparent commission only on successfully completed bookings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Digital Reputation:</strong> Build lasting credibility with public reviews that belong to you.</span>
                </li>
              </ul>
              <Link
                href="/become-provider"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2"
              >
                <span>Apply as a Service Provider</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Reusable Section */}
      <HowItWorks />
    </div>
  );
}
