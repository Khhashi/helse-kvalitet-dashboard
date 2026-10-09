import type { HospitalDataPoint, IndicatorMeta } from "@/types/hospital";

export function getDefaultSortDescending(indicator: IndicatorMeta): boolean {
  return indicator.score_direction === "higher_is_better";
}

export function filterByIndicator(
  data: HospitalDataPoint[],
  indicatorId: string
): HospitalDataPoint[] {
  return data.filter((d) => d.indicator_name === indicatorId);
}

export function filterBySearch(
  data: HospitalDataPoint[],
  searchText: string
): HospitalDataPoint[] {
  if (searchText.trim() === "") return data;
  const lowerSearch = searchText.toLowerCase();
  return data.filter((d) => d.unit_name.toLowerCase().includes(lowerSearch));
}

export function filterByYear(
  data: HospitalDataPoint[],
  year: string
): HospitalDataPoint[] {
  if (year === "all") return data;
  return data.filter((d) => d.year === Number(year));
}

export function sortByScore(
  data: HospitalDataPoint[],
  descending: boolean
): HospitalDataPoint[] {
  return [...data].sort((a, b) =>
    descending ? b.score - a.score : a.score - b.score
  );
}

export function getUniqueHospitalNames(data: HospitalDataPoint[]): string[] {
  return [...new Set(data.map((d) => d.unit_name))].sort((a, b) =>
    a.localeCompare(b, "nb")
  );
}
