import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const fetchEvents = async (filters?: { zone?: string; category?: string }): Promise<Event[]> => {
  let query = supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true });
  
  if (filters?.zone) {
    query = query.eq("zone", filters.zone);
  }
  
  if (filters?.category) {
    query = query.eq("category", filters.category as any);
  }

  const { data, error } = await query;
  
  if (error) {
    toast({
      title: "Error al cargar eventos",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  return (data || []).map(event => ({
    ...event,
    images: (event.images as any) || [],
    contact: event.contact as any,
    coordinates: {
      lat: Number(event.latitude),
      lng: Number(event.longitude),
    },
    startDate: new Date(event.start_date),
    endDate: event.end_date ? new Date(event.end_date) : undefined,
    startTime: event.start_time,
    endTime: event.end_time || undefined,
    createdAt: new Date(event.created_at),
    updatedAt: new Date(event.updated_at),
  }));
};

const fetchEvent = async (id: string): Promise<Event | undefined> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  
  if (error) {
    toast({
      title: "Error al cargar evento",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }

  if (!data) return undefined;

  return {
    ...data,
    images: (data.images as any) || [],
    contact: data.contact as any,
    coordinates: {
      lat: Number(data.latitude),
      lng: Number(data.longitude),
    },
    startDate: new Date(data.start_date),
    endDate: data.end_date ? new Date(data.end_date) : undefined,
    startTime: data.start_time,
    endTime: data.end_time || undefined,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
};

// Hook to fetch all events with filters
export const useEvents = (filters?: { zone?: string; category?: string }) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: () => fetchEvents(filters),
  });
};

// Hook to fetch a single event
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (event: Partial<Event>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Debes iniciar sesión para crear un evento");
      }

      const { data, error } = await supabase
        .from("events")
        .insert({
          title: event.title!,
          description: event.description!,
          category: event.category!,
          zone: event.zone!,
          location: event.location!,
          latitude: event.coordinates!.lat,
          longitude: event.coordinates!.lng,
          start_date: event.startDate!.toISOString().split('T')[0],
          end_date: event.endDate ? event.endDate.toISOString().split('T')[0] : null,
          start_time: event.startTime!,
          end_time: event.endTime,
          images: event.images || [],
          organizer: event.organizer,
          contact: event.contact,
          price: event.price,
          merchant_id: user.id,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error al crear evento",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Evento creado",
        description: "Tu evento está pendiente de aprobación",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data: event }: { id: string; data: Partial<Event> }) => {
      const updateData: any = {};
      
      if (event.title !== undefined) updateData.title = event.title;
      if (event.description !== undefined) updateData.description = event.description;
      if (event.category !== undefined) updateData.category = event.category;
      if (event.zone !== undefined) updateData.zone = event.zone;
      if (event.location !== undefined) updateData.location = event.location;
      if (event.coordinates !== undefined) {
        updateData.latitude = event.coordinates.lat;
        updateData.longitude = event.coordinates.lng;
      }
      if (event.startDate !== undefined) updateData.start_date = event.startDate.toISOString().split('T')[0];
      if (event.endDate !== undefined) updateData.end_date = event.endDate ? event.endDate.toISOString().split('T')[0] : null;
      if (event.startTime !== undefined) updateData.start_time = event.startTime;
      if (event.endTime !== undefined) updateData.end_time = event.endTime;
      if (event.images !== undefined) updateData.images = event.images;
      if (event.organizer !== undefined) updateData.organizer = event.organizer;
      if (event.contact !== undefined) updateData.contact = event.contact;
      if (event.price !== undefined) updateData.price = event.price;

      const { data, error } = await supabase
        .from("events")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error al actualizar evento",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Evento actualizado",
        description: "Los cambios están pendientes de aprobación",
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      if (error) {
        toast({
          title: "Error al eliminar evento",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Evento eliminado",
        description: "El evento ha sido eliminado exitosamente",
      });

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
