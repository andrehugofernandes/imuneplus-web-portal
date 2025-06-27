
import { useState } from 'react';
import { X, User, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeContext';

interface UserFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  editData?: any;
}

export function UserForm({ onClose, onSubmit, editData }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    email: editData?.email || '',
    password: editData?.password || '',
    role: editData?.role || '',
    status: editData?.status || 'Ativo',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const { themeColors, isLightColor } = useTheme();
  const textColor = isLightColor(themeColors.primary) ? '#000000' : '#FFFFFF';

  const generateStrongPassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
    checkPasswordStrength(password);
  };

  const checkPasswordStrength = (password: string) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    const isLongEnough = password.length >= 8;

    const conditions = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar, isLongEnough];
    const score = conditions.filter(Boolean).length;

    if (score < 3) {
      setPasswordStrength('Fraca');
    } else if (score < 5) {
      setPasswordStrength('Média');
    } else {
      setPasswordStrength('Forte');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    if (newPassword) {
      checkPasswordStrength(newPassword);
    } else {
      setPasswordStrength('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <div 
          className="flex items-center justify-between w-full p-4 -m-6 mb-6 rounded-t-lg"
          style={{ 
            backgroundColor: themeColors.primary,
            color: textColor,
          }}
        >
          <div className="flex items-center space-x-3">
            <Badge 
              className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20"
            >
              <User className="h-4 w-4" style={{ color: textColor }} />
            </Badge>
            <SheetTitle className="text-lg font-semibold" style={{ color: textColor }}>
              {editData ? 'Editar Usuário' : 'Novo Usuário'}
            </SheetTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-white/20"
            style={{ color: textColor }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateStrongPassword}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Gerar Senha Forte
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handlePasswordChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {passwordStrength && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">Força da senha:</span>
                <Badge 
                  className={
                    passwordStrength === 'Forte' ? 'bg-green-100 text-green-800' :
                    passwordStrength === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {passwordStrength}
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              style={{ 
                backgroundColor: themeColors.primary,
                color: textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = themeColors.primary;
              }}
            >
              {editData ? 'Atualizar Usuário' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
