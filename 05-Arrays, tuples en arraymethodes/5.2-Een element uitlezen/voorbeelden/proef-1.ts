// 5.2 Een element uitlezen — voorbeeld uit Het Groenhuis, deel I
//
// producten[0] geeft het eerste product. Maar wat als de lijst leeg is?
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// const eerste = producten[0]
// console.log(…) toont: eerste.naam
// const laatste = het resultaat van producten.at(-1)
// console.log(…) toont: laatste.naam
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.8 De eerste catalogus (zie 04-Objecten, interfaces en structural typing/4.8-De eerste catalogus/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { producten } from "./catalogus.ts";

const eerste = producten[0];
console.log(eerste.naam);

const laatste = producten.at(-1);
console.log(laatste.naam);

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:4:13 - error TS18048: 'eerste' is possibly 'undefined'.
//
// 4 console.log(eerste.naam);
//               ~~~~~~
//
// src/proef.ts:7:13 - error TS18048: 'laatste' is possibly 'undefined'.
//
// 7 console.log(laatste.naam);
//               ~~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:4
