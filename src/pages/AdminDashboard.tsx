
import { StatsCards } from '@/components/admin/StatsCards';
import { ChartsSection } from '@/components/admin/ChartsSection';
import { ActionButtons } from '@/components/admin/ActionButtons';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Visão geral das estatísticas e atividades do sistema
        </p>
      </div>

      <StatsCards />
      <ChartsSection />
      <ActionButtons />
    </div>
  );
}
