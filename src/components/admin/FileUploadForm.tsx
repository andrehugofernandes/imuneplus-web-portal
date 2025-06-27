
import { useState, useEffect } from 'react';
import { Upload, X, FileText, Video, Image, FileIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';

interface FileUploadFormProps {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
}

const categories = [
  'Imunização Infantil',
  'Campanhas',
  'Documentação Técnica',
  'Treinamentos',
  'Relatórios',
  'Protocolos',
  'ImunePlay'
];

const fileTypes = [
  { value: 'document', label: 'Documento', extensions: ['.pdf', '.doc', '.docx', '.txt'] },
  { value: 'image', label: 'Imagem', extensions: ['.jpg', '.jpeg', '.png', '.gif'] },
  { value: 'video', label: 'Vídeo', extensions: ['.mp4', '.avi', '.mov', '.wmv', '.mkv'] },
  { value: 'other', label: 'Outros', extensions: ['.xlsx', '.pptx', '.zip'] }
];

export function FileUploadForm({ onClose, onSubmit }: FileUploadFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    fileType: ''
  });
  
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const getAvailableCategories = () => {
    if (formData.fileType === 'video') {
      return ['ImunePlay'];
    }
    return categories;
  };

  const detectFileType = (files: File[]) => {
    if (files.length === 0) return '';
    
    const file = files[0];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    for (const type of fileTypes) {
      if (type.extensions.includes(extension)) {
        return type.value;
      }
    }
    return 'other';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    if (files.length > 0) {
      const detectedType = detectFileType(files);
      setFormData(prev => ({
        ...prev,
        fileType: detectedType,
        category: detectedType === 'video' ? 'ImunePlay' : prev.category
      }));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (newFiles.length > 0) {
        const detectedType = detectFileType(newFiles);
        setFormData(prevData => ({
          ...prevData,
          fileType: detectedType,
          category: detectedType === 'video' ? 'ImunePlay' : prevData.category
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          fileType: '',
          category: ''
        }));
      }
      return newFiles;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.fileType === 'video' && formData.category !== 'ImunePlay') {
      alert('Arquivos de vídeo devem ser categorizados como ImunePlay.');
      return;
    }

    const uploadData = {
      ...formData,
      files: selectedFiles
    };
    if (onSubmit) {
      onSubmit(uploadData);
    }
    console.log('Upload data:', uploadData);
  };

  const getFileIcon = (fileName: string) => {
    const extension = '.' + fileName.split('.').pop()?.toLowerCase();
    
    if (['.mp4', '.avi', '.mov', '.wmv', '.mkv'].includes(extension)) {
      return <Video className="h-5 w-5 text-red-500" />;
    }
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
      return <Image className="h-5 w-5 text-green-500" />;
    }
    if (['.pdf', '.doc', '.docx', '.txt'].includes(extension)) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    }
    return <FileIcon className="h-5 w-5 text-gray-500" />;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader 
        className="flex flex-row items-center justify-between w-full p-6 rounded-t-lg"
        style={{ 
          backgroundColor: themeColors.primary,
          color: textColor,
        }}
      >
        <CardTitle className="text-lg font-semibold">Upload de Arquivos</CardTitle>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Selection */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">Selecionar Arquivos</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.mp4,.avi,.mov,.wmv,.mkv,.xlsx,.pptx,.zip"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Clique para selecionar arquivos ou arraste aqui
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  PDF, DOC, DOCX, JPG, PNG, MP4, AVI, MOV, TXT (Max. 50MB)
                </p>
              </label>
            </div>
          </div>

          {formData.fileType && (
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Tipo de Arquivo Detectado</Label>
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Tipo: <span className="font-medium">
                    {fileTypes.find(type => type.value === formData.fileType)?.label}
                  </span>
                  {formData.fileType === 'video' && (
                    <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                      Categoria ImunePlay obrigatória
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Arquivos Selecionados</Label>
              <div className="mt-2 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.name)}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite o título do documento"
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
              placeholder="Descreva o conteúdo do arquivo"
              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
              Categoria *
              {formData.fileType === 'video' && (
                <span className="text-xs text-red-500 ml-2">(Apenas ImunePlay para vídeos)</span>
              )}
            </Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              disabled={formData.fileType === 'video'}
            >
              <SelectTrigger className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tags" className="text-gray-700 dark:text-gray-300">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Digite tags separadas por vírgula"
              className="mt-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={selectedFiles.length === 0 || !formData.title || !formData.category}
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
              <Upload className="mr-2 h-4 w-4" />
              Fazer Upload
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
