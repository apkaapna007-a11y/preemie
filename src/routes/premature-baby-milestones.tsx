import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Printer } from "lucide-react";
import {
  Article,
  Breadcrumbs,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";
import { DOMAINS, MILESTONES, milestonesToCsv } from "@/lib/milestones";

export const Route = createFileRoute("/premature-baby-milestones")({
  head: () => ({
    meta: [
      { title: "Premature Baby Milestones Chart, Corrected Age | AdjustedAge" },
      {
        name: "description",
        content:
          "Printable premature baby milestones chart by corrected age, 2 to 36 months, using CDC/AAP surveillance prompts. Free to print, reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Premature Baby Milestones Chart, Corrected Age | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Printable premature baby milestones chart by corrected age, 2 to 36 months, using CDC/AAP surveillance prompts. Free to print, reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/premature-baby-milestones" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-milestones.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Premature Baby Milestones Chart, Corrected Age | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Printable premature baby milestones chart by corrected age, 2 to 36 months, using CDC/AAP surveillance prompts. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-milestones.png" },
      { name: "twitter:image:alt", content: "Premature baby milestones chart by corrected age" },
      { property: "og:image:alt", content: "Premature baby milestones chart by corrected age" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/premature-baby-milestones" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Premature Baby Milestones Chart by Corrected Age",
          description:
            "Printable CDC/AAP developmental milestones chart re-indexed to corrected age for premature babies, from 2 to 36 months.",
          url: "https://preemie.vercel.app/premature-baby-milestones",
          image: {
            "@type": "ImageObject",
            url: "https://preemie.vercel.app/og/og-milestones.png",
            width: 1200,
            height: 630,
          },
          datePublished: "2026-08-11",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          citation: [
            {
              "@type": "WebPage",
              name: "Learn the Signs. Act Early. - CDC developmental milestones",
              url: "https://www.cdc.gov/actearly/",
            },
            {
              "@type": "WebPage",
              name: "The 2022 CDC/AAP Revised Developmental Milestones - Pediatrics",
              url: "https://doi.org/10.1542/peds.2021-052138",
            },
          ],
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of preterm infants",
          },
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          reviewedBy: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          publisher: { "@id": "https://preemie.vercel.app/#organization" },
          specialty: "Pediatric",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Premature Baby Milestones Chart by Corrected Age",
          description:
            "Printable CDC/AAP developmental milestones chart re-indexed to corrected age for premature babies, from 2 to 36 months.",
          url: "https://preemie.vercel.app/premature-baby-milestones",
          image: {
            "@type": "ImageObject",
            url: "https://preemie.vercel.app/og/og-milestones.png",
            width: 1200,
            height: 630,
          },
          datePublished: "2026-08-11",
          dateModified: "2026-08-27",
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          publisher: { "@id": "https://preemie.vercel.app/#organization" },
          citation: [
            {
              "@type": "WebPage",
              name: "Learn the Signs. Act Early. - CDC developmental milestones",
              url: "https://www.cdc.gov/actearly/",
            },
            {
              "@type": "WebPage",
              name: "The 2022 CDC/AAP Revised Developmental Milestones - Pediatrics",
              url: "https://doi.org/10.1542/peds.2021-052138",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Should premature baby milestones use corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For early developmental conversations, use the milestone row that matches corrected age rather than birthday age. The appropriate approach can vary by child and domain, so discuss concerns with the child’s clinician.",
              },
            },
            {
              "@type": "Question",
              name: "Are these premature baby milestones a developmental screen?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. These CDC/AAP surveillance prompts are conversation guides and do not diagnose, screen, score, or replace assessment by a clinician.",
              },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://preemie.vercel.app/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Premature baby milestones chart",
              item: "https://preemie.vercel.app/premature-baby-milestones",
            },
          ],
        }),
      },
    ],
  }),
  component: MilestonesPage,
});

/** Client-side CSV download of the chart data — no server call, no new dependency. */
function downloadMilestonesCsv() {
  const blob = new Blob([milestonesToCsv()], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "premature-baby-milestones-corrected-age.csv";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function MilestonesPage() {
  return (
    <SiteLayout>
      <Breadcrumbs
        items={[{ to: "/", label: "Home" }, { label: "Premature baby milestones chart" }]}
      />
      <PageHeader
        eyebrow="Printable milestone chart"
        title="Premature baby milestones chart, by corrected age"
        intro="Standard milestone charts are indexed to the birthday. For a baby born at 29 weeks, that is the wrong column for the first two to three years. Here is the same CDC/AAP list, re-indexed — and it prints cleanly for the fridge or the next clinic visit."
      />

      <div className="no-print mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-5">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-paper transition-opacity hover:opacity-90"
        >
          <Printer className="size-4" aria-hidden />
          Print this chart
        </button>
        <button
          type="button"
          onClick={downloadMilestonesCsv}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-paper transition-colors hover:bg-surface"
        >
          <Download className="size-4" aria-hidden />
          Download as CSV
        </button>
      </div>

      <Article>
        <p>
          Use <Link to="/">the corrected age calculator</Link> first, then read the row that matches
          the corrected number. A 9-month-old born at 28 weeks is a 6-month-old corrected, and 6
          months is the row you should be reading.
        </p>
        <p>
          If you want to check the arithmetic first, follow the{" "}
          <Link to="/how-to-calculate-corrected-age">corrected-age worked examples</Link>. For the
          source list and limitations, see <Link to="/methodology">the methodology page</Link>.
        </p>
        <p>
          This is especially important for babies born only a few weeks early. The{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link> explains why a 35- or 36-week
          baby can still shift rows in the first year, and the{" "}
          <Link to="/adjusted-age-vs-chronological-age">
            adjusted age vs chronological age guide
          </Link>
          shows when milestones use one age while vaccines use another.
        </p>
        <p>
          These are <strong>surveillance prompts</strong>, taken from the{" "}
          <a
            href="https://www.cdc.gov/actearly/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            CDC&apos;s developmental milestone lists
          </a>{" "}
          — the behaviours about 75% of children show by that age. That milestone set was itself
          rebuilt from an evidence review published in{" "}
          <a
            href="https://doi.org/10.1542/peds.2021-052138"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Pediatrics in 2022
          </a>
          . They are not a developmental screen and they do not produce a score. Their purpose is to
          give you specific things to raise at the next visit.
        </p>
      </Article>

      <section className="mx-auto max-w-5xl px-5 pb-4" aria-labelledby="milestone-chart-title">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-paper">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="milestone-chart-title" className="font-display text-lg font-semibold">
                Milestones by corrected age, 2 to 36 months
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Find the corrected age in the left column, then read across the four domains.
              </p>
            </div>
            <p className="text-xs text-muted-foreground sm:hidden">
              Scroll sideways to see every column.
            </p>
          </div>

          <div
            role="region"
            aria-label="Milestone chart by corrected age"
            tabIndex={0}
            className="mt-4 overflow-x-auto print:overflow-visible"
          >
            <table className="w-full min-w-[52rem] border-collapse text-left text-sm print:min-w-0">
              <caption className="sr-only">
                Developmental surveillance prompts by corrected age, 2 to 36 months, one column per
                domain: Social/Emotional, Language, Cognitive and Movement.
              </caption>
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground print:border-black/20">
                  <th scope="col" className="w-40 py-2 pr-4 align-bottom">
                    Corrected age
                  </th>
                  {DOMAINS.map((domain) => (
                    <th key={domain} scope="col" className="py-2 pr-4 align-bottom">
                      {domain}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MILESTONES.map((set) => (
                  <tr
                    key={set.month}
                    className="border-b border-border align-top last:border-b-0 print:border-black/20 print:break-inside-avoid"
                  >
                    <th
                      scope="row"
                      className="w-40 whitespace-nowrap py-3 pr-4 font-display text-sm font-semibold text-foreground"
                    >
                      {set.label}
                    </th>
                    {DOMAINS.map((domain) => (
                      <td key={domain} className="py-3 pr-4">
                        <ul className="space-y-1.5">
                          {set.items
                            .filter((item) => item.domain === domain)
                            .map((item) => (
                              <li key={item.text} className="flex gap-2 leading-relaxed">
                                <span
                                  className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                                  aria-hidden
                                />
                                <span>{item.text}</span>
                              </li>
                            ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Article>
        <h2>Preemies do not catch up on a schedule</h2>
        <p>
          Catch-up is uneven by design. Head growth usually recovers first, then weight, then
          length. Gross motor skills often lag the longest in babies who spent weeks on respiratory
          support, and language can look delayed until hearing is confirmed. A baby who is behind in
          one domain and on track in three is a very different situation from a baby who is behind
          in all four — and that distinction is what your paediatrician is for.
        </p>
        <p>
          What is never normal, at any age, corrected or not, is <strong>losing a skill</strong> the
          baby previously had. See <Link to="/red-flags">when to call the doctor</Link>.
        </p>
        <p>
          Feeding skills follow the same corrected-age logic. If parents are asking whether interest
          in food means it is time to start weaning, read{" "}
          <Link to="/when-can-my-preemie-start-solids">when a preemie can start solids</Link>.
        </p>
        <p>
          These lists are conversation prompts, not a diagnosis or developmental screen. Read{" "}
          <Link to="/when-to-stop-correcting">when corrected-age use usually stops</Link> and speak
          with your child’s clinician if you are concerned.
        </p>
      </Article>

      <LinkGridSection
        title="Use the chart with the rest of the follow-up toolkit"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "Calculate the corrected age first so you know which milestone row applies.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description:
              "Use the same calculation if your clinic uses the term adjusted age instead.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "See why milestones, vaccines and PMA do not all use the same age.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "Useful when a baby was only a few weeks early but the milestone row still shifts.",
          },
          {
            to: "/when-can-my-preemie-start-solids",
            label: "When can my preemie start solids?",
            description: "Apply milestone readiness thinking to complementary feeding questions.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description: "Check the formula manually with worked examples.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description: "Understand when milestone correction usually tapers off.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description:
              "Know which concerns should trigger a call regardless of milestone timing.",
          },
        ]}
      />
    </SiteLayout>
  );
}
