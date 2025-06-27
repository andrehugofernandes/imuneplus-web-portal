
import { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminCategories() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const itemsPerPage = 3;
  const totalPages = 2;

  const handleCategorySubmit = (data: any) => {
    console.log('Category data:', data);
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  // Categorias com hierarquia
  const categoriesHierarchy = [
    {
      id: 1,
      name: 'Imunização Infantil',
      type: 'parent',
      filesCount: 45,
      children: [
        { id: 6, name: 'Vacinas 0-2 anos', type: 'child', filesCount: 25 },
        { id: 7, name: 'Vacinas 2-12 anos', type: 'child', filesCount: 20 }
      ]
    },
    {
      id: 2,
      name: 'Campanhas',
      type: 'parent',
      filesCount: 32,
      children: [
        { id: 8, name: 'Campanhas Sazonais', type: 'child', filesCount: 18 },
        { id: 9, name: 'Campanhas Especiais', type: 'child', filesCount: 14 }
      ]
    },
    {
      id: 3,
      name: 'Documentação Técnica',
      type: 'parent',
      filesCount: 28,
      children: []
    },
    {
      id: 4,
      name: 'Treinamentos',
      type: 'parent',
      filesCount: 15,
      children: []
    },
    {
      id: 5,
      name: 'ImunePlay',
      type: 'parent',
      filesCount: 8,
      children: [
        { id: 10, name: 'Vídeos Educativos', type: 'child', filesCount: 5 },
        { id: 11, name: 'Animações', type: 'child', filesCount: 3 }
      ]
    }
  ];

  const paginatedCategories = categoriesHierarchy.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gerenciar Categorias
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Organize documentos por categorias e subcategorias
          </p>
        </div>
        <Sheet open={showCategoryForm} onOpenChange={setShowCategoryForm}>
          <SheetTrigger asChild>
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
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </SheetTrigger>
          {showCategoryForm && (
            <CategoryForm 
              onClose={() => {
                setShowCategoryForm(false);
                setEditingCategory(null);
              }}
              onSubmit={handleCategorySubmit}
              editData={editingCategory}
            />
          )}
        </Sheet>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categorias Principais</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subcategorias</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Arquivos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vídeos (ImunePlay)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Hierarquia de Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <FolderTree className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.filesCount} arquivos • {category.children.length} subcategorias
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      Principal
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      onClick={() => handleEditCategory({ 
                        name: category.name, 
                        description: '', 
                        isActive: true,
                        categoryType: 'parent'
                      })}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {category.children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between p-3 ml-8 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      <FolderTree className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{child.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{child.filesCount} arquivos</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Subcategoria
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={() => handleEditCategory({ 
                          name: child.name, 
                          description: '', 
                          isActive: true,
                          categoryType: 'child',
                          parentCategory: category.name
                        })}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      style={currentPage === page ? {
                        backgroundColor: themeColors.primary,
                        color: textColor
                      } : {}}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
