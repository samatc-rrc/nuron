# NURON — Affiliate Marketing Masterclass

Event registration site for NURON's free "Affiliate Marketing Masterclass"
(Sun 28 Jun 2026 · มหาวิทยาลัยฟาฏอนี).

- **`/`** — public landing page + registration form (Thai).
- **`/admin`** — password-protected dashboard to view registrations and export CSV.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Postgres (Neon, via Vercel Marketplace) using `pg`

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL and ADMIN_PASSWORD
npm run dev
```

Open http://localhost:3000 (form) and http://localhost:3000/admin (dashboard).

The `registrations` table is created automatically on first request.

## Environment variables

| Name             | Purpose                                              |
| ---------------- | ---------------------------------------------------- |
| `DATABASE_URL`   | Postgres connection string (Neon).                   |
| `ADMIN_PASSWORD` | Password for the `/admin` dashboard.                 |

## Deploy on Vercel

1. Push this repo to GitHub and import it into Vercel.
2. In the project's **Storage** tab, add a **Neon Postgres** database from the
   Marketplace — Vercel sets `DATABASE_URL` for you.
3. In **Settings → Environment Variables**, add `ADMIN_PASSWORD`.
4. Deploy.

## Form fields

| Field             | Required | Notes                                            |
| ----------------- | -------- | ------------------------------------------------ |
| ชื่อ-นามสกุล       | ✅       | Real full name                                   |
| เบอร์โทรศัพท์       | ✅       | Validated phone format                           |
| Social Username   | ✅       | Channel name                                     |
| เคยซื้อผ่าน affiliate | —     | เคย / ไม่เคย                                      |
| เคยขายผ่าน affiliate | ✅     | เคย / ไม่เคย                                      |
| ประเภทสินค้าที่ขาย   | ✅*      | Only required/shown when "เคยขาย" = เคย           |
| หน่วยงาน           | —        | Organization / school / business                 |
| ความคาดหวัง         | —        | Expectations from the course                      |

CSV export is UTF-8 with a BOM so Excel renders Thai correctly.
