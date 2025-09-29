import { useState, useEffect } from 'react';
import { FileText, Upload, Search, Filter, Download, Trash2, Edit, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUploadForm } from '@/components/admin/FileUploadForm';
import { FileEditForm } from '@/components/admin/FileEditForm';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { fileService, type FileData } from '@/services/fileService';
import { categoryService, type Category } from '@/services/categoryService';

export default function AdminFiles() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingFile, setEditingFile] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [files, setFiles] = useState<FileData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';
  const { toast } = useToast();

  useEffect(() => {
    fetchFiles();
    fetchCategories();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await fileService.getFiles();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Erro ao carregar arquivos",
        description: "Não foi possível carregar a lista de arquivos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleUploadSubmit = (data: any) => {
    setShowUploadForm(false);
    fetchFiles(); // Refresh the file list
  };

  const handleEditSubmit = (data: any) => {
    console.log('File edit data:', data);
    // Simular deletar arquivo antigo se um novo foi enviado
    if (data.file) {
      console.log('Deletando arquivo antigo e substituindo por:', data.file.name);
    }
    setEditingFile(null);
  };

  const handleEditFile = (file: any) => {
    setEditingFile(file);
  };

  const handleDeleteFile = async (fileId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este arquivo?')) {
      try {
        await fileService.deleteFile(fileId);
        toast({
          title: "Arquivo deletado",
          description: "O arquivo foi removido com sucesso."
        });
        fetchFiles(); // Refresh the file list
      } catch (error) {
        console.error('Error deleting file:', error);
        toast({
          title: "Erro ao deletar arquivo",
          description: "Não foi possível deletar o arquivo.",
          variant: "destructive"
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const uploadDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'há 1 dia';
    if (diffDays < 7) return `há ${diffDays} dias`;
    if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semanas`;
    return `há ${Math.floor(diffDays / 30)} meses`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownloadFile = async (file: FileData) => {
    try {
      if (file.id) {
        await fileService.incrementDownloadCount(file.id);
      }
      const blob = await fileService.downloadFile(file.file_path);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.original_filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o arquivo.",
        variant: "destructive"
      });
    }
  };

  // Filter and search logic
  const filteredFiles = files.filter(file => {
    const matchesSearch = searchTerm === '' || 
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (file.tags && file.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === '' || typeFilter === 'all' || file.file_type === typeFilter;
    
    const fileCategory = categories.find(cat => cat.id === file.category_id);
    const matchesCategory = categoryFilter === '' || categoryFilter === 'all' || (fileCategory && fileCategory.name === categoryFilter);
    
    let matchesDate = true;
    if (dateFilter && dateFilter !== 'all') {
      const fileDate = new Date(file.created_at || '');
      const now = new Date();
      const diffDays = Math.ceil((now.getTime() - fileDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch(dateFilter) {
        case 'today':
          matchesDate = diffDays <= 1;
          break;
        case 'week':
          matchesDate = diffDays <= 7;
          break;
        case 'month':
          matchesDate = diffDays <= 30;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesType && matchesCategory && matchesDate;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setDateFilter('all');
  };

  const hasActiveFilters = searchTerm || (typeFilter && typeFilter !== 'all') || (categoryFilter && categoryFilter !== 'all') || (dateFilter && dateFilter !== 'all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gerenciar Arquivos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Upload e organização de documentos do sistema
          </p>
        </div>
        <Button 
          onClick={() => setShowUploadForm(true)}
          className="transition-colors"
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
          Upload de Arquivo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Arquivos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredFiles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uploads este Mês</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">567</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Downloads este Mês</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">890</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categorias Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-gray-900 dark:text-white">Buscar Arquivos</CardTitle>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <X className="mr-2 h-4 w-4" />
                Limpar Filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input 
                  placeholder="Buscar por nome, descrição ou tags..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className={`border-gray-200 dark:border-gray-600 ${showFilters ? 'bg-gray-100 dark:bg-gray-700' : ''} text-gray-700 dark:text-gray-300`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros {hasActiveFilters && `(${[typeFilter, categoryFilter, dateFilter].filter(f => f && f !== 'all').length})`}
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Tipo de Arquivo
                  </label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="PPTX">PPTX</SelectItem>
                      <SelectItem value="XLSX">XLSX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Categoria
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Data de Upload
                  </label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Qualquer data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Qualquer data</SelectItem>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-gray-900 dark:text-white">
              {hasActiveFilters ? `Arquivos Encontrados (${filteredFiles.length})` : 'Arquivos Recentes'}
            </CardTitle>
            {filteredFiles.length > 0 && (
              <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {filteredFiles.length} arquivo{filteredFiles.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {hasActiveFilters ? 'Nenhum arquivo encontrado com os filtros aplicados.' : 'Nenhum arquivo encontrado.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFiles.map((file) => {
                const fileCategory = categories.find(cat => cat.id === file.category_id);
                const fileType = file.file_type.split('/')[1]?.toUpperCase() || file.file_type.toUpperCase();
                
                return (
                <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{file.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getTimeAgo(file.created_at || '')} • {formatFileSize(file.file_size)}
                      </p>
                      {file.description && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{file.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {fileType}
                    </Badge>
                    {fileCategory && (
                      <Badge variant="outline" className="border-blue-200 dark:border-blue-600 text-blue-600">
                        {fileCategory.name}
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-200 dark:border-blue-600 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => handleEditFile(file)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-200 dark:border-red-600 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteFile(file.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {showUploadForm && (
        <FileUploadForm 
          onClose={() => setShowUploadForm(false)}
          onSubmit={handleUploadSubmit}
        />
      )}

      {editingFile && (
        <FileEditForm 
          onClose={() => setEditingFile(null)}
          onSubmit={handleEditSubmit}
          editData={editingFile}
        />
      )}
    </div>
  );
}
