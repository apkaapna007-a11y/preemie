import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";
import { MILESTONES } from "@/lib/milestones";

export const Route = createFileRoute("/premature-baby-milestones")({
  head: () => ({
    meta: [
      { title: "Preemie Milestones by Corrected Age | AdjustedAge" },
      {
        name: "description",
        content:
          "A premature baby milestones chart indexed to corrected age, from 2 to 36 months. CDC/AAP surveillance prompts, reviewed by Dr. Zeeshan Islam, MBBS, MCPS.",
      },
      { property: "og:title", content: "Preemie Milestones by Corrected Age | AdjustedAge" },
      {
        property: "og:description",
        content:
          "A premature baby milestones chart indexed to corrected age, from 2 to 36 months. CDC/AAP surveillance prompts, reviewed by Dr. Zeeshan Islam, MBBS, MCPS.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/premature-baby-milestones" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/favicon.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Preemie Milestones by Corrected Age | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "A premature baby milestones chart indexed to corrected age, from 2 to 36 months. CDC/AAP surveillance prompts, reviewed by Dr. Zeeshan Islam, MBBS, MCPS.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/favicon.png" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-14T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/premature-baby-milestones" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Premature Baby Milestones by Corrected Age",
          description:
            "CDC/AAP developmental milestones chart re-indexed to corrected age for premature babies, from 2 to 36 months.",
          url: "https://preemie.vercel.app/premature-baby-milestones",
          datePublished: "2026-08-11",
          dateModified: "2026-08-14",
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          publisher: {
            "@type": "Organization",
            name: "AdjustedAge",
            logo: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/favicon.png",
            },
          },
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
              name: "Premature Baby Milestones",
              item: "https://preemie.vercel.app/premature-baby-milestones",
            },
          ],
        }),
      },
    ],
  }),
  component: MilestonesPage,
});

function MilestonesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Milestone chart"
        title="Premature baby milestones, by corrected age"
        intro="Standard milestone charts are indexed to the birthday. For a baby born at 29 weeks, that is the wrong column for the first two to three years. Here is the same CDC/AAP list, re-indexed."
      />

      <Article>
        <p>
          Use <Link to="/">the corrected age calculator</Link> first, then read the row that matches
          the corrected number. A 9-month-old born at 28 weeks is a 6-month-old corrected, and 6
          months is the row you should be reading.
        </p>
        <p>
          These are <strong>surveillance prompts</strong>, taken from the 2022 CDC/AAP revised
          milestone checklists — the behaviours about 75% of children show by that age. They are not
          a developmental screen and they do not produce a score. Their purpose is to give you
          specific things to raise at the next visit.
        </p>
      </Article>

      <div className="mx-auto max-w-3xl space-y-6 px-5 pb-4">
        {MILESTONES.map((set) => (
          <section
            key={set.month}
            className="rounded-2xl border border-border bg-card p-5 shadow-paper"
          >
            <h2 className="font-display text-lg font-semibold">{set.label}</h2>
            <ul className="mt-3 space-y-2">
              {set.items.map((item) => (
                <li key={item.text} className="text-sm">
                  <span className="mr-2 rounded bg-accent px-1.5 py-0.5 text-[0.7rem] text-accent-foreground">
                    {item.domain}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

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
      </Article>
    </SiteLayout>
  );
}
