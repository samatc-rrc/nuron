import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "nuron_admin";

function adminPassword(): string {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) {
    throw new Error("ADMIN_PASSWORD is not set.");
  }
  return pwd;
}

// Deterministic token derived from the password. Changing the password
// invalidates every existing session cookie.
export function expectedToken(): string {
  return createHmac("sha256", adminPassword())
    .update("nuron-admin-session-v1")
    .digest("hex");
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = expectedToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidToken(store.get(ADMIN_COOKIE)?.value);
}
