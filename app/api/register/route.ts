import { NextResponse } from "next/server";
import { ensureSchema, getPool } from "@/lib/db";
import { NO, YES } from "@/lib/fields";

export const runtime = "nodejs";

const MAX = {
  full_name: 200,
  phone: 30,
  social_username: 200,
  sold_category: 500,
  organization: 300,
  expectation: 2000,
};

type Body = Record<string, unknown>;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "รูปแบบข้อมูลไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  const fullName = str(body.full_name);
  const phone = str(body.phone);
  const socialUsername = str(body.social_username);
  const hasBought = str(body.has_bought);
  const hasSold = str(body.has_sold);
  const soldCategory = str(body.sold_category);
  const organization = str(body.organization);
  const expectation = str(body.expectation);

  const errors: Record<string, string> = {};

  if (!fullName) errors.full_name = "กรุณากรอกชื่อ-นามสกุล";
  if (!phone) errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
  else if (!/^[0-9+\-\s()]{6,30}$/.test(phone))
    errors.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
  // Social username is optional ("ถ้ามี" — only if they have a channel).

  if (hasBought && hasBought !== YES && hasBought !== NO)
    errors.has_bought = "ค่าไม่ถูกต้อง";

  if (hasSold !== YES && hasSold !== NO)
    errors.has_sold = "กรุณาเลือกว่าเคยขายผ่าน Social affiliate หรือไม่";

  // Conditional: product category only required when they have sold before.
  if (hasSold === YES && !soldCategory)
    errors.sold_category = "กรุณาระบุประเภทสินค้าที่ขาย";

  // Length guards.
  if (fullName.length > MAX.full_name) errors.full_name = "ยาวเกินไป";
  if (socialUsername.length > MAX.social_username)
    errors.social_username = "ยาวเกินไป";
  if (soldCategory.length > MAX.sold_category) errors.sold_category = "ยาวเกินไป";
  if (organization.length > MAX.organization) errors.organization = "ยาวเกินไป";
  if (expectation.length > MAX.expectation) errors.expectation = "ยาวเกินไป";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO registrations
        (full_name, phone, social_username, has_bought, has_sold, sold_category, organization, expectation)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        fullName,
        phone,
        socialUsername,
        hasBought || null,
        hasSold,
        hasSold === YES ? soldCategory || null : null,
        organization || null,
        expectation || null,
      ]
    );
  } catch (err) {
    console.error("Failed to save registration:", err);
    return NextResponse.json(
      { error: "บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
