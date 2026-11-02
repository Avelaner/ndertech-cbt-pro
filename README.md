# Ndertech CBT Pro

A modern, high-performance Computer-Based Testing (CBT) and Examination SaaS platform rebuilt with a **Go REST API backend**, **React (Vite + TypeScript + Tailwind CSS) frontend**, and **PostgreSQL / MySQL relational database**.

---

## 📁 Repository Structure

```text
ndertech-cbt-pro/
├── backend/                       # Go REST API (High performance, modular)
│   ├── cmd/server/main.go         # Server entrypoint
│   ├── internal/
│   │   ├── config/                # Environment variables (.env)
│   │   ├── database/              # DB connection pool (PostgreSQL / MySQL)
│   │   ├── models/                # GORM models for Organizations, Exams, Questions, etc.
│   │   ├── handlers/              # Auth, Exam, Question, & Result handlers
│   │   └── middleware/            # JWT authentication & CORS middleware
│   ├── go.mod
│   └── .env.example
├── frontend/                      # React Frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/            # ExamRunner, CandidatePortal, AdminPortal, Navbar, AuthModal
│   │   ├── types/                 # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── database/                      # Database scripts & original MySQL/MariaDB dump
│   └── digitald_cbt_saas.sql
├── legacy_php/                    # Preserved original PHP platform files & assets
├── docker-compose.yml             # 1-click local PostgreSQL database container
├── vercel.json                    # Configuration for Vercel deployment
└── .gitignore
```

---

## 🚀 Running Locally

### 1. Database (PostgreSQL)
To start a local PostgreSQL database with Docker:
```bash
docker compose up -d
```
*(Alternatively, you can point to an existing PostgreSQL or MySQL instance by setting `DATABASE_URL` in `backend/.env`)*.

---

### 2. Backend (Go API)
Open a terminal in the `backend` folder:
```bash
cd backend
go run ./cmd/server
```
The Go API will start on: **`http://localhost:8080`**
* Health check: `http://localhost:8080/api/health`
* Available exams: `http://localhost:8080/api/exams`

---

### 3. Frontend (React UI)
Open a new terminal in the `frontend` folder:
```bash
cd frontend
npm run dev
```
The React application will open on: **`http://localhost:5173`**

---

## 🐙 Git & GitHub Setup

To connect this local repository to your GitHub account and push your changes:

### Step 1: Initialize Git
Inside the root directory (`ndertech-cbt-pro`):
```bash
git init
git add .
git commit -m "feat: initial commit - converted Ndertech CBT Pro into Go backend and React frontend"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g. `ndertech-cbt-pro`).
3. Leave "Initialize with README" **unchecked** (since we already have our files).
4. Click **Create repository**.

### Step 3: Link Local Git to GitHub and Push
Copy and run the commands provided by GitHub (replace with your actual GitHub username):
```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ndertech-cbt-pro.git
git push -u origin main
```

Whenever you make future updates:
```bash
git add .
git commit -m "Update feature"
git push
```

---

## ☁️ Deploying to Vercel

### Deploying the React Frontend:
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
2. Import your GitHub repository (`ndertech-cbt-pro`).
3. Under **Project Settings**:
   * **Root Directory:** Set to `frontend`
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. Click **Deploy**. Vercel will automatically build and publish your live React frontend on every `git push`!

### Connecting Backend & Database:
* **Production Database:** Add a free serverless PostgreSQL database directly in Vercel (**Storage > Postgres**) or via Supabase / Neon.
* **Go Backend Deployment:** Deploy the `backend/` directory to **Render**, **Railway**, or **Fly.io** (all natively support Go and auto-deploy from GitHub). In your Vercel frontend, set `VITE_API_URL` to your live Go API endpoint.
