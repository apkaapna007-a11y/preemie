import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import {
  Article,
  AuthorPhoto,
  Breadcrumbs,
  LinkGridSection,
  SiteLayout,
} from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Zeeshan Islam | AdjustedAge" },
      {
        name: "description",
        content:
          "AdjustedAge is written and reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), a pediatrician, medical writer and digital health creator in Pakistan.",
      },
      { property: "og:title", content: "About Dr. Zeeshan Islam | AdjustedAge" },
      {
        property: "og:description",
        content:
          "AdjustedAge is written and reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), a pediatrician, medical writer and digital health creator in Pakistan.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/about" },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: "https://preemie.vercel.app/og/og-about.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Dr. Zeeshan Islam | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "AdjustedAge is written and reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), a pediatrician, medical writer and digital health creator in Pakistan.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og/og-about.png" },
      { name: "twitter:image:alt", content: "About Dr. Zeeshan Islam, author of AdjustedAge" },
      { property: "og:image:alt", content: "About Dr. Zeeshan Islam, author of AdjustedAge" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-26T00:00:00Z" },
    ],
    links: [{ rel: "canonical", href: "https://preemie.vercel.app/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          "@id": "https://preemie.vercel.app/about#drzeeshan",
          name: "Dr. Zeeshan Islam",
          honorificPrefix: "Dr.",
          honorificSuffix: "MBBS, MCPS (Pediatrics)",
          jobTitle: "Consultant Paediatrician",
          medicalSpecialty: "Pediatrics",
          url: "https://preemie.vercel.app/about",
          image: {
            "@type": "ImageObject",
            url: "https://preemie.vercel.app/dr-zeeshan-islam.png",
            width: 709,
            height: 585,
          },
          alternateName: "Dr Zee",
          identifier: {
            "@type": "PropertyValue",
            propertyID: "Gravatar",
            value: "50c92b77e1d7a4a9ee98b970f50188f88806b7b02c9c8e5004ee52a1ff4c861c",
          },
          sameAs: [
            "https://drzeeshanislam.blog",
            "https://www.linkedin.com/in/dr-zeeshan-islam-b81b0b373",
            "https://drzeewrites.com",
          ],
          description:
            "Dr. Zeeshan Islam is the author and clinical reviewer of AdjustedAge. He is a pediatrician, medical writer and digital health creator focused on evidence-based child health and preterm infant developmental follow-up.",
          knowsAbout: [
            "Pediatrics",
            "Neonatology",
            "Preterm infant follow-up",
            "Developmental surveillance",
            "Corrected age",
          ],
          hasCredential: [
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "degree",
              name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
            },
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "postgraduate certification",
              name: "MCPS in Paediatrics, College of Physicians and Surgeons Pakistan",
            },
          ],
          worksFor: {
            "@type": "Organization",
            name: "AdjustedAge",
            url: "https://preemie.vercel.app",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "PK",
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
            {
              "@type": "ListItem",
              position: 2,
              name: "About",
              item: "https://preemie.vercel.app/about",
            },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "About the author" }]} />
      <div className="mx-auto max-w-3xl px-5 pt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <AuthorPhoto className="h-44 w-36 rounded-2xl shadow-paper ring-1 ring-border" />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              About the author
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Dr. Zeeshan Islam
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              MBBS, MCPS (Pediatrics) &middot; Consultant Paediatrician
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Author, clinical reviewer and sole editorial authority for AdjustedAge.
            </p>
          </div>
        </div>
      </div>

      <Article>
        <h2>Qualifications</h2>
        <ul>
          <li>
            <strong>MBBS</strong> — Bachelor of Medicine, Bachelor of Surgery.
          </li>
          <li>
            <strong>MCPS (Paediatrics)</strong> — Member of the College of Physicians and Surgeons,
            postgraduate specialist qualification in paediatrics.
          </li>
          <li>
            Clinical practice in general paediatrics and newborn care, including the follow-up of
            NICU graduates through infancy and the preschool years.
          </li>
        </ul>

        <h2>Why I built this</h2>
        <p>
          Corrected age is the most repeated calculation in preterm follow-up and one of the most
          frequently botched. I have watched parents leave a clinic convinced their baby is delayed
          because a relative read them a milestone chart indexed to the wrong age, and I have seen
          the opposite — a genuine delay dismissed for two years because &ldquo;he was a
          preemie.&rdquo;
        </p>
        <p>
          Both errors come from the same missing tool: something that does the arithmetic once and
          then carries it through to every downstream judgement, and that remembers what happened at
          the last visit. That tool did not exist, so I built it.
        </p>

        <h2>Editorial policy</h2>
        <ul>
          <li>
            Every clinical statement traces to a named primary source listed on the{" "}
            <Link to="/methodology">methodology page</Link>.
          </li>
          <li>
            Pages carry a visible last-reviewed date. Content is reviewed at least annually and
            immediately when a source guideline changes.
          </li>
          <li>
            Uncertainty is stated as uncertainty. Where two respected sources disagree — Fenton
            versus INTERGROWTH-21st, for example — both are shown and the disagreement is explained
            rather than hidden behind a single number.
          </li>
          <li>
            No result on this site is ever framed as reassurance. The tool does not tell you your
            child is fine, because it cannot know that.
          </li>
        </ul>

        <h2>Identity card and elsewhere</h2>
        <p>
          My public identity card at{" "}
          <a
            href="https://drzeeshanislam.blog"
            target="_blank"
            rel="me noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            drzeeshanislam.blog
          </a>{" "}
          carries my verified accounts and current bio. Treat it as the canonical pointer to who
          writes and reviews this site.
        </p>
        <ul>
          <li>
            <a
              href="https://drzeeshanislam.blog"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              drzeeshanislam.blog — identity card
            </a>{" "}
            <ExternalLink className="inline size-3.5 text-muted-foreground" aria-hidden />
            <span className="text-muted-foreground"> verified accounts and current bio.</span>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/dr-zeeshan-islam-b81b0b373"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Dr. Zeeshan Islam on LinkedIn
            </a>{" "}
            <ExternalLink className="inline size-3.5 text-muted-foreground" aria-hidden />
            <span className="text-muted-foreground"> verified by the identity card.</span>
          </li>
          <li>
            <a
              href="https://drzeewrites.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              DrZeeWrites — medical and healthcare content practice
            </a>{" "}
            <ExternalLink className="inline size-3.5 text-muted-foreground" aria-hidden />
            <span className="text-muted-foreground"> the author&rsquo;s writing practice.</span>
          </li>
        </ul>
        <p>
          Disclosure: AdjustedAge is editorially independent of that practice. DrZeeWrites works
          with healthcare and health-tech clients, but no client content, placement or sponsorship
          reaches this tool, and the practice has no editorial role in it. The funding statement
          below applies to AdjustedAge alone.
        </p>

        <h2>Funding and conflicts of interest</h2>
        <p>
          AdjustedAge is self-funded. It takes no sponsorship from infant formula manufacturers,
          infant nutrition companies or pharmaceutical companies, and it will not. Several of the
          highest-ranking pages parents currently find when searching for preterm growth and
          milestone guidance are published by formula manufacturers; that is a conflict of interest
          in child-health advice, and refusing it is a deliberate position rather than an oversight.
        </p>
        <p>
          There are no advertisements, no tracking pixels, no accounts and no data collection. What
          you type stays in your browser.
        </p>

        <h2>Scope and limits of this site</h2>
        <p>
          This is an educational and calculation tool. It is not a consultation, it does not create
          a doctor–patient relationship, and it cannot replace assessment by the clinician who can
          actually examine your child. If you are worried about your baby, contact your
          paediatrician today — do not wait for the next visit.
        </p>
      </Article>

      <LinkGridSection
        title="Read the pages this review supports"
        links={[
          {
            to: "/",
            label: "Corrected age calculator",
            description:
              "The main calculator for corrected age, PMA, milestones and visit tracking.",
          },
          {
            to: "/adjusted-age-calculator",
            label: "Adjusted age calculator",
            description: "Same tool for people who search by the adjusted-age term instead.",
          },
          {
            to: "/premature-baby-milestones",
            label: "Premature baby milestones chart",
            description: "Printable milestone chart reviewed against CDC/AAP prompts.",
          },
          {
            to: "/how-to-calculate-corrected-age",
            label: "How to calculate corrected age",
            description:
              "Formula and worked examples for parents and clinicians who want to check the math.",
          },
          {
            to: "/red-flags",
            label: "Preemie red flags",
            description: "Safety page explaining when to seek medical help without delay.",
          },
          {
            to: "/methodology",
            label: "Methodology and references",
            description: "Transparent source list, formulas and editorial limits behind the site.",
          },
        ]}
      />
    </SiteLayout>
  );
}
