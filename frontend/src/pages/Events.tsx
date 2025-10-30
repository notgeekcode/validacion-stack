import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { EventFilters } from "@/components/EventFilters";
import { Link } from "react-router-dom";

const Events = () => {
  const { data: allEvents, isLoading } = useEvents();
  const [filters, setFilters] = useState<{ dateRange?: { from?: Date; to?: Date }; category?: string }>({});

  const filteredEvents = useMemo(() => {
    if (!allEvents) return [];
    
    let result = [...allEvents];
    
    if (filters.dateRange?.from) {
      result = result.filter(event => {
        const eventDate = event.startDate;
        const fromDate = filters.dateRange!.from!;
        const toDate = filters.dateRange?.to || fromDate;
        return eventDate >= fromDate && eventDate <= toDate;
      });
    }
    
    if (filters.category) {
      result = result.filter(event => event.category === filters.category);
    }
    
    return result;
  }, [allEvents, filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Calendario de Eventos</h1>
          <p className="text-muted-foreground">Descubrí qué pasa en Lavalleja</p>
        </div>

        <div className="mb-8">
          <EventFilters onFilterChange={setFilters} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filters.dateRange?.from || filters.category ? "Resultados" : "Próximos eventos"}
            </h2>
            {filteredEvents && (
              <Badge variant="secondary">{filteredEvents.length} eventos</Badge>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">Cargando eventos...</p>
            </div>
          ) : filteredEvents && filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Link key={event.id} to={`/eventos/${event.id}`}>
                  <Card className="p-6 hover:shadow-medium transition-base cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <Badge>{event.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {event.startDate.toLocaleDateString("es-UY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.startTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
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
};

export default Events;
