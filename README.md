# د. أحمد النور | موقع عيادة الأسنان

موقع عيادة أسنان متعدد اللغات (العربية/الفرنسية) مبني بـ **React** مع خادم **Node.js** للحجوزات.

## هيكل المشروع

```text
frontend/   → واجهة React (Vite) — كود المصدر للموقع
server/     → خادم Node.js (Express) — API استقبال الحجوزات
scripts/    → build-site.sh لبناء الموقع ونشره
assets/     → الصور والشعار
dashboard/  → لوحة تحكم الحجوزات
index.html  → ناتج البناء (يُنشر على GitHub Pages — لا تعدّله يدوياً)
static/     → ملفات JS/CSS/خطوط مبنية (ناتج البناء)
```

## المميزات

- واجهة React بمكونات منفصلة لكل قسم، متجاوبة بالكامل مع الجوال
- دعم العربية RTL والفرنسية LTR بزر تبديل واحد (يُحفظ الاختيار)
- الخطوط (Cairo, Playfair Display) وأيقونات Font Awesome **مدمجة في الموقع** — لا تعتمد على CDN خارجي فتعمل على أي شبكة
- أعلام تبديل اللغة SVG مدمجة (تعمل بدون إنترنت خارجي)
- نموذج حجز مع تحقق، يرسل إلى الـ API إن وُجد ويعمل بدونه أيضاً
- خادم Express يتحقق من البيانات ويحفظ الحجوزات في `server/data/bookings.json`
- تحسينات SEO: Open Graph + Twitter Card + JSON-LD

## التطوير المحلي

### الواجهة (React)

```bash
cd frontend
npm install
npm run dev        # خادم تطوير على http://localhost:5173
```

### الخادم (Node.js)

```bash
cd server
npm install
npm run dev        # API على http://localhost:3001
```

نقاط الـ API:

- `GET  /api/health` — فحص الحالة
- `POST /api/bookings` — إنشاء حجز `{name, phone, service, date, message}`
- `GET  /api/bookings` — قائمة الحجوزات

لربط الواجهة بالخادم عند البناء:

```bash
cd frontend
VITE_API_URL=https://your-server-url npm run build
```

## النشر على GitHub Pages

GitHub Pages يستضيف ملفات ثابتة فقط، لذا يُبنى موقع React وتُرفع نتيجته إلى جذر المستودع:

```bash
./scripts/build-site.sh
git add -A && git commit -m "Rebuild site" && git push
```

الموقع يُنشر تلقائياً من فرع `main` على:

```text
https://zakaria0773636800-afk.github.io/dontist-clinic-site/
```

> ملاحظة: خادم Node.js لا يعمل على GitHub Pages. لتفعيل حفظ الحجوزات فعلياً، انشر مجلد `server/` على استضافة مثل Render أو Railway ثم أعد بناء الواجهة مع `VITE_API_URL`.

## التقنيات

- React 18 + Vite
- Node.js + Express
- Font Awesome + AOS + Fontsource (مدمجة عبر npm)
- GitHub Pages
