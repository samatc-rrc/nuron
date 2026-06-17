"use client";

import { useState } from "react";
import { NO, YES } from "@/lib/fields";

type Errors = Record<string, string>;

const labelClass = "block text-sm font-semibold text-nuron-navy mb-1.5";
const hintClass = "block text-xs font-normal text-slate-500 mt-0.5";
const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-nuron-navy outline-none transition focus:border-nuron-red focus:ring-2 focus:ring-nuron-red/20 placeholder:text-slate-400";
const errClass = "mt-1 text-sm text-nuron-red";

function Required() {
  return <span className="text-nuron-red"> *</span>;
}

function RadioGroup({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3">
      {[YES, NO].map((opt) => {
        const active = value === opt;
        return (
          <label
            key={opt}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-base font-medium transition ${
              active
                ? "border-nuron-red bg-nuron-red/5 text-nuron-red"
                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={active}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

export default function RegisterForm() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    social_username: "",
    has_bought: "",
    has_sold: "",
    sold_category: "",
    organization: "",
    expectation: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setServerError("");
    setErrors({});

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        setDone(true);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.errors) {
        setErrors(data.errors as Errors);
        const first = document.querySelector("[data-error='true']");
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setServerError(data.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    } catch {
      setServerError("เชื่อมต่อไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl shadow-nuron-navy/5 ring-1 ring-slate-100">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </div>
        <h3 className="text-2xl font-bold text-nuron-navy">
          ลงทะเบียนสำเร็จ!
        </h3>
        <p className="mt-3 text-slate-600">
          ขอบคุณที่ลงทะเบียนเข้าร่วมคอร์ส Affiliate Marketing Masterclass
          <br />
          แล้วพบกันวันอาทิตย์ที่ 28 มิ.ย. 69 เวลา 09.00 น.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-3xl bg-white p-6 shadow-xl shadow-nuron-navy/5 ring-1 ring-slate-100 sm:p-8"
    >
      <h3 className="text-2xl font-bold text-nuron-navy">ลงทะเบียนเข้าร่วม</h3>

      {/* Full name */}
      <div data-error={!!errors.full_name}>
        <label className={labelClass} htmlFor="full_name">
          ชื่อ-นามสกุล
          <Required />
          <span className={hintClass}>(กรุณากรอกชื่อ-นามสกุลจริง)</span>
        </label>
        <input
          id="full_name"
          className={inputClass}
          value={form.full_name}
          onChange={(e) => set("full_name", e.target.value)}
          autoComplete="name"
        />
        {errors.full_name && <p className={errClass}>{errors.full_name}</p>}
      </div>

      {/* Phone */}
      <div data-error={!!errors.phone}>
        <label className={labelClass} htmlFor="phone">
          เบอร์โทรศัพท์
          <Required />
          <span className={hintClass}>(กรณีต้องการติดต่อเพิ่มเติม)</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          className={inputClass}
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          autoComplete="tel"
          placeholder="08X-XXX-XXXX"
        />
        {errors.phone && <p className={errClass}>{errors.phone}</p>}
      </div>

      {/* Social username */}
      <div data-error={!!errors.social_username}>
        <label className={labelClass} htmlFor="social_username">
          Social Username / ชื่อช่อง (ถ้ามี)
          <span className={hintClass}>
            (เพื่อประเมินความเข้าใจของผู้เข้าร่วม)
          </span>
        </label>
        <input
          id="social_username"
          className={inputClass}
          value={form.social_username}
          onChange={(e) => set("social_username", e.target.value)}
          placeholder="@username"
        />
        {errors.social_username && (
          <p className={errClass}>{errors.social_username}</p>
        )}
      </div>

      {/* Has bought (optional) */}
      <div data-error={!!errors.has_bought}>
        <label className={labelClass}>
          คุณเคยซื้อสินค้าผ่าน Social affiliate มาก่อนหรือไม่?
        </label>
        <RadioGroup
          name="has_bought"
          value={form.has_bought}
          onChange={(v) => set("has_bought", v)}
        />
        {errors.has_bought && <p className={errClass}>{errors.has_bought}</p>}
      </div>

      {/* Has sold (required) */}
      <div data-error={!!errors.has_sold}>
        <label className={labelClass}>
          คุณเคยขายสินค้าผ่าน Social affiliate มาก่อนหรือไม่?
          <Required />
        </label>
        <RadioGroup
          name="has_sold"
          value={form.has_sold}
          onChange={(v) => set("has_sold", v)}
        />
        {errors.has_sold && <p className={errClass}>{errors.has_sold}</p>}
      </div>

      {/* Sold category (conditional) */}
      {form.has_sold === YES && (
        <div data-error={!!errors.sold_category}>
          <label className={labelClass} htmlFor="sold_category">
            ถ้าเคยขายผ่าน Social affiliate คุณขายสินค้าประเภทใด?
            <Required />
          </label>
          <input
            id="sold_category"
            className={inputClass}
            value={form.sold_category}
            onChange={(e) => set("sold_category", e.target.value)}
            placeholder="เช่น เครื่องสำอาง, อาหารเสริม, แฟชั่น"
          />
          {errors.sold_category && (
            <p className={errClass}>{errors.sold_category}</p>
          )}
        </div>
      )}

      {/* Organization */}
      <div data-error={!!errors.organization}>
        <label className={labelClass} htmlFor="organization">
          คุณมาจากหน่วยงานใด
          <span className={hintClass}>
            (องค์กร / โรงเรียน / มหาวิทยาลัย / แม่บ้าน / เจ้าของธุรกิจ)
          </span>
        </label>
        <input
          id="organization"
          className={inputClass}
          value={form.organization}
          onChange={(e) => set("organization", e.target.value)}
        />
        {errors.organization && (
          <p className={errClass}>{errors.organization}</p>
        )}
      </div>

      {/* Expectation */}
      <div data-error={!!errors.expectation}>
        <label className={labelClass} htmlFor="expectation">
          คุณคาดหวังอะไรจากการเข้าร่วมอบรมครั้งนี้?
        </label>
        <textarea
          id="expectation"
          rows={4}
          className={`${inputClass} resize-y`}
          value={form.expectation}
          onChange={(e) => set("expectation", e.target.value)}
        />
        {errors.expectation && (
          <p className={errClass}>{errors.expectation}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-nuron-red">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-nuron-red px-6 py-4 text-lg font-bold text-white shadow-lg shadow-nuron-red/30 transition hover:bg-nuron-red-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "กำลังส่ง..." : "ลงทะเบียนเลย 🚀"}
      </button>
      <p className="text-center text-xs text-slate-400">
        ฟรี! ไม่มีค่าใช้จ่าย
      </p>
    </form>
  );
}
