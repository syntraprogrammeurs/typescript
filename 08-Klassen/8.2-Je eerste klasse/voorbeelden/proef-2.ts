// 8.2 Je eerste klasse — voorbeeld uit Het Groenhuis, deel I
//
// Vergeet je een veld een waarde te geven in de constructor, dan zegt TypeScript het.
//
// Opbouw van dit bestand:
// class Pot — met 3 leden:
//     materiaal: string
//     diameterInCm: number
//     constructor(materiaal: string)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

class Pot {
  materiaal: string;
  diameterInCm: number;

  constructor(materiaal: string) {
    this.materiaal = materiaal;
  }
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:3:3 - error TS2564: Property 'diameterInCm' has no initializer and is not definitely assigned in the constructor.
//
// 3   diameterInCm: number;
//     ~~~~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:3
