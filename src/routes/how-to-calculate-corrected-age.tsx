import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/how-to-calculate-corrected-age")({
  head: () => ({
    meta: [
      { title: "How to Calculate Corrected Age | AdjustedAge" },
      {
        name: "description",
        content:
          "The corrected age formula for premature babies with three worked examples and common mistakes. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:title", content: "How to Calculate Corrected Age | AdjustedAge" },
      {
        property: "og:description",
        content:
          "The corrected age formula for premature babies with three worked examples and common mistakes. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/how-to-calculate-corrected-age" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/favicon.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How to Calculate Corrected Age | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "The corrected age formula for premature babies with three worked examples and common mistakes. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/favicon.png" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-14T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/how-to-calculate-corrected-age" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Calculate Corrected Age for Premature Babies",
          description:
            "The corrected age formula with three worked examples and the common mistakes clinicians and parents make.",
          url: "https://preemie.vercel.app/how-to-calculate-corrected-age",
          datePublished: "2026-08-11",
          dateModified: "2026-08-14",
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          publisher: {
            "@type": "Organization",
            "name": "AdjustedAge",
            "logo": {
              "@type": "ImageObject",
              "url": "https://preemie.vercel.app/favicon.png"
            }
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Calculate Corrected Age",
          description:
            "Corrected age = chronological age minus weeks of prematurity. Three worked examples.",
          totalTime: "PT2M",
          step: [
            {
              "@type": "HowToStep",
              name: "Calculate weeks of prematurity",
              text: "Subtract gestational age at birth from 40 weeks. Example: 40 − 28 = 12 weeks premature.",
            },
            {
              "@type": "HowToStep",
              name: "Subtract from chronological age",
              text: "Corrected age = chronological age − weeks of prematurity. Example: 6 months − 12 weeks = 3 months corrected.",
            },
            {
              "@type": "HowToStep",
              name: "Use corrected age for milestones",
              text: "Read the CDC milestone row matching the corrected age, not the birthday age.",
            },
          ],
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
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
            { "@type": "ListItem", position: 2, name: "How to Calculate Corrected Age", item: "https://preemie.vercel.app/how-to-calculate-corrected-age" },
          ],
        }),
      },
    ],
  }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Worked examples"
        title="How to calculate corrected age"
        intro="The arithmetic in full, so you can check the tool rather than trust it."
      />
      <Article>
        <h2>The formula</h2>
        <p>
          <strong>Weeks of prematurity = 40 weeks − gestational age at birth.</strong>
          <br />
          <strong>Corrected age = chronological age − weeks of prematurity.</strong>
        </p>
        <p>
          Forty weeks means 280 days. Everything is done in days and converted at the end, which
          avoids the rounding errors you get from working in whole months.
        </p>

        <h3>Worked example 1 — 28 weeks, now 6 months old</h3>
        <ul>
          <li>Prematurity: 280 − (28 × 7) = 280 − 196 = <strong>84 days (12 weeks)</strong></li>
          <li>Chronological age: 6 months = about 183 days</li>
          <li>Corrected age: 183 − 84 = 99 days = <strong>about 3 months 8 days</strong></li>
        </ul>
        <p>
          This baby's first birthday cake is six months away, but developmentally you should be
          reading the 4-month milestone row soon, not the 6-month row.
        </p>

        <h3>Worked example 2 — 34+3 weeks, now 10 weeks old</h3>
        <ul>
          <li>GA in days: (34 × 7) + 3 = 241</li>
          <li>Prematurity: 280 − 241 = <strong>39 days</strong></li>
          <li>Chronological: 70 days</li>
          <li>Corrected: 70 − 39 = <strong>31 days, about 4½ weeks</strong></li>
        </ul>
        <p>
          Late preterm correction is the one most often skipped. At this age it more than halves the
          expected developmental age — which is exactly why{" "}
          <Link to="/when-to-stop-correcting">stopping too early</Link> causes unnecessary referrals.
        </p>

        <h3>Worked example 3 — 25 weeks, still before the due date</h3>
        <ul>
          <li>Prematurity: 280 − 175 = <strong>105 days</strong></li>
          <li>Chronological: 60 days</li>
          <li>Corrected: 60 − 105 = <strong>−45 days</strong>, i.e. 6 weeks 3 days before term</li>
          <li>Postmenstrual age: 25 weeks + 60 days = <strong>33+4 weeks PMA</strong></li>
        </ul>
        <p>
          Before term-equivalent age, corrected age is negative and PMA is the number clinicians
          actually use. The tool shows both.
        </p>

        <h2>The mistakes that actually happen</h2>
        <ul>
          <li>
            <strong>Using 9 months instead of 40 weeks.</strong> Nine calendar months is 273–276
            days depending on the months involved. Use 280.
          </li>
          <li>
            <strong>Correcting immunisations.</strong> Vaccines are given by chronological age.
            Correcting delays protection in the most vulnerable infants.
          </li>
          <li>
            <strong>Rounding gestational age down to whole weeks.</strong> 34+6 is nearly a week
            different from 34+0.
          </li>
          <li>
            <strong>Forgetting to recalculate.</strong> The gap in weeks is fixed; the proportion of
            the child's life it represents shrinks every month. That is why it stops mattering.
          </li>
        </ul>
      </Article>
    </SiteLayout>
  );
}
