import { useState, useEffect } from 'react';
import { FolderTree, Plus, Edit, Trash2, ChevronRight, GripVertical, FolderPlus } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { categoryService, type Category } from '@/services/categoryService';
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
  child: Category;
  onEdit: (category: any) => void;
  onAddSubcategory: (parentId: string) => void;
}

function SortableSubcategory({ child, onEdit, onAddSubcategory }: SortableSubcategoryProps) {
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
          <p className="text-xs text-gray-500 dark:text-gray-400">{child.files_count} arquivos</p>
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
            parentId: child.parent_id
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

interface SortableCategoryProps {
  category: Category;
  onEdit: (category: any) => void;
  onAddSubcategory: (parentId: string) => void;
}

function SortableCategory({ category, onEdit, onAddSubcategory }: SortableCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div key={category.id} className="space-y-2">
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50"
      >
        <div className="flex items-center space-x-4">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <FolderTree className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {category.files_count} arquivos • {category.children?.length || 0} subcategorias
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
            onClick={() => onEdit({
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
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            onClick={() => onAddSubcategory(category.id)}
            title={`Adicionar subcategoria em: ${category.name}`}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-600 text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {category.children && category.children.length > 0 && (
        <div className="space-y-2">
          {category.children.map((child) => (
            <SortableSubcategory
              key={child.id}
              child={child}
              onEdit={onEdit}
              onAddSubcategory={onAddSubcategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminCategories() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [subcategoryParentId, setSubcategoryParentId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesHierarchy, setCategoriesHierarchy] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';
  const { toast } = useToast();

  const itemsPerPage = 3;

  const totalPages = Math.ceil(categoriesHierarchy.length / itemsPerPage);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categories = await categoryService.getCategories();
      setCategoriesHierarchy(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro ao carregar categorias",
        description: "Não foi possível carregar as categorias.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = async (data: any) => {
    try {
      if (editingCategory) {
        // Update existing category
        await categoryService.updateCategory(editingCategory.id, {
          name: data.name,
          description: data.description,
          color: data.color,
          parent_id: data.parentId || null
        });
        toast({
          title: "Categoria atualizada",
          description: "A categoria foi atualizada com sucesso."
        });
      } else {
        // Create new category
        await categoryService.createCategory({
          name: data.name,
          description: data.description,
          color: data.color,
          parent_id: data.parentId || subcategoryParentId || null,
          position: 0,
          files_count: 0,
          is_active: true
        });
        toast({
          title: "Categoria criada",
          description: "A categoria foi criada com sucesso."
        });
      }
      
      // Refresh categories
      fetchCategories();
      setShowCategoryForm(false);
      setEditingCategory(null);
      setSubcategoryParentId(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Erro ao salvar categoria",
        description: "Não foi possível salvar a categoria.",
        variant: "destructive"
      });
    }
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
    setSubcategoryParentId(null);
    setShowCategoryForm(true);
  };

  const handleAddSubcategory = (parentId: string) => {
    console.log('Creating new subcategory for parent:', parentId);
    setEditingCategory(null);
    setSubcategoryParentId(parentId);
    setShowCategoryForm(true);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const activeItem = findItemById(active.id);
      const overItem = findItemById(over.id);
      
      if (activeItem && overItem) {
        try {
          // Cenário 1: Subcategoria movendo entre categorias principais
          if (activeItem.isChild && overItem.isParent) {
            moveSubcategoryToParent(activeItem, overItem);
          }
          // Cenário 2: Categoria principal virando subcategoria
          else if (activeItem.isParent && overItem.isParent) {
            moveParentToSubcategory(activeItem, overItem);
          }
          // Cenário 3: Reordenação dentro da mesma categoria principal
          else if (activeItem.isChild && overItem.isChild && 'parentId' in activeItem && 'parentId' in overItem && activeItem.parentId === overItem.parentId) {
            reorderSubcategories(activeItem, overItem);
          }
          // Cenário 4: Subcategoria movendo para outra categoria
          else if (activeItem.isChild && overItem.isChild && 'parentId' in activeItem && 'parentId' in overItem && activeItem.parentId !== overItem.parentId) {
            moveSubcategoryBetweenParents(activeItem, overItem);
          }
          
          // Persist changes to backend
          await categoryService.updateCategoryHierarchy({
            action: getActionType(activeItem, overItem),
            activeItem: {
              categoryId: activeItem.id,
              parentId: 'parentId' in activeItem ? activeItem.parentId : undefined,
              position: 0,
              type: activeItem.isParent ? 'parent' : 'child'
            },
            targetItem: {
              categoryId: overItem.id,
              parentId: 'parentId' in overItem ? overItem.parentId : undefined,
              position: 0,
              type: overItem.isParent ? 'parent' : 'child'
            },
            newHierarchy: categoriesHierarchy
          });
          
          toast({
            title: "Categoria atualizada com sucesso!",
            description: "A hierarquia foi atualizada no banco de dados.",
          });
          
          // Refresh categories to get updated data
          fetchCategories();
        } catch (error) {
          console.error('Error updating category hierarchy:', error);
          toast({
            title: "Erro ao atualizar categoria",
            description: "Ocorreu um erro ao salvar as alterações no banco de dados.",
            variant: "destructive"
          });
          // Revert local changes by refetching
          fetchCategories();
        }
      }
    }
  };
  
  const findItemById = (id: string) => {
    // Procurar nas categorias principais
    const parentCategory = categoriesHierarchy.find(cat => cat.id === id);
    if (parentCategory) {
      return { ...parentCategory, isParent: true, isChild: false };
    }
    
    // Procurar nas subcategorias
    for (const category of categoriesHierarchy) {
      const childCategory = category.children?.find(child => child.id === id);
      if (childCategory) {
        return { ...childCategory, isParent: false, isChild: true, parentId: category.id };
      }
    }
    return null;
  };
  
  const moveSubcategoryToParent = (subcategory: any, newParent: any) => {
    setCategoriesHierarchy(prevCategories => {
      return prevCategories.map(category => {
        // Remover da categoria antiga
        if (category.id === subcategory.parent_id) {
          return {
            ...category,
            children: (category.children || []).filter(child => child.id !== subcategory.id)
          };
        }
        // Adicionar à nova categoria
        if (category.id === newParent.id) {
          return {
            ...category,
            children: [...(category.children || []), { ...subcategory, parent_id: newParent.id }]
          };
        }
        return category;
      });
    });
  };

  const getActionType = (activeItem: any, overItem: any): 'move_subcategory_to_parent' | 'move_parent_to_subcategory' | 'reorder_subcategories' | 'move_subcategory_between_parents' => {
    if (activeItem.isChild && overItem.isParent) {
      return 'move_subcategory_to_parent';
    } else if (activeItem.isParent && overItem.isParent) {
      return 'move_parent_to_subcategory';
    } else if (activeItem.isChild && overItem.isChild && activeItem.parentId === overItem.parentId) {
      return 'reorder_subcategories';
    } else if (activeItem.isChild && overItem.isChild && activeItem.parentId !== overItem.parentId) {
      return 'move_subcategory_between_parents';
    }
    return 'reorder_subcategories';
  };
  
  const moveParentToSubcategory = (parentCategory: any, targetParent: any) => {
    setCategoriesHierarchy(prevCategories => {
      const filteredCategories = prevCategories.filter(cat => cat.id !== parentCategory.id);
      
      return filteredCategories.map(category => {
        if (category.id === targetParent.id) {
          const newSubcategory = {
            ...parentCategory,
            parent_id: targetParent.id,
            children: undefined
          };
          
          const newChildren = [...(category.children || []), newSubcategory];
          
          // Adicionar as antigas subcategorias como subcategorias do target
          if (parentCategory.children && parentCategory.children.length > 0) {
            newChildren.push(...parentCategory.children.map((child) => ({
              ...child,
              parent_id: targetParent.id
            })));
          }
          
          return {
            ...category,
            children: newChildren
          };
        }
        return category;
      });
    });
  };
  
  const reorderSubcategories = (activeChild: any, overChild: any) => {
    setCategoriesHierarchy(prevCategories =>
      prevCategories.map(category => {
        if (category.id === activeChild.parentId) {
          const children = category.children || [];
          const oldIndex = children.findIndex(child => child.id === activeChild.id);
          const newIndex = children.findIndex(child => child.id === overChild.id);
          
          return {
            ...category,
            children: arrayMove(children, oldIndex, newIndex)
          };
        }
        return category;
      })
    );
  };
  
  const moveSubcategoryBetweenParents = (activeChild: any, overChild: any) => {
    setCategoriesHierarchy(prevCategories => {
      return prevCategories.map(category => {
        // Remover da categoria antiga
        if (category.id === activeChild.parentId) {
          return {
            ...category,
            children: (category.children || []).filter(child => child.id !== activeChild.id)
          };
        }
        // Adicionar à categoria do over item
        if (category.id === overChild.parentId) {
          const children = category.children || [];
          const overIndex = children.findIndex(child => child.id === overChild.id);
          const newChildren = [...children];
          newChildren.splice(overIndex + 1, 0, { ...activeChild, parent_id: overChild.parentId });
          
          return {
            ...category,
            children: newChildren
          };
        }
        return category;
      });
    });
  };

  const paginatedCategories = categoriesHierarchy.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getAllItemsForDnd = () => {
    const items: string[] = [];
    categoriesHierarchy.forEach(category => {
      items.push(category.id);
      (category.children || []).forEach((child) => {
        items.push(child.id);
      });
    });
    return items;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 dark:text-gray-400">Carregando categorias...</div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={getAllItemsForDnd()}
        strategy={verticalListSortingStrategy}
      >
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
              <SortableCategory 
                key={category.id} 
                category={category} 
                onEdit={handleEditCategory} 
                onAddSubcategory={handleAddSubcategory} 
              />
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
            setSubcategoryParentId(null);
          }}
          onSubmit={handleCategorySubmit}
          editData={subcategoryParentId ? { 
            ...editingCategory, 
            parentId: subcategoryParentId 
          } : editingCategory}
        />
      )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
