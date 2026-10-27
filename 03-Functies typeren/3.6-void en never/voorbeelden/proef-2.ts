// 3.6 void en never — voorbeeld uit Het Groenhuis, deel I
//
// Een functie die nooit terugkeert, omdat ze altijd een fout gooit, heeft als returntype never.
//
// Opbouw van dit bestand:
// function weiger(reden: string): never
// function controleerPrijs(prijsInCent: number): number
// function vergeten(prijsInCent: number): never
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function weiger(reden: string): never {
  throw new Error(`Geweigerd: ${reden}`);
}

function controleerPrijs(prijsInCent: number): number {
  if (prijsInCent < 0) {
    weiger("een prijs kan niet negatief zijn");
  }
  return prijsInCent;
}

function vergeten(prijsInCent: number): never {
  if (prijsInCent < 0) {
    throw new Error("negatief");
  }
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:12:41 - error TS2534: A function returning 'never' cannot have a reachable end point.
//
// 12 function vergeten(prijsInCent: number): never {
//                                            ~~~~~
//
//
// Found 1 error in src/proef.ts:12
