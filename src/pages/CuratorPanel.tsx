import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Loader2 } from "lucide-react";
import { useModeration } from "@/hooks/useModeration";
import { SubmissionDetailDialog } from "@/components/SubmissionDetailDialog";
import { RejectDialog } from "@/components/RejectDialog";
import { Place, Event } from "@/lib/types";

const CuratorPanel = () => {
  const {
    pendingPlaces,
    pendingEvents,
    isLoading,
    approvePlace,
    rejectPlace,
    approveEvent,
    rejectEvent,
  } = useModeration();

  const [detailsDialog, setDetailsDialog] = useState<{
    open: boolean;
    submission: Place | Event | null;
    type: "place" | "event";
  }>({
    open: false,
    submission: null,
    type: "place",
  });

  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    id: string;
    name: string;
    type: "place" | "event";
  }>({
    open: false,
    id: "",
    name: "",
    type: "place",
  });

  const handleViewDetails = (submission: Place | Event, type: "place" | "event") => {
    setDetailsDialog({ open: true, submission, type });
  };

  const handleApprove = (id: string, type: "place" | "event") => {
    if (type === "place") {
      approvePlace(id);
    } else {
      approveEvent(id);
    }
    setDetailsDialog({ open: false, submission: null, type: "place" });
  };

  const handleRejectClick = (id: string, name: string, type: "place" | "event") => {
    setRejectDialog({ open: true, id, name, type });
    setDetailsDialog({ open: false, submission: null, type: "place" });
  };

  const handleRejectConfirm = (reason: string) => {
    if (rejectDialog.type === "place") {
      rejectPlace({ id: rejectDialog.id, reason });
    } else {
      rejectEvent({ id: rejectDialog.id, reason });
    }
  };

  const totalPending = pendingPlaces.length + pendingEvents.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Curador</h1>
          <p className="text-muted-foreground">
            Revisá y aprobá nuevas publicaciones
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Pendientes de aprobación</h2>
          <Badge variant="secondary">{totalPending} pendientes</Badge>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : totalPending === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No hay publicaciones pendientes de aprobación
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Pending Places */}
            {pendingPlaces.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Lugares ({pendingPlaces.length})
                </h3>
                {pendingPlaces.map((place) => (
                  <Card key={place.id} className="p-6 shadow-soft">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold">{place.name}</h3>
                          <Badge>{place.category}</Badge>
                          {place.subcategory && (
                            <Badge variant="outline">{place.subcategory}</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            Zona: <span className="font-medium">{place.zone}</span>
                          </p>
                          <p>
                            Enviado:{" "}
                            <span className="font-medium">
                              {place.createdAt.toLocaleDateString("es-UY")}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleViewDetails(place, "place")}
                        >
                          <Eye className="h-4 w-4" />
                          Ver detalles
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApprove(place.id, "place")}
                        >
                          <Check className="h-4 w-4" />
                          Aprobar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() =>
                            handleRejectClick(place.id, place.name, "place")
                          }
                        >
                          <X className="h-4 w-4" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pending Events */}
            {pendingEvents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Eventos ({pendingEvents.length})
                </h3>
                {pendingEvents.map((event) => (
                  <Card key={event.id} className="p-6 shadow-soft">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <Badge>{event.category}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            Fecha:{" "}
                            <span className="font-medium">
                              {event.startDate.toLocaleDateString("es-UY")}
                            </span>
                          </p>
                          <p>
                            Zona: <span className="font-medium">{event.zone}</span>
                          </p>
                          <p>
                            Enviado:{" "}
                            <span className="font-medium">
                              {event.createdAt.toLocaleDateString("es-UY")}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleViewDetails(event, "event")}
                        >
                          <Eye className="h-4 w-4" />
                          Ver detalles
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleApprove(event.id, "event")}
                        >
                          <Check className="h-4 w-4" />
                          Aprobar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() =>
                            handleRejectClick(event.id, event.title, "event")
                          }
                        >
                          <X className="h-4 w-4" />
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dialogs */}
        <SubmissionDetailDialog
          open={detailsDialog.open}
          onOpenChange={(open) =>
            setDetailsDialog({ open, submission: null, type: "place" })
          }
          submission={detailsDialog.submission}
          type={detailsDialog.type}
          onApprove={() =>
            detailsDialog.submission &&
            handleApprove(detailsDialog.submission.id, detailsDialog.type)
          }
          onReject={() =>
            detailsDialog.submission &&
            handleRejectClick(
              detailsDialog.submission.id,
              detailsDialog.type === "place"
                ? (detailsDialog.submission as Place).name
                : (detailsDialog.submission as Event).title,
              detailsDialog.type
            )
          }
        />

        <RejectDialog
          open={rejectDialog.open}
          onOpenChange={(open) =>
            setRejectDialog({ ...rejectDialog, open })
          }
          onConfirm={handleRejectConfirm}
          itemName={rejectDialog.name}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CuratorPanel;
