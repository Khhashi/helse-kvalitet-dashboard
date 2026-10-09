"use client";

import { useState } from "react";
import Link from "next/link";
import type { HospitalDataPoint, IndicatorMeta } from "@/types/hospital";
import {
  filterByIndicator,
  filterBySearch,
  filterByYear,
  getDefaultSortDescending,
  sortByScore,
} from "@/lib/filters";

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
  const [sortDescending, setSortDescending] = useState(
    getDefaultSortDescending(indicators[0])
  );
  const [selectedIndicatorId, setSelectedIndicatorId] = useState(
    indicators[0].indicator_id
  );

  const currentIndicator = indicators.find(
    (i) => i.indicator_id === selectedIndicatorId
  )!;

  const rows = sortByScore(
    filterByYear(
      filterBySearch(
        filterByIndicator(allData, selectedIndicatorId),
        searchText
      ),
      selectedYear
    ),
    sortDescending
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <div className="h-1.5 bg-[#003283]" />

      <div className="p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-gray-700">
            <span className="sr-only">Søk på sykehusnavn</span>
            <input
              type="text"
              placeholder="Søk på sykehusnavn..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 px-3 text-sm font-normal focus:border-[#003283] focus:outline-none focus:ring-1 focus:ring-[#003283]"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            <span className="sr-only">Filtrer på år</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 px-2 text-sm focus:border-[#003283] focus:outline-none focus:ring-1 focus:ring-[#003283]"
            >
              <option value="all">Alle år</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            <span className="sr-only">Velg kvalitetsindikator</span>
            <select
              value={selectedIndicatorId}
              onChange={(e) => {
                const indicatorId = e.target.value;
                setSelectedIndicatorId(indicatorId);
                const indicator = indicators.find(
                  (item) => item.indicator_id === indicatorId
                );
                if (indicator) {
                  setSortDescending(getDefaultSortDescending(indicator));
                }
              }}
              className="h-10 w-60 rounded-lg border border-gray-300 px-2 text-sm focus:border-[#003283] focus:outline-none focus:ring-1 focus:ring-[#003283]"
            >
              {indicators.map((indicator) => (
                <option key={indicator.indicator_id} value={indicator.indicator_id}>
                  {indicator.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mb-4 rounded-lg bg-[#F0F3FA] px-3 py-2 text-sm text-gray-700">
          {currentIndicator.description}
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[#81A9E1] bg-[#F7F9FD] text-left">
                <th className="p-3 font-semibold text-[#003283]">Helseforetak</th>
                <th className="p-3 font-semibold text-[#003283]">
                  <button
                    onClick={() => setSortDescending(!sortDescending)}
                    className="flex items-center gap-1"
                  >
                    Kvalitetsscore {sortDescending ? "↓" : "↑"}
                  </button>
                </th>
                <th className="p-3 font-semibold text-[#003283]">Pasienter</th>
                <th className="p-3 font-semibold text-[#003283]">År</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-600">
                    Ingen helseforetak samsvarer med valgte søk og filtre.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-[#F0F3FA]"
                  >
                    <td className="p-3">
                      <Link
                        href={`/hospital/${encodeURIComponent(row.unit_name)}`}
                        className="font-medium text-[#003283] hover:underline"
                      >
                        {row.unit_name}
                      </Link>
                    </td>
                    <td className="p-3 font-semibold text-[#003283]">
                      {formatScore(row.score)}
                    </td>
                    <td className="p-3 text-gray-700">{row.patients}</td>
                    <td className="p-3 text-gray-700">{row.year}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}