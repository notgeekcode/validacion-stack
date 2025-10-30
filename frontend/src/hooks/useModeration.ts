import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Place, Event } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const moderationService = {
  async getPendingSubmissions(): Promise<{ places: Place[]; events: Event[] }> {
    const [placesResult, eventsResult] = await Promise.all([
      supabase
        .from("places")
        .select("*, profiles!places_merchant_id_fkey(name, email)")
        .eq("status", "pending"),
      supabase
        .from("events")
        .select("*, profiles!events_merchant_id_fkey(name, email)")
        .eq("status", "pending"),
    ]);

    if (placesResult.error) {
      toast({
        title: "Error al cargar lugares pendientes",
        description: placesResult.error.message,
        variant: "destructive",
      });
      throw placesResult.error;
    }

    if (eventsResult.error) {
      toast({
        title: "Error al cargar eventos pendientes",
        description: eventsResult.error.message,
        variant: "destructive",
      });
      throw eventsResult.error;
    }

    const places = (placesResult.data || []).map(place => ({
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

    const events = (eventsResult.data || []).map(event => ({
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

    return { places, events };
  },

  async approvePlace(id: string): Promise<void> {
    const { error } = await supabase
      .from("places")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error al aprobar lugar",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Lugar aprobado",
      description: "El lugar ha sido publicado exitosamente",
    });
  },

  async rejectPlace(id: string, reason: string): Promise<void> {
    const { error } = await supabase
      .from("places")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error al rechazar lugar",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Lugar rechazado",
      description: "El lugar ha sido rechazado",
    });
  },

  async approveEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from("events")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error al aprobar evento",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Evento aprobado",
      description: "El evento ha sido publicado exitosamente",
    });
  },

  async rejectEvent(id: string, reason: string): Promise<void> {
    const { error } = await supabase
      .from("events")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error al rechazar evento",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Evento rechazado",
      description: "El evento ha sido rechazado",
    });
  },
};

export const useModeration = () => {
  const queryClient = useQueryClient();

  const pendingSubmissions = useQuery({
    queryKey: ["pendingSubmissions"],
    queryFn: moderationService.getPendingSubmissions,
  });

  const approvePlaceMutation = useMutation({
    mutationFn: (id: string) => moderationService.approvePlace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });

  const rejectPlaceMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      moderationService.rejectPlace(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });

  const approveEventMutation = useMutation({
    mutationFn: (id: string) => moderationService.approveEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });

  const rejectEventMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      moderationService.rejectEvent(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingSubmissions"] });
    },
  });

  return {
    pendingPlaces: pendingSubmissions.data?.places || [],
    pendingEvents: pendingSubmissions.data?.events || [],
    isLoading: pendingSubmissions.isLoading,
    approvePlace: approvePlaceMutation.mutate,
    rejectPlace: rejectPlaceMutation.mutate,
    approveEvent: approveEventMutation.mutate,
    rejectEvent: rejectEventMutation.mutate,
  };
};
