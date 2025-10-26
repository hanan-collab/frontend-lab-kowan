import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        const mockUser = {
          id: '1',
          name: 'Budi Investigator',
          email: credentials.email,
          role: 'Admin',
          avatar: null,
        };
        onLogin(mockUser);
        toast.success('Login berhasil');
      } else {
        toast.error('Masukkan kredensial yang valid');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <Card className="w-full max-w-md bg-slate-900/80 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Platform Pelacakan Aset</CardTitle>
            <CardDescription className="text-slate-400">
              Sistem intelijen investigasi yang aman
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email / Nama Pengguna
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="investigator@agency.go.id"
                value={credentials.email}
                onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Kata Sandi
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {showOTP && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-slate-300">
                  Kode Dua Faktor
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={credentials.otp}
                  onChange={e => setCredentials(prev => ({ ...prev, otp: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white text-center tracking-widest"
                  maxLength={6}
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Memverifikasi...' : 'Masuk'}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => setShowOTP(!showOTP)}
              >
                {showOTP ? 'Sembunyikan' : 'Aktifkan'} Autentifikasi Dua Faktor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
