// 5.11 Klassikale oefening 5.1 — Herschrijven met filter en reduce
//
// De situatie. In hoofdstuk 3 schreef je telWaar en somWaar in bedragen.ts, met een lus en een
// teller. Nu je filter en reduce kent, kan het korter.
//
// Wat je maakt.
//
// 1. Herschrijf telWaar en somWaar met filter, length en reduce. Geen for meer.
// 2. Maak de parameters readonly.
// 3. Voeg gemiddelde(bedragen) toe: het gemiddelde, afgerond op een cent. Wat geef je terug voor
//    een lege lijst? Kies een returntype dat dat eerlijk zegt.
// 4. Controleer dat de uitvoer van de vier bestaande regels niet verandert.
//
// Opbouw van dit bestand:
// import alsEuro uit "./prijs.ts"
// export type Voorwaarde = een functietype: (bedragInCent: number) => boolean
// export function telWaar(bedragen: number[], voorwaarde: Voorwaarde): number
// export function somWaar(bedragen: number[], voorwaarde: Voorwaarde): number
// export function goedkoperDan(grensInCent: number): Voorwaarde
// const prijzen = een lijst van 7 elementen: [2649, 1537, 895, 1299, 349, 4999, 750]
// console.log(…) toont: `Onder 10 euro: ${telWaar(prijzen, goedkoperDan(1000))} producten`
// console.log(…) toont: `Samen: ${alsEuro(somWaar(prijzen, goedkoperDan(1000)))}`
// console.log(…) toont: `Vanaf 25 euro: ${telWaar(prijzen, (bedrag) => bedrag >= 2500)} producten`
// console.log(…) toont: `Ronde bedragen: ${telWaar(prijzen, (bedrag) => bedrag % 100 === 0)}`

// Het Groenhuis — bedragen tellen en optellen die aan een voorwaarde voldoen
// Hoofdstuk 3, klassikale oefening 3.2

import { alsEuro } from "./prijs.ts";

export type Voorwaarde = (bedragInCent: number) => boolean;

export function telWaar(bedragen: number[], voorwaarde: Voorwaarde): number {
  let aantal = 0;
  for (const bedrag of bedragen) {
    if (voorwaarde(bedrag)) {
      aantal++;
    }
  }
  return aantal;
}

export function somWaar(bedragen: number[], voorwaarde: Voorwaarde): number {
  let totaal = 0;
  for (const bedrag of bedragen) {
    if (voorwaarde(bedrag)) {
      totaal += bedrag;
    }
  }
  return totaal;
}

export function goedkoperDan(grensInCent: number): Voorwaarde {
  return (bedrag) => bedrag < grensInCent;
}

const prijzen = [2649, 1537, 895, 1299, 349, 4999, 750];

console.log(`Onder 10 euro: ${telWaar(prijzen, goedkoperDan(1000))} producten`);
console.log(`Samen: ${alsEuro(somWaar(prijzen, goedkoperDan(1000)))}`);
console.log(`Vanaf 25 euro: ${telWaar(prijzen, (bedrag) => bedrag >= 2500)} producten`);
console.log(`Ronde bedragen: ${telWaar(prijzen, (bedrag) => bedrag % 100 === 0)}`);
