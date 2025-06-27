
import { useState, useEffect } from 'react';
import { X, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

interface CategoryFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  editData?: any;
}

export function CategoryForm({ onClose, onSubmit, editData }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    description: editData?.description || '',
    parentId: editData?.parentId || '',
    color: editData?.color || '#0037C1',
    isActive: editData?.isActive ?? true,
  });

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Imunização Infantil' },
    { id: '2', name: 'Campanhas' },
    { id: '3', name: 'Documentação Técnica' },
    { id: '4', name: 'Treinamentos' },
    { id: '5', name: 'ImunePlay' },
  ]);

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting category data:', formData);
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader 
        className="flex flex-row items-center justify-between w-full p-6 rounded-t-lg"
        style={{ 
          backgroundColor: themeColors.primary,
          color: textColor,
        }}
      >
        <div className="flex items-center space-x-3">
          <Badge 
            className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20"
          >
            <Folder className="h-4 w-4" style={{ color: textColor }} />
          </Badge>
          <CardTitle className="text-lg font-semibold">
            {editData ? 'Editar Categoria' : 'Nova Categoria'}
          </CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="hover:bg-white/20"
          style={{ color: textColor }}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-gray-700 dark:text-gray-300">Nome da Categoria</Label>
            <Input
              id="categoryName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome da categoria"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryDescription" className="text-gray-700 dark:text-gray-300">Descrição</Label>
            <Textarea
              id="categoryDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Digite a descrição da categoria"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentCategory" className="text-gray-700 dark:text-gray-300">Categoria Pai (Opcional)</Label>
            <Select value={formData.parentId} onValueChange={(value) => setFormData({ ...formData, parentId: value })}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione uma categoria pai" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhuma (Categoria Raiz)</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryColor" className="text-gray-700 dark:text-gray-300">Cor da Categoria</Label>
            <div className="flex items-center space-x-3">
              <Input
                id="categoryColor"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-16 h-10 p-1 border border-gray-200 dark:border-gray-600 rounded"
              />
              <Input
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="#0037C1"
                className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              style={{ 
                backgroundColor: themeColors.primary,
                color: textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primary;
              }}
            >
              {editData ? 'Atualizar Categoria' : 'Criar Categoria'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
