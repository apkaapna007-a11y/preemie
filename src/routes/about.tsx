import { createFileRoute, Link } from "@tanstack/react-router";
import { Article, SiteLayout } from "@/components/SiteLayout";
import headshot from "@/assets/dr-zeeshan-islam.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Zeeshan Islam | AdjustedAge" },
      {
        name: "description",
        content:
          "AdjustedAge is written and reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics). Credentials, editorial policy and review schedule.",
      },
      { property: "og:title", content: "About Dr. Zeeshan Islam | AdjustedAge" },
      {
        property: "og:description",
        content:
          "AdjustedAge is written and reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics). Credentials, editorial policy and review schedule.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/about" },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: "https://preemie.vercel.app/og-image.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Dr. Zeeshan Islam | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "AdjustedAge is written and reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics). Credentials, editorial policy and review schedule.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/og-image.png" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-12T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/about" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Dr. Zeeshan Islam",
          honorificPrefix: "Dr.",
          honorificSuffix: "MBBS, MCPS (Pediatrics)",
          jobTitle: "Consultant Paediatrician",
          url: "https://preemie.vercel.app/about",
          image: "https://preemie.vercel.app/og-image.png",
          description:
            "Author and clinical reviewer of AdjustedAge, a corrected-age calculator and preemie follow-up tool.",
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
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://preemie.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://preemie.vercel.app/about" },
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
      <div className="mx-auto max-w-3xl px-5 pt-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img
            src={headshot.url}
            alt="Portrait of Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), consultant paediatrician"
            className="h-44 w-36 rounded-2xl object-cover object-top shadow-paper ring-1 ring-border"
            width={144}
            height={176}
          />
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
          This is an educational and calculation tool. It is not a consultation, it does not create a
          doctor–patient relationship, and it cannot replace assessment by the clinician who can
          actually examine your child. If you are worried about your baby, contact your paediatrician
          today — do not wait for the next visit.
        </p>
      </Article>
    </SiteLayout>
  );
}
