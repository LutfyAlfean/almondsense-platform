-- Create service_requests table for storing user service requests
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  land_size TEXT,
  service_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submissions)
CREATE POLICY "Anyone can submit service requests"
ON public.service_requests
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow reading all service requests (for admin dashboard)
CREATE POLICY "Anyone can view service requests"
ON public.service_requests
FOR SELECT
TO anon
USING (true);

-- Create policy to allow updates (for admin dashboard)
CREATE POLICY "Anyone can update service requests"
ON public.service_requests
FOR UPDATE
TO anon
USING (true);

-- Create policy to allow deletes (for admin dashboard)
CREATE POLICY "Anyone can delete service requests"
ON public.service_requests
FOR DELETE
TO anon
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();