import { useState } from 'react';
import { FileText, Upload, Search, Filter, Download, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileUploadForm } from '@/components/admin/FileUploadForm';
import { FileEditForm } from '@/components/admin/FileEditForm';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminFiles() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingFile, setEditingFile] = useState<any>(null);
  const [files, setFiles] = useState([
    { id: 1, name: 'Documento 1.pdf', uploadDate: '2024-01-15', type: 'PDF', size: '2.4 MB', description: 'Documento importante sobre imunização', category: '1', tags: 'vacina, importante' },
    { id: 2, name: 'Documento 2.pdf', uploadDate: '2024-01-10', type: 'PDF', size: '1.8 MB', description: 'Manual de procedimentos', category: '2', tags: 'manual, procedimento' },
    { id: 3, name: 'Apresentação 1.pptx', uploadDate: '2024-01-08', type: 'PPTX', size: '5.2 MB', description: 'Apresentação para treinamento', category: '4', tags: 'treinamento, apresentação' },
  ]);
  
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleUploadSubmit = (data: any) => {
    console.log('File upload data:', data);
    setShowUploadForm(false);
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

  const handleDeleteFile = (fileId: number) => {
    if (window.confirm('Tem certeza que deseja deletar este arquivo?')) {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
      console.log(`Arquivo ${fileId} deletado`);
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{files.length}</p>
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
          <CardTitle className="text-gray-900 dark:text-white">Buscar Arquivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input 
                placeholder="Buscar por nome do arquivo..." 
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Button variant="outline" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button 
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
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Arquivos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{file.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getTimeAgo(file.uploadDate)} • {file.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {file.type}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
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
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
