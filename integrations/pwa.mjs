import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative, sep } from "node:path";

// Files the service worker should not precache.
const SKIP = [/\.map$/, /^sitemap.*\.xml$/, /^robots\.txt$/, /^grace-hymns\.html$/, /^sw\.js$/];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])),
  );
  return files.flat();
}

// dist/index.html -> "/", dist/grace-hymns/home.html -> "/grace-hymns/home" (matches Caddy's try_files).
const toUrl = (path) => "/" + path.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");

/** Writes dist/sw.js from src/pwa/sw.js with a precache list and a content hash. */
export default function pwa() {
  return {
    name: "somo-pwa",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const files = (await walk(out))
          .map((f) => relative(out, f).split(sep).join("/"))
          .filter((f) => !SKIP.some((re) => re.test(f)))
          .sort();

        const hash = createHash("sha256");
        for (const f of files) hash.update(f).update(await readFile(join(out, f)));
        const version = hash.digest("hex").slice(0, 12);

        const template = await readFile(new URL("../src/pwa/sw.js", import.meta.url), "utf8");
        const sw = template
          .replace('"__VERSION__"', JSON.stringify(version))
          .replace("/* PRECACHE */ []", JSON.stringify(files.map(toUrl), null, 2));
        await writeFile(join(out, "sw.js"), sw);
        logger.info(`sw.js: ${files.length} files precached (version ${version})`);
      },
    },
  };
}
