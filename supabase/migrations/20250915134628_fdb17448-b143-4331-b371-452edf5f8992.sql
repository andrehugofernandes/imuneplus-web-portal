-- Create categories table with hierarchical support
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#0037C1',
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  files_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Users can view all categories" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage all categories" 
ON public.categories 
FOR ALL 
USING (has_role(auth.uid(), 'ADMIN'::user_role));

CREATE POLICY "Coordenadores can manage categories" 
ON public.categories 
FOR ALL 
USING (has_role(auth.uid(), 'COORDENADOR'::user_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_categories_position ON public.categories(parent_id, position);
CREATE INDEX idx_categories_user_id ON public.categories(user_id);

-- Create function to update category hierarchy
CREATE OR REPLACE FUNCTION public.update_category_hierarchy(
  category_id UUID,
  new_parent_id UUID DEFAULT NULL,
  new_position INTEGER DEFAULT 0
) 
RETURNS BOOLEAN AS $$
BEGIN
  -- Update the category with new parent and position
  UPDATE public.categories 
  SET 
    parent_id = new_parent_id,
    position = new_position,
    updated_at = now()
  WHERE id = category_id;
  
  -- Reorder other categories in the same parent
  IF new_parent_id IS NOT NULL THEN
    UPDATE public.categories 
    SET position = position + 1
    WHERE parent_id = new_parent_id 
      AND id != category_id 
      AND position >= new_position;
  ELSE
    UPDATE public.categories 
    SET position = position + 1
    WHERE parent_id IS NULL 
      AND id != category_id 
      AND position >= new_position;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;