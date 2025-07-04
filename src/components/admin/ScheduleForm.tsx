
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';

interface ScheduleFormData {
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  participants: string[];
}

interface ScheduleFormProps {
  onClose: () => void;
  onSubmit?: (data: ScheduleFormData) => void;
  editData?: Partial<ScheduleFormData>;
}

export function ScheduleForm({ onClose, onSubmit, editData }: ScheduleFormProps) {
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: editData?.title || '',
    description: editData?.description || '',
    type: editData?.type || '',
    date: editData?.date || '',
    time: editData?.time || '',
    duration: editData?.duration || '60',
    location: editData?.location || '',
    participants: editData?.participants || [],
  });

  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting schedule data:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const handleInputChange = (field: keyof ScheduleFormData, value: string | string[]) => {
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
              <Calendar className="h-4 w-4" style={{ color: textColor }} />
            </Badge>
            <SheetTitle className="text-lg font-semibold" style={{ color: textColor }}>
              {editData ? 'Editar Agendamento' : 'Novo Agendamento'}
            </SheetTitle>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="scheduleTitle" className="text-gray-700 dark:text-gray-300">
                Título *
              </Label>
              <Input
                id="scheduleTitle"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título do agendamento"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleDescription" className="text-gray-700 dark:text-gray-300">
                Descrição
              </Label>
              <Textarea
                id="scheduleDescription"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Digite a descrição do agendamento"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleType" className="text-gray-700 dark:text-gray-300">
                Tipo de Evento *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="meeting">Reunião</SelectItem>
                  <SelectItem value="training">Treinamento</SelectItem>
                  <SelectItem value="campaign">Campanha</SelectItem>
                  <SelectItem value="vaccination">Vacinação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleDate" className="text-gray-700 dark:text-gray-300">
                  Data *
                </Label>
                <Input
                  id="scheduleDate"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleTime" className="text-gray-700 dark:text-gray-300">
                  Horário *
                </Label>
                <Input
                  id="scheduleTime"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleDuration" className="text-gray-700 dark:text-gray-300">
                Duração (minutos)
              </Label>
              <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="90">1h 30min</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleLocation" className="text-gray-700 dark:text-gray-300">
                Local
              </Label>
              <Input
                id="scheduleLocation"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Digite o local do evento"
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
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
                {editData ? 'Atualizar Agendamento' : 'Criar Agendamento'}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
