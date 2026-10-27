// 2.5 Node voert TypeScript uit, maar kijkt niets na — voorbeeld uit Het Groenhuis, deel I
//
// Probeer het. Maak src/proef.ts opnieuw aan, met de fout erin, en voer het uit.
//
// Opbouw van dit bestand:
// const aantalPotten = de tekst "40"
// let totaal = het getal 0
// totaal krijgt de waarde de uitkomst van totaal + aantalPotten
// console.log(…) toont: `Totaal: ${totaal} potten`
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
//     node src/proef.ts
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const aantalPotten = "40";
let totaal = 0;

totaal = totaal + aantalPotten;
console.log(`Totaal: ${totaal} potten`);

// Uitvoer van `node src/proef.ts`:
// src/proef.ts:4:1 - error TS2322: Type 'string' is not assignable to type 'number'.
//
// 4 totaal = totaal + aantalPotten;
//   ~~~~~~
//
//
// Found 1 error in src/proef.ts:4
// Totaal: 040 potten
