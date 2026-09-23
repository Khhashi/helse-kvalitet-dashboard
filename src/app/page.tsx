import { getAllData, getIndicators, getAvailableYears } from "@/lib/data";
import { HospitalOverview } from "@/components/HospitalOverview";

export default function Home() {
  const allData = getAllData();
  const indicators = getIndicators();
  const years = getAvailableYears();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8">
        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#81A9E1]">
          Tonsilleregisteret
        </p>
        <h1 className="mb-2 text-4xl font-bold text-[#003283]">
          Kvalitetsdata for helseforetak
        </h1>
        <p className="text-gray-600">
          Klikk på et helseforetak for detaljer.
        </p>
      </header>

      <HospitalOverview
        allData={allData}
        indicators={indicators}
        years={years}
      />
    </main>
  );
}