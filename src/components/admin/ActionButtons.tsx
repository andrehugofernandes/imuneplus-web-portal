
import { UserPlus, FileUp, FolderPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const actions = [
  {
    label: 'Criar Novo Usuário',
    icon: UserPlus,
    color: 'bg-blue-500 hover:bg-blue-600',
    badgeColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    label: 'Fazer Upload',
    icon: FileUp,
    color: 'bg-green-500 hover:bg-green-600',
    badgeColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    label: 'Criar Categoria',
    icon: FolderPlus,
    color: 'bg-purple-500 hover:bg-purple-600',
    badgeColor: 'bg-purple-100 dark:bg-purple-900',
  },
];

export function ActionButtons() {
  return (
    <Card className="shadow-lg">
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
                className={`${action.color} text-white h-20 flex items-center justify-start space-x-4 px-6`}
              >
                <Badge className={`${action.badgeColor} p-3 rounded-full`}>
                  <Icon size={28} className="text-current" />
                </Badge>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
