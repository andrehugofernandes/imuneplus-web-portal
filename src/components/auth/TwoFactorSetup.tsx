import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, QrCode, Shield, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import * as OTPAuth from 'otplib';
import QRCode from 'qrcode';

interface TwoFactorSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<'generate' | 'verify'>('generate');
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    generateSecret();
  }, []);

  const generateSecret = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Usuário não encontrado');
        return;
      }

      // Generate a new secret
      const newSecret = OTPAuth.authenticator.generateSecret();
      setSecret(newSecret);

      // Create the TOTP URL
      const otpUrl = OTPAuth.authenticator.keyuri(
        user.email || '',
        'IMUNE+ Admin',
        newSecret
      );

      // Generate QR code
      const qrUrl = await QRCode.toDataURL(otpUrl);
      setQrCodeUrl(qrUrl);
    } catch (err) {
      setError('Erro ao gerar código QR');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Digite um código de 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify the token
      const isValid = OTPAuth.authenticator.verify({
        token: verificationCode,
        secret: secret,
      });

      if (!isValid) {
        setError('Código inválido. Tente novamente.');
        setLoading(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Usuário não encontrado');
        setLoading(false);
        return;
      }

      // Save the secret and enable 2FA
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          two_factor_enabled: true,
          two_factor_secret: secret,
        })
        .eq('user_id', user.id);

      if (updateError) {
        setError('Erro ao ativar autenticação de dois fatores');
        setLoading(false);
        return;
      }

      // Success!
      onComplete();
    } catch (err) {
      setError('Erro ao verificar código');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'generate') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <QrCode className="h-12 w-12 text-primary" />
          </div>
          <CardTitle>Configurar Autenticação 2FA</CardTitle>
          <CardDescription>
            Escaneie o código QR com seu aplicativo autenticador
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              {qrCodeUrl && (
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="QR Code" className="border rounded-lg" />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Chave secreta (alternativa)</Label>
                <Input value={secret} readOnly className="font-mono text-sm" />
                <p className="text-xs text-muted-foreground">
                  Caso não consiga escanear o QR code, digite esta chave manualmente no seu aplicativo
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={() => setStep('verify')} 
                  className="w-full"
                  disabled={!secret}
                >
                  Continuar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onCancel} 
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Verificar Configuração</CardTitle>
        <CardDescription>
          Digite o código de 6 dígitos do seu aplicativo autenticador
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="verification-code">Código de Verificação</Label>
          <Input
            id="verification-code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            className="text-center text-lg font-mono tracking-widest"
            maxLength={6}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Button 
            onClick={verifyAndEnable} 
            className="w-full"
            disabled={loading || verificationCode.length !== 6}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Check className="mr-2 h-4 w-4" />
            Ativar 2FA
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setStep('generate')} 
            className="w-full"
            disabled={loading}
          >
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};