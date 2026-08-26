import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

const COMPARISON = [
  {
    situation: "Milestones and early development",
    age: "Adjusted or corrected age",
    why: "This is the fairer age for comparing a preterm baby to developmental expectations.",
  },
  {
    situation: "Routine vaccines",
    age: "Chronological age",
    why: "Routine immunisations usually follow time since birth, not the due-date age.",
  },
  {
    situation: "Everyday birthday counting",
    age: "Chronological age",
    why: "The calendar age is still the real age since birth.",
  },
  {
    situation: "Early NICU and neonatal notes",
    age: "PMA may also be used",
    why: "Postmenstrual age is often the more clinically useful number before the due date.",
  },
  {
    situation: "Growth and preterm follow-up discussions",
    age: "Often adjusted or corrected age",
    why: "The early interpretation is usually linked to due-date maturity rather than birthday alone.",
  },
];

export const Route = createFileRoute("/adjusted-age-vs-chronological-age")({
  head: () => ({
    meta: [
      { title: "Adjusted Age vs Chronological Age for Preemies | AdjustedAge" },
      {
        name: "description",
        content:
          "What is the difference between adjusted age and chronological age in a preemie? A clear comparison for milestones, vaccines, PMA and follow-up. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Adjusted Age vs Chronological Age for Preemies | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "What is the difference between adjusted age and chronological age in a preemie? A clear comparison for milestones, vaccines, PMA and follow-up. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:url",
        content: "https://preemie.vercel.app/adjusted-age-vs-chronological-age",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-age-difference.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Adjusted Age vs Chronological Age for Preemies | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "A clear comparison of adjusted age, chronological age and PMA for premature babies. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-age-difference.png" },
      { name: "twitter:image:alt", content: "Adjusted age vs chronological age guide" },
      { property: "og:image:alt", content: "Adjusted age vs chronological age guide" },
      { name: "article:published_time", content: "2026-08-27T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/adjusted-age-vs-chronological-age" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Adjusted Age vs Chronological Age for Preemies",
          description:
            "Guide explaining the difference between adjusted age, corrected age, chronological age and PMA in premature babies.",
          url: "https://preemie.vercel.app/adjusted-age-vs-chronological-age",
          image: "https://preemie.vercel.app/og/og-age-difference.png",
          datePublished: "2026-08-27",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians caring for premature babies",
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
              name: "Is adjusted age the same as corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Adjusted age and corrected age are two names for the same concept in preterm follow-up.",
              },
            },
            {
              "@type": "Question",
              name: "What is chronological age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Chronological age is the real time since birth.",
              },
            },
            {
              "@type": "Question",
              name: "Which age should I use for milestones and vaccines?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Milestones are usually interpreted using adjusted or corrected age in preterm follow-up, while routine vaccines usually follow chronological age.",
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
              name: "Adjusted Age vs Chronological Age",
              item: "https://preemie.vercel.app/adjusted-age-vs-chronological-age",
            },
          ],
        }),
      },
    ],
  }),
  component: AdjustedAgeVsChronologicalAgePage,
});

function AdjustedAgeVsChronologicalAgePage() {
  return (
    <SiteLayout>
      <Breadcrumbs
        items={[{ to: "/", label: "Home" }, { label: "Adjusted age vs chronological age" }]}
      />

      <PageHeader
        eyebrow="One baby, three age frameworks"
        title="Adjusted age vs chronological age"
        intro="This is one of the most common sources of confusion in preterm follow-up. Adjusted age and corrected age mean the same thing. Chronological age means time since birth. PMA is different again. This page explains which age to use, when, and why."
      />

      <KeyTakeaways
        items={[
          "Adjusted age and corrected age are the same concept in premature babies.",
          "Chronological age is the actual time since birth.",
          "Use adjusted or corrected age for many developmental conversations, but chronological age for routine vaccines.",
          "Before the due date and in early neonatal follow-up, PMA may be the most useful number.",
        ]}
      />

      <Article>
        <h2>The simple definitions</h2>
        <p>
          <strong>Chronological age</strong> is the easy one: it is the time since birth.
          <strong>Adjusted age</strong> — also called <strong>corrected age</strong> — subtracts the
          weeks of prematurity so the baby is compared against their due-date maturity instead.
        </p>
        <p>
          <strong>PMA</strong>, or postmenstrual age, is different again. It adds the gestational
          age at birth to the time since birth and is often useful in the earlier NICU and
          post-discharge period.
        </p>

        <h2>Which age should I use?</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="border-b border-border py-2 pr-4">Situation</th>
                <th className="border-b border-border py-2 pr-4">Age to use</th>
                <th className="border-b border-border py-2">Why</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.situation} className="align-top">
                  <td className="border-b border-border py-3 pr-4">{row.situation}</td>
                  <td className="border-b border-border py-3 pr-4 font-medium">{row.age}</td>
                  <td className="border-b border-border py-3">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Why the difference matters</h2>
        <p>
          If you use chronological age for a milestone conversation, a preterm baby may look delayed
          simply because the wrong calendar was used. If you use corrected age for routine vaccines,
          the baby may be left unprotected for longer than necessary. The age framework changes the
          conclusion, which is why mixing them up causes so much confusion.
        </p>

        <h2>What adjusted age actually changes</h2>
        <p>
          Adjusted age mainly changes the interpretation of development and some follow-up growth
          discussions. It does not erase the real time since birth. Both ages are true — they just
          answer different questions.
        </p>
        <p>
          Use the <Link to="/adjusted-age-calculator">adjusted age calculator</Link> if that is the
          wording you searched for, or the <Link to="/pma-calculator">PMA calculator</Link> if you
          are reading an early NICU note.
        </p>

        <h2>Common questions</h2>
        <h3>Is adjusted age the same as corrected age?</h3>
        <p>Yes. They are two names for the same concept in preterm follow-up.</p>
        <h3>What is chronological age?</h3>
        <p>Chronological age is simply the baby&apos;s real age from the day of birth.</p>
        <h3>Which age should I use for milestones?</h3>
        <p>
          For early follow-up, milestones are usually interpreted using adjusted or corrected age.
          Use the <Link to="/premature-baby-milestones">premature baby milestones chart</Link> after
          checking the calculator.
        </p>
        <h3>Which age should I use for vaccines?</h3>
        <p>
          Routine vaccines usually follow chronological age. See{" "}
          <Link to="/preemie-vaccines">preemie vaccines</Link>.
        </p>
      </Article>

      <LinkGridSection
        title="Use the right age on the right page"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description: "Calculate corrected age, chronological age and PMA together.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description: "Same tool for the adjusted-age search phrase and terminology.",
          },
          {
            to: "/pma-calculator",
            label: "PMA calculator",
            description: "Use PMA for early neonatal follow-up and before the due date.",
          },
          {
            to: "/preemie-vaccines",
            label: "Preemie vaccines guide",
            description:
              "See why vaccine timing usually uses chronological age, not corrected age.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Apply adjusted age to the milestone row that fits the baby fairly.",
          },
          {
            to: "/when-can-my-preemie-start-solids",
            label: "When can my preemie start solids?",
            description:
              "A real-life example where corrected age matters but is not the whole decision.",
          },
        ]}
      />
    </SiteLayout>
  );
}
