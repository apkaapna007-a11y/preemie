import assert from "node:assert/strict";
import test from "node:test";
import { computeAges, parseDate } from "../src/lib/corrected-age.ts";
import { followUpSchedule } from "../src/lib/followup.ts";
import { calculateWeightVelocity } from "../src/lib/weight-velocity.ts";

test("rejects calendar-invalid dates instead of normalizing them", () => {
  assert.equal(parseDate("2026-02-29"), null);
  assert.equal(parseDate("2026-02-31"), null);
  assert.equal(parseDate("2028-02-29")?.toISOString(), "2028-02-29T00:00:00.000Z");
});

test("computes corrected age from whole-day arithmetic", () => {
  const result = computeAges({
    birthDate: "2026-01-01",
    gaWeeks: 30,
    gaDays: 0,
    onDate: "2026-03-26",
  });

  assert.deepEqual(result, {
    chronologicalDays: 84,
    correctedDays: 14,
    pmaDays: 294,
    prematurityDays: 70,
    isTermEquivalentReached: true,
  });
});

test("rejects unsupported gestational-age and future-date inputs", () => {
  assert.equal(
    computeAges({
      birthDate: "2026-01-01",
      gaWeeks: 41,
      gaDays: 0,
      onDate: "2026-01-02",
    }),
    null,
  );
  assert.equal(
    computeAges({
      birthDate: "2026-01-01",
      gaWeeks: 30,
      gaDays: 0,
      onDate: "2025-12-31",
    }),
    null,
  );
});

test("clamps follow-up dates to the last day of shorter calendar months", () => {
  const visits = followUpSchedule("2026-01-31", 0, "2026-01-31");
  assert.equal(visits[0]?.dueDate, "2026-05-31");
  assert.equal(visits[1]?.dueDate, "2026-09-30");
});

test("uses the same average-weight velocity formula used by API and PDF", () => {
  const result = calculateWeightVelocity({
    previousDate: "2026-01-01",
    previousWeightKg: 2,
    currentDate: "2026-01-11",
    currentWeightKg: 2.2,
  });

  assert.ok(result);
  assert.equal(result.intervalDays, 10);
  assert.ok(Math.abs(result.totalGainG - 200) < 1e-9);
  assert.ok(Math.abs(result.gramsPerDay - 20) < 1e-9);
  assert.equal(Math.round(result.gramsPerKgPerDay * 10) / 10, 9.5);
});

test("rejects invalid weight-velocity inputs", () => {
  assert.equal(
    calculateWeightVelocity({
      previousDate: "2026-01-01",
      previousWeightKg: 0,
      currentDate: "2026-01-11",
      currentWeightKg: 2.2,
    }),
    null,
  );
  assert.equal(
    calculateWeightVelocity({
      previousDate: "2026-01-11",
      previousWeightKg: 2,
      currentDate: "2026-01-01",
      currentWeightKg: 2.2,
    }),
    null,
  );
});
