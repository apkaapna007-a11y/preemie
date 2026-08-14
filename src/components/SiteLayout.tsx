import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import headshot from "@/assets/dr-zeeshan-islam.png.asset.json";

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
          <span className="opacity-95 text-center">
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

          <nav className="hidden items-center gap-1 lg:flex">
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
          <nav className="border-t border-border bg-background px-5 pb-4 pt-2 lg:hidden">
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
      <SiteHeader />

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
