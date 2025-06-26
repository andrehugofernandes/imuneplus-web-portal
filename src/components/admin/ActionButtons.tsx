
import { UserPlus, FileUp, FolderPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const actions = [
  {
    label: 'Criar Novo Usuário',
    icon: UserPlus,
    path: '/admin/usuarios',
  },
  {
    label: 'Fazer Upload',
    icon: FileUp,
    path: '/admin/arquivos',
  },
  {
    label: 'Criar Categoria',
    icon: FolderPlus,
    path: '/admin/categorias',
  },
];

export function ActionButtons() {
  const { themeColors, isLightColor } = useTheme();
  const navigate = useNavigate();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const handleActionClick = (path: string) => {
    navigate(path);
  };

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
                className="h-20 flex items-center justify-start space-x-4 px-6 transition-all duration-300 hover:transform hover:scale-105"
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
                onClick={() => handleActionClick(action.path)}
              >
                <Badge 
                  className="p-3 rounded-full"
                  style={{ 
                    backgroundColor: isLightColor(themeColors.primary) ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                    color: isLightColor(themeColors.primary) ? themeColors.primary : '#FFFFFF'
                  }}
                >
                  <Icon size={28} />
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
