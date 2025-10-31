// src/pages/Events.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Link } from "react-router-dom";

export default function Events() {
  // Traemos eventos usando el hook que ya hicimos (FastAPI / mocks)
  const { data: events, isLoading, error } = useEvents(50);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Calendario de Eventos</h1>
          <p className="text-muted-foreground">Descubrí qué pasa en Lavalleja</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Próximos eventos</h2>
            <Badge variant="secondary">{events?.length ?? 0} eventos</Badge>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Cargando eventos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se pudieron cargar los eventos</p>
            </div>
          ) : events && events.length > 0 ? (
            <div className="space-y-4">
              {events.map((ev, idx) => (
                // Como nuestro hook devuelve EventoCard (sin id),
                // usamos el título como parte de la ruta (temporal).
                <Link key={`${ev.title}-${idx}`} to={`/eventos/${encodeURIComponent(ev.title)}`}>
                  <Card className="p-6 hover:shadow-medium transition-base cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold">{ev.title}</h3>
                      {ev.badge && <Badge>{ev.badge}</Badge>}
                    </div>
                    {ev.subtitle && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        {ev.subtitle}
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay eventos disponibles</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
