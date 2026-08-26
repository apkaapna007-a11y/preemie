/**
 * Generates the 1200×630 Open Graph / Twitter share cards in public/og/.
 *
 * Deterministic SVG → PNG via sharp, so card text is always exact and
 * on-brand (no AI-generated text artifacts on a YMYL site).
 *
 * Not part of the app build. Run when a card's copy changes:
 *   npm install --no-save sharp && node scripts/generate-og-images.mjs
 *
 * Fonts: DejaVu Serif / DejaVu Sans (the site's Newsreader/Public Sans
 * are loaded at runtime and unavailable to this rasterizer; DejaVu is a
 * close-enough editorial stand-in for share cards).
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "og");
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 630;
const TEAL = "#14606E";
const INK = "#16343B";
const CLAY = "#A9684B";
const CREAM = "#FBF9F4";
const PAPER = "#F2ECE1";
const MUTED = "#5C7A80";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---- motifs: minimal flat line-art, drawn on the left third ----
const MOTIFS = {
  due: `<g stroke="${TEAL}" fill="none" stroke-width="3">
    <circle cx="215" cy="320" r="120" opacity="0.35"/>
    <circle cx="215" cy="320" r="86" />
    <circle cx="215" cy="320" r="18" fill="${TEAL}" stroke="none"/>
    <path d="M190 360 h50" stroke-linecap="round"/>
    <path d="M182 382 h66" stroke-linecap="round" opacity="0.55"/>
  </g>
  <g fill="${CLAY}" stroke="none">
    <path d="M215 445 c-6 -8 -14 -8 -18 0 c-3 6 1 12 9 16 c4 2 5 2 9 0 c8 -4 12 -10 9 -16 c-2 -4 -6 -4 -9 0 z" opacity="0.9"/>
  </g>`,
  chart: `<g stroke="${TEAL}" fill="none" stroke-width="3">
    <path d="M150 470 q30 -30 60 -60 q30 -30 60 -60 q30 -30 60 -60" stroke-dasharray="2 12" stroke-linecap="round" opacity="0.5"/>
    <circle cx="150" cy="470" r="10"/>
    <circle cx="215" cy="410" r="13"/>
    <circle cx="280" cy="345" r="16"/>
    <circle cx="345" cy="275" r="19" fill="${TEAL}" stroke="none"/>
    <path d="M345 205 v34 M329 222 h32" stroke-linecap="round"/>
  </g>
  <g fill="${CLAY}" stroke="none">
    <path d="M415 190 l6 13 l14 2 l-10 10 l2 14 l-12 -6 l-12 6 l2 -14 l-10 -10 l14 -2 z" opacity="0.9"/>
  </g>`,
  flag: `<g stroke="${TEAL}" fill="none" stroke-width="4" stroke-linecap="round">
    <line x1="200" y1="190" x2="200" y2="455"/>
    <path d="M204 205 h120 l-28 34 l28 34 h-120 z" fill="${CLAY}" stroke="${CLAY}"/>
  </g>`,
  book: `<g stroke="${TEAL}" fill="none" stroke-width="3" stroke-linecap="round">
    <path d="M170 250 q35 -45 70 0 q35 -45 70 0 v130 q-35 -40 -70 0 q-35 -40 -70 0 z" fill="${PAPER}"/>
    <path d="M240 250 v130"/>
    <path d="M192 290 h28 M192 318 h28 M192 346 h28" opacity="0.6"/>
    <path d="M260 290 h28 M260 318 h28 M260 346 h28" opacity="0.6"/>
  </g>`,
  steth: `<g stroke="${TEAL}" fill="none" stroke-width="4" stroke-linecap="round">
    <path d="M215 300 a62 62 0 0 1 62 62 v60 h20 v-38 a80 80 0 0 0 -80 -80 h-4 a80 80 0 0 0 -80 80 v38 h20 v-60 a62 62 0 0 1 62 -62 z"/>
    <circle cx="285" cy="432" r="14" fill="${TEAL}" stroke="none"/>
    <circle cx="285" cy="432" r="26" opacity="0.3"/>
  </g>
  <g fill="${CLAY}" stroke="none">
    <path d="M148 262 c-5 -7 -12 -7 -16 0 c-3 5 1 10 8 14 c3 2 5 2 8 0 c7 -4 10 -9 8 -14 c-2 -4 -5 -4 -8 0 z" opacity="0.9"/>
  </g>`,
};

const CARDS = [
  {
    file: "og-home.png",
    motif: "due",
    title: ["Corrected Age", "Calculator"],
    sub: "for premature babies",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-milestones.png",
    motif: "chart",
    title: ["Premature Baby", "Milestones Chart"],
    sub: "by corrected age · 2–36 months",
    cap: "CDC/AAP prompts, reviewed by a paediatrician",
  },
  {
    file: "og-red-flags.png",
    motif: "flag",
    title: ["Preemie", "Red Flags"],
    sub: "when to call the doctor — don’t wait",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-guides.png",
    motif: "book",
    title: ["Corrected Age,", "Explained"],
    sub: "formulas, worked examples and sources",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-about.png",
    motif: "steth",
    title: ["Dr. Zeeshan Islam"],
    sub: "MBBS, MCPS (Pediatrics)",
    cap: "Consultant paediatrician and clinical reviewer",
  },
  {
    file: "og-brand.png",
    motif: "due",
    title: ["AdjustedAge"],
    sub: "corrected age & preemie follow-up",
    cap: "Reviewed by a consultant paediatrician",
  },
];

const cardSvg = ({ motif, title, sub, cap }) => {
  const titleEls = title
    .map(
      (line, i) =>
        `<text x="438" y="${268 + i * 86}" font-family="DejaVu Serif, serif" font-size="${title.length > 1 ? 64 : 56}" font-weight="bold" fill="${INK}">${esc(line)}</text>`,
    )
    .join("\n");
  const titleBottom = 252 + title.length * 86;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="${H - 14}" width="${W}" height="14" fill="${TEAL}" opacity="0.08"/>
  <circle cx="1050" cy="120" r="230" fill="${PAPER}" opacity="0.55"/>
  <circle cx="1010" cy="560" r="150" fill="${PAPER}" opacity="0.4"/>
  ${MOTIFS[motif]}
  <text x="60" y="86" font-family="DejaVu Sans, sans-serif" font-size="26" letter-spacing="6" fill="${TEAL}" font-weight="bold">ADJUSTEDAGE</text>
  <text x="60" y="120" font-family="DejaVu Sans, sans-serif" font-size="17" letter-spacing="2" fill="${MUTED}">PREEMIE FOLLOW-UP</text>
  ${titleEls}
  <rect x="442" y="${titleBottom + 6}" width="56" height="6" rx="3" fill="${CLAY}"/>
  <text x="438" y="${titleBottom + 58}" font-family="DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">${esc(sub)}</text>
  <text x="60" y="${H - 52}" font-family="DejaVu Sans, sans-serif" font-size="20" fill="${TEAL}">${esc(cap)}</text>
  <text x="60" y="${H - 20}" font-family="DejaVu Sans, sans-serif" font-size="18" fill="${MUTED}" letter-spacing="1">PREEMIE.VERCEL.APP</text>
</svg>`;
};

for (const card of CARDS) {
  const svg = Buffer.from(cardSvg(card));
  await sharp(svg, { density: 144 })
    .resize(W, H)
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, card.file));
  console.log("wrote", card.file);
}
console.log("done");
