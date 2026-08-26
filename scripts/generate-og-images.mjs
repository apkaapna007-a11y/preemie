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
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "og");
const AUTHOR_PHOTO = join(ROOT, "public", "dr-zeeshan-islam.png");
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
  shield: `<g fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M240 190 l88 36 v88 c0 70 -45 130 -88 156 c-43 -26 -88 -86 -88 -156 v-88 z" fill="${PAPER}"/>
    <path d="M205 310 l28 28 l55 -64" />
  </g>
  <circle cx="335" cy="208" r="14" fill="${CLAY}" opacity="0.9"/>`,
  calendar: `<g fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="150" y="205" width="180" height="180" rx="24" fill="${PAPER}"/>
    <path d="M150 255 h180"/>
    <path d="M195 180 v50 M285 180 v50"/>
    <path d="M185 300 h28 M236 300 h28 M185 345 h28 M236 345 h28" opacity="0.65"/>
    <path d="M295 320 l18 18 l38 -46" />
  </g>
  <circle cx="350" cy="220" r="14" fill="${CLAY}" opacity="0.9"/>`,
  spoon: `<g fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="212" cy="238" rx="44" ry="56" fill="${PAPER}"/>
    <path d="M212 294 v144"/>
    <path d="M286 194 v102 c0 22 18 40 40 40 h16"/>
    <path d="M286 236 h26" opacity="0.55"/>
  </g>
  <circle cx="330" cy="178" r="14" fill="${CLAY}" opacity="0.9"/>`,
  compare: `<g fill="none" stroke="${TEAL}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="132" y="208" width="110" height="164" rx="18" fill="${PAPER}"/>
    <rect x="258" y="176" width="110" height="196" rx="18" fill="${PAPER}"/>
    <path d="M167 250 h40 M167 286 h40 M167 322 h40" opacity="0.6"/>
    <path d="M293 226 h40 M293 262 h40 M293 298 h40 M293 334 h40" opacity="0.6"/>
    <path d="M242 292 h26" />
  </g>
  <circle cx="382" cy="194" r="14" fill="${CLAY}" opacity="0.9"/>`,
};

const CARDS = [
  {
    file: "og-home.png",
    variant: "default",
    motif: "due",
    title: ["Corrected Age", "Calculator"],
    sub: "for premature babies",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-milestones.png",
    variant: "default",
    motif: "chart",
    title: ["Premature Baby", "Milestones Chart"],
    sub: "by corrected age · 2–36 months",
    cap: "CDC/AAP prompts, reviewed by a paediatrician",
  },
  {
    file: "og-red-flags.png",
    variant: "default",
    motif: "flag",
    title: ["Preemie", "Red Flags"],
    sub: "when to call the doctor — don’t wait",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-guides.png",
    variant: "default",
    motif: "book",
    title: ["Corrected Age,", "Explained"],
    sub: "formulas, worked examples and sources",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-about.png",
    variant: "profile",
    title: ["Dr. Zeeshan", "Islam"],
    sub: "MBBS, MCPS (Pediatrics)",
    cap: "Pediatrician, medical writer, clinical reviewer",
  },
  {
    file: "og-brand.png",
    variant: "default",
    motif: "due",
    title: ["AdjustedAge"],
    sub: "corrected age & preemie follow-up",
    cap: "Reviewed by a consultant paediatrician",
  },
  {
    file: "og-pma.png",
    variant: "default",
    motif: "due",
    title: ["Postmenstrual Age", "Calculator"],
    sub: "PMA for preterm babies",
    cap: "Early NICU and follow-up age check",
  },
  {
    file: "og-weight-gain.png",
    variant: "default",
    motif: "chart",
    title: ["Preemie Weight", "Gain Calculator"],
    sub: "grams/day and g/kg/day",
    cap: "Track weight velocity between visits",
  },
  {
    file: "og-vaccines.png",
    variant: "default",
    motif: "shield",
    title: ["Preemie Vaccines", "Use Real Age"],
    sub: "chronological, not corrected",
    cap: "Routine vaccines follow age since birth",
  },
  {
    file: "og-late-preterm.png",
    variant: "default",
    motif: "due",
    title: ["Late Preterm", "Baby Guide"],
    sub: "34 to 36 weeks and corrected age",
    cap: "Feeding, milestones and common concerns",
  },
  {
    file: "og-followup.png",
    variant: "default",
    motif: "calendar",
    title: ["NICU Follow-Up", "Schedule"],
    sub: "corrected-age visit timing",
    cap: "Common checkpoints from 4 to 36 months",
  },
  {
    file: "og-solids.png",
    variant: "default",
    motif: "spoon",
    title: ["When Can My", "Preemie Start Solids?"],
    sub: "corrected age plus readiness",
    cap: "A feeding guide for premature babies",
  },
  {
    file: "og-age-difference.png",
    variant: "default",
    motif: "compare",
    title: ["Adjusted Age vs", "Chronological Age"],
    sub: "which age to use, and when",
    cap: "Milestones, vaccines, PMA and follow-up",
  },
];

function defaultCardSvg({ motif, title, sub, cap }) {
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
}

function profileCardSvg({ title, sub, cap }) {
  const titleEls = title
    .map(
      (line, i) =>
        `<text x="450" y="${252 + i * 82}" font-family="DejaVu Serif, serif" font-size="60" font-weight="bold" fill="${INK}">${esc(line)}</text>`,
    )
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${W}" height="14" fill="${CLAY}" opacity="0.35"/>
  <rect x="58" y="145" width="302" height="342" rx="34" fill="${PAPER}"/>
  <circle cx="1070" cy="100" r="180" fill="${PAPER}" opacity="0.55"/>
  <circle cx="930" cy="560" r="140" fill="${PAPER}" opacity="0.35"/>
  <text x="60" y="86" font-family="DejaVu Sans, sans-serif" font-size="26" letter-spacing="6" fill="${TEAL}" font-weight="bold">ADJUSTEDAGE</text>
  <text x="60" y="120" font-family="DejaVu Sans, sans-serif" font-size="17" letter-spacing="2" fill="${MUTED}">CLINICAL REVIEWER</text>
  ${titleEls}
  <rect x="450" y="418" width="58" height="6" rx="3" fill="${CLAY}"/>
  <text x="450" y="474" font-family="DejaVu Sans, sans-serif" font-size="29" fill="${MUTED}">${esc(sub)}</text>
  <text x="450" y="530" font-family="DejaVu Sans, sans-serif" font-size="21" fill="${TEAL}">${esc(cap)}</text>
  <text x="60" y="${H - 20}" font-family="DejaVu Sans, sans-serif" font-size="18" fill="${MUTED}" letter-spacing="1">PREEMIE.VERCEL.APP</text>
</svg>`;
}

async function roundedPortraitBuffer(file) {
  const resized = await sharp(file)
    .resize(290, 330, { fit: "cover", position: "center" })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="290" height="330"><rect x="0" y="0" width="290" height="330" rx="28" ry="28" fill="white"/></svg>`,
  );
  return sharp(resized)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

function portraitFrameBuffer() {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="302" height="342"><rect x="3" y="3" width="296" height="336" rx="31" ry="31" fill="none" stroke="${TEAL}" stroke-width="6"/><rect x="16" y="16" width="270" height="310" rx="24" ry="24" fill="none" stroke="white" stroke-opacity="0.65" stroke-width="2"/></svg>`,
  );
}

for (const card of CARDS) {
  const svg = Buffer.from(card.variant === "profile" ? profileCardSvg(card) : defaultCardSvg(card));

  let image = sharp(svg, { density: 144 }).resize(W, H);

  if (card.variant === "profile" && existsSync(AUTHOR_PHOTO)) {
    image = image.composite([
      { input: await roundedPortraitBuffer(AUTHOR_PHOTO), left: 64, top: 151 },
      { input: portraitFrameBuffer(), left: 58, top: 145 },
    ]);
  }

  await image.png({ compressionLevel: 9 }).toFile(join(OUT, card.file));
  console.log("wrote", card.file);
}
console.log("done");
