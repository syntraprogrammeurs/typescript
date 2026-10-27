// 2.7 Functies met types — voorbeeld uit Het Groenhuis, deel I
//
// En wat gebeurt er als je de functie verkeerd gebruikt?
//
// Opbouw van dit bestand:
// import metBtw uit "./prijs.ts"
// const a = het resultaat van metBtw("2499", 6)
// const b = het resultaat van metBtw(2499)
// const c: string = het resultaat van metBtw(2499, 6)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 2.7 Functies met types (zie 02-Van JavaScript naar TypeScript/2.7-Functies met types/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { metBtw } from "./prijs.ts";

const a = metBtw("2499", 6);
const b = metBtw(2499);
const c: string = metBtw(2499, 6);

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:3:18 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
//
// 3 const a = metBtw("2499", 6);
//                    ~~~~~~
//
// src/proef.ts:4:11 - error TS2554: Expected 2 arguments, but got 1.
//
// 4 const b = metBtw(2499);
//             ~~~~~~
//
//   src/prijs.ts:7:49 - An argument for 'btwPercentage' was not provided.
//     7 export function metBtw(prijsExclInCent: number, btwPercentage: number): number {
//                                                       ~~~~~~~~~~~~~~~~~~~~~
//
// src/proef.ts:5:7 - error TS2322: Type 'number' is not assignable to type 'string'.
//
// 5 const c: string = metBtw(2499, 6);
//         ~
//
//
// Found 3 errors in the same file, starting at: src/proef.ts:3
