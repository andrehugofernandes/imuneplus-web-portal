import { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, ChevronRight, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableSubcategoryProps {
  child: any;
  onEdit: (category: any) => void;
}

function SortableSubcategory({ child, onEdit }: SortableSubcategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: child.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 ml-8 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
    >
      <div className="flex items-center space-x-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400" />
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: child.color }}
        />
        <FolderTree className="h-5 w-5 text-gray-600" />
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{child.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{child.filesCount} arquivos</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{child.description}</p>
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
          onClick={() => onEdit({
            name: child.name,
            description: child.description,
            color: child.color,
            isActive: true,
            parentId: child.parentId.toString()
          })}
          title={`Editar subcategoria: ${child.name}`}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function AdminCategories() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const itemsPerPage = 3;
  const totalPages = 2;

  const [categoriesHierarchy, setCategoriesHierarchy] = useState([
    {
      id: 1,
      name: 'Imunização Infantil',
      type: 'parent',
      filesCount: 45,
      color: '#0037C1',
      description: 'Categoria para documentos relacionados à imunização infantil',
      children: [
        { id: 6, name: 'Vacinas 0-2 anos', type: 'child', filesCount: 25, parentId: 1, color: '#4169E1', description: 'Vacinas para crianças de 0 a 2 anos' },
        { id: 7, name: 'Vacinas 2-12 anos', type: 'child', filesCount: 20, parentId: 1, color: '#6495ED', description: 'Vacinas para crianças de 2 a 12 anos' }
      ]
    },
    {
      id: 2,
      name: 'Campanhas',
      type: 'parent',
      filesCount: 32,
      color: '#32CD32',
      description: 'Documentos de campanhas de vacinação',
      children: [
        { id: 8, name: 'Campanhas Sazonais', type: 'child', filesCount: 18, parentId: 2, color: '#90EE90', description: 'Campanhas sazonais de vacinação' },
        { id: 9, name: 'Campanhas Especiais', type: 'child', filesCount: 14, parentId: 2, color: '#98FB98', description: 'Campanhas especiais de vacinação' }
      ]
    },
    {
      id: 3,
      name: 'Documentação Técnica',
      type: 'parent',
      filesCount: 28,
      color: '#FF6347',
      description: 'Documentos técnicos e manuais',
      children: []
    },
    {
      id: 4,
      name: 'Treinamentos',
      type: 'parent',
      filesCount: 15,
      color: '#FFD700',
      description: 'Materiais de treinamento',
      children: []
    },
    {
      id: 5,
      name: 'ImunePlay',
      type: 'parent',
      filesCount: 8,
      color: '#9370DB',
      description: 'Conteúdo educativo interativo',
      children: [
        { id: 10, name: 'Vídeos Educativos', type: 'child', filesCount: 5, parentId: 5, color: '#DA70D6', description: 'Vídeos educativos sobre vacinação' },
        { id: 11, name: 'Animações', type: 'child', filesCount: 3, parentId: 5, color: '#DDA0DD', description: 'Animações educativas' }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCategorySubmit = (data: any) => {
    console.log('Category submitted:', data);
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: any) => {
    console.log('Editing category:', category);
    setEditingCategory({
      name: category.name,
      description: category.description || '',
      parentId: category.parentId || '',
      color: category.color || '#0037C1',
      isActive: category.isActive ?? true,
    });
    setShowCategoryForm(true);
  };

  const handleNewCategory = () => {
    console.log('Creating new category');
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      console.log('Reordenando subcategorias de', active.id, 'para', over.id);
      
      // Encontrar a categoria pai das subcategorias
      const parentCategory = categoriesHierarchy.find(cat => 
        cat.children.some(child => child.id === active.id || child.id === over.id)
      );
      
      if (parentCategory) {
        setCategoriesHierarchy(prevCategories =>
          prevCategories.map(category => {
            if (category.id === parentCategory.id) {
              const oldIndex = category.children.findIndex(child => child.id === active.id);
              const newIndex = category.children.findIndex(child => child.id === over.id);
              
              return {
                ...category,
                children: arrayMove(category.children, oldIndex, newIndex)
              };
            }
            return category;
          })
        );
        
        // Simular atualização no banco de dados
        console.log('Ordem das subcategorias atualizada no banco de dados');
      }
    }
  };

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
        <Button 
          onClick={handleNewCategory}
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
      </div>

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
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <FolderTree className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.filesCount} arquivos • {category.children.length} subcategorias
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{category.description}</p>
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
                        description: category.description,
                        color: category.color,
                        isActive: true,
                        parentId: ''
                      })}
                      title={`Editar categoria: ${category.name}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {category.children.length > 0 && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={category.children.map(child => child.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {category.children.map((child) => (
                          <SortableSubcategory
                            key={child.id}
                            child={child}
                            onEdit={handleEditCategory}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            ))}
          </div>

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
    </div>
  );
}
