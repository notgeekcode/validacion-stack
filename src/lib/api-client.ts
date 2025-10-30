// API Client central que maneja llamadas HTTP y toggle entre mocks/API real
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.turismolavalleja.com/api';
const USE_MOCKS = import.meta.env.USE_MOCKS === 'true';

export interface ApiError {
  message: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private useMocks: boolean;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.useMocks = USE_MOCKS;
  }

  async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    if (this.useMocks) {
      throw new Error('Mock mode: Use mock data providers instead of API calls');
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw {
          message: `API Error: ${response.statusText}`,
          status: response.status,
        } as ApiError;
      }

      return response.json();
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: 'Network error',
        status: 0,
      } as ApiError;
    }
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  isUsingMocks(): boolean {
    return this.useMocks;
  }
}

export const apiClient = new ApiClient();
