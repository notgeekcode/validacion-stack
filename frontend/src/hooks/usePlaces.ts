import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Place, FilterOptions } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const fetchPlaces = async (filters?: FilterOptions): Promise<Place[]> => {
  let query = supabase
    .from("places")
    .select("*");
  
  // Apply filters
  if (filters?.searchQuery) {
    const searchTerm = filters.searchQuery.toLowerCase();
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,zone.ilike.%${searchTerm}%`);
  }
  
  if (filters?.zone && filters.zone.length > 0) {
    query = query.in("zone", filters.zone);
  }
  
  if (filters?.category && filters.category.length > 0) {
    query = query.in("category", filters.category as any);
  }
  
  if (filters?.priceRange && filters.priceRange.length > 0) {
    query = query.in("price_range", filters.priceRange);
  }
  
  if (filters?.rating) {
    query = query.gte("rating", filters.rating);
  }

  const { data, error } = await query;
  
  if (error) {
    toast({
      title: "Error al cargar lugares",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return (data || []).map(place => ({
    ...place,
    images: (place.images as any) || [],
    hours: place.hours as any,
    coordinates: {
      lat: Number(place.latitude),
      lng: Number(place.longitude),
    },
    priceRange: place.price_range as "$" | "$$" | "$$$" | undefined,
    createdAt: new Date(place.created_at),
    updatedAt: new Date(place.updated_at),
  }));
};

const fetchPlace = async (id: string): Promise<Place | undefined> => {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  
  if (error) {
    toast({
      title: "Error al cargar lugar",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  if (!data) return undefined;

  return {
    ...data,
    images: (data.images as any) || [],
    hours: data.hours as any,
    coordinates: {
      lat: Number(data.latitude),
      lng: Number(data.longitude),
    },
    priceRange: data.price_range as "$" | "$$" | "$$$" | undefined,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
};

// Hook to fetch all places with filters
export const usePlaces = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ["places", filters],
    queryFn: () => fetchPlaces(filters),
  });
};

// Hook to fetch a single place
export const usePlace = (id: string) => {
  return useQuery({
    queryKey: ["place", id],
    queryFn: () => fetchPlace(id),
    enabled: !!id,
  });
};

export const useCreatePlace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (place: Partial<Place>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Debes iniciar sesión para crear un lugar");
      }

      const { data, error } = await supabase
        .from("places")
        .insert({
          name: place.name!,
          category: place.category!,
          subcategory: place.subcategory,
          description: place.description!,
          long_description: place.longDescription,
          zone: place.zone!,
          address: place.address!,
          latitude: place.coordinates!.lat,
          longitude: place.coordinates!.lng,
          phone: place.phone,
          email: place.email,
          website: place.website,
          images: place.images || [],
          price_range: place.priceRange,
          hours: place.hours,
          amenities: place.amenities,
          merchant_id: user.id,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error al crear lugar",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Lugar creado",
        description: "Tu lugar está pendiente de aprobación",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};

export const useUpdatePlace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data: place }: { id: string; data: Partial<Place> }) => {
      const updateData: any = {};
      
      if (place.name !== undefined) updateData.name = place.name;
      if (place.category !== undefined) updateData.category = place.category;
      if (place.subcategory !== undefined) updateData.subcategory = place.subcategory;
      if (place.description !== undefined) updateData.description = place.description;
      if (place.longDescription !== undefined) updateData.long_description = place.longDescription;
      if (place.zone !== undefined) updateData.zone = place.zone;
      if (place.address !== undefined) updateData.address = place.address;
      if (place.coordinates !== undefined) {
        updateData.latitude = place.coordinates.lat;
        updateData.longitude = place.coordinates.lng;
      }
      if (place.phone !== undefined) updateData.phone = place.phone;
      if (place.email !== undefined) updateData.email = place.email;
      if (place.website !== undefined) updateData.website = place.website;
      if (place.images !== undefined) updateData.images = place.images;
      if (place.priceRange !== undefined) updateData.price_range = place.priceRange;
      if (place.hours !== undefined) updateData.hours = place.hours;
      if (place.amenities !== undefined) updateData.amenities = place.amenities;

      const { data, error } = await supabase
        .from("places")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error al actualizar lugar",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Lugar actualizado",
        description: "Los cambios están pendientes de aprobación",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};

export const useDeletePlace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("places")
        .delete()
        .eq("id", id);

      if (error) {
        toast({
          title: "Error al eliminar lugar",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Lugar eliminado",
        description: "El lugar ha sido eliminado exitosamente",
      });

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};
