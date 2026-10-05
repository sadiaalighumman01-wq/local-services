export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  duration: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  profession: string;
  category: string;
  categorySlug: string;
  avatar: string;
  coverImage?: string;
  rating: number;
  reviewCount: number;
  city: string;
  area: string;
  experienceYears: number;
  startingPrice: number; // in PKR
  verified: boolean;
  featured?: boolean;
  completedJobs: number;
  phone: string;
  email: string;
  bio: string;
  skills: string[];
  services: ServiceItem[];
  portfolio: {
    title: string;
    imageUrl: string;
    description: string;
  }[];
  availability: {
    monday: 'available' | 'unavailable' | 'limited';
    tuesday: 'available' | 'unavailable' | 'limited';
    wednesday: 'available' | 'unavailable' | 'limited';
    thursday: 'available' | 'unavailable' | 'limited';
    friday: 'available' | 'unavailable' | 'limited';
    saturday: 'available' | 'unavailable' | 'limited';
    sunday: 'available' | 'unavailable' | 'limited';
  };
  workingHours: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  providerCount: number;
  startingPrice: number; // PKR
  popularServices: string[];
  bannerImage: string;
}

export interface Review {
  id: string;
  providerId: string;
  customerName: string;
  customerAvatar: string;
  customerCity: string;
  rating: number;
  date: string;
  comment: string;
  serviceName: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  providerId: string;
  providerName: string;
  providerProfession: string;
  providerAvatar: string;
  providerCity: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  date: string;
  time: string;
  price: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  comment: string;
  serviceTaken: string;
}
