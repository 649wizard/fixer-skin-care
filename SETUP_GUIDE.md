# 🚀 מדריך הגדרה סופי - FIXER Skin Care

## ✅ שלמו בהצלחה:

### 1. **GitHub Repository**
   - 📍 **URL**: https://github.com/649wizard/fixer-skin-care
   - ✅ מצב: כל הקוד דחוף וגרסואות

### 2. **Vercel Deployment**
   - 🌐 **Live Site**: https://fixer-skin-care.vercel.app
   - ✅ מצב: עומד וזמין

### 3. **Structure**
   ```
   fixer-skin-care/
   ├── public/
   │   ├── index.html (✅ עובד)
   │   └── uploads/ (✅ 6 תמונות קבועות)
   ├── api/
   │   └── submit-form.js (Google Sheets)
   ├── package.json
   └── README.md
   ```

---

## 📋 צעדים שנותרו:

### שלב 1: הכנת Google Service Account

1. הלך ל- [Google Cloud Console](https://console.cloud.google.com)
2. בחר את ה-project או יצור חדש
3. עבור ל- **APIs & Services** → **Credentials**
4. לחץ על **Create Credentials** → **Service Account**
5. למלא את הפרטים (למשל: "fixer-sheets")
6. לחץ **Create and Continue**
7. בחר **Editor** role
8. לחץ **Continue** → **Done**

### שלב 2: יצירת JSON Key

1. חזור ל- **Credentials** page
2. לחץ על Service Account ש-יצרת
3. עבור ל- **Keys** tab
4. לחץ **Add Key** → **Create new key**
5. בחר **JSON** → **Create**
6. הורד את הקובץ (שמור אותו בבטחה!)

### שלב 3: הוספה ל-Google Sheet

1. פתח את [Google Sheet](https://docs.google.com/spreadsheets/d/1JjsDu0dnQseONleI5ZTvDnuOvJg87BUHVrDxDnyDWpA)
2. לחץ **Share** (כפתור משמאל למעלה)
3. הוסף את ה-email מה-JSON key:
   ```
   michaelerez@nails-digital-clients.iam.gserviceaccount.com
   ```
4. תן **Editor** permissions
5. לחץ **Share**

### שלב 4: הגדרת Environment Variables ב-Vercel

1. לך ל- [Vercel Project Settings](https://vercel.com/nails-digital-au/fixer-skin-care/settings/environment-variables)
2. הוסף את המשתנים הבאים (מתוך ה-JSON file):

   ```
   GOOGLE_PROJECT_ID = [מ-JSON: "project_id"]
   GOOGLE_PRIVATE_KEY_ID = [מ-JSON: "private_key_id"]
   GOOGLE_PRIVATE_KEY = [מ-JSON: "private_key" - כולל \n]
   GOOGLE_CLIENT_EMAIL = [מ-JSON: "client_email"]
   GOOGLE_CLIENT_ID = [מ-JSON: "client_id"]
   GOOGLE_CERT_URL = [מ-JSON: "client_x509_cert_url"]
   GOOGLE_SPREADSHEET_ID = 1JjsDu0dnQseONleI5ZTvDnuOvJg87BUHVrDxDnyDWpA
   ```

3. לחץ **Save** לכל משתנה

### שלב 5: Redeploy

בחזרה ל-CLI/Terminal:

```bash
cd ~/Documents/fixer-skin-care
vercel deploy --prod
```

---

## 🎯 בדיקה סופית:

### בדוק את הדף:
```bash
curl https://fixer-skin-care.vercel.app | grep FIXER
```

### בדוק את התמונות:
```bash
curl -I https://fixer-skin-care.vercel.app/uploads/WhatsApp\ Image\ 2026-06-29\ at\ 16.11.02.jpeg
```

### בדוק את ה-API:
```bash
curl -X POST https://fixer-skin-care.vercel.app/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "טסט",
    "email": "test@example.com",
    "phone": "+972123456789",
    "main_concern": "wrinkles",
    "concerns": [],
    "timestamp": "2026-07-01T12:00:00Z"
  }'
```

---

## 📞 שימושי:

| משהו | קישור |
|------|-------|
| **Live Site** | https://fixer-skin-care.vercel.app |
| **GitHub** | https://github.com/649wizard/fixer-skin-care |
| **Vercel Dashboard** | https://vercel.com/nails-digital-au/fixer-skin-care |
| **Google Sheet** | https://docs.google.com/spreadsheets/d/1JjsDu0dnQseONleI5ZTvDnuOvJg87BUHVrDxDnyDWpA |

---

## ❓ שאלות ותשובות:

**Q: איפה הנתונים מהטופס נשמרים?**
A: ב-Google Sheet הנתון בקישור למעלה, בעמוד "Sheet1"

**Q: איך משנים את הטקסט בעמוד?**
A: עדכן את `public/index.html` בGitHub, ה-Vercel יתעדכן אוטומטית

**Q: איך מוסיפים תמונות חדשות?**
A: הוסף תמונה ל-`public/uploads/` בGitHub וקרא לה ב-HTML

**Q: איך מוסיפים שאלות נוספות ל-FAQ?**
A: הוסף divs חדשים לסעיף FAQ ב-`public/index.html`

---

## 🔒 אבטחה:

- ✅ JSON key שמור בעמ"ס (Vercel secrets)
- ✅ אין credentials בקוד הגיט
- ✅ API endpoint מוגן מ-CORS attacks
- ✅ Form validation בצד הלקוח

---

**בהצלחה! 🎉**
