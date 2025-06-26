import { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CategoryForm } from '@/components/admin/CategoryForm';

export default function AdminCategories() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategorySubmit = (data: any) => {
    console.log('Category data:', data);
    setShowCategoryForm(false);
    setEditingCategory(null);
    // Aqui você adicionaria a lógica para salvar a categoria
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const categories = ['Imunização Infantil', 'Campanhas', 'Documentação Técnica', 'Treinamentos'];

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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </SheetTrigger>
          <SheetContent>
            <CategoryForm 
              onClose={() => {
                setShowCategoryForm(false);
                setEditingCategory(null);
              }}
              onSubmit={handleCategorySubmit}
              editData={editingCategory}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Categorias</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categorias Ativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FolderTree className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categorias Inativas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Categorias Principais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center space-x-4">
                  <FolderTree className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{category}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 50) + 10} arquivos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    Ativa
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    onClick={() => handleEditCategory({ name: category, description: '', isActive: true })}
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
        </CardContent>
      </Card>
    </div>
  );
}
