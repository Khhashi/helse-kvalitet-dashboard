# Helse-kvalitet-dashboard

[![CI](https://github.com/Khhashi/helse-kvalitet-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/Khhashi/helse-kvalitet-dashboard/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

Dashboard for å utforske kvalitetsdata fra Tonsilleregisteret, et norsk medisinsk kvalitetsregister innen øre-, nese- og halsbehandling. Du kan sammenligne helseforetak og følge utviklingen over flere år.

**[Live demo ↗](https://helse-kvalitet-dashboard.vercel.app)**

## Hvorfor jeg bygde det

Jeg bygde dashboardet for å lære å gjøre offentlige helsedata lette å forstå. Kvalitetsregistre inneholder mye nyttig informasjon, men tallene er vanskelige å sammenligne uten gode verktøy. Jeg ville vise utviklingen per helseforetak over tid, og samtidig vise antall pasienter, så ingen trekker konklusjoner fra et for lite grunnlag. Jeg valgte Next.js og TypeScript for å lære et typet frontend-rammeverk, og for å få sider som lastes raskt fordi de bygges på forhånd.

## Grensesnitt

Her er grensesnittet til dashboardet, fra oversikten over helseforetak til detaljsiden med utvikling over tid.

<table>
  <tr>
    <td width="50%"><img src="https://github.com/user-attachments/assets/a94b27a9-33de-489f-b672-12956bffe406" alt="Oversikt over helseforetak" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/c8764914-9222-40cc-a069-1f77858cc40e" alt="Oversikt med søk, filter og sortering" /></td>
  </tr>
  <tr>
    <td width="50%"><img src="https://github.com/user-attachments/assets/46848a29-a707-4272-b2f9-4a0444ce5279" alt="Detaljside med utvikling over tid" /></td>
    <td width="50%"><img src="https://github.com/user-attachments/assets/af37a852-5013-4c9a-881d-a8f51c955ef7" alt="Graf med antall pasienter i tooltip" /></td>
  </tr>
</table>

## Funksjoner

- Søk etter helseforetak og filtrering på år og kvalitetsindikator
- Sortering av helseforetak etter resultat
- Detaljside med graf over utviklingen for hvert helseforetak
- Antall pasienter vises i grafen, så resultatene kan tolkes riktig

Dashboardet viser tre indikatorer: reinnleggelse på grunn av blødning, kontakt med helsevesenet på grunn av smerter, og andel pasienter som er symptomfrie seks måneder etter operasjon.

## Om SKDE

SKDE står for **Senter for klinisk dokumentasjon og evaluering**. Senteret samler inn, analyserer og formidler kunnskap om kvaliteten i helsetjenesten. Dette prosjektet er en visualisering av slike data, og skal ikke brukes til beslutninger om enkeltpasienter.

## Teknologi

**Next.js 16 (App Router), React 19, TypeScript · Tailwind CSS · Recharts · Vitest · GitHub Actions, Vercel**

## Tekniske valg

- **Filtrering som rene funksjoner:** Søk, filtrering og sortering ligger i egne funksjoner i `lib/filters.ts`, adskilt fra komponentene. De endrer aldri de opprinnelige dataene, og kan derfor testes isolert.
- **Lokale data med TypeScript-typer:** Dataene leses fra JSON-filer i prosjektet, med egne typer for datapunkter og metadata. Appen er dermed ikke avhengig av et eksternt API, og feil i datastrukturen fanges ved bygging.
- **Streng CI:** Hver push kjører lint, typekontroll, tester og produksjonsbygg, så feil oppdages før de når `main`.

## Tester og CI

9 enhetstester i Vitest dekker søk, filtrering på år og indikator, sortering, listen over helseforetak og at de opprinnelige dataene ikke endres. GitHub Actions kjører lint, typekontroll, tester og build på hver push og pull request.

## Arbeidsflyt

Hver oppgave starter som et issue med en tydelig «Definition of done» og utvikles på en egen feature-branch. Endringen går gjennom en pull request og merges til `main` når CI er grønn.

## Kjør lokalt

Krever Node.js 20.

```bash
npm ci
npm run dev
```

Åpne <http://localhost:3000>. Kjør testene med `npm test`.
