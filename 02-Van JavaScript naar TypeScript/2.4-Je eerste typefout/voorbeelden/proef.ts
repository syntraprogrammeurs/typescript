// 2.4 Je eerste typefout — voorbeeld uit Het Groenhuis, deel I
//
// Dit is de fout uit hoofdstuk 1, in het klein. Typ het in een nieuw bestand src/proef.ts.
//
// Opbouw van dit bestand:
// const aantalPotten = de tekst "40"
// let totaal = het getal 0
// totaal krijgt de waarde de uitkomst van totaal + aantalPotten
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const aantalPotten = "40"; // zo komt het uit een formulier of een bestand
let totaal = 0;

totaal = totaal + aantalPotten;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:4:1 - error TS2322: Type 'string' is not assignable to type 'number'.
//
// 4 totaal = totaal + aantalPotten;
//   ~~~~~~
//
//
// Found 1 error in src/proef.ts:4
