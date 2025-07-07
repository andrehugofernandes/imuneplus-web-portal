
'use client';

import { Link } from 'react-router-dom';
import { Shield, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

export function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#0037C1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I+</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">IMUNE+</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jaboatão dos Guararapes</p>
              </div>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <a href="#modulos" className="text-gray-600 dark:text-gray-300 hover:text-[#0037C1] dark:hover:text-blue-400 transition-colors">
              Módulos
            </a>
            <a href="#sobre" className="text-gray-600 dark:text-gray-300 hover:text-[#0037C1] dark:hover:text-blue-400 transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-gray-600 dark:text-gray-300 hover:text-[#0037C1] dark:hover:text-blue-400 transition-colors">
              Contato
            </a>
            
            {/* Search - Expandable */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10 w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                    onBlur={() => setIsSearchOpen(false)}
                    autoFocus
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#0037C1] dark:hover:text-blue-400"
                >
                  <Search size={20} />
                </Button>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-[#0037C1] dark:hover:text-blue-400"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Shield size={16} />
                <span>Admin</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
