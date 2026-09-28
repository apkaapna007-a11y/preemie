# SEO Strategy — AdjustedAge (preemie.vercel.app)

**Horizon: 7 days** · Compiled 2026-09-28 · Goal: **organic search traffic**
Industry template: `publisher.md` (YMYL health publisher + interactive tool)

---

## 1. Discovery

| | |
|---|---|
| **Business type** | YMYL health tool + publisher (calculator cluster + editorial guides) |
| **Audience** | Parents of preterm babies searching at night; secondary: NICU follow-up nurses, GPs, developmental therapists |
| **Site** | 16 URL sitemap, true SSR (TanStack Start) on Vercel, physician-reviewed, 6 JSON-LD blocks/page |
| **Current state** | SEO Health Score **pending final audit** — technical 85, on-page 85, content 70, AI-readiness 76 |
| **KPI for this week** | Organic impressions + indexed-page coverage (GSC), not absolute traffic — a 7-day window is instrumentation + ranking-foundation time, not traffic time |
| **Constraints** | 1 week; no Google/Moz API credentials yet; single developer; content must clear physician review |

### The one structural decision that must be made this week
`preemie.vercel.app` is a **shared platform subdomain**. Backlinks accrue to `vercel.app`'s root authority, brand queries return nothing, and the site reads as a preview rather than a publication. `SEO-AUTHORITY-PLAYBOOK.md` already documents `drzeewrites.com` as an asset.
**Recommendation:** decide this week (own domain vs. stay), but **execute the cutover only after GSC is verified and a crawl baseline exists** — a domain move inside the same 7 days as the verification steps would destroy the measurement you just built. Prepared plan: `SITE-STRUCTURE.md` § Domain.

## 2. Positioning

Competitors split into two groups; the site's opening is the gap between them:

- **Authority publishers** (AAP/HealthyChildren, Healthdirect AU, NSW Health, Raising Children) — rank on domain authority, but their calculator is a static formula paragraph.
- **Bare calculators** (NICHD RTI, pemcalc, pedscalc, starship, calculate.co.nz) — functional, but thin, unreviewed, unbranded, with no content cluster.

**Positioning line:** *the only independently clinically-reviewed site that is both a working calculator and a citable reference for corrected age* — tool utility for the user, quotable structured facts for AI/Google citation.

## 3. Target query map (this week's bets)

| Query class | Example query | Winning page | Why we can win in 7 days |
|---|---|---|---|
| **A. Tool** (highest intent) | corrected age calculator / adjusted age calculator | `/` + `/adjusted-age-calculator` | Direct SERP competitors are weak one-page tools; ours is SSR + reviewed + feature-rich |
| **B. Definitional** | corrected age vs chronological age | `/adjusted-age-vs-chronological-age` | Answer-first structure already exists; needs citations + trim |
| **C. Decision** | when to stop correcting age for prematurity | `/when-to-stop-correcting` | No authoritative single-answer page; ours just needs depth + evidence |
| **D. Chart intent** | premature baby milestones corrected age chart | `/premature-baby-milestones` | **Currently mismatched** — page is 72 `<li>`, zero tables. Fix = fastest realistic win this week |
| **E. Vaccine mix-up** | do vaccines use corrected age | `/preemie-vaccines` | Clear-answer query, low competition, high parent anxiety |
| **F. Clinician tool** | postmenstrual age calculator PMA | `/pma-calculator` | pedscalc/pemcalc only; earns professional backlinks |

**Deliberately out of scope this week:** twins, discharge, sleep, growth-chart pages (already flagged still-open in the prior audit) — they are Phase 2 work, not 7-day work.

## 4. Technical foundation (this week's fixes)

From the completed audit passes:

1. **Citation gap (High, YMYL-critical):** 0 outbound source links on 15/16 pages. CDC/AAP/WHO/Fenton/INTERGROWTH appear as bare text. Every claim needs a primary link + `citation` in JSON-LD. *This is the single highest-leverage content fix in the plan.*
2. **Milestone chart artifact (High):** render a real `<table>` + CSV/print export on `/premature-baby-milestones` to match chart intent.
3. **llms.txt link syntax (High):** entries are `**/path** — desc`, not markdown links → AI parsers extract zero URLs.
4. **Favicon regression (High):** `public/favicon.png` is a committed Vercel 503 error page served as `image/png`, also referenced by `Organization.logo` / `WebSite.publisher.logo`.
5. **Sitemap automation (Medium):** wire `scripts/generate-sitemap.mjs` into `build`; `lastmod` frozen at 2026-08-26 while JSON-LD says 2026-08-27.
6. **Metadata (Medium):** 7 titles >60ch, 8 descriptions >160ch, brand suffix missing on `/when-to-stop-correcting`.
7. **Thin pages (High):** 11/16 under 800 `<main>` words; `/red-flags` = 166 prose words.
8. **Security headers (Medium):** no CSP / nosniff / Referrer-Policy / Permissions-Policy / X-Frame-Options.
9. **INP risk (Medium):** ~398 KB gz initial JS (jsPDF + Recharts) → dynamic-import both behind user actions.
10. **Verification (High):** GSC + Bing still not verified (carried over as STILL-OPEN from the 2026-08-26 audit).

## 5. E-E-A-T plan

Already strong: byline + dated review on 16/16, Physician + `sameAs` + `reviewedBy`, editorial + COI policy, sitewide disclaimer.
Close this week: **contact channel** (currently "via the about page"), **corrections log**, `reviewedBy` on the two `Article` schemas missing it, and a real `Organization.logo` asset.

## 6. Success criteria for the 7 days

| Check | Target | How measured |
|---|---|---|
| GSC property verified + sitemap submitted | ✅ done | GSC UI |
| Pages indexed | ≥14 of 16 | GSC URL Inspection / Coverage |
| Outbound primary-source citations | ≥12 of 16 pages | Re-crawl (`onpage_check.py` + grep) |
| Titles ≤60ch / descriptions ≤160ch | 16/16 | `onpage_check.py` totals |
| Milestone page tables | ≥1 real `<table>` + CSV export | DOM check |
| llms.txt extractable URLs | 16 | Parse test |
| Lighthouse/LCP on `/` (lab) | ≤2.5 s | Lab run after JS split |
| Canonical host decision | Written + approved | This document |

**How would we know this failed:** if by day 7 GSC shows 0 indexed pages despite 200s + self-canonicals, the blocker is authority/discovery, not on-page — pivot to submit via Indexing API/Bing and revisit domain strategy rather than shipping more content.

**Leading indicator to watch without re-running the audit:** GSC *impressions* on the tool query class. Impressions move days before clicks; zero impressions after verification means the query class is authority-blocked.
