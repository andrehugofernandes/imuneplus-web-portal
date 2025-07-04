
import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';

interface AnalyticsFormData {
  name: string;
  description: string;
  type: string;
  metrics: string[];
  period: string;
  format: string;
  autoGenerate: boolean;
}

interface AnalyticsFormProps {
  onClose: () => void;
  onSubmit?: (data: AnalyticsFormData) => void;
  editData?: Partial<AnalyticsFormData>;
}

export function AnalyticsForm({ onClose, onSubmit, editData }: AnalyticsFormProps) {
  const [formData, setFormData] = useState<AnalyticsFormData>({
    name: editData?.name || '',
    description: editData?.description || '',
    type: editData?.type || '',
    metrics: editData?.metrics || [],
    period: editData?.period || '30',
    format: editData?.format || 'chart',
    autoGenerate: editData?.autoGenerate ?? false,
  });

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting analytics data:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const handleInputChange = (field: keyof AnalyticsFormData, value: string | string[] | boolean) => {
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
              <BarChart3 className="h-4 w-4" style={{ color: textColor }} />
            </Badge>
            <SheetTitle className="text-lg font-semibold" style={{ color: textColor }}>
              {editData ? 'Editar Dashboard' : 'Novo Dashboard'}
            </SheetTitle>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="analyticsName" className="text-gray-700 dark:text-gray-300">
                Nome do Dashboard *
              </Label>
              <Input
                id="analyticsName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome do dashboard"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analyticsDescription" className="text-gray-700 dark:text-gray-300">
                Descrição
              </Label>
              <Textarea
                id="analyticsDescription"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Digite a descrição do dashboard"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analyticsType" className="text-gray-700 dark:text-gray-300">
                Tipo de Análise *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="usage">Uso do Sistema</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="uploads">Uploads</SelectItem>
                  <SelectItem value="users">Atividade de Usuários</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analyticsPeriod" className="text-gray-700 dark:text-gray-300">
                Período de Análise
              </Label>
              <Select value={formData.period} onValueChange={(value) => handleInputChange('period', value)}>
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

            <div className="space-y-2">
              <Label htmlFor="analyticsFormat" className="text-gray-700 dark:text-gray-300">
                Formato de Visualização
              </Label>
              <Select value={formData.format} onValueChange={(value) => handleInputChange('format', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="chart">Gráfico</SelectItem>
                  <SelectItem value="table">Tabela</SelectItem>
                  <SelectItem value="both">Gráfico + Tabela</SelectItem>
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
                {editData ? 'Atualizar Dashboard' : 'Criar Dashboard'}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
