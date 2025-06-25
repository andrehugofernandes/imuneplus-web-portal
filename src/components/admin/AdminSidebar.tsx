
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <TooltipProvider>
      <div className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Header - Altura ajustada para 72px */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-[72px]">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I+</span>
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  IMUNE+
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.route;
              
              const linkContent = (
                <Link
                  to={item.route}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <div className={cn("flex items-center justify-center", collapsed ? "w-8 h-8" : "w-5 h-5")}>
                    <Icon size={24} className="flex-shrink-0" />
                  </div>
                  {!collapsed && (
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              );

              return collapsed ? (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-700 dark:border-gray-200"
                  >
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={item.name}>
                  {linkContent}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}
