import { useProfile } from './useProfile';

type UserRole = 'ADMIN' | 'COORDENADOR' | 'USER';

interface RolePermissions {
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canManageRoles: boolean;
  canViewReports: boolean;
  canEditSettings: boolean;
  canUploadFiles: boolean;
  canViewAnalytics: boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  ADMIN: {
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canManageRoles: true,
    canViewReports: true,
    canEditSettings: true,
    canUploadFiles: true,
    canViewAnalytics: true,
  },
  COORDENADOR: {
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: false,
    canManageRoles: false,
    canViewReports: true,
    canEditSettings: false,
    canUploadFiles: true,
    canViewAnalytics: true,
  },
  USER: {
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canManageRoles: false,
    canViewReports: false,
    canEditSettings: false,
    canUploadFiles: true,
    canViewAnalytics: false,
  },
};

export function useRoles() {
  const { profile } = useProfile();
  
  const userRole: UserRole = profile?.role || 'USER';
  const permissions = ROLE_PERMISSIONS[userRole];
  
  const hasPermission = (permission: keyof RolePermissions): boolean => {
    return permissions[permission];
  };
  
  const hasRole = (role: UserRole): boolean => {
    return userRole === role;
  };
  
  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.includes(userRole);
  };
  
  return {
    userRole,
    permissions,
    hasPermission,
    hasRole,
    hasAnyRole,
  };
}