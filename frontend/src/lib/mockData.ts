import { Place, Event } from "./types";

// Mock Places Data
export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Posada La Serrana",
    category: "alojamiento",
    subcategory: "Posada",
    description: "Posada rústica en Villa Serrana con vistas a las sierras",
    longDescription: "Ubicada en el corazón de Villa Serrana, nuestra posada ofrece una experiencia única de contacto con la naturaleza. Habitaciones acogedoras con calefacción, desayuno incluido y actividades al aire libre.",
    zone: "Villa Serrana",
    address: "Calle Principal 123, Villa Serrana",
    coordinates: { lat: -34.3833, lng: -55.0167 },
    phone: "+598 98 123 456",
    email: "info@posadalaserana.com",
    website: "https://posadalaserana.com",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    rating: 4.8,
    priceRange: "$$",
    hours: {
      "Lunes-Domingo": "Check-in: 14:00 / Check-out: 11:00"
    },
    amenities: ["WiFi", "Estacionamiento", "Desayuno", "Calefacción", "Jardín"],
    status: "approved",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-11-01")
  },
  {
    id: "2",
    name: "Parrillada El Fogón",
    category: "gastronomia",
    subcategory: "Parrilla",
    description: "La mejor carne a la parrilla de Minas",
    longDescription: "Restaurante familiar especializado en carnes a la parrilla y platos típicos uruguayos. Ambiente cálido y atención personalizada.",
    zone: "Minas",
    address: "Av. Artigas 456, Minas",
    coordinates: { lat: -34.3756, lng: -55.2378 },
    phone: "+598 98 234 567",
    email: "contacto@elfogon.com",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
    ],
    rating: 4.6,
    priceRange: "$$",
    hours: {
      "Lunes-Viernes": "12:00 - 15:00, 19:00 - 23:00",
      "Sábado-Domingo": "12:00 - 23:00"
    },
    amenities: ["WiFi", "Estacionamiento", "Terraza", "Apto celíacos"],
    status: "approved",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-10-20")
  },
  {
    id: "3",
    name: "Trekking Salto del Penitente",
    category: "actividades",
    subcategory: "Trekking",
    description: "Caminata guiada al Salto del Penitente",
    longDescription: "Excursión de medio día al impresionante Salto del Penitente. Incluye guía especializado, refrigerio y traslado desde Minas.",
    zone: "Sierra de Minas",
    address: "Punto de encuentro: Plaza Libertad, Minas",
    coordinates: { lat: -34.3567, lng: -55.1234 },
    phone: "+598 98 345 678",
    email: "info@trekkinglavalleja.com",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    rating: 4.9,
    priceRange: "$",
    hours: {
      "Sábado-Domingo": "Salidas: 9:00 y 14:00"
    },
    amenities: ["Guía", "Refrigerio", "Transporte", "Seguro"],
    status: "approved",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-05")
  },
  {
    id: "4",
    name: "Cabañas del Valle",
    category: "alojamiento",
    subcategory: "Cabaña",
    description: "Cabañas totalmente equipadas en Cerro Colorado",
    longDescription: "Cabañas modernas con todas las comodidades, ideal para familias. Piscina, parrilleros y hermosa vista a las sierras.",
    zone: "Cerro Colorado",
    address: "Ruta 12 km 8, Cerro Colorado",
    coordinates: { lat: -34.2891, lng: -55.1567 },
    phone: "+598 98 456 789",
    email: "reservas@cabanasdelvalle.com",
    website: "https://cabanasdelvalle.com",
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800"
    ],
    rating: 4.7,
    priceRange: "$$$",
    hours: {
      "Lunes-Domingo": "Check-in: 15:00 / Check-out: 10:00"
    },
    amenities: ["Piscina", "Parrillero", "WiFi", "Estacionamiento", "Cocina equipada"],
    status: "approved",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-10-15")
  },
  {
    id: "5",
    name: "Café La Cumbre",
    category: "gastronomia",
    subcategory: "Cafetería",
    description: "Cafetería artesanal con productos locales",
    longDescription: "Cafetería especializada en café de origen, repostería casera y productos regionales. Ambiente relajado con vista panorámica.",
    zone: "Minas",
    address: "Calle Treinta y Tres 789, Minas",
    coordinates: { lat: -34.3789, lng: -55.2401 },
    phone: "+598 98 567 890",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
    ],
    rating: 4.5,
    priceRange: "$",
    hours: {
      "Lunes-Sábado": "8:00 - 20:00",
      "Domingo": "9:00 - 18:00"
    },
    amenities: ["WiFi", "Terraza", "Productos regionales", "Apto vegetarianos"],
    status: "approved",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-11-03")
  },
  {
    id: "6",
    name: "Cabalgatas Sierra Azul",
    category: "actividades",
    subcategory: "Cabalgata",
    description: "Paseos a caballo por las sierras",
    longDescription: "Cabalgatas para todos los niveles, desde principiantes hasta jinetes experimentados. Recorridos de 1 a 4 horas por paisajes únicos.",
    zone: "Villa Serrana",
    address: "Camino del Perdido s/n, Villa Serrana",
    coordinates: { lat: -34.3901, lng: -55.0234 },
    phone: "+598 98 678 901",
    email: "info@sierraazul.com",
    images: [
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800",
      "https://images.unsplash.com/photo-1509205477838-a534e43a849f?w=800"
    ],
    rating: 4.8,
    priceRange: "$$",
    hours: {
      "Martes-Domingo": "Salidas: 10:00, 14:00 y 16:00"
    },
    amenities: ["Guía", "Equipo incluido", "Seguro", "Refrigerio"],
    status: "approved",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-10-28")
  }
];

// Mock Events Data
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Festival de la Tradición",
    description: "Gran festival con música folclórica, artesanías y gastronomía típica",
    category: "cultural",
    zone: "Minas",
    location: "Plaza Libertad, Minas",
    coordinates: { lat: -34.3756, lng: -55.2378 },
    startDate: new Date("2025-11-15"),
    endDate: new Date("2025-11-17"),
    startTime: "10:00",
    endTime: "22:00",
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800"
    ],
    organizer: "Municipio de Minas",
    contact: {
      phone: "+598 4442 2393",
      email: "cultura@minas.gub.uy"
    },
    price: "Entrada libre",
    status: "approved",
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-10-15")
  },
  {
    id: "2",
    title: "Trekking Nocturno Luna Llena",
    description: "Caminata nocturna especial bajo la luna llena",
    category: "deportivo",
    zone: "Villa Serrana",
    location: "Villa Serrana - Ventana de la Virgen",
    coordinates: { lat: -34.3833, lng: -55.0167 },
    startDate: new Date("2025-11-20"),
    startTime: "19:00",
    endTime: "23:00",
    images: [
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800"
    ],
    organizer: "Trekking Lavalleja",
    contact: {
      phone: "+598 98 345 678",
      email: "info@trekkinglavalleja.com"
    },
    price: "$600 por persona (incluye guía y refrigerio)",
    status: "approved",
    createdAt: new Date("2024-10-01"),
    updatedAt: new Date("2024-11-01")
  },
  {
    id: "3",
    title: "Feria de Productos Regionales",
    description: "Feria mensual con productos artesanales y gastronómicos de la región",
    category: "gastronomico",
    zone: "Minas",
    location: "Plaza de los Treinta y Tres, Minas",
    coordinates: { lat: -34.3745, lng: -55.2367 },
    startDate: new Date("2025-11-23"),
    startTime: "09:00",
    endTime: "18:00",
    images: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800"
    ],
    organizer: "Cámara de Comercio de Lavalleja",
    contact: {
      email: "info@camaralavalleja.com"
    },
    price: "Entrada libre",
    status: "approved",
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-10-20")
  },
  {
    id: "4",
    title: "Día de las Artes en Villa Serrana",
    description: "Exposiciones, talleres y presentaciones artísticas al aire libre",
    category: "cultural",
    zone: "Villa Serrana",
    location: "Plaza Central, Villa Serrana",
    coordinates: { lat: -34.3820, lng: -55.0180 },
    startDate: new Date("2025-12-01"),
    startTime: "11:00",
    endTime: "20:00",
    images: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"
    ],
    organizer: "Colectivo Artístico Villa Serrana",
    contact: {
      email: "arte@villaserrana.org"
    },
    price: "Entrada libre",
    status: "approved",
    createdAt: new Date("2024-09-20"),
    updatedAt: new Date("2024-10-25")
  },
  {
    id: "5",
    title: "Circuito de Mountain Bike",
    description: "Competencia regional de mountain bike por las sierras",
    category: "deportivo",
    zone: "Cerro Colorado",
    location: "Cerro Colorado - Circuito Las Sierras",
    coordinates: { lat: -34.2891, lng: -55.1567 },
    startDate: new Date("2025-12-07"),
    startTime: "08:00",
    endTime: "17:00",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800"
    ],
    organizer: "Club Ciclista Lavalleja",
    contact: {
      phone: "+598 98 111 222",
      email: "info@ciclistaslavalleja.com"
    },
    price: "Inscripción: $800 (hasta el 30/11)",
    status: "approved",
    createdAt: new Date("2024-09-10"),
    updatedAt: new Date("2024-11-02")
  },
  {
    id: "6",
    title: "Festival Familiar de Verano",
    description: "Actividades para toda la familia: juegos, música y gastronomía",
    category: "familiar",
    zone: "Minas",
    location: "Parque Rodó, Minas",
    coordinates: { lat: -34.3701, lng: -55.2345 },
    startDate: new Date("2025-12-14"),
    endDate: new Date("2025-12-15"),
    startTime: "15:00",
    endTime: "21:00",
    images: [
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800"
    ],
    organizer: "Intendencia de Lavalleja",
    contact: {
      phone: "+598 4442 2001",
      email: "eventos@lavalleja.gub.uy"
    },
    price: "Entrada libre",
    status: "approved",
    createdAt: new Date("2024-10-05"),
    updatedAt: new Date("2024-11-04")
  }
];

export const zones = [
  "Minas",
  "Villa Serrana",
  "Cerro Colorado",
  "Sierra de Minas",
  "Solís de Mataojo",
  "José Pedro Varela",
  "Mariscala"
];

export const placeCategories = {
  alojamiento: ["Hotel", "Posada", "Cabaña", "Camping", "Casa rural"],
  gastronomia: ["Restaurante", "Parrilla", "Cafetería", "Bar", "Productos regionales"],
  actividades: ["Trekking", "Cabalgata", "Ciclismo", "Escalada", "Observación de aves", "Turismo rural"]
};

export const eventCategories = ["cultural", "deportivo", "gastronomico", "familiar"];
