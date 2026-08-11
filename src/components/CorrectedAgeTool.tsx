import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  computeAges,
  correctedMonths,
  formatDuration,
  formatPMA,
  gaCategory,
  todayISO,
} from "@/lib/corrected-age";
import {
  ALWAYS_ACT_EARLY,
  milestoneSetForCorrectedMonths,
  nextMilestoneSet,
} from "@/lib/milestones";

interface VisitEntry {
  id: string;
  date: string;
  weightKg?: number;
  lengthCm?: number;
  headCm?: number;
  note?: string;
}

const STORAGE_KEY = "adjustedage.record.v1";

interface StoredRecord {
  birthDate: string;
  gaWeeks: number;
  gaDays: number;
  visits: VisitEntry[];
}

function loadRecord(): StoredRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredRecord) : null;
  } catch {
    return null;
  }
}

export function CorrectedAgeTool() {
  const [hydrated, setHydrated] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [gaWeeks, setGaWeeks] = useState(30);
  const [gaDays, setGaDays] = useState(0);
  const [onDate, setOnDate] = useState(todayISO());
  const [visits, setVisits] = useState<VisitEntry[]>([]);
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [head, setHead] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = loadRecord();
    if (saved) {
      setBirthDate(saved.birthDate);
      setGaWeeks(saved.gaWeeks);
      setGaDays(saved.gaDays);
      setVisits(saved.visits ?? []);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !birthDate) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ birthDate, gaWeeks, gaDays, visits } satisfies StoredRecord),
    );
  }, [hydrated, birthDate, gaWeeks, gaDays, visits]);

  const result = useMemo(
    () => (birthDate ? computeAges({ birthDate, gaWeeks, gaDays, onDate }) : null),
    [birthDate, gaWeeks, gaDays, onDate],
  );

  const cMonths = result ? correctedMonths(result.correctedDays) : 0;
  const currentSet = result ? milestoneSetForCorrectedMonths(cMonths) : null;
  const upcoming = result ? nextMilestoneSet(cMonths) : null;
  const category = gaCategory(gaWeeks, gaDays);
  const futureBirth = Boolean(birthDate && !result);

  function addVisit() {
    if (!birthDate) return;
    const entry: VisitEntry = {
      id: `${Date.now()}`,
      date: onDate,
      weightKg: weight ? Number(weight) : undefined,
      lengthCm: length ? Number(length) : undefined,
      headCm: head ? Number(head) : undefined,
    };
    setVisits((v) => [...v.filter((x) => x.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date)));
    setWeight("");
    setLength("");
    setHead("");
  }

  const plausibility: string[] = [];
  if (weight && (Number(weight) < 0.3 || Number(weight) > 25))
    plausibility.push("That weight is outside the usual range for an infant — please double-check the units (kg).");
  if (length && (Number(length) < 25 || Number(length) > 120))
    plausibility.push("That length looks unusual — please double-check the units (cm).");
  if (head && (Number(head) < 18 || Number(head) > 60))
    plausibility.push("That head circumference looks unusual — please double-check the units (cm).");

  return (
    <div className="mx-auto max-w-3xl px-5">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-7">
        <h2 className="font-display text-xl font-semibold">Enter the birth details once</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything below is calculated from these two facts. They are saved in this browser so
          you do not have to type them again at the next visit.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Date of birth</span>
            <input
              type="date"
              value={birthDate}
              max={todayISO()}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Age today (or at the visit)</span>
            <input
              type="date"
              value={onDate}
              onChange={(e) => setOnDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <div>
            <span className="text-sm font-medium">Gestational age at birth</span>
            <div className="mt-1 flex gap-2">
              <label className="flex-1">
                <select
                  value={gaWeeks}
                  onChange={(e) => setGaWeeks(Number(e.target.value))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring"
                >
                  {Array.from({ length: 19 }, (_, i) => 22 + i).map((w) => (
                    <option key={w} value={w}>
                      {w} weeks
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex-1">
                <select
                  value={gaDays}
                  onChange={(e) => setGaDays(Number(e.target.value))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                    <option key={d} value={d}>
                      {d} days
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>{category.label}.</strong> {category.detail}
            </p>
          </div>
        </div>

        {futureBirth ? (
          <p className="mt-4 rounded-lg bg-caution px-4 py-3 text-sm text-caution-foreground">
            The visit date is before the date of birth. Please check both dates.
          </p>
        ) : null}
      </section>

      {result ? (
        <>
          <section className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat
              label="Corrected age"
              value={formatDuration(result.correctedDays)}
              tone="primary"
              hint="Use this for milestones and growth charts"
            />
            <Stat
              label="Chronological age"
              value={formatDuration(result.chronologicalDays)}
              hint="Use this for immunisations"
            />
            <Stat
              label="Postmenstrual age"
              value={formatPMA(result.pmaDays)}
              hint="GA at birth + time since birth"
            />
          </section>

          <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed">
            Your baby was born {result.prematurityDays} days ({Math.floor(result.prematurityDays / 7)}{" "}
            weeks {result.prematurityDays % 7} days) before their due date, so when people ask how
            old they are, the honest answer is two numbers:{" "}
            <strong>{formatDuration(result.chronologicalDays)} since birth</strong>, and{" "}
            <strong>{formatDuration(result.correctedDays)} corrected</strong>. Development is
            expected to track the corrected number.
            {!result.isTermEquivalentReached
              ? " Your baby has not yet reached their original due date, so corrected age is still counted backwards from term."
              : ""}
          </p>

          <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-semibold">
                Surveillance prompts at {currentSet ? currentSet.label : "this age"}
              </h2>
              {upcoming ? (
                <span className="text-xs text-muted-foreground">Next set: {upcoming.label}</span>
              ) : null}
            </div>

            {currentSet ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  These are the CDC/AAP milestones most children do by this age, re-indexed to{" "}
                  <strong>corrected</strong> age. They are conversation prompts for your next visit —
                  not a test, and there is no score.
                </p>
                <ul className="mt-4 space-y-2">
                  {currentSet.items.map((item) => {
                    const key = `${currentSet.month}-${item.text}`;
                    return (
                      <li key={key}>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-2 hover:bg-surface">
                          <input
                            type="checkbox"
                            checked={Boolean(checked[key])}
                            onChange={(e) =>
                              setChecked((c) => ({ ...c, [key]: e.target.checked }))
                            }
                            className="mt-1 size-4 accent-[var(--color-primary)]"
                          />
                          <span className="text-sm">
                            <span className="mr-2 rounded bg-accent px-1.5 py-0.5 text-[0.7rem] text-accent-foreground">
                              {item.domain}
                            </span>
                            {item.text}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Corrected age is still below 2 months, so the first surveillance set does not apply
                yet. Until then, feeding, weight gain and settling are what matter most.
              </p>
            )}

            <div className="mt-6 rounded-xl bg-caution px-4 py-4 text-caution-foreground">
              <p className="text-sm font-semibold">Call your paediatrician today if any of these apply, at any age</p>
              <ul className="mt-2 space-y-1 text-sm">
                {ALWAYS_ACT_EARLY.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Not every unticked box means a problem, and every ticked box does not mean everything
              is fine. If you are worried, contact your paediatrician today — do not wait for the
              next visit. See{" "}
              <Link to="/red-flags" className="text-primary underline underline-offset-2">
                the red flags page
              </Link>
              .
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-7">
            <h2 className="font-display text-xl font-semibold">Serial record</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional. Add measurements at each follow-up visit and the tool keeps the trajectory.
              Stored only in this browser — nothing is uploaded.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <NumField label="Weight (kg)" value={weight} onChange={setWeight} step="0.01" />
              <NumField label="Length (cm)" value={length} onChange={setLength} step="0.1" />
              <NumField label="Head circ. (cm)" value={head} onChange={setHead} step="0.1" />
              <button
                type="button"
                onClick={addVisit}
                className="mt-6 h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Save this visit
              </button>
            </div>

            {plausibility.map((msg) => (
              <p key={msg} className="mt-3 rounded-lg bg-caution px-3 py-2 text-sm text-caution-foreground">
                {msg}
              </p>
            ))}

            {visits.length > 0 ? (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="py-2 pr-4">Visit date</th>
                      <th className="py-2 pr-4">Corrected age</th>
                      <th className="py-2 pr-4">Weight</th>
                      <th className="py-2 pr-4">Length</th>
                      <th className="py-2 pr-4">Head</th>
                      <th className="no-print py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map((v) => {
                      const r = computeAges({ birthDate, gaWeeks, gaDays, onDate: v.date });
                      return (
                        <tr key={v.id} className="border-t border-border">
                          <td className="py-2 pr-4">{v.date}</td>
                          <td className="py-2 pr-4">{r ? formatDuration(r.correctedDays) : "—"}</td>
                          <td className="py-2 pr-4">{v.weightKg ? `${v.weightKg} kg` : "—"}</td>
                          <td className="py-2 pr-4">{v.lengthCm ? `${v.lengthCm} cm` : "—"}</td>
                          <td className="py-2 pr-4">{v.headCm ? `${v.headCm} cm` : "—"}</td>
                          <td className="no-print py-2">
                            <button
                              type="button"
                              onClick={() => setVisits((list) => list.filter((x) => x.id !== v.id))}
                              className="text-xs text-muted-foreground underline"
                            >
                              remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="no-print mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
                  >
                    Print visit summary
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = [
                        "visit_date,corrected_age_days,weight_kg,length_cm,head_cm",
                        ...visits.map((v) => {
                          const r = computeAges({ birthDate, gaWeeks, gaDays, onDate: v.date });
                          return [v.date, r?.correctedDays ?? "", v.weightKg ?? "", v.lengthCm ?? "", v.headCm ?? ""].join(",");
                        }),
                      ].join("\n");
                      const url = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "adjustedage-visits.csv";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
                  >
                    Export CSV
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "primary";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "primary" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
      }`}
    >
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs opacity-75">{hint}</p>
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
