import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormData } from "@/lib/validations";
import { useEvents, useCreateEvent, useDeleteEvent } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ImageUploadField } from "@/components/ImageUploadField";

const MerchantEventPanel = () => {
  const { user } = useAuth();
  const { data: events, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      latitude: -34.3804,
      longitude: -55.2364,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    if (imageUrls.length === 0) {
      toast({
        title: "Falta información",
        description: "Debés subir al menos una imagen",
        variant: "destructive",
      });
      return;
    }

    try {
      await createEvent.mutateAsync({
        ...data,
        coordinates: {
          lat: data.latitude,
          lng: data.longitude,
        },
        images: imageUrls,
        status: "pending",
      });
      reset();
      setImageUrls([]);
      toast({
        title: "Evento enviado",
        description: "Tu evento está en revisión y será visible pronto",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleDelete = async (id: string, status: string) => {
    if (status !== "pending") {
      toast({
        title: "No se puede eliminar",
        description: "Solo puedes eliminar eventos pendientes",
        variant: "destructive",
      });
      return;
    }

    if (confirm("¿Estás seguro de eliminar este evento?")) {
      await deleteEvent.mutateAsync(id);
    }
  };

  const myEvents = events?.filter(e => e.merchantId === user?.id) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Mis Eventos</h1>
              <p className="text-muted-foreground">
                Gestioná los eventos de tu emprendimiento
              </p>
            </div>
            <Link to="/panel-comerciante">
              <Button variant="outline">Volver a lugares</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-soft">
              <h2 className="text-2xl font-semibold mb-6">Crear nuevo evento</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del evento</Label>
                    <Input 
                      id="title" 
                      placeholder="Ej: Festival Gastronómico" 
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select onValueChange={(value) => setValue("category", value as any)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="deportivo">Deportivo</SelectItem>
                        <SelectItem value="gastronomico">Gastronómico</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de inicio</Label>
                    <Input 
                      id="startDate" 
                      type="date" 
                      {...register("startDate", {
                        setValueAs: (v) => v ? new Date(v) : undefined,
                      })}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-destructive">{errors.startDate.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Hora de inicio</Label>
                    <Input 
                      id="startTime" 
                      type="time" 
                      {...register("startTime")}
                    />
                    {errors.startTime && (
                      <p className="text-sm text-destructive">{errors.startTime.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input 
                      id="location" 
                      placeholder="Ej: Plaza Libertad" 
                      {...register("location")}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zone">Zona</Label>
                    <Select onValueChange={(value) => setValue("zone", value)}>
                      <SelectTrigger id="zone">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="minas">Minas</SelectItem>
                        <SelectItem value="villa-serrana">Villa Serrana</SelectItem>
                        <SelectItem value="cerro-colorado">Cerro Colorado</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.zone && (
                      <p className="text-sm text-destructive">{errors.zone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describí el evento..."
                    rows={4}
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <Input 
                      id="price" 
                      placeholder="Ej: $500 o Entrada libre" 
                      {...register("price")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizador</Label>
                    <Input 
                      id="organizer" 
                      placeholder="Nombre del organizador" 
                      {...register("organizer")}
                    />
                  </div>
                </div>

                <ImageUploadField
                  value={imageUrls}
                  onChange={setImageUrls}
                  bucketName="event-images"
                  maxImages={6}
                  label="Imágenes del evento"
                />

                <Button
                  type="submit" 
                  className="w-full gap-2"
                  disabled={createEvent.isPending}
                >
                  {createEvent.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Enviar evento para aprobación
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* My Events List */}
          <div>
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Mis eventos
              </h3>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : myEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Aún no has creado ningún evento
                </p>
              ) : (
                <div className="space-y-3">
                  {myEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-base"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{event.category}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.startDate.toLocaleDateString("es-UY")}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            event.status === "approved" 
                              ? "default" 
                              : event.status === "pending" 
                              ? "secondary" 
                              : "destructive"
                          }
                        >
                          {event.status === "approved" 
                            ? "Publicado" 
                            : event.status === "pending" 
                            ? "Pendiente" 
                            : "Rechazado"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          disabled={event.status !== "pending"}
                        >
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1 text-destructive"
                          onClick={() => handleDelete(event.id, event.status)}
                          disabled={deleteEvent.isPending || event.status !== "pending"}
                        >
                          <Trash2 className="h-3 w-3" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MerchantEventPanel;
