/**
 * Regenerates public/sitemap.xml with lastmod taken from git history
 * (last commit touching each route file), instead of hand-maintained dates.
 *
 * Run after merging content changes:
 *   node scripts/generate-sitemap.mjs
 */
import { execSync } from "node:child_process";
import { statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://preemie.vercel.app";

// URL path -> (source file, changefreq, priority). Add new routes here.
const PAGES = [
  { path: "/", file: "src/routes/index.tsx", changefreq: "weekly", priority: "1.0" },
  {
    path: "/premature-baby-milestones",
    file: "src/routes/premature-baby-milestones.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/how-to-calculate-corrected-age",
    file: "src/routes/how-to-calculate-corrected-age.tsx",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/when-to-stop-correcting",
    file: "src/routes/when-to-stop-correcting.tsx",
    changefreq: "monthly",
    priority: "0.7",
  },
  { path: "/red-flags", file: "src/routes/red-flags.tsx", changefreq: "monthly", priority: "0.8" },
  {
    path: "/methodology",
    file: "src/routes/methodology.tsx",
    changefreq: "monthly",
    priority: "0.5",
  },
  { path: "/about", file: "src/routes/about.tsx", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", file: "src/routes/privacy.tsx", changefreq: "monthly", priority: "0.3" },
];

function lastmodFor(file) {
  const abs = join(ROOT, file);
  try {
    const out = execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: ROOT }).toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {
    // not a git repo / no history — fall through to mtime
  }
  return statSync(abs).mtime.toISOString().slice(0, 10);
}

const urls = PAGES.map((p) => {
  const loc = p.path === "/" ? BASE + "/" : BASE + p.path;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmodFor(p.file)}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const out = join(ROOT, "public", "sitemap.xml");
writeFileSync(out, sitemap);
console.log(`wrote ${out} (${PAGES.length} urls)`);
