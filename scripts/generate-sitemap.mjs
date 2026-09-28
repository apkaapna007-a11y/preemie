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
    path: "/adjusted-age-calculator",
    file: "src/routes/adjusted-age-calculator.tsx",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/pma-calculator",
    file: "src/routes/pma-calculator.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/preemie-weight-gain",
    file: "src/routes/preemie-weight-gain.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/preemie-vaccines",
    file: "src/routes/preemie-vaccines.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/late-preterm-baby",
    file: "src/routes/late-preterm-baby.tsx",
    changefreq: "monthly",
    priority: "0.78",
  },
  {
    path: "/nicu-follow-up-schedule",
    file: "src/routes/nicu-follow-up-schedule.tsx",
    changefreq: "monthly",
    priority: "0.78",
  },
  {
    path: "/when-can-my-preemie-start-solids",
    file: "src/routes/when-can-my-preemie-start-solids.tsx",
    changefreq: "monthly",
    priority: "0.78",
  },
  {
    path: "/adjusted-age-vs-chronological-age",
    file: "src/routes/adjusted-age-vs-chronological-age.tsx",
    changefreq: "monthly",
    priority: "0.78",
  },
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

function gitOut(args) {
  try {
    return execSync(`git ${args}`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    // not a git repo, no history, or git unavailable — caller falls back to mtime
    return null;
  }
}

/**
 * lastmod precedence:
 *  1. Uncommitted edit  -> file mtime (the content on disk is newer than any commit).
 *  2. Clean checkout    -> last commit date touching that route.
 *     Deliberately NOT max(commit, mtime): on CI/Vercel mtime is the checkout time,
 *     which would stamp every URL with the build date and tell Google the whole
 *     site changed on each deploy.
 *  3. No git available   -> file mtime.
 */
function lastmodFor(file) {
  const abs = join(ROOT, file);
  const mtime = statSync(abs).mtime.toISOString().slice(0, 10);

  const dirty = gitOut(`status --porcelain -- "${file}"`);
  if (dirty !== null && dirty !== "") return mtime;

  const committed = gitOut(`log -1 --format=%cs -- "${file}"`);
  if (committed && /^\d{4}-\d{2}-\d{2}$/.test(committed)) return committed;

  return mtime;
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
