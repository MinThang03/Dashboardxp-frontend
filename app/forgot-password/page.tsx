"use client";

import { useEffect, useState } from "react";
import { Mail, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendCode = async () => {
    if (!email) return setError("Vui lòng nhập email");

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCooldown(60);
    }, 1000);
  };

  const handleVerify = async () => {
    if (!otp) return setError("Vui lòng nhập mã xác thực");

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      alert("OTP hợp lệ → chuyển sang reset password");
    }, 1000);
  };

  const handleChangeEmail = () => {
    setStep(1);
    setOtp("");
    setCooldown(0);
    setError("");
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

      {/* ===== OVERLAY ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-slate-100/60 to-sky-100/60 backdrop-blur-[2px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-2xl bg-white shadow-[0_60px_140px_-40px_rgba(15,23,42,0.35)]">
          <div className="p-9 space-y-7">
            {/* Header */}
            <div className="space-y-3 text-center">
              <div className="mx-auto w-14 h-14 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-xl">
                SC
              </div>
              <h1 className="text-[30px] font-semibold tracking-tight text-slate-900">
                Quên mật khẩu
              </h1>
              <p className="text-[15px] text-slate-500 leading-relaxed">
                {step === 1
                  ? "Nhập email để nhận mã xác thực"
                  : "Nhập mã xác thực đã được gửi tới email của bạn"}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="text-[14px] text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[15px] font-semibold text-slate-700">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="
                        w-full h-12 pl-10 pr-4 text-[15px] rounded-lg
                        bg-slate-50 border border-slate-200
                        focus:bg-white focus:border-indigo-600
                        focus:ring-4 focus:ring-indigo-100
                        transition outline-none
                      "
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendCode}
                  disabled={loading}
                  className="
                    w-full h-12 rounded-lg text-[16px] font-medium
                    bg-indigo-700 text-white
                    hover:bg-indigo-800
                    transition flex items-center justify-center gap-2
                    shadow-lg shadow-indigo-700/30
                  "
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Gửi mã xác thực
                </button>

                <a
                  href="/"
                  className="flex items-center justify-center gap-1 text-[14px] font-medium text-slate-500 hover:text-indigo-600 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại đăng nhập
                </a>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-[14px] text-slate-600 leading-relaxed text-center">
                  Mã xác thực đã gửi tới{" "}
                  <span className="font-semibold text-slate-900">{email}</span>
                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    className="ml-2 font-medium text-indigo-600 hover:underline"
                  >
                    Thay đổi email
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-semibold text-slate-700">
                    Mã xác thực
                  </label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition" />
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Nhập mã OTP"
                      className="
                        w-full h-12 pl-10 pr-4 text-[15px] rounded-lg
                        bg-slate-50 border border-slate-200
                        focus:bg-white focus:border-indigo-600
                        focus:ring-4 focus:ring-indigo-100
                        transition outline-none tracking-widest
                      "
                    />
                  </div>
                </div>

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="
                    w-full h-12 rounded-lg text-[16px] font-medium
                    bg-indigo-700 text-white
                    hover:bg-indigo-800
                    transition flex items-center justify-center gap-2
                    shadow-lg shadow-indigo-700/30
                  "
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Xác nhận
                </button>

                <button
                  disabled={cooldown > 0}
                  onClick={handleSendCode}
                  className="w-full text-[14px] font-medium text-slate-500 hover:text-indigo-600 disabled:opacity-50 transition"
                >
                  {cooldown > 0
                    ? `Gửi lại mã sau ${cooldown}s`
                    : "Gửi lại mã"}
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
