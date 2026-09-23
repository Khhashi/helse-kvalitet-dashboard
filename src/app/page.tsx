import { getAllData, getIndicators, getAvailableYears } from "@/lib/data";
import { HospitalOverview } from "@/components/HospitalOverview";

export default function Home() {
  const allData = getAllData();
  const indicators = getIndicators();
  const years = getAvailableYears();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Kvalitetsdata for helseforetak</h1>
      <p className="mb-6 text-gray-600">
        Tonsilleregisteret – klikk på et helseforetak for detaljer.
      </p>

      <HospitalOverview
        allData={allData}
        indicators={indicators}
        years={years}
      />
    </main>
  );
}