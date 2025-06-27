
import { useState } from 'react';
import { Bell, Search, User, Settings, Palette, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const [notificationCount] = useState(3);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { themeColors, setTheme, availableThemes, currentTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative flex items-center">
            {searchExpanded ? (
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Buscar..."
                  className="w-64 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  autoFocus
                  onBlur={() => setSearchExpanded(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchExpanded(false)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchExpanded(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notificações</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Você tem 3 notificações não lidas</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="space-y-1">
                  <div className="font-medium">Novo usuário cadastrado</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">João Silva se cadastrou no sistema</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="space-y-1">
                  <div className="font-medium">Upload concluído</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">5 arquivos foram enviados com sucesso</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback 
                    className="text-white"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">Administrador</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@imune.gov.br
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">
                <div className="flex items-center">
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Skins</span>
                </div>
              </DropdownMenuLabel>
              {availableThemes.map((theme) => (
                <DropdownMenuItem
                  key={theme.name}
                  onClick={() => setTheme(theme.name)}
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <span className={currentTheme === theme.name ? 'font-semibold' : ''}>
                        {theme.displayName}
                      </span>
                    </div>
                    {currentTheme === theme.name && (
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
