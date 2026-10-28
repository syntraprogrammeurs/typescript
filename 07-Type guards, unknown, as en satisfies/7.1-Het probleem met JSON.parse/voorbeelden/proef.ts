// 7.1 Het probleem met JSON.parse — voorbeeld uit Het Groenhuis, deel I
//
// tsc vindt niets, en toch loopt het twee keer mis: een prijs die tekst is, en een lijst tags die
// er niet is. Ga met de muis over JSON.parse.
//
// Opbouw van dit bestand:
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// const tekst = de tekst '{ "naam": "Aloe vera", "prijsInCent": "7,99" }'
// const product: Product = het resultaat van JSON.parse(tekst)
// console.log(…) toont: product.prijsInCent * 2
// console.log(…) toont: product.tags.length
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 7.3 Type predicates (zie 07-Type guards, unknown, as en satisfies/7.3-Type predicates/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
//     node src/proef.ts
// Let op: dit programma stopt met een fout. Dat is de bedoeling; de melding staat onderaan.

import type { Product } from "./inhoud.ts";

const tekst = '{ "naam": "Aloe vera", "prijsInCent": "7,99" }';
const product: Product = JSON.parse(tekst);

console.log(product.prijsInCent * 2);
console.log(product.tags.length);

// Uitvoer van `node src/proef.ts`:
// NaN
// file:///C:/cursus/groenhuis/domein/src/proef.ts:7
// console.log(product.tags.length);
//                          ^
//
// TypeError: Cannot read properties of undefined (reading 'length')
//     at file:///C:/cursus/groenhuis/domein/src/proef.ts:7:26
//     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
//     at async node:internal/modules/esm/loader:647:26
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)
//
// Node.js v24.22.1
