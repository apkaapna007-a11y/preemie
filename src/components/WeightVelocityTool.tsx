import { useEffect, useMemo, useState } from "react";
import { Activity, TrendingUp } from "lucide-react";
import { calculateWeightVelocity } from "@/lib/weight-velocity";
import { track } from "@/lib/analytics";
import { todayISO } from "@/lib/corrected-age";

function isoDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

export function WeightVelocityTool() {
  const [previousDate, setPreviousDate] = useState(isoDaysAgo(7));
  const [currentDate, setCurrentDate] = useState(todayISO());
  const [previousWeight, setPreviousWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");

  const previousWeightKg = previousWeight.trim() ? Number(previousWeight) : NaN;
  const currentWeightKg = currentWeight.trim() ? Number(currentWeight) : NaN;

  const result = useMemo(() => {
    if (!Number.isFinite(previousWeightKg) || !Number.isFinite(currentWeightKg)) return null;
    return calculateWeightVelocity({
      previousDate,
      previousWeightKg,
      currentDate,
      currentWeightKg,
    });
  }, [previousDate, previousWeightKg, currentDate, currentWeightKg]);

  useEffect(() => {
    if (result) track("weight_velocity_calculated");
  }, [result]);

  const error = useMemo(() => {
    if (!previousWeight.trim() || !currentWeight.trim()) return null;
    if (!Number.isFinite(previousWeightKg) || previousWeightKg <= 0) {
      return "Enter a valid previous weight in kilograms.";
    }
    if (!Number.isFinite(currentWeightKg) || currentWeightKg <= 0) {
      return "Enter a valid current weight in kilograms.";
    }
    if (!result) {
      return "The current date must be after the previous date, and both weights must be positive.";
    }
    return null;
  }, [previousWeight, currentWeight, previousWeightKg, currentWeightKg, result]);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-paper sm:p-7">
      <div className="flex items-center gap-2">
        <Activity className="size-5 text-primary" aria-hidden />
        <h2 className="font-display text-xl font-semibold">Preemie weight gain calculator</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Compare two weights from two dates and the tool calculates average weight gain in grams per
        day and grams per kilogram per day. This is a trend tool for follow-up — not a diagnosis.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Previous date</span>
          <input
            type="date"
            value={previousDate}
            onChange={(e) => setPreviousDate(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Previous weight (kg)</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            value={previousWeight}
            onChange={(e) => setPreviousWeight(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Current date</span>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Current weight (kg)</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0.01"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-caution px-4 py-3 text-sm text-caution-foreground"
        >
          {error}
        </p>
      ) : null}

      {result ? (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatCard
              label="Interval"
              value={`${result.intervalDays} days`}
              hint="Use weights from two real measurement dates"
            />
            <StatCard
              label="Average gain"
              value={`${result.gramsPerDay.toFixed(1)} g/day`}
              hint={`${result.totalGainG.toFixed(0)} grams total over the interval`}
            />
            <StatCard
              label="Weight velocity"
              value={`${result.gramsPerKgPerDay.toFixed(1)} g/kg/day`}
              hint="A common neonatal follow-up way to discuss gain"
              emphasis
            />
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface px-4 py-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" aria-hidden />
              <p className="text-sm font-medium text-foreground">How to read this result</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A single weight is rarely the whole story. Clinicians look at the feeding history, the
              baby&apos;s corrected age or PMA, recent illness, urine and stool pattern, and the
              wider growth trend over time. If weight gain is poor, faltering, or the baby is
              feeding badly, contact your paediatrician rather than relying on the number alone.
            </p>
          </div>
        </>
      ) : null}
    </section>
  );
}

function StatCard({
  label,
  value,
  hint,
  emphasis,
}: {
  label: string;
  value: string;
  hint: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        emphasis ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
      }`}
    >
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs opacity-75">{hint}</p>
    </div>
  );
}
