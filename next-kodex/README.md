# ⚡ KODEX — Modern Full-Stack Technical Publishing Platform

> An enterprise-grade, high-performance developer publication platform built with **Next.js 16 (App Router & Server Actions)**, **TypeScript**, **PostgreSQL (NeonDB Serverless)**, **Prisma ORM**, and styled after the **Journal X Editorial Magazine Design System**.

---

## 🌟 Key Highlights & Engineering Features

### 👑 1. Two-Tier RBAC & Super Admin Master Console (`/kodex-admin`)
- **Root Authority Verification**: Credentials configured securely via `.env` (`SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_PASSWORD`).
- **Master Console Portal (`/kodex-admin`)**:
  - **Master Dashboard (`/kodex-admin/dashboard`)**: Live platform telemetry, total users, total publications, and pending author review queue.
  - **User Verification Engine (`/kodex-admin/users`)**: Approve, reject, suspend, delete, or change roles (`ADMIN` ↔ `AUTHOR`).
  - **Global Publications Manager (`/kodex-admin/blogs`)**: Full moderation and editorial controls across all articles by all authors.
- **Isolated Author Portal (`/admin`)**:
  - New author applications start in `PENDING` state and require Super Admin approval before login.
  - Approved authors manage their own articles and profile.

### ✍️ 2. TipTap Rich Text Article Editor
- **Full Formatting Toolbar**: Headings (H1/H2/H3), Bold, Italic, Underline, Strikethrough, Blockquotes, Inline Code, Code Blocks, Ordered/Unordered Lists, Links, and Image Embeds.
- **Live Stats**: Real-time word count and estimated reading time calculation.
- **Syntax Highlighting**: Dark slate theme code blocks with 1-click **"Copy Code"** interaction on the public article reader.

### ⚡ 3. Spotlight Command Palette (`Cmd+K` / `Ctrl+K`)
- **Global Keyboard Shortcut**: Openable from anywhere on the site with `Cmd+K` or `Ctrl+K`.
- **Debounced Server Action Search**: 150ms debounced queries against PostgreSQL across articles, tags, authors, and master actions.
- **Keyboard Navigation**: Full `ArrowUp`, `ArrowDown`, and `Enter` keyboard selection.

### 🏷️ 4. Topic Discovery Engine & Dedicated Archives (`/tag/[tag]`)
- Dynamic `/tag/[tag]` archive pages with article counts and related topics cloud.
- Aggregated tag frequency calculations in PostgreSQL.

### 🎨 5. Dynamic Edge OpenGraph Social Cards & Enterprise SEO
- **Dynamic `@vercel/og` Generator (`/blog/[slug]/opengraph-image`)**: Edge runtime JSX-to-image 1200x630 social preview generation with title, author, and reading time.
- **Dynamic XML Sitemap (`/sitemap.xml`)**: Automated URL and `lastModified` mapping for crawlers.
- **Dynamic Robots (`/robots.txt`)**: Crawler governance restricting admin routes.
- **JSON-LD Structured Data**: Embedded `schema.org/BlogPosting` and `schema.org/BreadcrumbList` for Google Rich Search Results.

### 📰 6. Journal X Editorial Magazine Homepage Layout
- **Cinematic Full-Bleed Hero Slider** with interactive carousel controls.
- **3-Column Visual Category Spotlight** with rotating arrow badges.
- **"Popular Now" Trending Bar** ticker.
- **Split Newsletter Callout Card** with social proof.
- **2-Column Magazine Feed with Sticky Author & Trending Sidebar**.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Server Actions, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System |
| **Database** | PostgreSQL on NeonDB Serverless |
| **ORM** | Prisma 7 |
| **Rich Editor** | TipTap Core & Extensions |
| **Validation** | Zod 4 |
| **Auth & Security** | JWT (Jose) + HTTP-only cookies + Bcrypt |
| **Dynamic OG Cards** | `@vercel/og` / `next/og` (Edge Runtime) |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Thapa-Dipesh/blog-task.git
cd blog-task/next-kodex
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your database and credentials:
```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="your_jwt_secret_key"
SUPER_ADMIN_EMAIL="superadmin@kodex.com"
SUPER_ADMIN_PASSWORD="superadmin123!"
SUPER_ADMIN_NAME="Super Administrator"
```

### 4. Push Prisma schema to Database
```bash
npx prisma db push
npx prisma generate
```

### 5. Run the development server
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Default Super Admin Login Credentials

| Parameter | Value |
| :--- | :--- |
| **Master Console URL** | `/kodex-admin/login` |
| **Email** | `superadmin@kodex.com` |
| **Password** | `superadmin123!` |

*(Configurable via `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` in `.env`)*

---

## 🗺️ Route Architecture

```
/                             -> Journal X Editorial Homepage
/blog/[slug]                  -> Single Article Reader & JSON-LD
/blog/[slug]/opengraph-image  -> Dynamic Edge Social Preview Card
/tag/[tag]                    -> Dedicated Topic Archive

/admin/login                  -> Author Login Portal
/admin/register               -> Author Application (Status: PENDING)
/admin/dashboard              -> Personal Author Dashboard
/admin/blogs                  -> My Authored Articles
/admin/blogs/create           -> TipTap Rich Text Article Editor
/admin/settings               -> Author Profile & Security

/kodex-admin/login            -> Super Admin Master Login
/kodex-admin/dashboard        -> Master Governance & Pending Review Queue
/kodex-admin/users            -> User Approvals & Account Management
/kodex-admin/blogs            -> Global Publications Moderation
/kodex-admin/settings         -> Root Master Console Settings

/sitemap.xml                  -> Dynamic XML Sitemap
/robots.txt                   -> Dynamic Robots Crawler File
```

---

## 📄 License
MIT License. Created by **Dipesh Thapa**.
