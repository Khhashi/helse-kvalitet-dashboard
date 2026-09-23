import type { HospitalDataPoint } from "@/types/hospital";

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