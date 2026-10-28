# ⚡ Enterprise Admin Dashboard (Laravel + Inertia + React)

<p align="left">
  <img src="https://img.shields.io/badge/Laravel_11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI" />
</p>

Full-stack administrative management platform built with modern monolithic architecture: **Laravel 11**, **Inertia.js**, **React 18**, **TypeScript**, and **Tailwind CSS**. It combines the rapid backend routing and ORM power of Laravel with the fluid client-side rendering of React single-page applications (SPA).

---

## 🚀 Key Features

- **Inertia.js Client-Server Bridge:** Seamless full-stack reactivity without requiring a separate REST API layer.
- **Accessible UI Component Library:** Integrated with **Radix UI** primitives and **Shadcn UI** design system for high usability and WCAG standards.
- **Role-Based Access Control (RBAC):** Granular authorization policies, protected routes, and session validation.
- **Interactive Data Visualization:** Dynamic dashboards with metrics, activity graphs, and indicators built using **Recharts**.
- **Automated Document Generation:** Server-side PDF export functionality using **TCPDF** and **FPDI**.
- **Modern Build Pipeline:** Powered by **Vite** and **Tailwind CSS** with Hot Module Replacement (HMR).

---

## 🛠️ Tech Stack

- **Backend:** PHP 8.2+, Laravel 11, Eloquent ORM, Ziggy Routing.
- **Frontend:** React 18, TypeScript, Inertia.js, Framer Motion, Lucide Icons.
- **Styling:** Tailwind CSS, Radix UI primitives, Sonner toasts.
- **Tooling:** Vite, Composer, NPM, Prettier.

---

## ⚙️ Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Jmrm16/admin.git
cd admin

# 2. Install backend dependencies
composer install

# 3. Install frontend packages
npm install

# 4. Configure environment
cp .env.example .env
php artisan key:generate

# 5. Run migrations & start dev servers
php artisan migrate
npm run dev
# In another terminal:
php artisan serve
```

---

## 👨‍💻 Author

**José Miguel Rincón Martínez**  
*Backend & Full-Stack Systems Engineer*  
- LinkedIn: [linkedin.com/in/rincon-jose-28638036b](https://www.linkedin.com/in/rincon-jose-28638036b/)  
- GitHub: [@Jmrm16](https://github.com/Jmrm16)
