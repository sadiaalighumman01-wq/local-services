'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Provider, Review } from '@/types';
import { INITIAL_BOOKINGS, PROVIDERS, REVIEWS } from '@/data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: 'customer' | 'provider' | 'guest';
  avatar: string;
}

interface AppContextType {
  favorites: string[];
  toggleFavorite: (providerId: string) => void;
  isFavorite: (providerId: string) => boolean;
  savedProviders: Provider[];

  bookings: Booking[];
  addBooking: (data: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;

  reviews: Review[];
  addReview: (data: Omit<Review, 'id' | 'date'>) => void;

  currentUser: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  loginAs: (role: 'customer' | 'provider') => void;
  logout: () => void;

  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  searchCategory: string;
  setSearchCategory: (category: string) => void;
}

const defaultCustomer: UserProfile = {
  id: 'cust-1',
  name: 'Zubair Tariq',
  email: 'zubair.tariq@gmail.com',
  phone: '+92 300 4455667',
  city: 'Lahore',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
};

const defaultProvider: UserProfile = {
  id: 'prov-1',
  name: 'Ahmed Khan',
  email: 'ahmed.plumbing.pk@gmail.com',
  phone: '+92 300 1234567',
  city: 'Lahore',
  role: 'provider',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(['prov-1', 'prov-3', 'prov-5']);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultCustomer);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  // Load persisted favorites, bookings, reviews and user from localStorage on client
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('servicehub_favorites');
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      const storedBookings = localStorage.getItem('servicehub_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
      const storedReviews = localStorage.getItem('servicehub_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
      const storedUser = localStorage.getItem('servicehub_user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch {
      // Fallback to default state
    }
  }, []);

  const toggleFavorite = (providerId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(providerId);
      const updated = exists ? prev.filter((id) => id !== providerId) : [...prev, providerId];
      try {
        localStorage.setItem('servicehub_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      const provider = PROVIDERS.find((p) => p.id === providerId);
      const name = provider ? provider.name : 'Professional';
      if (!exists) {
        showToast('Saved to Favorites', `${name} has been added to your saved list.`, 'success');
      } else {
        showToast('Removed from Favorites', `${name} was removed from your saved list.`, 'info');
      }
      return updated;
    });
  };

  const isFavorite = (providerId: string) => favorites.includes(providerId);

  const savedProviders = PROVIDERS.filter((p) => favorites.includes(p.id));

  const addBooking = (data: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Booking => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      bookingCode: `SH-${randomCode}`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('servicehub_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast(
      'Booking Request Created',
      `Your request for ${data.serviceName} with ${data.providerName} is submitted!`,
      'success'
    );

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status } : b));
      try {
        localStorage.setItem('servicehub_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast('Status Updated', `Booking status changed to ${status}.`, 'info');
  };

  const addReview = (data: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };

    setReviews((prev) => {
      const updated = [newReview, ...prev];
      try {
        localStorage.setItem('servicehub_reviews', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast('Review Submitted', 'Thank you for your rating & feedback!', 'success');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...profile };
      try {
        localStorage.setItem('servicehub_user', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('Profile Saved', 'Your profile details have been updated.', 'success');
  };

  const loginAs = (role: 'customer' | 'provider') => {
    const user = role === 'provider' ? defaultProvider : defaultCustomer;
    setCurrentUser(user);
    try {
      localStorage.setItem('servicehub_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    showToast('Welcome Back!', `Signed in as ${user.name} (${role}).`, 'success');
  };

  const logout = () => {
    const guest: UserProfile = {
      id: 'guest',
      name: 'Guest User',
      email: '',
      phone: '',
      city: '',
      role: 'guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };
    setCurrentUser(guest);
    try {
      localStorage.removeItem('servicehub_user');
    } catch {
      // ignore
    }
    showToast('Signed Out', 'You have been logged out.', 'info');
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        savedProviders,
        bookings,
        addBooking,
        updateBookingStatus,
        reviews,
        addReview,
        currentUser,
        updateUserProfile,
        loginAs,
        logout,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        searchLocation,
        setSearchLocation,
        searchCategory,
        setSearchCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
