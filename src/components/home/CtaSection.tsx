import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Briefcase } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to get started?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Need a professional for your next job?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Connect with top-rated local experts today or join our network to grow your own service business across Pakistan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/professionals"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Find a Professional</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
            </Link>

            <Link
              href="/become-provider"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Become a Service Provider</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
