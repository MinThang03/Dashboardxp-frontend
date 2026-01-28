'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, type UserRole } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { email: 'admin@ubnd.vn', password: 'password', role: 'admin' as const, name: 'Admin' },
  { email: 'leader@ubnd.vn', password: 'password', role: 'leader' as const, name: 'Lãnh đạo' },
  { email: 'officer@ubnd.vn', password: 'password', role: 'officer' as const, name: 'Cán bộ' },
  { email: 'citizen@ubnd.vn', password: 'password', role: 'citizen' as const, name: 'Công dân' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('leader@ubnd.vn');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState<UserRole>('leader');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, role);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (acc: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setRole(acc.role);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Login Card - nền trắng, viền theo bảng màu */}
      <Card className="w-full max-w-md bg-card border-border shadow-lg relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="p-8 space-y-6">
          {/* Header - xanh dương chính quyền */}
          <div className="text-center space-y-2 animate-in fade-in slide-in-from-top duration-700 delay-100">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-md animate-in zoom-in duration-500 delay-200">
              <span className="text-primary-foreground text-2xl font-bold">SC</span>
            </div>
            <h1 className="text-3xl font-bold text-primary animate-in fade-in duration-700 delay-300">
              Smart Commune
            </h1>
            <p className="text-muted-foreground text-sm animate-in fade-in duration-700 delay-400">
              Hệ thống Bảng điều khiển & Trợ lý AI cho UBND xã/phường
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            {error && (
              <div className="flex gap-2 p-3 bg-status-danger/10 text-status-danger rounded-lg text-sm border border-status-danger/30 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-input border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Mật khẩu
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-input border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Vai trò
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="admin">Quản trị viên</option>
                <option value="leader">Lãnh đạo</option>
                <option value="officer">Cán bộ chuyên môn</option>
                <option value="citizen">Công dân</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </form>

          {/* Quick Login */}
          <div className="space-y-3 animate-in fade-in duration-700 delay-700">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Tài khoản demo
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc, index) => (
                <Button
                  key={acc.email}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin(acc)}
                  className="text-xs border-border hover:bg-primary/10 hover:border-primary transition-all"
                >
                  <span className="truncate">{acc.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground animate-in fade-in duration-700 delay-1000">
            <p>© 2024 Smart Commune Dashboard</p>
            <p className="mt-1">Hệ thống quản lý xã/phường thông minh</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
