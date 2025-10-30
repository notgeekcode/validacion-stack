-- ============================================================================
-- SEED DATA PARA DEMO - Portal Turístico Lavalleja
-- ============================================================================
-- Este archivo crea usuarios de prueba, lugares y eventos ficticios
-- para demostrar las funcionalidades del portal
-- ============================================================================

-- Limpiar datos existentes (opcional - comentar si no se desea)
-- TRUNCATE TABLE public.events CASCADE;
-- TRUNCATE TABLE public.places CASCADE;
-- TRUNCATE TABLE public.user_roles CASCADE;
-- TRUNCATE TABLE public.profiles CASCADE;

-- ============================================================================
-- USUARIOS DE PRUEBA
-- ============================================================================
-- IMPORTANTE: Los usuarios deben crearse manualmente en Supabase Auth o usar la API
-- Aquí se documentan las credenciales para crear manualmente:
-- 
-- 1. turista@demo.lavalleja.com / Demo2025! (rol: tourist)
-- 2. comerciante@demo.lavalleja.com / Demo2025! (rol: merchant)
-- 3. curador@demo.lavalleja.com / Demo2025! (rol: curator)
-- 4. analista@demo.lavalleja.com / Demo2025! (rol: analyst)
--
-- Después de crear estos usuarios en el dashboard de Supabase Auth,
-- copiar sus UUIDs y reemplazar en las siguientes secciones

-- ============================================================================
-- UUIDs REALES DE USUARIOS (ya creados en Supabase Auth)
-- ============================================================================
-- merchant_user_id: 3b88b441-e94f-4347-a1b7-c35a69e12b33
-- curator_user_id: 3d74e4a3-115a-4bfd-857b-1708d9d4465d

-- ============================================================================
-- LUGARES TURÍSTICOS
-- ============================================================================

-- ALOJAMIENTOS APROBADOS
INSERT INTO public.places (
  id, name, category, subcategory, description, long_description,
  zone, address, latitude, longitude, phone, email, website,
  price_range, amenities, rating, images, status, merchant_id
) VALUES
(
  gen_random_uuid(),
  'Posada del Cerro',
  'alojamiento',
  'Posada',
  'Acogedora posada en las sierras de Minas con vistas panorámicas',
  'Nuestra posada ofrece una experiencia única en contacto con la naturaleza. Ubicada en las sierras de Minas, cuenta con 8 habitaciones confortables, todas con vista a las montañas. Desayuno casero incluido con productos locales. Ideal para desconexión y turismo aventura.',
  'Minas',
  'Camino a la Sierra Km 3',
  -34.3753,
  -55.2346,
  '+598 4442 1234',
  'info@posadadelcerro.com.uy',
  'https://posadadelcerro.com.uy',
  '$$',
  '{"wifi", "estacionamiento", "desayuno incluido", "calefacción"}',
  4.7,
  '["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"]'::jsonb,
  'approved',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Hotel Verdún',
  'alojamiento',
  'Hotel',
  'Hotel céntrico en Minas, ideal para viajes de negocios y turismo',
  'Hotel tradicional ubicado en pleno centro de Minas. 25 habitaciones equipadas con todas las comodidades modernas. Restaurante, sala de conferencias y garage cubierto. A pasos de la plaza principal y todos los servicios.',
  'Minas',
  'Treinta y Tres 635',
  -34.3758,
  -55.2375,
  '+598 4442 5678',
  'reservas@hotelverdun.com.uy',
  'https://hotelverdun.com.uy',
  '$$',
  '{"wifi", "restaurante", "estacionamiento", "aire acondicionado", "room service"}',
  4.3,
  '["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"]'::jsonb,
  'approved',
  NULL
),
(
  gen_random_uuid(),
  'Cabañas Villa Serrana',
  'alojamiento',
  'Cabaña',
  'Cabañas rústicas en el corazón de Villa Serrana',
  'Complejo de 6 cabañas de piedra y madera en el pintoresco pueblo de Villa Serrana. Diseño arquitectónico único del maestro Julio Vilamajó. Entorno natural privilegiado, ideal para familias y grupos. Cada cabaña tiene cocina equipada, parrillero y chimenea a leña.',
  'Villa Serrana',
  'Ruta 8 Km 153',
  -34.3456,
  -54.9876,
  '+598 99 123 456',
  'cabanas@villaserrana.com',
  NULL,
  '$$$',
  '{"cocina equipada", "parrillero", "chimenea", "wifi", "estacionamiento"}',
  4.8,
  '["https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800", "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800"]'::jsonb,
  'approved',
  NULL
),

-- GASTRONOMÍA APROBADA
(
  gen_random_uuid(),
  'Parrillada El Fogón',
  'gastronomia',
  'Parrilla',
  'Auténtica parrilla uruguaya con carnes de primera calidad',
  'Restaurante familiar especializado en parrilla y carnes al asador. Más de 30 años sirviendo las mejores carnes de la región. Ambiente cálido y acogedor. Carta de vinos seleccionados. Reservas recomendadas fines de semana.',
  'Minas',
  'Ruta 8 Km 120',
  -34.3760,
  -55.2380,
  '+598 4442 3456',
  'elfogon@gmail.com',
  NULL,
  '$$',
  '{"parrillero", "estacionamiento", "aire acondicionado", "acepta tarjetas"}',
  4.5,
  '["https://images.unsplash.com/photo-1544025162-d76694265947?w=800"]'::jsonb,
  'approved',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Café Cultural La Mina',
  'gastronomia',
  'Café',
  'Café boutique con productos artesanales y eventos culturales',
  'Espacio cultural que combina gastronomía con arte. Café de especialidad, repostería casera, sandwiches gourmet. Exposiciones de artistas locales, música en vivo los fines de semana. WiFi gratuito, ideal para trabajar o estudiar.',
  'Minas',
  'Florida 520',
  -34.3765,
  -55.2370,
  '+598 99 234 567',
  'lamina@cultural.com',
  'https://instagram.com/cafellamina',
  '$',
  '{"wifi", "vegano", "vegetariano", "música en vivo", "exposiciones"}',
  4.6,
  '["https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"]'::jsonb,
  'approved',
  NULL
),

-- ACTIVIDADES APROBADAS
(
  gen_random_uuid(),
  'Cerro Arequita Trekking',
  'actividades',
  'Trekking',
  'Excursiones guiadas al Cerro Arequita y Grutas del Palacio',
  'Empresa de turismo aventura especializada en trekking y senderismo. Ofrecemos excursiones guiadas al Cerro Arequita (240m de altura) y las famosas Grutas del Palacio. Guías experimentados, equipamiento incluido. Tours de medio día y día completo. Dificultad adaptable a diferentes niveles.',
  'Zapicán',
  'Ruta 12 Km 15',
  -34.3234,
  -55.1234,
  '+598 99 345 678',
  'info@arequitatrek.com',
  'https://arequitatrek.com',
  '$$',
  '{"guía incluido", "equipamiento incluido", "seguro", "transporte opcional"}',
  4.9,
  '["https://images.unsplash.com/photo-1551632811-561732d1e306?w=800", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"]'::jsonb,
  'approved',
  NULL
),
(
  gen_random_uuid(),
  'Cabalgatas Sierra Verde',
  'actividades',
  'Cabalgatas',
  'Paseos a caballo por las sierras de Lavalleja',
  'Descubre la belleza de las sierras de Lavalleja a caballo. Ofrecemos cabalgatas de 2 horas, medio día y día completo. Caballos mansos aptos para principiantes y jinetes experimentados. Incluye mate y tortas fritas en el campo. Atardeceres inolvidables.',
  'Minas',
  'Paraje Los Aromos',
  -34.3890,
  -55.2120,
  '+598 98 123 456',
  'sierraverde@cabalgatas.com',
  NULL,
  '$$',
  '{"caballos mansos", "guía gaucho", "merienda incluida", "seguro"}',
  4.7,
  '["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800"]'::jsonb,
  'approved',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),

-- LUGARES PENDIENTES (para demo de curación)
(
  gen_random_uuid(),
  'Hostel del Viajero',
  'alojamiento',
  'Hostel',
  'Nuevo hostel económico para mochileros y viajeros',
  'Hostel recién inaugurado en el centro de Minas. Dormitorios compartidos y habitaciones privadas. Cocina compartida, sala de estar, terraza con parrillero. Ambiente juvenil y cosmopolita. Ideal para presupuestos acotados.',
  'Minas',
  'Rodó 123',
  -34.3770,
  -55.2365,
  '+598 99 876 543',
  'hostel@viajero.uy',
  NULL,
  '$',
  '{"wifi", "cocina compartida", "lockers", "parrillero"}',
  0,
  '["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"]'::jsonb,
  'pending',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Pizzería Don Antonio',
  'gastronomia',
  'Pizzería',
  'Pizzas artesanales al horno de leña',
  'Pizzería familiar con masa madre y productos frescos. Horno de leña tradicional. Variedad de sabores clásicos y creaciones propias. Delivery disponible. Propuesta nueva en Minas que busca ofrecer calidad a buen precio.',
  'Minas',
  'Artigas 456',
  -34.3755,
  -55.2385,
  '+598 4442 7890',
  'donantonio@pizza.uy',
  NULL,
  '$',
  '{"delivery", "para llevar", "horno a leña", "opciones vegetarianas"}',
  0,
  '["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"]'::jsonb,
  'pending',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Yoga en las Sierras',
  'actividades',
  'Yoga y Meditación',
  'Clases de yoga al aire libre con vista a las sierras',
  'Sesiones de yoga y meditación en contacto con la naturaleza. Todos los niveles bienvenidos. Instructor certificado. Clases grupales y privadas. Retiros de fin de semana. Ambiente de paz y relajación total.',
  'Villa Serrana',
  'Camino del Indio s/n',
  -34.3478,
  -54.9890,
  '+598 99 456 789',
  'yoga@sierras.com',
  'https://yogasierras.uy',
  '$',
  '{"clases grupales", "clases privadas", "retiros", "todos los niveles"}',
  0,
  '["https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800"]'::jsonb,
  'pending',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),

-- LUGARES RECHAZADOS (para mostrar flujo completo)
(
  gen_random_uuid(),
  'Casa Particular',
  'alojamiento',
  'Otro',
  'Alquilo mi casa particular',
  'Alquilo habitaciones en mi casa. Barato.',
  'Minas',
  'Calle desconocida 123',
  -34.3750,
  -55.2350,
  '+598 99 000 000',
  NULL,
  NULL,
  '$',
  NULL,
  0,
  '[]'::jsonb,
  'rejected',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Bar El Rincón',
  'gastronomia',
  'Bar',
  'Bar de barrio',
  'Vendemos bebidas y algo de comida.',
  'Minas',
  'Esquina sin nombre',
  -34.3745,
  -55.2355,
  NULL,
  NULL,
  NULL,
  '$',
  NULL,
  0,
  '[]'::jsonb,
  'rejected',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
);

-- ============================================================================
-- EVENTOS
-- ============================================================================

-- EVENTOS APROBADOS (futuros y actuales)
INSERT INTO public.events (
  id, title, description, category, start_date, end_date, start_time, end_time,
  location, zone, latitude, longitude, price, organizer, contact, images,
  status, merchant_id
) VALUES
(
  gen_random_uuid(),
  'Festival Folclórico de Lavalleja 2025',
  'El evento cultural más importante del departamento. Música, danza, artesanías y gastronomía tradicional. Participación de artistas locales y nacionales. Entrada gratuita para toda la familia.',
  'cultural',
  '2025-11-15',
  '2025-11-17',
  '18:00',
  '23:00',
  'Parque Rodó',
  'Minas',
  -34.3755,
  -55.2368,
  'Gratis',
  'Intendencia de Lavalleja',
  '{"email": "cultura@lavalleja.gub.uy", "phone": "+598 4442 2222"}'::jsonb,
  '["https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800"]'::jsonb,
  'approved',
  NULL
),
(
  gen_random_uuid(),
  'Maratón de las Sierras',
  'Competencia atlética de 21k y 10k por las sierras de Minas. Recorrido desafiante con paisajes únicos. Categorías por edad. Inscripción anticipada con descuento. Incluye chip de tiempo, remera técnica y medalla.',
  'deportivo',
  '2025-11-01',
  '2025-11-01',
  '08:00',
  '13:00',
  'Partida: Plaza Libertad',
  'Minas',
  -34.3758,
  -55.2372,
  '$500 pesos',
  'Club Atlético Minas',
  '{"email": "maraton@atleticominas.com", "phone": "+598 99 111 222"}'::jsonb,
  '["https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800"]'::jsonb,
  'approved',
  NULL
),
(
  gen_random_uuid(),
  'Feria de Artesanos',
  'Feria mensual de artesanos locales. Productos en cuero, lana, madera, cerámica y más. Ideal para comprar souvenirs auténticos. Todos los primeros domingos de mes.',
  'cultural',
  '2025-11-03',
  '2025-11-03',
  '10:00',
  '18:00',
  'Plaza Libertad',
  'Minas',
  -34.3758,
  -55.2372,
  'Gratis',
  'Asociación de Artesanos de Lavalleja',
  '{"email": "artesanos@lavalleja.org"}'::jsonb,
  '["https://images.unsplash.com/photo-1523895665936-7bfe172b757d?w=800"]'::jsonb,
  'approved',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Cata de Vinos Tannat',
  'Degustación de vinos Tannat de bodegas uruguayas. Maridaje con quesos artesanales. Charla sobre vinicultura nacional. Cupos limitados, reserva anticipada.',
  'gastronomico',
  '2025-10-25',
  '2025-10-25',
  '20:00',
  '22:30',
  'Hotel Verdún - Salón de Eventos',
  'Minas',
  -34.3758,
  -55.2375,
  '$800 pesos',
  'Círculo Enológico del Uruguay',
  '{"email": "cata@enologico.uy", "phone": "+598 99 333 444"}'::jsonb,
  '["https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800"]'::jsonb,
  'approved',
  NULL
),

-- EVENTOS PENDIENTES
(
  gen_random_uuid(),
  'Noche de Jazz en la Posada',
  'Velada musical con trío de jazz. Cena opcional. Ambiente íntimo bajo las estrellas.',
  'cultural',
  '2025-11-20',
  '2025-11-20',
  '21:00',
  '23:30',
  'Posada del Cerro',
  'Minas',
  -34.3753,
  -55.2346,
  '$600 pesos (sin cena)',
  'Posada del Cerro',
  '{"email": "eventos@posadadelcerro.com.uy", "phone": "+598 4442 1234"}'::jsonb,
  '["https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800"]'::jsonb,
  'pending',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),
(
  gen_random_uuid(),
  'Taller de Fotografía de Naturaleza',
  'Aprende a fotografiar paisajes y fauna local. Salida de campo incluida. Traer cámara propia.',
  'familiar',
  '2025-11-10',
  '2025-11-10',
  '09:00',
  '16:00',
  'Villa Serrana - Punto de encuentro',
  'Villa Serrana',
  -34.3456,
  -54.9876,
  '$1200 pesos',
  'FotoNatura Uruguay',
  '{"email": "talleres@fotonatura.uy"}'::jsonb,
  '["https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800"]'::jsonb,
  'pending',
  '3b88b441-e94f-4347-a1b7-c35a69e12b33'
),

-- EVENTOS PASADOS (para mostrar historial)
(
  gen_random_uuid(),
  'Fiesta de la Tradición 2024',
  'Celebración de las tradiciones gauchas. Jineteada, doma, destrezas criollas.',
  'cultural',
  '2024-09-15',
  '2024-09-16',
  '14:00',
  '20:00',
  'Ruedo Municipal',
  'Minas',
  -34.3780,
  -55.2390,
  'Gratis',
  'Agrupación Tradicionalista',
  '{"email": "tradicion@lavalleja.org"}'::jsonb,
  '["https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800"]'::jsonb,
  'approved',
  NULL
);

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================
-- 
-- 1. Para usar este seed:
--    a) Crear primero los 4 usuarios en Supabase Auth Dashboard:
--       - turista@demo.lavalleja.com
--       - comerciante@demo.lavalleja.com
--       - curador@demo.lavalleja.com
--       - analista@demo.lavalleja.com
--       Password para todos: Demo2025!
--
--    b) Copiar los UUIDs generados y reemplazar las variables al inicio
--
--    c) Ejecutar este script en SQL Editor
--
-- 2. Los perfiles se crearán automáticamente si tienes el trigger handle_new_user()
--
-- 3. Los roles se asignarán automáticamente (tourist por defecto)
--    Deberás actualizar manualmente los roles de los otros usuarios:
--    
--    UPDATE public.user_roles SET role = 'merchant' WHERE user_id = '...';
--    UPDATE public.user_roles SET role = 'curator' WHERE user_id = '...';
--    UPDATE public.user_roles SET role = 'analyst' WHERE user_id = '...';
--
-- 4. Para limpiar los datos demo:
--    DELETE FROM public.events WHERE merchant_id = '...' OR merchant_id IS NULL;
--    DELETE FROM public.places WHERE merchant_id = '...' OR merchant_id IS NULL;
--
-- ============================================================================
