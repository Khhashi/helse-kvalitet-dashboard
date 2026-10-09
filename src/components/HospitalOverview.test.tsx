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

describe("HospitalOverview result count", () => {
  it("shows the number of results in a polite live region", () => {
    const data = getAllData();
    const selectedIndicator = getIndicators()[0];
    const visibleRows = data.filter(
      (row) => row.indicator_name === selectedIndicator.indicator_id
    );
    const markup = renderToStaticMarkup(
      <HospitalOverview
        allData={data}
        indicators={getIndicators()}
        years={[...new Set(data.map((row) => row.year))]}
      />
    );

    expect(markup).toContain(`Viser ${visibleRows.length} treff`);
    expect(markup).toContain('role="status"');
    expect(markup).toContain('aria-live="polite"');
  });

  it("shows zero when there are no results", () => {
    const markup = renderToStaticMarkup(
      <HospitalOverview allData={[]} indicators={getIndicators()} years={[]} />
    );

    expect(markup).toContain("Viser 0 treff");
  });
});