"use client";

import { useState } from "react";
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

export function HospitalOverview({ allData, indicators, years }: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");

  const selectedIndicator = indicators[0].indicator_id;

  let rows = allData.filter((d) => d.indicator_name === selectedIndicator);

  if (searchText.trim() !== "") {
    rows = rows.filter((d) =>
      d.unit_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (selectedYear !== "all") {
    rows = rows.filter((d) => d.year === Number(selectedYear));
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Søk på sykehusnavn..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-10 flex-1 rounded border border-gray-300 px-3 text-sm"
        />

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="h-10 rounded border border-gray-300 px-2 text-sm"
        >
          <option value="all">Alle år</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

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
    </div>
  );
}