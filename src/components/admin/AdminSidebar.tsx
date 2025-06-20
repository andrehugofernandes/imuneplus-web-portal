
import { 
  BarChart, 
  Users, 
  FolderTree, 
  FileText, 
  List, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { name: 'Dashboard', icon: BarChart, route: '/admin/dashboard' },
  { name: 'Usuários', icon: Users, route: '/admin/usuarios' },
  { name: 'Categorias', icon: FolderTree, route: '/admin/categorias' },
  { name: 'Arquivos', icon: FileText, route: '/admin/arquivos' },
  { name: 'Logs', icon: List, route: '/admin/logs' },
  { name: 'API Docs', icon: FileText, route: '/admin/api-docs' },
  { name: 'Configurações', icon: Settings, route: '/admin/configuracoes' },
];

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-12" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I+</span>
              </div>
              <span className="font-bold text-lg text-gray-900">
                IMUNE+
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            
            return (
              <Link
                key={item.name}
                to={item.route}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center"
                )}
              >
                <Icon size={collapsed ? 28 : 20} />
                {!collapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
