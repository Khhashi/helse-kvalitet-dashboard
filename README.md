# SKDE Kandidatoppgave – Sykehus- og kvalitetsdata

Webapplikasjon som viser kvalitetsdata for helseforetak (HF), basert på
data fra Tonsilleregisteret (Norsk kvalitetsregister Øre-Nese-Hals).

- **`/`** – oversikt over alle HF: søk på navn, filtrering på år,
  sortering på kvalitetsscore, valg mellom tre kvalitetsindikatorer
- **`/hospital/[id]`** – detaljvisning for ett HF, med alle indikatorer
  over alle tilgjengelige år

## Teknologi

Next.js 16 (App Router), React, TypeScript, Tailwind CSS

## Oppstart

```bash
git clone <repo-url>
cd skde-kandidatoppgave
npm install
npm run dev
```

Åpne <http://localhost:3000>.

Andre kommandoer:
```bash
npm run build   # produksjonsbygg
npm run lint    # ESLint
npm run test    # enhetstester (Vitest)
```

