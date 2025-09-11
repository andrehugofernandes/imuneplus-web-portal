
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Users } from 'lucide-react';
import { UserForm } from '@/components/admin/UserForm';
import { UserAvatar } from '@/components/ui/user-avatar';

const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@saude.jaboatao.pe.gov.br',
    role: 'ADMIN' as const,
    status: 'Ativo',
    createdAt: '2024-01-15',
    avatar_url: null,
    job_title: 'Administrador do Sistema',
    department: 'TI'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@saude.jaboatao.pe.gov.br',
    role: 'COORDENADOR' as const,
    status: 'Ativo',
    createdAt: '2024-01-10',
    avatar_url: null,
    job_title: 'Coordenadora de Enfermagem',
    department: 'SAUDE'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro.costa@saude.jaboatao.pe.gov.br',
    role: 'USER' as const,
    status: 'Inativo',
    createdAt: '2024-01-05',
    avatar_url: null,
    job_title: 'Técnico em Enfermagem',
    department: 'SAUDE'
  },
];

export function UsersTable() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditUser = (user: any) => {
    console.log('Editing user:', user);
    setEditingUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      password: '' // Password should be empty for editing
    });
    setShowEditForm(true);
  };

  const handleEditSubmit = (data: any) => {
    console.log('User edit submitted:', data);
    setShowEditForm(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      console.log(`Usuário ${userId} deletado`);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'destructive';
      case 'COORDENADOR': return 'default';
      case 'USER': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'Ativo' ? 'default' : 'secondary';
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <CardTitle>Lista de Usuários</CardTitle>
          </div>
          <p className="text-sm text-gray-500">
            Gerencie os usuários do sistema
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Buscar usuários..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-sm"
            />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="sm:max-w-[180px]">
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="COORDENADOR">Coordenador</SelectItem>
                <SelectItem value="USER">Usuário</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="sm:max-w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <UserAvatar
                        name={user.name}
                        email={user.email}
                        avatar_url={user.avatar_url}
                        role={user.role}
                        size="md"
                        showEmail={true}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role === 'ADMIN' ? 'Admin' : 
                         user.role === 'COORDENADOR' ? 'Coordenador' : 'Usuário'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditUser(user)}
                          title={`Editar usuário: ${user.name}`}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                          title={`Deletar usuário: ${user.name}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showEditForm && editingUser && (
        <UserForm
          onClose={() => {
            setShowEditForm(false);
            setEditingUser(null);
          }}
          onSubmit={handleEditSubmit}
          editData={editingUser}
        />
      )}
    </>
  );
}
