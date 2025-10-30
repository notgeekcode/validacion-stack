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
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeSchema, PlaceFormData } from "@/lib/validations";
import { usePlaces, useCreatePlace, useDeletePlace } from "@/hooks/usePlaces";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ImageUploadField } from "@/components/ImageUploadField";

const MerchantPanel = () => {
  const { user } = useAuth();
  const { data: places, isLoading } = usePlaces();
  const createPlace = useCreatePlace();
  const deletePlace = useDeletePlace();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      latitude: -34.3804,
      longitude: -55.2364,
    },
  });

  const category = watch("category");

  const onSubmit = async (data: PlaceFormData) => {
    if (imageUrls.length === 0) {
      toast({
        title: "Falta información",
        description: "Debés subir al menos una imagen",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPlace.mutateAsync({
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
        title: "Lugar enviado",
        description: "Tu publicación está en revisión y será visible pronto",
      });
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  const handleDelete = async (id: string, status: string) => {
    if (status !== "pending") {
      toast({
        title: "No se puede eliminar",
        description: "Solo puedes eliminar lugares pendientes",
        variant: "destructive",
      });
      return;
    }

    if (confirm("¿Estás seguro de eliminar este lugar?")) {
      await deletePlace.mutateAsync(id);
    }
  };

  const myPlaces = places?.filter(p => p.merchantId === user?.id) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Panel de Comerciante</h1>
              <p className="text-muted-foreground">
                Gestioná tu negocio y publicaciones
              </p>
            </div>
            <Link to="/panel-comerciante/eventos">
              <Button variant="outline">Gestionar eventos</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-soft">
              <h2 className="text-2xl font-semibold mb-6">Publicar nuevo lugar</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del lugar</Label>
                    <Input 
                      id="name" 
                      placeholder="Ej: Hotel Las Sierras" 
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select onValueChange={(value) => setValue("category", value as any)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="alojamiento">Alojamiento</SelectItem>
                        <SelectItem value="gastronomia">Gastronomía</SelectItem>
                        <SelectItem value="actividades">Actividades</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zone">Zona</Label>
                    <Input 
                      id="zone" 
                      placeholder="Ej: Minas" 
                      {...register("zone")}
                    />
                    {errors.zone && (
                      <p className="text-sm text-destructive">{errors.zone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+598 ..." 
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input 
                    id="address" 
                    placeholder="Ej: Av. Principal 123" 
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describí tu negocio..."
                    rows={4}
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="contacto@ejemplo.com" 
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Rango de precio</Label>
                    <Select onValueChange={(value) => setValue("priceRange", value as any)}>
                      <SelectTrigger id="priceRange">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="$">$ (Económico)</SelectItem>
                        <SelectItem value="$$">$$ (Moderado)</SelectItem>
                        <SelectItem value="$$$">$$$ (Premium)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ImageUploadField
                  value={imageUrls}
                  onChange={setImageUrls}
                  bucketName="place-images"
                  maxImages={6}
                  label="Imágenes del lugar"
                />

                <Button
                  type="submit" 
                  className="w-full gap-2"
                  disabled={createPlace.isPending}
                >
                  {createPlace.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Enviar para aprobación
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* My Places List */}
          <div>
            <Card className="p-6 shadow-soft">
              <h3 className="text-lg font-semibold mb-4">Mis publicaciones</h3>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : myPlaces.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Aún no has publicado ningún lugar
                </p>
              ) : (
                <div className="space-y-3">
                  {myPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-base"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{place.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{place.category}</p>
                        </div>
                        <Badge 
                          variant={
                            place.status === "approved" 
                              ? "default" 
                              : place.status === "pending" 
                              ? "secondary" 
                              : "destructive"
                          }
                        >
                          {place.status === "approved" 
                            ? "Publicado" 
                            : place.status === "pending" 
                            ? "Pendiente" 
                            : "Rechazado"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          disabled={place.status !== "pending"}
                        >
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1 text-destructive"
                          onClick={() => handleDelete(place.id, place.status)}
                          disabled={deletePlace.isPending || place.status !== "pending"}
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

export default MerchantPanel;
