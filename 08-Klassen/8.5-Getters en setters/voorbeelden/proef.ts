// 8.5 Getters en setters — voorbeeld uit Het Groenhuis, deel I
//
// Een setter (set) wordt uitgevoerd als je een waarde toekent: product.prijsInCent = 2599. De
// setter van prijsInCent weigert een ongeldige prijs. Er is geen setter voor voorraad: die wijzig
// je niet door een getal in te vullen, maar door stuks erbij te tellen of eraf te halen.
//
// Opbouw van dit bestand:
// import Product uit "./product.ts"
// const aloe = een nieuw object: new Product({ id: "p04", slug: "aloe-vera", status:
//     "gepubliceerd", naam: "Aloe vera", prijsInCent: 799, btwP…
// aloe.prijsInCent krijgt de waarde het getal 899
// console.log(…) toont: aloe.prijsInCent, aloe.prijsInclBtw, aloe.isTeKoop
// try … catch: vangt fouten op
// console.log(…) toont: aloe.prijsInCent
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 8.4 De klasse Product (zie 08-Klassen/8.4-De klasse Product/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { Product } from "./product.ts";

const aloe = new Product({
  id: "p04", slug: "aloe-vera", status: "gepubliceerd", naam: "Aloe vera",
  prijsInCent: 799, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
});

aloe.prijsInCent = 899;
console.log(aloe.prijsInCent, aloe.prijsInclBtw, aloe.isTeKoop);

try {
  aloe.prijsInCent = -100;
} catch (fout) {
  console.log(fout instanceof Error ? fout.message : fout);
}
console.log(aloe.prijsInCent);

// Uitvoer van `node src/proef.ts`:
// 899 953 true
// Ongeldige prijs voor Aloe vera: -100
// 899
