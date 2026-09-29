/**
 * Growth Trajectory chart.
 *
 * Recharts is the heaviest client dependency in the app (~90 kB gzipped) but is
 * only ever needed once a caregiver has logged two or more visits, so this
 * component is loaded with React.lazy from CorrectedAgeTool instead of being
 * part of the initial route bundle. Keep every `recharts` import here: this is
 * the single seam where the library enters the client graph.
 */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDuration } from "@/lib/corrected-age";

export interface GrowthPoint {
  id: string;
  correctedDays: number | undefined;
  label: string;
  weightKg?: number | undefined;
}

export default function GrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
  );
}
