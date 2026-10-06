# Welcome Itzfizz – Scroll-Driven Hero
🔗 **Live demo:** https://harsh3335.github.io/itzfizz-hero/
<img width="1470" height="956" alt="itx_fizz" src="https://github.com/user-attachments/assets/6c71e76e-be32-4542-8b9b-1d1f1a310f16" />

Scroll-linked hero animation: a car drives across the screen as you scroll, revealing the headline behind it and lighting up the impact stats.

**Stack:** Next.js (React, static export) · Tailwind CSS · GSAP + ScrollTrigger · HTML/CSS/JS

## Features
- Staggered intro on load (headline letters, then stats one by one)
- Scroll-scrubbed timeline (`scrub: 1.2`) – motion is tied to scroll progress and eased
- Transform/opacity animations, no custom scroll listeners
- Responsive and `prefers-reduced-motion` friendly

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Push to `main`; the included GitHub Actions workflow builds and publishes to GitHub Pages
(Settings → Pages → Source: **GitHub Actions**).
