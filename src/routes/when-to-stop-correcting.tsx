import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

const CORRECTION_DOMAINS = [
  {
    domain: "Developmental milestones and surveillance",
    usualRange: "Often to about 24 months corrected",
    note: "A practical default, but some high-risk follow-up programmes keep motor or language interpretation corrected to 36 months.",
  },
  {
    domain: "Weight and growth follow-up",
    usualRange: "Commonly to about 24 months corrected",
    note: "Interpretation depends on which chart is being used and where the baby is relative to term-equivalent age.",
  },
  {
    domain: "Length and height catch-up",
    usualRange: "Often longer, around 36 to 40 months",
    note: "Linear growth tends to normalise later than head growth or weight in many preterm children.",
  },
  {
    domain: "Head circumference",
    usualRange: "Often to about 18 months corrected",
    note: "Head growth often catches up earlier than length, so correction may stop sooner.",
  },
  {
    domain: "Routine vaccines",
    usualRange: "Never corrected",
    note: "Routine immunisations generally use chronological age because delaying protection is usually the wrong trade-off.",
  },
  {
    domain: "Early NICU and neonatal notes",
    usualRange: "PMA often matters more than corrected age",
    note: "Before the due date and around term-equivalent age, PMA is often the clinically useful framework.",
  },
];

export const Route = createFileRoute("/when-to-stop-correcting")({
  head: () => ({
    meta: [
      { title: "When to Stop Correcting Age for a Preemie | Milestones, Growth & Vaccines" },
      {
        name: "description",
        content:
          "When do you stop correcting age for a preemie? Usually around 24 months for development, but growth, vaccines and late-preterm follow-up use different rules. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "When to Stop Correcting Age for a Preemie | Milestones, Growth & Vaccines",
      },
      {
        property: "og:description",
        content:
          "When do you stop correcting age for a preemie? Usually around 24 months for development, but growth, vaccines and late-preterm follow-up use different rules. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/when-to-stop-correcting" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "When to Stop Correcting Age for a Preemie | Milestones, Growth & Vaccines",
      },
      {
        name: "twitter:description",
        content:
          "When do you stop correcting age for a preemie? Usually around 24 months for development, but growth, vaccines and PMA use different rules. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-guides.png" },
      { name: "twitter:image:alt", content: "When to stop correcting age for a preemie" },
      { property: "og:image:alt", content: "When to stop correcting age for a preemie" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/when-to-stop-correcting" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "When to Stop Correcting Age for a Preemie",
          description:
            "Guide to when corrected age stops mattering in premature babies, with separate explanations for milestones, growth, vaccines, PMA and late-preterm follow-up.",
          url: "https://preemie.vercel.app/when-to-stop-correcting",
          image: "https://preemie.vercel.app/og/og-guides.png",
          datePublished: "2026-08-11",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians following premature babies",
          },
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          reviewedBy: {
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
              name: "Do you always stop correcting a preemie at 2 years?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Two years is the usual developmental convention, not a universal rule. Some domains stop earlier, such as routine vaccines, while some growth or follow-up interpretations may continue longer.",
              },
            },
            {
              "@type": "Question",
              name: "Can growth and milestones stop correcting at different times?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Head circumference, weight, length and development do not all use the same correction endpoint, which is why the question should be what you are correcting for rather than only when to stop.",
              },
            },
            {
              "@type": "Question",
              name: "Do preemie vaccines ever use corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Routine vaccines usually use chronological age, not corrected age.",
              },
            },
            {
              "@type": "Question",
              name: "Does corrected age still matter for a 35- or 36-week baby?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Often yes, especially in the first year. A few weeks can still change milestone interpretation in a young late-preterm baby.",
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
              name: "When to Stop Correcting",
              item: "https://preemie.vercel.app/when-to-stop-correcting",
            },
          ],
        }),
      },
    ],
  }),
  component: StopPage,
});

function StopPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "When to stop correcting" }]} />
      <PageHeader
        eyebrow="A domain-specific question, not one magic cutoff"
        title="When do you stop correcting age for a preemie?"
        intro="The usual answer is 2 years, but that answer is too blunt on its own. Development, growth, vaccines, PMA and late-preterm follow-up do not all use the same stopping point, which is why this page separates them clearly."
      />
      <Article>
        <h2>The short answer</h2>
        <p>
          For many developmental conversations, corrected age is used until about{" "}
          <strong>24 months corrected</strong>. That is the usual answer because, by then, the fixed
          gap caused by prematurity is a much smaller fraction of the child&apos;s life than it was
          in the first year.
        </p>

        <h2>The better question is: correcting what?</h2>
        <p>
          The most common mistake is treating corrected age as if it has one universal expiry date.
          It does not. Different domains use different conventions, and some of them are not really
          about corrected age at all.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="border-b border-border py-2 pr-4">Domain</th>
                <th className="border-b border-border py-2 pr-4">Usual correction range</th>
                <th className="border-b border-border py-2">Why it differs</th>
              </tr>
            </thead>
            <tbody>
              {CORRECTION_DOMAINS.map((row) => (
                <tr key={row.domain} className="align-top">
                  <td className="border-b border-border py-3 pr-4">{row.domain}</td>
                  <td className="border-b border-border py-3 pr-4 font-medium">{row.usualRange}</td>
                  <td className="border-b border-border py-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Why 24 months became the default answer</h2>
        <p>
          The 24-month figure is useful because many developmental follow-up systems are organised
          around that point. It is a practical convention, not a biological event. The brain does
          not flip a switch at 24 months and declare prematurity irrelevant.
        </p>
        <p>
          That is why the site keeps the wording careful. Saying “correct to 2 years” is often good
          shorthand, but it becomes misleading if someone applies it to vaccines, length catch-up,
          or a baby still being followed in a high-risk clinic at 36 months.
        </p>

        <h2>When 24 months is too blunt</h2>
        <p>
          A very preterm child with ongoing motor, feeding or language concerns may still be
          followed with corrected-age thinking beyond 24 months in specialist services. On the other
          hand, routine vaccines were never supposed to wait for corrected age in the first place.
        </p>
        <p>
          If your question is about a current clinic plan rather than a general rule, the{" "}
          <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link> gives a more concrete
          picture of how corrected-age checkpoints are used in real follow-up.
        </p>

        <h2>Late preterm babies often get dropped too early</h2>
        <p>
          A baby born at 35 weeks is “only” five weeks early, which is exactly why correction is so
          often abandoned too soon. But at a four-month visit those five weeks are still a large
          chunk of the child&apos;s post-term life. In the first year, that difference can still
          change which milestone row is fair.
        </p>
        <p>
          Use the <Link to="/how-to-calculate-corrected-age">worked late-preterm example</Link> and
          the <Link to="/late-preterm-baby">late preterm baby guide</Link> if your child was born
          only a few weeks early but development conversations already feel confusing.
        </p>

        <h2>Stopping correction is not the same as expecting catch-up</h2>
        <p>
          A child who is still behind at 24 months corrected has not failed a deadline. They have a
          finding that deserves assessment on its own terms rather than being explained away by
          prematurity forever.
        </p>
        <p>
          The opposite mistake also happens: parents are told not to worry because the child was a
          preemie, even when the concern has outlasted the range where correction is doing much
          work. If concern is persistent or a skill has been lost, go to the{" "}
          <Link to="/red-flags">red flags page</Link> and discuss it directly with your clinician.
        </p>

        <h2>What this page should change in practice</h2>
        <ul>
          <li>
            Ask which domain is being corrected: milestones, growth, vaccines, PMA or something
            else.
          </li>
          <li>Do not let corrected age delay routine immunisations.</li>
          <li>Do not assume a late-preterm baby can skip correction immediately.</li>
          <li>Do not use “still a preemie” forever to explain persistent developmental concern.</li>
        </ul>
      </Article>

      <LinkGridSection
        title="Related pages for this decision point"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "Work out the current corrected age before deciding whether correction still changes the interpretation.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description:
              "See which age belongs to milestones, vaccines, PMA and everyday follow-up.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description: "See the arithmetic and late-preterm worked examples in full.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "Useful when correction feels small on paper but still changes interpretation.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description:
              "See how corrected-age thinking continues across common clinic checkpoints.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description:
              "Read the milestone row that matches the corrected age while correction still applies.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description:
              "Know when concern should prompt action regardless of the calendar convention.",
          },
          {
            to: "/methodology",
            label: "Methodology and references",
            description:
              "Review the source basis for domain-specific correction ranges and limits.",
          },
        ]}
      />
    </SiteLayout>
  );
}
