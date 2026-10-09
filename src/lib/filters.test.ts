import { describe, it, expect } from "vitest";
import {
  filterByIndicator,
  filterBySearch,
  filterByYear,
  getUniqueHospitalNames,
  sortByScore,
} from "./filters";
import type { HospitalDataPoint } from "@/types/hospital";
import { getAllData, getIndicators, validateData } from "./data";

const testData: HospitalDataPoint[] = [
  { id: 1, indicator_name: "a", unit_name: "Bergen HF", year: 2022, patients: 100, score: 0.2 },
  { id: 2, indicator_name: "a", unit_name: "Oslo HF", year: 2022, patients: 200, score: 0.5 },
  { id: 3, indicator_name: "a", unit_name: "Oslo HF", year: 2023, patients: 210, score: 0.4 },
  { id: 4, indicator_name: "b", unit_name: "Bergen HF", year: 2022, patients: 100, score: 0.9 },
];

describe("filterByIndicator", () => {
  it("beholder kun rader med valgt indikator", () => {
    const result = filterByIndicator(testData, "a");
    expect(result).toHaveLength(3);
    expect(result.every((r) => r.indicator_name === "a")).toBe(true);
  });
});

describe("filterBySearch", () => {
  it("filtrerer på delvis, case-insensitive treff i navnet", () => {
    const result = filterBySearch(testData, "berg");
    expect(result).toHaveLength(2);
    expect(result.every((r) => r.unit_name === "Bergen HF")).toBe(true);
  });

  it("returnerer alt uendret ved tomt søk", () => {
    const result = filterBySearch(testData, "");
    expect(result).toHaveLength(testData.length);
  });
});

describe("filterByYear", () => {
  it("filtrerer på gitt år", () => {
    const result = filterByYear(testData, "2023");
    expect(result).toHaveLength(1);
    expect(result[0].unit_name).toBe("Oslo HF");
  });

  it("returnerer alt uendret når year er 'all'", () => {
    const result = filterByYear(testData, "all");
    expect(result).toHaveLength(testData.length);
  });
});

describe("sortByScore", () => {
  it("sorterer synkende (høyest score først) som standard", () => {
    const result = sortByScore(testData, true);
    expect(result[0].score).toBe(0.9);
    expect(result[result.length - 1].score).toBe(0.2);
  });

  it("sorterer stigende (lavest score først) når descending er false", () => {
    const result = sortByScore(testData, false);
    expect(result[0].score).toBe(0.2);
    expect(result[result.length - 1].score).toBe(0.9);
  });

  it("muterer ikke den originale arrayen", () => {
    const original = [...testData];
    sortByScore(testData, true);
    expect(testData).toEqual(original);
  });
});

describe("getUniqueHospitalNames", () => {
  it("returnerer hvert helseforetak én gang, sortert alfabetisk", () => {
    expect(getUniqueHospitalNames(testData)).toEqual(["Bergen HF", "Oslo HF"]);
  });
});

describe("validateData", () => {
  it("avviser datapunkter med score utenfor intervallet 0–1", () => {
    const invalidPoint = { ...testData[0], score: 1.1 };

    expect(() => validateData([invalidPoint], getIndicators())).toThrow(
      "Ugyldig data.json"
    );
  });

  it("avviser datapunkter med ugyldig pasientantall", () => {
    const invalidPoint = { ...testData[0], patients: -1 };

    expect(() => validateData([invalidPoint], getIndicators())).toThrow(
      "Ugyldig data.json"
    );
  });

  it("avviser indikatorer som ikke finnes i metadata", () => {
    const unknownIndicator = { ...testData[0], indicator_name: "ukjent" };

    expect(() => validateData([unknownIndicator], getIndicators())).toThrow(
      "ukjente indikatorer ukjent"
    );
  });

  it("godkjenner det importerte datasettet", () => {
    expect(() => validateData(getAllData(), getIndicators())).not.toThrow();
  });
});
