/**
 * Privacy-first analytics.
 *
 * Design rules (documented on /privacy):
 * - No cookies, no fingerprinting, no cross-site identifiers.
 * - No personal health data ever leaves the device: we record event NAMES and
 *   coarse, non-identifying buckets only (never dates of birth, gestational
 *   age in days, measurements, notes or names).
 * - Counts are aggregated in this browser's localStorage. Nothing is uploaded.
 */

const KEY = "adjustedage.analytics.v1";
const OPT_OUT_KEY = "adjustedage.analytics.optout.v1";

export type AnalyticsEvent =
  | "tool_calculated"
  | "visit_saved"
  | "visit_removed"
  | "milestone_checked"
  | "pdf_exported"
  | "csv_exported"
  | "print_summary"
  | "app_installed";

export interface AnalyticsSnapshot {
  counts: Partial<Record<AnalyticsEvent, number>>;
  firstSeen: string | null;
  lastSeen: string | null;
}

const EMPTY: AnalyticsSnapshot = { counts: {}, firstSeen: null, lastSeen: null };

function isBrowser() {
  return typeof window !== "undefined";
}

export function isOptedOut(): boolean {
  if (!isBrowser()) return false;
  try {
    return window.localStorage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setOptedOut(value: boolean) {
  if (!isBrowser()) return;
  try {
    if (value) {
      window.localStorage.setItem(OPT_OUT_KEY, "1");
      window.localStorage.removeItem(KEY);
    } else {
      window.localStorage.removeItem(OPT_OUT_KEY);
    }
  } catch {
    /* storage unavailable — analytics simply does not run */
  }
}

export function readAnalytics(): AnalyticsSnapshot {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? ({ ...EMPTY, ...(JSON.parse(raw) as AnalyticsSnapshot) }) : EMPTY;
  } catch {
    return EMPTY;
  }
}

/** Record a usage event. Never pass patient data — the signature forbids payloads. */
export function track(event: AnalyticsEvent) {
  if (!isBrowser() || isOptedOut()) return;
  try {
    const snap = readAnalytics();
    const now = new Date().toISOString().slice(0, 10);
    const next: AnalyticsSnapshot = {
      counts: { ...snap.counts, [event]: (snap.counts[event] ?? 0) + 1 },
      firstSeen: snap.firstSeen ?? now,
      lastSeen: now,
    };
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function clearAnalytics() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
