# somo-dev

Source for [somosingogo.dev](https://somosingogo.dev): a landing page and privacy policy for each app (currently Grace Hymns).

Astro (static output) · Tailwind v4 · React islands for the few interactive pieces · bun.

## Develop

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # astro check + build → dist/
bun run preview
```

## Routes

| Path | Page |
|---|---|
| `/` | Homepage |
| `/grace-hymns/home` | Grace Hymns landing page |
| `/grace-hymns/privacy-policy` | Grace Hymns privacy policy (linked from app stores) |
| `/grace-hymns` | Redirects to `/grace-hymns/home` |

## Deploy

Pushing to `main` builds the site in GitHub Actions and rsyncs `dist/` to the VPS, where Caddy serves it as static files. Required repository secrets: `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_KNOWN_HOSTS` (get the last with `ssh-keyscan -t ed25519 <host>`).

The server's Caddy config lives in [`deploy/Caddyfile`](deploy/Caddyfile). It is not deployed by CI; install it manually when it changes (instructions in the file).
