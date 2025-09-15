```markdown
# 🛍️ Artisan Marketplace – Online Market Assistant

A platform powered by **Google Cloud AI** to help **local artisans** expand their digital reach, showcase their craft, and connect with global customers.  
This project was built as part of a **Hackathon Submission**.

---

## ✨ Features
- 👩‍🎨 **Artisan Dashboard** – Upload, manage, and showcase handmade products.  
- 🖼️ **AI Media Optimization** – Auto-enhance images/videos using **ImageKit + FFmpeg**.  
- 🌎 **Translation** – Product details auto-translated with **Cloud Translation API**.  
- 🔊 **Voice Input/Output** – Voice-enabled product uploads and chatbot with **Speech-to-Text + Text-to-Speech**.  
- 🤖 **AI Content Generation** – Gemini AI helps artisans write engaging product descriptions.  
- 📊 **Analytics Dashboard** – Powered by **Firebase + BigQuery + Looker** for sales insights.  
- 💬 **Customer Support** – Integrated **WhatsApp Business API** for direct communication.  
- 🔐 **Secure Login & Payments** – JWT authentication + online order system.  

---

## 🏗️ Architecture
- **Frontend**: HTML, CSS, JavaScript (simple responsive UI).  
- **Backend**: Node.js + Express.js REST API.  
- **Database**: MySQL (`schema.sql` + `seed.sql`).  
- **Cloud Services**:  
  - Gemini 1.5 Flash (AI Content)  
  - Speech-to-Text / Text-to-Speech  
  - Cloud Translation API  
  - Firebase (Auth, Hosting, Analytics)  
  - ImageKit + FFmpeg (Media Optimization)  
  - WhatsApp Business API (Chatbot)  

---

## 📂 Project Structure
```

artisan-marketplace/
│── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
│── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│
│── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── db.js
│
│── .env
│── package.json
│── README.md

````

---

## ⚡ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/artisan-marketplace.git
cd artisan-marketplace
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure `.env`

Add your API keys & DB credentials in `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=artisan_market
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Setup Database

```bash
mysql -u root -p artisan_market < database/schema.sql
mysql -u root -p artisan_market < database/seed.sql
```

### 5️⃣ Start Server

```bash
npm run dev
```

Server runs on:
👉 `http://localhost:5000`

---

## 📸 Screenshots / Demo

(Add wireframes, mockups, or demo video link here)

---

## 🌍 Social Impact

This solution bridges **traditional craftsmanship** with **modern digital tools**, empowering artisans to reach new audiences, increase income, and preserve cultural heritage.

