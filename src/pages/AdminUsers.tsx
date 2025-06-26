
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UsersTable } from '@/components/admin/UsersTable';
import { UserForm } from '@/components/admin/UserForm';

export default function AdminUsers() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleUserSubmit = (data: any) => {
    console.log('User data:', data);
    setShowUserForm(false);
    setEditingUser(null);
    // Aqui você adicionaria a lógica para salvar o usuário
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
        <Sheet open={showUserForm} onOpenChange={setShowUserForm}>
          <SheetTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </SheetTrigger>
          <SheetContent>
            <UserForm 
              onClose={() => {
                setShowUserForm(false);
                setEditingUser(null);
              }}
              onSubmit={handleUserSubmit}
              editData={editingUser}
            />
          </SheetContent>
        </Sheet>
      </div>

      <UsersTable />
    </div>
  );
}
