import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Building2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ProfilePhotoForm } from '@/components/admin/ProfilePhotoForm';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: '',
    department: ''
  });
  const { themeColors, isLightColor } = useTheme();
  const { user } = useAuth();
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        job_title: profile.job_title || '',
        department: profile.department || ''
      });
    }
  }, [profile]);

  const handlePhotoSubmit = async (photo: File) => {
    const result = await uploadAvatar(photo);
    if (result?.success) {
      setShowPhotoForm(false);
    }
  };

  const handleSave = async () => {
    await updateProfile(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

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
          <div className="flex items-center justify-center h-full">
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
                onClick={() => setShowPhotoForm(true)}
              >
                Alterar Foto
              </button>
            </div>
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
              aria-label='Nome Completo'
                type="text"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
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
              aria-label='Email'
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone size={16} className="inline mr-1" />
                Telefone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(81) 99999-9999"
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
                <User size={16} className="inline mr-1" />
                Função
              </label>
              <input
              aria-label='Função'
                type="text"
                value={profile?.role || 'USER'}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Cargo
              </label>
              <input
                type="text"
                value={formData.job_title}
                onChange={(e) => handleInputChange('job_title', e.target.value)}
                placeholder="Ex: Desenvolvedor, Analista..."
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
                <Building2 size={16} className="inline mr-1" />
                Departamento
              </label>
              <select 
              aria-label='Departamento'
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${themeColors.primary}40`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <option value="">Selecione um departamento</option>
                <option value="TI">Tecnologia da Informação</option>
                <option value="RH">Recursos Humanos</option>
                <option value="ADM">Administração</option>
                <option value="SAUDE">Saúde</option>
                <option value="FINANCEIRO">Financeiro</option>
                <option value="JURIDICO">Jurídico</option>
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
              onClick={handleSave}
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      {showPhotoForm && (
        <ProfilePhotoForm 
          onClose={() => setShowPhotoForm(false)}
          onSubmit={handlePhotoSubmit}
        />
      )}
    </div>
  );
}
