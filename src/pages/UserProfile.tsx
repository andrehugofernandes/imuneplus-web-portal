
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function UserProfile() {
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Meu Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie suas informações pessoais
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: themeColors.primary }}
            >
              <User size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Administrador
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">admin@imune.gov.br</p>
            <button 
              className="px-4 py-2 rounded-lg transition-colors"
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
              Alterar Foto
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Informações Pessoais</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                defaultValue="Administrador do Sistema"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                <Mail size={16} className="inline mr-1" />
                Email
              </label>
              <input
                type="email"
                defaultValue="admin@imune.gov.br"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                <Phone size={16} className="inline mr-1" />
                Telefone
              </label>
              <input
                type="tel"
                defaultValue="(81) 9999-9999"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                <MapPin size={16} className="inline mr-1" />
                Localização
              </label>
              <input
                type="text"
                defaultValue="Jaboatão dos Guararapes, PE"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                <Calendar size={16} className="inline mr-1" />
                Cargo
              </label>
              <input
                type="text"
                defaultValue="Administrador do Sistema"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                Departamento
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${themeColors.primary}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option>Tecnologia da Informação</option>
                <option>Recursos Humanos</option>
                <option>Administração</option>
                <option>Saúde</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              className="px-6 py-2 rounded-lg transition-colors"
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
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
