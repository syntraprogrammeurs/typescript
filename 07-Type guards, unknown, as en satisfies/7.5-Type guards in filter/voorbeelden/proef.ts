// 7.5 Type guards in filter — voorbeeld uit Het Groenhuis, deel I
//
// Een type predicate past ook in filter.
//
// Opbouw van dit bestand:
// import isProduct uit "./controle.ts"
// const gegevens: unknown[] = het resultaat van JSON.parse(`[ { "id": "p04", "slug": "aloe-vera",
//     "naam": "Aloe vera", "categorieId": "c5", "status": "gepubl…
// const producten = het resultaat van gegevens.filter(isProduct)
// console.log(…) toont: producten.map((product) => product.naam)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 7.4 Assertion functions (zie 07-Type guards, unknown, as en satisfies/7.4-Assertion functions/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { isProduct } from "./controle.ts";

const gegevens: unknown[] = JSON.parse(`[
  { "id": "p04", "slug": "aloe-vera", "naam": "Aloe vera", "categorieId": "c5", "status": "gepubliceerd",
    "prijsInCent": 799, "btwPercentage": 6, "voorraad": 25, "tags": [] },
  { "naam": "kapot" }
]`);

const producten = gegevens.filter(isProduct);
console.log(producten.map((product) => product.naam));

// Uitvoer van `node src/proef.ts`:
// [ 'Aloe vera' ]
