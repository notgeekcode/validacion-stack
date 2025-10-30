// Data Provider que alterna entre mocks y API real según USE_MOCKS
import { mockPlaces, mockEvents } from './mockData';
import { apiClient } from './api-client';
import { Place, Event, FilterOptions } from './types';

const USE_MOCKS = import.meta.env.USE_MOCKS === 'true';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataProvider = {
  // Places
  async getPlaces(filters?: FilterOptions): Promise<Place[]> {
    if (USE_MOCKS) {
      await delay(500);
      let filtered = [...mockPlaces];
      
      if (filters?.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          place =>
            place.name.toLowerCase().includes(query) ||
            place.description.toLowerCase().includes(query) ||
            place.zone.toLowerCase().includes(query)
        );
      }
      
      if (filters?.zone && filters.zone.length > 0) {
        filtered = filtered.filter(place => filters.zone!.includes(place.zone));
      }
      
      if (filters?.category && filters.category.length > 0) {
        filtered = filtered.filter(place => filters.category!.includes(place.category));
      }
      
      if (filters?.priceRange && filters.priceRange.length > 0) {
        filtered = filtered.filter(place => 
          place.priceRange && filters.priceRange!.includes(place.priceRange)
        );
      }
      
      if (filters?.rating) {
        filtered = filtered.filter(place => place.rating >= filters.rating!);
      }
      
      return filtered;
    }
    
    return apiClient.get<Place[]>('/places');
  },

  async getPlace(id: string): Promise<Place | undefined> {
    if (USE_MOCKS) {
      await delay(300);
      return mockPlaces.find(place => place.id === id);
    }
    
    return apiClient.get<Place>(`/places/${id}`);
  },

  async createPlace(place: Partial<Place>): Promise<Place> {
    if (USE_MOCKS) {
      await delay(800);
      return { ...place, id: Math.random().toString(36).substr(2, 9) } as Place;
    }
    
    return apiClient.post<Place>('/places', place);
  },

  async updatePlace(id: string, data: Partial<Place>): Promise<Place> {
    if (USE_MOCKS) {
      await delay(800);
      return { ...data, id } as Place;
    }
    
    return apiClient.put<Place>(`/places/${id}`, data);
  },

  async deletePlace(id: string): Promise<void> {
    if (USE_MOCKS) {
      await delay(500);
      return;
    }
    
    return apiClient.delete(`/places/${id}`);
  },

  // Events
  async getEvents(filters?: { zone?: string; category?: string }): Promise<Event[]> {
    if (USE_MOCKS) {
      await delay(500);
      let filtered = [...mockEvents];
      
      if (filters?.zone) {
        filtered = filtered.filter(event => event.zone === filters.zone);
      }
      
      if (filters?.category) {
        filtered = filtered.filter(event => event.category === filters.category);
      }
      
      return filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
    
    return apiClient.get<Event[]>('/events');
  },

  async getEvent(id: string): Promise<Event | undefined> {
    if (USE_MOCKS) {
      await delay(300);
      return mockEvents.find(event => event.id === id);
    }
    
    return apiClient.get<Event>(`/events/${id}`);
  },

  async createEvent(event: Partial<Event>): Promise<Event> {
    if (USE_MOCKS) {
      await delay(800);
      return { ...event, id: Math.random().toString(36).substr(2, 9) } as Event;
    }
    
    return apiClient.post<Event>('/events', event);
  },

  async updateEvent(id: string, data: Partial<Event>): Promise<Event> {
    if (USE_MOCKS) {
      await delay(800);
      return { ...data, id } as Event;
    }
    
    return apiClient.put<Event>(`/events/${id}`, data);
  },

  async deleteEvent(id: string): Promise<void> {
    if (USE_MOCKS) {
      await delay(500);
      return;
    }
    
    return apiClient.delete(`/events/${id}`);
  },
};
