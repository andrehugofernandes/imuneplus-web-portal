-- Create files table for the file upload system
CREATE TABLE public.files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  tags TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Create policies for files
CREATE POLICY "Users can view all files" 
ON public.files 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage all files" 
ON public.files 
FOR ALL 
USING (has_role(auth.uid(), 'ADMIN'::user_role));

CREATE POLICY "Coordenadores can manage files" 
ON public.files 
FOR ALL 
USING (has_role(auth.uid(), 'COORDENADOR'::user_role));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_files_updated_at
BEFORE UPDATE ON public.files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for files
INSERT INTO storage.buckets (id, name, public) VALUES ('files', 'files', false);

-- Create storage policies for files
CREATE POLICY "Users can view files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'files');

CREATE POLICY "Admins can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'files' AND has_role(auth.uid(), 'ADMIN'::user_role));

CREATE POLICY "Coordenadores can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'files' AND has_role(auth.uid(), 'COORDENADOR'::user_role));

CREATE POLICY "Admins can update files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'files' AND has_role(auth.uid(), 'ADMIN'::user_role));

CREATE POLICY "Coordenadores can update files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'files' AND has_role(auth.uid(), 'COORDENADOR'::user_role));

CREATE POLICY "Admins can delete files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'files' AND has_role(auth.uid(), 'ADMIN'::user_role));

CREATE POLICY "Coordenadores can delete files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'files' AND has_role(auth.uid(), 'COORDENADOR'::user_role));