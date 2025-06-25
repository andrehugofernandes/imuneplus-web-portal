
import { Settings, Save, Shield, Mail, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminSettings() {
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Configurações do Sistema
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie as configurações gerais da aplicação
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Settings className="mr-2 h-5 w-5" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-name" className="text-gray-700 dark:text-gray-300">Nome do Site</Label>
              <Input 
                id="site-name" 
                defaultValue="IMUNE+" 
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="site-description" className="text-gray-700 dark:text-gray-300">Descrição</Label>
              <Input 
                id="site-description" 
                defaultValue="Sistema de Gestão da Imunização" 
                className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance" className="text-gray-700 dark:text-gray-300">Modo Manutenção</Label>
              <Switch id="maintenance" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Shield className="mr-2 h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor" className="text-gray-700 dark:text-gray-300">Autenticação 2FA</Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password-policy" className="text-gray-700 dark:text-gray-300">Política de Senhas Rigorosa</Label>
              <Switch id="password-policy" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="session-timeout" className="text-gray-700 dark:text-gray-300">Timeout de Sessão</Label>
              <Switch id="session-timeout" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
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
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
