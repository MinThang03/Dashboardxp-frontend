"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, Mail, Lock, User } from "lucide-react";

const DEMO_ACCOUNTS = [
  { email: "admin@ubnd.vn", password: "password", role: "admin" as const, name: "Quản trị hệ thống" },
  { email: "leader@ubnd.vn", password: "password", role: "leader" as const, name: "Lãnh đạo UBND" },
  { email: "officer@ubnd.vn", password: "password", role: "officer" as const, name: "Cán bộ chuyên môn" },
  { email: "citizen@ubnd.vn", password: "password", role: "citizen" as const, name: "Công dân" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("leader@ubnd.vn");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<UserRole>("leader");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password, role);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
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
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/bg_register.jpg')" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <Card
          className="
          w-full max-w-lg 
          rounded-[28px] 
          bg-white/85 backdrop-blur-2xl 
          border border-white/50
          shadow-[0_60px_160px_-30px_rgba(0,0,0,0.55)]
        "
        >
          <div className="p-10 space-y-9">
            {/* HEADER */}
            <div className="text-center space-y-3">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-xl">
                SC
              </div>

              <h1 className="text-[34px] font-bold tracking-tight text-slate-900">
                Đăng nhập hệ thống
              </h1>

              <p className="text-[15px] text-slate-600">
                Smart Commune • Nền tảng điều hành số
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[15px]">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition" />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="h-14 pl-12 pr-4 text-[17px] rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">Mật khẩu</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-14 pl-12 pr-4 text-[17px] rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              {/* ROLE */}
              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">Vai trò</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="h-14 w-full pl-12 pr-4 text-[17px] rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  >
                    <option value="admin">Quản trị hệ thống</option>
                    <option value="leader">Lãnh đạo</option>
                    <option value="officer">Cán bộ</option>
                    <option value="citizen">Công dân</option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <Button
                disabled={isLoading}
                className="h-14 w-full text-[17px] font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-xl shadow-indigo-500/35 transition-all duration-200 hover:-translate-y-[1px]"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>

            {/* LINKS */}
            <div className="flex justify-between text-[14px]">
              <button
                onClick={() => router.push("/forgot-password")}
                className="text-slate-600 hover:text-indigo-600 transition"
              >
                Quên mật khẩu?
              </button>
              <button
                onClick={() => router.push("/register")}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
              >
                Tạo tài khoản →
              </button>
            </div>

            {/* QUICK LOGIN */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="text-[14px] font-semibold text-slate-600 text-center">
                Đăng nhập nhanh
              </div>

              <div className="grid grid-cols-2 gap-3">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => handleQuickLogin(acc)}
                    className="group flex items-center justify-center gap-2 h-11 rounded-xl text-[14px] font-medium bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-600 transition" />
                    {acc.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
