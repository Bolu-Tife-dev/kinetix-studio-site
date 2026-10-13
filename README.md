# Kinetix Studio — Marketing Site

Conversion-focused landing page, download center, and agent API documentation for
**Kinetix Studio**, an open-source AI-powered desktop video editor.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4,
Framer Motion, and Lucide icons.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero with OS-detecting download button, capability grid, interactive before/after comparison slider, workflow, CTA |
| `/docs` | Agent API reference — cURL, Python, and TypeScript snippets, endpoint table, MCP server docs |
| `/downloads` | Download matrix for Windows, macOS (Intel / Apple Silicon / Universal), and Linux, with SHA-256 verification |
| `/not-found` | 404 page |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js 16 removed `next lint`) |

## Project structure

```
src/
  app/
    layout.tsx           Root layout, Geist fonts, site metadata
    page.tsx             Landing page
    docs/page.tsx        API documentation
    downloads/page.tsx   Download center
    not-found.tsx        404
    globals.css          Tailwind v4 theme tokens, utilities, keyframes
    robots.ts, sitemap.ts, icon.svg
  components/
    site-header.tsx      Nav + mobile menu
    site-footer.tsx
    hero.tsx             Headline, OS-aware download button, trust row
    features.tsx         Capability matrix
    compare-slider.tsx   Draggable before/after demo
    how-it-works.tsx     Workflow steps + scrolling keyword strip
    cta.tsx
    editor-mockup.tsx    Hero editor mockup
    download-button.tsx  Split button + platform menu
    download-center.tsx  Tabbed artifact matrix with SHA-256 copy
    docs-toc.tsx         Sticky section nav with scroll spy
    icons.tsx            Brand mark + platform glyphs
    ui/                  button, code-block, section-heading
  lib/
    downloads.ts         Release version, artifact list, OS metadata
    use-detected-os.ts   Hydration-safe OS detection
```

## Design system

Tokens live in `src/app/globals.css` under Tailwind CSS 4's `@theme` block.

| Token | Value |
| --- | --- |
| `void` | `#09090b` — page background |
| `volt` | `#a855f7` — primary neon purple |
| `flux` | `#22d3ee` — secondary neon cyan |
| `signal` | `#f43f5e` — accent rose |

Shared utilities: `shell`, `eyebrow`, `card`, `card-hover`, `grid-back`, `noise`,
`text-gradient`, `text-neon`, `hairline`. Motion keyframes: `drift`, `beat`,
`sweep`, `flicker`, `marquee`, `scan`.

## Product data

Download metadata is centralized in `src/lib/downloads.ts`:

- Version: `2.4.1` (codename `Spectra`)
- Local API: `http://127.0.0.1:4721`
- Download base: `https://github.com/kinetix-studio/kinetix/releases/download/v2.4.1`
- Site metadata base: `https://kinetix.studio`

Update `RELEASE` and `ARTIFACTS` there to publish a new version — the hero button,
download center, verify snippets, and release history all read from it.

## OS detection

`useDetectedOs()` (`src/lib/use-detected-os.ts`) reads `navigator.userAgent`
through `useSyncExternalStore`, avoiding hydration mismatches and
set-state-in-render warnings. The server snapshot returns `"windows"`.

## Deployment

Static output — no runtime data fetching. Deploys directly to Vercel or Netlify
with zero configuration.

```bash
npm run build
npm run start
```

## Notes

- Next.js 16 with `cacheComponents` enabled — avoid `new Date()` during render;
  hoist to module scope instead.
- lucide-react v1 does not ship `Windows`, `Github`, or `Apple` icons; custom SVG
  components live in `src/components/icons.tsx`.
- `tsconfig.json` targets `ES2022` for named regex capture groups.
