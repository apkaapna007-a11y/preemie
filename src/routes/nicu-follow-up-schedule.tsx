import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

const VISITS = [
  {
    label: "4 months corrected",
    focus: "Feeding, weight velocity, head growth, tummy-time tolerance and early motor symmetry.",
  },
  {
    label: "8 months corrected",
    focus: "Sitting, transfer of objects, babble, hearing follow-up and growth review.",
  },
  {
    label: "12 months corrected",
    focus: "Pulling to stand, pincer grasp, first words, feeding progression and vision review.",
  },
  {
    label: "18 months corrected",
    focus: "Walking, single words, play, social reciprocity and autism-specific surveillance.",
  },
  {
    label: "24 months corrected",
    focus:
      "Two-word phrases, formal developmental assessment and the point where many clinics stop routine developmental correction.",
  },
  {
    label: "36 months corrected",
    focus:
      "Motor and language catch-up, preschool readiness and the end of correction in many high-risk programmes.",
  },
];

export const Route = createFileRoute("/nicu-follow-up-schedule")({
  head: () => ({
    meta: [
      { title: "NICU Follow-Up Schedule for Preterm Babies | AdjustedAge" },
      {
        name: "description",
        content:
          "A NICU follow-up schedule by corrected age: common visits at 4, 8, 12, 18, 24 and 36 months, what each visit looks for, and why timing uses corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "NICU Follow-Up Schedule for Preterm Babies | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "A NICU follow-up schedule by corrected age: common visits at 4, 8, 12, 18, 24 and 36 months, what each visit looks for, and why timing uses corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/nicu-follow-up-schedule" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-followup.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "NICU Follow-Up Schedule for Preterm Babies | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Typical corrected-age follow-up visits for NICU graduates and what each review is checking. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-followup.png" },
      { name: "twitter:image:alt", content: "NICU follow-up schedule for preterm babies" },
      { property: "og:image:alt", content: "NICU follow-up schedule for preterm babies" },
      { name: "article:published_time", content: "2026-08-27T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-27T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/nicu-follow-up-schedule" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "NICU Follow-Up Schedule for Preterm Babies",
          description:
            "Typical high-risk infant follow-up schedule for NICU graduates, indexed to corrected age.",
          url: "https://preemie.vercel.app/nicu-follow-up-schedule",
          image: "https://preemie.vercel.app/og/og-followup.png",
          datePublished: "2026-08-27",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians following NICU graduates",
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
              name: "Does NICU follow-up use corrected age or chronological age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most developmental follow-up schedules use corrected age, because the aim is to judge progress against the due-date age rather than the birthday age.",
              },
            },
            {
              "@type": "Question",
              name: "How long does NICU follow-up usually continue?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Many programmes continue through 24 months corrected, and some extend to 36 months for motor and language follow-up, especially in more premature babies.",
              },
            },
            {
              "@type": "Question",
              name: "Is every clinic schedule the same?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Visit timing varies by country, hospital, gestational age and medical history. The schedule on this page is a common pattern, not a universal rule.",
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
              name: "NICU Follow-Up Schedule",
              item: "https://preemie.vercel.app/nicu-follow-up-schedule",
            },
          ],
        }),
      },
    ],
  }),
  component: NicuFollowUpSchedulePage,
});

function NicuFollowUpSchedulePage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "NICU follow-up schedule" }]} />

      <PageHeader
        eyebrow="High-risk infant follow-up"
        title="NICU follow-up schedule for preterm babies"
        intro="The usual follow-up schedule is not based on the birthday alone. Most NICU and high-risk infant programmes time development reviews to corrected age, because corrected age changes what the clinician expects to see at each visit."
      />

      <KeyTakeaways
        items={[
          "Most NICU follow-up schedules are indexed to corrected age, not just chronological age.",
          "Common checkpoints are around 4, 8, 12, 18, 24 and 36 months corrected.",
          "The exact schedule varies by hospital, gestational age, complications and local practice.",
          "The purpose of follow-up is not only milestones: feeding, growth, vision, hearing and tone are all part of the review.",
        ]}
      />

      <Article>
        <h2>Why follow-up timing uses corrected age</h2>
        <p>
          A baby born early has a different developmental calendar from a term-born baby with the
          same birthday. If a clinic uses only chronological age, the visit may look delayed simply
          because the wrong age framework was used. That is why many preterm follow-up programmes
          are scheduled by <strong>corrected age</strong>.
        </p>
        <p>
          The <Link to="/">main calculator</Link> already computes those ages and stores visits
          locally so you can track the follow-up journey in one place.
        </p>

        <h2>A common NICU follow-up schedule</h2>
        <div className="not-prose mt-6 space-y-3">
          {VISITS.map((visit) => (
            <section
              key={visit.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-paper"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">{visit.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{visit.focus}</p>
            </section>
          ))}
        </div>

        <h2>What these visits are really checking</h2>
        <p>
          Follow-up is broader than milestones alone. Clinicians are also watching weight gain, head
          growth, feeding efficiency, tone, vision, hearing, respiratory history and whether parents
          have concerns that deserve direct assessment.
        </p>
        <p>
          If growth is the main worry between visits, use the{" "}
          <Link to="/preemie-weight-gain">preemie weight gain calculator</Link> to describe the
          interval clearly for your next review.
        </p>

        <h2>When the schedule differs</h2>
        <p>
          Babies born extremely preterm, babies with chronic lung disease, babies with surgical or
          neurological complications, and babies with feeding difficulty may need more frequent or
          more specialised review. A late preterm baby may also follow a lighter schedule in some
          systems. Your own clinic&apos;s plan always takes precedence over a general guide.
        </p>

        <h2>Questions parents ask most</h2>
        <h3>Does every preemie need long NICU follow-up?</h3>
        <p>
          No. The intensity depends on gestational age, complications and local services. But even a
          late preterm baby may need more developmental context than a full-term newborn.
        </p>
        <h3>What age should I write on the appointment notes?</h3>
        <p>
          Write the baby&apos;s chronological age and corrected age if possible. In earlier
          follow-up,
          <Link to="/pma-calculator">PMA</Link> may also appear in the note.
        </p>
        <h3>When does corrected-age follow-up stop?</h3>
        <p>
          Many programmes taper developmental correction by about 24 months, though some continue to
          36 months for motor or language follow-up. Read{" "}
          <Link to="/when-to-stop-correcting">when to stop correcting</Link> for the longer
          discussion.
        </p>
      </Article>

      <LinkGridSection
        title="Pages that support follow-up visits"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description: "Calculate the ages and store the serial visits in the main tool.",
          },
          {
            to: "/pma-calculator",
            label: "PMA calculator",
            description:
              "Useful for early NICU and post-discharge notes where PMA is still central.",
          },
          {
            to: "/preemie-weight-gain",
            label: "Preemie weight gain calculator",
            description: "Describe interval weight gain clearly between clinic visits.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Use corrected age to read the milestone row that fits the visit.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "See why even 35- and 36-week babies may still need corrected-age follow-up.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Know which concerns should bring the next review forward.",
          },
        ]}
      />
    </SiteLayout>
  );
}
