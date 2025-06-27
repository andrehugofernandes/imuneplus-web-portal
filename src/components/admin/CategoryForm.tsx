
import { useState } from 'react';
import { X, FolderTree } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';

interface CategoryFormProps {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
  editData?: any;
}

const existingCategories = [
  { id: 1, name: 'Imunização Infantil', type: 'parent' },
  { id: 2, name: 'Campanhas', type: 'parent' },
  { id: 3, name: 'Documentação Técnica', type: 'parent' },
  { id: 4, name: 'Treinamentos', type: 'parent' },
  { id: 5, name: 'ImunePlay', type: 'parent' },
];

export function CategoryForm({ onClose, onSubmit, editData }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    description: editData?.description || '',
    parentCategory: editData?.parentCategory || '',
    isActive: editData?.isActive ?? true,
    color: editData?.color || '#3B82F6',
    icon: editData?.icon || 'FolderTree',
    categoryType: editData?.categoryType || 'parent'
  });

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const availableParentCategories = existingCategories.filter(cat => cat.type === 'parent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.categoryType === 'child' && !formData.parentCategory) {
      alert('Categorias filhas devem ter uma categoria pai selecionada.');
      return;
    }

    if (formData.categoryType === 'parent' && formData.parentCategory) {
      setFormData(prev => ({ ...prev, parentCategory: '' }));
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    console.log('Category data:', formData);
  };

  const iconOptions = [
    { value: 'FolderTree', label: 'Pasta' },
    { value: 'FileText', label: 'Documento' },
    { value: 'Shield', label: 'Escudo' },
    { value: 'Heart', label: 'Coração' },
    { value: 'BookOpen', label: 'Livro' },
    { value: 'Users', label: 'Usuários' },
    { value: 'Play', label: 'Play (Vídeos)' },
    { value: 'Monitor', label: 'Monitor' }
  ];

  const colorOptions = [
    { value: '#3B82F6', label: 'Azul' },
    { value: '#10B981', label: 'Verde' },
    { value: '#F59E0B', label: 'Amarelo' },
    { value: '#EF4444', label: 'Vermelho' },
    { value: '#8B5CF6', label: 'Roxo' },
    { value: '#06B6D4', label: 'Ciano' },
    { value: '#F97316', label: 'Laranja' }
  ];

  return (
    <Card className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader 
        className="flex flex-row items-center justify-between w-full p-6 rounded-t-lg"
        style={{ 
          backgroundColor: themeColors.primary,
          color: textColor,
        }}
      >
        <CardTitle className="flex items-center text-lg font-semibold">
          <FolderTree className="mr-2 h-5 w-5" />
          {editData ? 'Editar Categoria' : 'Nova Categoria'}
        </CardTitle>
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-white/20"
            style={{ color: textColor }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome da Categoria *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome da categoria"
              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o propósito desta categoria"
              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="categoryType" className="text-gray-700 dark:text-gray-300">Tipo de Categoria *</Label>
            <Select 
              value={formData.categoryType} 
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                categoryType: value,
                parentCategory: value === 'parent' ? '' : prev.parentCategory 
              }))}
            >
              <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Categoria Principal (Pai)</SelectItem>
                <SelectItem value="child">Subcategoria (Filha)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.categoryType === 'child' && (
            <div>
              <Label htmlFor="parent" className="text-gray-700 dark:text-gray-300">Categoria Pai *</Label>
              <Select 
                value={formData.parentCategory} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, parentCategory: value }))}
              >
                <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione a categoria pai" />
                </SelectTrigger>
                <SelectContent>
                  {availableParentCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="icon" className="text-gray-700 dark:text-gray-300">Ícone</Label>
              <Select 
                value={formData.icon} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
              >
                <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color" className="text-gray-700 dark:text-gray-300">Cor</Label>
              <Select 
                value={formData.color} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
              >
                <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-2" 
                          style={{ backgroundColor: option.value }}
                        />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active" className="text-gray-700 dark:text-gray-300">Categoria Ativa</Label>
            <Switch 
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={!formData.name || (formData.categoryType === 'child' && !formData.parentCategory)}
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
              {editData ? 'Atualizar' : 'Criar'} Categoria
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
