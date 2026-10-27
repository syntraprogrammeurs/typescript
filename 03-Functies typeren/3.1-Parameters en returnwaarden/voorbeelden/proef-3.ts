// 3.1 Parameters en returnwaarden — voorbeeld uit Het Groenhuis, deel I
//
// De fout staat op de laatste regel, terwijl de oorzaak in de functie zit. TypeScript leidde als
// returntype string | number af: een tekst óf een getal. Wie de functie gebruikt, krijgt de fout.
// Met een returntype erbij.
//
// Opbouw van dit bestand:
// function verzendkosten(totaalInCent: number): number
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function verzendkosten(totaalInCent: number): number {
  if (totaalInCent >= 5000) {
    return "gratis";
  }
  return 495;
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:3:5 - error TS2322: Type 'string' is not assignable to type 'number'.
//
// 3     return "gratis";
//       ~~~~~~
//
//
// Found 1 error in src/proef.ts:3
