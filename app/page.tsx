import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { SiShopee } from "react-icons/si";
import RegisterForm from "./components/RegisterForm";

const PLATFORMS = [
  { Icon: SiShopee, name: "Shopee", color: "#EE4D2D" },
  { Icon: FaTiktok, name: "TikTok", color: "#ffffff" },
  { Icon: FaFacebookF, name: "Facebook", color: "#1877F2" },
  { Icon: FaYoutube, name: "YouTube", color: "#FF0000" },
  { Icon: FaInstagram, name: "Instagram", color: "#E4405F" },
];

const LEARNINGS = [
  "เข้าใจระบบหารายได้แบบไม่ต้องสต็อกของ",
  "สูตรลับถ่ายคลิป 3 ขั้นตอนให้คนอยากซื้อ",
  "เทคนิคตัดต่อ 2-1-3 ดึงคนดูให้อยู่หมัด",
  "การสร้าง Digital Asset ให้คลิปทำงานหาเงินแทนเราในระยะยาว",
  "11 บทเรียน สู่การเป็นนายหน้ามือโปร",
  "สินค้าชิ้นเดียว ถ่ายได้ 50 คลิป ทำยังไง?",
  "ตั้งเป้า KPI 6 เดือน สู่รายได้ที่มั่นคง",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-nuron-navy text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rotate-45 rounded-3xl bg-nuron-red/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
            คอร์สพิเศษ • เรียนฟรี ไม่มีค่าใช้จ่าย
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Affiliate Marketing
            <br />
            <span className="text-nuron-red">Masterclass</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
            หยุดเป็นแค่ &ldquo;คนดู&rdquo; — เริ่มเป็น{" "}
            <span className="font-bold text-white">&ldquo;คนทำเงิน&rdquo;</span>{" "}
            เปลี่ยน<span className="font-semibold text-white">ทุกคลิปรีวิว</span>
            ให้กลายเป็น{" "}
            <span className="font-bold text-nuron-red">รายได้จริง</span> บน{" "}
            <span className="font-semibold text-white">5 แพลตฟอร์มยักษ์ใหญ่</span>
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {PLATFORMS.map((p) => (
              <span
                key={p.name}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15"
              >
                <p.Icon aria-hidden className="text-base" style={{ color: p.color }} />
                {p.name}
              </span>
            ))}
          </div>
          <a
            href="#register"
            className="mt-9 inline-block rounded-xl bg-nuron-red px-8 py-4 text-lg font-bold text-white shadow-lg shadow-nuron-red/30 transition hover:bg-nuron-red-dark"
          >
            ลงทะเบียนฟรี
          </a>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: content */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-100">
              <h2 className="text-xl font-bold text-nuron-navy">
                ลูกค้าไม่ได้หายไป แค่เปลี่ยนที่อยู่!
              </h2>
              <p className="mt-2 text-slate-600">
                วันนี้การตัดสินใจซื้อเกิดขึ้นบนหน้าจอ ไม่ใช่หน้าร้าน
                ใครเข้าถึงคนดูก่อน คนนั้นได้เปรียบ แล้วคุณล่ะ พร้อมหรือยัง?
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-100">
              <h2 className="text-xl font-bold text-nuron-navy">
                แค่รีวิวเป็น...ก็เห็นขุมทรัพย์!
              </h2>
              <p className="mt-2 text-slate-600">
                อยากมีรายได้เสริม แต่ไม่รู้จะเริ่มตรงไหน? คอร์สนี้มีคำตอบ
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-nuron-navy">
              สิ่งที่จะได้เรียนรู้
            </h2>
            <ul className="mt-4 space-y-3">
              {LEARNINGS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-100"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nuron-red" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold text-nuron-navy">
              ครบเครื่องทั้งวิธีคิด และขั้นตอนลงมือทำจริง!
            </p>
          </div>

          {/* Event details */}
          <div className="rounded-2xl bg-nuron-navy p-6 text-white">
            <h2 className="text-xl font-bold">รายละเอียดงาน</h2>
            <dl className="mt-4 space-y-3 text-slate-100">
              <div className="flex gap-3">
                <dt className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nuron-red" />
                <dd>วันอาทิตย์ที่ 28 มิ.ย. 69</dd>
              </div>
              <div className="flex gap-3">
                <dt className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nuron-red" />
                <dd>เวลา 09.00 น. - 16.00 น.</dd>
              </div>
              <div className="flex gap-3">
                <dt className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nuron-red" />
                <dd>
                  ห้องประชุมคณะการแพทย์และวิทยาศาสตร์สุขภาพ
                  มหาวิทยาลัยฟาฏอนี
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <dd className="font-bold text-white">
                  เรียนฟรี! ไม่มีค่าใช้จ่าย
                </dd>
              </div>
            </dl>
            <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm text-slate-200">
              หมายเหตุ: คอร์สนี้ไม่มีบริการน้ำและอาหาร
              ผู้เข้าเรียนโปรดเตรียมมาเองเพื่อความสะดวกครับ
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div id="register" className="lg:sticky lg:top-6 lg:self-start">
          <RegisterForm />
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-400">
        © NURON Marketing media
      </footer>
    </main>
  );
}
