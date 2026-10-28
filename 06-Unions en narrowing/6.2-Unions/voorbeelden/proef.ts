// 6.2 Unions — voorbeeld uit Het Groenhuis, deel I
//
// Een union A | B is een waarde die van het type A of van het type B is. Je mag er alleen mee doen
// wat bij beide kan.
//
// Opbouw van dit bestand:
// function naarCent(waarde: number | string): number
// function lengte(waarde: number | string): number
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function naarCent(waarde: number | string): number {
  return Math.round(waarde * 100);
}

function lengte(waarde: number | string): number {
  return waarde.length;
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:2:21 - error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
//
// 2   return Math.round(waarde * 100);
//                       ~~~~~~
//
// src/proef.ts:6:17 - error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
//
// 6   return waarde.length;
//                   ~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:2
