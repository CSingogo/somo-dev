// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import pwa from "./integrations/pwa.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://somosingogo.dev",
  output: "static",
  // Emit grace-hymns/home.html (not home/index.html) so /grace-hymns/home keeps
  // its slash-less URL. Caddy resolves it with try_files; see deploy/Caddyfile.
  build: { format: "file" },
  trailingSlash: "never",
  // Meta-refresh fallback only; Caddy sends the real 301.
  redirects: { "/grace-hymns": "/grace-hymns/home" },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/grace-hymns\/?$/.test(page) && !page.endsWith("/404"),
    }),
    pwa(),
  ],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    { provider: fontProviders.google(), name: "Geist", cssVariable: "--font-geist-sans" },
    { provider: fontProviders.google(), name: "Geist Mono", cssVariable: "--font-geist-mono" },
    { provider: fontProviders.google(), name: "Source Serif 4", cssVariable: "--font-source-serif" },
    { provider: fontProviders.google(), name: "Work Sans", cssVariable: "--font-work-sans" },
    { provider: fontProviders.google(), name: "JetBrains Mono", cssVariable: "--font-jetbrains-mono" },
  ],
});
