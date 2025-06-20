
import { Lock, Bell, Shield, Eye } from 'lucide-react';

export default function UserSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Configurações da Conta
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie suas preferências e configurações de segurança
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold">Segurança</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha Atual
              </label>
              <input
                type="password"
                placeholder="Digite sua senha atual"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nova Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua nova senha"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                placeholder="Confirme sua nova senha"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
              Alterar Senha
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold">Notificações</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email de notificações</p>
                <p className="text-sm text-gray-500">Receber notificações por email</p>
              </div>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Ativado
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Notificações push</p>
                <p className="text-sm text-gray-500">Notificações no navegador</p>
              </div>
              <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                Desativado
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Resumo semanal</p>
                <p className="text-sm text-gray-500">Relatório semanal de atividades</p>
              </div>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Ativado
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold">Autenticação de Dois Fatores</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Adicione uma camada extra de segurança à sua conta habilitando a autenticação de dois fatores.
            </p>
            
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">
                  2FA está habilitado
                </span>
              </div>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                Configurar
              </button>
            </div>
            
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
              Desabilitar 2FA
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Eye className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold">Privacidade</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Perfil público</p>
                <p className="text-sm text-gray-500">Permitir que outros vejam seu perfil</p>
              </div>
              <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                Privado
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Rastreamento de atividades</p>
                <p className="text-sm text-gray-500">Permitir registro de atividades</p>
              </div>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Ativado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
