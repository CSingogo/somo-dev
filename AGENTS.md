# somo-dev

Personal site and app landing pages for somosingogo.dev. Astro 7, **static output only** (no server runtime in production), Tailwind v4, bun.

Astro 7 is newer than most training data. Check `node_modules/astro/dist/types/public/config.d.ts` and https://docs.astro.build before using an API from memory.

## Commands

- `bun run dev` — dev server
- `bun run build` — `astro check` then `astro build` into `dist/` (must pass cleanly)
- `bun run preview` — serve `dist/`

## Structure

- `src/pages/` — routes. `build.format: "file"` + `trailingSlash: "never"`, so `grace-hymns/home.astro` builds to `/grace-hymns/home` with no trailing slash.
- `src/layouts/` — `BaseLayout` (head, meta, theme script, fonts) and `GraceHymnsLayout`.
- `src/components/` — `.astro` for anything static. React (`.tsx`) only as islands: theme toggle, screenshot carousel, and the `react-bits/` effects (`FadeContent`, `ClickSpark` from React Bits; `FadeContent` uses gsap). Store badges in `base/buttons` are React rendered to static HTML with no client directive.
- `src/lib/site.ts` — site and app metadata. `src/lib/use-theme.ts` — next-themes-compatible hook for the toggle.
- Fonts come from the Astro Fonts API (`fonts` in `astro.config.mjs`, `<Font />` in layouts).

## URLs that must not break

App store listings link to these. Never rename or remove them:

- `/grace-hymns/home`
- `/grace-hymns/privacy-policy`
- `/grace-hymns` (301 to `/grace-hymns/home` via Caddy; meta-refresh page as fallback)
- `/` , `/robots.txt`, `/sitemap.xml` (301 to `/sitemap-index.xml` via Caddy)

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`: `bun install` → `bun run build` → `rsync -avz --delete dist/` to `/var/www/somo-dev/dist/` on the VPS (Ubuntu 24.04, Caddy serves it). Secrets: `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_KNOWN_HOSTS`.

`deploy/Caddyfile` is the source of truth for `/etc/caddy/Caddyfile` but CI does **not** install it. After editing it, install by hand (commands are in the file header). The slash-less URLs depend on its `try_files` rule.

PWA: `public/manifest.webmanifest` and icons, plus `integrations/pwa.mjs`, which writes `dist/sw.js` from `src/pwa/sw.js` after each build with a precache list of every built file and a content hash. Pages are network-first, assets cache-first. The service worker is only registered in production builds.

When replacing a screenshot in `public/ghs/`, bump `ASSET_VERSION` in `screenshot-carousel.tsx` to bust Cloudflare's cache.
