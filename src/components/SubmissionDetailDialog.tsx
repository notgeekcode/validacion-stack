import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Place, Event } from "@/lib/types";
import { Check, X, MapPin, Calendar, Clock, Mail, Phone, Globe } from "lucide-react";

interface SubmissionDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: Place | Event | null;
  type: "place" | "event";
  onApprove: () => void;
  onReject: () => void;
}

export const SubmissionDetailDialog = ({
  open,
  onOpenChange,
  submission,
  type,
  onApprove,
  onReject,
}: SubmissionDetailDialogProps) => {
  if (!submission) return null;

  const isPlace = type === "place";
  const place = isPlace ? (submission as Place) : null;
  const event = !isPlace ? (submission as Event) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isPlace ? place?.name : event?.title}
          </DialogTitle>
          <DialogDescription>
            Revisá los detalles antes de aprobar o rechazar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Images */}
          {submission.images && submission.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {submission.images.slice(0, 4).map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Imagen ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Category & Zone */}
          <div className="flex gap-2">
            <Badge variant="secondary">{submission.category}</Badge>
            <Badge variant="outline">{submission.zone}</Badge>
            {place?.subcategory && (
              <Badge variant="outline">{place.subcategory}</Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground">{submission.description}</p>
          </div>

          {place && (
            <>
              {place.longDescription && (
                <div>
                  <h3 className="font-semibold mb-2">Descripción detallada</h3>
                  <p className="text-muted-foreground">{place.longDescription}</p>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-2">
                <h3 className="font-semibold">Información de contacto</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{place.address}</span>
                  </div>
                  {place.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{place.phone}</span>
                    </div>
                  )}
                  {place.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{place.email}</span>
                    </div>
                  )}
                  {place.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {place.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              {place.amenities && place.amenities.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Servicios</h3>
                  <div className="flex flex-wrap gap-2">
                    {place.amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {event && (
            <>
              {/* Event Details */}
              <div className="space-y-2">
                <h3 className="font-semibold">Detalles del evento</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {event.startDate.toLocaleDateString("es-UY")}
                      {event.endDate &&
                        ` - ${event.endDate.toLocaleDateString("es-UY")}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {event.startTime}
                      {event.endTime && ` - ${event.endTime}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Organizer & Price */}
              <div className="grid grid-cols-2 gap-4">
                {event.organizer && (
                  <div>
                    <h3 className="font-semibold mb-1">Organizador</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.organizer}
                    </p>
                  </div>
                )}
                {event.price && (
                  <div>
                    <h3 className="font-semibold mb-1">Precio</h3>
                    <p className="text-sm text-muted-foreground">{event.price}</p>
                  </div>
                )}
              </div>

              {/* Contact */}
              {event.contact && (
                <div>
                  <h3 className="font-semibold mb-2">Contacto</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {event.contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{event.contact.phone}</span>
                      </div>
                    )}
                    {event.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{event.contact.email}</span>
                      </div>
                    )}
                    {event.contact.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={event.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {event.contact.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button
            variant="ghost"
            className="gap-1 text-destructive hover:text-destructive"
            onClick={onReject}
          >
            <X className="h-4 w-4" />
            Rechazar
          </Button>
          <Button variant="default" className="gap-1" onClick={onApprove}>
            <Check className="h-4 w-4" />
            Aprobar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
