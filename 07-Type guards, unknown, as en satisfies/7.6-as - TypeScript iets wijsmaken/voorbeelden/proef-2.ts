// 7.6 as: TypeScript iets wijsmaken — voorbeeld uit Het Groenhuis, deel I
//
// TypeScript weigert alleen een as die onmogelijk kan kloppen.
//
// Opbouw van dit bestand:
// const prijs = de tekst "7,99"
// const getal = prijs (met number)
// const toch = prijs (met unknown) (met number)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const prijs = "7,99";
const getal = prijs as number;
const toch = prijs as unknown as number;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:2:15 - error TS2352: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
//
// 2 const getal = prijs as number;
//                 ~~~~~~~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:2
