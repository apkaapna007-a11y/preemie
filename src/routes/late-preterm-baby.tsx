import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/late-preterm-baby")({
  head: () => ({
    meta: [
      { title: "Late Preterm Baby Guide: 34 to 36 Weeks & Corrected Age | AdjustedAge" },
      {
        name: "description",
        content:
          "A late preterm baby guide for 34 to 36 weeks: corrected age, feeding, milestones, common risks and when to call the doctor. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Late Preterm Baby Guide: 34 to 36 Weeks & Corrected Age | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "A late preterm baby guide for 34 to 36 weeks: corrected age, feeding, milestones, common risks and when to call the doctor. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/late-preterm-baby" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-late-preterm.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Late Preterm Baby Guide: 34 to 36 Weeks & Corrected Age | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Corrected age, feeding and milestone guidance for late preterm babies born at 34 to 36 weeks. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-late-preterm.png" },
      { name: "twitter:image:alt", content: "Late preterm baby guide" },
      { property: "og:image:alt", content: "Late preterm baby guide" },
      { name: "article:published_time", content: "2026-08-27T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/late-preterm-baby" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Late Preterm Baby Guide",
          description:
            "Guide for late preterm babies born at 34 to 36 weeks, including corrected age, milestones, feeding concerns and common follow-up issues.",
          url: "https://preemie.vercel.app/late-preterm-baby",
          image: "https://preemie.vercel.app/og/og-late-preterm.png",
          datePublished: "2026-08-27",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of late preterm infants",
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
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is a 36-week baby still premature?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Babies born between 34+0 and 36+6 weeks are considered late preterm.",
              },
            },
            {
              "@type": "Question",
              name: "Does corrected age still matter for a late preterm baby?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Often yes, especially in the first year. Even a two- to six-week difference can change milestone interpretation in a young baby.",
              },
            },
            {
              "@type": "Question",
              name: "What are common late preterm issues after discharge?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Common concerns include sleepiness, feeding difficulty, jaundice, temperature instability and slower early weight gain. The exact risk varies by baby.",
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
              name: "Late Preterm Baby",
              item: "https://preemie.vercel.app/late-preterm-baby",
            },
          ],
        }),
      },
    ],
  }),
  component: LatePretermBabyPage,
});

function LatePretermBabyPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Late preterm baby" }]} />

      <PageHeader
        eyebrow="34+0 to 36+6 weeks"
        title="Late preterm baby guide"
        intro="Late preterm babies are often treated as almost-term, but they are not simply smaller full-term newborns. This guide explains corrected age, common early issues, and why a 35- or 36-week baby can still need age correction in follow-up."
      />

      <KeyTakeaways
        items={[
          "A late preterm baby is born between 34+0 and 36+6 weeks.",
          "Corrected age often still matters in the first year, even when the baby was only a few weeks early.",
          "Feeding, jaundice, sleepiness, temperature instability and slow early weight gain are common late-preterm concerns.",
          "If you are worried about feeding, breathing, colour, hydration or unusual sleepiness, call your clinician rather than waiting for the next routine visit.",
        ]}
      />

      <Article>
        <h2>What late preterm means</h2>
        <p>
          A <strong>late preterm baby</strong> is born between 34 weeks 0 days and 36 weeks 6 days.
          The label can sound mild, and many late preterm babies go home quickly, but they still
          have important differences from a baby born at 39 or 40 weeks.
        </p>
        <p>
          In the first days and weeks, even a short gap in maturity can affect feeding stamina,
          jaundice risk, sleepiness, temperature control and early weight gain. Later on, that same
          gap can affect which milestone row should be used in a developmental conversation.
        </p>

        <h2>Why corrected age still matters for a 35- or 36-week baby</h2>
        <p>
          Parents are often told, implicitly or explicitly, that corrected age only matters for very
          early babies. That is not true. For a four-month-old born five weeks early, those five
          weeks are a large fraction of the baby&apos;s post-term life. The difference is big enough
          to change which milestone row you should read.
        </p>
        <p>
          Use the <Link to="/">corrected age calculator</Link> or the{" "}
          <Link to="/adjusted-age-calculator">adjusted age calculator</Link> if your clinic prefers
          that term.
        </p>

        <h2>Common late preterm concerns after discharge</h2>
        <ul>
          <li>
            <strong>Feeding fatigue:</strong> some babies tire before they take enough milk.
          </li>
          <li>
            <strong>Jaundice:</strong> yellowing may peak after discharge and needs attention if it
            is worsening or the baby is sleepy and feeding poorly.
          </li>
          <li>
            <strong>Temperature instability:</strong> smaller babies lose heat more easily.
          </li>
          <li>
            <strong>Weight gain worries:</strong> a baby who seems settled may still not be taking
            enough to gain well.
          </li>
          <li>
            <strong>Mixed expectations:</strong> friends and family compare the baby to a full-term
            newborn of the same birthday, which can create avoidable panic.
          </li>
        </ul>

        <h2>Milestones in late preterm babies</h2>
        <p>
          Many late preterm babies do very well, but milestone timing in the first year should still
          be interpreted fairly. Use corrected age with the{" "}
          <Link to="/premature-baby-milestones">premature baby milestones chart</Link> rather than
          comparing only by birthday age.
        </p>

        <h2>What age should I use for vaccines?</h2>
        <p>
          Vaccines are the big exception. Routine immunisations usually follow{" "}
          <strong>chronological age</strong>, not corrected age. Read the{" "}
          <Link to="/preemie-vaccines">preemie vaccines guide</Link> if that distinction is causing
          confusion.
        </p>

        <h2>When to call the doctor</h2>
        <p>
          A late preterm baby should be reviewed sooner rather than later if they are feeding badly,
          becoming more jaundiced, unusually sleepy, difficult to wake, breathing hard, or not
          gaining weight. These are practical follow-up problems, not internet questions.
        </p>
        <p>
          For the urgent list, go straight to <Link to="/red-flags">preemie red flags</Link>.
        </p>
      </Article>

      <LinkGridSection
        title="Useful pages for late-preterm follow-up"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "Check the corrected age first before judging milestones or follow-up timing.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description: "See which age to use for milestones, vaccines and everyday counting.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Use corrected age to read the right row for a late preterm baby.",
          },
          {
            to: "/preemie-weight-gain",
            label: "Preemie weight gain calculator",
            description: "Track interval weight gain when feeding and growth are the main concern.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description: "See the common corrected-age checkpoints used in follow-up programmes.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Know when a concern should trigger a same-day or same-week call.",
          },
        ]}
      />
    </SiteLayout>
  );
}
