#!/bin/bash
gh issue create --title "1: Sett opp prosjekt + datalag" --body "Scaffold Next.js (App Router, TypeScript, Tailwind). Legg inn data.json og metadata.json under src/data/. Definer TypeScript-typer for datapunkt og metadata. Lag lib/data.ts med funksjoner for å hente/filtrere data.

Definition of done: Prosjektet kjører lokalt med npm run dev, typene dekker datastrukturen uten any." --label "setup,data"

gh issue create --title "2: Oversiktsside - grunnleggende tabell" --body "Bygg / som viser alle HF i en statisk tabell (navn, score, pasienter, år), uten interaktivitet ennå.

Definition of done: Alle HF vises korrekt med data hentet via lib/data.ts." --label "feature,ui"

gh issue create --title "3: Søk på sykehusnavn" --body "Legg til søkefelt over tabellen fra #2, som filtrerer på HF-navn (case-insensitive substring match).

Definition of done: Skriving i søkefeltet filtrerer tabellen live, uten sideomlasting." --label "feature,ui"

gh issue create --title "4: Filtrering på år" --body "Legg til årsfilter (dropdown) over tabellen, som virker sammen med søket fra #3.

Definition of done: Årsfilter og søk fungerer korrekt sammen." --label "feature,ui"

gh issue create --title "5: Sortering på kvalitetsscore" --body "Gjør kolonneoverskriften 'Kvalitetsscore' klikkbar, med toggling mellom stigende/synkende sortering.

Definition of done: Sortering fungerer korrekt sammen med aktive søk/filter fra #3 og #4." --label "feature,ui"

gh issue create --title "6: Indikator-velger" --body "Legg til en dropdown som lar brukeren bytte mellom de tre kvalitetsindikatorene (reinnleggelse, smerter, symptomfri). Valgt indikator styrer hvilken score som vises og sorteres på i tabellen.

Definition of done: Bytte av indikator oppdaterer både tabellinnhold og sortering korrekt." --label "feature,ui"

gh issue create --title "7: Detaljside /hospital/[id]" --body "Klikk på en rad navigerer til en detaljside som viser alle tre indikatorene for valgt HF, over alle år. Håndter manglende data (f.eks. OUS 2024/2025) med tydelig melding.

Definition of done: Siden viser korrekt data for et vilkårlig HF, og feiler ikke på manglende data." --label "feature,ui"

gh issue create --title "8: Responsivt design" --body "Sørg for at oversikt og detaljside fungerer på mobil (ned til ca. 375px bredde).

Definition of done: Testet i devtools på mobilbredde, ingen uønsket sidescroll." --label "ui"

gh issue create --title "9: CI (GitHub Actions) + README" --body "Sett opp .github/workflows/ci.yml som kjører lint, typecheck og build på push/PR. Skriv README med oppgavebeskrivelse, teknologivalg, designvalg og forbedringsforslag.

Definition of done: CI er grønn på main, README dekker alle punktene i leveransekravet." --label "ci,docs"

gh issue create --title "10: Enhetstester for filter-/sorteringslogikk" --body "Test filterByIndicator, filterBySearch, filterByYear og sortByScore i lib/filters.ts med Vitest.

Definition of done: npm run test kjører grønt med minst 8 tester." --label "testing"

echo "Alle 10 issues opprettet."
