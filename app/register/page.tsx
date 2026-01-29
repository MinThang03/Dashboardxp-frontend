"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* ===== BACKGROUND IMAGE (GIỐNG LOGIN) ===== */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('/bg_register.jpg')",
        }}
      />
      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-2xl bg-white shadow-[0_60px_140px_-40px_rgba(15,23,42,0.35)]">
          <div className="p-9 space-y-7">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-xl">
                SC
              </div>
              <h1 className="text-[30px] font-semibold tracking-tight text-slate-900">
                Tạo tài khoản
              </h1>
              <p className="text-[15px] text-slate-500">
                Hệ thống điều hành & trợ lý AI cho UBND
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">
                  Họ và tên
                </label>
                <Input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="h-12 text-[15px] bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="h-12 text-[15px] bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <Input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 text-[15px] bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">
                  Nhập lại mật khẩu
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="h-12 text-[15px] bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-semibold text-slate-700">
                  Vai trò
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="
                    h-12 w-full text-[15px] rounded-lg
                    border border-slate-300 bg-slate-50 px-3
                    focus:bg-white focus:border-indigo-600
                    focus:ring-4 focus:ring-indigo-100 transition
                  "
                >
                  <option value="citizen">Công dân</option>
                  <option value="officer">Cán bộ</option>
                </select>
              </div>

              <Button
                type="submit"
                className="h-12 w-full text-[16px] font-medium bg-indigo-700 hover:bg-indigo-800 shadow-xl shadow-indigo-700/30 transition-all"
              >
                Đăng ký
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-[14px] text-slate-600">
              Đã có tài khoản?{" "}
              <button
                className="font-semibold text-indigo-600 hover:underline"
                onClick={() => router.push("/")}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
