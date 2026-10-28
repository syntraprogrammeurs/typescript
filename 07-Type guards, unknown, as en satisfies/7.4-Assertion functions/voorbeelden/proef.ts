// 7.4 Assertion functions — voorbeeld uit Het Groenhuis, deel I
//
// asserts waarde is Product betekent: als deze functie terugkeert zonder fout, dan is waarde een
// Product. Na de aanroep hoeft er geen if meer.
//
// Opbouw van dit bestand:
// import controleerProduct uit "./controle.ts"
// const goed: unknown = het resultaat van JSON.parse(`{ "id": "p04", "slug": "aloe-vera", "naam":
//     "Aloe vera", "categorieId": "c5", "status": "gepublic…
// roept controleerProduct(…) aan: controleerProduct(goed, "aloe")
// console.log(…) toont: `${goed.naam} kost ${goed.prijsInCent} cent`
// const slecht: unknown = het resultaat van JSON.parse(`{ "naam": "Aloe vera" }`)
// roept controleerProduct(…) aan: controleerProduct(slecht, "het tweede product")
// console.log(…) toont: "deze regel wordt nooit bereikt"
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 7.4 Assertion functions (zie 07-Type guards, unknown, as en satisfies/7.4-Assertion functions/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts
// Let op: dit programma stopt met een fout. Dat is de bedoeling; de melding staat onderaan.

import { controleerProduct } from "./controle.ts";

const goed: unknown = JSON.parse(`{ "id": "p04", "slug": "aloe-vera", "naam": "Aloe vera",
  "categorieId": "c5", "status": "gepubliceerd", "prijsInCent": 799, "btwPercentage": 6,
  "voorraad": 25, "tags": ["makkelijk"] }`);

controleerProduct(goed, "aloe");
console.log(`${goed.naam} kost ${goed.prijsInCent} cent`);

const slecht: unknown = JSON.parse(`{ "naam": "Aloe vera" }`);
controleerProduct(slecht, "het tweede product");
console.log("deze regel wordt nooit bereikt");

// Uitvoer van `node src/proef.ts`:
// Aloe vera kost 799 cent
// file:///C:/cursus/groenhuis/domein/src/controle.ts:65
//     throw new Error(`${waar}: ${fouten.join("; ")}`);
//           ^
//
// Error: het tweede product: id ontbreekt of is geen tekst; slug ontbreekt of is geen tekst; categorieId ontbreekt of is geen tekst; status moet concept, gepubliceerd, gearchiveerd zijn; prijsInCent ontbreekt of is geen geheel getal vanaf 0; btwPercentage ontbreekt of is geen geheel getal vanaf 0; voorraad ontbreekt of is geen geheel getal vanaf 0; tags is geen lijst teksten
//     at controleerProduct (file:///C:/cursus/groenhuis/domein/src/controle.ts:65:11)
//     at file:///C:/cursus/groenhuis/domein/src/proef.ts:11:1
//     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
//     at async node:internal/modules/esm/loader:647:26
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)
//
// Node.js v24.22.1
