import Link from "next/link";
import { getAllData, getIndicators } from "@/lib/data";
import IndicatorTrendChart from "@/components/IndicatorTrendChart";

type Props = {
  params: Promise<{ id: string }>;
};

function formatScore(score: number): string {
  return (score * 100).toFixed(1) + " %";
}

export default async function HospitalDetailPage({ params }: Props) {
  const { id } = await params;
  const hospitalName = decodeURIComponent(id);

  const allData = getAllData();
  const indicators = getIndicators();

  const hospitalRows = allData.filter((d) => d.unit_name === hospitalName);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-[#003283] hover:underline"
      >
        ← Tilbake til oversikt
      </Link>

      <h1 className="mb-8 text-4xl font-bold text-[#003283]">{hospitalName}</h1>

      {hospitalRows.length === 0 && (
        <p className="text-gray-500">
          Fant ingen data for dette helseforetaket.
        </p>
      )}

      <div className="space-y-5">
        {indicators.map((indicator) => {
          const rowsForIndicator = hospitalRows.filter(
            (d) => d.indicator_name === indicator.indicator_id
          );

          return (
            <section
              key={indicator.indicator_id}
              className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="h-1 bg-[#81A9E1]" />
              <div className="p-5">
                <h2 className="font-semibold text-[#003283]">{indicator.title}</h2>
                <p className="mb-4 text-sm text-gray-600">{indicator.description}</p>

                {rowsForIndicator.length === 0 ? (
                  <p className="text-sm italic text-gray-400">
                    Ingen data tilgjengelig
                  </p>
                ) : (
                  <>
                    <IndicatorTrendChart rows={rowsForIndicator} />
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="pb-2 font-medium text-gray-500">År</th>
                          <th className="pb-2 font-medium text-gray-500">Score</th>
                          <th className="pb-2 font-medium text-gray-500">Pasienter</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rowsForIndicator.map((row) => (
                          <tr key={row.id} className="border-b border-gray-100 last:border-0">
                            <td className="py-2 text-gray-700">{row.year}</td>
                            <td className="py-2 font-semibold text-[#003283]">
                              {formatScore(row.score)}
                            </td>
                            <td className="py-2 text-gray-700">{row.patients}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}