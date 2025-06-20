
import { UsersTable } from '@/components/admin/UsersTable';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestão de Usuários
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie os usuários do sistema
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
