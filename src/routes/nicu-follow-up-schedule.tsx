import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Article,
  Breadcrumbs,
  KeyTakeaways,
  LinkGridSection,
  PageHeader,
  SiteLayout,
} from "@/components/SiteLayout";

const CRE_FOLLOWUP_GUIDELINE =
  "https://www.crenewbornmedicine.org.au/media/0aabcrcx/25062024_preterm_followup_guideline.pdf";
const CPS_EXTREMELY_PRETERM_FOLLOWUP = "https://cps.ca/en/documents/position/follow-up-care";
const AAP_PRETERM_FRAMEWORK =
  "https://publications.aap.org/pediatrics/article/152/1/e2023062511/192156/Primary-Care-Framework-to-Monitor-Preterm-Infants";
const CDC_MILESTONES = "https://www.cdc.gov/act-early/milestones/index.html";

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

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
          "Typical NICU follow-up visits at 4, 8, 12, 18, 24 and 36 months corrected: what each visit checks, what to bring, what to ask. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "NICU Follow-Up Schedule for Preterm Babies | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Typical NICU follow-up visits at 4, 8, 12, 18, 24 and 36 months corrected: what each visit checks, what to bring, what to ask. Reviewed by Dr. Zeeshan Islam.",
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
          "Typical NICU follow-up visits at 4, 8, 12, 18, 24 and 36 months corrected: what each visit checks, what to bring, what to ask. Reviewed by Dr. Zeeshan Islam.",
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
            "Typical high-risk infant follow-up schedule for NICU graduates, indexed to corrected age, with what happens at each visit type and questions to ask.",
          url: "https://preemie.vercel.app/nicu-follow-up-schedule",
          image: "https://preemie.vercel.app/og/og-followup.png",
          datePublished: "2026-08-27",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          citation: [
            CRE_FOLLOWUP_GUIDELINE,
            CPS_EXTREMELY_PRETERM_FOLLOWUP,
            AAP_PRETERM_FRAMEWORK,
            CDC_MILESTONES,
          ],
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents and clinicians following NICU graduates",
          },
          author: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          reviewedBy: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          publisher: { "@id": "https://preemie.vercel.app/#organization" },
          specialty: "Pediatric",
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
              name: "NICU follow-up schedule",
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
        <p>
          Nothing on this page is your clinic&apos;s protocol. It is a picture of a common pattern,
          so that you know roughly what is coming and can ask better questions. Your discharge
          summary, your follow-up nurse and your own clinic&apos;s letters always take precedence.
        </p>

        <h2>Why follow-up timing uses corrected age</h2>
        <p>
          A baby born early has a different developmental calendar from a term-born baby with the
          same birthday. If a clinic uses only chronological age, the visit may look delayed simply
          because the wrong age framework was used. That is why many preterm follow-up programmes
          are scheduled by <strong>corrected age</strong>.
        </p>
        <p>
          The correction is not cosmetic. Corrected age changes which row of a milestone chart is
          fair, which growth line the weight is plotted against, and whether a screening tool is
          being applied to the right age band. The AAP&apos;s primary care framework for preterm
          infants builds developmental screening around corrected age for children under 24 months
          specifically because of this:{" "}
          <SourceLink href={AAP_PRETERM_FRAMEWORK}>
            Primary Care Framework to Monitor Preterm Infants for Developmental and Early Childhood
            Concerns
          </SourceLink>
          .
        </p>
        <p>
          The <Link to="/">main calculator</Link> already computes those ages and stores visits
          locally so you can track the follow-up journey in one place.
        </p>

        <h2>A common NICU follow-up schedule</h2>
        <p>
          These checkpoints are typical rather than fixed. Published follow-up guidance uses the
          same rough rhythm — contacts at around 3&ndash;4, 6, 8&ndash;9, 12, 18 and 24 months
          corrected, with later reviews at about 2.5 and 4&ndash;5 years — but every service sets
          its own timing:{" "}
          <SourceLink href={CRE_FOLLOWUP_GUIDELINE}>
            Guideline for Growth, Health and Developmental Follow-up after Preterm Birth
          </SourceLink>
          . Confirm the dates that apply to your baby with your clinic, and treat anything below as
          a map, not a promise.
        </p>
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

        <h2>What happens at each type of visit</h2>
        <p>
          Follow-up appointments are not all the same appointment. Knowing which type you are
          walking into changes what you should prepare and how long to allow.
        </p>
        <p>
          <strong>A measurement and review visit</strong> is the commonest: weight, length and head
          circumference are plotted on a growth chart by corrected age, feeding and sleep are
          discussed, and the clinician decides whether anything needs a sooner appointment. This is
          the visit where the <Link to="/preemie-weight-gain">preemie weight gain calculator</Link>{" "}
          is most useful, because you can describe interval gain instead of a single number.
        </p>
        <p>
          <strong>A therapy or motor review</strong> looks at tone, symmetry, sitting, reaching and
          walking, and is usually led by a physiotherapist or occupational therapist. If your baby
          was born very early, expect these reviews to be more frequent in the first year.
        </p>
        <p>
          <strong>A formal developmental assessment</strong> is a longer appointment using a
          standardised tool, often around 18&ndash;24 months corrected. It is a different thing from
          a milestone chat, and it is the appointment where being accurate about corrected age
          matters most.
        </p>
        <p>
          <strong>Sensory screening</strong> covers hearing and vision. Retinopathy of prematurity
          screening happens earlier than any of these, usually before discharge, and the result is
          worth keeping in the folder.
        </p>
        <p>
          Alongside these, mainstream developmental screening runs on a fixed pattern: the CDC
          recommends general screening at 9, 18 and 30 months and autism screening at 18 and 24
          months, or whenever a parent or clinician raises a concern —{" "}
          <SourceLink href={CDC_MILESTONES}>CDC&apos;s developmental milestones</SourceLink>. Ask
          which of these your child has already had and which are still due.
        </p>

        <h2>What to bring</h2>
        <p>
          Follow-up visits are short and information-heavy. One folder saves re-explanations, and it
          protects you from having to reconstruct a NICU stay from memory.
        </p>
        <ul>
          <li>
            The discharge summary, including gestational age, birth weight, and any grade of
            intraventricular haemorrhage, retinopathy or chronic lung disease
          </li>
          <li>A written list of weights with dates since the last visit</li>
          <li>
            Questions you thought of between visits, in writing — the ones you forget are usually
            the ones that mattered
          </li>
          <li>
            A short video of the behaviour you want the clinician to see, recorded on a normal day
            rather than a good one
          </li>
          <li>
            The medicines, oxygen and feeding equipment currently in use, with doses as actually
            given
          </li>
          <li>Both corrected age and chronological age written at the top of your notes</li>
          <li>
            The dates of routine immunisations, which follow the chronological schedule — see{" "}
            <Link to="/preemie-vaccines">do preemie vaccines use corrected age</Link> for the short
            answer
          </li>
        </ul>

        <h2>Questions worth asking</h2>
        <p>
          Clinics vary, so the useful questions are the ones that surface the local answer. These
          are the ones that tend to pay for themselves:
        </p>
        <ul>
          <li>Which age are we measuring against today — corrected, chronological, or both?</li>
          <li>
            Which curve is my child plotted on, and has the line changed since the last visit?
          </li>
          <li>What would make you want to see us sooner than the next scheduled date?</li>
          <li>Is a formal developmental assessment booked, and at which corrected age?</li>
          <li>Which screening is still outstanding: hearing, vision, autism, development?</li>
          <li>
            If something does concern you, who do we call first — you, the nurse, or the on-call
            team?
          </li>
          <li>How long does correction stay in use here, and for which domains?</li>
        </ul>
        <p>
          The last question connects directly to{" "}
          <Link to="/when-to-stop-correcting">when to stop correcting</Link>, where the published
          evidence and local practice do not always agree.
        </p>

        <h2>What these visits are really checking</h2>
        <p>
          Follow-up is broader than milestones alone. Clinicians are also watching weight gain, head
          growth, feeding efficiency, tone, vision, hearing, respiratory history and whether parents
          have concerns that deserve direct assessment. Parental concern is treated as part of the
          assessment, not as a distraction from it.
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
          more specialised review. The Canadian Paediatric Society position statement on follow-up
          of the extremely preterm infant describes exactly this pattern — coordinated review at key
          time points, with correction for gestational age used for growth and development until at
          least 36 months:{" "}
          <SourceLink href={CPS_EXTREMELY_PRETERM_FOLLOWUP}>
            Follow-up care of the extremely preterm infant after discharge from hospital
          </SourceLink>
          .
        </p>
        <p>
          A late preterm baby sits at the other end. Many late preterm infants are discharged from
          specialist follow-up early, or never enter it, because nothing went wrong in the NICU.
          Even so, a 35- or 36-week baby may still need corrected-age context in the first year, and
          a lighter schedule is not the same as no schedule. Your own clinic&apos;s plan always
          takes precedence over a general guide.
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
          follow-up, <Link to="/pma-calculator">PMA</Link> may also appear in the note.
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
