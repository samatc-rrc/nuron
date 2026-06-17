// Single source of truth for the registration fields. Shared by the form,
// the API validator, the admin table, and the CSV export.

export const YES = "เคย";
export const NO = "ไม่เคย";

export type Registration = {
  id: number;
  full_name: string;
  phone: string;
  social_username: string;
  has_bought: string | null;
  has_sold: string;
  sold_category: string | null;
  organization: string | null;
  expectation: string | null;
  created_at: string;
};

// Columns rendered in the admin table / CSV, in display order.
export const ADMIN_COLUMNS: { key: keyof Registration; label: string }[] = [
  { key: "id", label: "#" },
  { key: "created_at", label: "ลงทะเบียนเมื่อ" },
  { key: "full_name", label: "ชื่อ-นามสกุล" },
  { key: "phone", label: "เบอร์โทรศัพท์" },
  { key: "social_username", label: "Social Username / ชื่อช่อง" },
  { key: "has_bought", label: "เคยซื้อผ่าน affiliate" },
  { key: "has_sold", label: "เคยขายผ่าน affiliate" },
  { key: "sold_category", label: "ประเภทสินค้าที่ขาย" },
  { key: "organization", label: "หน่วยงาน" },
  { key: "expectation", label: "ความคาดหวัง" },
];
