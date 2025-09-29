import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type UserRole = 'ADMIN' | 'COORDENADOR' | 'USER';

interface UserAvatarProps {
  name: string;
  email: string;
  avatar_url?: string | null;
  role?: UserRole;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRole?: boolean;
  showEmail?: boolean;
  className?: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'ADMIN':
      return 'destructive';
    case 'COORDENADOR':
      return 'default';
    case 'USER':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case 'ADMIN':
      return 'Admin';
    case 'COORDENADOR':
      return 'Coord.';
    case 'USER':
      return 'Usuário';
    default:
      return role;
  }
};

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

export function UserAvatar({ 
  name, 
  email, 
  avatar_url, 
  role = 'USER',
  size = 'md',
  showRole = false,
  showEmail = false,
  className 
}: UserAvatarProps) {
  const initials = getInitials(name);
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={avatar_url || ''} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        {showRole && (
          <Badge 
            variant={getRoleColor(role)}
            className="absolute -top-1 -right-1 text-xs px-1 py-0 h-5"
          >
            {getRoleLabel(role)}
          </Badge>
        )}
      </div>
      
      {(showEmail || size === 'lg' || size === 'xl') && (
        <div className="min-w-0 flex-1">
          <p className={cn(
            "font-medium text-foreground truncate",
            size === 'sm' && "text-sm",
            size === 'md' && "text-sm",
            size === 'lg' && "text-base",
            size === 'xl' && "text-lg"
          )}>
            {name}
          </p>
          {showEmail && (
            <p className={cn(
              "text-muted-foreground truncate",
              size === 'sm' && "text-xs",
              size === 'md' && "text-xs",
              size === 'lg' && "text-sm",
              size === 'xl' && "text-sm"
            )}>
              {email}
            </p>
          )}
          {showRole && (
            <Badge variant={getRoleColor(role)} className="mt-1 text-xs">
              {getRoleLabel(role)}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}