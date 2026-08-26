import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/how-to-calculate-corrected-age")({
  head: () => ({
    meta: [
      { title: "How to Calculate Corrected Age for a Premature Baby | AdjustedAge" },
      {
        name: "description",
        content:
          "Learn how to calculate corrected age for a premature baby using gestational age, chronological age and three worked examples. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "How to Calculate Corrected Age for a Premature Baby | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Learn how to calculate corrected age for a premature baby using gestational age, chronological age and three worked examples. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/how-to-calculate-corrected-age" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "How to Calculate Corrected Age for a Premature Baby | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Learn how to calculate corrected age for a premature baby using gestational age, chronological age and three worked examples. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { name: "twitter:image:alt", content: "Corrected age formula for premature babies" },
      { property: "og:image:alt", content: "Corrected age formula for premature babies" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
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
          dateModified: "2026-08-27",
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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Do you correct a premature baby’s vaccine schedule?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Immunisations are scheduled by chronological age. Corrected age is used for many developmental conversations, not to delay vaccines.",
              },
            },
            {
              "@type": "Question",
              name: "What if corrected age is negative?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Before the original due date, corrected age can be below zero. The tool displays that value and also shows postmenstrual age.",
              },
            },
            {
              "@type": "Question",
              name: "When should corrected-age calculations stop?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Developmental correction is commonly used until about 24 months, with domain-specific variation.",
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
              name: "How to Calculate Corrected Age",
              item: "https://preemie.vercel.app/how-to-calculate-corrected-age",
            },
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
      <Breadcrumbs
        items={[{ to: "/", label: "Home" }, { label: "How to calculate corrected age" }]}
      />
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
          <li>
            Prematurity: 280 − (28 × 7) = 280 − 196 = <strong>84 days (12 weeks)</strong>
          </li>
          <li>Chronological age: 6 months = about 183 days</li>
          <li>
            Corrected age: 183 − 84 = 99 days = <strong>about 3 months 8 days</strong>
          </li>
        </ul>
        <p>
          This baby's first birthday cake is six months away, but developmentally you should be
          reading the 4-month milestone row soon, not the 6-month row.
        </p>

        <h3>Worked example 2 — 34+3 weeks, now 10 weeks old</h3>
        <ul>
          <li>GA in days: (34 × 7) + 3 = 241</li>
          <li>
            Prematurity: 280 − 241 = <strong>39 days</strong>
          </li>
          <li>Chronological: 70 days</li>
          <li>
            Corrected: 70 − 39 = <strong>31 days, about 4½ weeks</strong>
          </li>
        </ul>
        <p>
          Late preterm correction is the one most often skipped. At this age it more than halves the
          expected developmental age — which is exactly why the{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link> exists and why{" "}
          <Link to="/when-to-stop-correcting">stopping too early</Link> causes unnecessary
          referrals.
        </p>

        <h3>Worked example 3 — 25 weeks, still before the due date</h3>
        <ul>
          <li>
            Prematurity: 280 − 175 = <strong>105 days</strong>
          </li>
          <li>Chronological: 60 days</li>
          <li>
            Corrected: 60 − 105 = <strong>−45 days</strong>, i.e. 6 weeks 3 days before term
          </li>
          <li>
            Postmenstrual age: 25 weeks + 60 days = <strong>33+4 weeks PMA</strong>
          </li>
        </ul>
        <p>
          Before term-equivalent age, corrected age is negative and PMA is the number clinicians
          actually use. The tool shows both.
        </p>

        <h2>Common questions about corrected age</h2>
        <h3>Do you correct a premature baby’s vaccine schedule?</h3>
        <p>
          No. Immunisations are scheduled by chronological age. Corrected age is used for many
          developmental conversations, not to delay vaccines.
        </p>
        <h3>What if corrected age is negative?</h3>
        <p>
          Before the original due date, corrected age can be below zero. The tool displays that
          value and also shows postmenstrual age, which is the clinically useful age before
          term-equivalent age.
        </p>
        <h3>When should corrected-age calculations stop?</h3>
        <p>
          Developmental correction is commonly used until about 24 months, with domain-specific
          variation. See <Link to="/when-to-stop-correcting">when to stop correcting</Link> for the
          full explanation.
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

        <h2>Related preterm follow-up guides</h2>
        <p>
          Use the <Link to="/">corrected age calculator</Link> for a date-specific result, compare{" "}
          <Link to="/adjusted-age-vs-chronological-age">adjusted age vs chronological age</Link>,
          review a typical <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link>, read
          the <Link to="/late-preterm-baby">late preterm baby guide</Link>, review{" "}
          <Link to="/red-flags">red flags</Link>, or inspect the{" "}
          <Link to="/methodology">methodology and sources</Link>.
        </p>
      </Article>

      <LinkGridSection
        title="Continue with the calculator and follow-up pages"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "Run the dates through the calculator and keep the follow-up record locally.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description:
              "Same calculation, explained using the adjusted-age terminology many parents search for.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "See the most common age labels separated clearly on one page.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description: "Use this when a 34- to 36-week baby seems only slightly early on paper.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "See how corrected age gets used across common clinic checkpoints.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "See the printable milestone rows matched to corrected age.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description: "Understand when 24 months applies and where the exceptions sit.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Know what should trigger a same-day or same-week call.",
          },
        ]}
      />
    </SiteLayout>
  );
}
