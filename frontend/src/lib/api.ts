// frontend/src/lib/api.ts
// Capa mínima para hablar con FastAPI (sin Supabase)

export type PlaceCard = {
  title: string;
  imageUrl: string;
  subtitle?: string;
  badge?: string;
};

export type EventoCard = {
  title: string;
  imageUrl: string;
  subtitle?: string; // p.ej. fecha formateada
  badge?: string;    // p.ej. categoría
};

// Tipos “like” para mapear sin romper si cambian los nombres
type ComercioDTO = {
  nombre?: string;
  title?: string;
  imagen_url?: string;
  imageUrl?: string;
  ciudad?: string;
  subtitulo?: string;
  descripcion?: string;
  categoria?: string;
  tipo?: string;
};

type EventoDTO = {
  nombre?: string;
  titulo?: string;
  imagen_url?: string;
  imageUrl?: string;
  fecha_inicio?: string;
  fecha?: string;
  date?: string;
  subtitulo?: string;
  categoria?: string;
  category?: string;
};

// El backend puede devolver array o paginado
type ApiArray<T> =
  | T[]
  | { items: T[]; total?: number }
  | { data: T[]; total?: number };

// Helper para extraer el array sin errores de TS
function pickArray<T>(d: ApiArray<T>): T[] {
  if (Array.isArray(d)) return d;
  if ("items" in d && Array.isArray((d as { items?: T[] }).items)) {
    return (d as { items?: T[] }).items ?? [];
  }
  if ("data" in d && Array.isArray((d as { data?: T[] }).data)) {
    return (d as { data?: T[] }).data ?? [];
  }
  return [];
}


const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") || "";

/**
 * Utilidad básica de fetch con manejo de errores.
 */
async function apiGet<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await safeText(res);
    throw new Error(`GET ${path} -> ${res.status} ${res.statusText}${msg ? ` - ${msg}` : ""}`);
  }
  return res.json() as Promise<T>;
}

async function safeText(r: Response) {
  try {
    return await r.text();
  } catch {
    return "";
  }
}

/**
 * Mapeos a las cards del front.
 */
function mapComercioToCard(c: ComercioDTO): PlaceCard {
  return {
    title: c.nombre || c.title || "Comercio",
    imageUrl: c.imagen_url || c.imageUrl || "/placeholder.jpg",
    subtitle: c.ciudad || c.subtitulo || c.descripcion?.slice?.(0, 90) || "",
    badge: c.categoria || c.tipo || undefined,
  };
}

function mapEventoToCard(e: EventoDTO): EventoCard {
  const fecha = e.fecha_inicio || e.fecha || e.date || null;
  const cat = e.categoria || e.category || undefined;
  return {
    title: e.nombre || e.titulo || "Evento",
    imageUrl: e.imagen_url || e.imageUrl || "/placeholder.jpg",
    subtitle: fecha ? new Date(fecha).toLocaleDateString() : e.subtitulo || "",
    badge: cat,
  };
}

/**
 * Lugares destacados -> usa /comercios
 */
export async function listFeaturedPlaces(limit = 6): Promise<PlaceCard[]> {
  try {
    const data = await apiGet<ApiArray<ComercioDTO>>("/comercios?page=1&page_size=50");
    const items = pickArray<ComercioDTO>(data);
    return items.slice(0, limit).map(mapComercioToCard);
  } catch (err) {
    console.warn("[listFeaturedPlaces] fallback mock por error:", err);
    return mockPlaces().slice(0, limit);
  }
}

/**
 * Eventos destacados -> usa /eventos
 */
export async function listFeaturedEvents(limit = 6): Promise<EventoCard[]> {
  try {
    const data = await apiGet<ApiArray<EventoDTO>>("/eventos?page=1&page_size=50");
    const items = pickArray<EventoDTO>(data);
    return items.slice(0, limit).map(mapEventoToCard);
  } catch (err) {
    console.warn("[listFeaturedEvents] fallback mock por error:", err);
    return mockEvents().slice(0, limit);
  }
}

/* ------------------------------
   MOCKS de respaldo (por si API falla)
--------------------------------- */

function mockPlaces(): PlaceCard[] {
  return [
    {
      title: "Cerro Arequita",
      imageUrl:
        "https://images.unsplash.com/photo-1502920514313-52581002a659?w=1200&q=80&auto=format&fit=crop",
      subtitle: "Minas, Lavalleja",
      badge: "Naturaleza",
    },
    {
      title: "Parque Salto del Penitente",
      imageUrl:
        "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=80&auto=format&fit=crop",
      subtitle: "Cascadas y senderismo",
      badge: "Aventura",
    },
    {
      title: "Villa Serrana",
      imageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
      subtitle: "Cabañas y descanso",
      badge: "Escapadas",
    },
  ];
}

function mockEvents(): EventoCard[] {
  const today = new Date();
  const in3 = new Date(today.getTime() + 3 * 24 * 3600 * 1000);
  const in10 = new Date(today.getTime() + 10 * 24 * 3600 * 1000);
  return [
    {
      title: "Feria Gastronómica Serrana",
      imageUrl:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80&auto=format&fit=crop",
      subtitle: in3.toLocaleDateString(),
      badge: "Gastronómico",
    },
    {
      title: "Festival de Música en Minas",
      imageUrl:
        "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=1200&q=80&auto=format&fit=crop",
      subtitle: in10.toLocaleDateString(),
      badge: "Cultural",
    },
  ];
}
