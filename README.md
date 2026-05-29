# Md Wasim Aslam — Developer Portfolio

A content-first developer portfolio laid out as a single-screen **"desk"** of side-by-side panels, with a built-in **theme switcher** (9 themes) and a tiny **admin CMS** backed by Postgres.

Built with **React 18**, **Material UI v5**, **Framer Motion**, and **Vercel Serverless Functions + Neon Postgres** for live editing.

![React](https://img.shields.io/badge/React-18-111) ![MUI](https://img.shields.io/badge/MUI-5-111) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-%E2%9C%93-111) ![Vercel](https://img.shields.io/badge/Vercel-Serverless-111) ![Neon](https://img.shields.io/badge/Neon-Postgres-111)

---

## ✨ Highlights

A 4-column desk on large screens (each panel scrolls independently); the panels stack into a single scrolling page on tablet/mobile.

- **Top bar** — name, an animated `Full-…` role line, a **theme switcher**, a live **Kolkata clock**, one-click **Copy email**, and Résumé.
- **About** — portrait, a first-person intro, hairline-separated blocks (Role · Experience · Location), a colorful **Stack** of brand-icon chips, a **live-ticking age**, and contact handles.
- **Career Journey** — colorful cards with a per-role accent bar, a work/education icon, a period chip, the **designation**, and a link.
- **Professional Work** — real product screenshots (CommentSold, Pop.store, ClearedTalent, Healthcare Analytics) with the site favicon, description, and tech tags.
- **Side Projects** — colored monogram tiles for FlywheelCars CRM, DocuVerse, Google Clone, AniMash, boAt.
- **🐈‍⬛ Easter egg** — "Oreo" peeks over the panels at random; click him for a little modal + video.
- **Themes** — 7 dark + 2 light, switched live from the header, choice persisted, applied before first paint (no flash). **Carbon** is the default.
- **Accessible & responsive** — independent panel scroll on desktop, full stack on mobile; motion honors `prefers-reduced-motion`; images load with skeleton → fade + graceful fallback; skip-link + semantic landmarks.

---

## 🎨 Themes

Switched from the header palette menu (no separate dark/light toggle):

**Dark** — Carbon (default), Graphite, Midnight, Tokyo Night, Dracula, Catppuccin, Solarized
**Light** — Paper, Daylight

All themes are defined in `src/theme/theme.js` (`THEMES` array — add/edit one there). Type: **Inter** everywhere, **Fira Code** for mono/numerals.

---

## 📂 Structure

```
api/                            # Vercel serverless functions
├── _config.js                  # DB connection string + admin password
├── auth.js                     # POST — verify admin password
└── content.js                  # GET/POST — read/write site content (Neon)

src/
├── animations/variants.js      # Framer Motion reveal/fade variants
├── components/
│   ├── Panel.js                # labeled, independently-scrollable card column
│   ├── SmartImage.js           # aspect box + skeleton + fade-in + fallback
│   ├── TechChip.js             # brand-icon stack chip (devicon)
│   ├── RotatingWord.js         # the animated "Full-…" suffix
│   ├── LiveAge.js              # age that ticks live from a birth date
│   ├── CatEasterEgg.js         # peeking-cat logic + Oreo modal
│   └── CuteCat.js              # the cat SVG
├── content/ContentContext.js   # merges DB overrides over the static defaults
├── data/                       # static defaults (source of truth)
│   ├── personal.js             # greeting, intro, about blocks, tools, contacts, résumé/photo
│   ├── experience.js           # roles (designation, period, tech, links, metric)
│   ├── achievements.js         # education (used by Career)
│   └── projects.js             # featured → Professional Work; rest → Side Projects
├── layouts/TopBar.js
├── sections/
│   ├── AboutPanel.js
│   ├── CareerPanel.js
│   ├── WorkPanel.js
│   └── SidePanel.js
├── admin/Admin.js              # /admin editor (password-gated)
├── theme/theme.js              # THEMES + MUI theme factory
├── App.js · index.css · index.js

public/
├── avatar.jpeg                 # portrait
├── favicon.png
├── Md_Wasim_Aslam.pdf          # résumé (referenced by resumeUrl)
└── projects/                   # screenshots (jpg), healthcare.svg, cat_vid.mp4

scripts/shoot.js                # optional: re-capture screenshots (Playwright)
```

---

## 🚀 Getting Started

```bash
npm install      # first time only
npm start        # dev → http://localhost:3000
npm run build    # production build
```

> The static site runs fully with `npm start`, using the built-in defaults from `src/data/`.
> The **admin + live content** need the serverless API, which only runs on Vercel (or locally via `vercel dev`).

---

## 🛠 Editing content

Two ways to change what the site shows:

1. **Static defaults** — edit the files in `src/data/` (always the fallback).
2. **Live, via `/admin`** — sign in and edit; changes are saved to Postgres and merged over the defaults at runtime (`ContentContext`).

| File | Controls |
|------|----------|
| `personal.js` | Greeting, intro, About blocks, Stack tools, contacts, `birthDate` (live age), `resumeUrl`, `avatar` |
| `projects.js` | `featured: true` → Professional Work (with screenshot); otherwise Side Projects |
| `experience.js` | Career roles — `designation`, `period`, `tech`, `links`, `metric` |
| `achievements.js` | `education` entries shown in the Career timeline |

- **Photo:** `public/avatar.jpeg`. **Résumé:** `public/Md_Wasim_Aslam.pdf` (or set `resumeUrl`).
- **Live age:** `birthDate` in `personal.js`.

---

## 🔐 Admin CMS (`/admin`)

A password-gated editor that writes a single JSON document to **Neon Postgres** through the serverless functions in `api/`. On load, the site fetches `/api/content` and merges any saved overrides over the static defaults.

- Edit About (text + résumé link), Stack, Projects (JSON), and Career (JSON), then **Save**.
- Config lives in **`api/_config.js`** (`DATABASE_URL`, `ADMIN_PASSWORD`).

> ⚠️ `api/_config.js` currently hardcodes the credentials for testing. For a real deployment, move them to **Vercel Environment Variables** and read from `process.env` instead — never point this at a production database with the password committed.

**Run the admin locally** (needs the API):
```bash
npm i -g vercel
vercel dev          # serves the app + /api together → http://localhost:3000/admin
```

---

## ▲ Deploy (Vercel)

- Auto-detected as Create React App (build `npm run build`, output `build/`).
- `vercel.json` rewrites non-`/api` routes to `index.html` (SPA routing for `/admin`).
- `.npmrc` (`legacy-peer-deps=true`) keeps installs from failing on peer deps.
- **Node.js version:** the repo pins `engines.node` to `24.x`; set **Project → Settings → Node.js Version → 24.x** to match.
- `DATABASE_URL` is read from `api/_config.js` today; switch it to a Vercel env var for production.

---

## 📬 Contact
- **Email:** wasimaslam2897@gmail.com
- **GitHub:** [@MdWasimAslam](https://github.com/MdWasimAslam)
- **LinkedIn:** [md-wasim-aslam](https://www.linkedin.com/in/md-wasim-aslam/)
