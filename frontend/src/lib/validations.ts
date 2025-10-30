import { z } from "zod";

export const placeSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "El nombre no puede exceder 100 caracteres"),
  category: z.enum(["alojamiento", "gastronomia", "actividades"], {
    required_error: "Debes seleccionar una categoría",
  }),
  subcategory: z.string().optional(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500, "La descripción no puede exceder 500 caracteres"),
  longDescription: z.string().optional(),
  zone: z.string().min(1, "Debes especificar la zona"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  priceRange: z.enum(["$", "$$", "$$$"]).optional(),
  latitude: z.number().min(-90).max(90, "Latitud inválida"),
  longitude: z.number().min(-180).max(180, "Longitud inválida"),
});

export const eventSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(100, "El título no puede exceder 100 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500, "La descripción no puede exceder 500 caracteres"),
  category: z.enum(["cultural", "deportivo", "gastronomico", "familiar"], {
    required_error: "Debes seleccionar una categoría",
  }),
  zone: z.string().min(1, "Debes especificar la zona"),
  location: z.string().min(3, "La ubicación debe tener al menos 3 caracteres"),
  startDate: z.date({
    required_error: "Debes especificar la fecha de inicio",
  }),
  endDate: z.date().optional(),
  startTime: z.string().min(1, "Debes especificar la hora de inicio"),
  endTime: z.string().optional(),
  price: z.string().optional(),
  organizer: z.string().optional(),
  latitude: z.number().min(-90).max(90, "Latitud inválida"),
  longitude: z.number().min(-180).max(180, "Longitud inválida"),
}).refine(
  (data) => {
    if (data.endDate && data.startDate) {
      return data.endDate >= data.startDate;
    }
    return true;
  },
  {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["endDate"],
  }
);

export type PlaceFormData = z.infer<typeof placeSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
