import Link from "next/link";
import { getAllData, getIndicators } from "@/lib/data";

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
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="mb-6 inline-block text-sm text-blue-900">
        ← Tilbake til oversikt
      </Link>

      <h1 className="mb-6 text-3xl font-bold">{hospitalName}</h1>

      {hospitalRows.length === 0 && (
        <p className="text-gray-500">
          Fant ingen data for dette helseforetaket.
        </p>
      )}

      {indicators.map((indicator) => {
        const rowsForIndicator = hospitalRows.filter(
          (d) => d.indicator_name === indicator.indicator_id
        );

        return (
          <section key={indicator.indicator_id} className="mb-6 rounded border p-4">
            <h2 className="font-semibold">{indicator.title}</h2>
            <p className="mb-3 text-sm text-gray-600">{indicator.description}</p>

            {rowsForIndicator.length === 0 ? (
              <p className="text-sm text-gray-400 italic">Ingen data tilgjengelig</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>År</th>
                    <th>Score</th>
                    <th>Pasienter</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsForIndicator.map((row) => (
                    <tr key={row.id}>
                      <td>{row.year}</td>
                      <td>{formatScore(row.score)}</td>
                      <td>{row.patients}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        );
      })}
    </main>
  );
}