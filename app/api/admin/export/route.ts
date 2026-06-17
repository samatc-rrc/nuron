import { NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { ADMIN_COLUMNS, type Registration } from "@/lib/fields";

export const runtime = "nodejs";

function formatDate(value: unknown): string {
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value ?? "");
  // YYYY-MM-DD HH:mm in Thailand time — sorts cleanly and reads clearly.
  return d
    .toLocaleString("sv-SE", { timeZone: "Asia/Bangkok" })
    .replace("T", " ");
}

function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  // Escape per RFC 4180.
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  await ensureSchema();
  const { rows } = await getPool().query<Registration>(
    "SELECT * FROM registrations ORDER BY id ASC"
  );

  const header = ADMIN_COLUMNS.map((c) => csvCell(c.label)).join(",");
  const lines = rows.map((row) =>
    ADMIN_COLUMNS.map((c) =>
      c.key === "created_at"
        ? csvCell(formatDate(row[c.key]))
        : csvCell(row[c.key])
    ).join(",")
  );
  // UTF-8 BOM so Excel renders Thai correctly.
  const csv = "﻿" + [header, ...lines].join("\r\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="nuron-registrations.csv"`,
    },
  });
}
