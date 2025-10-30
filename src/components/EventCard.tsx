import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      cultural: "Cultural",
      deportivo: "Deportivo",
      gastronomico: "Gastronómico",
      familiar: "Familiar"
    };
    return labels[category] || category;
  };

  return (
    <Link to={`/eventos/${event.id}`} className="block group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={event.images[0]} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <Badge className="absolute top-3 left-3" variant="secondary">
            {getCategoryLabel(event.category)}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(event.startDate, "d 'de' MMMM", { locale: es })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.startTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{event.zone}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
