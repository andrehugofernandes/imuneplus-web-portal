
import { Lock, Bell, Shield, Eye } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function UserSettings() {
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Configurações da Conta
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie suas preferências e configurações de segurança
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Segurança</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha Atual
              </label>
              <input
                type="password"
                placeholder="Digite sua senha atual"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${themeColors.primary}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nova Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua nova senha"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${themeColors.primary}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                placeholder="Confirme sua nova senha"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${themeColors.primary}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <button 
              className="w-full py-2 rounded-lg transition-colors bg-red-600 hover:bg-red-700 text-white"
            >
              Alterar Senha
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notificações</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email de notificações</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receber notificações por email</p>
              </div>
              <button 
                className="px-3 py-1 rounded-full text-sm transition-colors"
                style={{ 
                  backgroundColor: `${themeColors.primary}20`,
                  color: themeColors.primary,
                }}
              >
                Ativado
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Notificações push</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Notificações no navegador</p>
              </div>
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                Desativado
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Resumo semanal</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Relatório semanal de atividades</p>
              </div>
              <button 
                className="px-3 py-1 rounded-full text-sm transition-colors"
                style={{ 
                  backgroundColor: `${themeColors.primary}20`,
                  color: themeColors.primary,
                }}
              >
                Ativado
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Autenticação de Dois Fatores</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adicione uma camada extra de segurança à sua conta habilitando a autenticação de dois fatores.
            </p>
            
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  2FA está habilitado
                </span>
              </div>
              <button 
                className="text-sm font-medium transition-colors"
                style={{ color: themeColors.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = themeColors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = themeColors.primary;
                }}
              >
                Configurar
              </button>
            </div>
            
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
              Desabilitar 2FA
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacidade</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Perfil público</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Permitir que outros vejam seu perfil</p>
              </div>
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                Privado
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Rastreamento de atividades</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Permitir registro de atividades</p>
              </div>
              <button 
                className="px-3 py-1 rounded-full text-sm transition-colors"
                style={{ 
                  backgroundColor: `${themeColors.primary}20`,
                  color: themeColors.primary,
                }}
              >
                Ativado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
