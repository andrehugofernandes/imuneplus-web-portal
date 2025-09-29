import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import * as OTPAuth from 'otplib';

interface TwoFactorVerificationProps {
  email: string;
  password: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({
  email,
  password,
  onSuccess,
  onCancel,
}) => {
  const [codes, setCodes] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1);
    
    const newCodes = [...codes];
    newCodes[index] = digit;
    setCodes(newCodes);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (digit && index === 5 && newCodes.every(code => code !== '')) {
      handleVerify(newCodes.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCodes = paste.split('').concat(['', '', '', '', '', '']).slice(0, 6);
    setCodes(newCodes);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newCodes.findIndex(code => code === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (paste.length === 6) {
      handleVerify(paste);
    }
  };

  const handleVerify = async (code: string) => {
    setLoading(true);
    setError('');

    try {
      // First, get the user's 2FA secret by signing in temporarily
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Credenciais inválidas');
        setLoading(false);
        return;
      }

      // Get the user's 2FA secret
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('two_factor_secret')
        .eq('user_id', signInData.user.id)
        .single();

      if (profileError || !profile?.two_factor_secret) {
        setError('Erro ao verificar autenticação');
        setLoading(false);
        return;
      }

      // Verify the TOTP code
      const isValid = OTPAuth.authenticator.verify({
        token: code,
        secret: profile.two_factor_secret,
      });

      if (!isValid) {
        // Sign out the temporary session
        await supabase.auth.signOut();
        setError('Código inválido. Tente novamente.');
        setCodes(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setLoading(false);
        return;
      }

      // Success! User is already signed in
      onSuccess();
    } catch (err) {
      setError('Erro ao verificar código');
      setLoading(false);
    }
  };

  const manualVerify = () => {
    const code = codes.join('');
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Verificação em 2 Etapas</CardTitle>
        <CardDescription>
          Digite o código de 6 dígitos do seu aplicativo autenticador
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-center space-x-2">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-14 h-14 text-center text-2xl font-mono border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
              disabled={loading}
            />
          ))}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Button 
            onClick={manualVerify}
            className="w-full"
            disabled={loading || codes.some(code => code === '')}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verificar
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="w-full"
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          O código é automaticamente verificado ao inserir o 6º dígito
        </p>
      </CardContent>
    </Card>
  );
};