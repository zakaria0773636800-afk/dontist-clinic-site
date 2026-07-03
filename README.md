# د. مالك إبراهيم | موقع عيادة الأسنان

موقع هبوط احترافي متعدد اللغات (العربية/الفرنسية) لعيادة د. مالك إبراهيم، مع تصميم فاخر، نموذج حجز، لوحة تحكم، وصور خدمات حقيقية.

## المميزات

- واجهة احترافية متجاوبة بالكامل
- دعم العربية RTL والفرنسية LTR بزر تبديل واحد
- بطاقات خدمات مع صور حقيقية + أيقونات SVG
- زر واتساب مباشر + روابط اتصال وبريد قابلة للنقر
- نموذج حجز مع تحقق أساسي وتاريخ أدنى تلقائي
- تحسينات SEO: Open Graph + Twitter Card + JSON-LD
- قسم Dashboard لإدارة الحجوزات والمرضى (داخل `dashboard/`)

## التشغيل المحلي

```bash
python3 -m http.server 8000
```

ثم افتح:

```text
http://127.0.0.1:8000
```

## استضافة مجانية دائمة (GitHub Pages)

تم تجهيز المشروع بملف نشر تلقائي في:

```text
.github/workflows/deploy-pages.yml
```

بعد رفع المشروع إلى GitHub على فرع `main`، سيتم النشر تلقائيا على GitHub Pages مجانا.

### خطوات سريعة

1. إنشاء مستودع جديد على GitHub.
2. رفع هذا المشروع إلى الفرع `main`.
3. انتظار اكتمال Action باسم `Deploy static site to GitHub Pages`.
4. رابط الموقع سيكون بهذا الشكل:

```text
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

## التقنيات

- HTML5 / CSS3 / Vanilla JavaScript
- Font Awesome
- AOS
- GitHub Actions + GitHub Pages
