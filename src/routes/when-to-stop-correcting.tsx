import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
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

/**
 * Peer-reviewed and institutional sources cited in the evidence section.
 * Each URL was verified to resolve before publication.
 */
const CORRECTION_CITATIONS = [
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC12221983/",
  "https://www.nature.com/articles/s41390-024-03449-0",
  "https://med.emory.edu/departments/pediatrics/divisions/neonatology/dpc/dev-iq-testing.html",
  "https://cps.ca/en/documents/position/follow-up-care",
  "https://publications.aap.org/pediatrics/article/152/1/e2023062511/192156/Primary-Care-Framework-to-Monitor-Preterm-Infants",
];

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function EvidenceNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="not-prose my-4 rounded-2xl border border-border bg-card p-5 shadow-paper">
      <p className="font-display text-base font-semibold text-foreground">{label}</p>
      <div className="prose-clinical mt-1 text-[0.975rem]">{children}</div>
    </div>
  );
}

export const Route = createFileRoute("/when-to-stop-correcting")({
  head: () => ({
    meta: [
      { title: "When to Stop Correcting Age for a Preemie | AdjustedAge" },
      {
        name: "description",
        content:
          "When do you stop correcting a preemie's age? Usually 24 months — but growth, milestones and vaccines follow different rules. See the evidence by domain.",
      },
      {
        property: "og:title",
        content: "When to Stop Correcting Age for a Preemie | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "When do you stop correcting a preemie's age? Usually 24 months — but growth, milestones and vaccines follow different rules. See the evidence by domain.",
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
        content: "When to Stop Correcting Age for a Preemie | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "When do you stop correcting a preemie's age? Usually 24 months — but growth, milestones and vaccines follow different rules. See the evidence by domain.",
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
          citation: CORRECTION_CITATIONS,
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
              url: "https://preemie.vercel.app/icon-512.png",
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
        <p>
          Two of those rows are worth stating plainly, because they are the ones most often mixed
          up. Routine vaccines are never corrected — the schedule runs on real age, as set out on
          the <Link to="/preemie-vaccines">preemie vaccines page</Link>. And the difference between
          the two ages themselves is explained once, in{" "}
          <Link to="/adjusted-age-vs-chronological-age">adjusted vs chronological age</Link>, rather
          than re-argued here.
        </p>

        <h2>Why 24 months became the default answer</h2>
        <p>
          The 24-month figure is useful because many developmental follow-up systems are organised
          around that point. It is a practical convention, not a biological event. The brain does
          not flip a switch at 24 months and declare prematurity irrelevant.
        </p>
        <p>
          Official guidance reflects that convention: the{" "}
          <SourceLink href="https://publications.aap.org/pediatrics/article/152/1/e2023062511/192156/Primary-Care-Framework-to-Monitor-Preterm-Infants">
            American Academy of Pediatrics primary care framework for preterm infants
          </SourceLink>{" "}
          uses corrected age for preterm infants under 24 months of chronological age, and
          chronological age after that.
        </p>
        <p>
          That is why the site keeps the wording careful. Saying &ldquo;correct to 2 years&rdquo; is
          often good shorthand, but it becomes misleading if someone applies it to vaccines, length
          catch-up, or a baby still being followed in a high-risk clinic at 36 months.
        </p>

        <h2>What the evidence shows beyond the convention</h2>
        <p>
          Correction is not one decision — it is at least three: how you plot growth, how you
          interpret development, and how you count for vaccines and dosing. Those three have
          different evidence behind them, and the honest position is that they do not all end on the
          same day.
        </p>

        <EvidenceNote label="Growth: correction may matter through 36 months">
          <p>
            A 2025 <em>Journal of Perinatology</em> study of children born extremely and very
            preterm found that age correction was required for{" "}
            <strong>all growth measures through 36 months of corrected age</strong>, and that up to
            72.9% of children were classified as stunted when their chronological age was used
            instead (
            <SourceLink href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12221983/">
              Elmrayed et al., 2025
            </SourceLink>
            ). The limit worth naming: that study followed children born before 32 weeks, so it does
            not tell us that a late preterm baby&apos;s weight chart needs the same treatment.
          </p>
        </EvidenceNote>

        <EvidenceNote label="Development: 24 months usually suffices — except at the extremes">
          <p>
            A 2024 <em>Pediatric Research</em> study across a very large cohort found that standard
            correction to 24 months was{" "}
            <strong>generally sufficient for moderate and late preterm children</strong>, but{" "}
            <strong>underestimated delays in those born extremely and very preterm</strong> — with
            residual gaps of roughly two months in motor scores and about a month in language/social
            scores (
            <SourceLink href="https://www.nature.com/articles/s41390-024-03449-0">
              Goldshtein et al., 2024
            </SourceLink>
            ). One caveat: children already identified with delay at age two were excluded from that
            comparison, so it describes children who were doing broadly well at two.
          </p>
        </EvidenceNote>

        <EvidenceNote label="There is no single consensus — and clinics differ deliberately">
          <p>
            Emory&apos;s neonatology team states it directly: there is{" "}
            <SourceLink href="https://med.emory.edu/departments/pediatrics/divisions/neonatology/dpc/dev-iq-testing.html">
              no consensus among professionals
            </SourceLink>
            , the majority correct through two years, and their own clinic corrects through the
            first three years. Guidelines split the same way — the{" "}
            <SourceLink href="https://cps.ca/en/documents/position/follow-up-care">
              Canadian Paediatric Society
            </SourceLink>{" "}
            notes correction of growth and development until 36 months for children born extremely
            preterm, while immunisations are given by chronological age. Two reputable teams landing
            on different answers is not a puzzle you have to solve alone: it is a reason to ask your
            follow-up team which convention they are using and why.
          </p>
        </EvidenceNote>

        <p>
          So the contested areas, named honestly: how long growth charts should be corrected for
          babies born before 32 weeks (evidence says longer than 24 months), whether standard
          correction is enough for moderate and late preterm development (large-cohort evidence says
          usually yes), and what to do past 24 months for the most preterm babies when screening
          suggests a real concern (no consensus — that is a clinical decision).
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
          A baby born at 35 weeks is &ldquo;only&rdquo; five weeks early, which is exactly why
          correction is so often abandoned too soon. But at a four-month visit those five weeks are
          still a large chunk of the child&apos;s post-term life. In the first year, that difference
          can still change which milestone row is fair.
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
          <li>
            Do not use &ldquo;still a preemie&rdquo; forever to explain persistent developmental
            concern.
          </li>
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
