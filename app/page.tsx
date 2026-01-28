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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-200/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/90 border-gray-200 shadow-2xl backdrop-blur-sm relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 animate-in fade-in slide-in-from-top duration-700 delay-100">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-in zoom-in duration-500 delay-200">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-transparent bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold">SC</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-in fade-in duration-700 delay-300">
              Smart Commune
            </h1>
            <p className="text-gray-600 text-sm animate-in fade-in duration-700 delay-400">
              Hệ thống Bảng điều khiển & Trợ lý AI cho UBND xã/phường
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            {error && (
              <div className="flex gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Vai trò
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
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
                <span className="bg-white px-2 text-gray-500">
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
                  className={`text-xs border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:scale-105 transition-all animate-in fade-in duration-500 delay-${800 + index * 100}`}
                >
                  <span className="truncate">{acc.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 text-center text-xs text-gray-500 animate-in fade-in duration-700 delay-1000">
            <p>© 2024 Smart Commune Dashboard</p>
            <p className="mt-1">Hệ thống quản lý xã/phường thông minh</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
