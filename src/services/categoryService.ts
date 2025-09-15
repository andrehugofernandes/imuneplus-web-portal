import { supabase } from '@/integrations/supabase/client';

// Category persistence service for drag and drop operations
export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
  parent_id?: string;
  position: number;
  files_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  children?: Category[];
}

export interface CategoryUpdateData {
  categoryId: string;
  parentId?: string;
  position: number;
  type: 'parent' | 'child';
}

export interface CategoryHierarchyUpdate {
  action: 'move_subcategory_to_parent' | 'move_parent_to_subcategory' | 'reorder_subcategories' | 'move_subcategory_between_parents';
  activeItem: CategoryUpdateData;
  targetItem?: CategoryUpdateData;
  newHierarchy: any[];
}

class CategoryService {
  
  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('position');

      if (error) throw error;

      // Build hierarchy from flat data
      const categories = data || [];
      const categoriesMap = new Map(categories.map(cat => [cat.id, { ...cat, children: [] }]));
      const rootCategories: Category[] = [];

      categories.forEach(category => {
        const categoryWithChildren = categoriesMap.get(category.id)!;
        if (category.parent_id) {
          const parent = categoriesMap.get(category.parent_id);
          if (parent) {
            parent.children!.push(categoryWithChildren);
          }
        } else {
          rootCategories.push(categoryWithChildren);
        }
      });

      return rootCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async createCategory(categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<Category> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('categories')
        .insert({
          ...categoryData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  async updateCategoryHierarchy(update: CategoryHierarchyUpdate): Promise<{ success: boolean; message: string }> {
    try {
      console.log('Updating category hierarchy:', update);

      // Use the database function to update hierarchy
      const { error } = await supabase.rpc('update_category_hierarchy', {
        category_id: update.activeItem.categoryId,
        new_parent_id: update.activeItem.parentId || null,
        new_position: update.activeItem.position
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Categoria atualizada com sucesso no banco de dados!'
      };
    } catch (error) {
      console.error('Error updating category hierarchy:', error);
      throw error;
    }
  }

  async moveSubcategoryToParent(subcategoryId: string, newParentId: string, position: number) {
    return this.updateCategoryHierarchy({
      action: 'move_subcategory_to_parent',
      activeItem: { categoryId: subcategoryId, parentId: newParentId, position, type: 'child' },
      newHierarchy: []
    });
  }

  async moveParentToSubcategory(parentId: string, targetParentId: string, position: number) {
    return this.updateCategoryHierarchy({
      action: 'move_parent_to_subcategory', 
      activeItem: { categoryId: parentId, parentId: targetParentId, position, type: 'child' },
      newHierarchy: []
    });
  }

  async reorderSubcategories(subcategoryId: string, parentId: string, newPosition: number) {
    return this.updateCategoryHierarchy({
      action: 'reorder_subcategories',
      activeItem: { categoryId: subcategoryId, parentId, position: newPosition, type: 'child' },
      newHierarchy: []
    });
  }
}

export const categoryService = new CategoryService();