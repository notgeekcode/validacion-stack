import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone, Mail, Globe, ArrowLeft } from "lucide-react";
import { useEvent } from "@/hooks/useEvents";
import { Helmet } from "react-helmet-async";

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Cargando evento...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Evento no encontrado</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{event.title} - Turismo Lavalleja</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        {event.images[0] && <meta property="og:image" content={event.images[0]} />}
      </Helmet>

      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            {event.images[0] && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={event.images[0]} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold">{event.title}</h1>
                <Badge>{event.category}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{event.description}</p>
            </div>

            {/* Additional Images */}
            {event.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {event.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${event.title} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Información del evento</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Fecha</p>
                    <p className="text-sm text-muted-foreground">
                      {event.startDate.toLocaleDateString("es-UY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {event.endDate && ` - ${event.endDate.toLocaleDateString("es-UY", {
                        month: "long",
                        day: "numeric",
                      })}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-sm text-muted-foreground">
                      {event.startTime}
                      {event.endTime && ` - ${event.endTime}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                    <p className="text-sm text-muted-foreground">{event.zone}</p>
                  </div>
                </div>

                {event.price && (
                  <div className="pt-4 border-t">
                    <p className="font-medium mb-1">Precio</p>
                    <p className="text-sm text-muted-foreground">{event.price}</p>
                  </div>
                )}

                {event.organizer && (
                  <div className="pt-4 border-t">
                    <p className="font-medium mb-1">Organizador</p>
                    <p className="text-sm text-muted-foreground">{event.organizer}</p>
                  </div>
                )}
              </div>
            </Card>

            {event.contact && (
              <Card className="p-6 shadow-soft">
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <div className="space-y-3">
                  {event.contact.phone && (
                    <a 
                      href={`tel:${event.contact.phone}`}
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {event.contact.phone}
                    </a>
                  )}
                  {event.contact.email && (
                    <a 
                      href={`mailto:${event.contact.email}`}
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {event.contact.email}
                    </a>
                  )}
                  {event.contact.website && (
                    <a 
                      href={event.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Sitio web
                    </a>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
