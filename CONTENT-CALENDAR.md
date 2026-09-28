# Content Calendar — 7 days

Physician review is a hard gate: every item below ships only after Dr. Zeeshan Islam signs off. Batch reviews to one evening session (day 4) to avoid serialising the week.

**Rule for the week:** no new URLs. The site has 16 pages and 7 of them are thin — depth beats expansion inside a 7-day horizon.

---

## Day-by-day

| Day | Content work | Page(s) | Output | Review |
|---|---|---|---|---|
| **Mon** | — (measurement day, no copy) | — | GSC/Bing baseline | — |
| **Tue** | Primary-source citation pass: link CDC, AAP, WHO, Fenton, INTERGROWTH, PMC12221983, Zubler 2022; JSON-LD `citation` | all 16 | 12+ pages with outbound sources | Batch review #1 (Tue pm) |
| **Tue** | Add contact channel + dated corrections log | `/about` | Trust/E-E-A-T block | with review #1 |
| **Wed** | Rebuild milestones as a real table by corrected-age bucket + CSV/print export | `/premature-baby-milestones` | Artifact page | Batch review #1 |
| **Thu** | Thin-page expansion — source-backed, worked examples, no filler | `/red-flags` (166 prose words), `/how-to-calculate-corrected-age` (559), `/nicu-follow-up-schedule` (585) | +300–500 words each, genuinely new information | Batch review #2 (Thu pm) |
| **Thu** | Evidence-led update: correction through **36 months** per PMC12221983 + Nature 2024 vs the conventional 24 months | `/when-to-stop-correcting` | **Information-gain page** — the one page likely to earn citations | with review #2 |
| **Fri** | Metadata rewrites: 7 titles ≤60ch, 8 descriptions ≤160ch, restore brand suffix | all 16 | SERP-ready metadata | no clinical review needed |
| **Fri** | llms.txt regeneration with absolute markdown links | sitewide file | 16 extractable URLs | — |
| **Sat** | No copy — performance day | — | — | — |
| **Sun** | Verify + GSC URL inspection + request indexing on 3 key pages | `/`, `/adjusted-age-calculator`, `/premature-baby-milestones` | Indexing requests | — |

---

## Sequenced topics (why this order)

1. **Citations first (Tue)** — they change the *credibility* of copy already on the page, so later edits inherit the improvement rather than re-touching pages twice.
2. **Chart artifact (Wed)** — format/query mismatch is a ranking blocker, not a writing task.
3. **Depth (Thu)** — `/red-flags` at 166 prose words on a YMYL safety page is the site's biggest content liability.
4. **Information gain (Thu)** — `/when-to-stop-correcting` gets the primary-evidence treatment (24 vs 36 months disagreement). This is the only page in the set where we can say something the top results don't.
5. **Metadata last (Fri)** — titles/descriptions describe finished pages, so write them after the pages stop changing.

## Cannibalization guardrails (enforced during edits)

| Query cluster | Canonical page | Pages that must *trim, not delete* |
|---|---|---|
| Corrected/adjusted age calculator (overlap 0.64) | `/` | `/adjusted-age-calculator` keeps its differentiator section only |
| PMA calculator (overlap 0.64) | `/pma-calculator` | `/` links out, does not re-explain PMA at length |
| Age-comparison wording (4 pages, 0.49–0.55) | `/adjusted-age-vs-chronological-age` | `/how-to-calculate-corrected-age`, `/late-preterm-baby`, `/` |
| Vaccine timing (6 pages, 0.52) | `/preemie-vaccines` | others state the answer in one line + link |
| When correction stops (4 pages) | `/when-to-stop-correcting` | others link rather than re-argue |

## Not scheduled this week (Phase 2 queue)

- New pages: twins, discharge checklist, sleep, growth/Fenton chart hub, "how many weeks premature is 35 weeks"
- Homepage FAQ expansion (questions 8–10, still-open from prior audit)
- Corrected-age-for-school-entry page (Raising Children owns it; needs original research or expert Q&A to win)
- Content refresh cadence / newsletter cadence — out of a 7-day horizon

## Quality gates each item must pass

- [ ] Named physician review with visible date on-page
- [ ] Every clinical claim has a linked primary source (no bare authority names)
- [ ] No new page under 800 `<main>` words; no existing page left under 400
- [ ] One canonical URL per query cluster (table above respected)
- [ ] Title ≤60ch, description 150–160ch, brand suffix present
- [ ] Never HowTo schema; FAQPage only as existing (no new ones for SERP gain — Google retired FAQ rich results May 2026)
