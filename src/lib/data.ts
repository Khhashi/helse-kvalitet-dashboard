import rawData from "@/data/data.json";
import rawMetadata from "@/data/metadata.json";
import type { HospitalDataPoint, IndicatorMeta } from "@/types/hospital";
import { getUniqueHospitalNames } from "@/lib/filters";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isHospitalDataPoint(value: unknown): value is HospitalDataPoint {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    Number.isInteger(value.id) &&
    typeof value.indicator_name === "string" &&
    typeof value.unit_name === "string" &&
    value.unit_name.trim().length > 0 &&
    typeof value.year === "number" &&
    Number.isInteger(value.year) &&
    typeof value.patients === "number" &&
    Number.isInteger(value.patients) &&
    value.patients >= 0 &&
    typeof value.score === "number" &&
    Number.isFinite(value.score) &&
    value.score >= 0 &&
    value.score <= 1
  );
}

function isIndicatorMeta(value: unknown): value is IndicatorMeta {
  return (
    isRecord(value) &&
    typeof value.indicator_id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string"
  );
}

export function validateData(
  inputData: unknown,
  inputMetadata: unknown
): { data: HospitalDataPoint[]; metadata: IndicatorMeta[] } {
  if (!Array.isArray(inputData) || !inputData.every(isHospitalDataPoint)) {
    throw new Error(
      "Ugyldig data.json: hvert datapunkt må ha heltalls-ID og år, tekst for indikator og helseforetak, ikke-negativt heltall for pasienter og score mellom 0 og 1."
    );
  }

  if (!Array.isArray(inputMetadata) || !inputMetadata.every(isIndicatorMeta)) {
    throw new Error(
      "Ugyldig metadata.json: hver indikator må ha tekstfeltene indicator_id, title og description."
    );
  }

  const indicatorIds = new Set(inputMetadata.map((indicator) => indicator.indicator_id));
  const unknownIndicators = [
    ...new Set(
      inputData
        .map((point) => point.indicator_name)
        .filter((indicatorId) => !indicatorIds.has(indicatorId))
    ),
  ];

  if (unknownIndicators.length > 0) {
    throw new Error(
      `Ugyldig data.json: ukjente indikatorer ${unknownIndicators.join(", ")}.`
    );
  }

  return { data: inputData, metadata: inputMetadata };
}

const { data, metadata } = validateData(rawData, rawMetadata);

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

export function getHospitalNames(): string[] {
  return getUniqueHospitalNames(data);
}
