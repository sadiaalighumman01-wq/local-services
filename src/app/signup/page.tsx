'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { loginAs, showToast } = useApp();

  const [accountType, setAccountType] = useState<'customer' | 'provider'>('customer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    loginAs(accountType);
    showToast(
      'Account Created!',
      `Welcome to ServiceHub, ${fullName || 'Friend'}!`,
      'success'
    );

    if (accountType === 'provider') {
      router.push('/dashboard/provider');
    } else {
      router.push('/dashboard/customer');
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-sky-50/60 via-white to-slate-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Service<span className="text-sky-600">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 pt-2">Join ServiceHub</h1>
          <p className="text-xs text-slate-500">
            Create an account to book experts or grow your service business.
          </p>
        </div>

        {/* Account Type Selector Card */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAccountType('customer')}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              accountType === 'customer'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>I Need Services</span>
          </button>

          <button
            type="button"
            onClick={() => setAccountType('provider')}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              accountType === 'provider'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>I Am a Professional</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Asad Mehmood"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="asad@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Terms notice */}
            <p className="text-[11px] text-slate-400 leading-tight">
              By creating an account, you agree to ServiceHub's Terms of Service and Privacy Policy.
            </p>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                accountType === 'provider'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
              }`}
            >
              <span>Create {accountType === 'provider' ? 'Provider' : 'Customer'} Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-sky-600 font-bold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
