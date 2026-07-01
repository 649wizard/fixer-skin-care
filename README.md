# FIXER - علاج البشرة بدون حقن

موقع الهبوط (Landing Page) لخدمات FIXER التجميلية بدون حقن.

## المميزات

- 📱 تصميم مستجيب (Responsive Design)
- 🌐 واجهة ثنائية الاتجاه (RTL Support)
- 📧 تطبيق نماذج متكامل مع Google Sheets
- ⚡ أداء سريع مع Vercel Functions

## التثبيت المحلي

```bash
# تثبيت المتطلبات
npm install

# تشغيل البيئة الإنمائية
npm run dev
```

## البيئة والإعدادات

قم بإنشاء ملف `.env.local` وأضف بيانات اعتماد Google:

```env
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_CLIENT_EMAIL=your_client_email
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CERT_URL=your_cert_url
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
```

## الهيكل

```
fixer-skin-care/
├── public/
│   ├── index.html (الصفحة الرئيسية)
│   └── uploads/ (الصور والملفات)
├── api/
│   └── submit-form.js (API endpoint للنموذج)
├── package.json
├── vercel.json
└── README.md
```

## النشر على Vercel

1. ادفع إلى GitHub
2. اتصل بـ Vercel مع المستودع
3. أضف متغيرات البيئة في إعدادات Vercel
4. سيتم النشر تلقائيًا عند كل push

## الترخيص

جميع الحقوق محفوظة © 2026 Nails Digital
