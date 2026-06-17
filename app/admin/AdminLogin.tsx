"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "เข้าสู่ระบบไม่สำเร็จ");
    } catch {
      setError("เชื่อมต่อไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100"
      >
        <div>
          <h1 className="text-2xl font-bold text-nuron-navy">NURON Admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            รายชื่อผู้ลงทะเบียน Affiliate Marketing Masterclass
          </p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-nuron-navy"
          >
            รหัสผ่านผู้ดูแล
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-nuron-red focus:ring-2 focus:ring-nuron-red/20"
          />
        </div>
        {error && <p className="text-sm text-nuron-red">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-nuron-navy px-6 py-3 font-bold text-white transition hover:bg-nuron-navy-light disabled:opacity-60"
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
    </div>
  );
}
