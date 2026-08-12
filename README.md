# AdjustedAge — corrected-age–native follow-up tool for NICU graduates

Author and clinical reviewer: **Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)**, consultant paediatrician.

A single-purpose tool that turns two facts — date of birth and gestational age at
birth — into every downstream answer in preterm follow-up: corrected age,
chronological age, postmenstrual age, the correct milestone row, and a serial
visit record that persists across encounters.

Built against the research finding that `premature baby milestones chart`
(590/mo) returns ten articles and zero tools, and `corrected age calculator`
(880/mo, KD 32) has no result above class D except an AAP explainer at #10. The
institutions with maximum authority explain; none of them build. The moat here
is a named, credentialed paediatrician on a YMYL topic — not the code.

---

## Implemented in this release

### Tool (`/`)
- Corrected age = chronological − (280 − GA in days); negative before term and
  displayed as such rather than clamped.
- Postmenstrual age = GA at birth + chronological age.
- All arithmetic in whole days, UTC-normalised dates (no DST off-by-one).
- GA range enforced 22+0 to 40+6; future birth dates rejected with an inline
  message; measurement plausibility bounds warn softly, never block.
- Gestational-age band classification (extremely / very / moderately / late
  preterm) with the correction convention for that band.
- CDC/AAP 2022 surveillance prompts (2–36 months) auto-selected by **corrected**
  months, as tick-boxes with no score.
- "Act early" concerns rendered unconditionally at every age and every state.
- Serial visit record — weight, length, head circumference — in `localStorage`.
  No account, no server, no upload. Print stylesheet and CSV export.

### Content cluster shipped
| Route | Target keyword |
|---|---|
| `/` | corrected age calculator |
| `/premature-baby-milestones` | premature baby milestones chart |
| `/how-to-calculate-corrected-age` | how to calculate corrected age |
| `/when-to-stop-correcting` | when to stop using corrected age |
| `/red-flags` | preemie developmental red flags |
| `/methodology` | trust / E-E-A-T |
| `/about` | author authority |

### E-E-A-T implementation
- Named author with credentials in the header of every page (`ReviewLine`),
  the footer, and `Person` + `MedicalWebPage` JSON-LD.
- Visible last-reviewed date sitewide.
- `/methodology` lists every formula as implemented, every source with its year,
  role and **limitation**, and what the tool deliberately refuses to do.
- Explicit funding statement: no formula-industry or pharma sponsorship, no ads,
  no tracking, no data collection.
- Fenton vs INTERGROWTH-21st disagreement stated openly rather than hidden
  behind one number.

### Safety design (non-negotiable, do not regress)
1. No pass/fail verdict is ever emitted.
2. CDC act-early red flags always surface, in every state of the UI.
3. "Contact your paediatrician today — don't wait for the next visit" appears on
   every result surface and in the global footer disclaimer.
4. Loss of a previously acquired skill is called out as a same-week concern at
   any age.

### Follow-up, PDF, analytics and offline (this release)

- **Follow-up visit schedule.** Corrected-age-indexed visit calendar (4, 8, 12,
  18, 24, 36 months corrected) computed from the original due date, with each
  visit's clinical focus and a done / due / upcoming state.
  `src/lib/followup.ts`.
- **One-tap clinician PDF.** Every serial entry exports an A4 visit summary:
  visit and birth facts, GA category, corrected / chronological / postmenstrual
  age, measurements, weight velocity in g/kg/day versus the previous visit, the
  visit note, the corrected-age surveillance prompts, the act-early list and the
  full disclaimer. Generated entirely client-side with `jsPDF`
  (`src/lib/visit-pdf.ts`) — no upload, works offline.
- **Visit notes.** Free-text note per visit, stored locally, printed on the PDF.
- **Privacy-first analytics.** `src/lib/analytics.ts` counts event *names* only
  (`tool_calculated`, `visit_saved`, `pdf_exported`, `csv_exported`,
  `print_summary`, `milestone_checked`, `visit_removed`). No cookies, no
  identifiers, no IP, no dates, no measurements, no note text — and the counts
  stay in localStorage rather than being uploaded. `/privacy` displays the raw
  counts and offers per-device opt-out and delete.
- **Installable + offline.** `vite-plugin-pwa` (`generateSW`, `autoUpdate`) with
  a single guarded registration wrapper in `src/lib/pwa.ts` that refuses to
  register in dev, in an iframe, on Lovable preview hosts, or with `?sw=off`.
  NetworkFirst for HTML navigations, CacheFirst for hashed same-origin assets.
  Manifest, maskable icons, theme colour and apple-touch-icon are wired in
  `vite.config.ts` and `src/routes/__root.tsx`.
- **Premium header.** Sticky, blurred, credential trust-bar, pill navigation
  with active state, primary CTA, and a proper mobile drawer.

### Technical
TanStack Start + React 19, Tailwind v4 semantic tokens in `src/styles.css`
(no hardcoded colours in components), static JSON milestone data, zero backend,
zero paid API. Key modules: `src/lib/corrected-age.ts`,
`src/lib/milestones.ts`, `src/lib/followup.ts`, `src/lib/visit-pdf.ts`,
`src/lib/analytics.ts`, `src/lib/pwa.ts`,
`src/components/CorrectedAgeTool.tsx`.


---

## Deliberately NOT shipped

- **Fenton 2013 / INTERGROWTH-21st LMS plotting.** Blocked pending written
  confirmation of redistribution terms for the published LMS coefficient tables.
  Shipping the percentile without the licence, or with only one chart, would be
  the wrong trade. See `/methodology`.
- **Programmatic `/corrected-age-at-N-months` pages.** Thin duplicates. Do not
  build them.
- **`gestational age calculator`** (4,400/mo). Obstetric due-date intent,
  different user, dilutes topical focus.
- **Eczema severity (SCORAD/EASI), Phoenix sepsis, PECARN, GIR, phototherapy.**
  Either already owned by MDCalc-class tools, or high medical risk without
  institutional backing, or a pharma-funded CPC trap.

---

## Validation still owed (run before investing further)

The community-signal layer of the research is the weakest part of it and has not
been closed.

- **Day 1 — SERP.** Manually check all cluster keywords incognito, location-set.
  Threshold: ≥12 of 20 show ≤1 class-A/D result.
- **Day 2 — Keywords.** Verify the UNVERIFIED terms and pull uk / au / ca / in
  databases. Threshold: ≥3,000/mo US or ≥6,000/mo global.
- **Day 3 — Competitors.** Time RTI, PediTools, pemcalc, Omnicalculator and
  Starship on a phone. Threshold: none supports a second data point.
- **Day 4 — Community. CRITICAL.** r/NICUParents, r/preemies, r/pediatrics,
  NICU follow-up nurse groups. Threshold: ≥10 distinct posts showing
  corrected-age confusion. **Under 4 signals → reject the whole thesis.**
- **Day 5 — Licensing.** Fenton / INTERGROWTH LMS and CDC milestone reuse terms,
  in writing.

Abort condition: if the AAP ships a corrected-age calculator, this opening is
closed and the site should pivot to the Ballard scorer.

---

## Future build plan

**Phase 2 — growth (unblocks after Day 5 licensing).**
Fenton 2013 and INTERGROWTH-21st LMS z-scores side by side below 50 weeks PMA,
with automatic hand-off to WHO after term-equivalent, an SVG serial trajectory
plot, and the divergence explained inline. Adds `/fenton-growth-chart`,
`/intergrowth-21st`, `/fenton-vs-intergrowth`.

**Phase 3 — cluster completion (to 20 pages).**
`/adjusted-age-calculator` (1,600/mo synonym), `/pma-pca-cga` (480/mo, the
clinician entry point), `/late-preterm`, `/twins-multiples`,
`/vaccines-corrected-age`, `/solid-foods`, `/catch-up-growth`,
`/nicu-follow-up-schedule`, `/growth-velocity-preterm`,
`/head-circumference-preterm`, plus Privacy / Contact / Disclaimer.

**Phase 4 — programmatic, tightly limited.**
`born-at-{22..36}-weeks` — 15 pages only, each with genuinely distinct
GA-specific outcome context, expected trajectory and follow-up schedule. Ship
only the ones that are actually distinct.

**Phase 5 — clinician tier.**
Multi-patient list, EHR-pasteable visit summary, NICU-follow-up-clinic
licensing. Requires accounts and therefore a backend; the parent-facing tool
must remain account-free and local-only regardless.

**Phase 6 — infrastructure.**
Sitemap and canonical tags once a domain is set, `FAQPage` and `HowTo`
structured data, an install prompt A2HS nudge on the published site, and an
annual clinical review cycle with dated changelog entries on `/methodology`.
(Offline/PWA support and the privacy page shipped in this release.)


**Explicitly out of scope forever:** dosing calculators, fluid or electrolyte
protocols, infusion dilutions, and anything where a decimal error harms a child.
