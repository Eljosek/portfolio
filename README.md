# Jose Herrera — Personal Portfolio

A cinematic, Apple-inspired personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion + CSS |
| 3D | Three.js / React Three Fiber |
| Deploy | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel --prod
```

## Structure

```
portfolio/
├── app/
│   ├── page.tsx          ← Entry point, lazy-loads all sections
│   ├── layout.tsx        ← Fonts, metadata, viewport
│   └── globals.css       ← Base styles, grain texture, utilities
├── components/
│   ├── Navbar.tsx        ← Scroll-aware nav with progress bar
│   ├── CustomCursor.tsx  ← Physics cursor with magnetic feel
│   ├── Hero.tsx          ← Particle network + char-by-char reveal
│   ├── About.tsx         ← About + avatar card + tag cloud
│   ├── TechSphere.tsx    ← Interactive 3D orbit (Three.js)
│   ├── Projects.tsx      ← Horizontal drag carousel
│   ├── Timeline.tsx      ← Draw-on-scroll timeline
│   ├── CloudPath.tsx     ← Animated learning roadmap
│   └── Contact.tsx       ← Magnetic CTA buttons
├── lib/
│   └── data.ts           ← All portfolio content (single source of truth)
└── public/               ← Static assets
```

## Content Customization

All content lives in [`lib/data.ts`](lib/data.ts). Update `PERSONAL`, `PROJECTS`, `TECH_STACK`, `TIMELINE`, and `CLOUD_PATH` to customize.
