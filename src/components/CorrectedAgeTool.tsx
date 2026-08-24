import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { FileDown, Printer, Table2, CalendarCheck, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  computeAges,
  correctedMonths,
  formatDuration,
  formatPMA,
  gaCategory,
  parseDate,
  todayISO,
} from "@/lib/corrected-age";
import {
  ALWAYS_ACT_EARLY,
  milestoneSetForCorrectedMonths,
  nextMilestoneSet,
} from "@/lib/milestones";
import { followUpSchedule } from "@/lib/followup";
import { generateVisitPdf } from "@/lib/visit-pdf";
import { track } from "@/lib/analytics";

interface VisitEntry {
  id: string;
  date: string;
  weightKg?: number | undefined;
  lengthCm?: number | undefined;
  headCm?: number | undefined;
  note?: string | undefined;
}

const STORAGE_KEY = "adjustedage.record.v1";

interface StoredRecord {
  birthDate: string;
  gaWeeks: number;
  gaDays: number;
  visits: VisitEntry[];
}

const storedRecordSchema = z.object({
  birthDate: z.string(),
  gaWeeks: z.number().int().min(22).max(40),
  gaDays: z.number().int().min(0).max(6),
  visits: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      weightKg: z.number().positive().max(25).optional(),
      lengthCm: z.number().positive().max(120).optional(),
      headCm: z.number().positive().max(60).optional(),
      note: z.string().max(5000).optional(),
    }),
  ),
});

function loadRecord(): StoredRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = storedRecordSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;
    if (!parseDate(parsed.data.birthDate)) return null;
    if (!parsed.data.visits.every((visit) => parseDate(visit.date))) return null;
    return parsed.data;
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
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
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

  const schedule = useMemo(
    () => (result && birthDate ? followUpSchedule(birthDate, result.prematurityDays, onDate) : []),
    [result, birthDate, onDate],
  );

  useEffect(() => {
    if (result) track("tool_calculated");
    // one count per completed input set, not per keystroke
  }, [birthDate, gaWeeks, gaDays, result]);

  const parsedWeight = weight.trim() ? Number(weight) : undefined;
  const parsedLength = length.trim() ? Number(length) : undefined;
  const parsedHead = head.trim() ? Number(head) : undefined;
  const measurementErrors: string[] = [];
  if (parsedWeight !== undefined && (!Number.isFinite(parsedWeight) || parsedWeight <= 0)) {
    measurementErrors.push("Weight must be a positive number in kilograms.");
  }
  if (parsedLength !== undefined && (!Number.isFinite(parsedLength) || parsedLength <= 0)) {
    measurementErrors.push("Length must be a positive number in centimetres.");
  }
  if (parsedHead !== undefined && (!Number.isFinite(parsedHead) || parsedHead <= 0)) {
    measurementErrors.push("Head circumference must be a positive number in centimetres.");
  }

  function addVisit() {
    if (!birthDate) {
      setFormError("Enter a date of birth before saving a visit.");
      return;
    }
    if (!result) {
      setFormError("The visit date must be on or after the date of birth.");
      return;
    }
    if (measurementErrors.length > 0) {
      setFormError(measurementErrors[0] ?? "Check the visit measurements.");
      return;
    }
    setFormError(null);
    const entry: VisitEntry = {
      id: `${Date.now()}`,
      date: onDate,
      weightKg: parsedWeight,
      lengthCm: parsedLength,
      headCm: parsedHead,
      note: note.trim() ? note.trim() : undefined,
    };
    setVisits((v) =>
      [...v.filter((x) => x.date !== entry.date), entry].sort((a, b) =>
        a.date.localeCompare(b.date),
      ),
    );
    setWeight("");
    setLength("");
    setHead("");
    setNote("");
    track("visit_saved");
  }

  function exportVisitPdf(v: VisitEntry) {
    const idx = visits.findIndex((x) => x.id === v.id);
    const prev = idx > 0 ? visits[idx - 1] : undefined;
    generateVisitPdf({
      birthDate,
      gaWeeks,
      gaDays,
      visitDate: v.date,
      weightKg: v.weightKg,
      lengthCm: v.lengthCm,
      headCm: v.headCm,
      note: v.note,
      previous: prev ? { date: prev.date, weightKg: prev.weightKg } : undefined,
    });
    track("pdf_exported");
  }

  const plausibility: string[] = [];
  if (weight && (Number(weight) < 0.3 || Number(weight) > 25))
    plausibility.push(
      "That weight is outside the usual range for an infant — please double-check the units (kg).",
    );
  if (length && (Number(length) < 25 || Number(length) > 120))
    plausibility.push("That length looks unusual — please double-check the units (cm).");
  if (head && (Number(head) < 18 || Number(head) > 60))
    plausibility.push(
      "That head circumference looks unusual — please double-check the units (cm).",
    );

  return (
    <div className="mx-auto max-w-3xl px-5">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-7">
        <h2 className="font-display text-xl font-semibold">Enter the birth details once</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything below is calculated from these two facts. They are saved in this browser so you
          do not have to type them again at the next visit.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Date of birth</span>
            <input
              type="date"
              value={birthDate}
              max={todayISO()}
              onChange={(e) => {
                setBirthDate(e.target.value);
                setFormError(null);
              }}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Age today (or at the visit)</span>
            <input
              type="date"
              value={onDate}
              min={birthDate || undefined}
              onChange={(e) => {
                setOnDate(e.target.value);
                setFormError(null);
              }}
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
          <p
            role="alert"
            className="mt-4 rounded-lg bg-caution px-4 py-3 text-sm text-caution-foreground"
          >
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
            Your baby was born {result.prematurityDays} days (
            {Math.floor(result.prematurityDays / 7)} weeks {result.prematurityDays % 7} days) before
            their due date, so when people ask how old they are, the honest answer is two numbers:{" "}
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
                  <strong>corrected</strong> age. They are conversation prompts for your next visit
                  — not a test, and there is no score.
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
                            onChange={(e) => {
                              setChecked((c) => ({ ...c, [key]: e.target.checked }));
                              if (e.target.checked) track("milestone_checked");
                            }}

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
              <p className="text-sm font-semibold">
                Call your paediatrician today if any of these apply, at any age
              </p>
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
            <div className="flex items-center gap-2">
              <CalendarCheck className="size-5 text-primary" aria-hidden />
              <h2 className="font-display text-xl font-semibold">Follow-up visit schedule</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              High-risk infant follow-up is timed to <strong>corrected</strong> age, so these dates
              are calculated from your baby's original due date — not their birthday.
            </p>
            <ul className="mt-4 space-y-2">
              {schedule.map((s) => (
                <li
                  key={s.correctedMonths}
                  className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg border px-3 py-2.5 ${
                    s.status === "due"
                      ? "border-primary bg-secondary"
                      : s.status === "done"
                        ? "border-border opacity-60"
                        : "border-border"
                  }`}
                >
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="text-xs text-muted-foreground">{s.dueDate}</span>
                  <span className="w-full text-xs text-muted-foreground">{s.focus}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Indicative timing only. Your own NICU follow-up clinic's schedule always takes
              precedence.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-7">
            <h2 className="font-display text-xl font-semibold">Serial record</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional. Add measurements at each follow-up visit and the tool keeps the trajectory,
              including weight velocity in g/kg/day. Stored only in this browser — nothing is
              uploaded.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <NumField
                label="Weight (kg)"
                value={weight}
                onChange={setWeight}
                step="0.01"
                min={0.01}
              />
              <NumField
                label="Length (cm)"
                value={length}
                onChange={setLength}
                step="0.1"
                min={0.1}
              />
              <NumField
                label="Head circ. (cm)"
                value={head}
                onChange={setHead}
                step="0.1"
                min={0.1}
              />
              <button
                type="button"
                onClick={addVisit}
                className="mt-6 h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Save this visit
              </button>
            </div>

            <label className="mt-3 block">
              <span className="text-xs font-medium text-muted-foreground">
                Note for this visit (optional — stays on this device)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="e.g. feeding well, physio review booked"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            {formError ? (
              <p
                role="alert"
                className="mt-3 rounded-lg bg-caution px-3 py-2 text-sm text-caution-foreground"
              >
                {formError}
              </p>
            ) : null}
            {measurementErrors.map((msg) => (
              <p
                key={msg}
                role="alert"
                className="mt-3 rounded-lg bg-caution px-3 py-2 text-sm text-caution-foreground"
              >
                {msg}
              </p>
            ))}
            {plausibility.map((msg) => (
              <p
                key={msg}
                className="mt-3 rounded-lg bg-caution px-3 py-2 text-sm text-caution-foreground"
              >
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
                        <tr key={v.id} className="border-t border-border align-top">
                          <td className="py-2 pr-4">
                            {v.date}
                            {v.note ? (
                              <span className="mt-1 block max-w-[16rem] text-xs text-muted-foreground">
                                {v.note}
                              </span>
                            ) : null}
                          </td>
                          <td className="py-2 pr-4">{r ? formatDuration(r.correctedDays) : "—"}</td>
                          <td className="py-2 pr-4">{v.weightKg ? `${v.weightKg} kg` : "—"}</td>
                          <td className="py-2 pr-4">{v.lengthCm ? `${v.lengthCm} cm` : "—"}</td>
                          <td className="py-2 pr-4">{v.headCm ? `${v.headCm} cm` : "—"}</td>
                          <td className="no-print py-2">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => exportVisitPdf(v)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-surface"
                              >
                                <FileDown className="size-3.5" aria-hidden />
                                PDF
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setVisits((list) => list.filter((x) => x.id !== v.id));
                                  track("visit_removed");
                                }}
                                className="text-xs text-muted-foreground underline"
                              >
                                remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="no-print mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const latest = visits[visits.length - 1];
                      if (latest) exportVisitPdf(latest);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <FileDown className="size-4" aria-hidden />
                    Clinician PDF for latest visit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      track("print_summary");
                      window.print();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
                  >
                    <Printer className="size-4" aria-hidden />
                    Print visit summary
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const rows = [
                        "visit_date,corrected_age_days,weight_kg,length_cm,head_cm",
                        ...visits.map((v) => {
                          const r = computeAges({ birthDate, gaWeeks, gaDays, onDate: v.date });
                          return [
                            v.date,
                            r?.correctedDays ?? "",
                            v.weightKg ?? "",
                            v.lengthCm ?? "",
                            v.headCm ?? "",
                          ].join(",");
                        }),
                      ].join("\n");
                      const url = URL.createObjectURL(new Blob([rows], { type: "text/csv" }));
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "adjustedage-visits.csv";
                      a.click();
                      URL.revokeObjectURL(url);
                      track("csv_exported");
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
                  >
                    <Table2 className="size-4" aria-hidden />
                    Export CSV
                  </button>
                </div>

                {visits.length > 1 && (
                  <div className="mt-8 border-t border-border pt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="size-5 text-primary" aria-hidden />
                      <h3 className="font-display text-lg font-semibold">Growth Trajectory</h3>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={visits.map((v) => ({
                            ...v,
                            correctedDays: computeAges({
                              birthDate,
                              gaWeeks,
                              gaDays,
                              onDate: v.date,
                            })?.correctedDays,
                            label: v.date,
                          }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                          <XAxis
                            dataKey="correctedDays"
                            type="number"
                            domain={["dataMin", "dataMax"]}
                            tickFormatter={(v) => formatDuration(Number(v)).split(" ")[0] || ""}
                            fontSize={10}
                            tick={{ fill: "#6b7280" }}
                            axisLine={{ stroke: "#e5e7eb" }}
                          />
                          <YAxis
                            yAxisId="weight"
                            fontSize={10}
                            tick={{ fill: "#6b7280" }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            label={{
                              value: "Weight (kg)",
                              angle: -90,
                              position: "insideLeft",
                              fontSize: 10,
                              fill: "#6b7280",
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "12px",
                              border: "none",
                              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                              fontSize: "12px",
                            }}
                            labelFormatter={(v) => `Corrected age: ${formatDuration(Number(v))}`}
                          />
                          <Legend verticalAlign="top" height={36} iconType="circle" />
                          <Line
                            yAxisId="weight"
                            type="monotone"
                            dataKey="weightKg"
                            name="Weight (kg)"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed italic">
                      This chart shows raw trajectory over time. It is not plotted against reference
                      percentiles (Fenton/WHO). Growth percentiles are planned for a future update.
                    </p>
                  </div>
                )}
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
        tone === "primary"
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card"
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
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
