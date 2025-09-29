import React from 'react';
import { useRoles } from '@/hooks/useRoles';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

type UserRole = 'ADMIN' | 'COORDENADOR' | 'USER';

interface RoleGuardProps {
  allowedRoles?: UserRole[];
  requiredPermission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ 
  allowedRoles, 
  requiredPermission, 
  children, 
  fallback 
}: RoleGuardProps) {
  const { userRole, hasPermission, hasAnyRole } = useRoles();
  
  let hasAccess = false;
  
  if (allowedRoles) {
    hasAccess = hasAnyRole(allowedRoles);
  }
  
  if (requiredPermission) {
    hasAccess = hasPermission(requiredPermission as any);
  }
  
  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Você não tem permissão para acessar esta funcionalidade.
          Seu nível atual: {userRole}
        </AlertDescription>
      </Alert>
    );
  }
  
  return <>{children}</>;
}