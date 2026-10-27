// 3.4 Functietypes — voorbeeld uit Het Groenhuis, deel I
//
// Een variabele van dat type.
//
// Opbouw van dit bestand:
// type Kortingsregel = een functietype: (bedragInCent: number) => number
// const tienProcent: Kortingsregel = een arrowfunctie (bedrag) => …
// const tienEuro: Kortingsregel = een arrowfunctie (bedrag) => …
// const kapot: Kortingsregel = een arrowfunctie (bedrag) => …
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

type Kortingsregel = (bedragInCent: number) => number;

const tienProcent: Kortingsregel = (bedrag) => Math.round(bedrag * 0.9);
const tienEuro: Kortingsregel = (bedrag) => bedrag - 1000;
const kapot: Kortingsregel = (bedrag) => `${bedrag} min korting`;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:5:42 - error TS2322: Type 'string' is not assignable to type 'number'.
//
// 5 const kapot: Kortingsregel = (bedrag) => `${bedrag} min korting`;
//                                            ~~~~~~~~~~~~~~~~~~~~~~~
//
//   src/proef.ts:1:22 - The expected type comes from the return type of this signature.
//     1 type Kortingsregel = (bedragInCent: number) => number;
//                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:5
