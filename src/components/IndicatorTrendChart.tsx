"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HospitalDataPoint } from "@/types/hospital";

type Props = {
  rows: HospitalDataPoint[];
};

type ChartPoint = {
  year: number;
  score: number | null;
  patients: number | null;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ payload?: ChartPoint }>;
};

function ChartTooltip({ active, payload }: TooltipProps) {
  const point = payload?.[0]?.payload;

  if (!active || !point || point.score === null || point.patients === null) {
    return null;
  }

  return (
    <div className="rounded border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-semibold text-gray-700">{point.year}</p>
      <p className="text-[#003283]">Score: {point.score.toFixed(1)} %</p>
      <p className="text-gray-600">Pasienter: {point.patients}</p>
    </div>
  );
}

export default function IndicatorTrendChart({ rows }: Props) {
  const sortedRows = [...rows].sort((a, b) => a.year - b.year);
  const firstYear = sortedRows[0]?.year;
  const lastYear = sortedRows.at(-1)?.year;

  if (firstYear === undefined || lastYear === undefined) return null;

  const rowByYear = new Map(sortedRows.map((row) => [row.year, row]));
  const chartData = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => {
      const year = firstYear + index;
      const row = rowByYear.get(year);
      return {
        year,
        score: row ? row.score * 100 : null,
        patients: row?.patients ?? null,
      };
    }
  );

  return (
    <div className="mb-6" aria-label="Utvikling i kvalitetsscore over år">
      <h3 className="mb-2 text-sm font-medium text-gray-500">
        Utvikling over tid
      </h3>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#003283"
              strokeWidth={2}
              dot={{ r: 4, fill: "#003283" }}
              connectNulls={false}
              name="Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}