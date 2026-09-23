import Link from "next/link";
import type { HospitalDataPoint, IndicatorMeta } from "@/types/hospital";

type Props = {
  allData: HospitalDataPoint[];
  indicators: IndicatorMeta[];
  years: number[];
};

function formatScore(score: number): string {
  return (score * 100).toFixed(1) + " %";
}

export function HospitalOverview({ allData, indicators }: Props) {
  const selectedIndicator = indicators[0].indicator_id;
  const rows = allData.filter((d) => d.indicator_name === selectedIndicator);

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b text-left">
          <th className="p-2">Helseforetak</th>
          <th className="p-2">Kvalitetsscore</th>
          <th className="p-2">Pasienter</th>
          <th className="p-2">År</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border-b">
            <td className="p-2">
              <Link href={`/hospital/${encodeURIComponent(row.unit_name)}`}>
                {row.unit_name}
              </Link>
            </td>
            <td className="p-2">{formatScore(row.score)}</td>
            <td className="p-2">{row.patients}</td>
            <td className="p-2">{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}