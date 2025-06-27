
import { useState, useRef } from 'react';
import { X, Upload, File, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';

interface FileUploadFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function FileUploadForm({ onClose, onSubmit }: FileUploadFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    file: null as File | null,
    fileType: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const categories = [
    { id: '1', name: 'Imunização Infantil' },
    { id: '2', name: 'Campanhas' },
    { id: '3', name: 'Documentação Técnica' },
    { id: '4', name: 'Treinamentos' },
    { id: '5', name: 'ImunePlay' },
  ];

  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const isVideo = extension && videoExtensions.includes(extension);
      
      setFormData({
        ...formData,
        file,
        fileType: extension || '',
        // Se for vídeo, força a categoria ImunePlay
        category: isVideo ? '5' : formData.category,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting file data:', formData);
    onSubmit(formData);
  };

  const isVideoFile = formData.fileType && videoExtensions.includes(formData.fileType);
  const availableCategories = isVideoFile 
    ? categories.filter(cat => cat.name === 'ImunePlay')
    : categories;

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
            <Upload className="h-4 w-4" style={{ color: textColor }} />
          </Badge>
          <CardTitle className="text-lg font-semibold">
            Upload de Arquivo
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
            <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">Arquivo</Label>
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {formData.file ? formData.file.name : 'Clique para selecionar um arquivo'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tipo: {formData.fileType || 'Nenhum arquivo selecionado'}
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              required
            />
          </div>

          {isVideoFile && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Arquivos de vídeo são automaticamente direcionados para a categoria ImunePlay
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digite o título do arquivo"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Digite a descrição do arquivo"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Categoria</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              disabled={isVideoFile}
            >
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              Fazer Upload
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
