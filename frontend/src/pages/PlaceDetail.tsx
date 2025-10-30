import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Star, ExternalLink } from "lucide-react";

const PlaceDetail = () => {
  const { id } = useParams();

  // Mock data - replace with real data fetch
  const place = {
    id,
    name: "Hotel Verdanza",
    category: "Alojamiento",
    location: "Minas, Lavalleja",
    rating: 4.5,
    description: "Hotel ubicado en el corazón de Minas, con vista a las sierras. Ofrece habitaciones confortables, desayuno incluido y estacionamiento gratuito.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    phone: "+598 4444 2345",
    email: "info@hotelverdanza.uy",
    hours: "Check-in: 14:00 | Check-out: 10:00",
    website: "www.hotelverdanza.uy",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="h-96 overflow-hidden bg-muted">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Badge variant="secondary">{place.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-accent text-accent" />
                        <span className="font-semibold">{place.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Descripción</h2>
                  <p className="text-muted-foreground">{place.description}</p>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Mapa de ubicación</p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{place.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{place.email}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{place.hours}</span>
                  </div>
                  {place.website && (
                    <div className="flex items-start gap-3">
                      <ExternalLink className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <a 
                        href={`https://${place.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {place.website}
                      </a>
                    </div>
                  )}
                </div>
                <Button className="w-full mt-6">
                  Contactar
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlaceDetail;
