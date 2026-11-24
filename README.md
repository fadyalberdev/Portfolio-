# Fady Alber — Portfolio

One-page developer portfolio. Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP (ScrollTrigger + SplitText) and Lenis.

## Design

**Concept: the darkroom.** The site is built around Fady's two crafts, engineering and photography. It uses a warm near-black background, one safelight-amber accent, film grain, and a cursor glow that works like a safelight.

| | |
|---|---|
| Colours | ink `#0d0b09` · coal `#16130f` · paper `#efe8dc` · muted `#9a9084` · amber `#ffa31a` |
| Type | Archivo, one family with a width axis, for everything; JetBrains Mono only in the terminal |
| Signature moment | The hero name. Letters rise one by one in amber and settle to paper, like a print developing. On desktop the width axis opens from condensed to full as they rise, and letters near the cursor widen, thicken and warm back to amber. |
| Scroll story | In the AXIOM case study, a system diagram stays pinned while the highlights scroll past. Each highlight lights up its part of the architecture, and the connections draw in as you scroll. |
| Contact sheet | Beyond Code is a strip of film. Hovering a frame circles it in amber grease pencil, the way photographers mark picks. |

The rest is deliberately quiet: one primary easing curve (`--ease-out`), a 150 / 300 / 600 ms duration scale, and no fade-up on every block.

## Edit content

**All text lives in [`src/data/content.ts`](src/data/content.ts).** That covers the hero, about, AXIOM case study, skills, Beyond Code, contact and the terminal's answers. You don't need to edit any component to change copy.

| What | Where |
|---|---|
| CV download | `public/cv.pdf` (the backend/full-stack CV). `public/cv-frontend.pdf` is the frontend version. |
| AXIOM screenshots | Put images in `public/projects/` and set `src` on the three `featured.screenshots` entries, e.g. `"/projects/axiom-search.png"`. An empty `src` shows a placeholder frame. |
| AXIOM diagram | Each `featured.highlights` item lists the diagram `nodes` it lights up (`web`, `api`, `db`, `llm`, `stripe`, `tests`). |
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

## Deploy on Netlify

**From GitHub (recommended, redeploys on every push):**

1. Push this folder to a GitHub repo, e.g. `fadyalberdev/portfolio`.
2. In Netlify, go to **Add new site → Import an existing project → GitHub** and pick the repo.
3. Keep the detected settings (`npm run build`, publish `.next`; `netlify.toml` already sets them) and click **Deploy**.
4. Put the live URL (or your custom domain) into `site.url` in `content.ts` and push again, so canonical links, the sitemap and the Open Graph image use it.

**From the command line:**

```bash
npx netlify-cli login
npx netlify-cli deploy --build --prod
```

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
- **Reduced motion** is tiered, not a kill switch:
  - Removed: the letter rise, parallax, Lenis smooth scrolling, the scroll-drawn diagram, the custom cursor, the magnetic pull, the grain drift and the light sweep.
  - Kept: colour and opacity changes, focus rings, and the AXIOM highlight that tracks your scroll position.
  - It reacts live if the OS setting changes.
  - `prefers-reduced-transparency` replaces the frosted nav with a solid one.
- **Custom cursor and glow** only run on devices with a fine pointer (mouse or trackpad). Touch devices get the native experience.
- **Performance**
  - Only `transform` and `opacity` animate per frame, with two exceptions: the hero's width axis runs once, on tablet and desktop only, and the AXIOM diagram's lines draw via stroke offset.
  - The hero reveal is pure CSS, so it starts on first paint without waiting for JavaScript.
  - Lenis runs on GSAP's ticker so ScrollTrigger never reads a stale scroll position.
  - Headings are split only after fonts load and the main thread is idle.
- **Lighthouse** (local production build, Lighthouse 12):
  - Desktop: 100 performance.
  - Mobile: about 93 performance (simulated slow 4G and 4× CPU).
  - Both: 100 accessibility, best practices and SEO.

## Structure

```
src/
  app/          layout (fonts, SEO), page, OG image, robots, sitemap, icon
  components/   one file per section + Cursor, MagneticButton, SplitHeading, SmoothScroll, ArchitectureDiagram
  data/         content.ts  ← edit me
  lib/          github.ts (repo fetching), gsap.ts (plugin registration), useReducedMotion.ts
public/
  cv.pdf, cv-frontend.pdf, projects/, beyond/
```
