import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ChevronRight, Menu, ShieldCheck, X } from "lucide-react";

export function AuthorMark({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)"
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-display font-semibold text-primary-foreground ring-2 ring-accent ${className}`}
    >
      ZI
    </div>
  );
}

const AUTHOR_PHOTO_WEBP = "/dr-zeeshan-islam.webp";
const AUTHOR_PHOTO_PNG = "/dr-zeeshan-islam.png";

/**
 * Real author headshot, self-hosted for performance and reliable E-E-A-T
 * signals, with a graceful fallback to the initials mark if the image fails.
 */
export function AuthorPhoto({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return <AuthorMark className={className} />;

  return (
    <picture>
      <source srcSet={AUTHOR_PHOTO_WEBP} type="image/webp" />
      <img
        src={AUTHOR_PHOTO_PNG}
        alt="Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics), consultant paediatrician"
        width={709}
        height={585}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={() => setFailed(true)}
        className={`shrink-0 object-cover ${className}`}
      />
    </picture>
  );
}

const NAV = [
  { to: "/", label: "Corrected age tool" },
  { to: "/premature-baby-milestones", label: "Milestones" },
  { to: "/how-to-calculate-corrected-age", label: "How it works" },
  { to: "/when-to-stop-correcting", label: "When to stop" },
  { to: "/red-flags", label: "Red flags" },
  { to: "/methodology", label: "Methodology" },
  { to: "/about", label: "About the author" },
  { to: "/privacy", label: "Privacy" },
];

const FOOTER_EXPLORE = [
  { to: "/adjusted-age-calculator", label: "Adjusted age calculator" },
  { to: "/adjusted-age-vs-chronological-age", label: "Adjusted vs chronological age" },
  { to: "/pma-calculator", label: "PMA calculator" },
  { to: "/preemie-weight-gain", label: "Preemie weight gain" },
  { to: "/preemie-vaccines", label: "Preemie vaccines" },
  { to: "/late-preterm-baby", label: "Late preterm baby" },
  { to: "/nicu-follow-up-schedule", label: "NICU follow-up schedule" },
  { to: "/when-can-my-preemie-start-solids", label: "When can my preemie start solids?" },
];

export interface BreadcrumbItem {
  to?: string;
  label: string;
}

export interface LinkGridItem {
  to: string;
  label: string;
  description: string;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="no-print sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-1.5 text-[0.7rem] tracking-wide sm:text-xs">
          <ShieldCheck className="size-3.5 shrink-0 opacity-90" aria-hidden />
          <span className="text-center opacity-95">
            Clinically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)
          </span>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/85 shadow-paper backdrop-blur-xl"
            : "border-transparent bg-background/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-display text-base font-semibold text-primary-foreground shadow-paper">
              A
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-tight text-foreground">
                AdjustedAge
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Preemie follow-up
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.slice(1, 7).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
            >
              Open the tool
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            className="border-t border-border bg-background px-5 pb-4 pt-2 lg:hidden"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-paper focus:not-sr-only"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content">{children}</main>

      <footer className="no-print mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <AuthorPhoto className="size-16 rounded-full ring-1 ring-border" />
            <div className="text-sm">
              <p className="font-display text-base font-semibold text-foreground">
                Written and clinically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)
              </p>
              <p className="mt-1 text-muted-foreground">
                Consultant paediatrician. Every calculation, reference and milestone list on this
                site is reviewed against the primary source before publication.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  No accounts
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  No uploads
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  Works offline
                </span>
              </div>
              <Link
                to="/about"
                className="mt-3 inline-block text-primary underline underline-offset-4"
              >
                Read the author&apos;s credentials and review policy
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

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Popular SEO pages
            </p>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
              {FOOTER_EXPLORE.map((item) => (
                <Link key={item.to} to={item.to} className="hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
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

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-3xl px-5 pt-8 text-sm text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-foreground" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight className="size-3.5 opacity-60" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
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
      <AuthorPhoto className="size-10 rounded-full ring-1 ring-border" />
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

export function KeyTakeaways({
  title = "Quick answers",
  items,
}: {
  title?: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <section className="mx-auto mt-8 max-w-3xl px-5">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LinkGridSection({
  title,
  intro,
  links,
}: {
  title: string;
  intro?: string;
  links: LinkGridItem[];
}) {
  if (!links.length) return null;

  return (
    <section className="mx-auto mt-12 max-w-5xl px-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
          {intro ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{intro}</p> : null}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-paper transition-transform hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-foreground">{item.label}</h3>
              <ArrowRight
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Article({ children }: { children: ReactNode }) {
  return (
    <article className="prose-clinical mx-auto max-w-3xl px-5 py-8 text-[0.975rem]">
      {children}
    </article>
  );
}
