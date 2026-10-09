import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HospitalOverview } from "./HospitalOverview";
import { getAllData, getIndicators } from "@/lib/data";

describe("HospitalOverview empty state", () => {
  it("shows a message when no rows match", () => {
    const markup = renderToStaticMarkup(
      <HospitalOverview allData={[]} indicators={getIndicators()} years={[]} />
    );

    expect(markup).toContain(
      "Ingen helseforetak samsvarer med valgte søk og filtre."
    );
  });

  it("shows data without the empty-state message when rows match", () => {
    const [firstRow] = getAllData();
    const markup = renderToStaticMarkup(
      <HospitalOverview
        allData={[firstRow]}
        indicators={getIndicators()}
        years={[firstRow.year]}
      />
    );

    expect(markup).toContain(firstRow.unit_name);
    expect(markup).not.toContain(
      "Ingen helseforetak samsvarer med valgte søk og filtre."
    );
  });
});