
'use client';

import { UserPlus, FileUp, FolderPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const actions = [
  {
    label: 'Criar Novo Usuário',
    icon: UserPlus,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    label: 'Fazer Upload',
    icon: FileUp,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    label: 'Criar Categoria',
    icon: FolderPlus,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];

export function ActionButtons() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <p className="text-sm text-gray-500">
          Acesse as principais funcionalidades do sistema
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                className={`${action.color} text-white h-20 flex flex-col space-y-2`}
              >
                <Icon size={24} />
                <span className="text-sm">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
