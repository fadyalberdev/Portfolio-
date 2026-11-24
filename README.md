# Fady Alber — Portfolio

One-page developer portfolio. Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Edit content

**All text lives in [`src/data/content.ts`](src/data/content.ts).** That covers the hero, about, AXIOM case study, skills, Beyond Code, contact and the terminal's answers. You don't need to edit any component to change copy.

| What | Where |
|---|---|
| CV download | `public/cv.pdf` (the backend/full-stack CV). `public/cv-frontend.pdf` is the frontend version. |
| AXIOM screenshots | Put images in `public/projects/` and list them in `featured.screenshots`, e.g. `{ src: "/projects/axiom-home.png", alt: "AXIOM home page" }`. The first image is shown large and the rest in a row below. If the list is empty, a designed placeholder is shown. |
| Photography / design grid | Put images in `public/beyond/` and set `src` on each `beyond.gallery` item. If `src` is empty, the tile shows a placeholder. |
| Domain for SEO / OG | `site.url` |
| Repos hidden from "More projects" | `moreProjects.exclude` |
| Always-shown project cards | `moreProjects.pinned` (Coffee Shop is listed here) |

## Run locally

Requires Node 18.17 or newer (Node 20+ recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Deploy on Vercel

1. Push this folder to a GitHub repo, e.g. `fadyalberdev/portfolio`:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/fadyalberdev/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo and click **Deploy**. No settings or environment variables are needed.
3. Copy your production URL (or a custom domain) into `site.url` in `content.ts` and push again, so canonical links, the sitemap and the Open Graph image use the right domain.

## How it works

- **GitHub repos** are fetched on the server (`src/lib/github.ts`) and cached for 1 hour with ISR. Visitors never call the GitHub API directly, so its 60 requests/hour rate limit isn't a problem. Forks and excluded repos are skipped, and results are sorted by last update. Pinned cards always render, even if the API is down.
- **Open Graph image** is generated at build time by `src/app/opengraph-image.tsx`. `robots.txt`, `sitemap.xml`, the favicon (`icon.svg`) and Person JSON-LD are included.
- **Accessibility**
  - Semantic landmarks and a skip link.
  - Visible focus rings.
  - The name animation keeps an `aria-label` with the full name.
  - The typing line has static screen-reader text.
  - The terminal has a labelled input and an `aria-live` log.
  - The copy-email button announces success.
- **Reduced motion**
  - `MotionConfig reducedMotion="user"` turns off transform animations.
  - CSS stops the grain and the caret blink.
  - The custom cursor, glow and magnetic pull turn off.
  - The typing line shows static text.
- **Custom cursor and glow** only run on devices with a fine pointer (mouse or trackpad). Touch devices get the native experience.

## Structure

```
src/
  app/          layout (fonts, SEO), page, OG image, robots, sitemap, icon
  components/   one file per section + Cursor, MagneticButton, Reveal, TypingLine
  data/         content.ts  ← edit me
  lib/          github.ts (repo fetching)
public/
  cv.pdf, cv-frontend.pdf, projects/, beyond/
```
