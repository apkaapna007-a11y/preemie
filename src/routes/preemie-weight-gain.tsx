import { createFileRoute, Link } from "@tanstack/react-router";
import { WeightVelocityTool } from "@/components/WeightVelocityTool";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/preemie-weight-gain")({
  head: () => ({
    meta: [
      { title: "Preemie Weight Gain Calculator (g/day & g/kg/day) | AdjustedAge" },
      {
        name: "description",
        content:
          "Calculate preemie weight gain between two dates in grams per day and grams per kilogram per day. Built for NICU follow-up and reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Preemie Weight Gain Calculator (g/day & g/kg/day) | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Calculate preemie weight gain between two dates in grams per day and grams per kilogram per day. Built for NICU follow-up and reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/preemie-weight-gain" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-weight-gain.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Preemie Weight Gain Calculator (g/day & g/kg/day) | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Calculate preemie weight gain between two dates in grams per day and grams per kilogram per day. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-weight-gain.png" },
      { name: "twitter:image:alt", content: "Preemie weight gain calculator" },
      { property: "og:image:alt", content: "Preemie weight gain calculator" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/preemie-weight-gain" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Preemie Weight Gain Calculator",
          description:
            "Preemie weight gain and weight velocity calculator using two dates and two weights.",
          url: "https://preemie.vercel.app/preemie-weight-gain",
          datePublished: "2026-08-26",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians following preterm infants",
          },
          author: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          reviewedBy: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          publisher: {
            "@type": "Organization",
            name: "AdjustedAge",
            logo: { "@type": "ImageObject", url: "https://preemie.vercel.app/favicon.png" },
          },
          specialty: "Pediatrics",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AdjustedAge Preemie Weight Gain Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Any",
          url: "https://preemie.vercel.app/preemie-weight-gain",
          image: "https://preemie.vercel.app/og/og-weight-gain.png",
          description:
            "Free preemie weight gain calculator for grams per day and grams per kilogram per day in NICU follow-up.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          creator: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          reviewer: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          inLanguage: "en",
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
              name: "How do you calculate preemie weight gain?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Subtract the earlier weight from the later weight, divide by the number of days for grams per day, and divide by average weight for grams per kilogram per day.",
              },
            },
            {
              "@type": "Question",
              name: "Is grams per day enough on its own?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not always. Clinicians also interpret corrected age or PMA, feeding pattern, illness, hydration and the full growth trend rather than a single number alone.",
              },
            },
            {
              "@type": "Question",
              name: "Should I worry about one low weight-gain interval?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "One interval can be affected by feeding changes, illness or measurement differences. Poor feeding, faltering gain or a falling trend should be discussed with the baby's clinician.",
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
              name: "Preemie Weight Gain",
              item: "https://preemie.vercel.app/preemie-weight-gain",
            },
          ],
        }),
      },
    ],
  }),
  component: PreemieWeightGainPage,
});

function PreemieWeightGainPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Preemie weight gain" }]} />

      <PageHeader
        eyebrow="Growth follow-up"
        title="Preemie weight gain calculator"
        intro="Weight gain is one of the biggest sources of NICU-parent anxiety. This page calculates the average gain between two weights, in grams per day and grams per kilogram per day, then explains how clinicians usually interpret that number in context."
      />

      <div className="mx-auto mt-10 max-w-4xl px-5">
        <WeightVelocityTool />
      </div>

      <KeyTakeaways
        items={[
          "This page calculates both grams per day and grams per kilogram per day.",
          "Trend matters more than one isolated weight check.",
          "Corrected age or PMA, feeding, illness and hydration still matter when interpreting the result.",
          "Poor feeding, choking, crossing down growth centiles or persistent low gain should be discussed with your paediatrician.",
        ]}
      />

      <Article>
        <h2>Why preemie weight gain is tracked differently</h2>
        <p>
          A premature baby does not grow like a term-born child of the same birthday, especially in
          the earlier months. That is why neonatal teams often discuss{" "}
          <strong>weight velocity</strong>
          rather than one single weight value. Looking at gain over time is more informative than
          staring at one number in isolation.
        </p>
        <p>
          This page calculates two common ways to describe gain: <strong>grams per day</strong> and
          <strong> grams per kilogram per day</strong>. The second method adjusts the gain to the
          baby&apos;s average body weight over the interval and is often used in NICU and high-risk
          infant follow-up.
        </p>

        <h2>How this calculator works</h2>
        <p>
          Enter a previous weight and date, then a current weight and date. The tool calculates the
          total gain in grams, divides it by the number of days for grams per day, and also reports
          grams per kilogram per day using the average-weight method.
        </p>
        <p>
          If you also need the baby&apos;s developmental age context, use the{" "}
          <Link to="/pma-calculator">PMA calculator</Link> or the{" "}
          <Link to="/">main corrected age calculator</Link> alongside this page.
        </p>
        <p>
          If you are organising weights around clinic checkpoints, the{" "}
          <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link> shows the common
          corrected-age visits where these numbers often come up.
        </p>

        <h2>What parents should not do with weight-gain numbers</h2>
        <ul>
          <li>
            Do not compare one baby&apos;s velocity directly with another baby&apos;s without
            context.
          </li>
          <li>
            Do not ignore feeding difficulty just because a recent interval looked acceptable.
          </li>
          <li>
            Do not assume one slow week means a diagnosis, or one good week means everything is
            fine.
          </li>
          <li>Do not change feeding plans without your own baby&apos;s clinical team.</li>
        </ul>

        <h2>When poor weight gain matters urgently</h2>
        <p>
          Low gain becomes more concerning when it comes with{" "}
          <strong>
            poor feeding, vomiting, choking, unusual sleepiness, fewer wet nappies, or a downward
            growth trend
          </strong>
          . Those are not &ldquo;calculator problems&rdquo; — they are reasons to call your
          paediatrician.
        </p>
        <p>
          If growth concern is part of a wider worry, review the{" "}
          <Link to="/red-flags">preemie red flags</Link> page as well.
        </p>

        <h2>Use this with corrected age and PMA</h2>
        <p>
          Growth discussion is easier when the age framework is correct. Use{" "}
          <Link to="/pma-calculator">PMA</Link>
          in the earliest period, <Link to="/">corrected age</Link> after the due date, and the
          <Link to="/premature-baby-milestones">milestone chart</Link> for development. The numbers
          belong together, not in separate conversations.
        </p>
        <p>
          Late preterm babies can still need this kind of closer review when feeding stamina is the
          issue — see the <Link to="/late-preterm-baby">late preterm baby guide</Link>. If milk
          feeds are established and your next question is weaning, read{" "}
          <Link to="/when-can-my-preemie-start-solids">when a preemie may be ready for solids</Link>
          .
        </p>
      </Article>

      <LinkGridSection
        title="Related growth and follow-up pages"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description: "Get corrected age, PMA and serial visit tracking in the main tool.",
          },
          {
            to: "/pma-calculator",
            label: "PMA calculator",
            description: "Check postmenstrual age for early follow-up and preterm clinical notes.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "Match interval weight checks to the corrected-age clinic timeline.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "See why feeding stamina and early gain can still matter at 35 or 36 weeks.",
          },
          {
            to: "/when-can-my-preemie-start-solids",
            label: "When can my preemie start solids?",
            description: "Use this when growth questions turn into feeding-readiness questions.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Use corrected age when reading milestone expectations alongside growth.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Know when poor feeding or faltering growth should trigger a call today.",
          },
          {
            to: "/methodology",
            label: "Methodology and references",
            description: "See how the growth and age calculations are defined on the site.",
          },
        ]}
      />
    </SiteLayout>
  );
}
