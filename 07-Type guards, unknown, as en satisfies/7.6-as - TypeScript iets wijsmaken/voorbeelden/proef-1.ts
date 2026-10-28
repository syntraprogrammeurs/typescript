// 7.6 as: TypeScript iets wijsmaken — voorbeeld uit Het Groenhuis, deel I
//
// Je kunt TypeScript ook gewoon zeggen welk type iets heeft, zonder controle. Dat heet een type
// assertion, met het woord as.
//
// Opbouw van dit bestand:
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// const gegevens: unknown = het resultaat van JSON.parse('{ "naam": "Aloe vera" }')
// const product = gegevens (met Product)
// console.log(…) toont: product.naam.toUpperCase()
// console.log(…) toont: product.tags.includes("makkelijk")
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 7.4 Assertion functions (zie 07-Type guards, unknown, as en satisfies/7.4-Assertion functions/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
//     node src/proef.ts
// Let op: dit programma stopt met een fout. Dat is de bedoeling; de melding staat onderaan.

import type { Product } from "./inhoud.ts";

const gegevens: unknown = JSON.parse('{ "naam": "Aloe vera" }');
const product = gegevens as Product;

console.log(product.naam.toUpperCase());
console.log(product.tags.includes("makkelijk"));

// Uitvoer van `node src/proef.ts`:
// ALOE VERA
// file:///C:/cursus/groenhuis/domein/src/proef.ts:7
// console.log(product.tags.includes("makkelijk"));
//                          ^
//
// TypeError: Cannot read properties of undefined (reading 'includes')
//     at file:///C:/cursus/groenhuis/domein/src/proef.ts:7:26
//     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
//     at async node:internal/modules/esm/loader:647:26
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)
//
// Node.js v24.22.1
