
import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';

interface ReportFormData {
  name: string;
  description: string;
  type: string;
  format: string;
  dateRange: string;
  categories: string[];
}

interface ReportFormProps {
  onClose: () => void;
  onSubmit?: (data: ReportFormData) => void;
  editData?: Partial<ReportFormData>;
}

export function ReportForm({ onClose, onSubmit, editData }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    name: editData?.name || '',
    description: editData?.description || '',
    type: editData?.type || '',
    format: editData?.format || 'PDF',
    dateRange: editData?.dateRange || '30',
    categories: editData?.categories || [],
  });

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting report data:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const handleInputChange = (field: keyof ReportFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
        <div 
          className="flex items-center justify-between w-full p-6"
          style={{ 
            backgroundColor: themeColors.primary,
            color: textColor,
          }}
        >
          <div className="flex items-center space-x-3">
            <Badge 
              className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20"
            >
              <FileText className="h-4 w-4" style={{ color: textColor }} />
            </Badge>
            <SheetTitle className="text-lg font-semibold" style={{ color: textColor }}>
              {editData ? 'Editar Relatório' : 'Novo Relatório'}
            </SheetTitle>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportName" className="text-gray-700 dark:text-gray-300">
                Nome do Relatório *
              </Label>
              <Input
                id="reportName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome do relatório"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportDescription" className="text-gray-700 dark:text-gray-300">
                Descrição
              </Label>
              <Textarea
                id="reportDescription"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Digite a descrição do relatório"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportType" className="text-gray-700 dark:text-gray-300">
                Tipo de Relatório *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="downloads">Downloads por Categoria</SelectItem>
                  <SelectItem value="uploads">Uploads por Período</SelectItem>
                  <SelectItem value="users">Atividade de Usuários</SelectItem>
                  <SelectItem value="access">Logs de Acesso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportFormat" className="text-gray-700 dark:text-gray-300">
                Formato
              </Label>
              <Select value={formData.format} onValueChange={(value) => handleInputChange('format', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange" className="text-gray-700 dark:text-gray-300">
                Período (dias)
              </Label>
              <Select value={formData.dateRange} onValueChange={(value) => handleInputChange('dateRange', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                  <SelectItem value="365">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                style={{ 
                  backgroundColor: themeColors.primary,
                  color: textColor,
                }}
                className="transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.primary;
                }}
              >
                {editData ? 'Atualizar Relatório' : 'Gerar Relatório'}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
