'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Heart,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Briefcase,
  Sparkles,
  PhoneCall,
  Search,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { favorites, currentUser, logout, loginAs } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Find Professionals', href: '/professionals' },
    { label: 'How It Works', href: '/about#how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href.split('#')[0]) && href !== '/about#how-it-works') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Verified Local Professionals across Pakistan
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Over 25,000+ happy bookings in Lahore, Karachi & Islamabad</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            {/* Quick Demo Role Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Demo Mode:</span>
              <button
                onClick={() => loginAs('customer')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  currentUser.role === 'customer'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => loginAs('provider')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  currentUser.role === 'provider'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Provider
              </button>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3 h-3 text-sky-400" />
              <span>Helpline: (042) 111-737-842</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
                Service<span className="text-sky-600">Hub</span>
              </span>
              <span className="text-[10px] block text-slate-400 font-medium tracking-tight -mt-1 hidden sm:block">
                Trusted Local Services
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'text-sky-600 bg-sky-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favorites Icon */}
            <Link
              href="/dashboard/customer?tab=saved"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              title="Saved Providers"
              aria-label="Saved Providers"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-50' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Dropdown / Auth State */}
            {currentUser.role !== 'guest' ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-xs"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="text-left hidden xl:block">
                    <span className="text-xs font-semibold text-slate-800 block leading-none">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="mt-1 inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 rounded-md">
                        {currentUser.role === 'provider' ? 'Service Provider' : 'Customer Account'}
                      </span>
                    </div>

                    <Link
                      href={currentUser.role === 'provider' ? '/dashboard/provider' : '/dashboard/customer'}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>{currentUser.role === 'provider' ? 'Provider Dashboard' : 'Customer Dashboard'}</span>
                    </Link>

                    <Link
                      href="/dashboard/customer?tab=bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span>My Bookings</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                Login
              </Link>
            )}

            {/* Become a Provider CTA */}
            <Link
              href="/become-provider"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 shadow-md shadow-sky-600/15 hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Become a Provider</span>
            </Link>
          </div>

          {/* Mobile Menu & Favorites Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/dashboard/customer?tab=saved"
              className="relative p-2 text-slate-600"
              aria-label="Saved Providers"
            >
              <Heart className="w-5 h-5 text-slate-600" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-xl hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {/* Quick Demo Switcher on mobile */}
          <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Logged in demo:</span>
            <div className="flex gap-2">
              <button
                onClick={() => loginAs('customer')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  currentUser.role === 'customer' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => loginAs('provider')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  currentUser.role === 'provider' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border'
                }`}
              >
                Provider
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(link.href) ? 'text-sky-600 bg-sky-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/dashboard/customer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
            >
              Customer Dashboard
            </Link>

            <Link
              href="/dashboard/provider"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl"
            >
              Provider Dashboard
            </Link>

            <Link
              href="/become-provider"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-sky-600 rounded-xl shadow-sm"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
