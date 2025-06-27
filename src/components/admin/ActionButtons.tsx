
import { useState } from 'react';
import { Users, FolderTree, Upload, UserPlus, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserForm } from '@/components/admin/UserForm';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { FileUploadForm } from '@/components/admin/FileUploadForm';
import { useTheme } from '@/contexts/ThemeContext';

export function ActionButtons() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { themeColors, isLightColor } = useTheme();

  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleUserSubmit = (data: any) => {
    console.log('User data:', data);
    setShowUserForm(false);
  };

  const handleCategorySubmit = (data: any) => {
    console.log('Category data:', data);
    setShowCategoryForm(false);
  };

  const handleUploadSubmit = (data: any) => {
    console.log('Upload data:', data);
    setShowUploadForm(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Sheet open={showUserForm} onOpenChange={setShowUserForm}>
            <SheetTrigger asChild>
              <Button 
                className="h-20 flex flex-col items-center space-y-2 transition-colors"
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
                <UserPlus size={24} />
                <span>Criar Usuário</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <UserForm 
                onClose={() => setShowUserForm(false)}
                onSubmit={handleUserSubmit}
              />
            </SheetContent>
          </Sheet>

          <Sheet open={showCategoryForm} onOpenChange={setShowCategoryForm}>
            <SheetTrigger asChild>
              <Button 
                className="h-20 flex flex-col items-center space-y-2 transition-colors"
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
                <FolderTree size={24} />
                <span>Nova Categoria</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <CategoryForm 
                onClose={() => setShowCategoryForm(false)}
                onSubmit={handleCategorySubmit}
              />
            </SheetContent>
          </Sheet>

          <Sheet open={showUploadForm} onOpenChange={setShowUploadForm}>
            <SheetTrigger asChild>
              <Button 
                className="h-20 flex flex-col items-center space-y-2 transition-colors"
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
                <Upload size={24} />
                <span>Upload de Arquivo</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl">
              <FileUploadForm 
                onClose={() => setShowUploadForm(false)}
                onSubmit={handleUploadSubmit}
              />
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
}
