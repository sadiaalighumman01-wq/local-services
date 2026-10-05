'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  UserCheck,
  Briefcase,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAs, showToast } = useApp();

  const [email, setEmail] = useState('zubair.tariq@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('customer');
    router.push('/dashboard/customer');
  };

  const handleQuickCustomer = () => {
    loginAs('customer');
    router.push('/dashboard/customer');
  };

  const handleQuickProvider = () => {
    loginAs('provider');
    router.push('/dashboard/provider');
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
          <h1 className="text-2xl font-black text-slate-900 pt-2">Welcome Back</h1>
          <p className="text-xs text-slate-500">
            Sign in to manage your appointments or service business.
          </p>
        </div>

        {/* Demo Fast Logins Box */}
        <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 text-xs space-y-2">
          <span className="font-bold text-sky-900 block flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Quick Demo 1-Click Access:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="py-2 px-3 bg-white hover:bg-sky-100 text-sky-800 rounded-xl border border-sky-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={handleQuickProvider}
              className="py-2 px-3 bg-white hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>Provider Demo</span>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
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
                  placeholder="your.email@example.com"
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:bg-white focus:border-sky-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 accent-sky-600"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => showToast('Password Reset', 'Password recovery instructions sent to your email.', 'info')}
                className="text-sky-600 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Google UI */}
          <div className="space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-medium absolute">
                or
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                loginAs('customer');
                router.push('/dashboard/customer');
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.78-2.1-6.73-4.96H1.26v3.13C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.63H1.26C.46 8.24 0 10.06 0 12s.46 3.76 1.26 5.37l4.01-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.63l4.01 3.13c.95-2.86 3.61-4.96 6.73-4.96z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Links */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs text-slate-500">
            <p>
              Don't have an account?{' '}
              <Link href="/signup" className="text-sky-600 font-bold hover:underline">
                Create account
              </Link>
            </p>
            <p>
              Are you a skilled technician?{' '}
              <Link href="/become-provider" className="text-emerald-600 font-bold hover:underline">
                Become a Provider
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
