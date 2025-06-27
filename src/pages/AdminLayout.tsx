
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <AdminHeader onToggleSidebar={toggleSidebar} />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
