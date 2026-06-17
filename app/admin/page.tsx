import { ensureSchema, getPool } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { type Registration } from "@/lib/fields";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    return <AdminLogin />;
  }

  await ensureSchema();
  const { rows } = await getPool().query<Registration>(
    "SELECT * FROM registrations ORDER BY id DESC"
  );

  return <AdminDashboard rows={rows} />;
}
