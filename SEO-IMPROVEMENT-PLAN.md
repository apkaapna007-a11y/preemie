# SEO Improvement Plan — AdjustedAge (https://preemie.vercel.app)

**Created:** 2026-09-29 · **Baseline:** `FULL-AUDIT-REPORT.md` (2026-09-28, health **77.4/100**)
**Supersedes nothing:** `SEO-STRATEGY.md` (7-day bets, executed), `ACTION-PLAN.md` (P0–P2 backlog), `IMPLEMENTATION-ROADMAP.md` (day-by-day week 1) remain the record for what shipped. **This document is the plan for what comes next.**

**Objective:** organic search traffic. **Horizon:** 90 days, reviewed weekly.
**Reality check:** week 1 bought *eligibility* (citations, depth, metadata, valid markup). It did not buy rankings — nothing has been deployed, indexed or measured yet. This plan sequences instrumentation → technical debt → architecture → content → authority, because on a new domain with zero backlinks, publishing more content before the site is measurable is how work goes unseen.

---

## 0. Where we actually are

| Dimension | State |
|---|---|
| Code | Week-1 fixes committed and pushed (`e97040f`), verified locally: lint 0 · 6/6 tests · build 0 · 16/16 route crawl clean |
| Production | **Not yet deployed** — live site still scores the audit's numbers |
| Measurement | **Zero.** No GSC, no Bing, no CrUX, no GA4, no PSI API. Every performance number in the audit is inference |
| Authority | Domain absent from the Common Crawl graph → effectively no backlink profile |
| Content | 16 URLs; 3 thin pages expanded; growth-chart cluster (open since 2026-08-26) still unshipped |

**The binding constraint is not effort, it is instrumentation.** Until GSC exists, we cannot tell ranking movement from noise. Everything below is ordered to remove that blind spot first.

---

## 1. KPI stack

| Tier | Metric | Source | Target | Cadence |
|---|---|---|---|---|
| **Lagging** | Organic clicks | GSC Performance | Baseline first, then trend | Weekly |
| **Lagging** | Clicks from the *tool* query class (`corrected age calculator`, `adjusted age`, `PMA calculator`) | GSC query filter | Non-zero within 60 days of verification | Weekly |
| **Leading** | **Impressions** on the tool query class | GSC | Non-zero within **14 days** of verification | Weekly |
| **Leading** | Indexed pages / coverage | GSC Coverage | **16/16 within 30 days** | Weekly |
| **Leading** | Pages with ≥1 inbound external link | GSC Links + Common Crawl | First referring domain by day 60 | Monthly |
| **Quality** | Core Web Vitals (LCP ≤2.5 s, **INP** ≤200 ms, CLS ≤0.1) | PSI API / CrUX | All three green on `/` by day 45 | Monthly |
| **Quality** | Health score | Re-run audit | 77.4 → **≥85** by day 90 | Monthly |
| **Quality** | `llms.txt`-cited URLs answered by AI crawlers | Manual probe | 16/16 extractable | Monthly |

**Leading indicators matter more than clicks in a 90-day window.** Impressions move days to weeks before clicks; zero impressions 14 days after verification means the query class is authority-blocked, not that the on-page work failed — pivot to §5 rather than writing more pages.

---

## 2. Guardrails (carry over from `CONTENT-CALENDAR.md`)

- **Never add `HowTo` schema** (rich results removed Sept 2023).
- **Never add new `FAQPage` for SERP gain** (Google retired FAQ results 2026-05-07). Existing blocks may be corrected for markup↔copy integrity only.
- **Never measure CWV with FID** — the metric is **INP**.
- **Never ship a page under 800 `<main>` words** or leave one under 400.
- **Never break the cannibalization map** — one canonical URL per cluster; other pages trim and link, never delete (`CONTENT-CALENDAR.md` table).
- **Physician review is a hard gate** on every copy change; batch to one session per week.
- **No new URLs until Phase 2** (day 30+), and only from the approved cluster list.
- **Never invent a metric** when the evidence tier is unavailable — record "unknown" instead.

---

## 3. Phase 0 — Instrument (Days 1–3) · *nothing else matters until this lands*

| # | Task | Effort | Done when |
|---|---|---|---|
| 0.1 | **Deploy `e97040f`** to production | Low | Live site serves the new favicon, headers, titles |
| 0.2 | Verify property in **Google Search Console** (file already in `public/`) + submit `sitemap.xml`; request indexing on `/`, `/adjusted-age-calculator`, `/premature-baby-milestones` | Low (owner account) | Property verified, sitemap accepted |
| 0.3 | Verify **Bing Webmaster Tools**; import from GSC | Low (owner account) | Verified + sitemap submitted |
| 0.4 | Enable **PageSpeed Insights API** (free tier) so lab CWV can be measured rather than inferred | Low | `pagespeed_check.py` returns scores, not rate-limit errors |
| 0.5 | Re-run the audit **after deploy** as drift baseline `id 2`; diff against `id 1` | Low | Post-deploy deltas documented |

**Exit criterion:** impressions and indexed-page data flowing. If 0.2 cannot be done this week, every later phase is flying blind — treat it as a hard blocker, not a backlog item.

---

## 4. Phase 1 — Technical & schema debt (Weeks 2–3)

Highest score-per-hour-work of anything on this list. All of it is already specified in `ACTION-PLAN.md` P1.1–P1.8.

| # | Task | Why it's here | Impact | Effort |
|---|---|---|---|---|
| 1.1 | **Self-host Google Fonts** (`@fontsource-variable/newsreader`, `/public-sans`), preload LCP weight, drop both preconnects | Removes 2 serialized round-trips from the LCP path on every page | High | Medium |
| 1.2 | **Code-split jsPDF + Recharts** behind dynamic import | ~398 KB gzipped initial payload is the only real INP risk; the calculator path needs neither | High | Medium |
| 1.3 | Schema: one `@id`-keyed **Organization** replacing 31 anonymous copies | Enables entity consolidation; Google can't merge what has no identifier | Medium | Medium |
| 1.4 | Schema: dedupe `Physician` on `/about` + add `ProfilePage`; fix `medicalSpecialty` → `"Pediatric"` (14 spots) | Two YMYL-critical validity defects, both cheap | Medium | Low |
| 1.5 | Schema: `image` on the 9 nodes lacking it; `WebPage` for `/privacy`; `MedicalWebPage` + `reviewedBy` on the 2 `Article` guides; breadcrumb label parity | Completes YMYL wiring sitewide | Medium | Medium |
| 1.6 | `public/` image cache TTL; drop `fetchPriority=high` from non-LCP avatars | Small but free | Low | Low |
| 1.7 | FAQ JSON-LD ↔ visible copy parity (**integrity only**) | Marks quality, no SERP-gain motive | Low | Medium |

**KPI:** lab LCP ≤2.5 s and INP ≤200 ms on `/`; schema validation 0 errors across 16/16; health score contribution from Schema 74 → ≥85.

---

## 5. Phase 2 — Architecture & discoverability (Weeks 3–4)

On-page authority is wasted if crawl depth and link equity stop at a six-link header. Source: `findings/sitemap.md` (78/100, architecture sub-score **3/7**).

| # | Task | Why | Impact | Effort |
|---|---|---|---|---|
| 2.1 | **Expand header navigation** beyond 6 of 16 pages | 4 routes are near-orphans (`/preemie-vaccines`, `/preemie-weight-gain`, `/pma-calculator`, `/when-can-my-preemie-start-solids`) | High | Medium |
| 2.2 | Raise body-link sources: every page ≥5, `/privacy` ≥1 | 59% of all anchors are header/footer boilerplate | Medium | Low |
| 2.3 | **Query-string prefill links** (guide → calculator with GA/date prefilled) | Converts a read into a tool use; the pattern `SEO-AUDIT.md` §3.3 proposed and nobody built | Medium | Low |
| 2.4 | Calculator-cluster de-duplication: unique intro + FAQ per spoke, hub/spoke split, **no deletions** | Overlap 0.64 between `/` and `/adjusted-age-calculator` risks splitting relevance | Medium | Medium |
| 2.5 | **Readability pass** on the 8 parent-facing guides (Flesch target ≥60) | Median prose Flesch ≈46 at grade 8.3–11.5 for a lay-parent audience — a genuine satisfaction problem, not a vanity metric | Medium | High |

**KPI:** all 16 pages reachable in ≤2 clicks; ≥12 in header; cluster overlap <0.40; median Flesch ≥55.

---

## 6. Phase 3 — Content expansion (Weeks 4–8) · *only after Phase 0–2*

No new URLs before day 30. Approved cluster list, in priority order:

| # | Page | Query bet | Why this one first | Effort |
|---|---|---|---|---|
| 3.1 | **Growth chart** (Fenton/WHO) | preemie weight chart / growth chart corrected age | Open since 2026-08-26; completes the fourth calculator-adjacent cluster; **license check is the blocker** — do that before writing | High |
| 3.2 | **Corrected-age timeline artifact** | corrected age timeline / preemie age chart | Image + table hybrid; earns the visual/IMAGE search surface the site currently has zero of | Medium |
| 3.3 | Twins correction nuances | corrected age twins | Distinct clinical nuance (twins correct to their own GA); strong community shareability | Medium |
| 3.4 | NICU discharge / sleep guides | preemie sleep corrected age, coming home from NICU | Fills two of three named topical gaps | Medium |
| 3.5 | Homepage FAQ → 8–10 items | answer-engine extraction | Existing `FAQPage` extended, not created | Low |

**Hard rules:** every new page ≥800 `<main>` words, citation-backed, physician-reviewed, in the sitemap, with a unique title ≤60ch — and it must fit the cannibalization map in `CONTENT-CALENDAR.md` or the map gets amended first.

**KPI:** ≥4 new URLs indexed; each with ≥1 GSC impression within 30 days of submission.

---

## 7. Phase 4 — Authority (Weeks 8–13)

The audit's biggest unresolved weakness: **0 backlinks at the only tier measurable without credentials.** Publishing without this yields indexed pages that rank nowhere.

| # | Task | Notes |
|---|---|---|
| 4.1 | Off-site identity: `/about` → `preemie.vercel.app` as "my clinical tool for NICU parents"; footer link back | Cross-links two same-owner properties — do it *naturally*, 2–3 contextual links, **never sitewide footer reciprocity** (`SEO-AUTHORITY-PLAYBOOK.md`) |
| 4.2 | **Community seeding:** r/NICUParents, r/preemies, r/pediatrics, NICU Facebook groups, WhatExpect/BabyBoard boards — answer corrected-age questions helpfully, tool as evidence, no spam | Free, aligned with README's validation plan; also the source of the next content questions |
| 4.3 | First outreach batch: 5–10 niche edits / resource-page inclusions | Pediatric, nursing and developmental-therapy sites |
| 4.4 | Re-measure with `commoncrawl_graph.py` | Success = first referring domain visible in CC or GSC Links |
| 4.5 | **Domain cutover decision** (decided, execution deferred) | Execute in one window with a full 301 map — never split equity across two hosts |

**Kill criterion:** if by day 60 there are still zero referring domains, stop outreach volume and change the asset — publish something genuinely citable (original data, the 24-vs-36-month evidence comparison, a licensable chart) rather than more outreach.

---

## 8. Sequenced backlog (what to do next, in order)

| Order | Item | Phase | Impact | Effort | Blocked by |
|---|---|---|---|---|---|
| 1 | Deploy + GSC + Bing + PSI | 0 | 🔴 enabling | Low | **Owner accounts** |
| 2 | Fonts self-host + JS split | 1 | 🔴 high | Medium | 0.1 |
| 3 | Header nav + body links + prefill | 2 | 🔴 high | Medium | 0.1 |
| 4 | Schema batch (Organization, Physician, enum, images) | 1 | 🟠 med-high | Medium | 0.1 |
| 5 | Readability pass (8 guides) | 2 | 🟠 med | High | — |
| 6 | Growth chart (+ license cleared) | 3 | 🟠 med-high | High | 0.1, 4 |
| 7 | Corrected-age timeline artifact | 3 | 🟠 med | Medium | 0.1 |
| 8 | Community seeding + first outreach | 4 | 🔴 high | Medium | 0.1 |
| 9 | Twins / discharge / sleep guides | 3 | 🟡 med | Medium | 3, 5 |
| 10 | Domain cutover | 4 | 🟡 situational | High | day 60 decision |

---

## 9. Weekly operating rhythm

| Day | Ritual | Tool |
|---|---|---|
| Mon | Pull GSC: impressions, clicks, indexed count for the tool query class; 10-minute variance review | GSC UI |
| Tue | Content batch + physician review (one session) | — |
| Wed | Ship one technical item from §8 | `bun run lint && bun run test && bun run build` |
| Thu | Re-crawl after changes: `onpage_check.py` + the 16-route verification — **0 issues before merge** | `preemie.vercel.app-audit/onpage_check.py` |
| Fri | Update `ACTION-PLAN.md` status column; note blockers | — |
| Monthly | Full audit re-run → drift diff vs baseline; `commoncrawl_graph.py`; PSI lab CWV | `runtime.py` |

**Weekly budget:** 1 technical item + 1 content batch + 1 measurement review. Anything more than that in a week means a phase is under-scoped — cut scope, not verification.

---

## 10. What would make this plan wrong

| Signal | Interpretation | Response |
|---|---|---|
| 0 impressions 14 days after GSC verification | Authority-blocked, not on-page-blocked | Skip Phase 3; go straight to Phase 4 and ship one genuinely citable asset |
| Impressions exist, CTR <1% on positions 8–20 | Metadata/ intent mismatch | Title + description rewrite on the impression winners only |
| Indexing stalls below 16/16 | Technical block | URL Inspection per URL; check `X-Robots-Tag`, canonicals, discovery |
| CWV fails after JS split | Something else is heavy | Profile before assuming; report measured numbers, not inferences |
| Any week slips | — | Cut order: Phase 3 items 9–10 → readability (5) → timeline (7). **Never cut measurement or the post-change crawl.** |

---

## Definition of done at day 90

- Health score **≥85** (from 77.4), with Performance and Images re-scored from *measured* data.
- GSC: **16/16 indexed**, non-zero impressions on the tool query class, first clicks.
- CWV: LCP ≤2.5 s, **INP** ≤200 ms, CLS ≤0.1 on `/`.
- ≥1 referring domain visible in GSC Links or Common Crawl.
- ≥4 new cluster URLs, each ≥800 words, physician-reviewed, citation-backed, no cannibalization conflicts.
- Schema: 0 validation errors sitewide; 1 `@id`-keyed `Organization`; single `Physician` node.

---

*Built by **agricidaniel** — community deliverable. Grounded in `FULL-AUDIT-REPORT.md` and `preemie.vercel.app-audit/findings/`; no metric in this plan was invented where an evidence tier was unavailable.*
