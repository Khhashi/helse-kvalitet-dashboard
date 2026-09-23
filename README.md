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

## Forklaring av designvalg

**Indikator-velger i stedet for én samlet "kvalitetsscore".**
Datasettet har tre kvalitetsindikatorer per HF (reinnleggelse, smerter,
symptomfri), og de peker ulik vei – for to av dem er lavere score bedre,
for den tredje er høyere bedre. Et gjennomsnitt av disse ville gitt et tall
uten reell mening. Løsningen lar derfor brukeren velge hvilken indikator
som vises og sorteres på, i stedet for at jeg finner opp en vekting jeg
ikke har faglig grunnlag for.

**Tabell fremfor liste.** Oppgaven åpnet for "tabell, liste eller
lignende". Med 19 helseforetak som skal sammenlignes på ett tall, gir en
tabell bedre mulighet til å skanne og sortere enn en kortbasert liste.

**Ingen eget API-lag.** Data hentes direkte fra JSON-filene i
`lib/data.ts`. Siden datasettet er statisk, ville et eget Route Handler
bare vært unødvendig indirection – i en løsning med ekte, oppdaterbare
data ville dette vært et API-kall i stedet.

**Server- vs. Client Components.** Alt er Server Component som
utgangspunkt. `"use client"` er kun lagt til på selve
`HospitalOverview`-komponenten, siden det er den eneste som faktisk
trenger interaktivitet (søkefelt, dropdowns med `useState`).

**Manglende data håndteres eksplisitt.** Ett HF (OUS) mangler data for
enkelte år i datasettet. I stedet for å vise tomme eller feilaktige
verdier, vises en tydelig melding om at data ikke er tilgjengelig.

## Forslag til videre forbedringer

- **Ekte backend/API** i stedet for statisk JSON, slik at data kan
  oppdateres uten ny utrulling av frontend
- **Flere enhetstester**, inkludert kantetilfeller og komponenttester
- **URL-basert filterstate** (`?q=...&year=...`) for delbare lenker og
  fungerende tilbake-knapp
- **Visualisering** av utvikling over tid per indikator på detaljsiden
- **Bedre tilgjengelighet (a11y)**: ARIA-labels på filterkontroller,
  testet med skjermleser
- **CD**: automatisk deploy til Vercel ved merge til main, i tillegg til
  dagens CI

## Bruk av KI-verktøy

GitHub Copilot er brukt som sparringpartner underveis: til boilerplate-
kode, diskusjon av arkitekturvalg (bl.a. håndtering av flere
kvalitetsindikatorer og Server/Client Component-struktur), og til å
strukturere denne READMEen. All kode er gjennomgått, forstått og testet
av meg selv.