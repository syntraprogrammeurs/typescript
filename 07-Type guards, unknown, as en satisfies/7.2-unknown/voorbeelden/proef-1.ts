// 7.2 unknown — voorbeeld uit Het Groenhuis, deel I
//
// Er is een type dat het tegenovergestelde doet van any.
//
// Opbouw van dit bestand:
// const gegevens: unknown = het resultaat van JSON.parse('{ "naam": "Aloe vera" }')
// console.log(…) toont: gegevens.naam
// const tekst: string = gegevens
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const gegevens: unknown = JSON.parse('{ "naam": "Aloe vera" }');

console.log(gegevens.naam);
const tekst: string = gegevens;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:3:13 - error TS18046: 'gegevens' is of type 'unknown'.
//
// 3 console.log(gegevens.naam);
//               ~~~~~~~~
//
// src/proef.ts:4:7 - error TS2322: Type 'unknown' is not assignable to type 'string'.
//
// 4 const tekst: string = gegevens;
//         ~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:3
