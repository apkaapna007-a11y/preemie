import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import headshot from "@/assets/dr-zeeshan-islam.png.asset.json";

const NAV = [
  { to: "/", label: "Corrected age tool" },
  { to: "/premature-baby-milestones", label: "Milestones" },
  { to: "/how-to-calculate-corrected-age", label: "How it works" },
  { to: "/when-to-stop-correcting", label: "When to stop" },
  { to: "/red-flags", label: "Red flags" },
  { to: "/methodology", label: "Methodology" },
  { to: "/about", label: "About the author" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="no-print border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-foreground">AdjustedAge</span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Preemie follow-up
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="no-print mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <img
              src={headshot.url}
              alt="Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)"
              className="size-16 rounded-full object-cover object-top ring-2 ring-accent"
              loading="lazy"
              width={64}
              height={64}
            />
            <div className="text-sm">
              <p className="font-display text-base font-semibold text-foreground">
                Written and clinically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)
              </p>
              <p className="mt-1 text-muted-foreground">
                Consultant paediatrician. Every calculation, reference and milestone list on this
                site is reviewed against the primary source before publication.
              </p>
              <Link to="/about" className="mt-2 inline-block text-primary underline underline-offset-4">
                Read the author's credentials and review policy
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            <strong>Medical disclaimer.</strong> AdjustedAge performs date arithmetic and displays
            published developmental surveillance prompts. It does not diagnose, screen or replace
            assessment by your own clinician. It never returns a pass or fail result. If you are
            worried about your baby, contact your paediatrician today — do not wait for the next
            visit. Data you enter stays in your own browser and is never sent to a server.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AdjustedAge. Last clinical review: August 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-12">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-clay">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p> : null}
      <ReviewLine />
    </div>
  );
}

export function ReviewLine() {
  return (
    <div className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <img
        src={headshot.url}
        alt="Dr. Zeeshan Islam"
        className="size-10 rounded-full object-cover object-top"
        loading="lazy"
        width={40}
        height={40}
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        Medically reviewed by{" "}
        <Link to="/about" className="font-medium text-foreground underline underline-offset-2">
          Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)
        </Link>
        <br />
        Last reviewed August 2026 &middot;{" "}
        <Link to="/methodology" className="underline underline-offset-2">
          Formulas and sources
        </Link>
      </p>
    </div>
  );
}

export function Article({ children }: { children: ReactNode }) {
  return (
    <article className="prose-clinical mx-auto max-w-3xl px-5 py-8 text-[0.975rem]">
      {children}
    </article>
  );
}
