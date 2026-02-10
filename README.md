# 🚀 KODEX. | Full-Stack Content Management System

KODEX. is a high-performance, secure blog management platform built with the PERN stack (PostgreSQL, Express, React, Node.js). It features a robust role-based authentication system, automated image optimization, and a seamless responsive UI.

🔗 Live Demo: https://mykodex.netlify.app

---

## ✨ Key Features

- Secure Auth: JWT-based authentication using HTTP-only, Secure, and SameSite:None cookies for cross-domain security.
- Role-Based Dashboards: Dynamic UI that distinguishes between public readers and authenticated content managers.
- Image Optimization: Automated image transformation pipeline using Cloudinary & Multer.
- SEO Ready: Dynamic metadata management (Titles, Descriptions, Slugs) for every post
- Performance: Implements RTK Query for efficient data fetching, caching, and optimistic UI updates.

#

## 🛠️ Technical Stack

| Layer                | Technology                                                                                                                                                                                                                                                                                                                                |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**         | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **State Management** | ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)                                                                                                                                                                                                                                        |
| **Backend**          | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=white)                                                                                                                   |
| **Database**         | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=for-the-badge&logo=neon&logoColor=black)                                                                                                                      |
| **ORM**              | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)                                                                                                                                                                                                                                     |
| **Storage/CDN**      | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)                                                                                                                                                                                                                         |
| **Deployment**       | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)                                                                                                                            |

#

## ⚙️ Local Setup

1. Clone the Repository & Install

   ```bash
   git clone https://github.com/Thapa-Dipesh/blog-task.git

   # Install dependencies for both frontend and backend
   npm install
   ```

   - Backend Setup:

     ```bash
     cd backend
     npm install
     npx prisma generate
     npx prisma db push

     npm run dev
     ```

   - frontend Setup:
     ```bash
     cd frontend
     npm install
     ```

2. Environment Configuration
   - Create a .env file in the backend directory:

     ```bash
     DATABASE_URL="your_postgresql_url"
     JWT_SECRET="your_secret_key"
     CLOUDINARY_CLOUD_NAME="your_name"
     CLOUDINARY_API_KEY="your_key"
     CLOUDINARY_API_SECRET="your_secret"
     NODE_ENV="development"
     CORS_ORIGIN="your_frontend_url"
     ```

   - Create a .env file in the frontend directory:

     ```bash
     VITE_API_BASE_URL="your_backend_url"
     ```

#

## 📐 Architecture Decisions

- TypeScript: Used throughout the entire stack to ensure end-to-end type safety and significantly reduce runtime errors.
- Prisma ORM: Chosen for its type-safe query builder, intuitive schema modeling, and easy migrations.

- CORS Configuration: Strictly configured to allow cross-origin requests only from trusted production domains with credential support for secure cookie handling.

- SPA Routing: Implemented \_redirects logic on Netlify to support deep-linking and browser refreshes in a Single Page Application environment.

#
