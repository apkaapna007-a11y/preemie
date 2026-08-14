import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Article, PageHeader, SiteLayout } from "@/components/SiteLayout";
import {
  clearAnalytics,
  isOptedOut,
  readAnalytics,
  setOptedOut,
  type AnalyticsSnapshot,
} from "@/lib/analytics";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Data Handling | AdjustedAge" },
      {
        name: "description",
        content:
          "AdjustedAge stores your baby's dates and measurements only in your browser. No accounts, no cookies, no data uploaded.",
      },
      { property: "og:title", content: "Privacy & Data Handling | AdjustedAge" },
      {
        property: "og:description",
        content:
          "AdjustedAge stores your baby's dates and measurements only in your browser. No accounts, no cookies, no data uploaded.",
      },
      { property: "og:url", content: "https://preemie.vercel.app/privacy" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://preemie.vercel.app/favicon.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy & Data Handling | AdjustedAge" },
      {
        name: "twitter:description",
        content:
          "AdjustedAge stores your baby's dates and measurements only in your browser. No accounts, no cookies, no data uploaded.",
      },
      { name: "twitter:image", content: "https://preemie.vercel.app/favicon.png" },
      { name: "article:published_time", content: "2026-08-11T00:00:00Z" },
      { name: "article:modified_time", content: "2026-08-12T00:00:00Z" },
    ],
    links: [
      { rel: "canonical", href: "https://preemie.vercel.app/privacy" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://preemie.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Privacy", item: "https://preemie.vercel.app/privacy" },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [snapshot, setSnapshot] = useState<AnalyticsSnapshot | null>(null);
  const [optOut, setOpt] = useState(false);

  useEffect(() => {
    setSnapshot(readAnalytics());
    setOpt(isOptedOut());
  }, []);

  const entries = snapshot ? Object.entries(snapshot.counts) : [];

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Trust"
        title="Privacy and data handling"
        intro="AdjustedAge is a calculator, not a service. Nothing you type about your baby is uploaded, and there is nothing to sign up for."
      />
      <Article>
        <h2>What is stored, and where</h2>
        <p>
          Date of birth, gestational age at birth, visit dates, measurements and notes are written
          to <strong>localStorage in this browser only</strong>. There is no server database, no
          account, and no synchronisation between devices. Clearing your browser data erases
          everything, permanently and irreversibly.
        </p>

        <h2>Privacy-first usage analytics</h2>
        <p>
          To know whether the tool is actually useful, AdjustedAge counts how often a small set of
          actions happen — a calculation, a saved visit, a PDF or CSV export, a print. It records
          the <em>name</em> of the action and nothing else. It never records a date of birth,
          gestational age, weight, length, head circumference, note text, name, IP address or
          device identifier, and it sets no cookies and no cross-site identifiers.
        </p>
        <p>
          These counts also stay on your device. You can read them, switch them off, or delete them
          right here:
        </p>

        <div className="not-prose mt-4 rounded-2xl border border-border bg-card p-5 shadow-paper">
          <p className="font-display text-lg font-semibold">Your local usage counts</p>
          {entries.length ? (
            <ul className="mt-3 space-y-1 text-sm">
              {entries.map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-border py-1">
                  <span className="text-muted-foreground">{k.replace(/_/g, " ")}</span>
                  <strong>{v}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Nothing recorded on this device.</p>
          )}
          {snapshot?.firstSeen ? (
            <p className="mt-3 text-xs text-muted-foreground">
              First recorded {snapshot.firstSeen} · last {snapshot.lastSeen}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={optOut}
                onChange={(e) => {
                  setOptedOut(e.target.checked);
                  setOpt(e.target.checked);
                  setSnapshot(readAnalytics());
                }}
                className="size-4 accent-[var(--color-primary)]"
              />
              Turn usage counting off on this device
            </label>
            <button
              type="button"
              onClick={() => {
                clearAnalytics();
                setSnapshot(readAnalytics());
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
            >
              Delete these counts
            </button>
          </div>
        </div>

        <h2>Offline use</h2>
        <p>
          The published site can be installed to your home screen and used offline. The offline copy
          caches the pages and code of the site itself — never your baby's data, which was already
          local and never travelled anywhere.
        </p>

        <h2>No advertising, no sponsorship</h2>
        <p>
          There are no ad networks, no third-party trackers, no embedded social widgets and no
          infant-formula sponsorship on this site. That is a deliberate editorial position: several
          of the pages ranking for these searches are published by formula manufacturers.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about data handling, or a correction to the clinical content, go to Dr. Zeeshan
          Islam, MBBS, MCPS (Pediatrics) via the about page.
        </p>
      </Article>
    </SiteLayout>
  );
}
