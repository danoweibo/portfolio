# 🧑‍💻 Portfolio

> Modern personal portfolio website built with **Next.js** — designed for performance, strong SEO, clean motion, responsive layouts, and a polished user experience.

---

## 👀 Preview

The production site represents my work, skills, projects, and professional brand.

🔗 **[View Live Site →](https://yourdomain.com)**

---

## 🛠 Tech Stack

### ⚙️ Core

| Technology                                    | Purpose                   |
| --------------------------------------------- | ------------------------- |
| [Next.js](https://nextjs.org/)                | React framework & routing |
| [React](https://react.dev/)                   | UI component library      |
| [TypeScript](https://www.typescriptlang.org/) | Type safety               |

### 🎨 Styling

| Technology                               | Purpose               |
| ---------------------------------------- | --------------------- |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |

### ✨ Motion & UX

| Technology                                      | Purpose                  |
| ----------------------------------------------- | ------------------------ |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Lenis](https://lenis.darkroom.engineering/)    | Smooth scrolling         |

### 🔧 Tooling

| Technology                       | Purpose              |
| -------------------------------- | -------------------- |
| [ESLint](https://eslint.org/)    | Code linting         |
| [Prettier](https://prettier.io/) | Code formatting      |
| [PNPM](https://pnpm.io/)         | Fast package manager |

### 🚀 Deployment

| Platform                      | Purpose         |
| ----------------------------- | --------------- |
| [Vercel](https://vercel.com/) | Hosting & CI/CD |

---

## ✅ Features

- 📱 **Mobile-first** responsive design
- 🔍 **Full SEO support** — metadata, Open Graph, Twitter cards
- ⚡ **Fast page loads** — optimized assets and lazy loading
- 🎞️ **Smooth scrolling** experience via Lenis
- 🎭 **Motion-based interactions** with scroll-driven animations
- 🧩 **Reusable component** architecture
- 🏗️ **Clean, scalable** project structure
- 🌗 **Shimmer skeletons** on all image loads

---

## 🚀 Local Development

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### Install

```bash
pnpm install
```

### Run Dev Server

```bash
pnpm dev
```

### 🪟 Custom Local Domain (Windows Hosts Setup)

Configured locally to run with a custom host:

```bash
danoweibo.local:5000
```

```bash
next dev -H danoweibo.local -p 5000
```

> Add `127.0.0.1 danoweibo.local` to your `C:\Windows\System32\drivers\etc\hosts` file.

---

## 📁 Project Structure

```
portfolio/
├── app/                  # App Router pages, layouts, metadata
├── components/           # UI components
│   ├── hero/
│   ├── careers/
│   ├── products/
│   └── ui/               # Shared/reusable UI
├── lib/                  # Helpers, constants, utilities
├── providers/            # Context & providers
├── public/               # Static assets
│   └── images/
├── .vscode/
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔍 SEO

Strong SEO foundations baked in:

- ✅ Next.js Metadata API
- ✅ Canonical URLs
- ✅ Robots directives
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ JSON-LD structured data
- ✅ Semantic HTML structure
- ✅ `sitemap.ts` — auto-generated sitemap
- ✅ `robots.ts` — crawler access rules
- ✅ `manifest.ts` — PWA manifest

---

## 📦 Production Build

```bash
pnpm build
pnpm start
```

---

## 🎯 Purpose

This project serves as:

- 🧑‍💼 **Personal website** — professional online presence
- 💼 **Portfolio** — showcasing real-world projects
- 🏗️ **Project showcase** — products built and shipped
- 🧠 **Technical brand** — demonstrating engineering depth

---

## 📄 License

Open for inspiration and learning. Feel free to reference the structure or patterns — just don't copy it wholesale. ✌️
