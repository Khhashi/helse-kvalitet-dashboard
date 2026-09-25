# SKDE – Sykehus- og kvalitetsdata

Et dashboard for å utforske kvalitetsdata fra Tonsilleregisteret, som er et
norsk medisinsk kvalitetsregister innen øre-, nese- og halsbehandling.

## Produksjon

Appen er tilgjengelig på Vercel:

<https://helse-kvalitet-dashboard.vercel.app>

Produksjonsdeploy gjøres foreløpig manuelt fra prosjektmappen med:

```bash
vercel --prod
```

## Hva betyr SKDE?

SKDE står for **Senter for klinisk dokumentasjon og evaluering**. Senteret
arbeider med å samle inn, analysere og formidle kunnskap om kvaliteten i
helsetjenesten. Kvalitetsregistre, som Tonsilleregisteret, gjør det mulig å
følge behandlingsresultater over tid og sammenligne resultater mellom
helseforetak.

Dette prosjektet er en enkel visualisering av slike data. Det er ikke et
journalsystem og skal ikke brukes til å ta beslutninger om enkeltpasienter.

## Hva kan du bruke dashboardet til?

På forsiden kan du:

- søke etter et helseforetak
- velge år og kvalitetsindikator
- sortere helseforetak etter resultat
- åpne en detaljside for å se utviklingen over flere år

Et **helseforetak (HF)** er en organisasjon som driver sykehus eller annen
spesialisthelsetjeneste. En **kvalitetsindikator** er et mål som brukes for å
beskrive kvaliteten på behandlingen. Dashboardet viser tre indikatorer:

- reinnleggelse på grunn av blødning etter tonsilleoperasjon
- kontakt med helsevesenet på grunn av smerter etter operasjon
- andel pasienter som er symptomfrie seks måneder etter operasjon

## Datagrunnlag

Dataene ligger lokalt i `src/data/data.json`, mens navn og beskrivelser av
indikatorene ligger i `src/data/metadata.json`. Applikasjonen leser altså
ikke data fra et eksternt API når den kjører.

Resultatene bør tolkes med konteksten rundt datagrunnlaget i mente. Antall
pasienter, valgt år og hvilken indikator som vises påvirker hvordan tallene
bør sammenlignes.

## Teknologi

- [Next.js](https://nextjs.org/) 16 med App Router
- React 19
- TypeScript
- Tailwind CSS
- [Recharts](https://recharts.org/) for grafer
- [Vitest](https://vitest.dev/) for enhetstester

## Kom i gang lokalt

Du trenger Node.js og npm installert.

```bash
git clone <repo-url>
cd helse-kvalitet-dashboard
npm install
npm run dev
```

Åpne deretter <http://localhost:3000> i nettleseren.

## Nyttige kommandoer

```bash
npm run dev      # starter utviklingsserveren
npm run build    # bygger appen for produksjon
npm run start    # starter produksjonsbygget
npm run lint     # kjører ESLint
npm run test     # kjører enhetstester med Vitest
```

## Mappestruktur

```text
src/
├── app/          # sider og layout
├── components/   # gjenbrukbare UI-komponenter og grafer
├── data/         # lokalt datagrunnlag og metadata
├── lib/          # funksjoner for uthenting og filtrering av data
└── types/        # TypeScript-typer
```

De viktigste sidene er:

- `/` – oversikt over helseforetak
- `/hospital/[id]` – detaljer og historisk utvikling for ett helseforetak

