-- Insert sample categories with hierarchy
INSERT INTO public.categories (id, name, description, color, parent_id, position, files_count, is_active, user_id) 
VALUES 
  -- Parent categories
  ('550e8400-e29b-41d4-a716-446655440001', 'Imunização Infantil', 'Categoria para documentos relacionados à imunização infantil', '#0037C1', NULL, 1, 45, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Campanhas', 'Documentos de campanhas de vacinação', '#32CD32', NULL, 2, 32, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Documentação Técnica', 'Documentos técnicos e manuais', '#FF6347', NULL, 3, 28, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Treinamentos', 'Materiais de treinamento', '#FFD700', NULL, 4, 15, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440005', 'ImunePlay', 'Conteúdo educativo interativo', '#9370DB', NULL, 5, 8, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  
  -- Subcategories for Imunização Infantil
  ('550e8400-e29b-41d4-a716-446655440006', 'Vacinas 0-2 anos', 'Vacinas para crianças de 0 a 2 anos', '#4169E1', '550e8400-e29b-41d4-a716-446655440001', 1, 25, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Vacinas 2-12 anos', 'Vacinas para crianças de 2 a 12 anos', '#6495ED', '550e8400-e29b-41d4-a716-446655440001', 2, 20, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  
  -- Subcategories for Campanhas
  ('550e8400-e29b-41d4-a716-446655440008', 'Campanhas Sazonais', 'Campanhas sazonais de vacinação', '#90EE90', '550e8400-e29b-41d4-a716-446655440002', 1, 18, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440009', 'Campanhas Especiais', 'Campanhas especiais de vacinação', '#98FB98', '550e8400-e29b-41d4-a716-446655440002', 2, 14, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  
  -- Subcategories for ImunePlay
  ('550e8400-e29b-41d4-a716-446655440010', 'Vídeos Educativos', 'Vídeos educativos sobre vacinação', '#DA70D6', '550e8400-e29b-41d4-a716-446655440005', 1, 5, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e'),
  ('550e8400-e29b-41d4-a716-446655440011', 'Animações', 'Animações educativas', '#DDA0DD', '550e8400-e29b-41d4-a716-446655440005', 2, 3, true, '5603e8bf-fc97-498d-b2f2-03ed9c007b3e');

-- Update the stats based on the actual data
UPDATE public.categories 
SET files_count = (
  SELECT COALESCE(SUM(c2.files_count), 0)
  FROM public.categories c2 
  WHERE c2.parent_id = categories.id
)
WHERE parent_id IS NULL;