import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CheckCircle2, ShieldCheck, Stethoscope } from "lucide-react";
import { CorrectedAgeTool } from "@/components/CorrectedAgeTool";
import {
  Article,
  AuthorPhoto,
  KeyTakeaways,
  LinkGridSection,
  ReviewLine,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Corrected Age Calculator for Premature Babies | AdjustedAge" },
      {
        name: "description",
        content:
          "Calculate corrected age for a premature baby from birth date and gestational age, plus chronological age, PMA, milestones and follow-up planning. Reviewed by Dr. Zeeshan Islam.",
      },
      {
        property: "og:title",
        content: "Corrected Age Calculator for Premature Babies | AdjustedAge",
      },
      {
        property: "og:description",
        content:
          "Calculate corrected age for a premature baby from birth date and gestational age, plus chronological age, PMA, milestones and follow-up planning. Reviewed by Dr. Zeeshan Islam.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-home.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Corrected Age Calculator for Premature Babies | AdjustedAge",
      },
      {
        name: "twitter:description",
        content:
          "Corrected age, milestones and follow-up tracking for NICU graduates, with CDC milestones re-indexed to corrected age. Reviewed by Dr. Zeeshan Islam.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-home.png" },
      { name: "twitter:image:alt", content: "Corrected age calculator for premature babies" },
      { property: "og:image:alt", content: "Corrected age calculator for premature babies" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: "Corrected Age Calculator for Premature Babies",
          description:
            "Corrected age calculator for premature babies using birth date and gestational age to calculate corrected age, chronological age and postmenstrual age.",
          url: "https://preemie.vercel.app/",
          datePublished: "2026-08-11",
          dateModified: "2026-08-27",
          lastReviewed: "2026-08-27",
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Parents of preterm infants",
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
          copyrightHolder: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          specialty: "Pediatrics",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AdjustedAge Corrected Age Calculator",
          applicationCategory: "HealthApplication",
          operatingSystem: "Any",
          url: "https://preemie.vercel.app/",
          image: "https://preemie.vercel.app/og/og-home.png",
          description:
            "Free corrected age calculator for premature babies, with postmenstrual age, milestones and local follow-up visit tracking.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          creator: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
          reviewer: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
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
              name: "What is corrected age for a premature baby?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Corrected age is chronological age minus the weeks of prematurity. Calculate prematurity from 40 weeks, then use the corrected number when reading early developmental milestones.",
              },
            },
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
              name: "What is postmenstrual age (PMA)?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Postmenstrual age is gestational age at birth plus the time since birth. It is especially useful before the original due date and in early neonatal follow-up.",
              },
            },
            {
              "@type": "Question",
              name: "Should vaccines use corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Immunisations are scheduled by chronological age. Use corrected age for development-related conversations.",
              },
            },
            {
              "@type": "Question",
              name: "Should growth charts use corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For preterm follow-up, developmental interpretation and growth-chart discussions usually use corrected age after birth, while the exact chart choice changes around term-equivalent age. Discuss the chart being used with your clinician.",
              },
            },
            {
              "@type": "Question",
              name: "Does a 36-week baby still need corrected age?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Often yes, especially in the first year. Even a two- to four-week difference can matter when a baby is only a few months old.",
              },
            },
            {
              "@type": "Question",
              name: "When does corrected age stop being used?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Developmental correction is commonly used until about 24 months, although the appropriate endpoint can vary by developmental domain.",
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
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              For NICU graduates, birth to 3 years
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Corrected age calculator for premature babies
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Enter the date of birth and gestational age once. AdjustedAge gives you corrected age,
              chronological age and postmenstrual age, re-indexes the developmental milestones to
              the corrected number, and remembers every follow-up visit.
            </p>

            <ReviewLine />

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                Free tool
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                No sign-up
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                No data upload
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1.5">
                Works offline
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/adjusted-age-calculator"
                className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Adjusted age calculator
              </Link>
              <Link
                to="/pma-calculator"
                className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                PMA calculator
              </Link>
              <Link
                to="/premature-baby-milestones"
                className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Milestones chart
              </Link>
              <Link
                to="/nicu-follow-up-schedule"
                className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                NICU follow-up schedule
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={<CheckCircle2 className="size-4 text-primary" aria-hidden />}
                title="One input set, every age"
                text="Corrected age, chronological age and PMA from the same dates, without mental arithmetic at every visit."
              />
              <FeatureCard
                icon={<ShieldCheck className="size-4 text-primary" aria-hidden />}
                title="Built for trust"
                text="Clinically reviewed, transparent about limitations, and designed not to give false reassurance."
              />
              <FeatureCard
                icon={<Stethoscope className="size-4 text-primary" aria-hidden />}
                title="For parents and clinicians"
                text="Useful at home, in follow-up clinic, or when checking a discharge note that mixes corrected age and PMA."
              />
              <FeatureCard
                icon={<CheckCircle2 className="size-4 text-primary" aria-hidden />}
                title="Keeps the follow-up record"
                text="Save visits locally, print summaries, export CSV, and track weight velocity without creating an account."
              />
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 shadow-paper">
            <div className="flex items-center gap-4">
              <AuthorPhoto className="h-24 w-20 rounded-2xl ring-1 ring-border" />
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  Dr. Zeeshan Islam
                </p>
                <p className="text-sm text-muted-foreground">
                  MBBS, MCPS (Pediatrics)
                  <br />
                  Consultant paediatrician
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The site is built around one practical goal: stop corrected-age confusion from turning
              into avoidable panic, avoidable delay, or avoidable bad advice.
            </p>

            <div className="mt-5 rounded-2xl bg-surface p-4">
              <p className="text-sm font-medium text-foreground">Popular next questions</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/pma-calculator" className="hover:text-primary">
                    What is PMA and when should I use it?
                  </Link>
                </li>
                <li>
                  <Link to="/late-preterm-baby" className="hover:text-primary">
                    Does a 35- or 36-week baby still need corrected age?
                  </Link>
                </li>
                <li>
                  <Link to="/nicu-follow-up-schedule" className="hover:text-primary">
                    What is a typical NICU follow-up schedule?
                  </Link>
                </li>
                <li>
                  <Link to="/when-can-my-preemie-start-solids" className="hover:text-primary">
                    When can my preemie start solids?
                  </Link>
                </li>
                <li>
                  <Link to="/adjusted-age-vs-chronological-age" className="hover:text-primary">
                    Which age should I use for milestones or vaccines?
                  </Link>
                </li>
                <li>
                  <Link to="/red-flags" className="hover:text-primary">
                    Which concerns should make me call today?
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-6xl px-5">
        <CorrectedAgeTool />
      </div>

      <KeyTakeaways
        title="Quick answers parents usually need first"
        items={[
          "Adjusted age and corrected age mean the same thing for a premature baby.",
          "Use corrected age for milestones and many growth follow-up conversations, but use chronological age for vaccines.",
          "Before the original due date, postmenstrual age is often the clinically useful number.",
          "Late preterm babies still benefit from age correction in the first year.",
        ]}
      />

      <LinkGridSection
        title="Parents usually search these next"
        intro="These four follow-up guides answer the next questions that often come after corrected age: late-preterm expectations, visit timing, solids, and which age label to use."
        links={[
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "For 34- to 36-week babies who are often treated as almost-term but still need corrected-age context.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description:
              "A parent-friendly map of the common corrected-age visits from 4 to 36 months.",
          },
          {
            to: "/when-can-my-preemie-start-solids",
            label: "When can my preemie start solids?",
            description:
              "How corrected age, readiness signs and feeding safety fit together before solids.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description:
              "A one-page comparison of milestones, vaccines, PMA and everyday age wording.",
          },
        ]}
      />

      <LinkGridSection
        title="Featured follow-up guides"
        intro="These are the four evergreen support pages most likely to help parents after the calculator result: formula, milestones, safety red flags and when correction usually stops."
        links={[
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description:
              "A plain-English formula page with worked examples, including a late-preterm case.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description:
              "CDC/AAP milestone prompts reorganized by corrected age from 2 to 36 months.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description:
              "The concerns that should make parents call their clinician rather than wait for the next visit.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description:
              "A guide to when milestones, growth and vaccine timing stop using the same age framework.",
          },
        ]}
      />

      <Article>
        <h2>Why corrected age exists</h2>
        <p>
          A baby born at 28 weeks has spent twelve fewer weeks growing inside than a baby born at
          term. Those twelve weeks do not disappear at birth — the brain finishes them outside. So
          when we judge whether a preterm baby is developing as expected, we compare them against
          where they would be if they had been born on their due date. That adjusted number is the{" "}
          <strong>corrected age</strong> (also called adjusted age).
        </p>
        <p>
          The arithmetic is simple, but it has to be redone at every single encounter, and every
          downstream judgement depends on it: which milestone list applies, which growth chart to
          plot on, which percentile, and when to stop correcting. Most tools do the date maths and
          stop there.
        </p>

        <h2>Corrected age, adjusted age and chronological age — what is the difference?</h2>
        <p>
          <strong>Corrected age</strong> and <strong>adjusted age</strong> are the same thing. Some
          clinics prefer one term, some the other, but both mean the baby&apos;s age counted from
          the original due date rather than the birthday. <strong>Chronological age</strong> is the
          plain time since birth. This site shows both because they are used for different
          decisions.
        </p>
        <ul>
          <li>
            <strong>Corrected or adjusted age:</strong> usually the right age for milestones and
            many preterm growth follow-up discussions.
          </li>
          <li>
            <strong>Chronological age:</strong> the right age for vaccines, many administrative
            forms and everyday birthday counting.
          </li>
          <li>
            <strong>Postmenstrual age (PMA):</strong> gestational age at birth plus days since
            birth; especially useful before the baby reaches term-equivalent age.
          </li>
        </ul>
        <p>
          If you searched for an <Link to="/adjusted-age-calculator">adjusted age calculator</Link>,
          you are in the right place — this tool calculates the same number.
        </p>

        <h2>What this tool does differently</h2>
        <ul>
          <li>
            <strong>One input set, every answer.</strong> Corrected age, chronological age and
            postmenstrual age from the same two facts.
          </li>
          <li>
            <strong>Milestones are re-indexed automatically.</strong> The CDC/AAP surveillance
            prompts shown are the ones for the corrected age, not the birthday age.
          </li>
          <li>
            <strong>It remembers.</strong> Visits at 4, 8, 12, 18, 24 and 36 months corrected are
            kept as a serial record you can print or export.
          </li>
          <li>
            <strong>It never scores your baby.</strong> No pass, no fail, no reassuring verdict. The
            &ldquo;act early&rdquo; concerns are always visible.
          </li>
          <li>
            <strong>Your data stays on your device.</strong> No account, no server, no upload.
          </li>
        </ul>
        <p>
          That makes the calculator the centre of a follow-up cluster: use the{" "}
          <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link> for visit timing, the{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link> for 34- to 36-week babies,
          and <Link to="/when-can-my-preemie-start-solids">the solids guide</Link> when feeding
          questions start after discharge.
        </p>

        <h2>Corrected age is not used for everything</h2>
        <p>
          Two things in particular are <em>not</em> corrected: immunisations are given by
          chronological age, and the growth chart choice changes at term-equivalent age. The tool
          shows the chronological number alongside the corrected one for exactly this reason.
        </p>

        <h2>Common corrected-age questions</h2>
        <h3>What is corrected age for a premature baby?</h3>
        <p>
          Corrected age is chronological age minus the weeks of prematurity. Calculate prematurity
          from 40 weeks, then use the corrected number when reading early developmental milestones.
        </p>
        <h3>Is adjusted age the same as corrected age?</h3>
        <p>
          Yes. Adjusted age and corrected age are two names for the same number. Some parents search
          for one phrase and some for the other, but the calculation is identical.
        </p>
        <h3>What is PMA?</h3>
        <p>
          PMA means postmenstrual age. It is gestational age at birth plus the time since birth, and
          it is especially useful before the due date and in early neonatal follow-up. Use the{" "}
          <Link to="/pma-calculator">PMA calculator</Link> when that is the number you need.
        </p>
        <h3>Should vaccines use corrected age?</h3>
        <p>
          No. Immunisations are scheduled by chronological age. Use the calculator’s chronological
          age for vaccine timing and corrected age for development-related conversations.
        </p>
        <h3>Should premature baby growth charts use corrected age?</h3>
        <p>
          In preterm follow-up, clinicians usually interpret early measurements against corrected
          age while also deciding which chart should be used at that stage. That is one reason the
          tool always shows corrected age and postmenstrual age side by side. Read the{" "}
          <Link to="/methodology">methodology</Link> for the growth-chart hand-off details.
        </p>
        <h3>My baby was born at 36 weeks. Do I still need corrected age?</h3>
        <p>
          Often yes, especially in the first year. For a four-month-old, even a two- to four-week
          difference changes which milestone row you should be reading. See the{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link> and the{" "}
          <Link to="/how-to-calculate-corrected-age">worked examples page</Link>.
        </p>
        <h3>When does corrected age stop being used?</h3>
        <p>
          Developmental correction is commonly used until about 24 months, although the appropriate
          endpoint can vary by developmental domain. Read{" "}
          <Link to="/when-to-stop-correcting">when correction should stop</Link> and discuss your
          child’s follow-up plan with their clinician.
        </p>

        <h2>Continue with the preterm follow-up guides</h2>
        <p>
          <Link to="/how-to-calculate-corrected-age">Check the corrected-age formula</Link>, read
          the <Link to="/premature-baby-milestones">premature baby milestone chart</Link>, review
          the <Link to="/red-flags">red flags that need medical attention</Link>, compare the terms
          on the <Link to="/adjusted-age-calculator">adjusted age calculator page</Link>, use the{" "}
          <Link to="/pma-calculator">PMA calculator</Link>, explore the{" "}
          <Link to="/preemie-weight-gain">preemie weight gain calculator</Link>, read the{" "}
          <Link to="/late-preterm-baby">late preterm baby guide</Link>, check the{" "}
          <Link to="/nicu-follow-up-schedule">NICU follow-up schedule</Link>, see when a preemie may
          be ready for <Link to="/when-can-my-preemie-start-solids">solids</Link>, compare{" "}
          <Link to="/adjusted-age-vs-chronological-age">adjusted age vs chronological age</Link>,
          and use the <Link to="/preemie-vaccines">preemie vaccines guide</Link> for one of the most
          common age mix-ups.
        </p>
      </Article>

      <LinkGridSection
        title="Popular preemie follow-up guides"
        intro="These supporting pages broaden the keyword coverage, answer the questions parents search next, and make the calculator easier to trust and use."
        links={[
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description:
              "Same calculator, plus a plain-English guide to adjusted age versus corrected age.",
          },
          {
            to: "/pma-calculator",
            label: "PMA calculator",
            description:
              "Clinician-friendly postmenstrual age page for the time before and around the due date.",
          },
          {
            to: "/preemie-weight-gain",
            label: "Preemie weight gain calculator",
            description:
              "Calculate grams per day and grams per kilogram per day between two visits.",
          },
          {
            to: "/preemie-vaccines",
            label: "Preemie vaccines guide",
            description:
              "Clear answer to the most common vaccine timing mistake: use chronological age.",
          },
          {
            to: "/late-preterm-baby",
            label: "Late preterm baby guide",
            description:
              "What 34- to 36-week babies still need after discharge, including feeding and milestones.",
          },
          {
            to: "/nicu-follow-up-schedule",
            label: "NICU follow-up schedule",
            description:
              "A parent-friendly follow-up timetable organized by corrected age and visit goals.",
          },
          {
            to: "/when-can-my-preemie-start-solids",
            label: "When can my preemie start solids?",
            description:
              "How corrected age and developmental readiness fit together before complementary feeding.",
          },
          {
            to: "/adjusted-age-vs-chronological-age",
            label: "Adjusted age vs chronological age",
            description:
              "A simple comparison page for milestones, vaccines, PMA and clinic conversations.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description:
              "Printable milestone chart re-indexed to corrected age from 2 to 36 months.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description:
              "Formula, worked examples and the common mistakes parents and clinicians make.",
          },
          {
            to: "/when-to-stop-correcting",
            label: "When to stop correcting",
            description: "Why 24 months is a convention, not a universal biological rule.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description:
              "When you should call the doctor today rather than waiting for the next visit.",
          },
          {
            to: "/methodology",
            label: "Methodology and references",
            description: "Sources, formulas, limitations and the evidence behind the tool.",
          },
        ]}
      />
    </SiteLayout>
  );
}

function FeatureCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-paper">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
