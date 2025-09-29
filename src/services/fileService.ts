import { supabase } from '@/integrations/supabase/client';

export interface FileData {
  id?: string;
  title: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  file_type: string;
  description?: string;
  category_id?: string;
  tags?: string[];
  is_active?: boolean;
  download_count?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export interface FileUploadData {
  title: string;
  description?: string;
  category_id?: string;
  tags?: string[];
  file: File;
}

export const fileService = {
  async uploadFile(data: FileUploadData): Promise<FileData> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Upload file to storage
    const fileExt = data.file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(filePath, data.file);

    if (uploadError) throw uploadError;

    // Create file record in database
    const fileData = {
      title: data.title,
      original_filename: data.file.name,
      file_path: filePath,
      file_size: data.file.size,
      file_type: data.file.type,
      description: data.description || null,
      category_id: data.category_id || null,
      tags: data.tags || [],
      user_id: user.id,
      is_active: true,
      download_count: 0
    };

    const { data: createdFile, error } = await supabase
      .from('files')
      .insert(fileData)
      .select()
      .single();

    if (error) throw error;
    return createdFile;
  },

  async getFiles(): Promise<FileData[]> {
    const { data, error } = await supabase
      .from('files')
      .select(`
        *,
        categories:category_id (
          id,
          name,
          color
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateFile(id: string, updates: Partial<FileData>): Promise<FileData> {
    const { data, error } = await supabase
      .from('files')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteFile(id: string): Promise<void> {
    // Get file path first
    const { data: file, error: fetchError } = await supabase
      .from('files')
      .select('file_path')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('files')
      .remove([file.file_path]);

    if (storageError) throw storageError;

    // Delete from database
    const { error } = await supabase
      .from('files')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getFileUrl(filePath: string): Promise<string> {
    const { data } = supabase.storage
      .from('files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async downloadFile(filePath: string): Promise<Blob> {
    const { data, error } = await supabase.storage
      .from('files')
      .download(filePath);

    if (error) throw error;
    return data;
  },

  async incrementDownloadCount(id: string): Promise<void> {
    try {
      // First get current count
      const { data: file, error: fetchError } = await supabase
        .from('files')
        .select('download_count')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching file for download count:', fetchError);
        return;
      }

      // Update with incremented count
      const { error } = await supabase
        .from('files')
        .update({ download_count: (file.download_count || 0) + 1 })
        .eq('id', id);

      if (error) console.error('Error incrementing download count:', error);
    } catch (error) {
      console.error('Error incrementing download count:', error);
    }
  }
};