import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#81A9E1]">404</p>
      <h1 className="mb-4 text-4xl font-bold text-[#003283]">Fant ikke siden</h1>
      <p className="mb-8 text-gray-600">
        Helseforetaket eller siden du leter etter finnes ikke.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-[#003283] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00266b]"
      >
        Tilbake til oversikt
      </Link>
    </main>
  );
}
