import { jsPDF } from "jspdf";
import {
  computeAges,
  correctedMonths,
  formatDuration,
  formatPMA,
  gaCategory,
} from "@/lib/corrected-age";
import { milestoneSetForCorrectedMonths, ALWAYS_ACT_EARLY } from "@/lib/milestones";
import { calculateWeightVelocity } from "@/lib/weight-velocity";

export interface VisitPdfInput {
  birthDate: string;
  gaWeeks: number;
  gaDays: number;
  visitDate: string;
  weightKg?: number | undefined;
  lengthCm?: number | undefined;
  headCm?: number | undefined;
  note?: string | undefined;
  previous?:
    | {
        date: string;
        weightKg?: number | undefined;
      }
    | undefined;
}

const M = 48; // page margin (pt)

export function generateVisitPdf(input: VisitPdfInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const right = pageWidth - M;
  let y = M;

  const ages = computeAges({
    birthDate: input.birthDate,
    gaWeeks: input.gaWeeks,
    gaDays: input.gaDays,
    onDate: input.visitDate,
  });
  const category = gaCategory(input.gaWeeks, input.gaDays);

  const line = (gap = 14) => {
    y += gap;
  };
  const rule = () => {
    doc.setDrawColor(200);
    doc.line(M, y, right, y);
    y += 16;
  };
  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(20, 60, 70);
    doc.text(text.toUpperCase(), M, y);
    doc.setTextColor(30);
    line(16);
  };
  const kv = (label: string, value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110);
    doc.text(label, M, y);
    doc.setTextColor(20);
    doc.setFont("helvetica", "bold");
    doc.text(value, M + 150, y);
    doc.setFont("helvetica", "normal");
    line();
  };
  const para = (text: string, size = 9.5) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(70);
    const lines = doc.splitTextToSize(text, right - M) as string[];
    doc.text(lines, M, y);
    y += lines.length * (size + 3);
    doc.setTextColor(30);
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(20, 60, 70);
  doc.text("Preemie follow-up visit summary", M, y);
  line(18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(110);
  doc.text(
    "AdjustedAge - corrected-age tool. Clinically reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics).",
    M,
    y,
  );
  line(10);
  doc.setTextColor(30);
  rule();

  heading("Visit");
  kv("Visit date", input.visitDate);
  kv("Date of birth", input.birthDate);
  kv("Gestational age at birth", `${input.gaWeeks} weeks ${input.gaDays} days (${category.label})`);
  line(4);

  heading("Ages at this visit");
  if (ages) {
    kv("Corrected age", formatDuration(ages.correctedDays));
    kv("Chronological age", formatDuration(ages.chronologicalDays));
    kv("Postmenstrual age", formatPMA(ages.pmaDays));
    kv(
      "Prematurity",
      `${Math.floor(ages.prematurityDays / 7)} weeks ${ages.prematurityDays % 7} days early`,
    );
  } else {
    kv("Ages", "Visit date precedes date of birth");
  }
  line(4);

  heading("Measurements");
  kv("Weight", input.weightKg ? `${input.weightKg} kg` : "not recorded");
  kv("Length", input.lengthCm ? `${input.lengthCm} cm` : "not recorded");
  kv("Head circumference", input.headCm ? `${input.headCm} cm` : "not recorded");

  if (input.previous?.weightKg && input.weightKg) {
    const velocity = calculateWeightVelocity({
      previousDate: input.previous.date,
      previousWeightKg: input.previous.weightKg,
      currentDate: input.visitDate,
      currentWeightKg: input.weightKg,
    });
    if (velocity) {
      kv(
        "Weight velocity",
        `${velocity.gramsPerKgPerDay.toFixed(1)} g/kg/day since ${input.previous.date} (${velocity.intervalDays} days)`,
      );
    }
  }
  if (input.note) {
    line(4);
    heading("Note");
    para(input.note);
  }
  line(8);

  const cMonths = ages ? correctedMonths(ages.correctedDays) : 0;
  const set = ages ? milestoneSetForCorrectedMonths(cMonths) : null;
  heading(set ? `Surveillance prompts - ${set.label}` : "Surveillance prompts");
  if (set) {
    doc.setFontSize(9.5);
    for (const item of set.items) {
      const lines = doc.splitTextToSize(`- [${item.domain}] ${item.text}`, right - M) as string[];
      if (y > 740) {
        doc.addPage();
        y = M;
      }
      doc.setTextColor(40);
      doc.text(lines, M, y);
      y += lines.length * 12;
    }
  } else {
    para("Corrected age is below the first CDC surveillance set (2 months corrected).");
  }
  line(10);

  if (y > 620) {
    doc.addPage();
    y = M;
  }
  heading("Act early - discuss today at any age");
  for (const item of ALWAYS_ACT_EARLY) {
    const lines = doc.splitTextToSize(`- ${item}`, right - M) as string[];
    doc.setTextColor(40);
    doc.setFontSize(9.5);
    doc.text(lines, M, y);
    y += lines.length * 12;
  }
  line(10);

  rule();
  para(
    "This summary reports date arithmetic and published CDC/AAP developmental surveillance prompts re-indexed to corrected age. It is not a developmental screen, it returns no pass or fail result, and it does not replace assessment by a clinician. If you are worried about this baby, contact your paediatrician today - do not wait for the next visit. Data was entered locally in the family's browser and was not uploaded.",
    8.5,
  );

  doc.setFontSize(8);
  doc.setTextColor(140);
  doc.text(
    `Generated ${new Date().toISOString().slice(0, 10)} - AdjustedAge - adjustedage tool`,
    M,
    doc.internal.pageSize.getHeight() - 28,
  );

  doc.save(`adjustedage-visit-${input.visitDate}.pdf`);
}
