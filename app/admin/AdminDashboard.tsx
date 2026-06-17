"use client";

import { useMemo, useState } from "react";
import { ADMIN_COLUMNS, type Registration } from "@/lib/fields";

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function cellText(row: Registration, key: keyof Registration): string {
  const value = row[key];
  if (value === null || value === undefined || value === "") return "—";
  if (key === "created_at") return formatDate(String(value));
  return String(value);
}

export default function AdminDashboard({ rows }: { rows: Registration[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [row.full_name, row.phone, row.social_username, row.organization]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, query]);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <h1 className="text-xl font-bold text-nuron-navy">
              ผู้ลงทะเบียน
              <span className="ml-2 rounded-full bg-nuron-red/10 px-2.5 py-0.5 text-sm font-bold text-nuron-red">
                {rows.length}
              </span>
            </h1>
            <p className="text-sm text-slate-500">
              Affiliate Marketing Masterclass
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              className="rounded-xl bg-nuron-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-nuron-red-dark"
            >
              ดาวน์โหลด CSV
            </a>
            <button
              onClick={logout}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-6">
        <input
          type="search"
          placeholder="ค้นหา ชื่อ / เบอร์โทร / Username / หน่วยงาน..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 w-full max-w-md rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none focus:border-nuron-red focus:ring-2 focus:ring-nuron-red/20"
        />

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-400 ring-1 ring-slate-100">
            ยังไม่มีข้อมูลที่ตรงกับการค้นหา
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-slate-100">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-nuron-navy">
                  {ADMIN_COLUMNS.map((col) => (
                    <th key={col.key} className="px-4 py-3 font-semibold">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    {ADMIN_COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className="max-w-xs px-4 py-3 align-top text-slate-700"
                      >
                        {col.key === "expectation" ? (
                          <span className="block whitespace-pre-wrap">
                            {cellText(row, col.key)}
                          </span>
                        ) : (
                          cellText(row, col.key)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
