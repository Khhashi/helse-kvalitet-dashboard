import rawData from "@/data/data.json";
import rawMetadata from "@/data/metadata.json";
import type { HospitalDataPoint, IndicatorMeta } from "@/types/hospital";

const data = rawData as HospitalDataPoint[];
const metadata = rawMetadata as IndicatorMeta[];

export function getAllData(): HospitalDataPoint[] {
  return data;
}

export function getIndicators(): IndicatorMeta[] {
  return metadata;
}

export function getAvailableYears(): number[] {
  const years = data.map((d) => d.year);
  const uniqueYears = [...new Set(years)];
  return uniqueYears.sort((a, b) => a - b);
}