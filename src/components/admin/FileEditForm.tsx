import { useState, useEffect } from 'react';
import { Save, File, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { fileService, type FileData } from '@/services/fileService';
import { categoryService, type Category } from '@/services/categoryService';

interface FileEditFormData {
  title: string;
  description: string;
  category_id: string;
  tags: string;
  file?: File | null;
}

interface FileEditFormProps {
  onClose: () => void;
  onSubmit?: (data: FileEditFormData) => void;
  editData: FileData;
}

export function FileEditForm({ onClose, onSubmit, editData }: FileEditFormProps) {
  const [formData, setFormData] = useState<FileEditFormData>({
    title: editData?.title || '',
    description: editData?.description || '',
    category_id: editData?.category_id || '',
    tags: editData?.tags?.join(', ') || '',
    file: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const allCategories = await categoryService.getCategories();
      setCategories(allCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro ao carregar categorias",
        description: "Não foi possível carregar as categorias.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o título.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const tags = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      // If a new file was uploaded, upload it first
      if (formData.file && editData.id) {
        await fileService.uploadFile({
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id || undefined,
          tags,
          file: formData.file
        });

        // Delete the old file
        await fileService.deleteFile(editData.id);
      } else if (editData.id) {
        // Just update the metadata
        await fileService.updateFile(editData.id, {
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id || undefined,
          tags
        });
      }

      toast({
        title: "Arquivo atualizado",
        description: "As informações do arquivo foram atualizadas com sucesso."
      });

      if (onSubmit) {
        onSubmit(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error updating file:', error);
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar o arquivo. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FileEditFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('file', e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleInputChange('file', e.dataTransfer.files[0]);
    }
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
        <div 
          className="flex items-center justify-between w-full p-6"
          style={{ 
            backgroundColor: themeColors.primary,
            color: textColor,
          }}
        >
          <div className="flex items-center space-x-3">
            <Badge 
              className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20"
            >
              <File className="h-4 w-4" style={{ color: textColor }} />
            </Badge>
            <SheetTitle className="text-lg font-semibold" style={{ color: textColor }}>
              Editar Arquivo
            </SheetTitle>
          </div>
        </div>
        
        <SheetDescription className="sr-only">
          Formulário para editar arquivo existente
        </SheetDescription>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fileTitle" className="text-gray-700 dark:text-gray-300">
                Título do Arquivo *
              </Label>
              <Input
                id="fileTitle"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título do arquivo"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileDescription" className="text-gray-700 dark:text-gray-300">
                Descrição
              </Label>
              <Textarea
                id="fileDescription"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Digite a descrição do arquivo"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileCategory" className="text-gray-700 dark:text-gray-300">
                Categoria
              </Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileTags" className="text-gray-700 dark:text-gray-300">
                Tags (separadas por vírgula)
              </Label>
              <Input
                id="fileTags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="tag1, tag2, tag3"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">
                Substituir Arquivo (opcional)
              </Label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Clique para selecionar ou arraste um arquivo aqui
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PDF, DOC, DOCX, PPT, PPTX até 10MB
                    </p>
                  </div>
                </div>
              </div>
              {formData.file && (
                <div className="flex items-center mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <File className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {formData.file.name}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loading}
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: textColor,
                }}
                className="transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.primary;
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}