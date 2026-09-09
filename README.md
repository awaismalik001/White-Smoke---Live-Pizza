# 🍕 White Smoke Live Pizza — Full Stack Website

A complete, production-ready full stack restaurant website with 3D animations, online ordering, admin panel, reviews, and WhatsApp integration.

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js + Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Frontend Hosting**: Netlify
- **Backend Hosting**: Render

---

## 🚀 Setup Guide

### Step 1 — Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2 — Setup Supabase (PostgreSQL)
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **Settings → Database → Connection string → URI**
3. Copy the connection string

### Step 3 — Backend Environment
```bash
cd backend
cp .env.example .env
```
Fill in `.env`:
```
DATABASE_URL="your-supabase-connection-string"
JWT_SECRET="any-random-long-string"
ADMIN_PASSWORD="a-unique-12-plus-character-initial-password"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

### Step 4 — Push Database Schema
```bash
cd backend
npx prisma generate
npx prisma db push
```

### Step 5 — Run Locally
```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open: http://localhost:5173

---

## 🔐 Admin Panel
Navigate to: `http://localhost:5173/staff-access`

> ⚠️ This URL is NOT linked anywhere on the public website. Only you know it exists.

Login with the password you set in `ADMIN_PASSWORD`. On the first successful login it is securely hashed and saved to the database. Afterwards, change it from **Security** in the panel. Login attempts are limited to 5 per minute per IP address.

---

## 🌐 Deployment

### Deploy Backend to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select `backend/` folder
4. **Build Command**: `npm install && npx prisma generate && npx prisma db push`
5. **Start Command**: `npm start`
6. Add Environment Variables (same as .env)
7. Deploy!

### Deploy Frontend to Netlify
1. Go to [netlify.com](https://netlify.com) → New Site
2. Connect GitHub repo
3. **Base directory**: `frontend`
4. **Build command**: `npm run build`
5. **Publish directory**: `frontend/dist`
6. Add Environment Variable:
   - `VITE_API_URL` = your Render backend URL (e.g. `https://whitesmoke-api.onrender.com`)
7. Deploy!

---

## 📁 Project Structure
```
fast food/
├── backend/                  ← Express API
│   ├── prisma/schema.prisma  ← DB schema
│   ├── routes/               ← API routes
│   ├── middleware/auth.js    ← JWT auth
│   └── server.js
├── frontend/                 ← React app
│   ├── src/
│   │   ├── components/       ← Public UI
│   │   ├── admin/            ← Admin panel
│   │   ├── context/          ← Auth context
│   │   └── hooks/useApi.js   ← API calls
│   └── public/
├── netlify.toml
└── README.md
```

---

## 📱 WhatsApp Integration
All orders and reservations open WhatsApp with a pre-filled message.
Update the mock number `923000000000` in:
- `frontend/src/components/Contact.jsx`
- `frontend/src/components/OrderModal.jsx`

---

Made by Malik Tech Solutions
