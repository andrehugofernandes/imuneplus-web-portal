
'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#0037C1] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I+</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IMUNE+</h1>
                <p className="text-xs text-gray-500">Jaboatão dos Guararapes</p>
              </div>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link href="#modulos" className="text-gray-600 hover:text-[#0037C1] transition-colors">
              Módulos
            </Link>
            <Link href="#sobre" className="text-gray-600 hover:text-[#0037C1] transition-colors">
              Sobre
            </Link>
            <Link href="#contato" className="text-gray-600 hover:text-[#0037C1] transition-colors">
              Contato
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
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
