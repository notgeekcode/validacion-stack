-- Create enums for categories and status
CREATE TYPE public.place_category AS ENUM ('alojamiento', 'gastronomia', 'actividades');
CREATE TYPE public.event_category AS ENUM ('cultural', 'deportivo', 'gastronomico', 'familiar');
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');

-- Create places table
CREATE TABLE public.places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category place_category NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  zone TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  rating DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  price_range TEXT,
  hours JSONB,
  amenities TEXT[],
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status submission_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category event_category NOT NULL,
  zone TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TEXT NOT NULL,
  end_time TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  organizer TEXT,
  contact JSONB,
  price TEXT,
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status submission_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for places table

-- Public can view approved places
CREATE POLICY "Public can view approved places"
  ON public.places
  FOR SELECT
  USING (status = 'approved');

-- Merchants can view their own places (any status)
CREATE POLICY "Merchants can view own places"
  ON public.places
  FOR SELECT
  TO authenticated
  USING (merchant_id = auth.uid());

-- Curators can view all places
CREATE POLICY "Curators can view all places"
  ON public.places
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'curator'));

-- Analysts can view all places
CREATE POLICY "Analysts can view all places"
  ON public.places
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'analyst'));

-- Merchants can insert their own places
CREATE POLICY "Merchants can create places"
  ON public.places
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'merchant') 
    AND merchant_id = auth.uid()
    AND status = 'pending'
  );

-- Merchants can update their own places (but not change status)
CREATE POLICY "Merchants can update own places"
  ON public.places
  FOR UPDATE
  TO authenticated
  USING (merchant_id = auth.uid() AND public.has_role(auth.uid(), 'merchant'))
  WITH CHECK (merchant_id = auth.uid() AND status = 'pending');

-- Curators can update any place (including status changes)
CREATE POLICY "Curators can update all places"
  ON public.places
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'curator'));

-- Merchants can delete their own pending places
CREATE POLICY "Merchants can delete own pending places"
  ON public.places
  FOR DELETE
  TO authenticated
  USING (
    merchant_id = auth.uid() 
    AND public.has_role(auth.uid(), 'merchant')
    AND status = 'pending'
  );

-- RLS Policies for events table

-- Public can view approved events
CREATE POLICY "Public can view approved events"
  ON public.events
  FOR SELECT
  USING (status = 'approved');

-- Merchants can view their own events (any status)
CREATE POLICY "Merchants can view own events"
  ON public.events
  FOR SELECT
  TO authenticated
  USING (merchant_id = auth.uid());

-- Curators can view all events
CREATE POLICY "Curators can view all events"
  ON public.events
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'curator'));

-- Analysts can view all events
CREATE POLICY "Analysts can view all events"
  ON public.events
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'analyst'));

-- Merchants can insert their own events
CREATE POLICY "Merchants can create events"
  ON public.events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'merchant') 
    AND merchant_id = auth.uid()
    AND status = 'pending'
  );

-- Merchants can update their own events (but not change status)
CREATE POLICY "Merchants can update own events"
  ON public.events
  FOR UPDATE
  TO authenticated
  USING (merchant_id = auth.uid() AND public.has_role(auth.uid(), 'merchant'))
  WITH CHECK (merchant_id = auth.uid() AND status = 'pending');

-- Curators can update any event (including status changes)
CREATE POLICY "Curators can update all events"
  ON public.events
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'curator'));

-- Merchants can delete their own pending events
CREATE POLICY "Merchants can delete own pending events"
  ON public.events
  FOR DELETE
  TO authenticated
  USING (
    merchant_id = auth.uid() 
    AND public.has_role(auth.uid(), 'merchant')
    AND status = 'pending'
  );

-- Create triggers for updated_at
CREATE TRIGGER update_places_updated_at
  BEFORE UPDATE ON public.places
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_places_status ON public.places(status);
CREATE INDEX idx_places_merchant_id ON public.places(merchant_id);
CREATE INDEX idx_places_category ON public.places(category);
CREATE INDEX idx_places_zone ON public.places(zone);

CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_merchant_id ON public.events(merchant_id);
CREATE INDEX idx_events_category ON public.events(category);
CREATE INDEX idx_events_zone ON public.events(zone);
CREATE INDEX idx_events_start_date ON public.events(start_date);