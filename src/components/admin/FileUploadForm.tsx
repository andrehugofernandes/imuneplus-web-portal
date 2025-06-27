
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

interface FileUploadFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  editData?: any;
}

export function FileUploadForm({ onClose, onSubmit, editData }: FileUploadFormProps) {
  const [formData, setFormData] = useState({
    title: editData?.title || '',
    description: editData?.description || '',
    category: editData?.category || '',
    file: null as File | null,
  });

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const categories = [
    'Imunização Infantil',
    'Campanhas',
    'Documentação Técnica',
    'Treinamentos',
    'ImunePlay'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting file data:', formData);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div 
          className="flex items-center justify-between w-full p-6 rounded-t-lg"
          style={{ 
            backgroundColor: themeColors.primary,
            color: textColor,
          }}
        >
          <div className="flex items-center space-x-3">
            <Badge 
              className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20"
            >
              <Upload className="h-4 w-4" style={{ color: textColor }} />
            </Badge>
            <h2 className="text-lg font-semibold" style={{ color: textColor }}>
              {editData ? 'Editar Arquivo' : 'Upload de Arquivo'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="fileTitle" className="text-gray-700 dark:text-gray-300">Título do Arquivo</Label>
            <Input
              id="fileTitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digite o título do arquivo"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileDescription" className="text-gray-700 dark:text-gray-300">Descrição</Label>
            <Textarea
              id="fileDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Digite a descrição do arquivo"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileCategory" className="text-gray-700 dark:text-gray-300">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">Arquivo</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png,.gif,.mp4,.avi"
              required={!editData}
            />
            {formData.file && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Arquivo selecionado: {formData.file.name}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
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
              {editData ? 'Atualizar Arquivo' : 'Fazer Upload'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
