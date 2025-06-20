
'use client';

import { useState } from 'react';
import { UsersTable } from '@/components/admin/UsersTable';
import { UserForm } from '@/components/admin/UserForm';
import { Button } from '@/components/ui/button';
import { UserPlus, Upload, Download } from 'lucide-react';

export default function UsuariosPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestão de Usuários
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie os usuários do sistema
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload size={16} className="mr-2" />
            Importar
          </Button>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <UserPlus size={16} className="mr-2" />
            Adicionar Usuário
          </Button>
        </div>
      </div>

      <UsersTable />
      
      {showForm && (
        <UserForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
