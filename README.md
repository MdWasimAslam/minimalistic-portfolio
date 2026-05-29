# Md Wasim Aslam — Developer Portfolio

A calm, editorial, content-first developer portfolio built with **React 18**, **Material UI v5** and **Framer Motion**.

The design favors substance over spectacle: a warm light palette, real product screenshots, a human first-person voice, and quiet motion. Inspired by the restraint of sites like [mackenziechild.me](https://www.mackenziechild.me/) — let the work and the person carry it.

![React](https://img.shields.io/badge/React-18-111) ![MUI](https://img.shields.io/badge/MUI-5-111) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-%E2%9C%93-111)

---

## ✨ What it is

A single-screen **"desk"** of side-by-side panels (inspired by [mackenziechild.me](https://www.mackenziechild.me/)) — each column scrolls independently on desktop and stacks into a normal page on mobile.

- **Dark / light mode** — toggle in the header; **dark is the default**, choice persisted, applied before first paint (no flash).
- **Top bar** — name + availability dot, theme toggle, a live **Kolkata clock**, one-click **Copy email**, and Résumé.
- **About** — a duotone portrait, a first-person hello, labeled blocks (Role · Focus · Stack · Experience · Teaching · Superpower · Location), a **live-ticking age**, and contact handles.
- **Career Journey** — a **Google-Calendar-style agenda**: year headers + event cards with a "NOW" marker and accent rails.
- **Professional Work** — **real screenshots** of shipped products (CommentSold, Pop.store, ClearedTalent, Healthcare Analytics) with honest captions.
- **Side Projects** — FlywheelCars CRM, DocuVerse, Google Clone, AniMash, boAt.
- **Accessible & responsive** — independent panel scroll on large screens, full stack on mobile; motion honors `prefers-reduced-motion`; images load with skeleton → fade + graceful fallback; skip-link + semantic landmarks.

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Background | `#F5F4EF` (warm paper) |
| Ink (text) | `#1A1A17` |
| Muted text | `#6B6B62` |
| Hairline | `#E3E1D8` |
| Accent (sparing) | `#3E5B49` muted green |

Type: **Inter** everywhere, **Fira Code** for mono. Defined in `src/theme/theme.js`.

---

## 📂 Structure

```
src/
├── animations/variants.js     # gentle reveal/fade variants
├── components/
│   ├── Panel.js               # labeled, independently-scrollable column
│   ├── SmartImage.js          # aspect box + skeleton + fade-in + fallback
│   └── SocialLinks.js
├── data/                       # single source of truth
│   ├── achievements.js         # certifications + education
│   ├── experience.js
│   ├── personal.js             # greeting, bio, note, tools, contact
│   └── projects.js             # `featured` → Selected Work; rest → Side Projects
├── layouts/TopBar.js           # name + clock + copy-email + résumé
├── sections/                   # one file per panel
│   ├── AboutPanel.js
│   ├── CareerPanel.js
│   ├── WorkPanel.js
│   └── SidePanel.js
├── theme/theme.js
├── App.js · index.css · index.js
public/projects/                # real screenshots (jpg) + portrait
scripts/shoot.js                # re-capture project screenshots (Playwright)
```

Layout: a 4-column desk on `lg+` (each panel scrolls on its own); panels stack into a single column below that.

---

## 🚀 Getting Started

```bash
npm install      # first time only
npm start        # dev → http://localhost:3000
npm run build    # production build
```

### Deploy to Vercel
Zero config — Vercel auto-detects Create React App (build `npm run build`, output `build/`).
An `.npmrc` (`legacy-peer-deps=true`) keeps installs from ever failing on peer deps. Just import the repo and deploy.

---

## 🛠 Customization

Everything is data-driven — edit `src/data/`:

| File | Controls |
|------|----------|
| `personal.js` | Greeting, bio, note, tools, contact, social links, résumé/photo paths |
| `projects.js` | Work — `featured: true` shows a large screenshot block; others list under "Other things I've built" |
| `experience.js` | Career timeline (optional `metric` per role) |
| `achievements.js` | Education + recognition |
| `navigation.js` | Navbar links (ids must match section ids) |

### Photo, age & résumé
- Portrait: `public/avatar.jpeg` (a green duotone is applied in CSS).
- Live age: set `birthDate` in `src/data/personal.js` (the "Age" line ticks from it).
- Résumé: drop your PDF at `public/Md_Wasim_Aslam.pdf` (or change `resumeUrl` in `personal.js`).

### Re-capturing project screenshots
Real screenshots live in `public/projects/`. To refresh them from the live sites:
```bash
npm install -D playwright --legacy-peer-deps
npx playwright install chromium
node scripts/shoot.js     # then optimize the PNGs to jpg (see git history)
```

---

## 📬 Contact
- **Email:** wasimaslam2897@gmail.com
- **GitHub:** [@MdWasimAslam](https://github.com/MdWasimAslam)
- **LinkedIn:** [md-wasim-aslam](https://www.linkedin.com/in/md-wasim-aslam/)
