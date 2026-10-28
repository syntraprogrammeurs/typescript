// 7.3 Type predicates — voorbeeld uit Het Groenhuis, deel I
//
// Probeer het met een paar kapotte producten.
//
// Opbouw van dit bestand:
// import foutenInProduct uit "./controle.ts"
// const kapot: unknown[] = een lijst van 3 elementen, het eerste: "Aloe vera"
// for … of: een lus over kapot
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 7.3 Type predicates (zie 07-Type guards, unknown, as en satisfies/7.3-Type predicates/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { foutenInProduct } from "./controle.ts";

const kapot: unknown[] = [
  "Aloe vera",
  { id: "p04", slug: "aloe-vera", naam: "Aloe vera", categorieId: "c5", status: "gepubliceerd",
    prijsInCent: "7,99", btwPercentage: 6, voorraad: 25, tags: [] },
  { id: "p05", slug: "olijfboom", naam: "Olijfboom", categorieId: "c2", status: "verkocht",
    prijsInCent: 8999, btwPercentage: 6, voorraad: -2, tags: "buiten" },
];

for (const waarde of kapot) {
  console.log(foutenInProduct(waarde));
}

// Uitvoer van `node src/proef.ts`:
// [ 'is geen object' ]
// [ 'prijsInCent ontbreekt of is geen geheel getal vanaf 0' ]
// [
//   'status moet concept, gepubliceerd, gearchiveerd zijn',
//   'voorraad ontbreekt of is geen geheel getal vanaf 0',
//   'tags is geen lijst teksten'
// ]
