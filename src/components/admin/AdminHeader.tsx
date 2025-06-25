
import { useState } from 'react';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export function AdminHeader() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleTheme = () => {
    // Simple theme toggle - in a real app you'd use a theme provider
    document.documentElement.classList.toggle('dark');
  };

  const handleSearchToggle = () => {
    setSearchExpanded(!searchExpanded);
    if (!searchExpanded) {
      // Focus on input after animation
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 150);
    } else {
      setSearchValue('');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 h-[72px]">
      <div className="flex items-center justify-between h-full">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {searchExpanded ? (
              <div className="relative transition-all duration-300 ease-in-out">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                <Input
                  id="search-input"
                  placeholder="Buscar..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 w-64 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  onBlur={() => {
                    if (!searchValue) {
                      setSearchExpanded(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchExpanded(false);
                      setSearchValue('');
                    }
                  }}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Search size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Sun size={20} className="dark:hidden" />
            <Moon size={20} className="hidden dark:block" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell size={20} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs text-white">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notificações</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Você tem 3 notificações não lidas</p>
              </div>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="space-y-1">
                  <div className="font-medium">Novo usuário cadastrado</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">João Silva se cadastrou no sistema</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="space-y-1">
                  <div className="font-medium">Upload concluído</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">5 arquivos foram enviados com sucesso</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:block">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem asChild className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Link to="/admin/perfil">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Link to="/admin/conta">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
