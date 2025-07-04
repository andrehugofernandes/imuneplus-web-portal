
import { useState } from 'react';
import { Users, Upload, FolderTree, BarChart3, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/admin/UserForm';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { ReportForm } from '@/components/admin/ReportForm';
import { ScheduleForm } from '@/components/admin/ScheduleForm';
import { AnalyticsForm } from '@/components/admin/AnalyticsForm';
import { useTheme } from '@/contexts/ThemeContext';
import { FileUploadForm } from '@/components/admin/FileUploadForm';

export function ActionButtons() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showCategoryForm, setCategoryForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showAnalyticsForm, setShowAnalyticsForm] = useState(false);
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleUserSubmit = (data: any) => {
    console.log('User data:', data);
    setShowUserForm(false);
  };

  const handleCategorySubmit = (data: any) => {
    console.log('Category data:', data);
    setCategoryForm(false);
  };

  const handleUploadSubmit = (data: any) => {
    console.log('Upload data:', data);
    setShowUploadForm(false);
  };

  const handleReportSubmit = (data: any) => {
    console.log('Report data:', data);
    setShowReportForm(false);
  };

  const handleScheduleSubmit = (data: any) => {
    console.log('Schedule data:', data);
    setShowScheduleForm(false);
  };

  const handleAnalyticsSubmit = (data: any) => {
    console.log('Analytics data:', data);
    setShowAnalyticsForm(false);
  };

  return (
    <>
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900 dark:text-white">
            <BarChart3 className="mr-2 h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setShowUserForm(true)}
            >
              <Users className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Novo Usuário</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setShowUploadForm(true)}
            >
              <Upload className="h-6 w-6 text-green-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Upload Arquivo</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setCategoryForm(true)}
            >
              <FolderTree className="h-6 w-6 text-purple-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Nova Categoria</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setShowReportForm(true)}
            >
              <FileText className="h-6 w-6 text-orange-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Relatório</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setShowScheduleForm(true)}
            >
              <Calendar className="h-6 w-6 text-red-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Agendar</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setShowAnalyticsForm(true)}
            >
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showUserForm && (
        <UserForm 
          onClose={() => setShowUserForm(false)}
          onSubmit={handleUserSubmit}
        />
      )}

      {showCategoryForm && (
        <CategoryForm
          onClose={() => setCategoryForm(false)}
          onSubmit={handleCategorySubmit}
        />
      )}

      {showUploadForm && (
        <FileUploadForm 
          onClose={() => setShowUploadForm(false)}
          onSubmit={handleUploadSubmit}
        />
      )}

      {showReportForm && (
        <ReportForm
          onClose={() => setShowReportForm(false)}
          onSubmit={handleReportSubmit}
        />
      )}

      {showScheduleForm && (
        <ScheduleForm
          onClose={() => setShowScheduleForm(false)}
          onSubmit={handleScheduleSubmit}
        />
      )}

      {showAnalyticsForm && (
        <AnalyticsForm
          onClose={() => setShowAnalyticsForm(false)}
          onSubmit={handleAnalyticsSubmit}
        />
      )}
    </>
  );
}
