// src/hooks/useEvents.ts
// Hooks React para traer y manipular eventos, adaptados a tu backend FastAPI (sin Supabase)

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listFeaturedEvents, type EventoCard } from "@/lib/api";

/**
 * Hook que obtiene la lista de eventos destacados desde FastAPI.
 */
export function useEvents(limit = 12) {
  const [data, setData] = useState<EventoCard[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancel = false;
    setIsLoading(true);

    listFeaturedEvents(limit)
      .then((rows) => {
        if (!cancel) setData(rows);
      })
      .catch((e) => {
        if (!cancel) setError(e);
        console.error("[useEvents] Error:", e);
      })
      .finally(() => {
        if (!cancel) setIsLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [limit]);

  return { data, isLoading, error };
}

/**
 * Hook que obtiene un solo evento por ID (mock simple)
 */
export function useEvent(id: string) {
  const [data, setData] = useState<EventoCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;

    let cancel = false;
    setIsLoading(true);

    listFeaturedEvents(50)
      .then((rows) => {
        if (cancel) return;
        const found = rows.find((e) => e.title === id || e.badge === id);
        setData(found || null);
      })
      .catch((e) => {
        if (!cancel) setError(e);
        console.error("[useEvent] Error:", e);
      })
      .finally(() => {
        if (!cancel) setIsLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [id]);

  return { data, isLoading, error };
}

/* ========================================
   STUBS para mutaciones (crear, borrar)
   ======================================== */

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_event: Partial<EventoCard>) => {
      // Aquí más adelante: POST a FastAPI /eventos
      throw new Error("Crear evento no está disponible en esta versión (stub).");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      // Aquí más adelante: DELETE a FastAPI /eventos/{id}
      throw new Error("Eliminar evento no está disponible en esta versión (stub).");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
