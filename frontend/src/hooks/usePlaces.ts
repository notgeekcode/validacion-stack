// src/hooks/usePlaces.ts
// Hooks React sin Supabase: leen desde tu API (via lib/api) y exponen stubs para mutaciones.

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listFeaturedPlaces, type PlaceCard } from "@/lib/api";

// Tipo mínimo para adaptarnos al resto del front (no es el modelo real de BD)
export type Place = {
  id?: string;
  name: string;
  category?: string;
  subcategory?: string;
  description?: string;
  longDescription?: string;
  zone?: string;
  address?: string;
  images?: string[];
  image?: string;
  rating?: number;
};

export type FilterOptions = {
  searchQuery?: string;
  zone?: string[];
  category?: string[];
  priceRange?: string[];
  rating?: number;
};

async function fetchPlaces(_filters?: FilterOptions): Promise<Place[]> {
  // De momento, usamos la lista de “destacados” y la mapeamos a Place
  const rows: PlaceCard[] = await listFeaturedPlaces(50);

  return rows.map((p, idx) => ({
    id: String(idx + 1),
    name: p.title,
    category: p.badge,
    zone: p.subtitle,
    address: p.subtitle,
    images: p.imageUrl ? [p.imageUrl] : [],
    image: p.imageUrl,
    description: p.subtitle,
  }));
}

export function usePlaces(filters?: FilterOptions) {
  return useQuery({
    queryKey: ["places", filters],
    queryFn: () => fetchPlaces(filters),
  });
}

/* ============================
   STUBS DE MUTACIONES (placeholder)
   ============================ */

// Crear lugar (placeholder)
export function useCreatePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_place: Partial<Place>) => {
      // Acá más adelante: POST a FastAPI /comercios
      throw new Error("Crear lugar no está disponible en esta versión (stub).");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

// Actualizar lugar (placeholder)
export function useUpdatePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_args: { id: string; data: Partial<Place> }) => {
      // Acá más adelante: PUT/PATCH a FastAPI /comercios/{id}
      throw new Error("Actualizar lugar no está disponible en esta versión (stub).");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}

// Borrar lugar (placeholder)
export function useDeletePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_id: string) => {
      // Acá más adelante: DELETE a FastAPI /comercios/{id}
      throw new Error("Eliminar lugar no está disponible en esta versión (stub).");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
}
