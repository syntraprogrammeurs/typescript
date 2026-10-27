// 3.2 Optionele parameters en standaardwaarden — voorbeeld uit Het Groenhuis, deel I
//
// Vergeet je te controleren of hij er is, dan zegt TypeScript het.
//
// Opbouw van dit bestand:
// function begroeting(naam?: string): string
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function begroeting(naam?: string): string {
  return `Welkom terug, ${naam.toUpperCase()}`;
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:2:27 - error TS18048: 'naam' is possibly 'undefined'.
//
// 2   return `Welkom terug, ${naam.toUpperCase()}`;
//                             ~~~~
//
//
// Found 1 error in src/proef.ts:2
