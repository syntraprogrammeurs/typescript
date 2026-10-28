// 5.5 Filteren en zoeken — voorbeeld uit Het Groenhuis, deel I
//
// zoekOpSlug geeft Product | undefined terug. Dat is eerlijk: een slug die niet bestaat, levert
// niets op. Wie de functie gebruikt, moet daar rekening mee houden.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// import zoekOpSlug uit "./zoeken.ts"
// const olijfboom = het resultaat van zoekOpSlug(producten, "olijfboom")
// console.log(…) toont: olijfboom.prijsInCent
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 5.5 Filteren en zoeken (zie 05-Arrays, tuples en arraymethodes/5.5-Filteren en zoeken/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { producten } from "./catalogus.ts";
import { zoekOpSlug } from "./zoeken.ts";

const olijfboom = zoekOpSlug(producten, "olijfboom");
console.log(olijfboom.prijsInCent);

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:5:13 - error TS18048: 'olijfboom' is possibly 'undefined'.
//
// 5 console.log(olijfboom.prijsInCent);
//               ~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:5
