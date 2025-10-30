// Core types for the tourism portal

export type Role = "tourist" | "merchant" | "curator" | "analyst";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
}

export interface Place {
  id: string;
  name: string;
  category: "alojamiento" | "gastronomia" | "actividades";
  subcategory?: string;
  description: string;
  longDescription?: string;
  zone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  website?: string;
  images: string[];
  rating: number;
  priceRange?: "$" | "$$" | "$$$";
  hours?: {
    [key: string]: string;
  };
  amenities?: string[];
  merchantId?: string;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: "cultural" | "deportivo" | "gastronomico" | "familiar";
  zone: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  startDate: Date;
  endDate?: Date;
  startTime: string;
  endTime?: string;
  images: string[];
  organizer?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  price?: string;
  merchantId?: string;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterOptions {
  zone?: string[];
  category?: string[];
  priceRange?: string[];
  rating?: number;
  searchQuery?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface KpiResponse {
  totalPlaces: number;
  totalEvents: number;
  totalUsers: number;
  totalSearches: number;
  topZones: Array<{ zone: string; count: number }>;
  topCategories: Array<{ category: string; count: number }>;
  recentActivity: Array<{
    type: string;
    timestamp: Date;
    description: string;
  }>;
}
