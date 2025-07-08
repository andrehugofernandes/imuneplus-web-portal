
import { useState } from 'react';
import { Bell, Search, Sun, Moon, Menu, User, Settings, LogOut, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { themeColors, isLightColor, currentTheme, setTheme, isDarkMode, toggleDarkMode, availableThemes } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    setSearchVisible(false);
    setSearchTerm('');
  };

  const notifications = [
    { id: 1, title: 'Novo usuário cadastrado', time: '5 min atrás' },
    { id: 2, title: 'Upload de documento concluído', time: '10 min atrás' },
    { id: 3, title: 'Sistema atualizado', time: '1 hora atrás' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Dashboard Administrativo
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          {searchVisible ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
                autoFocus
                onBlur={() => {
                  if (!searchTerm) setSearchVisible(false);
                }}
              />
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchVisible(true)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <div 
                  className="w-5 h-5 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: themeColors.primary }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuLabel className="text-gray-900 dark:text-white">Escolher Tema</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableThemes.map((theme) => (
                <DropdownMenuItem
                  key={theme.name}
                  onClick={() => setTheme(theme.name)}
                  className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span>{theme.displayName}</span>
                  </div>
                  {currentTheme === theme.name && <Check className="h-4 w-4 text-green-600" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuLabel className="text-gray-900 dark:text-white">Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="flex flex-col items-start p-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{notification.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                Ver todas as notificações
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal text-gray-900 dark:text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Administrador</p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    admin@imune.gov.br
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link 
                  to="/admin/perfil" 
                  className="flex items-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/admin/conta" 
                  className="flex items-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações da Conta</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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
