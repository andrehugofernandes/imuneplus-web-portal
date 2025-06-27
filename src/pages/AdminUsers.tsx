
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UsersTable } from '@/components/admin/UsersTable';
import { UserForm } from '@/components/admin/UserForm';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminUsers() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleUserSubmit = (data: any) => {
    console.log('User data:', data);
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestão de Usuários
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie os usuários do sistema
          </p>
        </div>
        <Button 
          onClick={() => setShowUserForm(true)}
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
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <UsersTable />
      
      {showUserForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <UserForm 
            onClose={() => {
              setShowUserForm(false);
              setEditingUser(null);
            }}
            onSubmit={handleUserSubmit}
            editData={editingUser}
          />
        </div>
      )}
    </div>
  );
}
