// 2.11 Klassikale oefening 2.2 — Typefouten lezen en herstellen — voorbeeld uit Het Groenhuis, deel I
//
// De situatie. Een collega schreef src/bestelling.ts, maar npm run check slaagt niet meer. Typ het
// bestand over, met de fouten erin.
//
// Opbouw van dit bestand:
// import alsEuro, BTW_PLANTEN, metBtw uit "./prijs.ts"
// const prijsPerStuk = de tekst "1450"
// const aantal = het getal 3
// function subtotaal(prijs: number, stuks: number): number
// const totaal = het resultaat van subtotaal(prijsPerStuk, aantal)
// console.log(…) toont: `Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN, 0))}`
// console.log(…) toont: `Gemiddeld per stuk: ${alsEuro(totaal / aantl)}`
//
// In de cursus heet dit bestand domein/src/bestelling.ts.
// Het importeert uit het project zoals het is na Oefening 2.1 Verzendkosten (zie 02-Van JavaScript naar TypeScript/2.10-Klassikale oefening 2.1 - Verzendkosten/oplossing).
// Zet het bestand als src/bestelling.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { alsEuro, BTW_PLANTEN, metBtw } from "./prijs.ts";

const prijsPerStuk = "1450";
const aantal = 3;

function subtotaal(prijs: number, stuks: number): number {
  const totaal = prijs * stuks;
}

const totaal = subtotaal(prijsPerStuk, aantal);
console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN, 0))}`);
console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantl)}`);

// Uitvoer van `npx tsc --noEmit`:
// src/bestelling.ts:6:51 - error TS2355: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.
//
// 6 function subtotaal(prijs: number, stuks: number): number {
//                                                     ~~~~~~
//
// src/bestelling.ts:10:26 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
//
// 10 const totaal = subtotaal(prijsPerStuk, aantal);
//                             ~~~~~~~~~~~~
//
// src/bestelling.ts:11:64 - error TS2554: Expected 2 arguments, but got 3.
//
// 11 console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN, 0))}`);
//                                                                   ~
//
// src/bestelling.ts:12:53 - error TS2552: Cannot find name 'aantl'. Did you mean 'aantal'?
//
// 12 console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantl)}`);
//                                                        ~~~~~
//
//   src/bestelling.ts:4:7 - 'aantal' is declared here.
//     4 const aantal = 3;
//             ~~~~~~
//
//
// Found 4 errors in the same file, starting at: src/bestelling.ts:6
