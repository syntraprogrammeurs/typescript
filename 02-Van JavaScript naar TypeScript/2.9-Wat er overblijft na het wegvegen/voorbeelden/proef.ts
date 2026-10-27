// 2.9 Wat er overblijft na het wegvegen — voorbeeld uit Het Groenhuis, deel I
//
// Je kunt zelf zien wat Node van een TypeScript-bestand maakt. Node heeft er een functie voor.
//
// Opbouw van dit bestand:
// import stripTypeScriptTypes uit "node:module"
// const code = de tekst `export function metBtw(prijs: number, btw: number): number { return
//     Math.round(prijs * (1 + btw / 100)); }`
// console.log(…) toont: stripTypeScriptTypes(code)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { stripTypeScriptTypes } from "node:module";

const code = `export function metBtw(prijs: number, btw: number): number {
  return Math.round(prijs * (1 + btw / 100));
}`;

console.log(stripTypeScriptTypes(code));

// Uitvoer van `node src/proef.ts`:
// export function metBtw(prijs        , btw        )         {
//   return Math.round(prijs * (1 + btw / 100));
// }
// (node:12345) ExperimentalWarning: stripTypeScriptTypes is an experimental feature and might change at any time
// (Use `node --trace-warnings ...` to show where the warning was created)
